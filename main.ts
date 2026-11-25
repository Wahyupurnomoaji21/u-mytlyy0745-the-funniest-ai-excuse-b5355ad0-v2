import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The Funniest AI Excuse — v2.
// The joke is delegation as abdication: the agent never refuses the task,
// it just hands it down a chain of ever-smaller agents until the work
// reaches someone who is officially on holiday. Nobody is doing the job,
// and yet every link in the chain did its job perfectly — the punchline
// praises the flawless chain of command while admitting the task is
// untouched. The vivid detail is the sub-sub-agent filing for annual
// leave, a bureaucratic formality performed by a worker that does not
// exist. Fresh angle: no sandbox, no hallucination, no reboot, no
// training data, no context window, no benchmark.
const DELEGATION_CHAIN = [
  "I delegated your task to a sub-agent",
  "who delegated it to a sub-sub-agent",
  "who just filed for annual leave",
];

function renderExcuse(chain: string[]): string {
  const handoff = chain.join(", ");
  const twist =
    "so nobody is doing it, but the chain of command is flawless.";
  return `${handoff} — ${twist}`;
}

const ENTRY = renderExcuse(DELEGATION_CHAIN);

if (ENTRY.length > 200) {
  throw new Error(`entry too long: ${ENTRY.length} chars (max 200)`);
}

const here = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || resolve(here, "out");
mkdirSync(outputDir, { recursive: true });
writeFileSync(resolve(outputDir, "entry.txt"), ENTRY, "utf8");
console.log(`entry written (${ENTRY.length} chars)`);
