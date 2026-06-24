# Pixel card dashboard Verification Evidence

Mode: full
Generated: 2026-06-24T15:43:15.918Z

## Summary

Verified:
- lint passed
- unit passed
- typecheck passed
- e2e passed

Skipped:
- None

Risk:
- No verification risks detected from configured checks.

## Checks

### lint

Command: `npm run lint`
Result: pass
Required: yes

```text
> pixel-quest-board@0.1.0 lint
> node --check src/quest-board.js && node --check src/app.js && node --check test/quest-board.test.js
```

### unit

Command: `npm test`
Result: pass
Required: yes

```text
> pixel-quest-board@0.1.0 test
> node --test

✔ completing an open quest marks it complete and awards its XP once (1.399292ms)
✔ completing an unknown quest reports a clear failure (0.183959ms)
✔ quest priority labels are preserved and default to normal (0.080417ms)
✔ quest completions build a streak and award escalating bonus XP (0.086917ms)
✔ completed quests do not increase streak or award duplicate bonus XP (0.068459ms)
✔ initial completed quests keep base XP but do not seed the active streak (0.062166ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 87.177708
```

### typecheck

Command: `npm run typecheck`
Result: pass
Required: yes

```text
> pixel-quest-board@0.1.0 typecheck
> node --check src/quest-board.js && node --check src/app.js && node --check test/quest-board.test.js
```

### e2e

Command: `npm run test:e2e`
Result: pass
Required: no

```text
> pixel-quest-board@0.1.0 test:e2e
> node --test

✔ completing an open quest marks it complete and awards its XP once (1.428667ms)
✔ completing an unknown quest reports a clear failure (0.195666ms)
✔ quest priority labels are preserved and default to normal (0.080667ms)
✔ quest completions build a streak and award escalating bonus XP (0.086333ms)
✔ completed quests do not increase streak or award duplicate bonus XP (0.072541ms)
✔ initial completed quests keep base XP but do not seed the active streak (0.064084ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 86.63275
```

