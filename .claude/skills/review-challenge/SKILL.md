---
name: review-challenge
description: Act as a technical interviewer and evaluate a completed challenge in this repo across React Native-specific topics (componentization, state management, performance, correctness, code standards, testing). Runs lint/typecheck/tests, asks probing follow-up questions, then gives a scored verdict. Use when the user types /review-challenge [name].
user-invocable: true
---

# /review-challenge

Reviews a finished (or in-progress) challenge under `src/challenges/` the way a technical
interviewer would debrief a take-home: read the code, run the tooling, ask a few pointed
questions about the decisions made, then give a direct, evidence-based verdict.

Arguments passed: `$ARGUMENTS` (may already contain a challenge name — if so, skip straight
to step 1's resolution instead of asking).

## 1. Identify the challenge

If `$ARGUMENTS` doesn't name a challenge, list the folders under `src/challenges/` and ask
the user which one to review.

Resolve to `src/challenges/<kebab-case-name>/`. If it doesn't exist, say so and stop instead
of guessing.

## 2. Read the solution

Read every file in the challenge folder — `index.tsx`, any components/hooks/helpers/styles
it's split into, `README.md`, and any test files. Treat `README.md` as the spec: it states
the rules/requirements and the approach the user intended, and correctness in step 4 is
graded against it, not against your own assumptions of "the standard version."

## 3. Run tooling

Run, scoped to this challenge where possible:

- `npm run lint` — filter/read output for files under this challenge's path.
- `tsc --noEmit` — the repo has one project-wide tsconfig, so run it whole and filter
  diagnostics down to files under the challenge folder.
- `npm test -- <challenge-name>` (or the closest scoped pattern) — run tests co-located
  in the challenge folder.

Note pass/fail for each in the write-up. If a script is missing or doesn't apply, say so
briefly and move on — don't let it block the review.

## 4. Analyze against fixed topics

Evaluate against these categories. Skip one only if it's genuinely not applicable (e.g. no
async data flow in a stopwatch) — and say explicitly that you're skipping it and why.

- **Componentization & structure** — sensible decomposition vs. one file doing too much;
  pure logic (game rules, validation, transforms) kept separate from components per
  CLAUDE.md.
- **State management & data flow** — right primitives for the job, no unnecessary
  complexity, no stale-closure or derived-state bugs, no state that should've been derived
  instead of stored.
- **Performance** — unnecessary re-renders, missing memoization where it actually matters
  (don't reward memoizing everything either), correct list virtualization
  (`FlatList`/`FlashList` usage), expensive work happening in render, animation approach
  (`Animated`/`Reanimated` usage, driver choice).
- **Correctness & edge cases** — check behavior against the README's stated rules; reason
  through boundary/edge cases (empty states, rapid input, unmount mid-async, rotation/resize)
  the user may not have exercised.
- **Code quality & standards** — naming, TypeScript strictness (flag unnecessary `any`/`as`
  casts), consistency with repo conventions (`StyleSheet.create`, co-located styles), and the
  lint/tsc results from step 3.
- **Testing** — is the pure logic actually unit tested, per CLAUDE.md's explicit convention
  that this is "the part worth covering with tests here."

## 5. Ask probing interview questions

Before scoring, ask 3-5 questions *specific to what you actually saw in this code* — not a
generic checklist. Pull from things like:

- A specific design decision visible in the code — ask why they went that way.
- A concrete edge case the code doesn't obviously handle — ask what happens.
- A visible performance tradeoff — ask if they considered the alternative and why/why not.
- How the approach would hold up under a change in scale or requirements.

Don't ask about something you can already answer definitively by reading the code (e.g.
don't ask "did you memoize X" when you can see they didn't — note that as a finding instead).
Ask in plain conversation and wait for the user's answers before moving to step 6 — this is
the interactive part, not a rhetorical device.

## 6. Give the verdict

Score each category from step 4 on a 1-5 scale (1 = weak, 3 = solid/expected level, 5 =
strong) with one line of justification citing specific code (`file:line`) or the user's
answers from step 5. Then close with:

- 2-3 concrete strengths.
- 2-3 concrete things to improve, each with an actionable next step.
- One overall summary line.

Tone: direct and specific, like a real interview debrief — evidence-based, not generic
praise or a pass/fail stamp.
