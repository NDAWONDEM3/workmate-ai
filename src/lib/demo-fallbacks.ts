// Polished demonstration fallbacks. These are used only when the live AI
// service cannot be reached, so every feature still produces realistic output
// during a presentation.

export const FALLBACKS: Record<string, string> = {
  email: `**Subject:** Follow-up on Internship Application Status

Dear [Manager's Name],

I hope this message finds you well. I am writing to follow up on the internship application I submitted, and to confirm whether any further information is required from my side.

I remain very interested in the opportunity and would welcome an update on the current status of the process whenever it is convenient for you.

Thank you for your time and consideration. Please let me know if there is anything else I can provide.

Kind regards,
[Your Name]

*Shown in demonstration mode — the live AI service was unavailable.*`,

  meeting: `## Summary
The team reviewed overall project progress, confirmed that the core build is on track, and agreed on the outstanding work required before the upcoming submission deadline.

## Key Decisions
- The documentation pack will be finalised before the presentation is rehearsed.
- Testing will run in parallel with documentation to protect the deadline.
- A short progress check-in will be held before final submission.

## Action Items
| Task | Responsible | Deadline |
| --- | --- | --- |
| Complete project documentation | Not specified | Friday |
| Prepare presentation slides | Not specified | Not specified |
| Review outstanding test cases | Not specified | Not specified |

## Important Points
- The deadline is fixed and cannot be extended.
- Remaining risks relate to documentation completeness rather than the build itself.

*Shown in demonstration mode — the live AI service was unavailable.*`,

  planner: `## Daily Plan
| Date | Time | Task | Priority | Estimated Duration |
| --- | --- | --- | --- | --- |
| Day 1 | 09:00 – 12:00 | Complete project documentation | High | 3 h |
| Day 1 | 13:00 – 15:00 | Prepare presentation | Medium | 2 h |
| Day 2 | 09:00 – 11:00 | Review AI outputs | Medium | 2 h |
| Day 2 | 11:30 – 13:00 | Submit final project | High | 1.5 h |

## Why This Plan Works
- High-priority, deadline-driven work is scheduled first, while focus is highest.
- Documentation precedes the presentation because the slides depend on it.
- Review time is placed before submission so corrections can still be made.
- Daily load stays within the available working hours.

*Shown in demonstration mode — the live AI service was unavailable.*`,

  research: `## Quick Answer
AI improves workplace productivity mainly by reducing time spent on repetitive written and administrative tasks, allowing people to focus on judgement-based work.

## Key Insights
- Drafting, summarising and reformatting text are the fastest areas to automate.
- Productivity gains depend heavily on the quality of the instructions given to the AI.
- Review remains essential: AI output is a first draft, not a final decision.
- Teams benefit most when AI is applied to a small number of frequent tasks.

## Practical Recommendations
- Identify the three most repetitive writing tasks in your week and template them.
- Keep a shared library of prompts that produce good results.
- Always verify names, numbers and dates before sending AI-assisted work.

## Further Questions
- Which tasks in my role are repetitive enough to benefit from AI support?
- How should our team review AI-assisted work before it is shared?
- What information must never be entered into an AI tool?

*Shown in demonstration mode — the live AI service was unavailable.*`,

  chat: `Here is a practical way to prepare for a professional presentation:

**1. Clarify the outcome** — decide the single message your audience must remember.

**2. Structure it** — opening context, three main points, and a clear recommendation.

**3. Rehearse aloud** — time yourself and cut anything that does not support the message.

**4. Prepare for questions** — list the three toughest questions and draft short answers.

Please verify any facts or figures you present against your own source material.

*Shown in demonstration mode — the live AI service was unavailable.*`,
};
