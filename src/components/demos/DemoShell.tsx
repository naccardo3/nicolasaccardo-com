import type { ReactNode } from "react";

export default function DemoShell({
  title,
  action,
  note,
  children,
}: {
  title: ReactNode;
  action?: ReactNode;
  note: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="my-[1.6rem] mb-[0.35rem] overflow-hidden rounded-[4px] border border-rule bg-surface shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-soft bg-raise px-[0.95rem] py-[0.6rem]">
        <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.13em] text-ink-mid uppercase">
          {title}
        </span>
        {action}
      </div>
      <div className="px-[0.95rem] pt-[1.15rem] pb-[1.25rem]">{children}</div>
      <p className="border-t border-rule-soft bg-raise px-[0.95rem] py-[0.6rem] font-mono text-[0.6875rem] leading-[1.5] text-ink-dim">
        {note}
      </p>
    </div>
  );
}
