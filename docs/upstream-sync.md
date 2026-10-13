# Upstream sync through 0.15.23

## Source and baseline

| Record | Pin |
|---|---|
| Source | [cursor/plugins, pstack subtree](https://github.com/cursor/plugins/tree/dbf49813a39c1a5389c5e28cb8e4c1c2379e2454/pstack) |
| Upstream target | `dbf49813a39c1a5389c5e28cb8e4c1c2379e2454`, plugin `0.15.23`, October 13, 2026 |
| Upstream baseline | `df581122cde17e6e27686b5a448bde23e4ad4318`, plugin `0.15.15` |
| Pi baseline | `4ca790b03b2e939aa28ec1107d5897c3ad5dd2cc`, merged setup and package-discovery fixes |
| Pi package version | `0.1.0`, independent of the upstream plugin version |

The complete pstack delta contains 21 commits and 65 changed paths. [The coverage ledger](upstream-coverage.json) records a decision and reason for every path: 29 exact imports, 26 Pi adaptations, eight retained Pi files, and two excluded manifests. Run the verifier with `--upstream` to compare that ledger to the pinned source, not merely to files that merged cleanly.

The package now has 54 skills, including 24 principles, and 29 slash-command aliases. The playbook count remains 23: five deferred and 18 active. The verifier regenerates and checks these counts.

## Imports and adaptations

- Added explicit-only `/in-your-own-words` to restate the user's goal and problem, and `/ketchup` for a read-only catch-up since the user's last message. Ketchup keeps text under 250 words and draws visuals only from known facts. Pi uses existing screenshots, Mermaid, or available local chart tools, not an assumed `/visualize` command or image provider. It does not start apps or jobs to manufacture evidence.
- The chat receiving `/poteto-mode` runs the playbook and owns its checklist and delegate spawns. `poteto-agent` is a scoped delegate, not a replacement runner. Every delegate prompt carries the parent's absolute skill path. The agent preserves the active package copy rather than searching Cursor plugins or selecting the highest version. Its model inheritance and external-action restrictions are unchanged.
- Verification-skill generation now requires usable readiness from an empty data directory, including migrations and seed data. A missing journey precondition is a failure, not permission to weaken the journey. Stand-in environments must name setup steps not yet proved on the real target.
- Imported the cheap always-on debugging signal recommendation and reviewed prose reductions in design, review, benchmarking, explanation, reflection, writing, and evidence references. Kept Pi agent selection, MCP fallback, session privacy, approval gates, and macOS benchmark guidance.
- Imported plan-fence parsing for backticks and tildes, indentation, matching fence characters and lengths, and invalid backtick info strings. Adapted the new fixture to the retained plan checker contract. Its legacy model and `/goal` markers remain part of a deferred workflow, not Pi routing or a live inference test.
- Imported review-thread pagination and cross-page Bugbot pass counts. Updated the reader interface, snapshot caller, and test fakes together. Added fail-closed handling and regression tests for a next page without a usable cursor and for repeated cursors. Incomplete pagination must not become a merge-ready result or an infinite loop.
- Worktree audit now accepts `-b` or `--base`, defaults to `origin/HEAD` with `origin/main` and `origin/master` fallbacks, prints its selected base, and fetches an explicit remote ref best-effort before validating it. It retains exact-cwd Pi session lookup and never deletes worktrees. Fixtures stub network calls and read no user sessions.

## Intentional exclusions

- Excluded both the Cursor manifest and the new Agent Plugins v1 root manifest. `package.json` remains Pi's entry point. No dependency, package-version, model-route, or credential changes were needed.
- `comment-sicko` already had the upstream agent identifier. Preserved its report-only prompt and effective `write` and `edit` exclusions. Setup still requires `pi-subagents` 0.62.0 or newer, `source=package`, raw-manifest discovery, and supported override repair rather than copied profiles.
- Kept Babysit's authorization and reply reminders that upstream removed. PR preparation retains explicit publication authority, the user's draft preference, optional cleanup helpers, and safeguards against discarding another actor's work.
- Kept the standalone rules in Laziness Protocol, Guard the Context Window, Exhaust the Design Space, and Encode Lessons in Structure. Upstream's shortened leaves rely on parent context or remove core operational guidance; Pi can invoke the leaves independently.
- Kept Test Behavior, Not Implementation's regression-based review. Upstream's matcher-based deletion rule wrongly treats valid absence, side-effect, property, and type checks as ineffective. `/correct` retains the same Pi policy.
- Kept all five deferred playbooks, orchestration runtime, automations, bundled `create-skill`, and setup guidance unchanged. No Cursor model rules, custom-mode UI, `/loop` wake protocol, cloud-agent invocation, or autonomous publication authority was imported.

See [Pi compatibility](pi-compat.md) for the runtime mapping and authorization policy.

## Rerunnable checks

Use existing Node.js 22 or newer, Bash, Git, and Bun. No install or live inference is needed for these checks. Keep fixture files task-scoped by setting `TMPDIR` to an existing task scratch directory.

```bash
node --check scripts/verify-upstream-sync.mjs
node --check scripts/verify-worktree-audit.mjs
node --check skills/poteto-mode/scripts/check-plan.mjs
node scripts/verify-upstream-sync.mjs
node scripts/verify-upstream-sync.mjs --upstream /path/to/task-owned/cursor-plugins-clone
node scripts/verify-decision-log.mjs
node scripts/verify-worktree-audit.mjs
bun test skills/poteto-mode/scripts/check-plan.test.ts \
  skills/poteto-mode/scripts/watch-pr/github.test.ts \
  skills/poteto-mode/scripts/watch-pr/policy.test.ts
bash -n skills/poteto-mode/scripts/worktree-audit.sh
bash -n skills/show-me-your-work/scripts/log.sh
git diff --check
```

The static verifier checks names, quoted descriptions, relative Markdown file links, conflict markers, the principle index, invocation flags, aliases, selected Pi contracts, counts, and retained files. Fenced and inline examples are ignored during link checks. It checks files, not heading fragments or remote URLs. The protected-file comparison now uses the Pi baseline above. Only ledger-listed script changes are exempted; other scripts and deferred playbooks remain protected. Setup and reviewer exclusions are frozen at the repaired baseline.

For an isolated native Pi load, use an existing SDK installation and a fresh, empty agent directory:

```bash
PI_SDK_PATH=/absolute/path/to/pi-coding-agent/dist/index.js \
PI_CODING_AGENT_DIR=/path/to/fresh-task-agent-dir PI_OFFLINE=1 \
  node scripts/verify-upstream-sync.mjs --load
```

The loader uses in-memory settings and disables ambient discovery. It loads only this checkout's skills and aliases extension. It checks the exact skill set, invocation flags, load diagnostics, and all 29 alias handlers with empty and multiline quoted arguments. Busy handlers must warn without sending a message.

## Fresh author results and limits

- Node `24.16.0`, Bun `1.4.0`, and the installed Pi `1.1.0` SDK were used for this sync. The focused Bun suite passes all 42 tests. The worktree audit fixtures pass remote-default, explicit-base, main/master fallback, and invalid-input checks.
- The isolated Pi load finds all 54 skills, zero skill diagnostics, and one package extension with zero load errors. All 29 aliases forward the expected arguments and reject simulated busy turns. No model session or inference is used.
- Plan-fence regression fixtures fail four of five tests against the Pi baseline checker and pass all five after the port. Two added pagination safety tests fail before the local hardening and pass afterward.
- Decision-log checks cover missing, empty, and existing files, headers, preservation of prior rows, one-row appends, UTC timestamps, control characters, formula-like cells, directory creation, and invalid arguments leaving files unchanged.
- The broader watcher suite could not load its CLI tests because this clean checkout lacks `commander`. Strict TypeScript checking was not run because the script toolchain and `bun-types` are not installed. No packages were installed to bypass these limits. The changed reader, policy, and plan tests run without those dependencies.

Static checks and resource loading do not prove future model compliance with skill prose. Full Pi dispatch, interactive skill expansion, agent package discovery in a live delegated session, visual rendering, real GitHub pagination, PR publication, Origin, and deferred orchestration remain unverified. No push, PR, merge, deployment, or external mutation was performed during author validation.

## Previous sync

The [0.15.15 sync](https://github.com/DBULL7/pstack-pi/pull/5) ported the delta from upstream `f5bdd6826fd0a0d9cbc4347134c3a74a200b9d9d` onto Pi `fc99b79a22dc19e3a8aecd984db807636379eb70`. The original subtree port was `25e2e7a`, tree `950b90234c17babd00c43e32b19ae50abb4720f5`, from upstream `6fecddba65801f9b9c08b8b328d998ee5b09d290:pstack`. Those historical verification results are not fresh evidence for this sync.
