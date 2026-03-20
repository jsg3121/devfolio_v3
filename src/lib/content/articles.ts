import { getCollection } from 'astro:content';

/** 공개된 아티클 전체 (order 오름차순) */
export const getAllArticles = async () => {
  const articles = await getCollection('articles');
  return articles.filter((a) => a.data.published).sort((a, b) => a.data.order - b.data.order);
};

/** featured 아티클만 조회 */
export const getFeaturedArticles = async () => {
  const articles = await getAllArticles();
  return articles.filter((a) => a.data.featured);
};
