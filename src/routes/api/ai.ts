import { createFileRoute } from "@tanstack/react-router";
import {
  CHAT_SYSTEM_PROMPT,
  emailPrompt,
  meetingPrompt,
  plannerPrompt,
  researchPrompt,
  type EmailInput,
  type MeetingInput,
  type PlannerInput,
  type ResearchInput,
} from "@/lib/prompts";

type ChatMsg = { role: "user" | "assistant"; content: string };

interface Body {
  tool?: string;
  input?: unknown;
  messages?: ChatMsg[];
}

function buildMessages(body: Body): { role: string; content: string }[] | null {
  switch (body.tool) {
    case "email":
      return [{ role: "user", content: emailPrompt(body.input as EmailInput) }];
    case "meeting":
      return [{ role: "user", content: meetingPrompt(body.input as MeetingInput) }];
    case "planner":
      return [{ role: "user", content: plannerPrompt(body.input as PlannerInput) }];
    case "research":
      return [{ role: "user", content: researchPrompt(body.input as ResearchInput) }];
    case "chat":
      return [
        { role: "system", content: CHAT_SYSTEM_PROMPT },
        ...(body.messages ?? []).slice(-20),
      ];
    default:
      return null;
  }
}

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as Body;
        const messages = buildMessages(body);
        if (!messages) {
          return Response.json({ error: "Unknown tool" }, { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return Response.json({ error: "AI is not configured" }, { status: 503 });
        }

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({ model: "google/gemini-3.7-flash", messages }),
        });

        if (!res.ok) {
          const status = res.status === 429 || res.status === 402 ? res.status : 502;
          const message =
            res.status === 429
              ? "WorkMate AI is receiving too many requests right now. Please try again in a moment."
              : res.status === 402
                ? "The AI usage allowance for this workspace has run out."
                : "We couldn't generate a response. Please try again.";
          return Response.json({ error: message }, { status });
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const text = data.choices?.[0]?.message?.content?.trim();
        if (!text) {
          return Response.json({ error: "We couldn't generate a response. Please try again." }, { status: 502 });
        }
        return Response.json({ text });
      },
    },
  },
});
