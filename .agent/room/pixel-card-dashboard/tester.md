# Pixel card dashboard Tester

Duty: Owns verification evidence and regression coverage.

## Notes

- Unit coverage verifies one-time XP awards, unknown quest errors, priority defaults/preservation, streak bonus escalation, duplicate completion behavior, and pre-completed quest handling.
- Required final gates: `gsd verify --full` and `gsd validate --ready`.
- Evidence file: `.agent/evidence/pixel-card-dashboard.md`.
