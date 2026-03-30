# Devfolio v3

## 장선규 — Frontend Engineer

> 서비스 성장, 성능, SEO, 운영 효율까지 연결해 문제를 해결하는 프론트엔드 엔지니어

단순 UI 구현을 넘어, 제품과 운영 관점에서 문제를 해결합니다.
프론트엔드를 중심으로 SEO, 인프라, 관측성, 운영 시스템까지 확장된 경험을 갖고 있으며,
정량 성과와 실제 운영 경험을 함께 제시할 수 있습니다.

이 사이트는 **경력 아카이브형 포트폴리오**로, 문제 해결 과정과 비즈니스 임팩트를 구조적으로 전달합니다.

## 사이트 구조

```text
/                  → Home (임팩트 요약)
/work              → Work (회사 경력 허브)
/articles/[slug]   → Article 상세 (기술 블로그)
/side-projects     → Side Projects
/about             → About + Resume + Contact
```

## 기술 스택

| 카테고리 | 기술 |
| -------- | ---- |
| 프레임워크 | Astro |
| 언어 | TypeScript |
| 콘텐츠 | MDX + Astro Content Collections |
| 스타일링 | Tailwind CSS v4 |
| 애니메이션 | CSS + GSAP |
| 폰트 | Pretendard |

## 시작하기

### 요구사항

- Node.js >= 22.12.0

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 프로젝트 구조

```
src/
├── assets/        # 이미지, 아이콘 (빌드 시 최적화)
├── components/    # 재사용 가능한 범용 UI 컴포넌트
├── content/       # 콘텐츠 데이터 (Content Collections)
├── features/      # 페이지별 전용 섹션 컴포넌트
├── layouts/       # 페이지 레이아웃 템플릿
├── lib/           # 유틸, 데이터 조회, SEO, 상수
├── pages/         # 라우트 (페이지)
└── styles/        # 전역 스타일, 디자인 토큰
```
