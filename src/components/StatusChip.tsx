import Dot from "@/components/Dot";
import type { Status } from "@/content/projects";

const STATUS: Record<
  Status,
  { label: string; variant: "live" | "build" | "neutral" }
> = {
  running: { label: "Running", variant: "live" },
  production: { label: "In production", variant: "live" },
  live: { label: "Live", variant: "live" },
  shipped: { label: "Shipped", variant: "neutral" },
  building: { label: "Building", variant: "build" },
};

const VARIANT_STYLE: Record<"live" | "build" | "neutral", string> = {
  live: "border-accent-line bg-accent-soft text-accent",
  build: "border-amber-line bg-amber-soft text-amber",
  neutral: "border-rule text-ink-dim",
};

export default function StatusChip({ status }: { status: Status }) {
  const { label, variant } = STATUS[status];

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-[2px] border px-[0.6rem] py-[0.3rem] font-mono text-[0.6875rem] font-medium tracking-[0.11em] uppercase ${VARIANT_STYLE[variant]}`}
    >
      <Dot variant={variant} />
      {label}
    </span>
  );
}
