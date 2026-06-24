# Add quest priority labels Builder

Duty: Owns implementation inside the validated ShipSpec contract.

## Notes

- Added `priority` preservation to `src/quest-board.js`; missing priorities default to `normal`.
- Mirrored the same default/copy behavior in the direct-file-open fallback in `src/app.js`.
- Added starter quest priorities and rendered compact priority labels in each quest card.
- Styled `normal`, `high`, and `urgent` labels in `src/styles.css`.
