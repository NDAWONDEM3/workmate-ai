import { FALLBACKS } from "./demo-fallbacks";
import { recordAction } from "./stats";

export interface AiResult {
  text: string;
  demo: boolean;
}

interface CallOptions {
  tool: string;
  input?: unknown;
  messages?: { role: "user" | "assistant"; content: string }[];
}

/**
 * Calls the WorkMate AI backend. If the live AI service is unavailable, a
 * polished demonstration fallback is returned so the prototype stays usable.
 */
export async function callAI({ tool, input, messages }: CallOptions): Promise<AiResult> {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool, input, messages }),
    });
    const data = (await res.json()) as { text?: string; error?: string };
    if (!res.ok || !data.text) throw new Error(data.error ?? "generation failed");
    recordAction(tool);
    return { text: data.text, demo: false };
  } catch {
    const fallback = FALLBACKS[tool];
    if (!fallback) throw new Error("We couldn't generate a response. Please try again.");
    recordAction(tool);
    return { text: fallback, demo: true };
  }
}
