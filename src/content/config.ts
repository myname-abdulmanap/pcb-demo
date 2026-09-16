import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.enum(['Technology', 'Manufacturing', 'Engineering', 'Industry', 'Sustainability']),
    author: z.string().default('PCB Indonesia Editorial Team'),
    featuredImage: z.string(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
