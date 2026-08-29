### Multi-phase or multi-PR plan

**Deferred in pstack-pi. Do not execute the upstream template.** It assumes Cursor cloud agents, `/loop`, fixed model slugs, and `cursor-team-kit` control skills.

Use the **figure-it-out** skill to design a Pi-native plan for the actual repository. The plan must:

1. Name a checkable final predicate.
2. Split work into independently verifiable units.
3. Give parallel writers separate worktrees or output directories.
4. Use named Pi agents exposed by the configured `subagent` tool.
5. Use `bg_run` only for genuinely long-running commands and rely on its completion notification rather than polling.
6. Name unit, live-surface, and performance evidence where each applies.
7. Keep pushes, PR creation, comments, merges, deployments, and other external actions behind explicit authorization.

Do not preserve upstream ceremony that does not improve the repository's actual verification story.
