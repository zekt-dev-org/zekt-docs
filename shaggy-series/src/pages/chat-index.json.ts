/**
 * /zekt-docs/chat-index.json — the section index the chat on zekt.dev answers from.
 *
 * The chat on zekt.dev (public site and console) answers questions by ranking these sections in
 * the browser and quoting the best one, with a link back here. There is no AI and no
 * server behind it, so this file is the whole of what the chat knows. A page that is wrong here
 * is wrong in the chat, and a page that is fixed here is fixed in the chat on the next deploy.
 *
 * One record per section: the page's lead (the text before its first H2), then each H2 and H3.
 * Anchors come from the headings Astro rendered, never from a second slugger, so every link the
 * chat shows lands on a heading that exists. The build fails if it cannot pair them, or if the
 * file grows past the budget the chat downloads.
 *
 * Optional page frontmatter `chat.keywords` (see content.config.ts) adds words customers use that
 * a page does not, so the chat can still find it.
 */
import type { APIRoute } from 'astro';
import { getCollection, render } from 'astro:content';

const SITE = 'https://zekt-dev-org.github.io/zekt-docs/';
const BASE_PATH = '/zekt-docs/';
const MAX_BYTES = 300 * 1024;
const MAX_SECTION_CHARS = 2000;
const MAX_CODE_LINES = 15;

/** Sidebar group labels, by top-level folder (astro.config.mjs). */
const GROUPS: Record<string, string> = {
	'getting-started': 'Get started',
	provider: 'Provide services',
	consumer: 'Consume services',
	orchestration: 'Orchestration',
	operate: 'Operate',
	'add-ons': 'Add-ons',
	billing: 'Billing',
	security: 'Security',
	reference: 'Reference',
	gate: 'Zekt Gate',
};

/** Page-level fields, stored once; a section names its page by index. */
interface Page {
	path: string;
	title: string;
	group: string;
	description: string;
	keywords: string[];
}

interface Section {
	page: number;
	path: string;
	heading: string;
	text: string;
}

/** Resolve a link in a page to an absolute URL, so the chat can show it anywhere. */
function absolute(href: string, pageUrl: string): string {
	if (/^[a-z]+:/i.test(href)) return href;
	if (href.startsWith(BASE_PATH)) return SITE + href.slice(BASE_PATH.length);
	if (href.startsWith('/')) return new URL(href, SITE).href;
	return new URL(href, pageUrl).href;
}

/** MDX body → the small Markdown subset the chat renders: paragraphs, lists, bold, code, links. */
function clean(body: string, pageUrl: string): string {
	// MDX component tags can span lines (<LinkCard title=… />): drop them outside code fences first,
	// keeping whatever they wrap.
	const unfenced = body
		.replace(/\r\n/g, '\n')
		.split(/(^\s*```[^\n]*\n[\s\S]*?^\s*```[^\n]*$)/m)
		.map((chunk, i) => (i % 2 === 1 ? chunk : chunk.replace(/<\/?[A-Z][\w.]*(\s[^>]*)?\/?>/g, '')))
		.join('');
	const out: string[] = [];
	let fence: string[] | null = null;
	for (const raw of unfenced.split('\n')) {
		const line = raw.replace(/\r$/, '');
		if (/^\s*```/.test(line)) {
			if (fence) {
				const kept = fence.slice(0, MAX_CODE_LINES);
				if (fence.length > MAX_CODE_LINES) kept.push('…');
				out.push('```', ...kept, '```');
				fence = null;
			} else {
				fence = [];
			}
			continue;
		}
		if (fence) {
			fence.push(line);
			continue;
		}
		if (/^import\s.+from\s/.test(line) || /^export\s/.test(line)) continue;
		if (/^\s*:::/.test(line)) continue; // Starlight aside markers
		if (/^\s*\|?\s*:?-{2,}/.test(line)) continue; // table separator row
		let text = line;
		if (/^\s*\|/.test(text)) {
			// a table row becomes one line of its cells
			text = text.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim()).filter(Boolean).join(' — ');
			text = text ? `- ${text}` : '';
		}
		text = text
			.replace(/<\/?[A-Z][\w.]*(\s[^>]*)?\/?>/g, '') // MDX components: keep what they wrap
			.replace(/<\/?(br|div|span|p|img|details|summary|kbd|sup|sub|em|strong|code|a)(\s[^>]*)?\/?>/gi, '')
			.replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
			.replace(/\[([^\]]+)\]\(([^)\s]+)(\s+"[^"]*")?\)/g, (_m, t, h) => `[${t}](${absolute(h, pageUrl)})`)
			.replace(/^#{4,6}\s+(.*)$/, '**$1**')
			.replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,;:!?]|$)/g, '$1$2')
			.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1$2')
			.replace(/^\s*>\s?/, '')
			.replace(/^(\s*)\*\s+/, '$1- ');
		out.push(text.trimEnd());
	}
	return unwrap(out).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * The pages are hard-wrapped at about 100 columns. Join a paragraph's lines, and a list item's
 * continuation lines, back into one line each, so the chat shows prose rather than line breaks.
 */
function unwrap(lines: string[]): string[] {
	const out: string[] = [];
	let inFence = false;
	let joinable = false; // the last line pushed is prose or a list item that may continue
	for (const line of lines) {
		if (/^\s*```/.test(line)) {
			inFence = !inFence;
			out.push(line);
			joinable = false;
			continue;
		}
		if (inFence) {
			out.push(line);
			continue;
		}
		if (line.trim() === '') {
			out.push('');
			joinable = false;
			continue;
		}
		const startsBlock = /^\s*([-•]|\d+\.)\s/.test(line) || /^\*\*[^*]+\*\*$/.test(line.trim());
		if (joinable && !startsBlock) {
			out[out.length - 1] = `${out[out.length - 1]} ${line.trim()}`;
		} else {
			out.push(startsBlock ? line.trimStart() : line.trim());
		}
		joinable = !/^\*\*[^*]+\*\*$/.test(line.trim());
	}
	return out;
}

function cap(text: string): string {
	if (text.length <= MAX_SECTION_CHARS) return text;
	const cut = text.slice(0, MAX_SECTION_CHARS);
	const fences = (cut.match(/^```/gm) ?? []).length;
	const end = Math.max(cut.lastIndexOf('\n\n'), cut.lastIndexOf('. '));
	let kept = end > MAX_SECTION_CHARS / 2 ? cut.slice(0, end + 1) : cut;
	if ((kept.match(/^```/gm) ?? []).length % 2 === 1 || fences % 2 === 1) {
		kept = kept.slice(0, kept.lastIndexOf('```')).trimEnd();
	}
	return `${kept.trimEnd()} …`;
}

export const GET: APIRoute = async () => {
	const entries = (await getCollection('docs')).filter((e) => e.data.template !== 'splash');
	const pages: Page[] = [];
	const sections: Section[] = [];

	for (const entry of entries.sort((a, b) => a.id.localeCompare(b.id))) {
		const pagePath = `${entry.id}/`;
		const pageUrl = SITE + pagePath;
		const { headings } = await render(entry);
		const wanted = headings.filter((h) => h.depth === 2 || h.depth === 3);
		const page = pages.push({
			path: pagePath,
			title: entry.data.title,
			group: GROUPS[entry.id.split('/')[0]] ?? '',
			description: entry.data.description ?? '',
			keywords: entry.data.chat?.keywords ?? [],
		}) - 1;

		// Split the body on its H2/H3 lines, outside code fences.
		const parts: { heading: string | null; lines: string[] }[] = [{ heading: null, lines: [] }];
		let inFence = false;
		for (const line of (entry.body ?? '').split('\n')) {
			if (/^\s*```/.test(line)) inFence = !inFence;
			const m = !inFence && /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
			if (m) parts.push({ heading: m[2], lines: [] });
			else parts[parts.length - 1].lines.push(line);
		}
		if (parts.length - 1 !== wanted.length) {
			throw new Error(`chat-index: ${entry.id} has ${parts.length - 1} H2/H3 lines but Astro rendered ${wanted.length} headings`);
		}

		parts.forEach((part, i) => {
			const text = clean(part.lines.join('\n'), pageUrl);
			if (!text) return;
			const heading = i === 0 ? entry.data.title : wanted[i - 1].text;
			const path = i === 0 ? pagePath : `${pagePath}#${wanted[i - 1].slug}`;
			sections.push({ page, path, heading, text: cap(text) });
		});
	}

	const body = JSON.stringify({ version: 1, generated: new Date().toISOString(), base: SITE, pages, sections });
	const bytes = new TextEncoder().encode(body).length;
	if (bytes > MAX_BYTES) {
		throw new Error(`chat-index: ${bytes} bytes is over the ${MAX_BYTES}-byte budget the chat downloads`);
	}
	return new Response(body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
