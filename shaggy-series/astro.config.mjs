// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Old URLs (before the 2026-10 restructure) → new pages. zekt.dev links to some of these,
// so keep them working. Keys are relative to `base`; targets include it.
const redirects = {
	'/overview/zekt-overview': '/zekt-docs/getting-started/what-is-zekt/',
	'/overview/business-justification': '/zekt-docs/getting-started/what-is-zekt/',
	'/overview/technical-examples': '/zekt-docs/getting-started/what-is-zekt/',
	'/overview/zekt-personas': '/zekt-docs/getting-started/concepts/',
	'/overview/zekt-directory': '/zekt-docs/provider/publish-to-directory/',
	'/overview/zekt-management': '/zekt-docs/getting-started/concepts/',
	'/overview/zekt-apps': '/zekt-docs/security/github-access/',
	'/overview/zekt-actions': '/zekt-docs/provider/zekt-action/',
	'/overview/zekt-events': '/zekt-docs/consumer/receive-events/',
	'/guides/zekt-onboarding': '/zekt-docs/getting-started/sign-up/',
	'/guides/zekt-enable-provider': '/zekt-docs/provider/enable-repository/',
	'/guides/handle-zekt-provider-repo': '/zekt-docs/provider/enable-repository/',
	'/guides/handle-zekt-provider-workflows': '/zekt-docs/provider/workflows-and-services/',
	'/guides/handle-zekt-provider-services': '/zekt-docs/provider/workflows-and-services/',
	'/guides/zekt-provider-ui': '/zekt-docs/provider/enable-repository/',
	'/guides/zekt-enable-consumer': '/zekt-docs/consumer/enable-repository/',
	'/guides/handle-zekt-consumer-repo': '/zekt-docs/consumer/enable-repository/',
	'/guides/handle-zekt-consumer-services': '/zekt-docs/consumer/consumer-services/',
	'/guides/handle-zekt-directory': '/zekt-docs/consumer/request-access/',
	'/architecture/system-architecture': '/zekt-docs/security/how-zekt-works/',
	'/architecture/integration-architecture': '/zekt-docs/security/how-zekt-works/',
	'/architecture/configuration-architecture': '/zekt-docs/security/how-zekt-works/',
	'/architecture/zekt-datam': '/zekt-docs/security/how-zekt-works/',
	'/security/zekt-security-overview': '/zekt-docs/security/overview/',
};

// Astro configuration for Zekt Docs site with Starlight
// https://astro.build/config
export default defineConfig({
	site: 'https://zekt-dev-org.github.io/zekt-docs/',
	base: '/zekt-docs/',
	redirects,
	integrations: [
		starlight({
			title: 'Zekt Docs',
			customCss: ['./src/styles/custom.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/zekt-dev-org' }],
			// Every page must be listed here, or readers can't reach it.
			sidebar: [
				{
					label: 'Get started',
					items: [
						{ label: 'What is Zekt?', slug: 'getting-started/what-is-zekt' },
						{ label: 'Quickstart', slug: 'getting-started/quickstart' },
						{ label: 'Core concepts', slug: 'getting-started/concepts' },
						{ label: 'Sign up and sign in', slug: 'getting-started/sign-up' },
					],
				},
				{
					label: 'Provide services',
					items: [
						{ label: 'Enable a provider repository', slug: 'provider/enable-repository' },
						{ label: 'Workflows and services', slug: 'provider/workflows-and-services' },
						{ label: 'Publish to the Directory', slug: 'provider/publish-to-directory' },
						{ label: 'Handle access requests', slug: 'provider/access-requests' },
						{ label: 'Send a payload (Zekt Action)', slug: 'provider/zekt-action' },
						{ label: 'Payload schemas', slug: 'provider/schemas' },
					],
				},
				{
					label: 'Consume services',
					items: [
						{ label: 'Enable a consumer repository', slug: 'consumer/enable-repository' },
						{ label: 'Find a service and request access', slug: 'consumer/request-access' },
						{ label: 'Receive events', slug: 'consumer/receive-events' },
						{ label: 'Offer a consumer service', slug: 'consumer/consumer-services' },
					],
				},
				{
					label: 'Orchestration',
					items: [
						{ label: 'Why orchestrate with Zekt', slug: 'orchestration/why-orchestrate' },
						{ label: 'Orchestrate several services', slug: 'orchestration/overview' },
					],
				},
				{
					label: 'Operate',
					items: [
						{ label: 'Delivery tracking', slug: 'operate/deliveries' },
						{ label: 'Webhook health', slug: 'operate/webhook-health' },
						{ label: 'Connections and blast radius', slug: 'operate/connections-view' },
						{ label: 'Audit log', slug: 'operate/audit-log' },
						{ label: 'Your account', slug: 'operate/account' },
						{ label: 'Members and Flock', slug: 'operate/members' },
						{ label: 'VS Code, MCP and API keys', slug: 'operate/vscode-and-mcp' },
					],
				},
				{
					label: 'Add-ons',
					items: [
						{ label: 'Zekt Analytics', slug: 'add-ons/analytics' },
						{ label: 'Zekt Shield', slug: 'add-ons/shield' },
						{ label: 'Zekt Chainlink', slug: 'add-ons/chainlink' },
					],
				},
				{
					label: 'Billing',
					items: [{ label: 'How billing works', slug: 'billing/how-billing-works' }],
				},
				{
					label: 'Security',
					items: [
						{ label: 'Security and data', slug: 'security/overview' },
						{ label: 'GitHub access', slug: 'security/github-access' },
						{ label: 'How Zekt works', slug: 'security/how-zekt-works' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Event payload', slug: 'reference/event-payload' },
						{ label: 'Zekt Action inputs and outputs', slug: 'reference/zekt-action' },
						{ label: 'Limits', slug: 'reference/limits' },
						{ label: 'Troubleshooting', slug: 'reference/troubleshooting' },
						{ label: 'Glossary', link: 'https://www.zekt.dev/zekt-terminology.html', attrs: { target: '_blank' } },
					],
				},
			],
		}),
	],
});
