import ScrollProgress from "@/components/ScrollProgress";
import ThemeToggle from "@/components/ThemeToggle";

const NAV = [
  { href: "#work", label: "Work", key: "work" },
  { href: "#experience", label: "Experience", key: "experience" },
  { href: "#contact", label: "Contact", key: "contact" },
];

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule-soft bg-[color-mix(in_srgb,var(--ground)_88%,transparent)] backdrop-blur-[10px]">
      <div className="wrap flex h-[54px] items-center justify-between gap-4">
        <a
          href="#top"
          className="border-b-0 font-mono text-[0.8125rem] font-semibold tracking-[0.14em] text-ink uppercase hover:text-accent"
        >
          Nicolas&nbsp;Accardo
        </a>
        <div className="flex items-center gap-[1.35rem] max-sm:gap-4">
          <nav className="flex gap-[1.35rem] max-sm:gap-4">
            {NAV.map((item, i) => (
              <a
                key={item.key}
                href={item.href}
                data-nav={item.key}
                className={`relative border-b-0 pb-0.5 font-mono text-xs tracking-[0.1em] text-ink-dim uppercase after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-[220ms] after:content-[''] hover:text-ink aria-[current=true]:text-ink aria-[current=true]:after:scale-x-100 ${i === 1 ? "max-sm:hidden" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
