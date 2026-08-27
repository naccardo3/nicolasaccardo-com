"use client";

import { useEffect, useState } from "react";
import { TAGS } from "@/content/projects";

const FILTERS = [
  { value: "all", label: "All" },
  ...TAGS.map((t) => ({ value: t.value as string, label: t.label })),
];

export default function StackFilter() {
  const [active, setActive] = useState("all");

  useEffect(() => {
    const records = Array.from(
      document.querySelectorAll<HTMLElement>("#work [data-proj]"),
    );
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("#also [data-proj]"),
    );

    const matches = (el: HTMLElement) => {
      if (active === "all") return true;
      const tags = el.getAttribute("data-tags") ?? "";
      return (" " + tags + " ").includes(" " + active + " ");
    };

    records.forEach((el) => el.removeAttribute("data-first-visible"));
    const recordResults = records.map((el) => ({ el, ok: matches(el) }));
    recordResults.forEach(({ el, ok }) =>
      el.setAttribute("data-hidden", String(!ok)),
    );
    const shownR = recordResults.filter((r) => r.ok).length;
    recordResults.find((r) => r.ok)?.el.setAttribute("data-first-visible", "");

    const cardResults = cards.map((el) => ({ el, ok: matches(el) }));
    cardResults.forEach(({ el, ok }) =>
      el.setAttribute("data-hidden", String(!ok)),
    );
    const shownC = cardResults.filter((r) => r.ok).length;

    const pad = (n: number) => String(n).padStart(2, "0");
    const workCount = document.querySelector("[data-count='work']");
    const alsoCount = document.querySelector("[data-count='also']");
    if (workCount) workCount.textContent = pad(shownR);
    if (alsoCount) alsoCount.textContent = pad(shownC);

    const note = document.querySelector("[data-filter-note]");
    if (note) {
      if (active === "all") {
        note.textContent = "";
      } else {
        const label = FILTERS.find((f) => f.value === active)?.label ?? active;
        note.textContent = `${shownR + shownC} of ${records.length + cards.length} projects use ${label}.`;
      }
    }
  }, [active]);

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by technology"
        className="mb-10 flex flex-wrap items-center gap-[0.4rem]"
      >
        <span className="mr-[0.35rem] font-mono text-label text-ink-dim uppercase">
          Filter
        </span>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={active === f.value}
            onClick={() => setActive(f.value)}
            className="rounded-[2px] border border-rule px-[0.68rem] py-[0.34rem] font-mono text-[0.7188rem] tracking-[0.04em] text-ink-dim transition-colors duration-150 hover:border-ink-dim hover:text-ink aria-[pressed=true]:border-accent-line aria-[pressed=true]:bg-accent-soft aria-[pressed=true]:text-accent"
          >
            {f.label}
          </button>
        ))}
      </div>
      <p
        data-filter-note
        role="status"
        aria-live="polite"
        className="mt-[-1.75rem] mb-[2.25rem] min-h-[1.1em] font-mono text-[0.7188rem] text-ink-dim"
      />
    </>
  );
}
