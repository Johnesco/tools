# JobFinder - Project Context

## Overview

JobFinder is a public single-page tool (vanilla HTML/JS/CSS, no build): the user fills in a form-like list of job titles plus an optional city/state, and gets Location + Remote search links for each title across 10 job boards. Links open in new tabs; each click is timestamped so the user can see when they last ran each search. All data lives in localStorage.

**Deployed to** johnesco.github.io/tools/jobfinder (GitHub Pages, repo `Johnesco/tools`).

## Design Constraints — read before adding anything

Simplified 2026-08 by explicit owner decision. JobFinder **diverged from jobhelper** (C:\code\jobhelper, the private integrated pipeline tool) on that date and must stay:

- **Dead simple.** No instructions section — the form must be self-explanatory. No settings panels, no view modes, no priority tiers, no import/export, no custom boards, no stats dashboard. Do not reintroduce these without the owner asking.
- **localStorage-only.** No server, no accounts, no analytics, no external requests of any kind.
- **Link-out only.** Opens board search pages in new tabs (`target="_blank" rel="noopener"`). Never fetches, scrapes, or embeds job data.
- **No personal data in defaults.** First run starts empty.

Features removed in the simplification (in git history if ever needed): priority tiers (Core/Growth/Reach), Edit Searches panel, Customize Boards panel, custom boards, import/export, collapsible groups, stats tiles, intro section, Startup + Big Tech board categories. (A by-board grouping was removed too, then deliberately re-added 2026-08 as the single view-toggle button — that one stays.)

## How It Works

1. Titles form: a list of text inputs with one always-empty row at the bottom. Enter or blur commits; committing spawns a new empty row (Enter refocuses it). Clearing an existing row's text removes that title. Pasting comma/newline-separated text into the empty row bulk-adds. Duplicates (case-insensitive) are silently skipped.
2. City/state inputs apply to all titles; without both, Location chips render disabled (tooltip explains).
3. One card per title, one row per board: Location chip, Remote chip, staleness label. A single pill button above the cards flips the grouping ("Group by job board" ⇄ "Group by job title") — board view is one card per board with one row per title.
4. The flip animates via the View Transitions API: every title×board row carries a stable `view-transition-name` (djb2 hash of `term::board`, see `vtName()`), so rows visibly fly to their new card. Instant fallback where `document.startViewTransition` is missing; disabled under `prefers-reduced-motion`.
5. Click a link → `keyword::boardName → timestamp` recorded → staleness renders: **fresh** (today, green "✓ 2:30 PM"), **recent** (1–2d, grey), **stale** (3+d, amber). Card header shows "n/m today" (boards done for the title, or titles done for the board).

## config.js

`CONFIG.boards` — flat array of `{ name, urls: { location, remote } }`. Placeholders: `{keyword}`, `{city}`, `{state}`, `{keyword-dash}` (lowercased, spaces→dashes, for slug URLs like RemoteOK). `location: null` = remote-only board.

### Board Audit (2026-08)
- **Indeed covers Glassdoor** (Glassdoor job search runs on Indeed's backend)
- **Monster covers CareerBuilder** (companies merged 2024)
- **Stack Overflow Jobs removed** — shut down 2022; squatted domain crashes browsers
- **Remotive rejected** — keyword search is client-side JS only; no URL can prefill it (verify before ever re-adding)
- **Verified live 2026-08**: Crunchboard*, Jobicy (`/?s=` WordPress search), Netflix* (`explore.jobs.netflix.net/careers?query=`)  (*dropped in the simplification but templates were valid — see git history)
- **Unverifiable by machine** (Cloudflare bot walls): RemoteOK, Himalayas — templates follow documented site structure

## localStorage Keys

- `jobfinder_searches` — `["QA Engineer", "Test Lead"]` (plain strings). Loader migrates the two legacy formats: v2 `[{term, priority}]` objects and the original v1 strings. Priority is discarded.
- `jobfinder_location` — `{ "city": "Austin", "state": "TX" }`
- `jobfinder_clicks` — `{ "QA Engineer::Indeed": 1707500000000 }`. Renaming a title migrates its `term::` keys; deleting a title leaves orphaned keys (inert, harmless).
- `jobfinder_view` — `"title"` (default) or `"board"`.
- Retired keys (`jobfinder_enabled_sites`, `jobfinder_custom_sites`, `jobfinder_collapsed`) are deleted on init.

## Code Conventions

- Titles form rows are built with `createElement` + direct listeners (no HTML injection of user text). Card links carry `data-keyword`/`data-site` and one delegated click listener does the tracking. Never interpolate user strings into inline `onclick`.
- `escapeHtml()` for text nodes, `escapeAttr()` for attribute values (hrefs included).
- Remove buttons act on `mousedown` with `preventDefault()` so row removal wins over the blur-commit race; blur-commits defer `renderCards` by ~200ms so a link click that caused the blur still lands.
- All links: `target="_blank" rel="noopener"`.

## Editing

Edit `config.js` for boards, `index.html` for UI. Refresh to see changes. Local test server: launch config `jobfinder-public` in C:\code\jobhelper\.claude\launch.json (serves this folder on :5190).
