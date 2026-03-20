/**
 * 스크롤 등장 애니메이션 유틸리티
 *
 * 사용법: HTML 요소에 data-reveal 속성을 추가하면 스크롤 시 등장 애니메이션이 적용됩니다.
 *
 * 속성:
 * - data-reveal: 등장 효과 (기본값: "up", 옵션: "up" | "down" | "left" | "right" | "fade")
 * - data-reveal-delay: 등장 지연 시간 (ms, 기본값: 0)
 * - data-reveal-duration: 등장 시간 (ms, 기본값: 600)
 */

const REVEAL_THRESHOLD = 0.15;

const initScrollReveal = () => {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);

          if (delay > 0) {
            setTimeout(() => {
              el.classList.add('revealed');
            }, delay);
          } else {
            el.classList.add('revealed');
          }

          observer.unobserve(el);
        }
      });
    },
    { threshold: REVEAL_THRESHOLD },
  );

  elements.forEach((el) => {
    observer.observe(el);
  });
};

// View Transitions 페이지 전환 및 초기 로드 시 실행
document.addEventListener('astro:page-load', () => {
  initScrollReveal();
});
