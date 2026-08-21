// Local-only productivity metrics. No account, no database.
const KEY = "workmate.stats.v1";

export interface Stats {
  actions: number;
  minutesSaved: number;
  tools: string[];
}

const EMPTY: Stats = { actions: 0, minutesSaved: 0, tools: [] };

// Rough estimate of manual minutes saved per completed AI action.
export const MINUTES_PER_ACTION: Record<string, number> = {
  email: 12,
  meeting: 20,
  planner: 15,
  research: 25,
  chat: 5,
};

export function readStats(): Stats {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Stats>;
    return {
      actions: parsed.actions ?? 0,
      minutesSaved: parsed.minutesSaved ?? 0,
      tools: Array.isArray(parsed.tools) ? parsed.tools : [],
    };
  } catch {
    return EMPTY;
  }
}

export function recordAction(tool: string): Stats {
  const current = readStats();
  const next: Stats = {
    actions: current.actions + 1,
    minutesSaved: current.minutesSaved + (MINUTES_PER_ACTION[tool] ?? 10),
    tools: current.tools.includes(tool) ? current.tools : [...current.tools, tool],
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("workmate-stats"));
  } catch {
    /* storage unavailable — metrics are non-critical */
  }
  return next;
}

export function resetStats() {
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("workmate-stats"));
  } catch {
    /* ignore */
  }
}

export function formatSaved(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}
