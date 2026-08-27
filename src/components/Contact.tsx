import CopyEmailButton from "@/components/CopyEmailButton";
import Reveal from "@/components/Reveal";

const EMAIL = "naccardo42@gmail.com";

const BTN =
  "inline-flex items-center justify-center gap-[0.55rem] rounded-[2px] border border-rule bg-surface px-4 py-[0.62rem] font-mono text-xs tracking-[0.1em] text-ink-mid uppercase transition-colors duration-150 hover:border-accent hover:bg-raise hover:text-ink";

const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-[0.55rem] rounded-[2px] border border-accent-line bg-accent-soft px-4 py-[0.62rem] font-mono text-xs tracking-[0.1em] text-accent uppercase transition-colors duration-150 hover:border-accent hover:bg-accent-soft hover:text-accent";

export default function Contact() {
  return (
    <Reveal>
      <div className="mb-7 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-block font-mono text-[clamp(1.15rem,3.6vw,1.7rem)] font-medium tracking-[-0.02em] break-all"
        >
          {EMAIL}
        </a>
        <CopyEmailButton email={EMAIL} />
      </div>
      <div className="flex flex-wrap gap-[0.65rem]">
        <a
          href="/Nicolas_Accardo_Resume.pdf"
          target="_blank"
          rel="noopener"
          className={BTN_PRIMARY}
        >
          Résumé — PDF
        </a>
        <a
          href="https://www.linkedin.com/in/nicolas-accardo-469912226/"
          target="_blank"
          rel="noopener"
          className={BTN}
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/naccardo3"
          target="_blank"
          rel="noopener"
          className={BTN}
        >
          GitHub
        </a>
        <a href="tel:+15166667723" className={BTN}>
          (516) 666-7723
        </a>
      </div>
    </Reveal>
  );
}
