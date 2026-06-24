# Add quest priority labels

## Intent

Add quest priority labels

## Problem

- Quest cards currently show title, XP reward, and completion state only.
- Players cannot quickly distinguish urgent quests from routine quests.

## User Value

- Players can scan the quest board and decide which quest to complete first.
- Priority labels make quest importance visible without changing XP rewards.

## Scope

- Quest data accepts an optional `priority` value.
- Quest board APIs preserve priority values when listing and completing quests.
- Quest cards render a visible priority label beside each quest's XP metadata.
- Starter quests include a mix of priority labels.

## Out Of Scope

- Sorting, filtering, or editing quest priority.
- Changing XP reward, completion, rank, or progress behavior.

## Acceptance Criteria

- [ ] Listed quests include their priority value.
- [ ] Completed quest results include the completed quest's priority value.
- [ ] Quests without an explicit priority default to `normal`.
- [ ] The UI displays priority labels on quest cards.
- [ ] Existing completion and XP behavior is preserved.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `npm test` to verify quest board behavior.
- Run `npm run lint` to verify JavaScript syntax.
- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
