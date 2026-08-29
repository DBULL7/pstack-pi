#!/usr/bin/env node

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../skills/", import.meta.url));

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return markdownFiles(path);
      return entry.isFile() && entry.name.endsWith(".md") ? [path] : [];
    }),
  );
  return nested.flat();
}

const replacements = [
  ["~/.cursor/skills/", "~/.pi/agent/skills/"],
  [".cursor/skills/", ".pi/skills/"],
  ["Cursor's built-in `create-skill`", "pstack-pi's bundled `create-skill`"],
  ["Cursor's built-in create-skill", "pstack-pi's bundled create-skill"],
];

let changed = 0;
for (const file of await markdownFiles(root)) {
  const before = await readFile(file, "utf8");
  const after = replacements.reduce(
    (text, [from, to]) => text.replaceAll(from, to),
    before,
  );
  if (after === before) continue;
  await writeFile(file, after);
  changed += 1;
}

console.log(`updated ${changed} markdown file(s)`);
