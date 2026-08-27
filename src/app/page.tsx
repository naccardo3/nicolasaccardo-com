import ThemeToggle from "@/components/ThemeToggle";

// Temporary Phase 2 verification harness — exercises every design token,
// the font pipeline, and the theme toggle. Replaced with real content in
// Phase 3/4.
export default function Home() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <div className="wrap flex items-center justify-between py-4">
        <span className="font-mono text-label uppercase tracking-[0.14em]">
          Design system check
        </span>
        <ThemeToggle />
      </div>

      <div className="wrap flex flex-col gap-10 pb-16">
        <h1 className="font-mono text-hero text-balance">
          I build software that ends up running somewhere.
        </h1>

        <p className="max-w-measure text-ink-mid">
          Body copy in IBM Plex Sans, at the 1.0625rem / 1.62 line-height spec
          from CLAUDE.md. This paragraph is capped at the 68ch measure via the{" "}
          <code className="font-mono text-spec">max-w-measure</code> utility.
        </p>

        <h3 className="font-mono text-title">Project title token</h3>
        <span className="font-mono text-eyebrow uppercase text-ink-dim">
          Section eyebrow token
        </span>

        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-[2px] border border-accent-line bg-accent-soft px-3 py-1 font-mono text-label uppercase text-accent">
            <span className="h-[7px] w-[7px] rounded-full bg-accent" />
            Live chip
          </span>
          <span className="inline-flex items-center gap-2 rounded-[2px] border border-amber-line bg-amber-soft px-3 py-1 font-mono text-label uppercase text-amber">
            <span className="h-[7px] w-[7px] rounded-full bg-amber" />
            Building chip
          </span>
          <span className="inline-flex items-center gap-2 rounded-[2px] border border-rule px-3 py-1 font-mono text-label uppercase text-ink-dim">
            <span className="h-[7px] w-[7px] rounded-full bg-ink-dim" />
            Shipped chip
          </span>
        </div>

        <dl className="rounded-[3px] border border-rule-soft bg-surface p-4 font-mono text-spec shadow-panel">
          <div className="flex gap-6">
            <dt className="text-ink-dim uppercase">Stack</dt>
            <dd className="text-ink-mid">Next.js · Tailwind v4 · TypeScript</dd>
          </div>
        </dl>

        <div className="flex gap-4">
          <div className="h-16 w-16 rounded-[3px] border border-rule bg-ground" />
          <div className="h-16 w-16 rounded-[3px] border border-rule bg-surface" />
          <div className="h-16 w-16 rounded-[3px] border border-rule bg-raise" />
          <div className="h-16 w-16 rounded-[3px] border border-rule bg-track" />
        </div>

        <a href="#" className="w-fit">
          A link, underlined with accent-line and solid accent on hover
        </a>
      </div>
    </div>
  );
}
