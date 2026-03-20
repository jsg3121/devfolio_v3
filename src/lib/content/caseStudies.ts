import { getCollection } from 'astro:content';

/** 공개된 케이스 스터디 전체 (order 오름차순) */
export const getAllCaseStudies = async () => {
  const studies = await getCollection('caseStudies');
  return studies.filter((s) => s.data.published).sort((a, b) => a.data.order - b.data.order);
};

/** featured 케이스 스터디만 조회 */
export const getFeaturedCaseStudies = async () => {
  const studies = await getAllCaseStudies();
  return studies.filter((s) => s.data.featured);
};
