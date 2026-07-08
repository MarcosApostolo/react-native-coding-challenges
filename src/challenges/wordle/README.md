# Wordle

A clone of the standard Wordle game.

## Rules

- The game picks a secret 5-letter word.
- You get 6 guesses. Each guess must be a real 5-letter word from the
  dictionary (`wordList.ts`).
- After each guess, every letter is colored:
  - **Green** — correct letter, correct position.
  - **Yellow** — letter is in the word, but in the wrong position.
  - **Gray** — letter is not in the word (or you've already gotten credit
    for every copy of it — see duplicate-letter handling below).
- You win by guessing the word within 6 tries; otherwise the answer is
  revealed.

### Duplicate letters

Wordle uses a two-pass, limited-count evaluation: a guess only earns as many
colored tiles for a letter as the answer actually contains.

1. **Pass 1 (green):** mark every letter that's in the exact right spot, and
   remove one instance of that letter from the answer's remaining pool.
2. **Pass 2 (yellow):** for the remaining guessed letters, mark yellow only
   if the answer still has an unused instance of that letter left in the
   pool; otherwise gray.

Example: guess `EERIE` against answer `CREPE` (one `E` at the end). The
first `E` (index 0) is yellow, the second `E` (index 1) is gray — the
answer's only non-positional `E` was already claimed — and the last `E`
(index 4) is green because it lines up exactly.

## Notes

- `wordList.ts` is provided as a static list of common 5-letter words to use
  both as the pool of possible answers and as the "is this a real word"
  dictionary for validating guesses.
- Everything else (guess-evaluation logic, keyboard, grid, game state) is
  still to be implemented in `index.tsx` (and any additional files you want
  to split it into). Per repo convention, keep pure logic (guess evaluation,
  letter-status merging) separate from components so it can be unit tested
  with Jest.
