import { Fragment, type ReactNode } from "react";
import SpecList from "@/components/SpecList";
import StatusChip from "@/components/StatusChip";
import type { Project } from "@/content/projects";

// Splits on **bold** markers into <strong> spans, matching the reference
// site's inline <strong> emphasis inside beat copy (CLAUDE.md: "Concrete
// numbers over adjectives" — these are the numbers doing the persuading).
function renderInlineBold(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium text-ink">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export default function ProjectRecord({
  project,
  isFirst = false,
  demoSlot,
}: {
  project: Project;
  isFirst?: boolean;
  demoSlot?: ReactNode;
}) {
  return (
    <article
      data-proj
      data-record
      data-tags={project.tags.join(" ")}
      {...(isFirst ? { "data-first-visible": "" } : {})}
      className="border-t border-rule-soft pt-10 data-[first-visible]:border-t-0 data-[first-visible]:pt-0"
    >
      <div className="mb-[0.35rem] flex flex-wrap items-start justify-between gap-4">
        <h3 className="font-mono text-title">{project.name}</h3>
        <StatusChip status={project.status} />
      </div>

      <p className="mb-[1.35rem] max-w-measure text-ink-mid">
        {project.tagline}
      </p>

      <SpecList items={project.spec} />

      {demoSlot}

      {project.beats.map((beat) => (
        <div
          key={beat.heading}
          className="mb-[1.35rem] max-w-measure last:mb-0"
        >
          <h4 className="mb-[0.4rem] font-mono text-[0.6875rem] font-medium tracking-[0.14em] text-ink-dim uppercase">
            {beat.heading}
          </h4>
          <p className="text-ink-mid">{renderInlineBold(beat.body)}</p>
        </div>
      ))}
    </article>
  );
}
