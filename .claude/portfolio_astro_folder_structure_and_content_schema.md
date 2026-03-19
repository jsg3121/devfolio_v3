# Astro 포트폴리오 폴더 구조 및 콘텐츠 스키마 설계안

## 1. 문서 목적

이 문서는 Astro 기반 포트폴리오 사이트를 실제 구현하기 위한 폴더 구조, 콘텐츠 컬렉션 구조, 데이터 스키마, 페이지 라우트 설계를 정의한다.

목표는 다음과 같다.

- 회사 경력, 케이스 스터디, 사이드 프로젝트를 구조적으로 관리할 수 있어야 한다.
- 콘텐츠와 UI를 분리하여 유지보수가 쉬워야 한다.
- Astro의 정적 사이트 강점을 살리면서 확장 가능한 구조여야 한다.
- 초기 MVP부터 추후 확장까지 무리 없이 대응할 수 있어야 한다.

---

## 2. 전체 구조 설계 원칙

### 2.1 콘텐츠와 페이지를 분리한다

- `src/pages`는 라우트 책임만 가진다.
- `src/content`는 실제 데이터와 문서 콘텐츠를 관리한다.
- `src/components`는 재사용 가능한 UI 조각을 담당한다.
- `src/features`는 특정 도메인 단위의 화면/비즈니스 UI를 묶는다.

### 2.2 페이지는 얇게 유지한다

페이지 파일에서 직접 데이터 가공과 UI 조합을 모두 처리하지 않는다.  
가능한 한 `lib`, `features`, `content` 레이어를 통해 조립하는 구조를 유지한다.

### 2.3 경력과 케이스 스터디를 분리한다

- `career`: 회사 재직 이력과 역할 중심
- `case-study`: 특정 문제 해결 사례 중심
- `side-project`: 개인/사이드 프로젝트 중심

이렇게 분리해야 하나의 회사 경력에서 여러 케이스 스터디를 연결하기 쉽다.

### 2.4 Astro 기본 장점을 해치지 않는다

- 기본은 정적 생성
- 필요한 영역만 인터랙션 추가
- 긴 글 콘텐츠는 MDX 기반 관리
- SEO/OG/구조화 데이터는 공통 레이아웃에서 일관되게 처리

---

## 3. 추천 폴더 구조

```text
portfolio/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── resume/
│   │   └── resume-latest.pdf
│   └── og/
│       ├── default.png
│       ├── work.png
│       └── case-studies.png
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── profile/
│   │   │   ├── companies/
│   │   │   ├── case-studies/
│   │   │   └── side-projects/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/                     # 범용 UI (Button, Tag, SectionHeading 등)
│   │   │   ├── Button.astro
│   │   │   ├── Tag.astro
│   │   │   ├── SectionHeading.astro
│   │   │   ├── Prose.astro
│   │   │   └── MetaHead.astro
│   │   └── layout/                     # 레이아웃 관련 (Header, Footer, Navigation)
│   │       ├── Header.astro
│   │       ├── Footer.astro
│   │       ├── Navigation.astro
│   │       └── Container.astro
│   │
│   ├── content/
│   │   ├── career/
│   │   │   ├── nudge-healthcare.md
│   │   │   ├── linkareer.md
│   │   │   ├── quber.md
│   │   │   └── plainx.md
│   │   ├── case-studies/
│   │   │   ├── seo-cms.mdx
│   │   │   ├── cdn-cost-saving.mdx
│   │   │   ├── performance-optimization.mdx
│   │   │   └── observability-system.mdx
│   │   ├── side-projects/
│   │   │   ├── project-a.mdx
│   │   │   └── project-b.mdx
│   │   └── taxonomy/                   # 카테고리, 기술 스택, 회사 메타 (JSON)
│   │       ├── categories.json
│   │       ├── skills.json
│   │       └── companies.json
│   │
│   ├── features/
│   │   ├── home/
│   │   │   ├── HomeHero.astro
│   │   │   ├── HomeHighlights.astro
│   │   │   ├── FeaturedCareer.astro
│   │   │   └── FeaturedCaseStudies.astro
│   │   ├── work/
│   │   │   ├── WorkHero.astro
│   │   │   ├── WorkTimeline.astro
│   │   │   ├── WorkCapabilitySummary.astro
│   │   │   └── WorkCompanySections.astro
│   │   ├── case-studies/
│   │   │   ├── CaseStudyList.astro
│   │   │   ├── CaseStudyFilter.astro
│   │   │   └── RelatedCaseStudySection.astro
│   │   └── side-projects/
│   │       ├── SideProjectList.astro
│   │       └── FeaturedSideProjects.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro            # 사이트 공통 뼈대 (head, SEO, 폰트)
│   │   ├── PageLayout.astro            # 일반 페이지 레이아웃
│   │   └── CaseStudyLayout.astro       # 케이스 스터디 읽기형 레이아웃 (MDX 본문 포함)
│   │
│   ├── lib/
│   │   ├── content/
│   │   │   ├── career.ts
│   │   │   ├── caseStudies.ts
│   │   │   ├── sideProjects.ts
│   │   │   └── taxonomy.ts
│   │   ├── seo/
│   │   │   ├── meta.ts
│   │   │   ├── jsonld.ts
│   │   │   └── canonical.ts
│   │   ├── utils/
│   │   │   ├── date.ts
│   │   │   ├── sort.ts
│   │   │   ├── slug.ts
│   │   │   └── text.ts
│   │   └── constants/
│   │       ├── site.ts
│   │       ├── navigation.ts
│   │       └── social.ts
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro              # About + Resume + Contact 통합
│   │   ├── work.astro               # Work (경력 허브, 단일 페이지)
│   │   ├── case-studies/
│   │   │   └── [slug].astro         # Case Study 상세
│   │   └── side-projects.astro      # Side Projects 목록
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── tokens.css
│   │   └── prose.css
│   │
│   ├── content.config.ts
│   └── env.d.ts
│
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. 폴더별 역할 정의

## 4.1 public

정적 파일을 그대로 제공하는 영역이다.

권장 용도:
- favicon
- robots.txt
- PDF 이력서
- 기본 OG 이미지
- 외부 공유용 고정 리소스

주의:
- 프로젝트 썸네일이나 본문 내 이미지까지 모두 `public`에 넣기보다, Astro 이미지 최적화를 활용할 수 있는 자산은 `src/assets` 관리가 더 적합하다.

---

## 4.2 src/assets

이미지, 아이콘 등 빌드 과정에서 다뤄질 에셋을 저장한다.

권장 용도:
- 프로필 이미지
- 회사 로고
- 케이스 스터디 대표 이미지
- 개인 프로젝트 썸네일

구조는 콘텐츠 유형 기준으로 나누는 것이 좋다.

---

## 4.3 src/content

포트폴리오의 핵심 데이터 소스다.  
문서형 콘텐츠와 구조화 데이터를 함께 보관한다.

### 디렉터리 역할

- `career/`: 회사 단위 경력 문서
- `case-studies/`: 문제 해결 사례 상세 문서
- `side-projects/`: 개인 프로젝트 상세 문서
- `taxonomy/`: 카테고리, 기술 스택, 회사 메타 정보

> 홈 소개문, About 소개문 등 짧은 텍스트는 `src/lib/constants/`에서 관리한다.

---

## 4.4 src/pages

라우트를 담당하는 영역이다.  
페이지 파일은 가능한 얇게 유지하고, 데이터 조회와 렌더링 조립 위주로만 구성한다.

예시 책임:
- `index.astro`: 홈 구성 조립
- `work/index.astro`: 전체 경력 목록과 타임라인 표시
- `case-studies/[slug].astro`: 특정 케이스 스터디 렌더링
- `work/[company].astro`: 회사별 상세 페이지

---

## 4.5 src/components

여러 페이지에서 재사용할 수 있는 범용 UI 컴포넌트를 둔다.
`common/`과 `layout/` 두 하위 폴더로 구성한다.

- `common/`: 범용 UI (Button, Tag, SectionHeading, Prose, MetaHead 등)
- `layout/`: 레이아웃 관련 (Header, Footer, Navigation, Container)

> 도메인 전용 컴포넌트(career, case-study, side-project 관련)는 `src/features/`에 둔다.

---

## 4.6 src/features

도메인 단위로 묶이는 화면 조합용 컴포넌트다.  
`components`보다 더 큰 단위이며, 특정 페이지나 특정 섹션 전용 UI를 둔다.

예시:
- 홈의 핵심 지표 섹션
- Work 페이지의 역량 요약 섹션
- Case Studies 리스트 섹션

이 구조를 쓰면 `pages`가 지나치게 비대해지는 것을 막을 수 있다.

---

## 4.7 src/lib

UI와 직접 연결되지 않는 유틸, 데이터 조회 함수, SEO 관련 로직을 둔다.

예시:
- 콘텐츠 조회 함수
- 날짜 포맷 함수
- 태그 정렬 함수
- 메타 태그 생성 함수
- 구조화 데이터 생성 함수

---

## 4.8 src/layouts

문서형 페이지와 상세 페이지에서 반복되는 레이아웃을 관리한다.

권장 레이아웃:
- `BaseLayout`: 사이트 공통 뼈대 (head, SEO, 폰트)
- `PageLayout`: 일반 페이지 레이아웃 (BaseLayout 확장, Header/Footer 포함)
- `CaseStudyLayout`: 케이스 스터디 읽기형 레이아웃 (MDX 본문 렌더링 포함)

---

## 5. 라우팅 설계안

## 5.1 MVP 라우트

```text
/                          → Home (임팩트 요약)
/work                      → Work (회사 경력 허브, 단일 페이지)
/case-studies/[slug]       → Case Study 상세
/side-projects             → Side Projects 목록
/about                     → About + Resume + Contact 통합
```

> `/contact`, `/resume`은 About 페이지에 통합한다. (IA 기획서 기준)
> `/work/[company]` 회사별 상세 페이지는 MVP에서 제외하고, Work 페이지 내 섹션형으로 처리한다.
> `/case-studies` 목록 페이지는 MVP에서 제외하고, Home에서 대표 케이스 3개를 직접 링크한다.

## 5.2 후순위 확장 라우트

아래는 2단계 이후 필요 시 추가한다.

```text
/work/[company]                    → 회사별 상세 페이지
/case-studies                      → Case Study 목록 페이지
/case-studies/category/[category]  → 카테고리별 필터
/side-projects/[slug]              → Side Project 상세 페이지
/tags/[tag]                        → 태그별 탐색
```

### 라우팅 설계 원칙

- 메인 정보 구조와 URL 구조를 일치시킨다.
- 슬러그는 짧고 의미 있게 유지한다.
- 추후 변경 가능성이 높은 제목보다, 안정적인 식별자 기반 슬러그를 우선 고려한다.
- 과거 URL 변경 가능성이 있다면 redirect 정책도 함께 준비한다.

---

## 6. 콘텐츠 컬렉션 설계

## 6.1 컬렉션 구성

추천 컬렉션은 다음과 같다.

- `career`
- `caseStudies`
- `sideProjects`
- `taxonomy`

홈 소개문, About 소개문 등 짧은 텍스트는 `src/lib/constants/`에서 관리한다.

---

## 6.2 career 컬렉션

회사 단위 경력 정보를 관리한다.

### 목적
- Work 페이지의 회사 목록 생성
- 타임라인 생성
- 회사 상세 페이지 생성
- 특정 케이스 스터디와 연결

### 추천 필드

- `company`: 회사명
- `slug`: URL 식별자
- `role`: 직무명
- `employmentType`: 정규직/계약직 등
- `startDate`
- `endDate`
- `isCurrent`
- `summary`: 회사/역할 요약
- `highlights`: 핵심 성과 요약 배열
- `skills`: 관련 기술 태그 배열
- `domains`: 도메인 태그 배열
- `featured`: 홈 노출 여부
- `order`: 정렬 순서
- `seoTitle`: 선택
- `seoDescription`: 선택

### 본문 사용 방식

본문에는 아래 내용을 서술형으로 담는다.

- 회사 소개
- 담당 서비스
- 문제 유형
- 맡은 책임 범위
- 핵심 과제

---

## 6.3 caseStudies 컬렉션

문제 해결 사례를 개별 문서로 관리한다.

### 목적
- 케이스 스터디 목록 페이지 생성
- 상세 페이지 생성
- 회사 경력과 다대일 연결
- 대표 프로젝트를 홈에 노출

### 추천 필드

- `title`
- `slug`
- `companySlug`
- `summary`
- `problem`
- `impact`
- `period`
- `tags`
- `skills`
- `categories`
- `featured`
- `published`
- `order`
- `coverImage`
- `coverAlt`
- `seoTitle`
- `seoDescription`

### 본문 사용 방식

본문은 아래 템플릿으로 관리한다.

1. 프로젝트 개요
2. 배경 및 문제 정의
3. 담당 역할
4. 기술적 난점
5. 해결 전략
6. 구현 내용
7. 결과 및 성과
8. 회고

---

## 6.4 sideProjects 컬렉션

사이드 프로젝트와 개인 프로젝트를 관리한다.

### 추천 필드

- `title`
- `slug`
- `status`
- `summary`
- `description`
- `tags`
- `skills`
- `featured`
- `startedAt`
- `updatedAt`
- `repositoryUrl`
- `projectUrl`
- `coverImage`
- `coverAlt`
- `order`
- `seoTitle`
- `seoDescription`

### status 예시

- `active`
- `paused`
- `archived`

---

## 6.5 taxonomy 컬렉션

카테고리, 기술 스택, 회사 메타 정보를 별도 관리한다.

### 목적
- 태그명 변경 시 일괄 대응
- 표시용 이름과 내부 값 분리
- 카테고리 페이지 생성
- UI 라벨 일관성 유지

### 관리 대상 예시

#### categories
- seo
- performance
- infra
- observability
- platform
- leadership

#### skills
- astro
- typescript
- react
- nextjs
- aws
- graphql
- tailwind

#### companies
- nudge-healthcare
- linkareer
- quber
- plainx

---

## 7. content.config.ts 설계 방향

콘텐츠 스키마는 Zod 기반으로 정의하고, 가능한 한 enum/optional/default를 적극 사용한다.

### 설계 원칙

- URL에 쓰이는 필드는 명시적으로 관리
- 날짜는 문자열 ISO 형식 또는 date 타입으로 통일
- 태그는 문자열 자유 입력보다 taxonomy와 연결되는 값 사용
- 이미지 필드는 로컬 이미지 사용 가능 구조 고려
- 홈 노출 여부, 정렬 순서 같은 UI 제어 필드는 frontmatter에 포함

### 권장 전략

- `career`는 Markdown 또는 MDX
- `caseStudies`는 MDX
- `sideProjects`는 MDX
- `taxonomy`는 JSON

---

## 8. 추천 스키마 예시

## 8.1 career 예시

```md
---
company: "넛지헬스케어"
slug: "nudge-healthcare"
role: "Frontend Developer"
employmentType: "full-time"
startDate: "2024-02-01"
endDate: null
isCurrent: true
summary: "글로벌 서비스 프론트엔드 개발 및 파트 운영을 담당"
highlights:
  - "SEO 통합 관리 CMS 구축"
  - "AWS 및 CDN 비용 절감"
  - "Grafana/Loki 기반 모니터링 환경 고도화"
skills: ["react", "nextjs", "typescript", "aws"]
domains: ["seo", "infra", "observability", "leadership"]
featured: true
order: 1
---

회사 개요 및 담당 업무 설명...
```

---

## 8.2 caseStudies 예시

```mdx
---
title: "SEO 통합 관리 CMS 구축"
slug: "seo-cms"
companySlug: "nudge-healthcare"
summary: "각 서비스별로 분산된 SEO 작업을 CMS 기반으로 통합한 프로젝트"
problem: "서비스별로 중복 작업이 많고 운영 일관성이 부족했다"
impact: "운영 효율 향상 및 SEO 적용 속도 개선"
period: "2024"
tags: ["seo", "cms", "admin"]
skills: ["nextjs", "typescript", "graphql"]
categories: ["seo", "platform"]
featured: true
published: true
order: 1
coverAlt: "SEO CMS 대시보드 예시"
seoTitle: "SEO 통합 관리 CMS 구축 사례"
seoDescription: "분산된 SEO 운영을 통합 CMS로 전환한 프론트엔드 케이스 스터디"
---

## 배경

본문...
```

---

## 8.3 sideProjects 예시

```mdx
---
title: "포켓몬 타입 상성 서비스"
slug: "pokemon-type-tool"
status: "active"
summary: "포켓몬 타입 상성과 기술 정보를 빠르게 탐색할 수 있는 서비스"
description: "검색, 상성 계산, 콘텐츠 SEO 최적화를 포함한 개인 프로젝트"
tags: ["pokemon", "seo", "tool"]
skills: ["nextjs", "typescript", "tailwind"]
featured: true
startedAt: "2025-01-01"
updatedAt: "2026-03-01"
repositoryUrl: ""
projectUrl: ""
coverAlt: "포켓몬 타입 상성 서비스 대표 화면"
order: 1
---

프로젝트 설명...
```

---

## 9. 타입 및 데이터 조회 레이어 설계

콘텐츠 조회 로직은 페이지에 직접 작성하지 않고 `src/lib/content`에 모은다.

### 권장 함수 목록

- `getAllCareers()`
- `getFeaturedCareers()`
- `getCareerBySlug()`
- `getAllCaseStudies()`
- `getFeaturedCaseStudies()`
- `getCaseStudyBySlug()`
- `getCaseStudiesByCompany()`
- `getAllSideProjects()`
- `getFeaturedSideProjects()`
- `getTaxonomyMap()`

### 설계 원칙

- 정렬 기준을 함수 내부에서 일관되게 처리
- draft/published 여부를 한 곳에서 제어
- 페이지는 데이터 함수 결과만 받아 렌더링

---

## 10. 페이지 구현 책임 분리

## 10.1 `src/pages/index.astro`

책임:
- 홈의 섹션 순서 조립
- featured 데이터만 가져와 노출

### 가져오는 데이터 예시
- featured career
- featured case studies
- featured side projects

---

## 10.2 `src/pages/work.astro`

책임:
- 전체 career 목록 표시
- 타임라인 및 회사별 섹션 조립
- 회사별 상세는 별도 페이지 없이 섹션형 서술로 처리 (MVP 기준)

---

## 10.3 `src/pages/case-studies/[slug].astro`

책임:
- MDX 본문 렌더링
- 메타 정보 표시
- 관련 케이스 및 관련 회사 링크 표시

> Case Study 목록 페이지(`index.astro`)는 MVP에서 제외. Home에서 대표 케이스 3개를 직접 링크한다.

---

## 10.4 `src/pages/side-projects.astro`

책임:
- sideProjects 목록 렌더링
- 상태 및 태그 표시

> Side Project 상세 페이지(`[slug].astro`)는 MVP에서 제외.

---

## 10.5 `src/pages/about.astro`

책임:
- 자기소개, 일하는 방식, 기술 스택
- Resume (PDF 다운로드 + 핵심 경력 텍스트 요약)
- Contact (이메일, GitHub, 블로그 링크)

> IA 기획서 기준으로 Resume, Contact를 About에 통합한다.

---

## 10.6 후순위 페이지 (MVP 제외)

아래 페이지는 2단계 이후 필요 시 추가한다.

- `src/pages/work/[company].astro` — 회사별 상세 페이지
- `src/pages/case-studies/index.astro` — Case Study 목록/필터
- `src/pages/side-projects/[slug].astro` — Side Project 상세

---

## 11. SEO/메타 구조 설계

메타 정보는 페이지마다 중복 작성하지 않고 공통 유틸을 통해 생성한다.

### 권장 구조

- `lib/seo/meta.ts`: title, description, ogImage 생성
- `lib/seo/jsonld.ts`: Person, BreadcrumbList, Article 생성
- `components/common/MetaHead.astro`: 실제 head 출력

### 페이지별 정책

- Home: 전체 브랜딩 중심
- Work: 경력 소개 중심
- Case Study 상세: 프로젝트/문제 해결 중심
- Side Project 상세: 프로젝트 설명 중심

---

## 12. 스타일 구조 설계

스타일은 전역 한 파일에 모두 몰아넣지 말고 역할 기준으로 나누는 것이 좋다.

### 권장 구성

- `global.css`: reset, 기본 typography, 전역 토큰 호출
- `tokens.css`: color, spacing, radius, shadow 등 디자인 토큰
- `prose.css`: MDX/본문 전용 스타일

### 원칙

- 공통 spacing 규칙 통일
- 카드/섹션/본문 스타일 일관성 유지
- 긴 글 페이지와 리스트 페이지의 타이포 규칙 분리

---

## 13. 초기 MVP에서 생략 가능한 것

처음부터 아래까지 모두 구현할 필요는 없다.

### 생략 가능
- 회사별 상세 페이지
- 태그별 페이지
- 클라이언트 검색 기능
- 복잡한 필터 상태 관리
- 다국어 지원
- 블로그 시스템

### 우선 구현 추천
- 홈
- Work
- Case Study 상세 3개
- Side Projects 목록
- About

---

## 14. 실제 시작 순서 제안

### 1단계: 기본 구조 생성
- 폴더 생성
- 라우트 파일 생성
- BaseLayout, PageLayout 생성

### 2단계: 콘텐츠 컬렉션 정의
- `content.config.ts` 작성
- career / caseStudies / sideProjects 샘플 문서 작성

### 3단계: 데이터 조회 레이어 구현
- `lib/content` 유틸 작성
- 정렬/featured 처리 구현

### 4단계: 핵심 페이지 조립
- Home
- Work
- Case Study 상세

### 5단계: SEO와 OG 적용
- 공통 MetaHead 구현
- 구조화 데이터 적용

### 6단계: 후속 확장
- 회사 상세 페이지
- 태그 필터
- Contact 폼

---

## 15. 최종 권장안 요약

이 포트폴리오의 Astro 구조는 아래 기준으로 가져가는 것이 가장 적절하다.

- `src/pages`는 라우트 중심
- `src/content`는 문서와 메타데이터 중심
- `src/components`는 범용 UI 중심
- `src/features`는 도메인 UI 조합 중심
- `src/lib`는 데이터와 SEO 유틸 중심

콘텐츠는 아래 세 축으로 관리한다.

- 회사 경력: `career`
- 문제 해결 사례: `caseStudies`
- 개인/사이드 프로젝트: `sideProjects`

이 구조를 따르면 초기 MVP 제작이 빠르고, 이후 경력 추가나 케이스 스터디 확장도 매우 수월해진다.

