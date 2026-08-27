import Reveal from "@/components/Reveal";

const ROLES = [
  {
    when: "2025 — Present",
    title: "Software Developer, Internal Tools",
    org: "Empire Control Abatement, Inc. · Bronx, NY",
    body: "Sole developer inside a field-operations company — I scope workflow problems directly with office staff and crews, build the tooling, and hand it off. Beyond the two projects above: automated certified-payroll generation and the posting of fully-burdened labor costs into Procore budgets, and built a document-merge integration with check-out/check-in version control and a shared lock ledger to keep two people from overwriting each other.",
  },
  {
    when: "2024 — 2025",
    title: "Systems Engineering, Part Time",
    org: "Axiom Analytics · Miami Beach, FL",
    body: "Built ERP interface and front-end components in Microsoft Dynamics and integrated data sources across an Azure DevOps environment.",
  },
  {
    when: "2025 — Present",
    title: "Assistant Manager",
    org: "Sansone Market · Garden City Park, NY",
    body: "Led the onboarding of a new POS and inventory system and trained the staff to run it — good practice at reading a non-technical room and noticing when an explanation isn't landing.",
  },
  {
    when: "May 2025",
    title: "B.E., Software Engineering",
    org: "Stevens Institute of Technology · GPA 3.50",
    body: "Coursework in DevOps principles and practices, software testing, data mining and applied machine learning, requirements analysis, and agile methods. Dean's List, five semesters. Edwin A. Stevens Scholarship.",
  },
];

export default function RoleList() {
  return (
    <Reveal className="flex flex-col">
      {ROLES.map((role) => (
        <div
          key={role.title}
          className="grid grid-cols-1 gap-x-7 gap-y-[0.35rem] border-t border-rule-soft py-[1.4rem] first:border-t-0 first:pt-0 min-[601px]:grid-cols-[9.5rem_1fr] min-[601px]:gap-y-0"
        >
          <div className="pt-0 font-mono text-[0.8125rem] text-ink-dim tabular-nums min-[601px]:pt-[0.2rem]">
            {role.when}
          </div>
          <div>
            <h3 className="mb-[0.1rem] text-[1.0625rem] font-semibold tracking-[-0.005em]">
              {role.title}
            </h3>
            <p className="mb-2 font-mono text-[0.8125rem] text-ink-dim">
              {role.org}
            </p>
            <p className="max-w-measure text-[0.9688rem] text-ink-mid">
              {role.body}
            </p>
          </div>
        </div>
      ))}
    </Reveal>
  );
}
