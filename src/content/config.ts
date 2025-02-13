import { z, defineCollection } from "astro:content";

const newsletterCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().min(4),
        linktitle: z.string().optional(),
        description: z.string().optional(),

        publishDate: z.date(),
        lastmod: z.date().optional(),

        author: z.string().optional(),
        authors: z.array(z.string()).optional(),

        tags: z.array(z.string()).optional(),
        categories: z.array(z.string()).optional(),

        archive: z.object({
            isArchived: z.boolean(),
            date: z.date().optional()
        }).optional()
    })
});

export const collections = {
    newsletter: newsletterCollection,
}