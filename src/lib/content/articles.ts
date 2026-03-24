import { getCollection } from 'astro:content';

/** 공개된 아티클 전체 (최신순) */
export const getAllArticles = async () => {
  const articles = await getCollection('articles');
  return articles
    .filter((a) => a.data.published)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
};

/** featured 아티클만 조회 */
export const getFeaturedArticles = async () => {
  const articles = await getAllArticles();
  return articles.filter((a) => a.data.featured).slice(0, 4);
};
