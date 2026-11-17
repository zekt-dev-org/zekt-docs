import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Words customers use that the page doesn't, for the zekt.dev chat (src/pages/chat-index.json.ts).
				chat: z.object({ keywords: z.array(z.string()).default([]) }).optional(),
			}),
		}),
	}),
};
