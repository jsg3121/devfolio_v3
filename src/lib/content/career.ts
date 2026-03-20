import { getCollection } from 'astro:content';

/** 전체 경력 목록 (order 오름차순 = 최신 회사가 먼저) */
export const getAllCareers = async () => {
  const careers = await getCollection('career');
  return careers.sort((a, b) => a.data.order - b.data.order);
};

/** featured 경력만 조회 */
export const getFeaturedCareers = async () => {
  const careers = await getAllCareers();
  return careers.filter((c) => c.data.featured);
};
