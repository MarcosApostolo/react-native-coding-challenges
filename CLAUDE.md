# React Native Coding Challenges

This repo is for practicing React Native by building small, self-contained apps/features —
things like Wordle, a stopwatch, a todo list, an infinite scroll feed, a drag-and-drop
list, etc. The goal is hands-on React Native fluency (layout, state, animation, gestures,
async/data flow, performance), not LeetCode-style algorithm drills — though a challenge may
still involve some non-trivial logic (e.g. Wordle's guess-evaluation rules).

## Structure

Each challenge lives in its own folder under `src/challenges/<challenge-name>/`, fully
self-contained (components, hooks, helper logic, styles). Example:

```
src/challenges/wordle/
  index.tsx        # default export: the challenge's root component
  README.md         # what the challenge is, rules/requirements, notes on approach
```

Every challenge folder must include a `README.md` describing the problem (rules/requirements)
and any notes on the approach taken.

There is **no in-app navigation or home menu**. `App.tsx` renders exactly one challenge at
a time via a direct import:

```tsx
import Wordle from './src/challenges/wordle';

function App() {
  return <Wordle />;
}
```

To switch challenges, edit that import by hand. When starting a new challenge, swap it in;
don't wire up React Navigation or a picker screen for this.

## Conventions

- TypeScript for all new files (`.tsx`/`.ts`).
- Keep pure logic (game rules, validation, data transforms) separate from components, and
  unit test the logic with Jest — that's the part worth covering with tests here.
- Prefer plain `StyleSheet.create` styles co-located in the challenge's own file(s); no
  shared design system/theme needed unless a challenge specifically calls for it.
- Don't add navigation, state-management libraries (Redux/Zustand/etc.), or other
  dependencies unless a specific challenge genuinely calls for exercising that skill.
  Default to built-in React state.

## Commands

- `npm start` — start Metro
- `npm run ios` / `npm run android` — run the app (whichever challenge is currently wired
  into `App.tsx`)
- `npm test` — run Jest
- `npm run lint` — run ESLint

## Working with Claude here

- When starting a new challenge, scaffold the folder under `src/challenges/`, implement it,
  point `App.tsx` at it, and mention that the import was swapped.
- Keep each challenge isolated — don't extract shared components/utilities across
  challenges unless explicitly asked; duplication between exercises is fine and often
  clearer for a study repo like this.
