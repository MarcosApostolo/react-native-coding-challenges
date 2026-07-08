---
name: start-challenge
description: Start a new React Native coding challenge in this repo. Asks the user for the challenge name and details, researches the challenge if needed, then scaffolds (folder, README, stub component only — never implements the solution) under src/challenges/ per CLAUDE.md conventions. Use when the user types /start-challenge.
user-invocable: true
---

# /start-challenge

Kicks off a new challenge in this study repo. Follow CLAUDE.md's structure and
conventions exactly — this skill is just the workflow for getting there.

**Scaffold only — never implement the solution.** This repo exists so the user
practices writing these challenges themselves. This skill's job stops at a
folder, a README of rules, static setup data if needed, and a bare component
stub. Do not write game logic, state management, hooks, or wired-up UI
interactions, no matter how straightforward the challenge seems. See step 3
for exactly what "stub" means.

Arguments passed: `$ARGUMENTS` (may already contain a challenge name/details —
if so, skip straight to step 2 confirmation instead of re-asking for what's
already given).

## 1. Ask for the challenge

If `$ARGUMENTS` didn't already supply this, ask the user directly in the
conversation (plain text, not AskUserQuestion — this is open-ended):

- What's the challenge called? (e.g. "Wordle", "2048", "drag-and-drop list",
  "infinite scroll feed")
- Any specific rules, requirements, or constraints they care about, or should
  you use the standard/well-known version of it?

Keep this to one round of questions. Don't interrogate for every detail —
enough to know what to build and research.

## 2. Research if useful

If the challenge is a known game/pattern whose exact rules matter for
correctness (e.g. Wordle's guess-evaluation rules, 2048's merge rules,
Minesweeper's flood-fill/reveal rules, Conway's Game of Life), use WebSearch
to confirm the precise rules before implementing — getting these wrong
defeats the point of the exercise. Skip research for generic UI/interaction
exercises (stopwatch, todo list, infinite scroll, drag-and-drop list) where
the "rules" are just normal app behavior and the user's description is
enough.

If the user gave a genuinely novel or personal spec, don't override it with
web results — their description is the spec.

## 3. Scaffold the folder — stub only, no implementation

Create `src/challenges/<kebab-case-name>/` with:

- `index.tsx` — default export, the challenge's root component, but only as
  a **bare stub**: renders a minimal placeholder (e.g. a title/heading). No
  game logic, no `useState`/`useEffect`, no event handlers, no child
  components beyond what's needed to render the placeholder. This is the
  file the user will actually build out themselves.
- `README.md` — what the challenge is and the rules/requirements as
  understood (including anything pulled from research). Do **not** include
  an "approach" section describing an implementation, since there isn't
  one yet — leave that for the user to fill in once they've built it, if
  they want to.
- Static setup data only, if the challenge genuinely needs it (e.g. a word
  list for Wordle, a puzzle bank) — data files with no logic are fine to
  provide since they aren't "the challenge" itself.

Explicitly do NOT create: pure-logic modules (e.g. `gameLogic.ts`,
`useGameState.ts`), their Jest tests, or any interactive UI beyond the
placeholder. If you catch yourself writing an algorithm, a reducer, a
`useState` call that drives gameplay, or styled interactive elements —
stop, that's the user's part.

Follow existing repo conventions (already read from CLAUDE.md) for whatever
you do write: TypeScript everywhere, plain `StyleSheet.create` co-located in
the challenge's own file(s) — no navigation libraries, no state management
libraries, no cross-challenge shared utilities unless explicitly asked.

## 4. Wire up App.tsx

Point `App.tsx`'s import at the new challenge (this repo shows exactly one
challenge at a time, no nav/picker). If `App.tsx` doesn't exist yet or
imports nothing, create/replace it with the direct-import pattern from
CLAUDE.md:

```tsx
import ChallengeName from './src/challenges/<kebab-case-name>';

function App() {
  return <ChallengeName />;
}

export default App;
```

Tell the user explicitly that the import was swapped, and what it was swapped
from (if anything).
