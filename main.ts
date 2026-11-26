// main.ts — the hand-in program for the Nippon Statistics Atlas entry.
//
// The atlas itself is the static site under app/ (plain files, no build
// step). This program's only job is delivery: it copies app/ and
// screenshots/ from beside this file into the output directory and asks
// the vendored make.fun library to write the dossier the judges read.
//
// Paths are resolved from this file's own URL, never from the process
// working directory, and the output directory comes from
// MAKEFUN_OUTPUT_DIR (the grader's /output when the variable is unset).
// The program writes the same bytes on every run: it copies fixed files
// and the dossier builder is deterministic.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate's own limits, passed to the dossier builder so an entry the
// scorer would refuse is refused here first.
const DOSSIER_LIMITS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function copyTreeIntoOutput(name: string): void {
  const from = join(repoRoot, name);
  const into = join(outputDir, name);
  mkdirSync(into, { recursive: true });
  if (existsSync(from)) {
    cpSync(from, into, { recursive: true });
  }
}

function handIn(): void {
  if (!existsSync(join(repoRoot, 'app', 'index.html'))) {
    throw new Error('app/index.html is missing beside main.ts — nothing to hand in');
  }
  mkdirSync(outputDir, { recursive: true });
  copyTreeIntoOutput('app');
  copyTreeIntoOutput('screenshots');
  const dossier = buildDossier(outputDir, DOSSIER_LIMITS);
  writeFileSync(join(outputDir, 'dossier.json'), dossier);
  // A one-line receipt on stdout; the output files themselves stay byte-stable.
  console.log(`handed in: app/ + screenshots/ + dossier.json (${dossier.length} bytes) -> ${outputDir}`);
}

handIn();
