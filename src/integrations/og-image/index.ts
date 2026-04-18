import type { AstroIntegration } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import matter from 'gray-matter';
import { articleOgTemplate, defaultOgTemplate, satoriOptions } from './template';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface ArticleFrontmatter {
  title: string;
  slug: string;
  tags: string[];
  published: boolean;
}

const loadFonts = async () => {
  const boldFont = await readFile(join(__dirname, 'fonts', 'Pretendard-Bold.woff'));
  const regularFont = await readFile(join(__dirname, 'fonts', 'Pretendard-Regular.woff'));

  return [
    {
      name: 'Pretendard',
      data: boldFont,
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: 'Pretendard',
      data: regularFont,
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
};

const loadArticles = async (rootDir: string): Promise<ArticleFrontmatter[]> => {
  const articlesDir = join(rootDir, 'src', 'content', 'articles');
  const files = await readdir(articlesDir);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  const articles: ArticleFrontmatter[] = [];

  for (const file of mdxFiles) {
    const content = await readFile(join(articlesDir, file), 'utf-8');
    const { data } = matter(content);

    if (data.published !== false) {
      articles.push({
        title: data.title,
        slug: data.slug,
        tags: data.tags || [],
        published: data.published !== false,
      });
    }
  }

  return articles;
};

const generateOgImage = async (
  template: Record<string, unknown>,
  fonts: Awaited<ReturnType<typeof loadFonts>>,
): Promise<Buffer> => {
  const svg = await satori(template, satoriOptions(fonts));
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });
  const pngData = resvg.render();
  return pngData.asPng();
};

export const ogImageIntegration = (): AstroIntegration => ({
  name: 'og-image',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      console.log('\n🖼️  Generating OG images...');

      const fonts = await loadFonts();
      const outDir = fileURLToPath(dir);
      const rootDir = join(__dirname, '..', '..', '..');
      const ogDir = join(outDir, 'og');
      const articlesOgDir = join(ogDir, 'articles');

      if (!existsSync(ogDir)) {
        await mkdir(ogDir, { recursive: true });
      }
      if (!existsSync(articlesOgDir)) {
        await mkdir(articlesOgDir, { recursive: true });
      }

      const defaultPng = await generateOgImage(defaultOgTemplate(), fonts);
      await writeFile(join(ogDir, 'default.png'), defaultPng);
      console.log('  ✓ default.png');

      const articles = await loadArticles(rootDir);

      for (const article of articles) {
        const template = articleOgTemplate({
          title: article.title,
          tags: article.tags,
        });
        const png = await generateOgImage(template, fonts);
        await writeFile(join(articlesOgDir, `${article.slug}.png`), png);
        console.log(`  ✓ articles/${article.slug}.png`);
      }

      console.log(`✅ Generated ${articles.length + 1} OG images\n`);
    },
  },
});

export default ogImageIntegration;
