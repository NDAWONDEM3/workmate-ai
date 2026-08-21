import { createFileRoute } from "@tanstack/react-router";
import { Mail, Sparkles, Trash2, Wand2 } from "lucide-react";
import { useState } from "react";

import { FieldError, Thinking, ToolShell } from "@/components/ToolShell";
import { ResultPanel } from "@/components/ResultPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { callAI } from "@/lib/ai";
import type { EmailInput } from "@/lib/prompts";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | WorkMate AI" },
      {
        name: "description",
        content: "Generate professional workplace emails with the right tone, subject line and structure in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator | WorkMate AI" },
      { property: "og:description", content: "Turn a few notes into a polished, ready-to-send professional email." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailTool,
});

const RECIPIENTS = ["Client", "Manager", "Team Member", "Lecturer", "Supplier", "Other"];
const PURPOSES = ["Request", "Follow-up", "Complaint", "Meeting", "Thank you", "Application", "General"];
const TONES = ["Formal", "Professional", "Friendly", "Persuasive"];

const EMPTY: EmailInput = { recipient: "Manager", purpose: "Follow-up", tone: "Professional", message: "" };

const DEMO: EmailInput = {
  recipient: "Manager",
  purpose: "Follow-up",
  tone: "Professional",
  message: "Follow up with my manager regarding the status of my internship application.",
};

function Select({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function EmailTool() {
  const [form, setForm] = useState<EmailInput>(EMPTY);
  const [result, setResult] = useState<{ text: string; demo: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<EmailInput>) => setForm((f) => ({ ...f, ...patch }));

  const generate = async () => {
    if (!form.message.trim()) {
      setError("Please provide information before generating a response.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      setResult(await callAI({ tool: "email", input: form }));
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
      icon={Mail}
      title="Smart Email Generator"
      description="Describe what you need to say. WorkMate AI writes a structured, professional email using only the details you provide."
    >
      <div className="card-surface space-y-5 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Select id="recipient" label="Recipient type" value={form.recipient} options={RECIPIENTS} onChange={(v) => set({ recipient: v })} />
          <Select id="purpose" label="Purpose" value={form.purpose} options={PURPOSES} onChange={(v) => set({ purpose: v })} />
          <Select id="tone" label="Tone" value={form.tone} options={TONES} onChange={(v) => set({ tone: v })} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Key information / message</Label>
          <Textarea
            id="message"
            rows={5}
            placeholder="e.g. Follow up with my manager regarding the status of my internship application."
            value={form.message}
            onChange={(e) => set({ message: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Only the details you enter are used — WorkMate AI will not invent facts, dates or commitments.
          </p>
        </div>

        <FieldError message={error} />

        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={generate} disabled={loading}>
            <Wand2 /> {loading ? "Generating..." : "Generate Email"}
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
        <ResultPanel title="Generated email" text={result.text} demo={result.demo} onRegenerate={generate} />
      ) : null}

      {!result && !loading ? (
        <div className="rounded-xl border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground">
          Your generated email will appear here.
        </div>
      ) : null}

      <div className="grid gap-2 rounded-xl border border-input bg-card p-4">
        <p className="text-sm font-semibold">Input helper</p>
        <Label htmlFor="hint" className="sr-only">
          Hint
        </Label>
        <Input
          id="hint"
          readOnly
          value="Tip: include names, dates and reference numbers you want the email to mention."
          className="text-xs text-muted-foreground"
        />
      </div>
    </ToolShell>
  );
}
