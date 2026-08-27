"use client";

import { useState } from "react";
import Dot from "@/components/Dot";
import DemoShell from "@/components/demos/DemoShell";

type Cell = string | { o: string; n: string };

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// Wednesday, 0-indexed among the 5 day columns — matches the reference
// site's TODAY constant (1-indexed among day cells there).
const TODAY_INDEX = 2;

// Same four crews and three mid-week reassignments as the real board.
const ROWS: { crew: string; days: Cell[] }[] = [
  {
    crew: "Crew 07",
    days: [
      "Bronx — 149th St",
      "Bronx — 149th St",
      { o: "Bronx — 149th St", n: "Queens — Astoria Blvd" },
      "Queens — Astoria Blvd",
      "Queens — Astoria Blvd",
    ],
  },
  {
    crew: "Crew 12",
    days: [
      "Brooklyn — Flatbush",
      "Brooklyn — Flatbush",
      "Brooklyn — Flatbush",
      { o: "Brooklyn — Flatbush", n: "Bronx — Grand Conc." },
      "Bronx — Grand Conc.",
    ],
  },
  {
    crew: "Crew 19",
    days: [
      "Manhattan — W 34th",
      { o: "Manhattan — W 34th", n: "Staten Is. — Bay St" },
      "Staten Is. — Bay St",
      "Staten Is. — Bay St",
      "Yard",
    ],
  },
  {
    crew: "Crew 24",
    days: [
      "Yard",
      "Bronx — Hunts Pt",
      "Bronx — Hunts Pt",
      "Bronx — Hunts Pt",
      "Bronx — Hunts Pt",
    ],
  },
];

const HEADER_CELL_CLASS =
  "border border-rule-soft bg-raise px-2 py-[0.42rem] text-left align-top text-[0.625rem] font-medium tracking-[0.09em] text-ink-dim uppercase";

export default function BoardDemo() {
  const [mode, setMode] = useState<"script" | "csv">("script");

  return (
    <DemoShell
      title="Read the sheet with…"
      action={
        <span
          role="group"
          aria-label="Choose a backend"
          className="inline-flex overflow-hidden rounded-[3px] border border-rule"
        >
          <button
            type="button"
            aria-pressed={mode === "script"}
            onClick={() => setMode("script")}
            className="border-r border-rule px-[0.7rem] py-[0.36rem] font-mono text-[0.6875rem] tracking-[0.08em] text-ink-dim uppercase transition-colors duration-150 hover:text-ink aria-[pressed=true]:bg-accent-soft aria-[pressed=true]:text-accent"
          >
            Apps Script
          </button>
          <button
            type="button"
            aria-pressed={mode === "csv"}
            onClick={() => setMode("csv")}
            className="px-[0.7rem] py-[0.36rem] font-mono text-[0.6875rem] tracking-[0.08em] text-ink-dim uppercase transition-colors duration-150 hover:text-ink aria-[pressed=true]:bg-amber-soft aria-[pressed=true]:text-amber"
          >
            CSV export
          </button>
        </span>
      }
      note="The office marks a mid-week reassignment by striking through the old site. Flip the backend to see what a plain CSV export does to that."
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-xs">
          <caption className="sr-only">Crew assignments for the week</caption>
          <thead>
            <tr>
              <th scope="col" className={HEADER_CELL_CLASS}>
                Crew
              </th>
              {DAYS.map((day) => (
                <th key={day} scope="col" className={HEADER_CELL_CLASS}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.crew}>
                <th scope="row" className={HEADER_CELL_CLASS}>
                  {row.crew}
                </th>
                {row.days.map((cell, i) => (
                  <td
                    key={i}
                    className={`border border-rule-soft px-2 py-[0.42rem] text-left align-top text-ink-mid ${
                      i === TODAY_INDEX ? "bg-accent-soft" : ""
                    }`}
                  >
                    {typeof cell === "string" ? (
                      cell
                    ) : mode === "script" ? (
                      <>
                        <span className="text-ink-mid line-through decoration-amber decoration-[1.5px]">
                          {cell.o}
                        </span>
                        <br />
                        <span className="text-ink">{cell.n}</span>
                      </>
                    ) : (
                      <>
                        {cell.o}
                        <br />
                        {cell.n}
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`mt-[0.9rem] flex items-center gap-[0.55rem] font-mono text-[0.7188rem] leading-[1.5] ${
          mode === "script" ? "text-accent" : "text-amber"
        }`}
      >
        <Dot variant={mode === "script" ? "live" : "build"} />
        {mode === "script"
          ? "3 reassignments read correctly — the cancelled site stays struck through."
          : "3 cells now show two active sites with no way to tell which one was cancelled."}
      </p>
    </DemoShell>
  );
}
