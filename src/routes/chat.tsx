import { createFileRoute } from "@tanstack/react-router";
import { BotMessageSquare, Info, SendHorizontal, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { ToolShell } from "@/components/ToolShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { callAI } from "@/lib/ai";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "WorkMate Assistant — AI Workplace Chatbot | WorkMate AI" },
      {
        name: "description",
        content: "Chat with WorkMate Assistant for help with meetings, messages, prioritisation and workflow improvements.",
      },
      { property: "og:title", content: "WorkMate Assistant — AI Workplace Chatbot" },
      { property: "og:description", content: "A professional workplace assistant for everyday productivity questions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatTool,
});

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "workmate.chat.v1";

const SUGGESTIONS = [
  "Help me prepare for a meeting.",
  "Write a professional follow-up message.",
  "Help me prioritise these tasks.",
  "Summarise this information.",
  "Give me ideas for improving my workflow.",
  "How should I prepare for a professional presentation?",
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hello — I'm **WorkMate Assistant**. I can help you prepare for meetings, draft professional messages, prioritise work and improve your workflow.\n\nAsk a question, or pick one of the suggestions below. I'll tell you whenever something needs to be verified.",
};

function ChatTool() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Msg[];
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text) {
      setError("Please provide information before generating a response.");
      return;
    }
    setError(null);
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await callAI({
        tool: "chat",
        messages: next.filter((m) => m !== WELCOME).map((m) => ({ role: m.role, content: m.content })),
      });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch {
      setError("We couldn't generate a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMessages([WELCOME]);
    setError(null);
    setInput("");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <ToolShell
      icon={BotMessageSquare}
      title="WorkMate Assistant"
      description="A professional workplace assistant for communication, meeting prep, prioritisation and workflow questions."
    >
      <div className="card-surface flex h-[65vh] min-h-[460px] flex-col overflow-hidden">
        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              {m.role === "user" ? (
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  {m.content}
                </p>
              ) : (
                <div className="max-w-[92%]">
                  <p className="mb-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    WorkMate Assistant
                  </p>
                  <div className="prose-result text-sm text-foreground">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading ? (
            <p className="animate-pulse text-sm font-medium text-muted-foreground">WorkMate AI is thinking...</p>
          ) : null}
          {error ? (
            <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {error}
            </p>
          ) : null}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border bg-secondary/50 px-4 py-4 sm:px-6">
          <div className="flex gap-2">
            <Textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Ask a workplace productivity question..."
              className="resize-none bg-card"
              aria-label="Message"
            />
            <div className="flex flex-col gap-2">
              <Button size="icon" aria-label="Send message" onClick={() => void send()} disabled={loading}>
                <SendHorizontal />
              </Button>
              <Button size="icon" variant="outline" aria-label="Clear conversation" onClick={clear} disabled={loading}>
                <Trash2 />
              </Button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                disabled={loading}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
        WorkMate Assistant has no internet access and cannot see your files or calendar. Verify anything important
        before acting on it, and avoid sharing confidential information.
      </p>
    </ToolShell>
  );
}
