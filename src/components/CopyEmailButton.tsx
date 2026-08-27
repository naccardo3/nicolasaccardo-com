"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy");
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function markDone() {
    setLabel("Copied");
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLabel("Copy");
      setDone(false);
    }, 1800);
  }

  async function handleClick() {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        markDone();
      } catch {
        setLabel("Select it");
      }
      return;
    }
    const ta = document.createElement("textarea");
    ta.value = email;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      markDone();
    } catch {
      setLabel("Select it");
    }
    document.body.removeChild(ta);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      data-done={done || undefined}
      className="rounded-[2px] border border-rule bg-surface px-[0.65rem] py-[0.4rem] font-mono text-[0.6875rem] tracking-[0.1em] text-ink-dim uppercase transition-colors duration-150 hover:border-accent-line hover:text-accent data-[done]:border-accent-line data-[done]:bg-accent-soft data-[done]:text-accent"
    >
      {label}
    </button>
  );
}
