# Upstream sync through 0.15.2

## Source and baseline

| Record | Pin |
|---|---|
| Source | [cursor/plugins, pstack subtree](https://github.com/cursor/plugins/tree/f5bdd6826fd0a0d9cbc4347134c3a74a200b9d9d/pstack) |
| Upstream target | `f5bdd6826fd0a0d9cbc4347134c3a74a200b9d9d`, plugin `0.15.2` |
| Upstream baseline | `6fecddba65801f9b9c08b8b328d998ee5b09d290:pstack` |
| Original port | `25e2e7a`, tree `950b90234c17babd00c43e32b19ae50abb4720f5` |
| Pi baseline | `77a1a7b` |
| Pi package version | `0.1.0`, independent of the upstream plugin version |

The original port tree equals the upstream baseline subtree. The upstream delta contains 100 changed paths, including Cursor packaging. Integration used file-keyed records of the old, new, and current-port blobs, followed by `git merge-file` and semantic conflict review.

The resulting package has 48 skills, including 23 principles, and 23 playbook files. Five playbooks remain deferred, leaving 18 active playbooks. The verifier below regenerates these counts.

## Adaptations and exclusions

- Added Attack the Premise and Test Behavior, Not Implementation, with links from the principle index and guide.
- Applied upstream density edits, evidence labeling, schema-derived TypeScript guidance, and the shorter `why` workflow. `how` now explains only. Its two critic reference files and the guide's old mode example were removed together.
- Added `disable-model-invocation: true` to `how`, `why`, `make-bot-ui`, `typescript-best-practices`, and `unslop`. These remain available through explicit skill commands and workflow references. Kept kebab-case names and double-quoted descriptions. Did not import Cursor's TypeScript `paths` frontmatter.
- Kept Pi named-agent routing, package-managed profiles, MCP fallback handling, scoped session paths, explicit authorization, bundled `create-skill`, relative skill links, and background completion without agent polling. No Cursor model pins or `Task` configuration were imported. `swarm` stays unchanged because its upstream delta only replaces model routing and trims the output-path instruction.
- Adapted active PR guidance to resolve GitHub or Origin once and use base-branch stacks without requiring Graphite. Kept user-requested drafts, separate writable worktrees, and authorization before external mutations. The GitHub watcher remains GitHub-only. Origin commands require local CLI verification before use.
- Left `shipping`, `orchestrate`, `autopilot-full`, `autopilot-stack`, and `multi-phase-plan` byte-identical to the Pi baseline. Their newer upstream forge changes do not make their cloud-agent and autonomous landing assumptions Pi-compatible. Active routing still defers them to a bounded `figure-it-out` workflow. The verification/shipping and overnight guide pages retain their Pi boundaries.
- Left Pi setup, its guide, package metadata, agent profiles, extensions, automations, and existing runtime scripts unchanged. Excluded `.cursor-plugin/plugin.json` and `assets/logo.png`. Preserved the main README's Pi onboarding; changed only its principle count and sync link.

See [Pi compatibility](pi-compat.md) for the runtime mapping and authorization policy.

## Rerunnable checks

Run from the checkout with Node.js 22 or newer and git:

```bash
node --check scripts/verify-upstream-sync.mjs
node scripts/verify-upstream-sync.mjs
git diff --check
```

The dependency-free static check validates skill names, quoted descriptions, relative Markdown link targets, conflict markers, removed references, new principle links, invocation flags, selected Pi safety contracts, counts, and protected files against `77a1a7b`. It ignores fenced and inline code examples and the exact existing `[PR #123](url)` template placeholder in `why/references/synthesizer-prompt.md`. It checks target files, not heading fragments or remote URLs. Static prose checks do not prove model compliance.

The protected-file comparison is pinned to this sync. For a future sync, review and update that baseline and its protected paths together.

For a real isolated Pi load, use an already installed Pi SDK. Set `PI_SDK_PATH` to its `dist/index.js` if Node cannot resolve the peer package. For a global npm installation:

```bash
export PI_SDK_PATH="$(npm root -g)/@earendil-works/pi-coding-agent/dist/index.js"
PI_CODING_AGENT_DIR="$(mktemp -d)" PI_OFFLINE=1 \
  node scripts/verify-upstream-sync.mjs --load
```

This invokes Pi's `DefaultResourceLoader.reload()` with in-memory settings, all ambient resource discovery disabled, and the absolute checkout skills directory as its only added skill path. It asserts the exact discovered name set, zero diagnostics, zero extensions, and the five invocation flags. It creates no model session and performs no inference.

The following CLI smoke command is diagnostic only. It does not replace the SDK assertions:

```bash
PI_CODING_AGENT_DIR="$(mktemp -d)" PI_OFFLINE=1 \
  pi --no-extensions --no-skills --skill "$PWD/skills" \
  --no-prompt-templates --no-themes --no-context-files --no-approve \
  --list-models '__skill-load-check__'
```

On the tested Pi `0.85.1`, runtime creation loads resources before the model-list branch, but that branch reports only startup settings diagnostics. Its `No models available` output does not prove skills loaded cleanly. Use the SDK check above, not the unchanged bundled `create-skill` smoke recipe alone.

## Verification limits

The pre-sync loader found 46 skills and 21 principles with zero diagnostics and zero extensions. The post-sync loader found 48 skills and 23 principles under the same isolation, again with zero diagnostics and zero extensions. Negative fixtures confirmed that the static verifier rejects unquoted descriptions, invalid names, missing links, merge markers, and a restored Critique Mode section.

No provider inference, live PR operations, installs, or end-to-end Origin checks are part of this sync. Tests for the unchanged watcher runtime were outside scope. Its CLI was not invoked because the launcher can install dependencies. Existing Cursor-specific assumptions in retained runtime helpers and deferred workflows are not repaired by this prose sync.
