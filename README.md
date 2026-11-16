# Earmark

Earmark turns a line graph into a short piece of piano music so that a person
who cannot see the chart can still read it. It is a research prototype for
graph sonification built for UCLA CS 188 (Fall 2026).

**Live site:** https://earmark-pi.vercel.app/

## How a graph sounds

Every graph is played as a run of short piano notes in a comfortable range
(C3 to C6). Higher values are higher notes, one semitone per step, and time runs
left to right along the x axis. A six-second clip covers the whole graph, and
every original data point is sounded exactly.

Before the notes, a short header gives the listener everything needed to decode
them:

1. the graph's title and what the x and y axes measure,
2. the lowest value, followed by the note it plays as,
3. the highest value, followed by its note,
4. the starting value, followed by its note,
5. how much one pitch step is worth, demonstrated with two adjacent notes.

Pressing **Stop** at any moment reads out the value at that point in the graph.

## What's in the app

- **Tutorial** teaches the format with simple shapes (a steady rise, a spike, a
  plateau) and asks shape-recognition questions.
- **Test** (`#test`) uses realistic series such as monthly active users, an
  airline share price, or hourly humidity, and asks about actual values and
  positions. The chart stays hidden until you have answered.
- **Playground** (`#playground`) lets you pick any graph, play it, and inspect
  the exact note sequence.

Each question follows the same loop: listen, answer, see the graph revealed with
feedback, move on. A results screen summarises the run.

## Running it locally

Requires Node 20 or newer.

```sh
npm install
npm run dev        # http://localhost:5173
```

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `npm test`          | Unit tests (Vitest)                 |
| `npm run typecheck` | TypeScript check                    |
| `npm run lint`      | Lint with oxlint                    |
| `npm run build`     | Production build into `dist/`       |

## How it's built

A static React + TypeScript app bundled with Vite, with no backend. Piano sound
comes from Tone.js playing Salamander Grand Piano samples through the Web Audio
API. Spoken text uses the browser's Web Speech API. Charts are plain SVG.

```
src/
  types.ts       shared types: Graph, Sonification, Question, lesson state
  data/          the graphs and questions
  graph/         coordinate mapping and human-readable graph descriptions
  audio/         graph -> notes (sonification.ts), piano playback, speech, player hook
  quiz/          ordering, validation and scoring
  components/    the screens: intro, question, reveal, results, playground
```

The protocol logic in `src/audio` and `src/quiz` is pure TypeScript with no DOM
dependency and is covered by unit tests. CI runs lint, typecheck, tests and the
build on every push and pull request.
