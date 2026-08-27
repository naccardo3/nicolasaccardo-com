# CLAUDE.md — nicolasaccardo.com

Personal site for Nicolas Accardo, software engineer. Its one job: convince a hiring
manager, in about ninety seconds of skimming, that I build things that actually run.

The visual design and the copy are finished and were arrived at deliberately. This file
is the spec. When something here conflicts with an instinct to improve the design, this
file wins — raise it with me instead of changing it.

---

## The thesis

Every project on this site is framed by **where it runs**: a wall-mounted screen in a
Bronx field office, a cron schedule firing every three minutes, an installer on a
technician's laptop. That framing is the site's argument. Status chips aren't decoration —
they're the structural device, and the accent color is literally the live-indicator color.

---

## Design tokens

Dark is the default. Light is a designed alternative, not an inversion.

### Dark

| Token | Hex | Use |
|---|---|---|
| `ground` | `#0E1211` | page background (green-shifted near-black) |
| `surface` | `#141A18` | panels, cards, spec strips |
| `raise` | `#1A211F` | demo bars, hover states |
| `rule` | `#242D2A` | visible borders |
| `rule-soft` | `#1C2422` | hairlines, table cells |
| `ink` | `#E6EAE7` | primary text |
| `ink-mid` | `#B3BDB8` | body copy |
| `ink-dim` | `#828E89` | labels, captions, metadata |
| `accent` | `#6FB49A` | links, live status, interactive fills |
| `amber` | `#D9A055` | "building" status and failure states **only** |
| `track` | `#26302C` | slider and meter tracks |

### Light

| Token | Hex |
|---|---|
| `ground` | `#F2F4F2` |
| `surface` | `#FBFCFB` |
| `raise` | `#FFFFFF` |
| `rule` | `#D6DDD8` |
| `rule-soft` | `#E4E9E5` |
| `ink` | `#121916` |
| `ink-mid` | `#3D4945` |
| `ink-dim` | `#5F6C67` |
| `accent` | `#2C7A62` |
| `amber` | `#8A5911` |
| `track` | `#DFE5E1` |

Soft/line variants: `accent-soft` and `amber-soft` are the same hue at ~14% alpha (dark)
or ~10% (light); `accent-line` and `amber-line` at ~32% (dark) or ~30% (light).

**Rules.** The neutrals are green-biased on purpose — never substitute a pure grey.
Amber is semantic, never decorative: it means "in development" or "this broke." Every
color comes from a token; no literal hex in a component. Nothing may be defined only
inside a media query or a `[data-theme]` block, or it won't apply in the unstamped state.

---

## Typography

- **IBM Plex Mono** — all headings including the hero, plus every label, spec value,
  status chip, table, number, and caption. Mono display type is a deliberate commitment,
  not a fallback. It reads as machine output, which is the point.
- **IBM Plex Sans** — body copy and prose only.
- Both via `next/font`, self-hosted, with real fallback stacks.

| Role | Size | Notes |
|---|---|---|
| Hero | `clamp(2.35rem, 7.4vw, 4.15rem)` mono 600 | `letter-spacing: -.035em`, `line-height: 1.02`, `text-wrap: balance` |
| Project title | `clamp(1.25rem, 3vw, 1.5rem)` mono 600 | `-.02em` |
| Section eyebrow | `.75rem` mono 600 | uppercase, `.16em` tracking, `ink-dim` |
| Body | `1.0625rem` sans 400 | `line-height: 1.62`, `ink-mid` |
| Label / caption | `.6875rem` mono | uppercase, `.13em` tracking, `ink-dim` |
| Data / spec | `.8125rem` mono | `tabular-nums` wherever digits align |

Prose measure caps at `68ch`. Shell max-width is `940px`.

---

## Layout and motion

Single column. Flex/grid with `gap` — not per-element margins. Wide content (tables,
the crew board) scrolls inside its own `overflow-x: auto`; the page body never scrolls
sideways at any width.

Motion is restrained on purpose. What exists: the pulsing live dot, a fade-up reveal on
scroll, the demo transitions, and hover states. That is the budget. Extra animation makes
the site read as generated, which defeats its purpose. Everything animated must have a
`prefers-reduced-motion: reduce` path that lands on the final state immediately.

---

## Voice

Written in first person, plainly, with specifics doing the persuading.

- **Structure every featured project as three beats:** a tagline, "How it works", and
  "The hard part." The third is where the site actually wins — it's where I show
  judgment, not just tooling.
- Concrete numbers over adjectives: "a 279-game backtest," "every three minutes," "all 45
  commits." Never "cutting-edge," "passionate," "robust," "leveraged," "seamless."
- Active voice. I did the thing.
- Claims must be checkable. **Never add a skill, tool, framework, or credential I haven't
  demonstrated** — not in copy, not in a tag, not in a meta description. If a section
  feels thin, that's information, not a gap to fill.
- Any interactive demo running on sample inputs must say so, in plain words, next to it.
  A recruiter poking at a widget should never come away thinking it was live data.

---

## Content model

`src/content/projects.ts` is the single source for every project — featured records,
compact cards, and the stack filter all read from it. Adding or editing a project means
touching that file and nothing else. Never hardcode project content into JSX.

Tags in use: `python`, `typescript`, `react`, `pipelines`, `modeling`, `hardware`, `llm`.
Add a tag only when at least two projects would carry it.

Statuses: `running`, `production`, `live` (accent + pulsing dot), `shipped` (neutral dot),
`building` (amber). A status must be true right now — if a project stops running, change it.

---

## Code conventions

- Server components by default. `'use client'` only for the demos, theme toggle, stack
  filter, scroll progress, and copy button.
- TypeScript strict. No `any`. Props typed at the component.
- Demo constants (model weights, board data, step timings) live in a named object at the
  top of their file so they can be audited against the real system.
- Clean up: clear timers, disconnect observers, remove listeners on unmount.
- Dependencies are a cost. No component library, no animation library, no state manager.
  Justify anything new in the PR description.

---

## Security and privacy

Screenshots of JOC Weekly Schedule and Photo Stamp Replacer come from Empire Control
Abatement's live systems. Nothing ships with real employee names, client names, job
addresses, phone numbers, or identifiable people. Check every image before committing it
and tell me what you saw. When in doubt, ask — a blurred screenshot is fine, a leaked one
is not.

No secrets, API keys, or `.env` values in the repo.

---

## Commands

```bash
npm run dev          # local
npm run build        # must pass before every commit
npx tsc --noEmit     # must pass before every commit
npm run lint
```

## Quality bar

Before calling anything done: build and typecheck clean, no theme flash on load, no
horizontal scroll at 320 / 390 / 768 / 1280 / 1920, keyboard reachable throughout with
visible focus, reduced-motion honored, and Lighthouse 95+ on all four categories with the
actual numbers reported rather than assumed.
