# ADR-003: 컴포넌트 아키텍처 패턴 선택

## 상태

승인됨 (2025-03-19)

## 배경

프로젝트 폴더 구조 생성 단계에서, 컴포넌트를 어떤 설계 패턴으로 분류하고 배치할지 결정이 필요했다. 프론트엔드 생태계에는 여러 컴포넌트 설계 패턴이 존재하며, 각각 적합한 프로젝트 규모와 특성이 다르다.

고려한 제약 조건:

- 개인 포트폴리오 프로젝트로 컴포넌트 총 수가 많지 않다
- Astro 프레임워크의 관례와 자연스럽게 호환되어야 한다
- Content Collections 기반 콘텐츠 관리 구조와 충돌하지 않아야 한다
- 과도한 분류 체계는 생산성을 떨어뜨린다

## 논의 내용

### 1. Atomic Design (아토믹 디자인)

Brad Frost가 제안한 방법론으로, 화학의 원자-분자-유기체 개념을 차용하여 UI를 5단계 계층으로 분류한다.

| 단계 | 이름 | 설명 | 예시 |
|------|------|------|------|
| 1 | Atoms | 최소 UI 단위 | Button, Tag, Icon |
| 2 | Molecules | Atoms 조합 | SearchBar, TagGroup |
| 3 | Organisms | 독립적 섹션 | Header, Footer |
| 4 | Templates | 페이지 레이아웃 뼈대 | BaseLayout, PageLayout |
| 5 | Pages | 실제 데이터가 들어간 결과물 | index.astro |

**장점:**

- 컴포넌트 분류 기준이 명확하여 "어디에 둘지" 고민이 줄어듦
- 재사용성에 대한 의식적 설계가 가능

**단점:**

- 이 프로젝트의 범용 컴포넌트는 Button, Tag, SectionHeading 정도로 적어서, atoms/molecules 분리 시 폴더만 늘고 실질적 이점이 적다
- Templates 계층이 Astro의 `layouts/` 디렉토리와 역할이 중복된다
- 기획된 `features/` 폴더와 Organisms 계층의 역할이 충돌하여, 두 분류 체계가 공존하면 혼란이 생긴다
- "이 컴포넌트가 molecule인가 organism인가?" 경계 판단이 빈번하게 필요하다
- Astro 공식 문서와 커뮤니티 관례와 다르며, React 대규모 앱에서 주로 사용되는 패턴이다

---

### 2. Feature-Sliced Design (FSD)

러시아/유럽 프론트엔드 커뮤니티에서 발전한 아키텍처로, 기능(도메인) 단위로 코드를 수직 분리한다. 7개 계층(app, processes, pages, widgets, features, entities, shared)으로 구성된다.

**장점:**

- 의존성 방향이 명확하다 (상위 → 하위만 참조 가능)
- 대규모 팀에서 코드 충돌 방지에 효과적이다

**단점:**

- 7개 계층은 개인 포트폴리오 프로젝트에 과도하다
- Astro의 관례(`pages/`, `layouts/`, `components/`)와 맞지 않아 변환 비용이 크다
- 학습 비용 대비 이 프로젝트에서 얻는 이점이 적다

---

### 3. Colocation 패턴 (도메인 기반 그룹핑)

Next.js App Router에서 대중화된 접근으로, 관련 파일을 기능 단위로 같은 폴더에 모은다. 컴포넌트, 스타일, 데이터 로직을 하나의 도메인 폴더에 함께 배치한다.

**장점:**

- 관련 코드가 물리적으로 가까워 탐색이 빠르다
- 특정 기능 삭제 시 폴더 단위로 제거할 수 있다

**단점:**

- "공유 vs 전용" 경계 판단이 필요하다
- Astro의 Content Collections 구조와는 별도 관리가 필요하다
- 순수 Colocation만 적용하면 `lib/` 같은 공유 유틸 레이어가 모호해진다

---

### 4. 계층형 + 도메인 하이브리드 (현재 기획 구조)

Astro 관례를 기반으로, 범용 UI(`components/`)와 도메인 전용 UI(`features/`)를 분리하는 구조다.

```text
src/
├── components/
│   ├── common/       → 범용 UI (Button, Tag, SectionHeading)
│   └── layout/       → 구조 UI (Header, Footer, Navigation)
├── features/         → 도메인별 섹션 컴포넌트
│   ├── home/
│   ├── work/
│   ├── case-studies/
│   └── side-projects/
├── layouts/          → 페이지 레이아웃 템플릿
├── lib/              → 유틸, 데이터 조회, 상수
├── content/          → Content Collections
├── pages/            → 라우트 (얇게 유지)
├── styles/           → 전역 스타일
```

**장점:**

- Astro의 설계 철학(`pages` + `layouts` + `components`)과 자연스럽게 일치한다
- `features/`로 도메인 전용 섹션 컴포넌트를 분리하여, pages가 비대해지는 것을 방지한다
- 분류 기준이 직관적이다: "여러 페이지에서 쓰이나?" → `components/`, "특정 페이지 전용인가?" → `features/`
- Content Collections와 자연스럽게 통합된다
- 계층이 3단계(components → features → pages)로 단순하여 분류 판단 비용이 낮다

**아토믹 패턴의 사고방식이 이미 반영된 구조:**

- `components/common/` = Atoms + Molecules
- `components/layout/` + `features/` = Organisms
- `layouts/` = Templates
- `pages/` = Pages

## 결정

**계층형 + 도메인 하이브리드 구조**(현재 기획 구조)를 채택한다.

### 컴포넌트 배치 규칙

| 조건 | 배치 위치 | 예시 |
|------|-----------|------|
| 여러 페이지에서 재사용 가능한 범용 UI | `components/common/` | Button, Tag, SectionHeading |
| 사이트 구조를 구성하는 레이아웃 요소 | `components/layout/` | Header, Footer, Navigation |
| 특정 페이지/도메인 전용 섹션 컴포넌트 | `features/{domain}/` | HomeHero, WorkTimeline |
| 페이지 레이아웃 템플릿 | `layouts/` | BaseLayout, PageLayout |

### 검토했으나 채택하지 않은 패턴

| 패턴 | 미채택 이유 |
|------|-------------|
| Atomic Design | 5단계 분류가 과도, Templates/Organisms가 기존 구조와 충돌, Astro 관례와 다름 |
| Feature-Sliced Design | 7계층이 개인 프로젝트에 과도, Astro 관례와 맞지 않음 |
| Colocation | 부분 아이디어는 차용 가능하나, 순수 적용 시 공유 레이어 관리가 모호 |

## 근거

- **Astro 생태계 호환:** Astro 공식 문서와 커뮤니티에서 권장하는 `components/` + `layouts/` 기반 구조를 따르므로, 프레임워크 업데이트 시에도 마이그레이션 비용이 없다.
- **실용적 분류:** 컴포넌트 총 수가 적은 개인 프로젝트에서는 3계층(common → features → pages) 분류가 가장 효율적이다. 과도한 분류는 폴더만 늘리고 생산성을 떨어뜨린다.
- **직관적 판단 기준:** "재사용 가능한가?"라는 단일 질문으로 `components/`와 `features/` 배치를 결정할 수 있다.
- **아토믹 사고방식 내재:** 별도의 아토믹 계층 없이도, 작은 단위(common)에서 큰 단위(features)로 조합하는 원칙이 자연스럽게 적용된다.
