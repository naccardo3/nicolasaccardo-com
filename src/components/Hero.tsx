import Dot from "@/components/Dot";

export default function Hero() {
  return (
    <div className="wrap">
      <div className="pt-[clamp(3.25rem,10vw,5.75rem)] pb-[clamp(1rem,2vw,1.5rem)]">
        <div className="mb-[1.9rem] inline-flex items-center gap-[0.55rem] font-mono text-[0.7188rem] tracking-[0.11em] text-ink-dim uppercase">
          <Dot variant="live" />
          Open to software engineering roles
        </div>

        <h1 className="mb-[1.6rem] font-mono text-hero text-balance">
          I build software that ends&nbsp;up running somewhere.
        </h1>

        <p className="mb-[1.1rem] max-w-measure text-[clamp(1.0625rem,1.9vw,1.1875rem)] text-ink-mid">
          On a wall-mounted screen in a Bronx field office. On a cron schedule,
          every three minutes, noon to midnight. On a technician&apos;s laptop
          as a one-click installer that never touches the network.
        </p>
        <p className="max-w-measure text-[clamp(1.0625rem,1.9vw,1.1875rem)] text-ink-mid">
          <strong className="font-medium text-ink">Software engineer</strong>,
          B.E. from Stevens Institute of Technology. I scope problems by talking
          to the people doing the work, build the thing, and make sure someone
          else can own it after me. Almost everything below I designed, built,
          and deployed alone — and three of them you can operate right here on
          this page.
        </p>
      </div>
    </div>
  );
}
