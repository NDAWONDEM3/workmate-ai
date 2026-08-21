import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpenCheck,
  BotMessageSquare,
  CalendarRange,
  LayoutDashboard,
  Mail,
  Menu,
  NotebookPen,
  ScrollText,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meetings", label: "Meeting Summarizer", icon: NotebookPen },
  { to: "/planner", label: "Task Planner", icon: CalendarRange },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chatbot", icon: BotMessageSquare },
  { to: "/prompts", label: "Prompt Engineering", icon: ScrollText },
  { to: "/responsible-ai", label: "Responsible AI", icon: ShieldCheck },
] as const;

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30">
        <BookOpenCheck className="size-5" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-extrabold text-sidebar-foreground">WorkMate AI</span>
        {!compact ? (
          <span className="block text-[11px] text-sidebar-foreground/60">Work smarter. Plan faster.</span>
        ) : null}
      </span>
    </div>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="space-y-1">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0_0_var(--sidebar-primary)]"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <Icon className={cn("size-4 shrink-0", active && "text-sidebar-primary")} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between bg-sidebar px-4 py-6 lg:flex">
        <div className="space-y-8">
          <Brand />
          <NavLinks />
        </div>
        <p className="rounded-lg bg-sidebar-accent/50 px-3 py-3 text-[11px] leading-relaxed text-sidebar-foreground/60">
          AI-assisted. Human-reviewed. Always verify important information before you act on it.
        </p>
      </aside>

      <header className="sticky top-0 z-40 flex items-center justify-between bg-sidebar px-4 py-3 lg:hidden">
        <Brand compact />
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
        >
          {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
          />
          <div className="animate-in slide-in-from-left absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-sidebar px-4 py-6 duration-200">
            <div className="mb-8 flex items-center justify-between">
              <Brand />
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <X className="size-5" />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <main className="px-4 py-6 sm:px-6 lg:ml-64 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
