// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://zekt-dev-org.github.io',
	base: '/zekt-docs/',
	integrations: [
		starlight({
			title: 'Zekt Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/zekt-dev-org' }],
			sidebar: [
				{
					label: 'Zekt Overview',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Overview', slug: 'overview/zekt-overview' },
						{ label: 'Personas', slug: 'overview/zekt-personas' },
						{ label: 'Directory', slug: 'overview/zekt-directory' },
					],
				},
				{
					label: 'Zekt Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Sign-up', slug: 'guides/zekt-onboarding' },
					],
				},
			],
		}),
	],
});
