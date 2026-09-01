---
name: setup-pstack
description: "Check pstack-pi's named-agent runtime, bundled profiles, and model routes. Use for /setup-pstack, setup diagnostics, or repairing a pstack-pi installation."
---

# Check pstack-pi setup

Verify the named-agent runtime, inspect pstack-pi's package profiles, and run a report-only smoke test. Do not copy package profiles into user or project agent directories.

## 1. Check the runtime

Confirm that a `subagent` tool with management actions is available. pstack-pi uses the `pi-subagents` package:

```bash
pi install npm:pi-subagents
```

If the tool is missing, report the install command and ask the user to restart Pi. Do not claim that delegated workflows are available.

When the tool exists, run its `doctor` action and report any blocking runtime issue.

## 2. Check the package profiles

Use the `subagent` tool's `get` action to inspect:

- `poteto-agent`
- `comment-sicko`

Both profiles should report pstack-pi as their package source. Package profiles update with pstack-pi and must not be copied or ejected into `~/.pi/agent/agents/` or `.pi/agents/` during setup.

A user or project profile with the same name shadows the package profile. Report its exact path and whether it appears to be an intentional customization or a legacy copy from the old installer. Preserve it unless the user explicitly chooses to restore the package profile. Before resetting an override, read the installed `pi-subagents` agents guide and use its current supported workflow.

Confirm that `comment-sicko` excludes the direct `write` and `edit` tools. It should inherit shell, Model Context Protocol (MCP), and nested-agent capabilities so the `how` and `why` skills can gather evidence. Its prompt must still forbid file changes and external mutations. Treat a shadowing profile with `write` or `edit` as an unsafe mismatch.

If either profile is missing, confirm that pstack-pi is installed, then ask the user to update pstack-pi and restart Pi. Do not create a substitute profile silently.

## 3. Inspect model routes

Use the runtime's `models` and `get` actions. A profile without a model override inherits the parent Pi session's active model and reasoning level.

Report the effective route for both profiles. Mark an unavailable override as invalid.

If the user asks to change a model route, read the installed `pi-subagents` models guide through its `guide` action and follow the current override workflow. Never edit a bundled package profile.

## 4. Run a smoke test

Run `comment-sicko` in the foreground on one small source file or an empty diff. Explicitly tell it not to change files. Report the actual result.

Do not fabricate success when the runtime, profile, model, or child run is unavailable.

## 5. Report

Return:

- Runtime status
- Profile source and effective model route
- Smoke-test result
- Exact repair command for any failed check
