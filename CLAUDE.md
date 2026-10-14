# zekt-docs

Public, customer-facing documentation for Zekt (zekt.dev), published at
https://zekt-dev-org.github.io/zekt-docs/. Readers are customers (provider and consumer repository
owners) and people evaluating Zekt.

**This repository is public.** Everything committed here, including git history, is published.

## Layout

- Site source: `shaggy-series/` (Astro + Starlight). Pages are Markdown/MDX in
  `shaggy-series/src/content/docs/`, images in `shaggy-series/src/assets/`.
- The sidebar is hand-maintained in `shaggy-series/astro.config.mjs`. A page that is not listed
  there is unreachable: add every new page to the sidebar in the same change.
- Local preview: `cd shaggy-series && npm run dev`. Check that `npm run build` passes before
  opening a PR.
- `.github/workflows/deploy.yml` builds on every PR and deploys to GitHub Pages on push to `main`.
- `.docs-sync.json` records the last zektMainWeb production commit the docs were synced to.

## Keeping the docs in step with the product

The product lives in the private repository `zekt-dev-org/zektMainWeb` (local clone usually at
`C:\Develop\zektMainWeb`). Its `docs/releases.md` is the contract between the two repositories:
one entry per production promotion. **That file's header is the reference for the format, the
timing rule and the allow-list below; if they ever disagree, the header wins — flag the drift.**

Sync procedure ("sync docs to latest release"):

1. In zektMainWeb, fetch and read `docs/releases.md` **from `main`** (never from `prod`; entries are
   written on `main` before the promotion they describe).
2. An entry is live only if `git merge-base --is-ancestor <sha> origin/prod` succeeds. Entries
   that are not live are drafts: draft text may be prepared, but nothing from them is merged.
3. Process live entries newer than `last_synced_prod_sha` in `.docs-sync.json`, oldest first.
   Skip entries with `docs-impact: none`.
4. Update pages, sidebar and (where possible) screenshots, then set `last_synced_prod_sha` and
   `last_synced_date` to the newest processed entry.
5. Open a PR. Never push docs changes straight to `main`; a human merges.

### What may be read from zektMainWeb

The allow-list is enforced by these instructions, not by access control. Follow it exactly.

- **Allowed:** `docs/releases.md`; `public/*.html` (already public on www.zekt.dev — use the
  product/marketing pages, not admin tools such as `db-admin.html` or `zekt-admin.html`); a section
  of `docs/decisions/*.md` **only when a live entry cites it under `sources`**, paraphrased, never
  copied.
- **Denied:** everything else, including `specs/**`, `docs/deferred/**`, `docs/billing/**`,
  `docs/validation/**`, `docs/incidents/**`, `docs/pending-checks.md`, `docs/staging-runbook.md`,
  `docs/stripe-live-cutover.md`, `ZEKT_PLATFORM_OVERVIEW.md`, `zekt-knowledge-base.md`, source
  code and configuration.
- If something a customer needs is not covered by an allowed source, do not infer it from a denied
  one. List it as an open question in the PR description.

## Content rules

- **Never quote a price.** Link to https://www.zekt.dev/zekt-pricing.html instead. Prices copied
  into pages drift silently.
- **Never publish** Azure resource names, endpoints, environment names, settings, tokens or secrets,
  security/auth internals beyond what a customer needs to act, billing mechanics, or incident detail.
- Zekt Gate (zekt-gate.dev) is a separate product; keep it out of the Core docs.

### Terminology

Base glossary: https://www.zekt.dev/zekt-terminology.html.

- The customer is the Zekt **account**.
- A GitHub organisation is a **scope**, not an owner. Several Zekt accounts can each have
  repositories under the same organisation, and one account can hold repositories under several
  owners (organisations and personal accounts).
- Never write "the account's organisation" or "your organization's account". Use "organization"
  only for the GitHub concept.
- Use the product names as the public site does: Zekt Core, Zekt Shield, Zekt Chainlink, Zekt
  Analytics, Zekt Action, Directory/Registry, Provider, Consumer.

### Style

- Write for customers: what it does, how to use it, its limits. Lead with the task.
- Getting-started and how-to pages use Starlight components (`<Steps>`, `<Tabs>`, `<Aside>`,
  `<Card>`) in `.mdx` files.
- Screenshots are taken manually for now (no staging demo account yet). When the UI changes and a
  screenshot cannot be refreshed, say so in the PR description so it can be retaken.
