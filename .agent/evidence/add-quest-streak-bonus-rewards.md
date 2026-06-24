# Add quest streak bonus rewards Verification Evidence

Mode: full
Generated: 2026-06-24T09:27:27.327Z

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

✔ completing an open quest marks it complete and awards its XP once (1.399041ms)
✔ completing an unknown quest reports a clear failure (0.189916ms)
✔ quest priority labels are preserved and default to normal (0.08ms)
✔ quest completions build a streak and award escalating bonus XP (0.085292ms)
✔ completed quests do not increase streak or award duplicate bonus XP (0.072ms)
✔ initial completed quests keep base XP but do not seed the active streak (0.057583ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 89.303542
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

✔ completing an open quest marks it complete and awards its XP once (1.447083ms)
✔ completing an unknown quest reports a clear failure (0.344542ms)
✔ quest priority labels are preserved and default to normal (0.103625ms)
✔ quest completions build a streak and award escalating bonus XP (0.096333ms)
✔ completed quests do not increase streak or award duplicate bonus XP (0.075416ms)
✔ initial completed quests keep base XP but do not seed the active streak (0.060584ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 95.042958
```

