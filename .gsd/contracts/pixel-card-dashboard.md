# Pixel card dashboard Contract

## Acceptance Criteria

- [x] The active ShipSpec proposal acceptance criteria are satisfied.
- [x] The implementation stays inside the validated scope.

## Files Likely Affected

- `index.html`
- `src/app.js`
- `src/quest-board.js`
- `src/styles.css`
- `test/quest-board.test.js`
- Active ShipSpec evidence, reports, and room notes

## Test Plan

- Run `npm run lint`.
- Run `npm test`.
- Run `npm run typecheck`.
- Run `npm run test:e2e`.
- Run `gsd verify --full` before review or release.
- Run `gsd validate --ready` before review or release.

## Definition Of Done

- [x] Spec validates with `gsd validate`.
- [x] Verification evidence exists.
- [x] Review report exists.
- [x] Release handoff exists.
- [x] Done report exists.

## Risks

- The initial request is terse, so scope is inferred from the existing quest board demo.
- UI verification relies on the configured local checks unless a browser screenshot pass is run separately.
- No migrations or external services are involved.

## Approval Gates

- [x] Human approved scope by requesting implementation of the active ShipSpec mission.
- [x] Human approved release readiness by requesting the active mission be implemented through the ShipSpec gates.
