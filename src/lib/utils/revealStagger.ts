/**
 * 목록형 UI의 스크롤 등장 스태거 지연 계산 유틸리티
 *
 * 항목 index에 그대로 비례한 지연을 주면 목록이 길어질수록 지연이 무한히 누적된다.
 * 뒤쪽 항목은 화면에 들어온 뒤 한참 뒤에 나타나 끊겨 보이므로,
 * 스태거 단계 수를 제한해 지연 상한을 고정한다.
 */

/** 스태거를 적용할 최대 단계 수 (이후 항목은 모두 같은 지연을 갖는다) */
const MAX_STAGGER_STEPS = 3;

/** 스태거 한 단계당 지연 (ms) */
const STAGGER_STEP_MS = 80;

/**
 * 목록 index에 대한 등장 지연(ms)을 반환한다.
 *
 * @param index 목록 내 항목 순서 (0부터 시작)
 * @param stepMs 한 단계당 지연. 기본 80ms
 */
export const getRevealDelay = (index: number, stepMs: number = STAGGER_STEP_MS): string =>
  String(Math.min(index, MAX_STAGGER_STEPS) * stepMs);
