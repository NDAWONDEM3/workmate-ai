import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange, Plus, Sparkles, Trash2, Wand2, X } from "lucide-react";
import { useState } from "react";

import { FieldError, Thinking, ToolShell } from "@/components/ToolShell";
import { ResultPanel } from "@/components/ResultPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { callAI } from "@/lib/ai";
import type { PlannerInput, PlannerTask } from "@/lib/prompts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | WorkMate AI" },
      {
        name: "description",
        content: "Enter your tasks and available hours and get a prioritised, realistic day-by-day work plan.",
      },
      { property: "og:title", content: "AI Task Planner | WorkMate AI" },
      { property: "og:description", content: "A daily schedule prioritised by urgency and importance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerTool,
});

const PRIORITIES = ["High", "Medium", "Low"] as const;
const PREFERENCES = ["Deadline first", "High priority first", "Quick wins first", "Balanced workload"];

const emptyTask = (): PlannerTask => ({ name: "", priority: "Medium", duration: "" });

const EMPTY: PlannerInput = {
  tasks: [emptyTask()],
  hours: "6",
  startDate: "",
  endDate: "",
  preference: "Deadline first",
};

const DEMO: PlannerInput = {
  tasks: [
    { name: "Complete project documentation", priority: "High", duration: "3 h" },
    { name: "Prepare presentation", priority: "Medium", duration: "2 h" },
    { name: "Review AI outputs", priority: "Medium", duration: "2 h" },
    { name: "Submit final project", priority: "High", duration: "1 h" },
  ],
  hours: "6",
  startDate: "2026-08-24",
  endDate: "2026-08-26",
  preference: "Deadline first",
};

const badgeStyles: Record<string, string> = {
  High: "bg-destructive/12 text-destructive",
  Medium: "bg-warning/25 text-foreground",
  Low: "bg-success/15 text-foreground",
};

function PlannerTool() {
  const [form, setForm] = useState<PlannerInput>(EMPTY);
  const [result, setResult] = useState<{ text: string; demo: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setTask = (index: number, patch: Partial<PlannerTask>) =>
    setForm((f) => ({ ...f, tasks: f.tasks.map((t, i) => (i === index ? { ...t, ...patch } : t)) }));

  const generate = async () => {
    const tasks = form.tasks.filter((t) => t.name.trim());
    if (tasks.length === 0) {
      setError("Please provide information before generating a response.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      setResult(await callAI({ tool: "planner", input: { ...form, tasks } }));
    } catch {
      setError("We couldn't generate a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setForm({ ...EMPTY, tasks: [emptyTask()] });
    setResult(null);
    setError(null);
  };

  return (
    <ToolShell
      icon={CalendarRange}
      title="AI Task Planner"
      description="List what needs doing, set your available hours, and WorkMate AI builds a prioritised daily schedule you can actually follow."
    >
      <div className="card-surface space-y-5 p-5 sm:p-6">
        <div className="space-y-3">
          <Label>Tasks</Label>
          {form.tasks.map((task, i) => (
            <div key={i} className="grid gap-3 rounded-xl border border-input p-3 sm:grid-cols-[1fr_150px_140px_auto]">
              <Input
                aria-label={`Task ${i + 1} name`}
                placeholder="Task name"
                value={task.name}
                onChange={(e) => setTask(i, { name: e.target.value })}
              />
              <div className="flex gap-1.5">
                {PRIORITIES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTask(i, { priority: p })}
                    className={cn(
                      "flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors",
                      task.priority === p ? badgeStyles[p] : "bg-secondary text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <Input
                aria-label={`Task ${i + 1} estimated duration`}
                placeholder="e.g. 2 h"
                value={task.duration}
                onChange={(e) => setTask(i, { duration: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove task ${i + 1}`}
                disabled={form.tasks.length === 1}
                onClick={() => setForm((f) => ({ ...f, tasks: f.tasks.filter((_, idx) => idx !== i) }))}
              >
                <X />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm((f) => ({ ...f, tasks: [...f.tasks, emptyTask()] }))}>
            <Plus /> Add task
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="hours">Available hours per day</Label>
            <Input id="hours" type="number" min="1" max="16" value={form.hours} onChange={(e) => setForm((f) => ({ ...f, hours: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="start">Start date</Label>
            <Input id="start" type="date" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end">End date</Label>
            <Input id="end" type="date" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pref">Priority preference</Label>
            <select
              id="pref"
              value={form.preference}
              onChange={(e) => setForm((f) => ({ ...f, preference: e.target.value }))}
              className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40"
            >
              {PREFERENCES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <FieldError message={error} />

        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={generate} disabled={loading}>
            <Wand2 /> {loading ? "Planning..." : "Generate Plan"}
          </Button>
          <Button variant="outline" onClick={() => setForm(DEMO)} disabled={loading}>
            <Sparkles /> Load Demo Example
          </Button>
          <Button variant="ghost" onClick={clear} disabled={loading}>
            <Trash2 /> Clear
          </Button>
        </div>
      </div>

      {loading ? <Thinking label="WorkMate AI is building your plan..." /> : null}

      {result && !loading ? (
        <ResultPanel title="Your prioritised plan" text={result.text} demo={result.demo} onRegenerate={generate} />
      ) : null}

      {!result && !loading ? (
        <div className="rounded-xl border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground">
          Your daily schedule will appear here.
        </div>
      ) : null}
    </ToolShell>
  );
}
