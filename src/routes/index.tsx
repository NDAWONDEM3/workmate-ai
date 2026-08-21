import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BotMessageSquare,
  CalendarRange,
  CheckCircle2,
  Clock,
  Info,
  Mail,
  NotebookPen,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatSaved, readStats, type Stats } from "@/lib/stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkMate AI — Intelligent Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "WorkMate AI helps you write, summarise, plan, research and solve workplace tasks using AI. Five AI tools in one clean dashboard.",
      },
      { property: "og:title", content: "WorkMate AI — Intelligent Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Write, summarise, plan and research workplace tasks faster with AI. Work smarter. Communicate better. Plan faster.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const FEATURES = [
  {
    to: "/email" as const,
    icon: Mail,
    name: "Smart Email Generator",
    description: "Turn a few notes into a polished, ready-to-send professional email in seconds.",
  },
  {
    to: "/meetings" as const,
    icon: NotebookPen,
    name: "Meeting Notes Summarizer",
    description: "Convert messy notes into a summary, decisions, action items and key points.",
  },
  {
    to: "/planner" as const,
    icon: CalendarRange,
    name: "AI Task Planner",
    description: "Build a realistic daily schedule prioritised by urgency and importance.",
  },
  {
    to: "/research" as const,
    icon: Search,
    name: "AI Research Assistant",
    description: "Get a structured briefing with insights, recommendations and next questions.",
  },
  {
    to: "/chat" as const,
    icon: BotMessageSquare,
    name: "AI Workplace Chatbot",
    description: "Ask WorkMate Assistant anything about workplace communication and productivity.",
  },
];

function useStats() {
  const [stats, setStats] = useState<Stats>({ actions: 0, minutesSaved: 0, tools: [] });
  useEffect(() => {
    const sync = () => setStats(readStats());
    sync();
    window.addEventListener("workmate-stats", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("workmate-stats", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return stats;
}

function Dashboard() {
  const stats = useStats();

  const metrics = [
    { label: "AI Actions", value: String(stats.actions), hint: "Completed AI generations", icon: CheckCircle2 },
    { label: "Estimated Time Saved", value: formatSaved(stats.minutesSaved), hint: "Based on completed actions", icon: Clock },
    { label: "Tools Used", value: `${stats.tools.length} / 5`, hint: "WorkMate AI features explored", icon: Wrench },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10">
      <section className="bg-hero-gradient relative overflow-hidden rounded-3xl px-6 py-10 text-primary-foreground sm:px-10 sm:py-14">
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            Work smarter. Communicate better. Plan faster.
          </span>
          <h1 className="mt-5 text-3xl font-extrabold sm:text-5xl">WorkMate AI</h1>
          <p className="mt-3 text-lg font-medium text-primary-foreground/90">
            Your intelligent workplace productivity assistant
          </p>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
            WorkMate AI helps you write, summarise, plan, research and solve workplace tasks using AI.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/email">
                Start with an email <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/chat">Ask WorkMate Assistant</Link>
            </Button>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -bottom-24 size-72 rounded-full bg-primary-foreground/10 blur-2xl"
        />
      </section>

      <section aria-labelledby="tools-heading" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="tools-heading" className="text-xl font-bold">
              AI workplace tools
            </h2>
            <p className="text-sm text-muted-foreground">Five focused tools for everyday professional tasks.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map(({ to, icon: Icon, name, description }) => (
            <article
              key={to}
              className="card-surface group flex flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-bold">{name}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <Button asChild variant="outline" className="mt-5 w-full justify-between">
                <Link to={to}>
                  Open Tool <ArrowRight />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="impact-heading" className="space-y-4">
        <div>
          <h2 id="impact-heading" className="text-xl font-bold">
            Your Productivity Impact
          </h2>
          <p className="text-sm text-muted-foreground">
            Stored privately in your browser — no account and no database required.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {metrics.map(({ label, value, hint, icon: Icon }) => (
            <div key={label} className="card-surface p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <Icon className="size-4 text-accent" aria-hidden />
              </div>
              <p className="mt-3 font-display text-3xl font-extrabold">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card-surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          <div>
            <h2 className="text-base font-bold">Responsible AI, built in</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Every output is a draft. Verify important information, avoid entering confidential details, and review
              content before you use it in academic, professional or business decisions.
            </p>
          </div>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link to="/responsible-ai">Read the guidance</Link>
        </Button>
      </section>

      <footer className="rounded-2xl bg-secondary px-6 py-8 text-center">
        <p className="mx-auto max-w-2xl text-sm font-medium text-secondary-foreground sm:text-base">
          WorkMate AI helps you spend less time on repetitive workplace tasks and more time on meaningful work.
        </p>
        <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          <Info className="size-3.5" aria-hidden /> AI-assisted. Human-reviewed.
        </p>
      </footer>
    </div>
  );
}
