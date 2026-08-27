type DotVariant = "neutral" | "live" | "build";

const DOT_COLOR: Record<DotVariant, string> = {
  neutral: "bg-ink-dim",
  live: "bg-accent",
  build: "bg-amber",
};

export default function Dot({
  variant = "neutral",
  size = "md",
}: {
  variant?: DotVariant;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "h-1.5 w-1.5" : "h-[7px] w-[7px]";

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex flex-none rounded-full ${sizeClass} ${DOT_COLOR[variant]}`}
    >
      {variant === "live" && (
        <span className="absolute -inset-1 animate-status-ping rounded-full border border-accent opacity-55" />
      )}
    </span>
  );
}
