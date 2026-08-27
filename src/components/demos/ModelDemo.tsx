"use client";

import { useState } from "react";
import Dot from "@/components/Dot";
import DemoShell from "@/components/demos/DemoShell";

// First Inning Analyzer's real scoring logic, audited against the live
// system. Weights sum to 100; each input normalizes to roughly 0-1 before
// being weighted.
const MODEL = {
  weights: { era: 26, obp: 20, type: 16, opp: 16, park: 12, wx: 10 },
  prior: 50,
  defaults: { era: 420, obp: 335, opp: 50, park: 100, wx: 50, type: 50, n: 12 },
} as const;

type Field = keyof typeof MODEL.defaults;
type Inputs = Record<Field, number>;

const RANGE_INPUT_CLASS =
  "m-0 h-[18px] w-full cursor-pointer appearance-none bg-transparent " +
  "[&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:rounded-[2px] [&::-webkit-slider-runnable-track]:bg-track " +
  "[&::-moz-range-track]:h-[3px] [&::-moz-range-track]:rounded-[2px] [&::-moz-range-track]:bg-track " +
  "[&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ground [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-[140ms] " +
  "[&::-moz-range-thumb]:h-[13px] [&::-moz-range-thumb]:w-[13px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-ground [&::-moz-range-thumb]:bg-accent " +
  "hover:[&::-webkit-slider-thumb]:scale-[1.18] active:[&::-webkit-slider-thumb]:scale-[1.18]";

function band(v: number, stops: [number, string][]): string {
  for (const [limit, label] of stops) {
    if (v < limit) return label;
  }
  return stops[stops.length - 1][1];
}

function normalize(inputs: Inputs) {
  return {
    era: Math.min(1, inputs.era / 100 / 9),
    obp: (inputs.obp - 250) / 170,
    opp: inputs.opp / 100,
    park: (inputs.park - 85) / 35,
    wx: inputs.wx / 100,
    type: inputs.type / 100,
  };
}

const CONTRIB_ROWS: { key: keyof typeof MODEL.weights; label: string }[] = [
  { key: "era", label: "1st-inn ERA" },
  { key: "obp", label: "Lineup OBP" },
  { key: "type", label: "Pitcher type" },
  { key: "opp", label: "Opponent" },
  { key: "park", label: "Park" },
  { key: "wx", label: "Weather" },
];

function SliderRow({
  id,
  label,
  valueLabel,
  min,
  max,
  value,
  onChange,
}: {
  id: string;
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-[0.3rem]">
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-3 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-dim uppercase"
      >
        {label}
        <span className="text-[0.75rem] tracking-[0.02em] text-ink normal-case tabular-nums">
          {valueLabel}
        </span>
      </label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={RANGE_INPUT_CLASS}
      />
    </div>
  );
}

export default function ModelDemo() {
  const [inputs, setInputs] = useState<Inputs>(MODEL.defaults);

  function setField(field: Field, value: number) {
    setInputs((prev) => ({ ...prev, [field]: value }));
  }

  const norm = normalize(inputs);
  const raw = (
    Object.keys(MODEL.weights) as (keyof typeof MODEL.weights)[]
  ).reduce((sum, k) => sum + MODEL.weights[k] * norm[k], 0);
  const a = inputs.n / (inputs.n + 8);
  const final = a * raw + (1 - a) * MODEL.prior;

  const tierLabel =
    a < 0.45
      ? "Low confidence"
      : a < 0.62
        ? "Moderate"
        : a < 0.74
          ? "Strong"
          : "Very strong";
  const tierLive = a >= 0.45;

  return (
    <DemoShell
      title={
        <>
          <Dot variant="live" size="sm" />
          Try the model
        </>
      }
      action={
        <button
          type="button"
          onClick={() => setInputs(MODEL.defaults)}
          className="inline-flex items-center justify-center gap-[0.55rem] rounded-[2px] border border-rule bg-surface px-[0.75rem] py-[0.45rem] font-mono text-[0.6875rem] tracking-[0.1em] text-ink-mid uppercase transition-colors duration-150 hover:border-accent hover:bg-raise hover:text-ink"
        >
          Reset
        </button>
      }
      note="Interactive illustration of the real scoring logic — the ten-component composite and the sample-size shrinkage are the mechanism I built; the inputs here are yours to move, not live MLB data."
    >
      <div className="grid grid-cols-1 gap-7 min-[701px]:grid-cols-2 min-[701px]:gap-x-8 min-[701px]:gap-y-6">
        <div className="flex flex-col gap-[0.9rem]">
          <SliderRow
            id="m-era"
            label="Starter — 1st-inning ERA"
            valueLabel={(inputs.era / 100).toFixed(2)}
            min={0}
            max={900}
            value={inputs.era}
            onChange={(v) => setField("era", v)}
          />
          <SliderRow
            id="m-obp"
            label="Top-of-order OBP"
            valueLabel={"." + inputs.obp}
            min={250}
            max={420}
            value={inputs.obp}
            onChange={(v) => setField("obp", v)}
          />
          <SliderRow
            id="m-opp"
            label="Opponent quality"
            valueLabel={band(inputs.opp, [
              [20, "Weak"],
              [40, "Below avg"],
              [60, "Average"],
              [80, "Strong"],
              [101, "Elite"],
            ])}
            min={0}
            max={100}
            value={inputs.opp}
            onChange={(v) => setField("opp", v)}
          />
          <SliderRow
            id="m-park"
            label="Park factor"
            valueLabel={(inputs.park / 100).toFixed(2)}
            min={85}
            max={120}
            value={inputs.park}
            onChange={(v) => setField("park", v)}
          />
          <SliderRow
            id="m-wx"
            label="Weather"
            valueLabel={band(inputs.wx, [
              [25, "Cold, wind in"],
              [45, "Cool"],
              [56, "Neutral"],
              [76, "Warm"],
              [101, "Hot, wind out"],
            ])}
            min={0}
            max={100}
            value={inputs.wx}
            onChange={(v) => setField("wx", v)}
          />
          <SliderRow
            id="m-type"
            label="Pitcher type"
            valueLabel={band(inputs.type, [
              [25, "Strikeout"],
              [45, "Power-lean"],
              [56, "Balanced"],
              [76, "Contact-lean"],
              [101, "Contact"],
            ])}
            min={0}
            max={100}
            value={inputs.type}
            onChange={(v) => setField("type", v)}
          />
          <SliderRow
            id="m-n"
            label="Current-season sample"
            valueLabel={`${inputs.n} GP`}
            min={1}
            max={32}
            value={inputs.n}
            onChange={(v) => setField("n", v)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div className="font-mono text-[3.5rem] leading-[0.9] font-semibold tracking-[-0.05em] text-accent tabular-nums">
                {Math.round(final)}
                <span className="text-[1.125rem] tracking-normal text-ink-dim">
                  /100
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-2 rounded-[2px] border px-[0.6rem] py-[0.3rem] font-mono text-[0.6875rem] font-medium tracking-[0.11em] whitespace-nowrap uppercase ${
                  tierLive
                    ? "border-accent-line bg-accent-soft text-accent"
                    : "border-rule text-ink-dim"
                }`}
              >
                <Dot variant={tierLive ? "live" : "neutral"} />
                {tierLabel}
              </span>
            </div>
            <div
              role="img"
              aria-label="Composite score meter"
              className="relative h-[6px] overflow-hidden rounded-[3px] bg-track"
            >
              <div
                className="h-full rounded-[3px] bg-accent transition-[width] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)]"
                style={{ width: `${final}%` }}
              />
            </div>
            <div className="mt-[0.3rem] flex justify-between font-mono text-[0.625rem] text-ink-dim tabular-nums">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>

          <p className="font-mono text-[0.7188rem] leading-[1.6] text-ink-mid">
            Raw composite{" "}
            <b className="font-medium text-ink tabular-nums">
              {raw.toFixed(1)}
            </b>{" "}
            · shrunk toward the league baseline of {MODEL.prior} at{" "}
            <b className="font-medium text-ink tabular-nums">
              {Math.round(a * 100)}%
            </b>{" "}
            current season /{" "}
            <b className="font-medium text-ink tabular-nums">
              {Math.round((1 - a) * 100)}%
            </b>{" "}
            prior.
          </p>

          <div className="flex flex-col gap-[0.42rem]">
            <div className="mb-[0.15rem] font-mono text-label text-ink-dim uppercase">
              Component contribution
            </div>
            {CONTRIB_ROWS.map(({ key, label }) => (
              <div
                key={key}
                className="grid grid-cols-[8.5rem_1fr_2.6rem] items-center gap-[0.6rem] font-mono text-[0.6875rem] text-ink-dim max-[420px]:grid-cols-[6.6rem_1fr_2.4rem] max-[420px]:text-[0.625rem]"
              >
                <span>{label}</span>
                <span className="h-1 overflow-hidden rounded-[2px] bg-track">
                  <span
                    className="block h-full rounded-[2px] bg-accent opacity-75 transition-[width] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)]"
                    style={{
                      width: `${Math.max(0, Math.min(100, norm[key] * 100))}%`,
                    }}
                  />
                </span>
                <span className="text-right text-ink-mid tabular-nums">
                  {(MODEL.weights[key] * norm[key]).toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
