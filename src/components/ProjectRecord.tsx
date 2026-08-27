import { Fragment, type ReactNode } from "react";
import ProjectMedia from "@/components/ProjectMedia";
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

      {project.links && project.links.length > 0 && (
        <div className="mb-[1.35rem] flex flex-wrap gap-2">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-[0.55rem] rounded-[2px] border border-accent-line bg-accent-soft px-4 py-[0.55rem] font-mono text-xs font-medium tracking-[0.1em] text-accent uppercase transition-colors duration-150 hover:border-accent"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}

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

      {project.media?.map((item) => (
        <ProjectMedia
          key={item.src}
          src={item.src}
          alt={item.alt}
          caption={item.caption}
          className="mt-[1.6rem] mb-[0.35rem]"
        />
      ))}
    </article>
  );
}
