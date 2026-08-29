### Orchestrate

**Deferred in pstack-pi. Do not execute the upstream Orchestrate workflow.** It assumes a standing Cursor cloud-agent program, a Cursor-specific task lifecycle, and orchestration scripts whose wake and liveness contracts have not been ported.

For bounded work, route through **figure-it-out** or **Autonomous run**. If the request genuinely requires a multi-day program, stop and report that pstack-pi does not yet provide a safe coordinator runtime for it.

Do not imitate the missing runtime with repeated polling, untracked child agents, or autonomous external actions.
