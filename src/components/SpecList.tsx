import { Fragment } from "react";

export default function SpecList({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="mb-6 grid grid-cols-1 gap-x-6 gap-y-[0.4rem] rounded-[3px] border border-rule-soft bg-surface px-[1.05rem] py-[0.9rem] font-mono text-spec leading-[1.5] shadow-panel min-[521px]:grid-cols-[auto_1fr]">
      {items.map((item) => (
        <Fragment key={item.label}>
          <dt className="pt-[0.15rem] text-[0.6875rem] tracking-[0.1em] text-ink-dim uppercase">
            {item.label}
          </dt>
          <dd className="mb-[0.55rem] text-ink-mid last:mb-0 min-[521px]:mb-0">
            {item.value}
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}
