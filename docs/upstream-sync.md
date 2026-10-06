# Upstream sync through 0.15.15

## Source and baseline

| Record | Pin |
|---|---|
| Source | [cursor/plugins, pstack subtree](https://github.com/cursor/plugins/tree/df581122cde17e6e27686b5a448bde23e4ad4318/pstack) |
| Upstream target | `df581122cde17e6e27686b5a448bde23e4ad4318`, plugin `0.15.15` |
| Upstream baseline | `f5bdd6826fd0a0d9cbc4347134c3a74a200b9d9d`, plugin `0.15.2` |
| Pi baseline | `fc99b79a22dc19e3a8aecd984db807636379eb70`, the merged [0.15.2 sync](https://github.com/DBULL7/pstack-pi/pull/4) |
| Original port | `25e2e7a`, tree `950b90234c17babd00c43e32b19ae50abb4720f5`, upstream `6fecddba65801f9b9c08b8b328d998ee5b09d290:pstack` |
| Pi package version | `0.1.0`, independent of the upstream plugin version |

The upstream delta has 16 pstack commits and 65 changed paths. Integration compared each old upstream file, new upstream file, and Pi file, then reviewed both merge conflicts and clean merges for runtime assumptions. Of those paths, 48 carry imported or adapted changes, 16 retain the Pi baseline, and the Cursor manifest is excluded.

The package has 52 skills, including 24 principles, and 27 slash-command aliases. There are 23 playbook files: five deferred and 18 active.

## Imported changes

- Added `benchmark-checklist`, `correct`, `poteto-help`, and `principle-explain-the-number`. The first three have Pi command aliases; all four preserve upstream's explicit-invocation flag.
- Connected the benchmark checklist to poteto-mode, Perf issue, and Hillclimb. Imported the ordered performance mantras and the requirement to record error counts, completed work, repeated samples, and the measured limiter. Benchmark setup includes the macOS core-count command.
- Imported architect's agent-oriented design review: single ownership, one supported path per task, inaccessible internals, and one source for repeated lists.
- Imported fresh-subagent guidance, exact commit and method reporting for swarm workers, schema-first TypeScript examples, shorter skill prose, and revised PR-body guidance.
- Imported append-only decision-log audits with per-run boundaries. The log writer adds a header to an empty file and appends even when its file-size check gives a false negative. It preserves the existing TSV and spreadsheet-formula sanitization.
- Updated the guide with prompting, investigation, prototyping, verification, benchmarking, corrections, and help examples. Added trust checks before unattended work and the Pause safely guidance.

## Pi adaptations and exclusions

- Rewrote `poteto-help` setup, model routing, command syntax, troubleshooting, and reference links for Pi. Help answers do not install packages, mutate configuration, or start the proposed task. Model routes come from named profiles and runtime overrides. An unknown route is not evidence that setup never ran.
- Kept the prior testing adaptation in `/correct`: evaluate the regression a test catches, including absence, side effects, properties, and types. A mutation that returns nothing is not a universal reason to delete coverage.
- Kept Pi's named agents, MCP fallback handling, session privacy boundaries, background completion notifications, bundled `create-skill`, explicit external-action authorization, and user-requested drafts. A built-in PR tool is preferred only for the operations it supports, under the same authorization rules.
- Left `arena`, `how`, `interrogate`, `reflect`, `why`, and Refactoring unchanged where upstream altered Cursor model routing or removed review reminders. No Cursor model identifiers or `pstack-models.mdc` routing were imported.
- Left `shipping`, `orchestrate`, `autopilot-full`, `autopilot-stack`, and `multi-phase-plan` unchanged. Pi planning and queued work still route to a bounded `figure-it-out` workflow. Kept Babysit unchanged because its upstream change delegates rebase and force-push authority to deferred autopilot owners.
- Left package metadata, agent profiles, setup and its guide, compatibility docs, automations, and `poteto-mode/scripts` unchanged. Excluded the Cursor manifest, model presets, cloud-agent commands, `/loop`, and custom-mode UI. The aliases extension adds only the three new commands.

See [Pi compatibility](pi-compat.md) for the runtime mapping and authorization policy.

## Rerunnable checks

Run with Node.js 22 or newer, Git, and Bash:

```bash
node --check scripts/verify-upstream-sync.mjs
node scripts/verify-upstream-sync.mjs
node scripts/verify-decision-log.mjs
bash -n skills/show-me-your-work/scripts/log.sh
git diff --check
```

The static verifier checks skill names and descriptions, relative Markdown file links, conflict markers, the principle index, invocation flags, selected Pi contracts, counts, and protected files against `fc99b79`. It ignores fenced and inline code examples. It checks target files, not heading fragments or remote URLs. Review the protected paths and baseline together before the next sync.

Setup guidance in `skills/setup-pstack/SKILL.md`, `docs/guide/01-setup.md`, and `docs/pi-compat.md` uses the normal skill and Markdown checks rather than the frozen-file comparison. This allows setup repairs after the sync; package metadata and agent profiles remain protected. Validate changes to runtime discovery guidance with isolated `pi-subagents` package-discovery fixtures as well as the Pi loader. Static checks and skill loading do not establish that the guidance is correct.

For an isolated native Pi load, set `PI_SDK_PATH` to an existing installation's `dist/index.js` when Node cannot resolve the peer package:

```bash
export PI_SDK_PATH="/absolute/path/to/pi-coding-agent/dist/index.js"
PI_CODING_AGENT_DIR="$(mktemp -d)" PI_OFFLINE=1 \
  node scripts/verify-upstream-sync.mjs --load
```

This uses in-memory settings and disables ambient resource discovery. It loads only this checkout's skills and aliases extension. It asserts the exact discovered skill set, zero load errors, invocation flags, and registration of all three new commands. Each registered alias handler is called with empty and multiline quoted arguments. The check captures the message sent to Pi and verifies the skill command, trimmed arguments, and prompt-expansion option. A simulated busy turn verifies that the handler warns instead of sending a message.

## Verification results and limits

- Pi `1.0.0`, running under Node.js `24.16.0`, discovers all 52 skills with zero skill diagnostics and one package extension with zero load errors. All 27 alias handlers forward the expected arguments and warn without sending a message when the simulated session is busy. No model session or inference is used.
- Decision-log checks cover missing, empty, and existing files, header initialization, preservation of prior rows, one-row appends, UTC timestamps, control-character sanitization, formula-like cells, directory creation, and invalid arguments leaving the file untouched. The same check fails against the pre-sync writer on empty-file initialization.
- Isolated negative fixtures reject an imported Cursor model rule, a missing new alias, an invocation-flag regression, and a broken reference. Guide and help heading links also resolve.

These checks cover resource loading, alias argument forwarding and busy-state handling, and log behavior. Full Pi session dispatch, skill expansion, and future model compliance with skill prose remain unverified. No live PR operations, provider inference, installs, Origin operations, or deferred orchestration runtimes are exercised by this sync.
