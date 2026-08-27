import type { ReactNode } from "react";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import ProjectRecord from "@/components/ProjectRecord";
import Reveal from "@/components/Reveal";
import RoleList from "@/components/RoleList";
import SectionHead from "@/components/SectionHead";
import StackFilter from "@/components/StackFilter";
import BoardDemo from "@/components/demos/BoardDemo";
import ModelDemo from "@/components/demos/ModelDemo";
import PhotoDemo from "@/components/demos/PhotoDemo";
import { projects, type Demo } from "@/content/projects";

const DEMOS: Record<Demo, ReactNode> = {
  model: <ModelDemo />,
  board: <BoardDemo />,
  photo: <PhotoDemo />,
};

const SECTION_PADDING = "py-[clamp(2.75rem,6vw,4.25rem)]";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const compact = projects.filter((p) => !p.featured);

  return (
    <>
      <Hero />

      <section id="work" className={SECTION_PADDING}>
        <div className="wrap">
          <SectionHead
            title="Selected work"
            count={featured.length}
            countKey="work"
          />
          <StackFilter />
          <div className="flex flex-col gap-11">
            {featured.map((project, i) => (
              <ProjectRecord
                key={project.slug}
                project={project}
                isFirst={i === 0}
                demoSlot={project.demo ? DEMOS[project.demo] : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="also" className={SECTION_PADDING}>
        <div className="wrap">
          <SectionHead
            title="Also built"
            count={compact.length}
            countKey="also"
          />
          <Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-px overflow-hidden rounded-[3px] border border-rule-soft bg-rule-soft">
              {compact.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience" className={SECTION_PADDING}>
        <div className="wrap">
          <SectionHead title="Experience" />
          <RoleList />
        </div>
      </section>

      <section
        id="contact"
        className="pt-[clamp(2.75rem,6vw,4.25rem)] pb-[clamp(3.5rem,8vw,5.5rem)]"
      >
        <div className="wrap">
          <SectionHead title="Contact" />
          <Contact />
        </div>
      </section>
    </>
  );
}
