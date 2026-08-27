"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import DemoShell from "@/components/demos/DemoShell";

const STEPS: { at: number; key: string; label: ReactNode }[] = [
  { at: 0, key: "read", label: "▶ Reading photo_0412.jpg" },
  { at: 180, key: "ocr", label: "▶ EasyOCR scanning for stamp" },
  {
    at: 1250,
    key: "found",
    label: (
      <>
        <b className="font-medium text-accent">✓</b> Stamp region found
      </>
    ),
  },
  { at: 1500, key: "exif", label: "▶ EXIF fallback not needed" },
  { at: 1850, key: "render", label: "▶ Rendering replacement (Pillow)" },
  {
    at: 2400,
    key: "out",
    label: (
      <>
        <b className="font-medium text-accent">✓</b> 1 photo written, 0 failures
      </>
    ),
  },
];

const TOTAL_DURATION = 2600;

type Phase = "idle" | "running" | "done";
type Box = { left: number; top: number; width: number; height: number };

const BTN_BASE =
  "inline-flex items-center justify-center gap-[0.55rem] rounded-[2px] border px-[0.75rem] py-[0.45rem] font-mono text-[0.6875rem] tracking-[0.1em] uppercase transition-colors duration-150 disabled:cursor-default disabled:opacity-[.45]";
const BTN_PRIMARY =
  "border-accent-line bg-accent-soft text-accent hover:border-accent hover:bg-accent-soft hover:text-accent";
const BTN_NEUTRAL =
  "border-rule bg-surface text-ink-mid hover:border-accent hover:bg-raise hover:text-ink";

export default function PhotoDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [stepIndex, setStepIndex] = useState(-1);
  const [detectOn, setDetectOn] = useState(false);
  const [detectBox, setDetectBox] = useState<Box | null>(null);
  const [stampReplaced, setStampReplaced] = useState(false);
  const [stampFaded, setStampFaded] = useState(false);
  const [scanKey, setScanKey] = useState(0);

  const stampRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  useEffect(() => clearTimers, []);

  function measureBox() {
    const stampEl = stampRef.current;
    const photoEl = photoRef.current;
    if (!stampEl || !photoEl) return;
    const s = stampEl.getBoundingClientRect();
    const p = photoEl.getBoundingClientRect();
    setDetectBox({
      left: s.left - p.left - 3,
      top: s.top - p.top - 3,
      width: s.width + 6,
      height: s.height + 6,
    });
  }

  useEffect(() => {
    function onResize() {
      if (detectOn) measureBox();
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [detectOn]);

  function finishInstantly() {
    measureBox();
    setDetectOn(true);
    setStampReplaced(true);
    setStampFaded(false);
    setStepIndex(STEPS.length - 1);
    setPhase("done");
  }

  function resetDemo() {
    clearTimers();
    setDetectOn(false);
    setStampReplaced(false);
    setStampFaded(false);
    setStepIndex(-1);
    setPhase("idle");
  }

  function run() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      finishInstantly();
      return;
    }

    setPhase("running");
    setDetectOn(false);
    setStampReplaced(false);
    setStampFaded(false);
    setStepIndex(-1);
    setScanKey((k) => k + 1);

    STEPS.forEach((step, i) => {
      timers.current.push(
        setTimeout(() => {
          setStepIndex(i);
          if (step.key === "found") {
            measureBox();
            setDetectOn(true);
          }
          if (step.key === "render") {
            setStampFaded(true);
          }
          if (step.key === "out") {
            setStampReplaced(true);
            setStampFaded(false);
            requestAnimationFrame(measureBox);
          }
        }, step.at),
      );
    });

    timers.current.push(setTimeout(() => setPhase("done"), TOTAL_DURATION));
  }

  function handleClick() {
    if (phase === "running") return;
    if (phase === "done") {
      resetDemo();
      return;
    }
    run();
  }

  const buttonLabel =
    phase === "running"
      ? "Working…"
      : phase === "done"
        ? "Reset"
        : "Process photo";

  return (
    <DemoShell
      title="Run the pipeline"
      action={
        <button
          type="button"
          onClick={handleClick}
          disabled={phase === "running"}
          className={`${BTN_BASE} ${phase === "done" ? BTN_NEUTRAL : BTN_PRIMARY}`}
        >
          {buttonLabel}
        </button>
      }
      note="Illustration of the OCR-and-restamp pipeline on a stand-in image. The real tool batches a ZIP of photos at a time and falls back to EXIF metadata when OCR can't read the stamp."
    >
      <div className="grid grid-cols-1 items-center gap-[1.4rem] min-[641px]:grid-cols-[minmax(0,440px)_1fr]">
        <div
          ref={photoRef}
          style={{ background: "var(--photo-mock-gradient)" }}
          className="relative aspect-[3/2] overflow-hidden rounded-[3px] border border-rule-soft"
        >
          <svg
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
          >
            <rect x="0" y="0" width="300" height="200" fill="none" />
            <rect
              x="0"
              y="128"
              width="300"
              height="72"
              fill="rgba(0,0,0,.22)"
            />
            <path
              d="M0 128 L300 120 L300 128 L0 136 Z"
              fill="rgba(255,255,255,.10)"
            />
            <rect
              x="22"
              y="34"
              width="96"
              height="96"
              fill="rgba(255,255,255,.11)"
            />
            <rect
              x="22"
              y="34"
              width="96"
              height="10"
              fill="rgba(255,255,255,.16)"
            />
            <g fill="rgba(0,0,0,.30)">
              <rect x="32" y="54" width="16" height="18" />
              <rect x="56" y="54" width="16" height="18" />
              <rect x="80" y="54" width="16" height="18" />
              <rect x="32" y="82" width="16" height="18" />
              <rect x="56" y="82" width="16" height="18" />
              <rect x="80" y="82" width="16" height="18" />
            </g>
            <g stroke="rgba(255,255,255,.30)" strokeWidth="1.6" fill="none">
              <path d="M16 30 L16 132 M62 30 L62 132 M108 30 L108 132 M124 30 L124 132" />
              <path d="M12 62 L128 62 M12 96 L128 96 M12 30 L128 30" />
            </g>
            <rect
              x="150"
              y="72"
              width="58"
              height="58"
              fill="rgba(255,255,255,.09)"
            />
            <path d="M150 72 L179 56 L208 72 Z" fill="rgba(255,255,255,.15)" />
            <rect
              x="224"
              y="88"
              width="52"
              height="42"
              fill="rgba(255,255,255,.13)"
            />
            <g stroke="rgba(255,255,255,.22)" strokeWidth="1.4" fill="none">
              <path d="M224 100 L276 100" />
            </g>
            <rect
              x="150"
              y="118"
              width="126"
              height="12"
              fill="rgba(255,255,255,.18)"
            />
            <circle cx="256" cy="34" r="13" fill="rgba(255,255,255,.10)" />
          </svg>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-[2px] border border-accent transition-opacity duration-200"
            style={{
              opacity: detectOn ? 1 : 0,
              left: detectBox?.left ?? 0,
              top: detectBox?.top ?? 0,
              width: detectBox?.width ?? 0,
              height: detectBox?.height ?? 0,
              right: "auto",
              bottom: "auto",
            }}
          />

          <div
            key={scanKey}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-accent opacity-0 shadow-[0_0_12px_2px_var(--accent)] ${
              phase === "running" ? "animate-scan-sweep" : ""
            }`}
          />

          <div
            ref={stampRef}
            style={{ opacity: stampFaded ? 0 : 1 }}
            className="absolute right-2 bottom-2 rounded-[2px] bg-black/62 px-[0.45rem] py-[0.24rem] font-mono text-[0.625rem] leading-[1.35] tracking-[0.03em] whitespace-nowrap text-white transition-opacity duration-[250ms]"
          >
            {stampReplaced ? (
              <>
                BX — 149TH ST
                <br />
                UNIT 4 · ABATEMENT
              </>
            ) : (
              <>03/14/2026&nbsp;&nbsp;09:41&nbsp;AM</>
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-[0.6rem]">
          <div
            role="status"
            aria-live="polite"
            className="min-h-[5.4rem] border-l border-rule pl-3 font-mono text-[0.6875rem] leading-[1.65] text-ink-dim"
          >
            {STEPS.map((step, i) => (
              <div
                key={step.key}
                className={i <= stepIndex ? "" : "opacity-[.45]"}
              >
                {step.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
