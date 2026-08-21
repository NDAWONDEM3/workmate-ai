import { createFileRoute } from "@tanstack/react-router";
import { Search, ShieldAlert, Sparkles, Trash2, Wand2 } from "lucide-react";
import { useState } from "react";

import { FieldError, Thinking, ToolShell } from "@/components/ToolShell";
import { ResultPanel } from "@/components/ResultPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { callAI } from "@/lib/ai";
import type { ResearchInput } from "@/lib/prompts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | WorkMate AI" },
      {
        name: "description",
        content: "Get a structured research briefing with a quick answer, key insights, recommendations and further questions.",
      },
      { property: "og:title", content: "AI Research Assistant | WorkMate AI" },
      { property: "og:description", content: "Quick, structured research support for workplace and academic questions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchTool,
});

const LENGTHS = ["Short", "Medium", "Detailed"];
const EMPTY: ResearchInput = { topic: "", question: "", length: "Medium" };
const DEMO: ResearchInput = {
  topic: "How AI improves workplace productivity",
  question: "Which everyday workplace tasks benefit most from AI assistance?",
  length: "Medium",
};

function ResearchTool() {
  const [form, setForm] = useState<ResearchInput>(EMPTY);
  const [result, setResult] = useState<{ text: string; demo: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!form.topic.trim()) {
      setError("Please provide information before generating a response.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      setResult(await callAI({ tool: "research", input: form }));
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
      icon={Search}
      title="AI Research Assistant"
      description="Fast, structured background on a workplace or academic topic — written from general knowledge, never from live browsing."
    >
      <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <p className="text-xs leading-relaxed text-foreground sm:text-sm">
          AI-generated research should be verified against reliable sources before being used in academic, professional
          or business decisions. WorkMate AI does not browse the internet and will not produce citations or sources.
        </p>
      </div>

      <div className="card-surface space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <Label htmlFor="topic">Research topic</Label>
          <Input
            id="topic"
            value={form.topic}
            onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
            placeholder="e.g. How AI improves workplace productivity"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="question">Question (optional)</Label>
          <Textarea
            id="question"
            rows={3}
            value={form.question}
            onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
            placeholder="What specifically do you want to understand?"
          />
        </div>

        <div className="space-y-2">
          <Label>Desired response length</Label>
          <div className="flex gap-2">
            {LENGTHS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setForm((f) => ({ ...f, length: l }))}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                  form.length === l
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <FieldError message={error} />

        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={generate} disabled={loading}>
            <Wand2 /> {loading ? "Researching..." : "Research Topic"}
          </Button>
          <Button variant="outline" onClick={() => setForm(DEMO)} disabled={loading}>
            <Sparkles /> Load Demo Example
          </Button>
          <Button variant="ghost" onClick={clear} disabled={loading}>
            <Trash2 /> Clear
          </Button>
        </div>
      </div>

      {loading ? <Thinking label="WorkMate AI is researching..." /> : null}

      {result && !loading ? (
        <ResultPanel
          title="Research briefing"
          text={result.text}
          demo={result.demo}
          onRegenerate={generate}
          footer="AI-generated research should be verified against reliable sources before being used in academic, professional or business decisions."
        />
      ) : null}

      {!result && !loading ? (
        <div className="rounded-xl border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground">
          Your structured research briefing will appear here.
        </div>
      ) : null}
    </ToolShell>
  );
}
