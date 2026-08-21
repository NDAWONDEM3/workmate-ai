# WorkMate AI

Build a polished, presentation-ready web application called WorkMate AI, an AI-powered workplace productivity assistant.

PROJECT PURPOSE

WorkMate AI helps students, graduates, employees, managers and small-business professionals complete common workplace tasks faster using AI.

The application must demonstrate:

Practical use of AI

Strong prompt engineering

Multiple AI-powered workplace functions

Productivity improvement

Responsible AI practices

A professional and modern user experience

The prototype must be suitable for a live academic demonstration.

IMPORTANT DEVELOPMENT CONSTRAINTS

This is a prototype and must be completed quickly.

DO NOT build:

User registration

Login

Authentication

Password management

Supabase

Firebase

External database

Complex backend

Admin dashboard

Payment functionality

The application must work immediately when opened.

Use browser local storage only where persistence is useful, such as recent activities or user preferences.

Do not require the user to create an account.

Do not make the user configure a database.

Do not make the user enter an external API key during normal use.

Use Lovable's available AI functionality for AI responses where supported.

If a live AI integration is unavailable in the generated environment, create a polished demonstration fallback so every feature still produces realistic output, and the interface remains fully functional.

APPLICATION STRUCTURE

Create a responsive single-page application with the following structure:

1. LANDING / DASHBOARD

Create a professional dashboard titled:

WorkMate AI

Subtitle:

Your intelligent workplace productivity assistant

Include a short description:

"WorkMate AI helps you write, summarise, plan, research and solve workplace tasks using AI."

Display five main feature cards:

Smart Email Generator

Meeting Notes Summarizer

AI Task Planner

AI Research Assistant

AI Workplace Chatbot

Each card must contain:

Icon

Feature name

Short description

"Open Tool" button

Also display a small productivity section showing:

Tasks completed

AI actions performed

Estimated time saved

These values may use local browser storage and sample/demo values.

FEATURE 1: SMART EMAIL GENERATOR

Create an AI-powered professional email generator.

Inputs:

Recipient type:

Client

Manager

Team Member

Lecturer

Supplier

Other

Purpose:

Request

Follow-up

Complaint

Meeting

Thank you

Application

General

Tone:

Formal

Professional

Friendly

Persuasive

Key information/message

Add a prominent button:

Generate Email

The AI should generate:

Subject

Greeting

Professional email body

Closing

Include buttons:

Copy

Regenerate

Clear

The prompt used internally should instruct the AI to avoid invented facts, maintain professional language and only use information supplied by the user.

FEATURE 2: MEETING NOTES SUMMARIZER

Create an AI tool for converting meeting notes into structured information.

Input:

Large text area titled:

Paste your meeting notes

Add optional fields:

Meeting title

Meeting date

Participants

Button:

Summarize Meeting

Output should contain four clearly separated sections:

Summary

A concise professional summary.

Key Decisions

Bullet-point list of decisions made.

Action Items

Show:

Task

Responsible person

Deadline, when provided

Important Points

Important information discussed during the meeting.

Add:

Copy Summary

Regenerate

Clear

The AI must not invent participants, deadlines, decisions or responsibilities.

If information is missing, explicitly state "Not specified".

FEATURE 3: AI TASK PLANNER

Create an AI-powered task planning tool.

Inputs:

Tasks

Available hours per day

Start date

End date

Priority preference

Allow users to enter multiple tasks.

Each task should support:

Task name

Priority

Estimated duration

Priorities:

High

Medium

Low

Button:

Generate Plan

The AI should create a structured daily plan.

Display:

Date

Time

Task

Priority

Estimated duration

Also display a small section:

Why this plan works

Explain how tasks were prioritised.

Add:

Regenerate Plan

Copy Plan

Clear

Use urgency and importance when prioritising tasks.

FEATURE 4: AI RESEARCH ASSISTANT

Create a research assistant for quick workplace and academic research support.

Inputs:

Research topic

Question

Desired response length:

Short

Medium

Detailed

Button:

Research Topic

The output should contain:

Quick Answer

A concise answer to the question.

Key Insights

3 to 5 important points.

Practical Recommendations

Useful actions or recommendations based on the information provided.

Further Questions

Suggested questions the user could investigate.

IMPORTANT:

The assistant must not pretend to have browsed the internet when no browsing functionality exists.

Include a visible responsible AI message:

"AI-generated research should be verified against reliable sources before being used in academic, professional or business decisions."

Do not generate fake citations or fake sources.

FEATURE 5: AI WORKPLACE CHATBOT

Create an interactive chatbot called:

WorkMate Assistant

The chatbot should support workplace productivity questions.

Example prompts:

"Help me prepare for a meeting."

"Write a professional follow-up message."

"Help me prioritise these tasks."

"Summarise this information."

"Give me ideas for improving my workflow."

The interface should contain:

Chat history

User messages

AI responses

Message input

Send button

Clear conversation button

Add suggested prompt buttons below the input.

The chatbot should behave as a professional workplace assistant.

It must clearly state when information requires verification.

PROMPT ENGINEERING SECTION

Add a dedicated page or expandable section called:

How WorkMate AI Uses Prompt Engineering

This section is important for the academic assessment.

Show examples of the structured prompts used by the application.

Explain the basic prompt structure:

Role + Context + Task + Constraints + Output Format

Example:

Role:
"You are a professional workplace communication assistant."

Context:
"The user needs to communicate with a manager."

Task:
"Write a professional follow-up email."

Constraints:
"Use only the information supplied by the user. Do not invent facts."

Output:
"Return a subject line followed by a professional email."

Also show a second example for meeting summarisation.

Add a small section titled:

Why structured prompts improve AI output

Explain that clear instructions, context, constraints and output formats help produce more consistent results.

RESPONSIBLE AI SECTION

Create a visible Responsible AI panel.

Include:

AI Limitations

AI-generated content may contain errors.

Users should verify important information.

AI should not replace professional judgement.

Users should avoid entering confidential information.

Research outputs should be checked against reliable sources.

Bias Awareness

State:

"AI outputs may reflect biases present in training data or user-provided information. Review outputs before using them in important decisions."

Human Verification

Display:

AI assists your work. You remain responsible for reviewing the final output.

Use an appropriate information icon.

PRODUCTIVITY VALUE

Add a section on the dashboard titled:

Your Productivity Impact

Display three metrics:

AI Actions
Number of completed AI actions.

Estimated Time Saved
Estimate time saved based on completed actions.

Tools Used
Number of WorkMate AI features used.

Use local browser storage for these values.

Do not require an account.

USER EXPERIENCE

Use a clean professional interface suitable for a corporate environment.

Design style:

Modern SaaS dashboard

Clean cards

Rounded corners

Good spacing

Professional typography

Strong visual hierarchy

Subtle animations

Clear buttons

Responsive design

The interface must work well on:

Desktop

Laptop

Tablet

Mobile

Use a consistent navigation sidebar on desktop.

Navigation:

Dashboard

Email Generator

Meeting Summarizer

Task Planner

Research Assistant

AI Chatbot

Prompt Engineering

Responsible AI

On mobile, convert the sidebar into a responsive navigation menu.

DEMO MODE

Because this is an academic prototype, make the application easy to demonstrate.

Add a Load Demo Example button where appropriate.

Demo examples should include:

Email Example

Recipient:
Manager

Purpose:
Follow-up

Tone:
Professional

Message:
"Follow up with my manager regarding the status of my internship application."

Meeting Example

Use sample meeting notes discussing:

Project progress

Outstanding tasks

Team responsibilities

Upcoming deadline

Task Planner Example

Tasks:

Complete project documentation

Prepare presentation

Review AI outputs

Submit final project

Research Example

Topic:

"How AI improves workplace productivity"

Chatbot Example

Question:

"How should I prepare for a professional presentation?"

The demo examples must make the application immediately usable during the presentation.

ERROR HANDLING

Add clear validation messages.

Examples:

If an input is empty:

"Please provide information before generating a response."

During AI generation:

"WorkMate AI is thinking..."

If generation fails:

"We couldn't generate a response. Please try again."

Do not expose technical errors to the user.

VISUAL OUTPUT

AI-generated content should appear inside polished result cards.

Use:

Headings

Bullet points

Tables where appropriate

Highlighted priority badges

Copy buttons

Regenerate buttons

Avoid displaying raw JSON or technical API responses.

COPY FUNCTIONALITY

Every generated result should have a Copy button.

After copying, display:

Copied to clipboard

Use a small toast notification.

CLEAR FUNCTIONALITY

Each tool should have a Clear button.

Clearing a tool should reset its inputs and generated output.

RESPONSIVE DESIGN

Ensure the entire application is responsive.

On desktop:

Use a sidebar plus main content area.

On mobile:

Use a top navigation bar or collapsible menu.

Cards should stack vertically.

Forms should remain easy to use on small screens.

BRANDING

Application name:

WorkMate AI

Tagline:

Work smarter. Communicate better. Plan faster.

Use a professional AI-inspired visual identity.

Do not make the design look like a generic AI chatbot.

The application should look like a real workplace productivity product.

IMPORTANT ACADEMIC REQUIREMENTS

The prototype must clearly demonstrate at least three of the five required AI workplace functions.

Preferably implement all five:

Smart Email Generator

Meeting Notes Summarizer

AI Task Planner

AI Research Assistant

AI Chatbot Interface

The application must also visibly demonstrate:

Prompt engineering

Responsible AI

AI productivity improvement

Professional workplace use

Human verification

Ethical considerations

DO NOT OVERBUILD

Prioritise functionality and presentation over unnecessary technical complexity.

Do not add:

Login

User accounts

Database

Complex authentication

Payment systems

Social features

Complex admin systems

Unnecessary settings

Features unrelated to workplace productivity

The prototype must be fast, stable and easy to demonstrate.

FINAL QUALITY CHECK

Before completing the build, verify:

Dashboard loads correctly.

All five tools are accessible.

Email Generator produces structured emails.

Meeting Summarizer produces summaries, decisions and action items.

Task Planner produces a prioritised schedule.

Research Assistant produces structured research responses.

Chatbot accepts multiple messages.

Copy buttons work.

Clear buttons work.

Demo examples work.

Loading states appear.

Error messages appear when required.

Responsible AI information is visible.

Prompt Engineering section is visible.

Responsive design works.

No login is required.

No database is required.

No external account is required for normal prototype use.

The interface looks professional enough for a live presentation.

Do not leave unfinished placeholder sections.

FINAL DASHBOARD MESSAGE

At the bottom of the dashboard, display:

WorkMate AI helps you spend less time on repetitive workplace tasks and more time on meaningful work.

Include:

AI-assisted. Human-reviewed.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3145b924-fdf1-480c-80a1-ab54ef584453).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
