import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ScrollText } from "lucide-react";

import { ToolShell } from "@/components/ToolShell";
import { PROMPT_EXAMPLES } from "@/lib/prompts";

export const Route = createFileRoute("/prompts")({
  head: () => ({
    meta: [
      { title: "How WorkMate AI Uses Prompt Engineering | WorkMate AI" },
      {
        name: "description",
        content:
          "See the structured prompts behind WorkMate AI: Role, Context, Task, Constraints and Output Format, and why they improve results.",
      },
      { property: "og:title", content: "How WorkMate AI Uses Prompt Engineering" },
      { property: "og:description", content: "Role + Context + Task + Constraints + Output Format, with real examples." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PromptsPage,
});

const STRUCTURE = [
  { label: "Role", text: "Tells the model who it should be, which sets vocabulary, tone and expertise." },
  { label: "Context", text: "Supplies the user's situation and inputs so the answer is specific, not generic." },
  { label: "Task", text: "States exactly one job to complete, with no ambiguity about the deliverable." },
  { label: "Constraints", text: "Sets the rules: no invented facts, mark missing details as \"Not specified\", stay professional." },
  { label: "Output Format", text: "Defines the exact headings, tables and ordering so output can be displayed reliably." },
];

const BENEFITS = [
  "Clear instructions reduce vague, off-topic or padded answers.",
  "Context makes the output specific to the user's actual situation.",
  "Constraints reduce hallucination by forbidding invented facts, names and dates.",
  "A fixed output format makes results consistent, comparable and easy to render in the interface.",
  "Reusable prompt templates mean every user gets the same professional quality.",
];

function PromptsPage() {
  return (
    <ToolShell
      icon={ScrollText}
      title="How WorkMate AI Uses Prompt Engineering"
      description="Every feature in WorkMate AI is powered by a structured prompt template rather than a free-form question. Here are the templates and the reasoning behind them."
    >
      <section className="card-surface p-5 sm:p-6">
        <h2 className="text-lg font-bold">The prompt structure</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Role + Context + Task + Constraints + Output Format
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {STRUCTURE.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-secondary/40 p-4">
              <p className="font-display text-sm font-bold text-primary">{s.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold">Live examples from the application</h2>
        {PROMPT_EXAMPLES.map((example) => (
          <article key={example.id} className="card-surface overflow-hidden">
            <header className="border-b border-border bg-secondary/60 px-5 py-3">
              <h3 className="text-sm font-semibold">{example.title}</h3>
            </header>
            <div className="divide-y divide-border">
              {example.parts.map((part) => (
                <div key={part.label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[130px_1fr] sm:gap-4">
                  <p className="font-display text-xs font-bold tracking-wide text-primary uppercase">{part.label}</p>
                  <p className="font-mono text-[13px] leading-relaxed text-foreground">“{part.text}”</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="card-surface p-5 sm:p-6">
        <h2 className="text-lg font-bold">Why structured prompts improve AI output</h2>
        <ul className="mt-4 space-y-2.5">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      </section>
    </ToolShell>
  );
}
