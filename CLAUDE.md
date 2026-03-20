# CLAUDE.md — Devfolio v3 프로젝트 지침서

## 프로젝트 개요

7년차 프론트엔드 개발자 장선규의 경력 아카이브형 포트폴리오 사이트.
기획 상세는 `.claude/portfolio_ia.md` 참고.

## 기술 스택

- **프레임워크:** Astro
- **언어:** TypeScript (strict)
- **콘텐츠:** MDX + Astro Content Collections
- **스타일링:** Tailwind CSS v4
- **애니메이션:** CSS + GSAP (최소한으로 적용)
- **폰트:** Pretendard
- **배포:** Vercel 또는 Cloudflare Pages

## 응답 규칙

- 모든 답변은 **한국어**로 작성한다.
- 무게, 거리, 통화 등 단위 기준은 **한국(KR)** 을 우선 적용한다.
- 코드를 바로 수정하지 않는다. **반드시 어떤 방식으로 수정할 예정인지 제안을 먼저** 한다.
- 제안을 확인한 뒤, 사용자가 **작업을 요청했을 때에만** 코드를 작성한다.
- 외부 라이브러리를 추가해야 하는 경우, 아래 항목을 반드시 먼저 설명한다:
  - 어떤 라이브러리인지
  - 왜 필요한지
  - 다른 대안은 없는지
- 코드 작성 후 **이슈 가능성을 점검**하고, 개선 의견을 반드시 제시한다.

## 코딩 컨벤션

### TypeScript

- `any` 타입 사용 **절대 금지**. 반드시 명확한 타입을 정의한다.
- 함수는 반드시 **화살표 함수(arrow function)** 로 작성한다.

```typescript
// Good
const getFullName = (first: string, last: string): string => {
  return `${first} ${last}`;
};

// Bad
function getFullName(first: string, last: string): string {
  return `${first} ${last}`;
}
```

### Astro 컴포넌트

- **React, Vue 등 프레임워크 컴포넌트를 사용하지 않는다.**
- Astro 컴포넌트(`.astro`) + 순수 JavaScript만 사용한다.
- 인터랙션이 필요한 경우 `<script>` 태그 내 Vanilla JS 또는 Astro Islands(순수 JS)로 처리한다.

### 스타일링

- **인라인 스타일 절대 금지.** `style` 속성을 직접 지정하지 않는다.
- Tailwind CSS 유틸리티 클래스를 우선 사용한다.
- Tailwind로 해결이 어려운 경우 `<style>` 블록 또는 CSS 파일을 사용한다.

```astro
<!-- Good -->
<div class="flex items-center gap-4 text-gray-900">
  <!-- Bad -->
  <div style="display: flex; align-items: center; gap: 16px; color: #111;"></div>
</div>
```

### 네이밍

- 컴포넌트 파일: **PascalCase** (`Hero.astro`, `CareerTimeline.astro`)
- 유틸리티/데이터 파일: **camelCase** (`career.ts`, `formatDate.ts`)
- CSS 클래스(커스텀): **kebab-case** (`career-timeline`, `hero-section`)
- 상수: **UPPER_SNAKE_CASE** (`MAX_ITEMS`, `DEFAULT_LOCALE`)

## 코드 품질

- 코드 작성 시 프로젝트 루트의 `.eslintrc.mjs`와 `.prettierrc`에 정의된 규칙을 준수한다.
- 규칙 파일이 없거나 새로운 규칙이 필요한 경우, 먼저 논의 후 추가한다.

## ESLint 규칙 요약 (eslint.config.mjs)

- `@typescript-eslint/no-explicit-any`: **error** — any 사용 금지
- `prefer-arrow-callback`: **error** — 콜백은 화살표 함수
- `func-style`: **["error", "expression"]** — 함수 선언 대신 표현식(화살표)
- `no-restricted-syntax`: function declaration 금지
- `astro/no-unused-css-selectors`: **warn** — 미사용 CSS 감지
- `eslint-plugin-astro` + `typescript-eslint` 추천 규칙 적용

## Prettier 규칙 요약 (.prettierrc)

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-astro"]
}
```

## 아키텍처 레이어 규칙

각 레이어의 역할을 명확히 분리한다.

- **`src/pages/`** — 라우트 책임만 가진다. 데이터 가공이나 UI 로직을 직접 처리하지 않고, `lib`과 `features`에서 조립한다.
- **`src/features/`** — 특정 페이지/도메인 전용 화면 조합 컴포넌트. `components`보다 큰 단위의 섹션 UI를 담당한다.
- **`src/components/`** — 여러 페이지에서 재사용 가능한 범용 UI 컴포넌트 (Button, Tag, Card 등).
- **`src/lib/`** — UI와 직접 연결되지 않는 유틸, 데이터 조회 함수, SEO 로직.
- **`src/content/`** — 콘텐츠 데이터 소스 (Content Collections).
- **`src/layouts/`** — 페이지 레이아웃 템플릿.
- **`src/assets/`** — 빌드 과정에서 최적화될 이미지, 아이콘.

### 콘텐츠 조회 규칙

- 콘텐츠 조회 함수는 `src/lib/content/`에 모은다.
- 페이지에서 `getCollection()`을 직접 호출하지 않고, `lib/content/`의 래퍼 함수를 사용한다.
- 정렬, draft/published 필터, featured 여부는 래퍼 함수 내부에서 일관되게 처리한다.

### 이미지 관리 규칙

- Astro 이미지 최적화 대상 (프로필, 회사 로고, 프로젝트 썸네일): **`src/assets/images/`**
- 정적 파일 그대로 제공 (favicon, PDF 이력서, OG 기본 이미지): **`public/`**

## 디렉토리 구조

```text
public/
├── favicon.svg
├── robots.txt
├── resume/
│   └── resume-latest.pdf              # PDF 이력서
└── og/
    ├── default.png                    # 기본 OG 이미지
    ├── work.png
    └── case-studies.png

src/
├── assets/
│   ├── images/
│   │   ├── profile/                # 프로필 이미지
│   │   ├── companies/              # 회사 로고
│   │   ├── case-studies/           # 케이스 스터디 대표 이미지
│   │   └── side-projects/          # 사이드 프로젝트 썸네일
│   └── icons/
├── layouts/
│   ├── BaseLayout.astro            # 사이트 공통 뼈대 (head, SEO, 폰트)
│   ├── PageLayout.astro            # 일반 페이지 레이아웃
│   └── CaseStudyLayout.astro       # 케이스 스터디 읽기형 레이아웃
├── pages/
│   ├── index.astro                 # Home
│   ├── work.astro                  # Work (경력 허브)
│   ├── case-studies/
│   │   └── [slug].astro            # Case Study 상세
│   ├── side-projects.astro         # Side Projects
│   └── about.astro                 # About + Resume + Contact
├── features/
│   ├── home/                       # Home 전용 섹션 컴포넌트
│   ├── work/                       # Work 전용 섹션 컴포넌트
│   ├── case-studies/               # Case Study 전용 섹션 컴포넌트
│   └── side-projects/              # Side Projects 전용 섹션 컴포넌트
├── components/
│   ├── common/                     # 범용 UI (Button, Tag, SectionHeading 등)
│   └── layout/                     # 레이아웃 관련 (Header, Footer, Navigation)
├── lib/
│   ├── content/                    # 콘텐츠 조회 함수 (career.ts, caseStudies.ts 등)
│   ├── seo/                        # SEO 유틸 (meta.ts, jsonld.ts)
│   ├── utils/                      # 범용 유틸 (date.ts, sort.ts 등)
│   └── constants/                  # 상수 (site.ts, navigation.ts, social.ts)
├── content/
│   ├── career/                     # 회사별 경력 데이터
│   ├── case-studies/               # MDX 케이스 스터디
│   ├── side-projects/              # 사이드 프로젝트 데이터
│   └── taxonomy/                   # 카테고리, 기술 스택, 회사 메타 (JSON)
├── styles/
│   ├── global.css                  # reset, 기본 typography, 전역 토큰
│   ├── tokens.css                  # color, spacing, radius 등 디자인 토큰
│   └── prose.css                   # MDX/본문 전용 스타일
└── content.config.ts               # 콘텐츠 스키마 정의 (Zod)
```

## 콘텐츠 관리

- 경력, 케이스 스터디, 사이드 프로젝트는 `src/content/` 하위에서 Astro Content Collections로 관리한다.
- 케이스 스터디는 MDX 형식으로 작성하며, 프론트매터에 필수 메타데이터를 포함한다.
- 콘텐츠 스키마는 `src/content/config.ts`에서 Zod로 정의한다.

## SEO 규칙

- 모든 페이지에 고유한 `title`, `description` 메타 태그를 적용한다.
- 구조화 데이터(JSON-LD): `Person`, `WebSite`, `WebPage`, `BreadcrumbList` 적용.
- `sitemap.xml`, `robots.txt` 자동 생성.
- 헤딩 구조는 `h1` → `h2` → `h3` 순서를 반드시 준수한다 (건너뛰기 금지).

## 브랜치 전략

- 모든 작업에서는 현재 브랜치를 확인하고 모든 작업에서 지켜져야함

### 버전 관리

- **Semantic Versioning**을 따른다: `MAJOR.MINOR.PATCH`
- 프로젝트 초기 단계이므로 `0.x.x`부터 시작한다.
  - `0.x.x`: 프로덕션 출시 전 개발 단계
  - `1.0.0`: 첫 프로덕션 배포 시점
- 버전 번호 기준:
  - **MAJOR (`x.0.0`)**: 전체 구조 변경, 대규모 리디자인
  - **MINOR (`0.x.0`)**: 새 기능 추가, 페이지 신규 구현
  - **PATCH (`0.0.x`)**: 버그 수정, 스타일 미세 조정, 오타 수정

### 브랜치 네이밍

- 버전 작업 브랜치: `feature/{version}` (예: `feature/0.1.0`)
- 하위 작업 브랜치: `feature/{version}` 브랜치에서 분기하여 자유롭게 네이밍 가능
- `master` 브랜치: 안정된 릴리즈 코드만 유지

### 워크플로우

1. 현재 브랜치를 확인
2. `master` 브랜치라면 신규 버전 브랜치 생성 확인 요청
3. 새 버전 작업 시작: `master`에서 `feature/{version}` 브랜치 생성
4. 세부 작업은 `feature/{version}` 브랜치에서 하위 브랜치를 분기하여 진행
5. 하위 작업 완료 시 `feature/{version}`으로 PR & 머지
6. 버전의 모든 작업 완료 시 `feature/{version}` → `master`로 릴리즈 PR & 머지
7. 머지 후 `master`에 버전 태그 생성 (예: `v0.1.0`)

### 적용 범위

- 이 브랜치 전략은 현재 `master`에 커밋된 초기 셋업 이후의 작업부터 적용한다.
- 초기 셋업(프로젝트 생성, 의존성 설치, 설정 파일)은 `master`에 직접 커밋된 상태이다.

## 참고 문서

- 사이트 기획 (IA): `.claude/portfolio_ia.md`
- 폴더 구조 및 콘텐츠 스키마: `.claude/portfolio_astro_folder_structure_and_content_schema.md`
- 의사결정 기록: `.claude/decisions/`
- 커스텀 명령어: `.claude/commands/`

### `.claude/` 폴더 관리 규칙

- `.claude/` 폴더는 **프로젝트 루트**에 위치한다. 글로벌(`~/.claude/`)이 아닌 프로젝트별 문서를 관리하는 폴더다.
- 기획 문서, 기술 설계 문서, 의사결정 기록(ADR) 등 프로젝트 관련 문서는 모두 이 폴더에서 관리한다.
- 명령을 수행할 때 관련된 기획, 구조, 콘텐츠 정보가 필요한 경우 **반드시 `.claude/` 폴더 내의 md 파일을 먼저 확인**한다.
- 기획 문서에 이미 정의된 내용을 임의로 변경하거나 무시하지 않는다.
- 문서에 없는 새로운 결정이 필요한 경우, 사용자에게 먼저 확인한다.

## 의사결정 기록 (ADR)

- 개발 중 기술적 의사결정이 필요한 경우, `.claude/decisions/` 폴더에 ADR 파일을 작성한다.
- 파일명 형식: `NNN-제목.md` (예: `001-astro-version.md`)
- ADR에는 다음 항목을 포함한다:
  - **상태**: 제안됨 / 승인됨 / 폐기됨
  - **배경**: 왜 이 의사결정이 필요했는지
  - **논의 내용**: 검토한 선택지와 각각의 장단점
  - **결정**: 최종 선택한 방향
  - **근거**: 결정의 이유
- 기존 결정을 변경할 경우, 기존 ADR의 상태를 '폐기됨'으로 변경하고 새 ADR을 작성한다.

## 커스텀 명령어

프로젝트 전용 slash command는 `.claude/commands/` 폴더에서 관리한다.

### 사용 가능한 명령어

| 명령어          | 사용법                    | 설명                                                                                                         |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `/create-pr`    | `/create-pr {base브랜치}` | 현재 브랜치에서 지정한 base 브랜치로 PR을 생성한다. `.github/PULL_REQUEST_TEMPLATE.md` 형식을 따른다.        |
| `/review-pr`    | `/review-pr {PR번호}`     | PR에 달린 코드 리뷰 코멘트를 분석하고, 각 코멘트에 대해 동의/반박/수정 방안을 제시한다.                      |
| `/reply-review` | `/reply-review {PR번호}`  | `/review-pr` 분석 결과를 기반으로 반박/검토 결과를 GitHub 코멘트로 작성한다. `/review-pr`이 선행되어야 한다. |

### 명령어 관리 규칙

- 커스텀 명령어 파일은 `.claude/commands/` 폴더에 마크다운 형식으로 작성한다.
- 새 명령어를 추가할 경우, 이 섹션의 표에도 함께 등록한다.
