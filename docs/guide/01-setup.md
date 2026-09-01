# Set up pstack-pi

Install pstack-pi and its named-agent runtime, verify the profiles, and run a first task.

## Before you start

Install [Pi](https://pi.dev) and sign in to a model provider. Run the following commands from any directory.

## Install the runtime and package

```bash
pi install npm:pi-subagents
pi install git:github.com/DBULL7/pstack-pi
```

`pi-subagents` provides named agents and parallel workflows. pstack-pi provides the skills, command aliases, and agent profiles.

Restart Pi so both extensions load.

## Check the setup

Run:

```text
/setup-pstack
```

The setup check runs runtime diagnostics and confirms that both package profiles are visible. It reports their model routes and runs a report-only smoke test. The profiles inherit your active Pi model unless you configure an override.

pstack-pi loads its profiles from the package. It does not copy or replace files under `~/.pi/agent/agents/`.

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
