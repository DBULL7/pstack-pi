# pstack-pi

A [Pi](https://pi.dev) package that routes engineering tasks through explicit design, implementation, and verification playbooks. It ports [Lauren Tan's pstack](https://github.com/cursor/plugins/tree/main/pstack) while preserving the original subtree history and MIT license.

Describe the outcome and how to prove it. `/poteto-mode` selects a playbook, applies the relevant engineering principles, and keeps the verification evidence visible.

## Quick start

Install [Pi](https://pi.dev) and sign in to a model provider. Then install the named-agent runtime and pstack-pi globally:

```bash
pi install npm:pi-subagents
pi install git:github.com/DBULL7/pstack-pi
```

Restart Pi in the project you want to work on. Start with a real, bounded task:

```text
/poteto-mode add a --json flag to this command. Keep text output byte-identical. Verify both.
```

`/poteto-mode` chooses the workflow from the goal and finish condition. You do not need to name the underlying skills.

Run `/setup-pstack` to check the named-agent runtime, bundled profiles, and model routes.

## Learn the workflow

Read [the pstack guide](docs/guide/README.md) for a task-based tour from understanding code through verification and shipping.

Ask `/poteto-help` for a workflow recommendation or a prompt to start with. It answers help questions without starting the proposed work.

Use a focused command when you want one part of the workflow:

- `/how` traces how a subsystem works
- `/why` finds the evidence behind a design decision
- `/architect` settles types and boundaries before implementation
- `/interrogate` reviews a result adversarially
- `/tdd` reproduces a bug with a focused failing test
- `/benchmark-checklist` checks the evidence behind a performance number
- `/correct` prevents repeated agent mistakes with checks or structural changes

Pi's canonical skill syntax also works:

```text
/skill:poteto-mode investigate why this process spins while idle
```

## What gets installed

pstack-pi adds:

- Engineering skills, playbooks, and 24 named principles
- Slash-command aliases such as `/poteto-mode` and `/interrogate`
- `poteto-agent` and report-only `comment-sicko` profiles for `pi-subagents`
- Pi-specific session, delegation, Model Context Protocol (MCP), and safety guidance

The agent profiles load from the package. pstack-pi does not copy or replace files under `~/.pi/agent/agents/`.

## Optional capabilities

Install these only for workflows that need them:

```bash
# Durable background commands and unattended runs
pi install npm:pi-background-tasks

# MCP tools for issue trackers, docs, chat, and observability
pi install npm:pi-mcp-adapter
```

Restart Pi after installing an extension. See [Pi compatibility](docs/pi-compat.md) for supported, optional, and deferred workflows.

## Develop from a local checkout

Clone the repository wherever you keep source checkouts:

```bash
git clone https://github.com/DBULL7/pstack-pi.git
cd pstack-pi
pi -e .
```

The `-e` flag loads the checkout for that Pi session without adding it to your package settings. Use `/reload` after editing skills, agent profiles, or extensions.

## Update or remove

Update the package with:

```bash
pi update git:github.com/DBULL7/pstack-pi
```

Remove it with:

```bash
pi remove git:github.com/DBULL7/pstack-pi
```

`pi-subagents`, `pi-background-tasks`, and `pi-mcp-adapter` remain installed because other packages may use them.

## Compatibility

The principles and core skills run in Pi today. Some retained upstream workflows still depend on Cursor cloud agents, Graphite, or optional `cursor-team-kit` helpers. pstack-pi does not route into those workflows silently.

Read [Pi compatibility](docs/pi-compat.md) before using autonomous, cloud-agent, shipping, or Graphite playbooks.

## Updating from upstream

This repository was extracted from the `pstack/` subtree of `cursor/plugins`, so inherited commits retain upstream history. Port upstream changes in a temporary clone or worktree, then reapply the Pi compatibility layer and verify the package before merging.

See [Upstream sync](docs/upstream-sync.md) for the pinned source, Pi adaptations, exclusions, and verification commands.

## License

MIT. Copyright © 2026 Lauren Tan. See [LICENSE](LICENSE).
