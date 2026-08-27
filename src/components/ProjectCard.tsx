import StatusChip from "@/components/StatusChip";
import type { Project } from "@/content/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      data-proj
      data-tags={project.tags.join(" ")}
      className="relative flex flex-col gap-[0.7rem] bg-surface p-[1.4rem] px-[1.35rem] transition-colors duration-200 ease-out before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-accent before:transition-transform before:duration-[240ms] before:ease-[cubic-bezier(0.2,0.7,0.3,1)] before:content-[''] hover:bg-raise hover:before:scale-y-100"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-mono text-base font-semibold tracking-[-0.01em]">
          {project.name}
        </h3>
        <StatusChip status={project.status} />
      </div>

      <p className="text-[0.9375rem] leading-[1.55] text-ink-mid">
        {project.tagline}{" "}
        {project.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener"
            className="whitespace-nowrap"
          >
            {link.label} →
          </a>
        ))}
      </p>

      <div className="mt-auto pt-[0.2rem] font-mono text-xs text-ink-dim">
        {project.spec[0]?.value}
      </div>
    </div>
  );
}
