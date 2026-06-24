Use $shipspec.

Active change: Add quest streak bonus rewards
Slug: add-quest-streak-bonus-rewards

You are in Codex Plan mode. Use ShipSpec as the source of truth and prepare a plan before coding.

Read these ShipSpec files:

- openspec/changes/add-quest-streak-bonus-rewards/proposal.md
- openspec/changes/add-quest-streak-bonus-rewards/tasks.md
- .gsd/reasoning/add-quest-streak-bonus-rewards.md
- .gsd/operations/add-quest-streak-bonus-rewards.md
- .agent/room/add-quest-streak-bonus-rewards/handoff.md

In Codex Plan mode:

- Summarize the requested scope in plain language.
- Identify likely affected files and project areas.
- Propose implementation steps.
- Propose focused tests and verification commands.
- Call out risks, assumptions, and open questions.
- Wait for approval before coding.

Safety boundaries:

- Do not deploy.
- Do not access secrets.
- Do not make unrelated refactors.
- Do not edit generated ShipSpec evidence by hand.
- Keep changes scoped to the active ShipSpec change.

After implementation, verify with:

- gsd verify --full
- gsd validate --ready
- gsd report
