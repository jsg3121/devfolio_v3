# Devfolio v3 - 최종 사이트 구성안

> PLAN.md(기술 중심 초안)와 portfolio_site_ia_document.md(IA 기획서)를 통합 정리한 최종 문서.

---

## 1. 사이트 정의

**경력 아카이브형 포트폴리오** — 단순 이력 나열이 아니라, 문제 해결 과정과 비즈니스 임팩트를 구조적으로 전달하는 사이트.

### 핵심 메시지

> **서비스 성장, 성능, SEO, 운영 효율까지 연결해 문제를 해결하는 프론트엔드 엔지니어**

### 보조 메시지

- 단순 UI 구현보다 제품과 운영 관점에서 문제를 해결해왔다.
- 프론트엔드 중심이지만 SEO, 인프라, 관측성, 운영 시스템까지 확장된 경험이 있다.
- 정량 성과와 실제 운영 경험을 함께 제시할 수 있다.

---

## 2. 타깃 사용자 및 기대 행동

| 타깃 | 궁금해하는 정보 | 기대 흐름 |
|------|----------------|----------|
| 채용 담당자 | 경력 연차, 주요 회사, 대표 성과, 기술 스택 | Home → Work → Resume |
| 실무 리더 | 문제 해결 방식, 설계 판단, 협업 방식 | Home → Case Studies → Work → Contact |
| CTO / 테크 리드 | 비즈니스 임팩트, 기술 의사결정, 리딩 경험 | Work → Case Study → Side Projects |
| 외부 협업자 | 어떤 영역의 프론트엔드 문제를 잘 해결하는지 | Home → Side Projects → Contact |

---

## 3. 기술 스택

| 카테고리 | 기술 | 선정 이유 |
|---------|------|----------|
| 프레임워크 | **Astro** | 정적 사이트 최적, Content Collections 활용, 뛰어난 SEO |
| 언어 | **TypeScript** | 타입 안정성, 콘텐츠 스키마 정의 |
| 콘텐츠 | **MDX + Content Collections** | 케이스 스터디를 마크다운으로 관리, 메타데이터 구조화 |
| 스타일링 | **Tailwind CSS v4** | 유틸리티 기반 빠른 UI 개발, Astro 공식 지원 |
| 애니메이션 | **CSS + GSAP (최소)** | 필요한 구간만 인터랙션, 과도한 적용 지양 |
| 폰트 | **Pretendard** | 한글 최적화 웹폰트 |
| 배포 | **Vercel 또는 Cloudflare Pages** | 무료, 빠른 CDN, Astro 공식 지원 |

### 구현 원칙

- 정적 페이지 우선
- 필요한 구간만 Astro Islands로 인터랙션 적용
- 콘텐츠(데이터)와 UI 로직 분리
- 케이스 스터디는 MDX 기반으로 관리

---

## 4. 사이트 구조 (IA)

### 전체 URL 구조

```
/                          → Home (임팩트 요약)
/work                      → Work (회사 경력 허브)
/case-studies/[slug]       → Case Study 상세
/side-projects             → Side Projects
/about                     → About + Resume + Contact 통합
```

> **PLAN.md → IA 기획서 반영 변경점:**
> - 싱글 페이지(스크롤) → 멀티 페이지 구조로 변경. 콘텐츠 양이 많아 페이지 분리가 적합.
> - Highlights 섹션 → Home 내 핵심 지표 영역으로 흡수.
> - Career 타임라인 → `/work` 독립 페이지로 승격. 섹션형 서술 구조 채택.
> - Case Studies 추가 — 문제 해결 과정을 상세히 보여주는 핵심 콘텐츠.
> - Resume, Contact → About 페이지 하단에 통합 (초기 MVP 기준).

---

## 5. 페이지별 상세

### 5.1 Home (`/`)

**목적:** 첫 방문자가 5~10초 안에 핵심 강점을 파악하도록 유도.

| 섹션 | 콘텐츠 |
|------|--------|
| Hero | 이름, 직함(7년차 프론트엔드 엔지니어), 한 줄 소개, CTA(`경력 보기`, `케이스 스터디 보기`) |
| 핵심 지표 | 총 경력 연차, 주요 도메인, 대표 성과 수치(CDN 3~4억 절감, HTML 로드 10배 등) |
| 대표 경력 미리보기 | 현재 재직 회사 중심 2~3줄 요약 + 이전 경력 하이라이트 |
| 대표 케이스 스터디 | 3개 카드 (SEO/CMS, 성능 최적화, 비용 절감/관측성) |
| 사이드 프로젝트 미리보기 | 운영 중인 개인 프로젝트 카드 (추후 추가) |
| 연락/이력서 | 이메일, GitHub, PDF 다운로드 |

### 5.2 Work (`/work`)

**목적:** 회사 경력 전체를 구조적으로 보여주는 허브 페이지.

**표현 방식:** 회사별 카드 나열보다 **섹션형 서술** 채택.
"무엇을 만들었는가"보다 **"무슨 문제를 해결했고, 어떤 성과를 냈는가"** 중심.

| 섹션 | 콘텐츠 |
|------|--------|
| 페이지 소개 | 경력 전체 요약 + 강점 키워드 태그 |
| 커리어 타임라인 | 회사명, 직무, 재직 기간, 담당 도메인을 시각적으로 표현 |
| 회사별 상세 | 역할 → 주요 과제 → 대표 성과 → 관련 케이스 스터디 링크 |
| 역량 축 요약 | SEO/Growth, Performance, Platform/Admin, Infra/Observability, Leadership |

**회사 목록 (시간순 역순):**

1. **넛지헬스케어(주)** — 부팀장 (2025.03 ~ 현재)
   - 글로벌 서비스 관리 (캐시워크, 언니의파우치)
   - SEO 통합 CMS 구축
   - CDN 이관 (연 3~4억 절감)
   - AWS 인프라 최적화 (월 67만 원 절감)
   - Grafana 기반 관측성 구축

2. **주식회사 링커리어** — 파트장 (2024.09 ~ 2025.03)
   - 프론트엔드 파트 리딩
   - 자기소개서 관리 플랫폼 (D&D UI)
   - 테크니컬 SEO 전략 수립

3. **넛지헬스케어(주)** — 파트원/파트장 (2023.06 ~ 2024.09)
   - 웹 성능 엔지니어링 (HTML 로드 10배 개선, Lighthouse 45% 향상)
   - 멘토 서비스 시스템
   - GSAT 합격 예측 서비스 (데이터 시각화)
   - 이력/스펙 관리 시스템 (보안 공유)

4. **주식회사 큐버** — 연구원 (2020.11 ~ 2023.06)
   - OTA 관리 시스템
   - 서경방송 STB 운영 시스템
   - 네파 오프라인 리테일 솔루션

5. **(주)플레인엑스** — 팀원 (2019.06 ~ 2020.08)
   - Kisan 자산관리 시스템
   - Toyota 브랜드 캠페인
   - Korea P&I 공식 사이트

### 5.3 Case Studies (`/case-studies/[slug]`)

**목적:** 핵심 문제 해결 사례를 깊이 있게 보여주는 상세 페이지.

**통일 템플릿:**

```
1. 프로젝트 개요
2. 배경 및 문제 정의
3. 담당 역할
4. 기술적 난점
5. 해결 전략
6. 구현 내용
7. 성과 및 결과
8. 회고 및 배운 점
```

**MVP 우선 작성 대상 (3개):**

| 케이스 | 문제 영역 | 핵심 성과 |
|--------|----------|----------|
| SEO 통합 관리 CMS 구축 | SEO / Growth | 검색 스니펫 상위 노출, 부서 간 협업 개선 |
| 웹 성능 최적화 및 레거시 리팩토링 | Performance | HTML 로드 10배, 페이지 로드 58% 단축, Lighthouse 45% 향상 |
| CDN 이관 및 인프라 비용 절감 | Infra / Cost | 연 3~4억 CDN 비용 절감, 월 67만 원 서버 비용 절감 |

**후순위 케이스:**
- 관측성 환경 구축 및 장애 대응 체계 개선
- 자기소개서 관리 플랫폼 UX 고도화

### 5.4 Side Projects (`/side-projects`)

**목적:** 기술적 취향, 개인적으로 파고 있는 문제, 퍼블릭 서비스 운영 감각을 보여줌.

**구성:** 카드 그리드 형태. 회사 경력을 보완하는 역할 (대체가 아님).

> 콘텐츠는 추후 별도 추가 예정.

### 5.5 About (`/about`)

**목적:** 개발자 소개 + Resume + Contact를 하나로 통합.

| 섹션 | 콘텐츠 |
|------|--------|
| 자기소개 | 실무형 소개 (감성적 소개 지양) |
| 일하는 방식 | 문제 해결 접근, 협업 스타일 |
| 기술 스택 요약 | React, TypeScript, JavaScript, Next.js, HTML, CSS + α |
| 관심 분야 | 현재 관심 있는 기술/문제 영역 |
| Resume | PDF 다운로드 버튼 + 핵심 경력 텍스트 요약 |
| Contact | 이메일, GitHub, 블로그 링크 |

---

## 6. 콘텐츠 분류 체계

사이트 내 콘텐츠를 아래 기준으로 태깅/분류할 수 있도록 설계.

### 문제 영역 태그

`SEO` `Performance` `Platform` `Admin System` `Infra` `Observability` `Data Visualization` `Leadership`

### 비즈니스 효과 태그

`성능 개선` `운영 효율 향상` `비용 절감` `SEO 유입 개선` `사용자 경험 개선` `생산성 향상`

---

## 7. 콘텐츠 데이터 구조

Astro Content Collections + MDX 기반으로 관리.

### 콘텐츠 타입 및 메타데이터

```typescript
// career
{
  company: string
  role: string
  startDate: string
  endDate: string | null
  summary: string
  achievements: string[]
  skills: string[]
  featured: boolean
  order: number
}

// case-study (MDX)
{
  title: string
  slug: string
  company: string
  category: string      // SEO, Performance, Infra 등
  tags: string[]
  summary: string
  impact: string        // 핵심 성과 한 줄
  published: boolean
  featured: boolean
}

// side-project
{
  title: string
  slug: string
  status: string        // active, completed, archived
  summary: string
  stack: string[]
  externalLink: string
  featured: boolean
}
```

---

## 8. 디렉토리 구조

```
src/
├── layouts/
│   └── Layout.astro                # 공통 레이아웃 (SEO meta, OG, 폰트)
├── pages/
│   ├── index.astro                 # Home
│   ├── work.astro                  # Work (경력 허브)
│   ├── case-studies/
│   │   └── [slug].astro            # Case Study 상세 (동적 라우팅)
│   ├── side-projects.astro         # Side Projects
│   └── about.astro                 # About + Resume + Contact
├── components/
│   ├── home/
│   │   ├── Hero.astro
│   │   ├── KeyMetrics.astro        # 핵심 지표 요약
│   │   ├── FeaturedWork.astro      # 대표 경력 미리보기
│   │   ├── FeaturedCases.astro     # 대표 케이스 스터디 카드
│   │   └── ContactCTA.astro
│   ├── work/
│   │   ├── CareerTimeline.astro    # 커리어 타임라인
│   │   ├── CompanySection.astro    # 회사별 상세 섹션
│   │   └── SkillSummary.astro      # 역량 축 요약
│   ├── case-study/
│   │   └── CaseStudyLayout.astro   # 케이스 스터디 통일 템플릿
│   └── common/
│       ├── Header.astro
│       ├── Footer.astro
│       ├── Tag.astro
│       └── SEO.astro               # 구조화 데이터 (JSON-LD)
├── content/
│   ├── career/                     # 회사별 경력 데이터
│   ├── case-studies/               # MDX 케이스 스터디
│   └── side-projects/              # 사이드 프로젝트 데이터
└── styles/
    └── global.css
```

---

## 9. SEO 및 메타 전략

포트폴리오 자체가 SEO 역량의 증거가 되어야 함.

- 각 페이지별 고유 `title` / `description`
- Open Graph 이미지 (페이지별)
- `sitemap.xml` 자동 생성
- `robots.txt`
- 구조화 데이터: `Person`, `WebSite`, `WebPage`, `BreadcrumbList`
- 케이스 스터디의 명확한 헤딩 구조 (h1 → h2 → h3)

---

## 10. 비주얼/UX 방향

- 과도한 인터랙션보다 **읽기 쉬운 구조** 우선
- 숫자와 문제 해결 흐름이 잘 드러나는 레이아웃
- 문서형 읽기 경험과 카드형 탐색 경험의 균형

| 페이지 | 스타일 |
|--------|--------|
| Home | 임팩트 중심 요약, 큰 숫자 강조 |
| Work | 문서형 섹션 구조, 타임라인 |
| Case Study | 긴 글 읽기에 적합한 레이아웃 (블로그 포스트 느낌) |
| Side Projects | 가벼운 카드 그리드 |
| About | 단정한 프로필 페이지 |

---

## 11. MVP 범위

### 포함

- [ ] Home (Hero + 핵심 지표 + 대표 경력 + 케이스 스터디 카드 + CTA)
- [ ] Work (커리어 타임라인 + 회사별 섹션형 서술)
- [ ] Case Study 상세 3개 (SEO CMS, 성능 최적화, 비용 절감)
- [ ] Side Projects (카드 목록 — 콘텐츠 추후 추가)
- [ ] About (소개 + Resume PDF + Contact)

### 제외 (후순위)

- 블로그 / 글 아카이브
- 다국어 지원
- 복잡한 검색/필터/태그 탐색
- 과도한 애니메이션
- 회사별 독립 상세 페이지 (`/work/[company]`)

---

## 12. 개발 단계

### 1단계 (MVP)

- Astro 프로젝트 셋업 + Tailwind CSS + TypeScript
- 공통 레이아웃 및 네비게이션
- Home 페이지
- Work 페이지 (경력 데이터 구조화)
- Case Study 3개 (MDX)
- About 페이지
- SEO 기본 적용 (meta, sitemap, JSON-LD)
- 배포

### 2단계

- 케이스 스터디 추가
- 사이드 프로젝트 콘텐츠 추가
- 역량 축별 요약 UI
- 태그 시스템 도입

### 3단계

- 글 아카이브 / 기술 노트
- 발표 자료 정리
- 인터랙션 고도화 (GSAP)
- 영문 버전 검토

---

## 13. 두 문서 간 주요 변경 요약

| 항목 | PLAN.md (초안) | IA 기획서 반영 후 |
|------|---------------|-----------------|
| 페이지 구조 | 싱글 페이지 (스크롤) | **멀티 페이지** (콘텐츠 양 고려) |
| 경력 표현 | 타임라인 + 아코디언 | **섹션형 서술** (성과 중심) |
| Case Studies | 없음 | **독립 상세 페이지 3개** (MVP 핵심) |
| Highlights | 별도 섹션 | Home 내 **핵심 지표 영역**으로 흡수 |
| Resume / Contact | 별도 섹션 | **About 페이지에 통합** |
| 콘텐츠 관리 | `data/career.ts` 단일 파일 | **Content Collections + MDX** |
| 정보 설계 | 기능 중심 | **사용자 흐름 + 문제 해결 중심** |
