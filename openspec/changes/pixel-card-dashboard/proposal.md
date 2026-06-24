# Pixel card dashboard

## Intent

Pixel card dashboard

## Problem

- The demo quest board should present the quest workflow as a complete pixel-card dashboard, not just a plain list of completable quests.
- Players need visible progress, priority, streak, rank, and XP feedback while completing quests.

## User Value

- Users can scan quest priority and XP rewards quickly.
- Users get immediate progress, rank, streak, and completion feedback after each quest action.
- Reviewers can verify the dashboard behavior through focused unit checks and ShipSpec evidence.

## Scope

- Add dashboard state for quest priority labels and completion streaks.
- Render progress, rank, total XP, streak, quest cards, and status messaging in the demo UI.
- Keep direct `file://` opening behavior aligned with the served module implementation.
- Preserve the existing quest completion and one-time XP award behavior.
- Record verification evidence through the ShipSpec workflow.

## Out Of Scope

- Persistent storage, user accounts, backend APIs, and deployment.
- New quest creation or editing workflows.
- Changes outside the local demo app and active ShipSpec artifacts.

## Acceptance Criteria

- [x] The expected pixel-card dashboard behavior is implemented.
- [x] Existing quest completion behavior is preserved.
- [x] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
