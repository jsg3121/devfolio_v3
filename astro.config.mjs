// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import ogImageIntegration from './src/integrations/og-image';

export default defineConfig({
  site: 'https://sungyujang.com',
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname;
        const lastmod = new Date().toISOString();

        if (path === '/') {
          return { ...item, lastmod, changefreq: ChangeFreqEnum.WEEKLY, priority: 1.0 };
        }
        if (['/articles/', '/work/', '/side-projects/'].includes(path)) {
          return { ...item, lastmod, changefreq: ChangeFreqEnum.WEEKLY, priority: 0.9 };
        }
        if (path.startsWith('/articles/')) {
          return { ...item, lastmod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 };
        }
        if (path.startsWith('/side-projects/')) {
          return { ...item, lastmod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.7 };
        }
        return { ...item, lastmod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.6 };
      },
    }),
    ogImageIntegration(),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
