import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Info, Scale, ShieldCheck, UserCheck } from "lucide-react";

import { ToolShell } from "@/components/ToolShell";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI | WorkMate AI" },
      {
        name: "description",
        content: "AI limitations, bias awareness and human verification guidance for using WorkMate AI responsibly at work.",
      },
      { property: "og:title", content: "Responsible AI | WorkMate AI" },
      { property: "og:description", content: "AI assists your work. You remain responsible for reviewing the final output." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResponsibleAiPage,
});

const LIMITATIONS = [
  "AI-generated content may contain errors.",
  "Users should verify important information.",
  "AI should not replace professional judgement.",
  "Users should avoid entering confidential information.",
  "Research outputs should be checked against reliable sources.",
];

function ResponsibleAiPage() {
  return (
    <ToolShell
      icon={ShieldCheck}
      title="Responsible AI"
      description="WorkMate AI is designed to assist professional work, not to make decisions on your behalf. These principles apply to every tool in the application."
    >
      <section className="card-surface p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="size-5 text-warning" aria-hidden />
          <h2 className="text-lg font-bold">AI Limitations</h2>
        </div>
        <ul className="mt-4 space-y-2.5">
          {LIMITATIONS.map((l) => (
            <li key={l} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              {l}
            </li>
          ))}
        </ul>
      </section>

      <section className="card-surface p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <Scale className="size-5 text-primary" aria-hidden />
          <h2 className="text-lg font-bold">Bias Awareness</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          AI outputs may reflect biases present in training data or user-provided information. Review outputs before
          using them in important decisions.
        </p>
      </section>

      <section className="bg-hero-gradient rounded-2xl px-6 py-8 text-primary-foreground">
        <div className="flex items-start gap-3">
          <UserCheck className="mt-0.5 size-6 shrink-0" aria-hidden />
          <div>
            <h2 className="text-lg font-bold">Human Verification</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/90">
              AI assists your work. You remain responsible for reviewing the final output. Check names, dates, figures
              and commitments before sending, submitting or acting on anything WorkMate AI produces.
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <p className="text-sm leading-relaxed text-foreground">
          WorkMate AI does not browse the internet, does not access your files, email or calendar, and never generates
          citations or sources. Nothing you enter is stored on a server — recent activity and preferences stay in your
          browser.
        </p>
      </section>

      <p className="text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        AI-assisted. Human-reviewed.
      </p>
    </ToolShell>
  );
}
