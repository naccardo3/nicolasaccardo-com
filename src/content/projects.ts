export type Status = "running" | "production" | "live" | "shipped" | "building";

export type Tag =
  | "python"
  | "typescript"
  | "react"
  | "pipelines"
  | "modeling"
  | "hardware"
  | "llm";

export type Demo = "model" | "board" | "photo";

export type Project = {
  slug: string;
  name: string;
  status: Status;
  tagline: string;
  spec: { label: string; value: string }[];
  // "How it works" / "The hard part" — [] for compact (non-featured) cards,
  // which don't carry a beats write-up in the reference site.
  beats: { heading: string; body: string }[];
  tags: Tag[];
  featured: boolean;
  links?: { label: string; href: string }[];
  media?: { src: string; alt: string; caption: string }[];
  demo?: Demo;
};

// Drives the stack filter — order and labels match the reference site's
// filter buttons exactly.
export const TAGS: { value: Tag; label: string }[] = [
  { value: "python", label: "Python" },
  { value: "typescript", label: "TypeScript" },
  { value: "react", label: "React / Next.js" },
  { value: "pipelines", label: "Data pipelines" },
  { value: "modeling", label: "Modeling" },
  { value: "hardware", label: "Hardware" },
  { value: "llm", label: "LLM" },
];

export const projects: Project[] = [
  {
    slug: "first-inning-analyzer",
    name: "First Inning Analyzer",
    status: "running",
    tagline:
      "A prediction system for whether an MLB game scores in the first inning — and an honest scoreboard for how often it's wrong.",
    spec: [
      {
        label: "Stack",
        value: "Node.js · Express · SQLite · React · Vite · Docker · Railway",
      },
      {
        label: "Role",
        value:
          "Sole developer — architecture, data pipeline, model, and UI. All 45 commits.",
      },
    ],
    beats: [
      {
        heading: "How it works",
        body: "A cron scheduler polls the MLB Stats API every three minutes from noon to midnight ET, writing into a seven-table SQLite schema and capturing a four-point snapshot of each game's state. Server-Sent Events push live changes straight to the browser. The prediction is a **0–100 weighted composite across ten components**, with sample-size-based blending between the current and prior season — which is why the score above drifts toward the league baseline when you pull the sample slider down.",
      },
      {
        heading: "The hard part",
        body: "Calibration. The first version's confidence tiers were educated guesses. I re-tiered v3 against a **279-game backtest** and built an accuracy tracker that compares every prediction to its actual outcome, in public, on the site. A model that grades itself is worth more than one that doesn't — the tracker is what tells you which tier to trust.",
      },
    ],
    tags: ["python", "pipelines", "modeling", "react"],
    featured: true,
    demo: "model",
    links: [
      {
        label: "Open the live app",
        href: "https://nrfi-production-8bab.up.railway.app/",
      },
    ],
  },
  {
    slug: "photo-stamp-replacer",
    name: "Photo Stamp Replacer",
    status: "production",
    tagline:
      "A desktop app that pulls a project's photos straight from CompanyCam and stamps each one with the project name, address, and date formatted for NYCHA documentation.",
    spec: [
      {
        label: "Stack",
        value:
          "Python · Flask · Pillow · CompanyCam API · Next.js · PyInstaller · Inno Setup",
      },
      {
        label: "Where",
        value:
          "Empire Control Abatement — deployed to employee machines through IT",
      },
    ],
    beats: [
      {
        heading: "How it works",
        body: "A Flask API serves a statically-exported Next.js frontend on localhost and sits in the system tray. Picking a project and date range pulls its photos straight from CompanyCam's API, and Pillow stamps each one with the project name, formatted date and time, and address — layered next to CompanyCam's own timestamp, not replacing it. The batch comes back as a single ZIP.",
      },
      {
        heading: "The hard part",
        body: "Distribution, not code. **A tool nobody can install doesn't exist.** PyInstaller builds a standalone Windows executable and Inno Setup wraps it into a one-click installer that IT could push out without me standing behind anyone's desk. That last mile is the difference between a script and a tool.",
      },
    ],
    tags: ["python", "react"],
    featured: true,
    demo: "photo",
    media: [
      {
        src: "/media/photo-stamp-replacer.jpg",
        alt: "Photo Stamp Replacer desktop app window processing a batch of photos",
        caption:
          "The desktop app mid-batch, replacing timestamps on a folder of job-site photos.",
      },
    ],
  },
  {
    slug: "joc-weekly-schedule",
    name: "JOC Weekly Schedule",
    status: "production",
    tagline:
      "A wall-mounted TV board showing which crews are where this week, mirrored live from the Google Sheet the office already keeps.",
    spec: [
      {
        label: "Stack",
        value:
          "Next.js · TypeScript · Tailwind · Google Apps Script · SWR · Vercel",
      },
      {
        label: "Role",
        value: "Sole developer — three-tier design, backend, and dashboard",
      },
    ],
    beats: [
      {
        heading: "How it works",
        body: "Three tiers, with the sheet left as the source of truth so the office never changes how it works. A bound Apps Script web app parses the grid and serves it as JSON; a Next.js dashboard renders a seven-supervisor by seven-day board with the current day tinted, thirty-second polling behind a visible sync indicator, editable cells that write back, and a ten-minute self-reload so a screen left on for a month doesn't quietly drift.",
      },
      {
        heading: "The hard part",
        body: "A constraint nobody said out loud. The obvious build is a CSV export of the sheet — but CSV drops strikethrough formatting, and **strikethrough is how the office signals a mid-week crew reassignment**. Shipping the obvious version would have silently destroyed the exact information the board exists to carry. The Apps Script backend exists specifically to read rich-text runs and preserve it.",
      },
    ],
    tags: ["typescript", "react", "pipelines"],
    featured: true,
    demo: "board",
    media: [
      {
        src: "/media/joc-weekly-schedule.jpg",
        alt: "Wall-mounted TV display showing the JOC weekly crew schedule",
        caption: "The board on the office wall, mid-week.",
      },
    ],
  },
  {
    slug: "sync",
    name: "SYNC",
    status: "shipped",
    tagline:
      "A rehabilitative glove that assists hand mobility for therapy patients, driven by the wearer's own neural signals. Senior design project.",
    spec: [
      {
        label: "Stack",
        value: "Raspberry Pi · Python · UltraCortex Mark IV (EEG / BCI)",
      },
      {
        label: "Role",
        value:
          "Control logic, motor actuation, calibration · BCI integration with the lead developer",
      },
    ],
    beats: [
      {
        heading: "How it works",
        body: "I wrote the control logic, the motor actuation, and a per-user calibration routine for adaptive tensioning, then integrated real-time EEG signals from an UltraCortex Mark IV headset so the glove responds to intent rather than to a button.",
      },
      {
        heading: "The hard part",
        body: "Signals coming off a human body are noisy and specific to that person, so calibration had to be per-user rather than a shared threshold. And because the device closes around a patient's hand, the actuation logic had to fail toward doing nothing.",
      },
    ],
    tags: ["python", "hardware"],
    featured: true,
    media: [
      {
        src: "/media/sync.jpg",
        alt: "The SYNC rehabilitative glove",
        caption: "The glove, assembled.",
      },
    ],
  },
  {
    slug: "behavior-empowerment",
    name: "Behavior Empowerment",
    status: "live",
    tagline:
      "Production site and client-intake flow for an ABA consultation practice, built solo and launched on a custom domain. Third-party scheduling is embedded behind hand-configured CSP, X-Frame-Options, and image-host allowlists.",
    spec: [
      {
        label: "Stack",
        value: "Next.js 16 · React 19 · TypeScript · Tailwind",
      },
    ],
    beats: [],
    tags: ["typescript", "react"],
    featured: false,
    links: [
      { label: "Visit", href: "https://behaviorempowermentconsultation.org" },
    ],
    media: [
      {
        src: "/media/behavior-empowerment.jpg",
        alt: "Behavior Empowerment Consultation homepage",
        caption: "The live site.",
      },
    ],
  },
  {
    slug: "pavilia",
    name: "Pavilia",
    status: "building",
    tagline:
      "Group travel planning for students studying abroad — rail, bus, lodging and reservation APIs under one itinerary, with split-payment booking, an AI trip builder, and a flight recommendation engine guarded against invalid or hallucinated results.",
    spec: [{ label: "Stack", value: "Next.js · TypeScript · Auth0 · Vercel" }],
    beats: [],
    tags: ["typescript", "react", "llm"],
    featured: false,
  },
  {
    slug: "effort-ai",
    name: "Effort AI",
    status: "building",
    tagline:
      "A hinting and effort-scoring platform for fourth-grade math. Generates scaffolded hints instead of answers, tracks how hard a student is actually working, and surfaces it to teachers on a live dashboard.",
    spec: [{ label: "Stack", value: "React · LLM integration · Replit" }],
    beats: [],
    tags: ["react", "llm"],
    featured: false,
  },
  {
    slug: "aag40",
    name: "AAG40",
    status: "building",
    tagline:
      "A browser-based multiplayer WWII strategy game — turn-based combat, multi-faction play, and territory control, with a 3D rendering pipeline for the board and pieces including model baking and lighting.",
    spec: [{ label: "Stack", value: "Three.js · PixiJS · TypeScript" }],
    beats: [],
    tags: ["typescript"],
    featured: false,
  },
];
