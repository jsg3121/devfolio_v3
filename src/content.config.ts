import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const career = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/career' }),
  schema: z.object({
    company: z.string(),
    slug: z.string(),
    role: z.string(),
    employmentType: z.enum(['full-time', 'contract', 'freelance', 'intern']),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable(),
    isCurrent: z.boolean().default(false),
    summary: z.string(),
    highlights: z.array(z.string()),
    skills: z.array(z.string()),
    domains: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    skills: z.array(z.string()),
    categories: z.array(z.string()),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    order: z.number(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const sideProjects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/side-projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    status: z.enum(['active', 'paused', 'archived']),
    summary: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    skills: z.array(z.string()),
    featured: z.boolean().default(false),
    startedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    repositoryUrl: z.array(z.string()).optional(),
    projectUrl: z.string().optional(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    order: z.number(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const taxonomy = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/taxonomy' }),
  schema: z.object({
    items: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        description: z.string().optional(),
      }),
    ),
  }),
});

export const collections = { career, articles, sideProjects, taxonomy };
