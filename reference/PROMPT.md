# Build prompt — port nicolasaccardo.com to Next.js and ship it

Paste this whole file as your first message to Claude Code, in an empty directory,
with `index.html` copied in beside it.

---

## Fill these in before you start

Claude Code: if any value below still says `TODO`, **stop and ask me for it** before you
reach the phase that needs it. Do not invent a URL, a username, or a domain.

```
NRFI_LIVE_URL   = TODO   # deployed First Inning Analyzer (the Railway URL)
NRFI_REPO_URL   = TODO   # optional — public repo, or leave blank
GITHUB_USERNAME = TODO
DOMAIN          = TODO   # e.g. nicolasaccardo.com — or "vercel-subdomain" for now
```

---

## Context

I'm Nicolas Accardo, a software engineer. `index.html` in this directory is a finished,
working single-file version of my personal site: complete design system, real copy, and
three interactive demos that already work. It is the **reference implementation**.

Your job is to rebuild it as a real Next.js repo I can maintain and extend, deploy it,
and add two things the single file couldn't have: a live link to the deployed First
Inning Analyzer, and real screenshots of the tools.

**The design is done. Do not redesign it.** Port it faithfully — same palette, same type,
same layout, same copy, same interactions. If you think something should change, say so
and wait for my answer instead of changing it. `CLAUDE.md` in this directory is the
binding spec for tokens, voice, and conventions; read it first and keep it accurate as
the project evolves.

---

## Stack

- Next.js (App Router) + TypeScript, `strict: true`
- Tailwind CSS v4
- `next/font` for IBM Plex Sans and IBM Plex Mono — self-hosted, no runtime font requests
- No UI component library, no animation library, no state library. The demos are plain
  React state and CSS. Every dependency you add, justify in your summary.
- Deployed on Vercel

---

## Phase 1 — Scaffold and baseline

1. `create-next-app` with TypeScript, Tailwind, App Router, ESLint, `src/` directory.
2. `git init`, first commit before you write any of my code. Commit at the end of every
   phase with a real message — I want the history to read as a build log.
3. Set up path aliases (`@/`), strict TS, and Prettier if it isn't already there.
4. Confirm `npm run build` passes on the untouched scaffold before continuing.

## Phase 2 — Design system

Port the token system out of `index.html`'s `<style>` block into Tailwind v4 theme
variables in `globals.css`. Exact hex values are in `CLAUDE.md` — copy them, don't
eyeball them from the HTML.

Theme handling is the one place the port is genuinely different from the original, so
get it right:

- Dark is the default. Light is available by `prefers-color-scheme` **and** by an
  explicit `data-theme` attribute on `<html>`, with the explicit choice winning in both
  directions.
- Persist the choice in `localStorage` under `na-theme`, wrapped in try/catch.
- **Add a blocking inline script in `<head>`** that reads `localStorage` and stamps
  `data-theme` before first paint. Without it the page flashes the wrong theme on every
  load, which is the classic Next.js dark-mode bug and would be embarrassing on a site
  whose whole argument is that I sweat the details.

Verify: load the site with the OS in light mode and dark mode, with an explicit choice
saved and with none, and confirm no flash in any of the four combinations.

## Phase 3 — Content as data

Extract every project into `src/content/projects.ts` — a typed array, one object per
project:

```ts
type Status = 'running' | 'production' | 'live' | 'shipped' | 'building'

type Project = {
  slug: string
  name: string
  status: Status
  tagline: string
  spec: { label: string; value: string }[]
  beats: { heading: string; body: string }[]   // "How it works", "The hard part"
  tags: Tag[]                                  // drives the filter
  featured: boolean                            // full record vs compact card
  links?: { label: string; href: string }[]
  media?: { src: string; alt: string; caption: string }[]
  demo?: 'model' | 'board' | 'photo'
}
```

Both the featured records and the compact cards render from this one array, and so does
the filter. Adding a project must mean editing one file and nothing else — that is the
main thing this rebuild buys me, so don't hardcode content into JSX anywhere.

Copy the prose across **verbatim**. It's been edited; retyping it will degrade it.

## Phase 4 — Components

Break the page into components under `src/components/`: `TopBar`, `Hero`, `SectionHead`,
`StackFilter`, `ProjectRecord`, `ProjectCard`, `StatusChip`, `SpecList`, `RoleList`,
`Contact`, `Footer`, and one file per demo under `src/components/demos/`.

Server components by default. Only the demos, the theme toggle, the filter, the scroll
progress, and the copy-email button are `'use client'`.

## Phase 5 — The three demos

Port these as React components. **The math and the data must come across exactly** —
they describe real systems, and wrong numbers here are worse than no demo.

**`ModelDemo`** — First Inning Analyzer scorer.
- Weights: `era 26, obp 20, type 16, opp 16, park 12, wx 10` (sum 100).
- Normalize each input to 0–1: era `(v/100)/9` clamped to 1; obp `(v-250)/170`;
  opp `v/100`; park `(v-85)/35`; wx `v/100`; type `v/100`.
- `raw = Σ weight × normalized`
- Shrinkage: `a = games / (games + 8)`, `final = a × raw + (1 - a) × 50`
- Confidence tier from `a`: `<0.45` Low, `<0.62` Moderate, `<0.74` Strong, else Very strong.
- Keep the component-contribution bars and the blend readout.
- Pull the constants into a `MODEL` object at the top of the file so they're auditable.

**`BoardDemo`** — Apps Script vs CSV export. Same four crews, same three reassignments,
same Wednesday tint. The toggle drops the strikethrough in CSV mode; the verdict line
changes with it.

**`PhotoDemo`** — OCR restamp sequence. Keep the step timings, the scan sweep, the
detection box, and the reset. If you replace the mock SVG with a real photo (Phase 6),
the detection box must still measure itself against the live stamp element rather than
using fixed offsets.

All three: no animation when `prefers-reduced-motion: reduce` — jump straight to the end
state. Clear every timer on unmount.

## Phase 6 — Media (the part that adds new value)

**First Inning Analyzer:** add a prominent "Open the live app →" link to `NRFI_LIVE_URL`
in the project's header row, styled as a real call to action rather than an inline link.
This is the one project a visitor can go use, so make that obvious. Add the repo link too
if `NRFI_REPO_URL` is set.

**Screenshots:** the other projects need real images. Build the presentation layer first —
a `ProjectMedia` component using `next/image`, fixed aspect ratio, rounded to match the
demo panels, hairline border, caption underneath in mono, and a lightbox on click
(plain dialog element, no library) — then give me a capture list:

- exact pixel dimensions to shoot at
- what should be in frame for each of: JOC Weekly Schedule (the wall board), Photo Stamp
  Replacer (the app window mid-batch), SYNC (the glove), Behavior Empowerment (the live site)
- where to drop the files

Then wait for me to supply them. Use a neutral placeholder with the right dimensions in
the meantime so layout is final before the real images land.

**Redaction — read this carefully.** The JOC board and the Photo Stamp screenshots come
from my employer's live systems. Before any of them ship: no real employee names, no
client names, no job addresses, no phone numbers, no photos of identifiable people. Tell
me exactly what you see in each image I hand you and what needs blurring or replacing,
and do not commit an image you haven't checked. If you're unsure whether something is
sensitive, ask instead of shipping it. Same rule for anything visible in the SYNC photos.

## Phase 7 — CI

Add `.github/workflows/ci.yml` running on push and PR: install, `tsc --noEmit`, lint, and
`next build`. Branch protection on `main` if the repo is public.

This one is deliberate. I'm applying to roles that list CI/CD as a hard requirement and
I currently have build automation but no pipeline I configured myself. Keep the workflow
readable and conventional — it's meant to be looked at.

## Phase 8 — Production concerns

- Metadata: title, description, canonical, and OG/Twitter tags. Generate an OG image with
  `next/og` using the site's own palette and mono type — my name, the tagline, nothing else.
- `sitemap.ts`, `robots.ts`, favicon, apple-touch-icon.
- The résumé PDF lives at `/public/Nicolas_Accardo_Resume.pdf` and the contact button links to it.
- Accessibility: keyboard-reachable everything, visible focus rings, labelled sliders and
  toggles, `aria-pressed` on the filter and segmented controls, `aria-live` on the demo
  status text, one `h1`, sensible heading order. Run an a11y audit and fix what it finds.
- Lighthouse on the production build: I want 95+ on every category. Report the actual
  numbers, don't assert them.

## Phase 9 — Ship

Deploy to Vercel. Wire `DOMAIN` if I gave you one. Give me the live URL, the repo URL,
and anything I still need to do myself (DNS records, adding the screenshots).

---

## Definition of done

- [ ] `npm run build` clean, `tsc --noEmit` clean, lint clean
- [ ] No theme flash in any of the four OS-preference / saved-choice combinations
- [ ] All three demos work and match the reference math and data exactly
- [ ] Reduced-motion respected throughout
- [ ] No horizontal scroll at 320px, 390px, 768px, 1280px, 1920px
- [ ] Adding a project = editing `src/content/projects.ts` only
- [ ] CI green on GitHub
- [ ] Lighthouse 95+ across the board, numbers reported
- [ ] No employer-sensitive content in any committed image
- [ ] Deployed and reachable

## Not in scope

Don't add a blog, a CMS, analytics, a contact form, testimonials, a "skills" progress-bar
section, or scroll-jacking. Don't swap the fonts. Don't rewrite my copy.

## How to work

Do the phases in order. At the end of each, commit and give me a two-or-three-line
summary of what changed and anything you had to decide. Stop and ask when a decision is
mine — a missing URL, an ambiguous screenshot, or anything that changes the design.

Start by reading `index.html` and `CLAUDE.md` in full, then tell me your plan for Phase 1
before you run anything.
