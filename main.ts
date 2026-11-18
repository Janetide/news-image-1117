// news-image-1117 — a Node 22 program (standard library only) that ships this
// entry's image. The image is drawn in advance and stored beside this file as
// entry.png; the program's only job is to place a byte-for-byte copy of it at
// $MAKEFUN_OUTPUT_DIR/entry.png (or /output/entry.png inside the grader).
// It needs no network and no dependencies.
//
// Run it locally:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = join(here, 'entry.png');
const dest = join(outDir, 'entry.png');

if (!existsSync(src)) {
  console.error(`error: source image missing: ${src}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);

// Verify the copy landed: the destination must exist and be non-empty.
let size = 0;
try {
  size = statSync(dest).size;
} catch {
  console.error(`error: copy failed, destination missing: ${dest}`);
  process.exit(1);
}
if (size === 0) {
  console.error(`error: copy failed, destination is empty: ${dest}`);
  process.exit(1);
}
console.log(`wrote ${dest} (${size} bytes)`);
