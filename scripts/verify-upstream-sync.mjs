#!/usr/bin/env node
import assert from "node:assert/strict";
import { globSync, readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = globSync(["skills/**/*.md", "docs/**/*.md"], { cwd: root }).sort();
const skills = files.filter((file) => basename(file) === "SKILL.md");
const records = new Map(files.map((file) => [file, readFileSync(resolve(root, file), "utf8")]));
const errors = [];
const names = new Set();
for (const [file, text] of records) {
  if (/^(<{7}|={7}|>{7})( |$)/m.test(text)) errors.push(`${file}: merge marker`);
  if (skills.includes(file)) {
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
    const name = frontmatter.match(/^name: ([a-z0-9]+(?:-[a-z0-9]+)*)$/m)?.[1];
    if (!name || name.length > 64 || name !== basename(dirname(file)) || names.has(name)) errors.push(`${file}: invalid or duplicate name`);
    names.add(name);
    if (!/^description: "(?:[^"\\\n]|\\.)+"$/m.test(frontmatter)) errors.push(`${file}: description must be double-quoted`);
    const description = frontmatter.match(/^description: (".*")$/m)?.[1];
    if (description && JSON.parse(description).length > 1024) errors.push(`${file}: description exceeds 1024 characters`);
  }
  const prose = text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, "").replace(/`[^`\n]*`/g, "");
  for (const match of prose.matchAll(/\[[^\]\n]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || /^(?:[a-z]+:|\/)/i.test(target)) continue;
    if (file === "skills/why/references/synthesizer-prompt.md" && match[0] === "[PR #123](url)") continue;
    if (!existsSync(resolve(root, dirname(file), decodeURIComponent(target)))) errors.push(`${file}: missing link ${target}`);
  }
}
console.log(`Tree: ${skills.length} skills, ${[...names].filter((name) => name?.startsWith("principle-")).length} principles, ${files.length} Markdown files`);
for (const error of errors) console.error(error);
assert.equal(errors.length, 0, "tree validation errors");

const deferred = ["autopilot-full", "autopilot-stack", "orchestrate", "shipping", "multi-phase-plan"];
const explicitSkills = ["how", "why", "make-bot-ui", "typescript-best-practices", "unslop"];
const mode = records.get("skills/poteto-mode/SKILL.md");
for (const name of ["principle-attack-the-premise", "principle-test-behavior-not-implementation"]) {
  assert.ok(names.has(name), `new skill ${name}`);
  assert.ok(mode.includes(`../${name}/SKILL.md`), `principle index links ${name}`);
}
for (const file of ["critic-prompt.md", "critique-rubric.md"]) assert.equal(existsSync(resolve(root, "skills/how/references", file)), false, `removed ${file}`);
assert.doesNotMatch(records.get("skills/how/SKILL.md"), /critique/i, "how must remain explanation-only");
for (const name of explicitSkills) {
  assert.match(records.get(`skills/${name}/SKILL.md`).split("---")[1], /^disable-model-invocation: true$/m, name);
}
const contracts = [
  ["skills/poteto-mode/SKILL.md", /Every claim carries its evidence or its label/],
  ["skills/poteto-mode/SKILL.md", /Always obtain explicit authorization for external side effects/],
  ["skills/poteto-mode/SKILL.md", /Never poll merely to wait/],
  ["skills/poteto-mode/playbooks/babysit.md", /Never poll with sleep, status, or repeated logs merely to wait/],
  ["skills/poteto-mode/playbooks/babysit.md", /bg_run/],
  ["skills/poteto-mode/playbooks/opening-a-pr.md", /requires explicit user authorization/],
  ["skills/poteto-mode/playbooks/opening-a-pr.md", /Do not require Graphite/],
  ["skills/poteto-mode/playbooks/opening-a-pr.md", /gh pr create --base/],
  ["skills/poteto-mode/playbooks/opening-a-pr.md", /origin pr create --status open --base/],
  ["skills/typescript-best-practices/SKILL.md", /Schemas before guards/],
  ["skills/why/SKILL.md", /When the available agent cannot access MCP tools, keep MCP investigation in the parent/],
];
for (const [file, pattern] of contracts) assert.match(records.get(file), pattern, file);
for (const [file, text] of records) {
  assert.doesNotMatch(text, /critic-prompt\.md|critique-rubric\.md|how.{0,80}critique|critique.{0,80}how/i, `${file}: removed how mode`);
  if (!file.startsWith("skills/") || deferred.some((name) => file === `skills/poteto-mode/playbooks/${name}.md`)) continue;
  assert.doesNotMatch(text, /claude-fable-5|gpt-5\.6-sol|grok-4\.6-fast|~\/\.cursor\/rules\/pstack-models/, `${file}: Cursor routing`);
}
for (const name of deferred) {
  assert.match(mode, new RegExp(`\\*\\*${name === "multi-phase-plan" ? "Multi-phase or multi-PR plan" : name[0].toUpperCase() + name.slice(1)}\\.\\*\\* Deferred`));
}
execFileSync("git", ["diff", "--exit-code", "77a1a7b", "--", "package.json", "agents", "extensions", "automations", "docs/pi-compat.md", "docs/guide/01-setup.md", "skills/setup-pstack", "skills/create-skill", "skills/poteto-mode/scripts", ...deferred.map((name) => `skills/poteto-mode/playbooks/${name}.md`)], { cwd: root, stdio: "pipe" });
assert.equal(existsSync(resolve(root, ".cursor-plugin")), false, "no Cursor manifest");
const principles = [...names].filter((name) => name.startsWith("principle-")).length;
assert.ok(readFileSync(resolve(root, "README.md"), "utf8").includes(`${principles} named principles`), "README count");
const playbooks = globSync("skills/poteto-mode/playbooks/*.md", { cwd: root }).length;
assert.ok(records.get("docs/guide/02-poteto-mode.md").includes(`${playbooks} playbook files`), "playbook count");
assert.ok(records.get("docs/guide/02-poteto-mode.md").includes(`${playbooks - deferred.length} active playbooks`), "active count");
console.log(`Playbooks: ${playbooks} files, ${deferred.length} deferred, ${playbooks - deferred.length} active`);
console.log("Sync contracts: new skills, invocation flags, references, Pi boundaries, counts, and protected files pass");

if (process.argv.includes("--load")) {
  assert.equal(process.env.PI_OFFLINE, "1", "set PI_OFFLINE=1");
  assert.ok(process.env.PI_CODING_AGENT_DIR, "set a fresh PI_CODING_AGENT_DIR");
  assert.deepEqual(readdirSync(process.env.PI_CODING_AGENT_DIR), [], "agent directory must be fresh and empty");
  const sdk = process.env.PI_SDK_PATH;
  const { DefaultResourceLoader, SettingsManager } = await import(sdk ? pathToFileURL(resolve(sdk)).href : "@earendil-works/pi-coding-agent");
  const loader = new DefaultResourceLoader({
    cwd: root,
    agentDir: process.env.PI_CODING_AGENT_DIR,
    settingsManager: SettingsManager.inMemory(),
    noExtensions: true,
    noSkills: true,
    noPromptTemplates: true,
    noThemes: true,
    noContextFiles: true,
    additionalSkillPaths: [resolve(root, "skills")],
  });
  await loader.reload();
  const loaded = loader.getSkills();
  assert.deepEqual(loaded.diagnostics, [], "Pi skill diagnostics");
  assert.deepEqual(loaded.skills.map((skill) => skill.name).sort(), [...names].sort(), "Pi discovers exactly the tree's skills");
  assert.equal(loader.getExtensions().extensions.length, 0, "no extensions loaded");
  for (const name of explicitSkills) assert.equal(loaded.skills.find((skill) => skill.name === name).disableModelInvocation, true, `${name}: Pi invocation flag`);
  console.log(`Pi loader: ${loaded.skills.length} skills, 0 diagnostics, 0 extensions, no inference`);
}
