import { SITE } from '@/lib/constants/site';

export interface MetaProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  publishedAt?: Date;
  tags?: string[];
}

export const buildCanonicalUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${normalizedPath}`;
};

export const buildOgImageUrl = (ogImage?: string): string => {
  const image = ogImage ?? SITE.ogImage;
  if (image.startsWith('http')) return image;
  return `${SITE.url}${image}`;
};
