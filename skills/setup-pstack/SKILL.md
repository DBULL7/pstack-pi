---
name: setup-pstack
description: "Install pstack-pi's bundled Pi agent profiles and optionally pin their models. Use for /setup-pstack, configuring pstack model routes, or repairing the agent installation."
---

# Set up pstack-pi

Install the bundled agents, inspect available Pi models, and optionally pin routes. Do not overwrite an existing agent definition without explicit approval.

## 1. Install bundled agents

Resolve this `SKILL.md` to an absolute path. Its package root is two directories above the skill directory. Run the installer by absolute path so the user's current working directory does not affect it:

```bash
node <package-root>/scripts/install-agents.mjs
```

The script installs:

- `~/.pi/agent/agents/poteto-agent.md`. Full-capability pstack worker.
- `~/.pi/agent/agents/comment-sicko.md`. Read-only comment reviewer.

It keeps existing files unchanged. If the user explicitly asks to replace existing pstack agent definitions with the package versions, rerun with `--force` after showing the exact target paths:

```bash
node <package-root>/scripts/install-agents.mjs --force
```

Never replace unrelated agents.

## 2. Inspect model routes

Run:

```bash
pi --list-models
```

Read the installed agent frontmatter. A missing `model` field means the agent inherits the parent Pi session's active model and reasoning level.

Show the current route for each bundled agent. Mark a pinned model that no longer appears in `pi --list-models` as invalid.

## 3. Offer model pinning

Ask whether to keep parent-model inheritance or pin either agent to an available `provider/model-id` from the inspected list.

- Prefer inheritance unless the user has a clear routing policy.
- Never invent or guess a model ID.
- For `comment-sicko`, prefer a capable review model over a fast mechanical model.
- Preserve every existing frontmatter field when changing `model`.

Apply only the choices the user confirms. Removing the `model` line restores inheritance.

## 4. Verify

Confirm both files exist and have valid lowercase kebab-case names. Then use Pi's `subagent` tool for a harmless read-only smoke test:

- Agent: `comment-sicko`.
- Task: inspect one small source file or empty diff and return a report without changing anything.

Do not fabricate success if the `subagent` extension is unavailable. In that case, report that pstack-pi's skills still load but delegation workflows require Pi's subagent extension or an equivalent named-agent tool.

## 5. Report

Return:

- Installed and preserved agent paths.
- Whether each agent inherits or pins a model.
- Smoke-test result.
- Any missing dependency.

Agent definitions are discovered fresh on each subagent invocation. Skill and extension edits require `/reload`; a first package install normally requires restarting Pi.
