import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen, Sparkles, Trash2, Wand2 } from "lucide-react";
import { useState } from "react";

import { FieldError, Thinking, ToolShell } from "@/components/ToolShell";
import { ResultPanel } from "@/components/ResultPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { callAI } from "@/lib/ai";
import type { MeetingInput } from "@/lib/prompts";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | WorkMate AI" },
      {
        name: "description",
        content: "Turn raw meeting notes into a structured summary with key decisions, action items and important points.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | WorkMate AI" },
      { property: "og:description", content: "Structured minutes from messy notes — decisions, owners and deadlines." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeetingTool,
});

const EMPTY: MeetingInput = { title: "", date: "", participants: "", notes: "" };

const DEMO: MeetingInput = {
  title: "Project Progress Check-in",
  date: "2026-08-19",
  participants: "Thabo (project lead), Aisha (developer), Sipho (documentation)",
  notes: `Thabo opened by reviewing progress. The core build is complete and testing has started.
Aisha reported two outstanding bugs on the reporting screen, both minor.
Sipho said the project documentation is about 60% complete and needs the final architecture section.
Team agreed documentation must be finished before we rehearse the presentation.
Aisha will fix the reporting bugs by Wednesday.
Sipho will complete documentation by Friday.
Thabo will book a rehearsal slot, date still to be confirmed.
Deadline for final submission stays the 28th and cannot move.
Team noted the biggest risk is documentation, not the build.`,
};

function MeetingTool() {
  const [form, setForm] = useState<MeetingInput>(EMPTY);
  const [result, setResult] = useState<{ text: string; demo: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<MeetingInput>) => setForm((f) => ({ ...f, ...patch }));

  const generate = async () => {
    if (!form.notes.trim()) {
      setError("Please provide information before generating a response.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      setResult(await callAI({ tool: "meeting", input: form }));
    } catch {
      setError("We couldn't generate a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setForm(EMPTY);
    setResult(null);
    setError(null);
  };

  return (
    <ToolShell
      icon={NotebookPen}
      title="Meeting Notes Summarizer"
      description="Paste raw notes and get a professional summary, the decisions taken, action items with owners, and the points worth remembering."
    >
      <div className="card-surface space-y-5 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="title">Meeting title (optional)</Label>
            <Input id="title" value={form.title} onChange={(e) => set({ title: e.target.value })} placeholder="Weekly project check-in" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Meeting date (optional)</Label>
            <Input id="date" type="date" value={form.date} onChange={(e) => set({ date: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="participants">Participants (optional)</Label>
            <Input
              id="participants"
              value={form.participants}
              onChange={(e) => set({ participants: e.target.value })}
              placeholder="Names, comma separated"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Paste your meeting notes</Label>
          <Textarea
            id="notes"
            rows={10}
            value={form.notes}
            onChange={(e) => set({ notes: e.target.value })}
            placeholder="Paste rough notes, bullet points or a transcript..."
          />
          <p className="text-xs text-muted-foreground">
            Missing owners or deadlines are marked “Not specified” — nothing is invented.
          </p>
        </div>

        <FieldError message={error} />

        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={generate} disabled={loading}>
            <Wand2 /> {loading ? "Summarizing..." : "Summarize Meeting"}
          </Button>
          <Button variant="outline" onClick={() => setForm(DEMO)} disabled={loading}>
            <Sparkles /> Load Demo Example
          </Button>
          <Button variant="ghost" onClick={clear} disabled={loading}>
            <Trash2 /> Clear
          </Button>
        </div>
      </div>

      {loading ? <Thinking /> : null}

      {result && !loading ? (
        <ResultPanel title="Meeting summary" text={result.text} demo={result.demo} onRegenerate={generate} />
      ) : null}

      {!result && !loading ? (
        <div className="rounded-xl border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground">
          Your structured summary will appear here.
        </div>
      ) : null}
    </ToolShell>
  );
}
