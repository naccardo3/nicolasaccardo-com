export default function SectionHead({
  title,
  count,
  countKey,
}: {
  title: string;
  count?: number;
  countKey?: string;
}) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <h2 className="flex-none font-mono text-eyebrow uppercase text-ink-dim">
        {title}
      </h2>
      <span className="h-px flex-1 bg-rule" />
      {count !== undefined && (
        <span
          data-count={countKey}
          className="flex-none font-mono text-xs text-ink-dim tabular-nums"
        >
          {String(count).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
