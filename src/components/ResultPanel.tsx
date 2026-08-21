import { Check, Copy, Info, RefreshCw, Sparkle } from "lucide-react";
import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface ResultPanelProps {
  title: string;
  text: string;
  demo?: boolean;
  onRegenerate?: () => void;
  regenerating?: boolean;
  footer?: ReactNode;
}

export function ResultPanel({
  title,
  text,
  demo,
  onRegenerate,
  regenerating,
  footer,
}: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copying isn't available in this browser");
    }
  };

  return (
    <section className="card-surface animate-in fade-in slide-in-from-bottom-2 overflow-hidden duration-500">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/60 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Sparkle className="size-4 text-accent" aria-hidden />
          <h2 className="text-sm font-semibold">{title}</h2>
          {demo ? (
            <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[11px] font-semibold text-foreground">
              Demonstration output
            </span>
          ) : null}
        </div>
        <div className="flex gap-2">
          {onRegenerate ? (
            <Button variant="outline" size="sm" onClick={onRegenerate} disabled={regenerating}>
              <RefreshCw className={regenerating ? "animate-spin" : ""} />
              Regenerate
            </Button>
          ) : null}
          <Button size="sm" onClick={copy}>
            {copied ? <Check /> : <Copy />}
            Copy
          </Button>
        </div>
      </header>

      <div className="prose-result px-5 py-5 text-sm text-foreground">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>

      <footer className="flex items-start gap-2 border-t border-border bg-muted/50 px-5 py-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
        <p>{footer ?? "AI assists your work. You remain responsible for reviewing the final output."}</p>
      </footer>
    </section>
  );
}
