#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";

const script = fileURLToPath(new URL("../skills/poteto-mode/scripts/worktree-audit.sh", import.meta.url));
const scratch = mkdtempSync(join(tmpdir(), "pstack-audit-check-"));
const repo = join(scratch, "repo");
const worktree = join(scratch, "candidate");
const bin = join(scratch, "bin");
const gitPath = execFileSync("which", ["git"], { encoding: "utf8" }).trim();
const git = (...args) => execFileSync(gitPath, ["-C", repo, ...args], { encoding: "utf8", stdio: "pipe" });
try {
  mkdirSync(repo);
  mkdirSync(bin);
  mkdirSync(join(scratch, "sessions"));
  git("init", "-b", "trunk");
  git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "--allow-empty", "-m", "base");
  const base = git("rev-parse", "HEAD").trim();
  git("worktree", "add", "-b", "feature", worktree);
  execFileSync(gitPath, ["-C", worktree, "-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "--allow-empty", "-m", "feature"], { stdio: "pipe" });
  const head = execFileSync(gitPath, ["-C", worktree, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  git("update-ref", "refs/remotes/origin/main", base);
  git("update-ref", "refs/remotes/origin/release", head);
  git("symbolic-ref", "refs/remotes/origin/HEAD", "refs/remotes/origin/release");
  writeFileSync(join(bin, "gh"), '#!/bin/sh\nprintf "[]\\n"\n', { mode: 0o755 });
  writeFileSync(join(bin, "git"), `#!/bin/sh\nif [ "$1" = fetch ]; then exit 1; fi\nexec '${gitPath.replaceAll("'", "'\\''")}' "$@"\n`, { mode: 0o755 });
  for (const file of ["gh", "git"]) execFileSync("bash", ["-n", join(bin, file)]);
  const env = { ...process.env, PATH: `${bin}:${process.env.PATH}`, PI_CODING_AGENT_SESSION_DIR: join(scratch, "sessions"), TMPDIR: scratch };
  const run = (...args) => spawnSync("bash", [script, ...args, repo], { env, encoding: "utf8" });
  const merged = (result, expectedBase, expected) => {
    assert.equal(result.status, 0, result.stderr);
    assert.ok(result.stdout.startsWith(`# base: ${expectedBase}\n`), result.stdout);
    const row = result.stdout.trimEnd().split("\n").at(-1).split("\t");
    assert.equal(row[2], expected, "MERGED uses selected base, not origin/main");
    assert.equal(row[3], "clean");
    assert.equal(row[8], worktree);
  };
  merged(run(), "origin/release", "YES");
  merged(run("-b", "origin/main"), "origin/main", "no");
  merged(run("--base", "origin/release"), "origin/release", "YES");
  git("symbolic-ref", "--delete", "refs/remotes/origin/HEAD");
  merged(run(), "origin/main", "no");
  git("update-ref", "-d", "refs/remotes/origin/main");
  git("update-ref", "refs/remotes/origin/master", head);
  merged(run(), "origin/master", "YES");
  git("update-ref", "-d", "refs/remotes/origin/master");
  assert.equal(run().status, 1, "no implicit base fails closed");
  assert.equal(run("-b", "missing").status, 1, "invalid explicit base fails closed");
  assert.equal(spawnSync("bash", [script, "-b"], { env }).status, 2, "missing option value");
  assert.equal(run("--unknown").status, 2, "unknown option");
  assert.equal(spawnSync("bash", [script, scratch], { env }).status, 1, "not a repository");
  console.log("Worktree audit: remote default, explicit base, main/master fallback, and invalid inputs pass; network stubbed, no user sessions read");
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
