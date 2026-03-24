import { getCollection } from 'astro:content';

/** 전체 사이드 프로젝트 (order 내림차순 = 최신 프로젝트가 먼저) */
export const getAllSideProjects = async () => {
  const projects = await getCollection('sideProjects');
  return projects.sort((a, b) => b.data.order - a.data.order);
};

/** featured 사이드 프로젝트만 조회 */
export const getFeaturedSideProjects = async () => {
  const projects = await getAllSideProjects();
  return projects.filter((p) => p.data.featured);
};
