import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().default(false),
		publishedAt: z.union([z.string().transform(d => new Date(d)), z.date()]),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = {
	'blog': blogCollection,
};
