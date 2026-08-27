import Dot from "@/components/Dot";
import DemoShell from "@/components/demos/DemoShell";

// Placeholder shell — Phase 5 ports the real scoring widget (sliders,
// component-contribution bars, shrinkage blend readout) into this body.
export default function ModelDemo() {
  return (
    <DemoShell
      title={
        <>
          <Dot variant="live" size="sm" />
          Try the model
        </>
      }
      note="Interactive illustration of the real scoring logic — the ten-component composite and the sample-size shrinkage are the mechanism I built; the inputs here are yours to move, not live MLB data."
    >
      <p className="font-mono text-spec text-ink-dim">
        Interactive demo — arriving in Phase 5.
      </p>
    </DemoShell>
  );
}
