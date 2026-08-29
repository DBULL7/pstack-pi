# pstack-pi

A Pi-native port of [Lauren Tan's pstack](https://github.com/cursor/plugins/tree/main/pstack). pstack is a set of rigorous engineering skills built around a simple idea: go deep first, write less code, and prove the result against the real artifact.

This repository preserves pstack's subtree history and MIT license. Lauren Tan is the original author. The Pi packaging, runtime adapters, and safety changes are maintained in this fork.

## Status

The principles and core skills load in Pi today. Cursor-specific orchestration is being ported incrementally. Read [Pi compatibility](docs/pi-compat.md) before using autonomous, cloud-agent, shipping, or Graphite playbooks.

## Install

Install globally so the skills and command aliases are available in every project:

```bash
pi install git:github.com/DBULL7/pstack-pi
```

Restart Pi, then install the bundled subagent profiles:

```text
/setup-pstack
```

The setup is idempotent and does not replace existing agent files unless you explicitly request it.

To try a local checkout while developing:

```bash
git clone https://github.com/DBULL7/pstack-pi.git ~/Projects/pstack-pi
pi install ~/Projects/pstack-pi
```

Use `/reload` after editing skills or extensions.

## Start here

Run poteto-mode for non-trivial engineering work:

```text
/poteto-mode add a --json flag to this command. Keep text output byte-identical. Verify both.
```

Pi's canonical skill command also works:

```text
/skill:poteto-mode investigate why this process spins while idle
```

Useful focused commands include:

```text
/how explain the request path through this subsystem
/why find the evidence for this design decision
/architect settle the types and module boundaries first
/interrogate review this diff adversarially
/arena produce competing designs and synthesize the strongest
/swarm inspect every package in parallel
/no-comments review this diff's comments and suppressions
/tdd reproduce this regression with a cheap local test first
```

## Pi integration

pstack-pi includes:

- 45 upstream skills and playbooks.
- 21 focused engineering principles.
- Pi slash-command aliases such as `/poteto-mode` and `/interrogate`.
- `poteto-agent` and read-only `comment-sicko` Pi agent definitions.
- An idempotent agent installer invoked by `/setup-pstack`.
- A bundled `/create-skill` replacement for Cursor's built-in authoring workflow.
- Pi session, delegation, MCP, and safety guidance.

Pi's canonical `/skill:<name>` syntax remains available for every skill, including skills without short aliases.

## Differences from upstream

- Cursor `Task` fan-out maps to Pi's named `subagent` agents.
- Model routing lives in Pi agent frontmatter rather than per-call Cursor model slugs.
- Active transcripts come from `$PI_SESSION_FILE`; prior sessions live under `~/.pi/agent/sessions/`.
- Cursor's `/loop`, cloud-agent environments, and Benny automations do not have direct Pi equivalents.
- `cursor-team-kit` helpers are optional and are never assumed to exist.
- External actions require explicit authorization, even when they are technically reversible.

See [docs/pi-compat.md](docs/pi-compat.md) for the complete mapping and deferred workflows.

## Updating from upstream

This repository was extracted from the `pstack/` subtree of `cursor/plugins`, so its inherited commits retain upstream history. Port upstream changes in a temporary clone or worktree, then reapply the Pi compatibility layer and verify the package before merging.

Upstream source:

```text
https://github.com/cursor/plugins/tree/main/pstack
```

## License

MIT. Copyright © 2026 Lauren Tan. See [LICENSE](LICENSE).
