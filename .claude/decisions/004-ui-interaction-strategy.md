# ADR-004: UI 인터랙션 전략 및 구현 방식

## 상태

승인됨 (2026-03-20)

## 배경

정적 포트폴리오 사이트에 인터랙션을 추가하여 완성도를 높이고자 했다. 기존 기획서에서는 "CSS + GSAP (최소한으로 적용)"으로 명시되어 있었으나, 구체적으로 어떤 인터랙션을 어떤 방식으로 적용할지 결정이 필요했다.

주요 결정 사항:

1. 페이지 전환 인터랙션 방식
2. 스크롤 기반 등장 애니메이션 구현 방식
3. GSAP 사용 범위
4. 다크모드 도입 시점

## 외부 레퍼런스

인터랙션 방향을 결정하기 위해 다음 레퍼런스를 참고했다.

### Astro + GSAP 조합 사례

- [Joffrey Spitzer Portfolio](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/) — Astro + GSAP 기반 미니멀 포트폴리오. reveal 애니메이션, flip transition, 미세 모션을 절제된 방식으로 적용한 사례. 이 프로젝트의 "과하지 않은 인터랙션" 방향에 가장 부합하는 레퍼런스.
- [Scroll-Revealed WebGL Gallery (Codrops)](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/) — GSAP + Three.js + Astro 조합으로 스크롤 기반 갤러리를 구현한 사례.
- [Animating Multi-Page Navigations with View Transitions (Codrops)](https://tympanus.net/codrops/2023/10/03/animating-multi-page-navigations-with-browser-view-transitions-and-astro/) — Astro View Transitions API를 활용한 멀티 페이지 전환 애니메이션 튜토리얼.

### Astro View Transitions + GSAP 통합 가이드

- [Enhancing Astro View Transitions with GSAP (Vasko Pavic)](https://vaskopavic.com/blog/enhancing-astro-view-transitions-with-gsap-animations/) — GSAP 애니메이션과 Astro View Transitions를 함께 사용할 때의 정리/재초기화 패턴.
- [GSAP + Astro View Transitions 통합 가이드 (LaunchFast)](https://www.launchfa.st/blog/gsap-astro-view-transitions) — `astro:page-load`, `astro:after-swap` 이벤트 활용법.
- [Astro View Transitions 공식 문서](https://docs.astro.build/en/guides/view-transitions/) — ClientRouter, transition:name, transition:animate 디렉티브 레퍼런스.

### 인터랙티브 포트폴리오 영감

- [Bruno Simon Portfolio](https://bruno-simon.com/) — Three.js 기반 3D 인터랙티브 포트폴리오의 대표 사례. 이 프로젝트와는 방향이 다르지만, 인터랙션이 사이트 경험에 미치는 영향을 확인하는 데 참고.
- [Astro View Transitions Guide (BetterLink)](https://eastondev.com/blog/en/posts/dev/20251202-astro-view-transitions-guide/) — View Transitions만으로 앱과 유사한 사용자 경험을 구현하는 방법.

## 논의 내용

### 1. 페이지 전환: Astro View Transitions vs 외부 라이브러리

| 선택지 | 장점 | 단점 |
|--------|------|------|
| **Astro ClientRouter (View Transitions)** | 프레임워크 내장, 설정 간편, 번들 증가 없음 | 커스터마이징 범위가 제한적 |
| Barba.js / Swup | 전환 효과 자유도 높음 | 추가 의존성, Astro와 중복 기능 |
| CSS-only (`@view-transition`) | 의존성 없음 | 브라우저 지원 불완전, 제어 어려움 |

**결론:** Astro 내장 ClientRouter 채택. 추가 의존성 없이 기본 fade 전환과 `transition:name` 기반 shared element transition을 지원하며, 이 프로젝트의 규모에 적합하다.

### 2. 스크롤 등장 애니메이션: GSAP vs Intersection Observer

| 선택지 | 장점 | 단점 |
|--------|------|------|
| GSAP ScrollTrigger 전체 적용 | API 일관성, 복잡한 시퀀스 용이 | 번들 크기 증가 (~45KB gzip) |
| **Intersection Observer + CSS** | 네이티브 API, 번들 없음 | 복잡한 시퀀스는 코드가 길어짐 |
| CSS `@starting-style` | 순수 CSS, JS 불필요 | 브라우저 지원 불완전 |

**결론:** 하이브리드 접근. 기본 등장 애니메이션은 **Intersection Observer + CSS** (`data-reveal` 시스템)으로 가볍게 처리하고, 타임라인 드로잉 같은 복잡한 인터랙션에만 **GSAP ScrollTrigger**를 사용한다.

### 3. GSAP 사용 범위

- **사용하는 곳:** Work 페이지 커리어 타임라인 (세로선 스크롤 드로잉, 노드 활성화, 아이템 등장)
- **사용하지 않는 곳:** 일반 섹션 등장 (Intersection Observer), 호버 효과 (CSS transition), 숫자 카운트업 (Vanilla JS requestAnimationFrame)
- 기획서의 "최소한으로 적용" 원칙을 지키기 위해 GSAP이 필요한 곳을 타임라인 한 곳으로 한정했다.

### 4. 인터랙션 종류별 구현 방식 정리

| 인터랙션 | 구현 방식 | 적용 위치 |
|---------|----------|----------|
| 페이지 전환 fade | Astro ClientRouter | 전체 |
| Shared element transition | `transition:name` | Home 카드 → Case Study 상세 |
| 스크롤 등장 (fade-up/left/fade) | Intersection Observer + CSS | 전체 섹션 |
| 숫자 카운트업 | Vanilla JS `requestAnimationFrame` | Home 핵심 지표 |
| 타임라인 스크롤 드로잉 | GSAP ScrollTrigger | Work 커리어 타임라인 |
| 호버 효과 (lift, arrow) | CSS transition | 카드, 링크 |
| 모바일 메뉴 토글 | Vanilla JS + CSS transition | Header |
| 모션 감소 대응 | `prefers-reduced-motion` 미디어 쿼리 | 전체 |

### 5. 다크모드

- 현재 버전(0.3.0)에서는 **라이트모드만** 구현한다.
- 다크모드는 모든 컴포넌트에 `dark:` 클래스를 추가해야 하므로 영향 범위가 크다.
- **0.4.0 이후 버전**에서 별도 작업으로 진행하기로 결정했다.
- 구현 시: 시스템 설정 감지 + 수동 토글 + localStorage 저장 방식.

## 결정

1. **Astro ClientRouter**를 사용하여 페이지 전환 인터랙션을 적용한다.
2. 스크롤 등장 애니메이션은 **Intersection Observer + CSS** 기반 `data-reveal` 시스템으로 구축한다.
3. **GSAP ScrollTrigger**는 Work 페이지 커리어 타임라인에만 제한적으로 사용한다.
4. 숫자 카운트업, 호버 효과, 모바일 메뉴는 **Vanilla JS + CSS**로 처리한다.
5. `prefers-reduced-motion` 미디어 쿼리로 모션 감소 설정을 존중한다.
6. 다크모드는 **후순위**(0.4.0 이후)로 진행한다.
7. Case Study 상세 페이지 인터랙션은 콘텐츠 확정 후 **후순위**로 진행한다.

## 근거

- 기획서의 "과도한 인터랙션보다 읽기 쉬운 구조 우선" 원칙을 유지하면서도, 포트폴리오의 완성도와 전문성을 보여줄 수 있는 수준의 인터랙션을 적용한다.
- GSAP 사용을 타임라인 한 곳으로 제한하여 번들 크기 영향을 최소화한다 (GSAP+ScrollTrigger ~45KB gzip, Work 페이지에서만 로드).
- Intersection Observer 기반 시스템은 `data-reveal` 속성만 추가하면 동작하므로, 향후 페이지/섹션 추가 시에도 일관된 인터랙션을 쉽게 적용할 수 있다.
- View Transitions의 `transition:name`으로 shared element transition 포인트를 미리 설정해 두어, Case Study 상세 페이지 작업 시 자연스럽게 연결할 수 있도록 준비한다.
