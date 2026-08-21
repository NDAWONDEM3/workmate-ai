import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ToolShellProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}

export function ToolShell({ icon: Icon, title, description, children }: ToolShellProps) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <header className="flex items-start gap-4">
        <span className="bg-hero-gradient grid size-11 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-card)]">
          <Icon className="size-5" aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
      </header>
      {children}
    </div>
  );
}

export function Thinking({ label = "WorkMate AI is thinking..." }: { label?: string }) {
  return (
    <div className="card-surface flex items-center gap-3 px-5 py-6">
      <span className="relative flex size-3">
        <span className="absolute inline-flex size-3 animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative inline-flex size-3 rounded-full bg-accent" />
      </span>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

export function FieldError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
      {message}
    </p>
  );
}
