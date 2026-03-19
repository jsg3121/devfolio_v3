# ADR-002: 의존성 패키지 선택

## 상태

승인됨 (2025-03-19)

## 배경

Astro 5 기반 포트폴리오 프로젝트의 초기 셋업 단계에서, 프레임워크(astro) 외에 어떤 패키지를 추가로 설치할지 결정이 필요했다. CLAUDE.md에 정의된 기술 스택(Tailwind CSS v4, MDX, TypeScript strict)과 코딩 컨벤션(ESLint, Prettier 규칙)을 충족하면서, 불필요한 의존성은 최소화해야 했다.

패키지 선택 시 고려한 원칙:

- 프로젝트 요구사항에 직접 필요한 패키지만 설치한다
- Astro 공식 인테그레이션이 있으면 우선 사용한다
- CLAUDE.md에 "React, Vue 등 프레임워크 컴포넌트를 사용하지 않는다"고 명시되어 있으므로, UI 프레임워크 관련 패키지는 설치하지 않는다

## 논의 내용

### 1. 콘텐츠 처리: `@astrojs/mdx` (v4.3.14)

**역할:** `.mdx` 파일을 Astro 페이지 및 Content Collections에서 사용할 수 있게 해주는 공식 인테그레이션.

**왜 필요한가:**

- 케이스 스터디(`src/content/case-studies/*.mdx`)가 MDX 형식으로 작성된다 (IA 기획서 기준)
- MDX는 Markdown 안에서 Astro 컴포넌트를 사용할 수 있어, 본문 내 인터랙티브 요소(차트, 코드 하이라이트 커스텀 등)를 삽입할 수 있다
- 사이드 프로젝트 상세 문서도 MDX로 작성할 예정

**검토한 대안:**

- **순수 Markdown (.md):** Astro 기본 지원이라 추가 패키지 불필요. 하지만 본문 내 컴포넌트 삽입이 불가능하여, 케이스 스터디의 시각적 표현에 한계가 있다.
- **외부 CMS (Contentful, Sanity 등):** 콘텐츠를 외부에서 관리할 수 있지만, 개인 포트폴리오에는 과도한 구성이며 외부 서비스 의존성이 생긴다.

**선택 이유:** Astro 공식 인테그레이션이고, 케이스 스터디에서 컴포넌트 삽입이 필수적이므로 MDX가 가장 적합하다.

**버전 참고:** `@astrojs/mdx@5`는 Astro 6 전용이므로, Astro 5 호환인 v4를 설치했다.

---

### 2. SEO: `@astrojs/sitemap` (v3.7.1)

**역할:** 빌드 시 `sitemap.xml`을 자동 생성하는 공식 인테그레이션.

**왜 필요한가:**

- CLAUDE.md SEO 규칙에 "`sitemap.xml`, `robots.txt` 자동 생성"이 명시되어 있다
- 검색 엔진 크롤러가 사이트 구조를 효율적으로 파악하는 데 필수적이다
- 페이지가 추가/변경될 때마다 수동으로 sitemap을 관리하는 것은 비효율적이다

**검토한 대안:**

- **수동 작성:** 페이지가 5개(MVP 기준)로 적어 수동 관리도 가능하지만, 향후 케이스 스터디/사이드 프로젝트가 늘어나면 유지보수 비용이 증가한다.
- **서드파티 플러그인:** 공식 인테그레이션이 이미 존재하므로 별도 서드파티를 사용할 이유가 없다.

**선택 이유:** Astro 공식 인테그레이션이며 설정이 간단하고, `astro.config.mjs`의 `site` 필드만 지정하면 자동으로 동작한다.

**버전 참고:** `@astrojs/sitemap@3`이 Astro 5 호환 최신 버전이다.

---

### 3. 스타일링: `tailwindcss` (v4.2.2) + `@tailwindcss/vite` (v4.2.2)

**역할:** 유틸리티 퍼스트 CSS 프레임워크. Vite 플러그인 방식으로 Astro와 통합한다.

**왜 필요한가:**

- CLAUDE.md에 "Tailwind CSS 유틸리티 클래스를 우선 사용한다"고 명시되어 있다
- 별도 CSS 파일 없이도 컴포넌트 내에서 빠르게 스타일을 적용할 수 있어 개발 속도가 빠르다
- 디자인 시스템 없이 개인이 개발하는 프로젝트에서 일관된 스타일을 유지하기에 적합하다

**검토한 대안:**

- **`@astrojs/tailwind` 인테그레이션:** Astro 공식 Tailwind 인테그레이션이지만, Tailwind v4부터는 deprecated 방향이다. Astro 6에서는 이미 제거되었으므로 `@tailwindcss/vite` 방식이 미래 호환적이다 (ADR-001 참고).
- **Vanilla CSS / CSS Modules:** 추가 패키지 불필요하지만, 유틸리티 클래스 없이 모든 스타일을 직접 작성해야 해 개발 속도가 느려진다.
- **UnoCSS:** Tailwind와 유사한 유틸리티 퍼스트 접근이지만, Tailwind 대비 에코시스템이 작고 팀/협업 시 러닝커브가 있다.

**선택 이유:** CLAUDE.md에 명시된 기술 스택이며, `@tailwindcss/vite` 방식은 Astro 6 마이그레이션 시에도 그대로 사용할 수 있다.

**두 패키지가 필요한 이유:** `tailwindcss`는 Tailwind의 핵심 엔진이고, `@tailwindcss/vite`는 Vite 빌드 파이프라인에 통합하기 위한 플러그인이다. Tailwind v4부터 PostCSS 대신 Vite 플러그인 방식이 권장된다.

---

### 4. 코드 포매팅: `prettier` (v3.8.1) + `prettier-plugin-astro` (v0.14.1)

**역할:** 코드 스타일 자동 포매팅. `.astro` 파일의 프론트매터 + 템플릿 구문을 올바르게 파싱한다.

**왜 필요한가:**

- CLAUDE.md에 Prettier 규칙이 명시되어 있다 (semi, singleQuote, tabWidth, trailingComma 등)
- `.astro` 파일은 HTML + JavaScript + CSS가 혼합된 구조이므로, 기본 Prettier로는 파싱이 불완전하다
- 코드 스타일을 수동으로 맞추는 것은 비효율적이며, 일관성을 보장하기 어렵다

**검토한 대안:**

- **Biome:** Prettier + ESLint를 대체하는 올인원 도구. 속도가 매우 빠르지만 `.astro` 파일 지원이 아직 불완전하다.
- **dprint:** Rust 기반 고속 포매터. 역시 `.astro` 파일 지원이 부족하다.

**선택 이유:** `.astro` 파일을 공식적으로 지원하는 포매터는 Prettier + `prettier-plugin-astro` 조합이 유일하다. `--save-exact`로 설치하여 버전을 고정했다.

---

### 5. 코드 린팅: ESLint 관련 패키지 (5개)

| 패키지                | 버전    | 역할                                                 |
| --------------------- | ------- | ---------------------------------------------------- |
| `eslint`              | v10.0.3 | ESLint 코어 엔진                                     |
| `@eslint/js`          | v10.0.1 | ESLint 기본 추천 규칙 (`eslint.configs.recommended`) |
| `typescript-eslint`   | v8.57.1 | TypeScript 코드 분석 및 규칙 적용                    |
| `eslint-plugin-astro` | v1.6.0  | `.astro` 파일 린팅 지원                              |
| `globals`             | v17.4.0 | 브라우저/Node.js 전역 변수 정의 (no-undef 오탐 방지) |

**왜 필요한가:**

- CLAUDE.md에 ESLint 규칙이 상세히 명시되어 있다 (`no-explicit-any: error`, `func-style: expression`, `no-restricted-syntax: FunctionDeclaration` 등)
- TypeScript strict 모드를 사용하므로, `typescript-eslint`을 통한 타입 인지 린팅이 필요하다
- `.astro` 파일 내부의 스크립트와 미사용 CSS 셀렉터를 감지하려면 `eslint-plugin-astro`가 필요하다

**검토한 대안:**

- **Biome:** 위 Prettier 항목과 동일한 이유로 `.astro` 지원 부족.
- **ESLint v9 (이전 버전):** Flat config를 지원하지만, v10이 최신 안정 버전이므로 v10을 채택했다.

**선택 이유:** CLAUDE.md의 lint 규칙을 구현하려면 이 5개 패키지 조합이 필요하다. ESLint flat config 방식을 사용하여 `eslint.config.mjs` 단일 파일로 관리한다.

**`globals` 패키지 상세:** ESLint flat config에서는 `env: { browser: true }` 설정이 사라졌기 때문에, `window`, `document`, `process` 같은 전역 변수를 `globals` 패키지로 직접 선언해야 한다. 없으면 이 변수들을 사용할 때마다 `no-undef` 에러가 발생한다.

## 결정

### 프로덕션 의존성 (dependencies)

| 패키지              | 버전    | 용도                      |
| ------------------- | ------- | ------------------------- |
| `astro`             | ^5.18.1 | 프레임워크 코어 (ADR-001) |
| `@astrojs/mdx`      | ^4.3.14 | MDX 콘텐츠 지원           |
| `@astrojs/sitemap`  | ^3.7.1  | sitemap.xml 자동 생성     |
| `tailwindcss`       | ^4.2.2  | CSS 유틸리티 프레임워크   |
| `@tailwindcss/vite` | ^4.2.2  | Tailwind Vite 플러그인    |

### 개발 의존성 (devDependencies)

| 패키지                  | 버전    | 용도                      |
| ----------------------- | ------- | ------------------------- |
| `prettier`              | 3.8.1   | 코드 포매팅               |
| `prettier-plugin-astro` | 0.14.1  | .astro 파일 Prettier 지원 |
| `eslint`                | ^10.0.3 | 코드 린팅 엔진            |
| `@eslint/js`            | ^10.0.1 | ESLint 기본 규칙          |
| `typescript-eslint`     | ^8.57.1 | TypeScript 린팅           |
| `eslint-plugin-astro`   | ^1.6.0  | Astro 파일 린팅           |
| `globals`               | ^17.4.0 | 전역 변수 정의            |

### 설치하지 않은 패키지와 그 이유

| 패키지                              | 미설치 이유                                                 |
| ----------------------------------- | ----------------------------------------------------------- |
| `@astrojs/tailwind`                 | Tailwind v4부터 deprecated 방향. `@tailwindcss/vite`로 대체 |
| `@astrojs/react`, `@astrojs/vue` 등 | CLAUDE.md에 프레임워크 컴포넌트 사용 금지 명시              |
| `sass`, `less`                      | Tailwind 유틸리티 우선 + CSS 파일 보조로 충분               |
| `biome`                             | `.astro` 파일 지원 불완전                                   |

## 근거

- **최소 의존성 원칙:** 프로젝트 요구사항에 직접 필요한 패키지만 설치하여 번들 크기와 유지보수 비용을 최소화했다.
- **공식 생태계 우선:** Astro 공식 인테그레이션(`@astrojs/mdx`, `@astrojs/sitemap`)을 사용하여 호환성과 업데이트 안정성을 확보했다.
- **미래 호환성:** Tailwind는 `@tailwindcss/vite` 방식을 사용하여 Astro 6 마이그레이션 시에도 변경 없이 동작한다 (ADR-001 연계).
- **CLAUDE.md 준수:** 기술 스택, 코딩 컨벤션, ESLint/Prettier 규칙이 모두 CLAUDE.md에 정의되어 있으므로, 이를 충족하는 패키지 조합을 선택했다.
