---
name: setup-pstack
description: "Check pstack-pi's named-agent runtime, bundled profiles, and model routes. Use for /setup-pstack, setup diagnostics, or repairing a pstack-pi installation."
---

# Check pstack-pi setup

Verify the named-agent runtime, inspect pstack-pi's package profiles, and run a report-only smoke test.

## 1. Check the runtime

Confirm that a `subagent` tool with management actions is available. pstack-pi requires `pi-subagents` 0.62.0 or later for its bundled profiles. Package discovery arrived in 0.29.0, but 0.62.0 added the per-agent `excludeTools` setting required by `comment-sicko`. Pi core does not load agent resources from `pi.subagents.agents`; `pi-subagents` reads that key from raw package manifests.

If the tool is missing, report that delegated workflows are unavailable, provide this install command, and ask the user to restart Pi:

```bash
pi install npm:pi-subagents
```

When the tool exists, run its `doctor` action. Report the installed runtime version and any blocking issue.

For a version before 0.62.0, report this repair and ask the user to restart Pi and retry setup, even if both profiles are visible. Do not run the smoke test on that runtime:

```bash
pi update npm:pi-subagents
```

## 2. Check the package profiles

Use the `subagent` tool's `get` action to inspect:

- `poteto-agent`
- `comment-sicko`

Both profiles must report `source=package` for pstack-pi. Never copy, eject, or symlink these profiles into `~/.pi/agent/agents/` or `.pi/agents/`.

A user or project profile with the same name is an override that shadows the package profile. Report its exact path and whether it appears to be an intentional customization or a legacy copy from the old installer. Preserve it unless the user explicitly chooses to restore the package profile. Before resetting an override, read the installed `pi-subagents` agents guide and use its current supported workflow.

Confirm that the runtime's effective `comment-sicko` profile excludes the direct `write` and `edit` tools. Reading `excludeTools` from the raw Markdown is not enough: older runtimes retain it as an unknown field without enforcing it. It should inherit shell, Model Context Protocol (MCP), and nested-agent capabilities so the `how` and `why` skills can gather evidence. Its prompt must still forbid file changes and external mutations. Missing exclusions, including in a shadowing profile, block the smoke test until repaired.

If either profile is missing on a supported runtime, confirm that pstack-pi is installed and that its raw `package.json` declares `pi.subagents.agents`. Read the installed `pi-subagents` agents guide through its `guide` action. Check the `doctor` package-source counts, the pstack-pi entry from `pi list`, and the installed package root. Report the broken discovery step instead of creating a substitute profile. Do not infer agent support from Pi core's resource list because `pi-subagents` reads raw package manifests itself.

## 3. Inspect model routes

Use the runtime's `models` and `get` actions. A profile without a model override inherits the parent Pi session's active model and reasoning level.

Report the effective route for both profiles. Mark an unavailable override as invalid.

If the user asks to change a model route, read the installed `pi-subagents` models guide through its `guide` action and follow the current override workflow. Never edit a bundled package profile.

## 4. Run a smoke test

After the runtime, profile, and model checks pass, run `comment-sicko` in the foreground on one small source file or an empty diff. Explicitly tell it not to change files. Report the actual result.

Do not fabricate success when the runtime, profile, model, or child run is unavailable.

## 5. Report

Return:

- Runtime status
- Profile source and effective model route
- Smoke-test result
- Exact repair command for any failed check
