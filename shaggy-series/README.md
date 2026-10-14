# Zekt Docs site

Astro + Starlight source for https://zekt-dev-org.github.io/zekt-docs/.

- Pages: `src/content/docs/` (Markdown/MDX). Images: `src/assets/`.
- Sidebar and redirects for old URLs: `astro.config.mjs`. Every page must be in the sidebar.
- `npm install`, then `npm run dev` for a local preview, and `npm run build` before opening a PR.

Content rules and the product-sync procedure are in the repository's `CLAUDE.md`.
