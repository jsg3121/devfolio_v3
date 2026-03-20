# ADR-005: Astro 스크립트 초기화 전략 — astro:page-load 단일 의존

## 상태

승인됨

## 배경

v0.3.0 PR 리뷰(PR #3)에서 `initCountUp()`과 `initScrollReveal()`의 초기화 방식에 대한 논의가 발생했다.

기존 코드는 두 가지 방식으로 초기화를 수행했다:

1. 스크립트 모듈 파싱 시 직접 호출 (`initFn()`)
2. `astro:page-load` 이벤트 리스너

## 논의 내용

### 선택지 A: 직접 호출 + 이벤트 리스너 병행 (기존 방식)

- **장점:** 스크립트 파싱 시점에 즉시 실행을 보장
- **단점:** `astro:page-load`가 초기 페이지 로드에서도 발생하므로 `IntersectionObserver` 인스턴스가 중복 생성됨. 실질적 버그는 아니지만(`unobserve`로 방지) 불필요한 리소스 사용

### 선택지 B: astro:page-load 이벤트 리스너만 사용

- **장점:** 초기 로드와 View Transitions 페이지 전환을 단일 진입점으로 처리. Observer 인스턴스 중복 생성 방지
- **단점:** 없음. Astro 공식 문서에서 `astro:page-load`는 초기 로드 시에도 발생한다고 명시

## 결정

**선택지 B** — `astro:page-load` 이벤트 리스너에만 의존한다.

## 근거

- Astro 공식 동작: `astro:page-load`는 초기 페이지 로드 시에도 발생하므로 직접 호출이 불필요
- 불필요한 `IntersectionObserver` 인스턴스 중복 생성 방지
- 초기화 진입점을 하나로 통일하여 코드 의도가 명확해짐

## 적용 범위

- `src/features/home/KeyMetrics.astro` — `initCountUp()` 직접 호출 제거
- `src/lib/utils/scrollReveal.ts` — `initScrollReveal()` 직접 호출 제거
- 향후 Astro 컴포넌트 내 스크립트 초기화 시 동일 패턴 적용
