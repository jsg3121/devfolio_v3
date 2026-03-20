import { getCollection } from 'astro:content';

/** 전체 사이드 프로젝트 (order 오름차순) */
export const getAllSideProjects = async () => {
  const projects = await getCollection('sideProjects');
  return projects.sort((a, b) => a.data.order - b.data.order);
};

/** featured 사이드 프로젝트만 조회 */
export const getFeaturedSideProjects = async () => {
  const projects = await getAllSideProjects();
  return projects.filter((p) => p.data.featured);
};
