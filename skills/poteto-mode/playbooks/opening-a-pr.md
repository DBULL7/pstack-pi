### Opening a PR

Prepare this material at the end of a playbook. Creating or pushing a PR is an external action and requires explicit user authorization.

**Worktree.** Work from a git worktree off main. Give each writing Pi subagent its own worktree or output directory. Dirty branch with unrelated work: patch out, create a fresh worktree, and apply the patch. Never reset or clean a worktree that may contain another actor's uncommitted work.

**Commits.** Commit liberally. Rebase into small, ordered commits before opening PRs. Each commit is a future PR: landable, ordered to tell the story. Amend when the fix belongs in a just-made commit. New commit when separable. Commit bodies don't restate the subject.

**PRs.** Run a configured code-cleanup skill when one exists; `deslop` from `cursor-team-kit` is optional. Run `/no-comments` before review. Write every PR title, PR description, and commit body with `/technical-writing`, then apply `/unslop`. Apply every technical-writing layer except Diátaxis. Use one word for each action, keep articles, and avoid `-ing` when a plain verb works.

**Titles.** Conventional Commits `type(scope): subject`, no trailing period. Type such as `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, or `perf`. Scope is the area, such as `pstack` or `poteto-mode`. Subject is short, imperative, and names a real symbol when one carries the change, for example `fix(pstack): retarget opening-a-pr babysit trigger`.

**Descriptions.** The PR body is a one-minute briefing, not a lab notebook, for a reviewer who has the diff. It says why the change exists, what it leaves out, what it could break, and how you proved it works. Write short, simple sentences with few identifiers, no walls of text. The body becomes the squash commit body, so keep that commit under about 40 lines. Use `##` headings, not bold lead-ins, in this order, and drop a section with nothing to say:

- `## Why`: the problem and approach, 1–3 short sentences. No SHAs, rebase genealogy, or "based on main" preamble.
- `## What changed`: 1–3 short bullets. Name a real symbol or path only when it carries the change. Name both sides of a rename or retarget.
- `## Scope`: always. 1–3 short items on what it covers and what it deliberately leaves out (a follow-up, a known gap). No symbols, paths, or file-by-file essay.
- `## Tradeoffs`: only rejected alternatives a reviewer would otherwise ask about. Skip when there was no real choice.
- `## Blast Radius`: 1–2 sentences on who or what it touches and why that is safe or risky. If main is red, state the cost of leaving it red.
- `## Verification`: 1–3 bullets, each a real run path and its outcome. Perf: one primary number with its unit, `before → after`, and a link to the arena or swarm directory for the rest. No sample-size methodology, swarm recitals, or metric tables.

After the sections, attach videos or screenshots when they prove a claim. Full SHAs, swarm or arena lane recitals, lever-correction essays, file-by-file checklists, and "CLEAN" verdicts go in a linked artifact, not the body.

**Forge.** Resolve the forge before the first PR operation and keep that choice for create, edit, view, watch, and merge. GitHub CLI (`gh`) is the default. If `command -v origin` succeeds and Origin can resolve the repository, prefer `origin pr ...`. If Origin is absent or cannot resolve the repository, stay on `gh` and record the fallback. Do not require Graphite (`gt`). Verify the selected CLI commands with `--help` before using them.

**Built-in PR tool.** When the runtime provides a PR tool, prefer it for the operations it supports and follow its documented schema. Use the resolved forge CLI for the remaining operations. Both paths require the same user authorization. Preserve the user's draft preference and verify the resulting state.

**Size and stacks.** Prefer several narrow PRs to one large PR when each remains independently verifiable. A stack is a base-branch chain. The root PR targets trunk. Each child branch rebases onto its parent's exact tip and its PR targets the parent branch. After authorization, use the PR tool to set the parent base when available. Otherwise create a child with `origin pr create --status open --base <parent-branch>` or `gh pr create --base <parent-branch>` according to the resolved forge. Without a PR tool, retarget an existing child with `origin pr edit <pr> --base <parent-branch>` or `gh pr edit <pr> --base <parent-branch>`. Branch from trunk only for independent work. Use Graphite only when the repository already uses it. Rebase before substantial stack work only after checking that the worktree is clean and the operation cannot discard another actor's work.

**Readiness.** Unless the user asks for a draft, prepare every PR as review-ready. After explicit authorization to create it, set the requested draft state through the PR tool. Without one, use `--status open` with Origin or omit `--draft` with `gh` for a ready PR. Verify the host's actual state with `origin pr view <number>` or `gh pr view <number>` before reporting the URL or readiness.

**Babysit.** Opening a PR does not start a babysit. Post the URL and keep building. Finish the phase or stack first. Run a separate babysit pass only when the user asks for one after the whole stack exists. A babysit for each new PR stalls the build and spends checks on commits later waves restart. Push back when feedback drifts from intent.

A subagent prepares the diff, review findings, and PR text but does not push, create, or merge the PR unless the user explicitly authorized that exact external action. Return the prepared artifacts to the parent.
