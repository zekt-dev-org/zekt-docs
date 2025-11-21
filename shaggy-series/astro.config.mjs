// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Astro configuration for Zekt Docs site with Starlight
// https://astro.build/config
export default defineConfig({
	site: 'https://zekt-dev-org.github.io/zekt-docs/',
	base: '/zekt-docs/',
	integrations: [
		starlight({
			title: 'Zekt Docs',
			customCss: ['./src/styles/custom.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/zekt-dev-org' }],
			sidebar: [
				{
					label: 'Zekt Overview',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Overview', slug: 'overview/zekt-overview' },
						{ label: 'Personas', slug: 'overview/zekt-personas' },
						{ label: 'Directory', slug: 'overview/zekt-directory' },
						{ label: 'Management', slug: 'overview/zekt-management' },
						{ label: 'Zekt apps', slug: 'overview/zekt-apps' },
					],
				},
				{
					label: 'Zekt Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Sign-up & Sing-in', slug: 'guides/zekt-onboarding' },
					],
				},
				{
					label: 'Zekt Security',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Security', slug: 'security/zekt-security-overview' },
					],
				},
			],
		}),
	],
});
