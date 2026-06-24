# Add quest priority labels Tester

Duty: Owns verification evidence and regression coverage.

## Notes

- Added `quest priority labels are preserved and default to normal` in `test/quest-board.test.js`.
- Confirmed the new test failed before implementation because listed quests omitted `priority`.
- `gsd verify` passed lint, unit, and typecheck and wrote `.agent/evidence/add-quest-priority-labels.md`.
- In-app browser QA was attempted against `http://127.0.0.1:4173`, but the browser runtime reported `iab` unavailable.
