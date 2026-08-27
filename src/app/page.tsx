import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ModelDemo from "@/components/demos/ModelDemo";
import ProjectCard from "@/components/ProjectCard";
import ProjectRecord from "@/components/ProjectRecord";
import Reveal from "@/components/Reveal";
import RoleList from "@/components/RoleList";
import SectionHead from "@/components/SectionHead";
import StackFilter from "@/components/StackFilter";
import { projects, type Demo } from "@/content/projects";

// Code-split the two demos further down the page — there's naturally more
// time for their JS to arrive and hydrate before someone scrolls to and
// touches them, so splitting is free performance with no real downside.
//
// ModelDemo is NOT split (imported directly above): it's the first thing on
// the page, so it's also the most likely to be touched within moments of
// paint. A controlled <input type="range"> is a real, natively-draggable
// DOM node before hydration attaches its onChange — drag it in that window
// and the value moves with no score update, then React resets it to match
// its own state once hydration completes, snapping the slider back. That
// race is real regardless of splitting, but a separate lazy-loaded chunk
// measurably widens the window versus shipping it in the main bundle. Not
// worth the risk for the one demo most likely to be judged as "broken" on
// first impression.
const BoardDemo = dynamic(() => import("@/components/demos/BoardDemo"));
const PhotoDemo = dynamic(() => import("@/components/demos/PhotoDemo"));

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
