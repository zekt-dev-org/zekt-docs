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
						{ label: 'Apps', slug: 'overview/zekt-apps' },
						{ label: 'Actions', slug: 'overview/zekt-actions' },
					],
				},
				{
					label: 'Zekt Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Sign-up & Sing-in', slug: 'guides/zekt-onboarding' },
						{ label: 'Provider enablement', slug: 'guides/zekt-enable-provider' },
					],
				},
				{
					label: 'Zekt Architecture',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'System Architecture', slug: 'architecture/system-architecture' },
						{ label: 'Integration Architecture', slug: 'architecture/integration-architecture' },
						{ label: 'Data Architecture', slug: 'architecture/configuration-architecture' },
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
