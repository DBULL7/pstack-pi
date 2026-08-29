#!/usr/bin/env node

import { constants } from "node:fs";
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const force = process.argv.includes("--force");
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const sourceDirectory = join(scriptDirectory, "..", "agents");
const configDirectory = process.env.PI_CODING_AGENT_DIR || join(homedir(), ".pi", "agent");
const targetDirectory = join(configDirectory, "agents");

await mkdir(targetDirectory, { recursive: true });

const files = (await readdir(sourceDirectory))
  .filter((file) => file.endsWith(".md"))
  .sort();

for (const file of files) {
  const source = join(sourceDirectory, file);
  const target = join(targetDirectory, file);

  try {
    await copyFile(source, target, force ? 0 : constants.COPYFILE_EXCL);
    console.log(`installed ${target}`);
  } catch (error) {
    if (error?.code === "EEXIST") {
      console.log(`kept existing ${target}`);
      continue;
    }
    throw error;
  }
}
