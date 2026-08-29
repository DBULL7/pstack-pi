### Autonomous run

**You own the exit condition. Define done, then drive to it without stopping.** For "going to bed", "run until done", or "continue until X".

1. State the exit condition as a checkable predicate before the first iteration (tests green, repro fixed, all N local units verified, pixel-diff zero). A vague goal stalls; a predicate lets you stop.
2. Pick a Pi-native wake mechanism. An event to watch (CI, a ref advancing, a build completing) gets one `bg_run` watcher command with durable completion notification. A read-only investigation that should finish later gets `bg_delegate`. After launch, continue only independent useful work or end the turn. Never call sleep, status, or logs merely to wait; the completion notification is the wake event.
3. Each iteration makes the smallest change the evidence justifies, verifies it against the predicate, commits if it advanced, and discards changes that did not help. Revert belt-and-suspenders changes that only "might help". Sequence the work through the **sequence-verifiable-units** principle skill, verifying each unit before the next.
4. Mid-run discoveries are yours when they are local and reversible. Address broken skills, related bugs, flaky verifiers, review noise, tooling failures, orphaned follow-ups, and fixable drift through poteto-mode. Keep unrelated fixes isolated in their own commit or worktree. Ask only for genuine product choices, an external side effect, an irreversible action, or a real dead end. Return to the predicate after each side fix.
5. Checkpoint every iteration through the **show-me-your-work** skill, one row for what changed and whether the predicate moved. A run with no trail cannot be audited or resumed.
6. Stop when the predicate is met. A plateau is not success. Change the approach when evidence supports another one, and surface a genuine dead end rather than spinning or relaxing the predicate.

**Reply:** the exit condition, iterations run, what landed locally, what was discarded, background task state when relevant, and final predicate state.
