import { SITE } from '@/lib/constants/site';

export const buildPersonJsonLd = (): string => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.author,
    url: SITE.url,
    jobTitle: 'Frontend Developer',
    knowsAbout: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Astro', 'SEO', 'Web Performance'],
    sameAs: ['https://github.com/jsg3121'],
  };
  return JSON.stringify(data);
};

export const buildWebSiteJsonLd = (): string => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.title,
    url: SITE.url,
    description: SITE.description,
    author: {
      '@type': 'Person',
      name: SITE.author,
    },
  };
  return JSON.stringify(data);
};

export interface WebPageJsonLdProps {
  title: string;
  description: string;
  url: string;
}

export const buildWebPageJsonLd = ({ title, description, url }: WebPageJsonLdProps): string => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.title,
      url: SITE.url,
    },
  };
  return JSON.stringify(data);
};

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]): string => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return JSON.stringify(data);
};

export interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  tags?: string[];
  ogImage?: string;
}

export const buildArticleJsonLd = ({
  title,
  description,
  url,
  publishedAt,
  tags,
  ogImage,
}: ArticleJsonLdProps): string => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: publishedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: SITE.author,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Person',
      name: SITE.author,
    },
    ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
    ...(ogImage && { image: ogImage }),
  };
  return JSON.stringify(data);
};
