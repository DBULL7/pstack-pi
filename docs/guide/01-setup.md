# Set up pstack-pi

Install pstack-pi and its named-agent runtime, verify the profiles, and run a first task.

## Before you start

Install [Pi](https://pi.dev) and sign in to a model provider. Run the following commands from any directory.

## Install the runtime and package

```bash
pi install npm:pi-subagents
pi install git:github.com/DBULL7/pstack-pi
```

`pi-subagents` provides named agents and parallel workflows. Use version 0.62.0 or later so it can discover pstack-pi's package profiles and enforce `comment-sicko`'s `write` and `edit` tool exclusions.

Pi core does not load agent resources from `pi.subagents.agents`. `pi-subagents` reads that key from pstack-pi's raw package manifest. Restart Pi so both extensions load.

## Check the setup

Run:

```text
/setup-pstack
```

The setup check runs runtime diagnostics and confirms that both package profiles are visible. It reports their model routes and runs a report-only smoke test. The profiles inherit your active Pi model unless you configure an override.

Both profiles must report `source=package`. A user or project profile is an override and shadows the package profile. Never copy or symlink pstack-pi's agents into `~/.pi/agent/agents/` or `.pi/agents/`.

If `pi-subagents` is older than 0.62.0, update the runtime even if both profiles are visible:

```bash
pi update npm:pi-subagents
```

Restart Pi, then run `/setup-pstack` again. If a profile is missing on version 0.62.0 or later, inspect the pstack-pi package installation and the `pi-subagents` package discovery settings. Do not create a user profile as a workaround. The smoke test requires the runtime's effective `comment-sicko` profile to exclude `write` and `edit`.

## Add optional capabilities

Install background-task support for unattended workflows:

```bash
pi install npm:pi-background-tasks
```

Install the Model Context Protocol (MCP) adapter when `/why` should search connected issue trackers, documents, chat, or observability tools:

```bash
pi install npm:pi-mcp-adapter
```

Restart Pi after installing either extension.

## Run your first task

Pick something real but small, and state how to verify it:

```text
/poteto-mode add a --json flag to this command. Keep text output byte-identical. Verify both.
```

`/poteto-mode` is a package command alias. Pi's canonical form is also available:

```text
/skill:poteto-mode add a --json flag to this command
```

Next: [Route work through `/poteto-mode`](./02-poteto-mode.md).
