#!/bin/bash
set -euo pipefail

S3_BUCKET="sungyujang-devfolio"
CF_DISTRIBUTION_ID="EOUL8NWXIF07O"
DIST_DIR="dist"

echo "🔨 빌드 시작..."
npm run build

echo ""
echo "🚀 S3 배포 시작 (버킷: $S3_BUCKET)"

# 1. 해시된 정적 에셋 (_astro/) — 1년 캐싱, immutable
echo "  [1/3] 해시된 에셋 업로드 (_astro/*)"
aws s3 sync "$DIST_DIR/_astro/" "s3://$S3_BUCKET/_astro/" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# 2. HTML 파일 — 1년 캐싱 (배포 시 CloudFront 무효화로 갱신)
echo "  [2/3] HTML 파일 업로드"
aws s3 sync "$DIST_DIR/" "s3://$S3_BUCKET/" \
  --exclude "*" \
  --include "*.html" \
  --include "**/*.html" \
  --cache-control "public, max-age=31536000"

# 3. 나머지 정적 파일 (favicon, robots.txt, sitemap, og, resume 등) — 1시간 캐싱
echo "  [3/3] 기타 정적 파일 업로드"
aws s3 sync "$DIST_DIR/" "s3://$S3_BUCKET/" \
  --exclude "_astro/*" \
  --exclude "*.html" \
  --exclude ".DS_Store" \
  --cache-control "public, max-age=3600"

echo ""
echo "☁️  CloudFront 캐시 무효화 시작..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$CF_DISTRIBUTION_ID" \
  --paths "/*" \
  --query "Invalidation.Id" \
  --output text)

echo "  무효화 ID: $INVALIDATION_ID"
echo ""
echo "✅ 배포 완료! https://sungyujang.com"
