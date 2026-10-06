---
name: poteto-help
description: "Answer questions about pstack-pi setup, prompting, skills, playbooks, and principles. Type /poteto-help with a question to get guidance without starting the proposed work."
disable-model-invocation: true
---

# Poteto help

Answer the user's question about pstack-pi, hand them a prompt they can send, and link the file the answer came from. A help question does not authorize the work it asks about. Let the user send the proposed prompt before starting that work, installing packages, changing configuration, or launching agents.

A message that asks for work, such as "use pstack to fix this bug", is not a help question. Read [`poteto-mode`](../poteto-mode/SKILL.md) and do the work within its authorized scope.

This file maps questions to the skills and guide pages that own the details. Read the file you route to before you answer, and trust it when it disagrees with this map. Prefer links to the local files you read. Link a public copy only after verifying that it exists and matches the Pi port.

## Find out what they need

Infer the need from the message and conversation. A named situation, such as "which skill reviews a PR?", goes straight to its section. If the need is unclear, ask one question with these choices:

- Get set up
- Start a task with `/poteto-mode`
- Pick a skill for a situation
- Fix a run that went wrong
- Make pstack my own

Check only the state that changes the answer. A missing `subagent` tool means the named-agent runtime is unavailable in this session; it does not prove the package was never installed. An unknown profile source or model route is a reason to suggest [`/setup-pstack`](../setup-pstack/SKILL.md), not to invent a route. A missing `verify-*` skill or app harness is a reason to mention `/create-verification-skill` when the question is about proving a change works.

For a new user, or a setup or cost question where the runtime or model route is unknown, ask at most once per chat whether they want to check setup now or later. If now, give them `/setup-pstack` to type and answer their question too. If later, answer from the documented defaults and label the live setup unverified. Combine this with the question about their need when both are unclear.

## Get set up

1. Install Pi and sign in to a model provider.
2. Install `pi-subagents` with `pi install npm:pi-subagents` and this package with `pi install git:github.com/DBULL7/pstack-pi`, then restart Pi.
3. Run [`/setup-pstack`](../setup-pstack/SKILL.md) to check the runtime, package-managed profiles, model routes, and a report-only smoke test.
4. Start a real task with `/poteto-mode`, a goal, and a check that can pass or fail.

The [README](../../README.md) and [setup guide](../../docs/guide/01-setup.md) own the details. The bundled aliases forward to Pi's `/skill:<name>` syntax. If aliases are unavailable, use `/skill:poteto-help` or `/skill:setup-pstack`. Project-generated skills use `/skill:<name>` unless the project supplies its own aliases.

If cost is the worry, explain where the tokens go. Parallel attempts and review panels use more inference. A focused skill or smaller panel may fit the task better than a full workflow. Pi agent profiles and runtime overrides select models; profiles with no override inherit the parent session's model and reasoning level. To change a route, follow `/setup-pstack` and the installed runtime's models guide. Do not edit bundled profiles or pass a model field to an individual `subagent` call.

Read [Pi compatibility](../../docs/pi-compat.md) before recommending background work, MCP, or a workflow retained from upstream. These capabilities depend on the installed Pi extensions.

## Start a task with `/poteto-mode`

`/poteto-mode` matches the task to a playbook, opens a checklist, and runs the skills its steps need. A skipped step stays visible with `skip: <reason>`. A good prompt states the goal and how to tell it is done. Read [`references/prompting.md`](references/prompting.md) before helping word one. [Guide page 2](../../docs/guide/02-poteto-mode.md) has examples.

Follow-ups can be short while the conversation holds the task. Start a new task with `/poteto-mode`; load it again if the session loses the workflow context. Say "new task" to re-match the playbook. Pi does not provide Cursor's Custom Mode UI, so do not suggest Option+Enter, Use as Mode, or `/in-cloud`.

For delegated work, pstack-pi uses named Pi agents, including `agent: "poteto-agent"`. Each writing agent gets its own worktree or output directory. Background commands use Pi's completion notifications, not a `/loop` command.

## Pick a skill

The default for nontrivial engineering work is `/poteto-mode`. Name a focused skill when the user wants one part of the workflow. Read the skill before recommending it and give one example prompt.

| The user wants to | Skill |
|---|---|
| Do a task with design, implementation, and proof | [`/poteto-mode`](../poteto-mode/SKILL.md) |
| Know how code works now | [`/how`](../how/SKILL.md) |
| Know why code is shaped this way | [`/why`](../why/SKILL.md) |
| Understand a change or subsystem plainly | [`/teach`](../teach/SKILL.md) |
| Catch up on recent work in this project | [`/recall`](../recall/SKILL.md) |
| Find what a diff could break outside itself | [`/blast-radius`](../blast-radius/SKILL.md) |
| Settle types and module boundaries before code | [`/architect`](../architect/SKILL.md) |
| Compare several attempts at the same brief | [`/arena`](../arena/SKILL.md) |
| Run parallel coverage checks or races | [`/swarm`](../swarm/SKILL.md) |
| Have independent reviewers challenge a diff | [`/interrogate`](../interrogate/SKILL.md) |
| Fix a bug test-first when a cheap test exists | [`/tdd`](../tdd/SKILL.md) |
| Apply the TypeScript rules | [`/skill:typescript-best-practices`](../typescript-best-practices/SKILL.md) |
| Review comments before code review | [`/no-comments`](../no-comments/SKILL.md) |
| Remove AI tells from prose | [`/unslop`](../unslop/SKILL.md) |
| Write or review docs, RFCs, or PR descriptions | [`/technical-writing`](../technical-writing/SKILL.md) |
| Hear the last reply in plain words | [`/bro`](../bro/SKILL.md) |
| Generate an app verification skill | [`/create-verification-skill`](../create-verification-skill/SKILL.md) |
| Keep a verification skill accurate | [`/maintain-verification-skill`](../maintain-verification-skill/SKILL.md) |
| Vet a measured performance number | [`/benchmark-checklist`](../benchmark-checklist/SKILL.md) |
| Design a workflow for a large or unusual task | [`/figure-it-out`](../figure-it-out/SKILL.md) |
| Keep and audit a decision log | [`/show-me-your-work`](../show-me-your-work/SKILL.md) |
| Check runtime, profiles, and model routes | [`/setup-pstack`](../setup-pstack/SKILL.md) |
| Turn personal working habits into a skill | [`/automate-me`](../automate-me/SKILL.md) |
| Turn session lessons into proposed skill edits | [`/reflect`](../reflect/SKILL.md) |
| Prevent repeated mistakes in this repository | [`/correct`](../correct/SKILL.md) |
| Author a skill for Pi | [`/create-skill`](../create-skill/SKILL.md) |
| Build a page that wakes a Grok Bot over a webhook | [`/make-bot-ui`](../make-bot-ui/SKILL.md) |
| Find their way around pstack-pi | `/poteto-help` |

If an installed skill is missing from the table, read its frontmatter and route by its description. Principles are covered below.

Close calls:

- `/how` explains mechanics. `/why` explains reasons. `/teach` uses one or both to explain plainly.
- `/arena` repeats a brief and synthesizes a design. `/swarm` splits coverage or runs declared race arms.
- `/architect` proceeds into implementation by default. Add "with checkpoint" to review the design first.
- `/interrogate` reviews the diff. `/blast-radius` follows breakage beyond it and proves the key safety claim.
- `/recall` rebuilds context across this project's recent chats. Session pickup resumes one particular run or branch.

## Playbooks and principles

Playbooks live inside `/poteto-mode`; they have no separate slash commands. Describing the task selects one. "babysit this PR" drives it toward merge-ready, while "check on PR 123" asks for one status pass. Creating, pushing, commenting on, or merging a PR still requires the relevant explicit authorization.

Upstream Shipping, Orchestrate, Autopilot-full, Autopilot-stack, and Multi-phase plan are deferred in Pi. For landing, a queue, or a plan across several PRs, use [`/figure-it-out`](../figure-it-out/SKILL.md) to design a bounded Pi-native workflow. A planning request produces a plan, not implementation or external PR actions. [Guide page 4](../../docs/guide/04-design.md#plan-after-the-design-settles) gives an example.

`/loop` is not a Pi command. `deslop`, `control-cli`, and `control-ui` are optional `cursor-team-kit` skills, not package dependencies. The bundled `create-skill` handles Pi skill authoring. Read the [compatibility guide](../../docs/pi-compat.md) for supported alternatives.

Principles are small skills that `/poteto-mode` reads and cites when applicable. Steer with a name, such as "apply Prove It Works; show me the real output", or explicitly load `/skill:principle-<name>`. [Guide page 8](../../docs/guide/08-principles.md) lists them.

## Fix a run that went wrong

| Symptom | Next step |
|---|---|
| The session lost the workflow | Invoke `/poteto-mode` again with the goal and current checkpoint. |
| A question became the next step of the old task | Say "new task" and state whether it is read-only. |
| The wrong model ran | Use `/setup-pstack` to inspect effective profiles and overrides. |
| Runs cost more than expected | Use a focused skill, fewer review attempts, or an appropriate model route. |
| A slash alias is unavailable | Use `/skill:<name>` and check package loading with `/setup-pstack`. |
| Parallel agents overwrote each other | Give each writing agent its own worktree or output directory. |
| Unattended work made no progress | Give it a checkable predicate and verify the background runtime. See [guide page 7](../../docs/guide/07-overnight.md). |
| Success rests only on a green build | Ask for the real command, flow, stored value, or profile. |

[`references/prompting.md`](references/prompting.md) has short steers. [Guide page 10](../../docs/guide/10-recipes-and-pitfalls.md) has recipes and pitfalls.

## Make pstack my own

- `/automate-me` drafts a personal skill from this project's history.
- `/reflect` proposes skill edits from a session for the user to approve.
- `/correct` prevents recurring mistake classes in the repository.
- `/poteto-mode write a skill for <workflow>` uses the authoring playbook. The eval playbook tests the resulting behavior.

[Guide page 9](../../docs/guide/09-make-it-yours.md) covers each. Fix a misbehaving skill in its own change rather than hiding it in unrelated feature work.

## Reply

Lead with the answer. Give at most one example prompt, adapted from [`references/recipes.md`](references/recipes.md), then link the source you read. Keep it short unless the user asks for the whole map.
