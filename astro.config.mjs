// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import ogImageIntegration from './src/integrations/og-image';

export default defineConfig({
  site: 'https://sungyujang.com',
  integrations: [mdx(), sitemap(), ogImageIntegration()],
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
