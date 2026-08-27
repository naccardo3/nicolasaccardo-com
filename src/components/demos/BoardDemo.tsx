import DemoShell from "@/components/demos/DemoShell";

// Placeholder shell — Phase 5 ports the real crew board (Apps Script vs
// CSV export toggle, strikethrough preservation) into this body.
export default function BoardDemo() {
  return (
    <DemoShell
      title="Read the sheet with…"
      note="The office marks a mid-week reassignment by striking through the old site. Flip the backend to see what a plain CSV export does to that."
    >
      <p className="font-mono text-spec text-ink-dim">
        Interactive demo — arriving in Phase 5.
      </p>
    </DemoShell>
  );
}
