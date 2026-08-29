/**
 * 스크롤 등장 애니메이션 유틸리티
 *
 * 사용법: HTML 요소에 data-reveal 속성을 추가하면 스크롤 시 등장 애니메이션이 적용됩니다.
 *
 * 속성:
 * - data-reveal: 등장 효과 (기본값: "up", 옵션: "up" | "down" | "left" | "right" | "fade")
 * - data-reveal-delay: 등장 지연 시간 (ms, 기본값: 0)
 *   목록형 UI에서 index에 비례한 값을 넘기면 항목이 늘어날수록 지연이 누적되므로,
 *   실제 적용 시 MAX_REVEAL_DELAY로 제한한다.
 * - data-reveal-duration: 등장 시간 (ms, 기본값: 600)
 */

/** 요소 상단이 뷰포트 하단에서 이만큼 올라와야 등장을 시작한다 */
const REVEAL_ROOT_MARGIN = '0px 0px -12% 0px';

/** 목록 스태거가 무한히 누적되지 않도록 제한하는 지연 상한 (ms) */
const MAX_REVEAL_DELAY = 240;

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 요소가 이미 뷰포트를 지나쳐 화면 상단부에 있는지 판단한다.
 * 빠른 스크롤이나 스크롤 위치 복원으로 이미 노출된 요소는
 * 뒤늦게 애니메이션을 시작하면 끊겨 보이므로 즉시 표시한다.
 */
const isAlreadyPassed = (el: HTMLElement): boolean => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.5;
};

const reveal = (el: HTMLElement, delay: number): void => {
  if (delay <= 0) {
    el.classList.add('revealed');
    return;
  }

  window.setTimeout(() => {
    el.classList.add('revealed');
  }, delay);
};

const initScrollReveal = (): void => {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (elements.length === 0) return;

  // 모션 감소 설정 시 애니메이션 없이 즉시 표시한다 (지연도 적용하지 않는다)
  if (prefersReducedMotion()) {
    elements.forEach((el) => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;
        observer.unobserve(el);

        const requestedDelay = Number(el.dataset.revealDelay ?? 0);
        const delay = isAlreadyPassed(el)
          ? 0
          : Math.min(Number.isFinite(requestedDelay) ? requestedDelay : 0, MAX_REVEAL_DELAY);

        reveal(el, delay);
      });
    },
    { threshold: 0, rootMargin: REVEAL_ROOT_MARGIN },
  );

  elements.forEach((el) => {
    observer.observe(el);
  });
};

// View Transitions 페이지 전환 및 초기 로드 시 실행
document.addEventListener('astro:page-load', () => {
  initScrollReveal();
});
