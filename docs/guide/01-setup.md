# Set up pstack-pi

Install the package, install its named Pi agents, and run a first task.

## Install the package

```bash
pi install git:github.com/DBULL7/pstack-pi
```

Restart Pi so the package extension and skills load.

## Install the bundled agents

Run:

```text
/setup-pstack
```

The setup skill installs `poteto-agent` and `comment-sicko` under `~/.pi/agent/agents/`. Existing files are preserved. The profiles inherit the parent session's active model unless you explicitly pin a valid model from `pi --list-models`.

Pi discovers agent-file changes on each subagent invocation. Use `/reload` after editing package skills or extensions.

## Optional verification skill

If the project has no way to drive its real user surface, run:

```text
/create-verification-skill
```

The generator writes `.pi/skills/verify-<app>/`, including launch, doctor, drive, evidence, cleanup, and feature-map instructions. It proves one mapped feature before handing the skill over.

## Run your first task

Pick something real but small:

```text
/poteto-mode add a --json flag to this command. Keep text output byte-identical. Verify both.
```

`/poteto-mode` is a package command alias. Pi's canonical form is also available:

```text
/skill:poteto-mode add a --json flag to this command
```

Next: [Route work through `/poteto-mode`](./02-poteto-mode.md).
