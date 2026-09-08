"use client";

import { useState } from "react";
import Dot from "@/components/Dot";
import DemoShell from "@/components/demos/DemoShell";

type Cell = string | { o: string; n: string };

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Thursday — an arbitrary mid-week pick for the illustration.
const TODAY_INDEX = 3;

// Four illustrative supervisor rows and three mid-week reassignments —
// the real board has no crew-labeled rows, just per-day project codes
// entered against a supervisor; these codes are invented, not real jobs.
const ROWS: { supervisor: string; days: Cell[] }[] = [
  {
    supervisor: "Priya",
    days: [
      "K215 - BU",
      "K215 - BU",
      { o: "K215 - BU", n: "X042 - LAB" },
      "X042 - LAB",
      "X042 - LAB",
      "—",
      "—",
    ],
  },
  {
    supervisor: "Marcus",
    days: [
      "M310 - CTF",
      "M310 - CTF",
      "M310 - CTF",
      { o: "M310 - CTF", n: "Q188 - POT" },
      "Q188 - POT",
      "Q188 - POT",
      "—",
    ],
  },
  {
    supervisor: "Dana",
    days: [
      "R220 - CTF",
      { o: "R220 - CTF", n: "X155 - LAB" },
      "X155 - LAB",
      "X155 - LAB",
      "X155 - LAB",
      "—",
      "—",
    ],
  },
  {
    supervisor: "Theo",
    days: ["—", "K330 - BU", "K330 - BU", "K330 - BU", "K330 - BU", "—", "—"],
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
      note="The office marks a mid-week reassignment by striking through the old project code. Flip the backend to see what a plain CSV export does to that."
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-xs">
          <caption className="sr-only">
            Supervisor project assignments for the week
          </caption>
          <thead>
            <tr>
              <th scope="col" className={HEADER_CELL_CLASS}>
                Supers
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
              <tr key={row.supervisor}>
                <th scope="row" className={HEADER_CELL_CLASS}>
                  {row.supervisor}
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
          ? "3 reassignments read correctly — the earlier project code stays struck through."
          : "3 cells now show two project codes with no way to tell which one was cancelled."}
      </p>
    </DemoShell>
  );
}
