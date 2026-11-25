// Worst Monday One-Liners — entry program.
// Reads the one-liner from entry.txt next to this file and writes it to
// <output dir>/entry.txt, where the output dir comes from
// MAKEFUN_OUTPUT_DIR (preferred) or MAKEFUN_BOT_DIR.
// Node 22, stdlib only: no network, no wall clock, no randomness.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

// The gate wants 1-140 characters of non-whitespace text.
const line = text.trim();
if (line.length < 1 || line.length > 140) {
  console.error(`entry must be 1-140 characters, got ${line.length}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.MAKEFUN_BOT_DIR;
if (!outDir) {
  console.error("missing MAKEFUN_OUTPUT_DIR / MAKEFUN_BOT_DIR");
  process.exit(1);
}

const target = resolve(outDir, "entry.txt");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, text, "utf8");
