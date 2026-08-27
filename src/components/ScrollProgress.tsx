"use client";

import { useEffect, useRef } from "react";

const SECTION_IDS = ["work", "experience", "contact"];

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;
    function draw() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar!.style.width =
        (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + "%";
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(draw);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", draw);
    draw();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", draw);
    };
  }, []);

  useEffect(() => {
    const links = new Map<string, HTMLAnchorElement>();
    document.querySelectorAll<HTMLAnchorElement>("[data-nav]").forEach((a) => {
      const key = a.getAttribute("data-nav");
      if (key) links.set(key, a);
    });

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const a = links.get(entry.target.id);
          if (!a) return;
          if (entry.isIntersecting) {
            links.forEach((link) => link.removeAttribute("aria-current"));
            a.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-52px 0px -62% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));

    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={barRef}
      className="absolute -bottom-px left-0 h-0.5 w-0 bg-accent opacity-85 transition-[width] duration-[120ms] ease-linear"
    />
  );
}
