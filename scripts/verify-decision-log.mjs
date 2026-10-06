#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";

const script = fileURLToPath(new URL("../skills/show-me-your-work/scripts/log.sh", import.meta.url));
const scratch = mkdtempSync(join(tmpdir(), "pstack-log-check-"));
const header = "ts\tphase\tdecision\twhy\tevidence\tresult\n";
try {
  for (const state of ["missing", "empty", "existing"]) {
    const file = join(scratch, `${state}.tsv`);
    const prior = state === "existing" ? `${header}2026-01-01T00:00:00Z\tstart\told\told\told\topen\n` : "";
    if (state !== "missing") writeFileSync(file, prior);
    execFileSync("bash", [script, file, "verify", "=formula", "why\twith\nlines\r", "@evidence", "+result"]);
    const first = readFileSync(file, "utf8");
    assert.ok(first.startsWith(prior || header), `${state}: header and prior rows survive`);
    assert.equal(first.split(header).length - 1, 1, `${state}: exactly one header`);
    const row = first.trimEnd().split("\n").at(-1).split("\t");
    assert.match(row[0], /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/, `${state}: UTC timestamp`);
    assert.deepEqual(row.slice(1), ["verify", "'=formula", "why with lines ", "'@evidence", "'+result"], `${state}: cells stay on one row and formulas stay text`);
    execFileSync("bash", [script, file, "check", "-formula", "reason", "evidence", "passed"]);
    const second = readFileSync(file, "utf8");
    assert.ok(second.startsWith(first), `${state}: subsequent writes append`);
    assert.equal(second.split("\n").length, first.split("\n").length + 1, `${state}: exactly one new row`);
    assert.ok(second.includes("\t'-formula\t"), `${state}: negative formula stays text`);
    assert.equal(spawnSync("bash", [script, file, "too-few"]).status, 1, `${state}: reject missing fields`);
    assert.equal(readFileSync(file, "utf8"), second, `${state}: invalid invocation leaves log intact`);
  }
  const nested = join(scratch, "nested", "decisions.tsv");
  execFileSync("bash", [script, nested, "start", "decision", "why", "evidence", "open"]);
  assert.ok(readFileSync(nested, "utf8").startsWith(header), "creates the log directory");
  console.log("Decision log: missing, empty, and existing logs; append-only rows; TSV and formula safety; invalid arguments pass");
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
