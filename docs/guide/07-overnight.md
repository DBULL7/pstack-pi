# Run unattended work in Pi

An unattended run needs a checkable finish condition, isolated work, durable evidence, and a real wake mechanism. Time spent is not a finish condition.

This workflow requires `pi-background-tasks`. Install it with `pi install npm:pi-background-tasks`, then restart Pi.

## Trust the workflow before repeating it

Before leaving a run unattended, check that it can:

- Explain the goal and the check for done.
- Reproduce the problem or establish a baseline on the real surface.
- Make one bounded change and prove its effect.
- Recover from a failed attempt and leave evidence you can inspect.

Build a [verification skill](./06-verify-and-ship.md#create-a-project-verification-skill) first when the agent has no reliable way to drive the app. Repetition does not fix a workflow that cannot check its own work.

## State the predicate

Use something the agent can prove true or false:

```text
/poteto-mode keep going until the targeted tests pass and the original repro no longer fails. Keep a decision trail. Do not push, open, or merge a PR.
```

Good predicates include:

- A named test command exits successfully.
- A measured regression falls below a stated threshold.
- Every item in a fixed manifest has a verified result.
- A pixel diff reaches zero against an immutable baseline.

## Use Pi background tasks correctly

Use `bg_run` for long-running commands such as builds, tests, watchers, and servers. Use `bg_delegate` for bounded read-only investigation that should finish later.

Default background tasks send a durable terminal notification and wake a follow-up turn. After launching one, continue only independent useful work or end the turn. Never call sleep, status, or logs merely to wait for completion.

A CI watcher or ref watcher should be one real command with a terminal verdict. Do not build a second polling loop around it.

## Leave an audit trail

Use `/show-me-your-work` for long or unattended tasks. Each iteration records:

- The hypothesis or decision.
- The evidence collected.
- What changed.
- Whether the predicate moved.
- What was discarded.

Keep external actions out of the unattended contract unless the user explicitly authorized each class of action. Local commits and worktrees are reversible. Pushes, PR changes, merges, deployments, messages, and ticket mutations are external.

## Stop honestly

Stop when the predicate passes. A plateau is not success. Change approach when evidence supports it, or report a genuine dead end with the failed hypotheses and artifacts. Never weaken the predicate to manufacture completion.

When you need to interrupt the work, say "pause safely". The [Pause safely playbook](../../skills/poteto-mode/playbooks/pause-safely.md) finishes the current atomic step, preserves local work, and records what a new session needs to resume. It also applies to an explicit pause, going offline, or a restart; "going to bed, keep going" means continue within the agreed scope.

Next: [Principles](./08-principles.md).
