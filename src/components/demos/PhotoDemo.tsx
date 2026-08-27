import DemoShell from "@/components/demos/DemoShell";

// Placeholder shell — Phase 5 ports the real OCR-restamp sequence (scan
// sweep, detection box, step log) into this body.
export default function PhotoDemo() {
  return (
    <DemoShell
      title="Run the pipeline"
      note="Illustration of the OCR-and-restamp pipeline on a stand-in image. The real tool batches a ZIP of photos at a time and falls back to EXIF metadata when OCR can't read the stamp."
    >
      <p className="font-mono text-spec text-ink-dim">
        Interactive demo — arriving in Phase 5.
      </p>
    </DemoShell>
  );
}
