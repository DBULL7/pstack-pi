### Opening a PR

Prepare this material at the end of a playbook. Creating or pushing a PR is an external action and requires explicit user authorization.

**Worktree.** Work from a git worktree off main. Give each writing Pi subagent its own worktree or output directory. Dirty branch with unrelated work: patch out, create a fresh worktree, and apply the patch. Never reset or clean a worktree that may contain another actor's uncommitted work.

**Commits.** Commit liberally; rebase into small, ordered commits before opening PRs. Each commit is a future PR: landable, ordered to tell the story. Amend when the fix belongs in a just-made commit; new commit when separable.

**PRs.** Run a configured code-cleanup skill when one exists; `deslop` from `cursor-team-kit` is optional. Run `/no-comments` before review. Write every PR title, PR description, and commit body with `/technical-writing`, then apply `/unslop`. Apply every technical-writing layer except Diátaxis. Use one word for each action, keep articles, and avoid `-ing` when a plain verb works.

**Titles.** Use Conventional Commits in the form `type(scope): subject`. Use `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, or `perf` as the type. Use the changed area, such as `pstack` or `poteto-mode`, as the scope. Keep the subject short and imperative. Apply the same `/technical-writing` and `/unslop` pass as the body. Name a real symbol when one carries the change. For example, `fix(pstack): retarget opening-a-pr babysit trigger`. Do not add a trailing period.

**Descriptions.** Use these sections in order. Drop a section when it is empty.

- `## Why`. State the intent and why this approach fits.
- `## Scope`. State facts from the diff. Name real symbols and paths. Name both sides of a rename or retarget. State what is in and out when the boundary matters.
- `## Tradeoffs`. State real choices only. Skip this section when there are none.
- `## Blast Radius`. State who and what the change touches. Explain why the change is safe or risky. If main is red without the fix, name the continuing cost.
- `## Verification`. State how you ran each check and its rigor. Name the real path, such as `control-cli`, `control-ui`, or the targeted tests. State the outcome of each check, not only the command name.

After these sections, attach videos or screenshots when they prove a claim. Do not use `## Summary` or `## Test plan` boilerplate. A commit body does not restate its subject.

**Size and stacks.** Prefer several narrow PRs to one large PR when each remains independently verifiable. Use Graphite only when the repository already uses it; otherwise use ordinary branches and the host's normal PR relationships. Branch from main only for independent work. Rebase on `main` before substantial stack work only after checking that the worktree is clean and the operation cannot discard another actor's work.

**Readiness.** Unless the user asks for a draft, prepare every PR as review-ready. After explicit authorization to create it, verify the host's actual state before reporting the URL or readiness.

**Babysit.** Opening a PR does not start a babysit. Post the URL and keep building. Finish the phase or stack first. Run a separate babysit pass only when the user asks for one after the whole stack exists. A babysit for each new PR stalls the build and spends checks on commits that later waves restart. Push back when feedback drifts from intent.

A subagent prepares the diff, review findings, and PR text but does not push, create, or merge the PR unless the user explicitly authorized that exact external action. Return the prepared artifacts to the parent.
