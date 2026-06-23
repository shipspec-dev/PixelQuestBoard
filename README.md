# Pixel Quest Board

Pixel Quest Board is a small demo app built to prove the ShipSpec workflow on a fresh project.

The demo feature was:

```text
Add quest completion and XP rewards
```

ShipSpec created the feature spec, validation gate, verification evidence, review report, release handoff, done report, and dashboard. Codex implemented the feature from the ShipSpec spec.

## Screenshots

### Demo App

![Pixel Quest Board](./screenshots/pixel-quest-board.png)

### ShipSpec Dashboard

![ShipSpec Dashboard](./screenshots/shipspec-dashboard.png)

## Run The App

Open directly:

```bash
open index.html
```

Or serve locally:

```bash
python3 -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

## Run Checks

```bash
npm run lint
npm test
npm run typecheck
```

## ShipSpec Flow Used

```bash
gsd init
gsd configure
gsd agents
gsd start "Add quest completion and XP rewards"
gsd validate

# Codex implemented the feature

gsd verify --full
gsd validate --ready
gsd report
gsd release
gsd done
gsd ui
```

Generated ShipSpec artifacts are included in:

- `openspec/changes/add-quest-completion-and-xp-rewards/`
- `.agent/evidence/add-quest-completion-and-xp-rewards.md`
- `.gsd/reports/add-quest-completion-and-xp-rewards.md`
- `.gsd/releases/add-quest-completion-and-xp-rewards.md`
- `.gsd/done/add-quest-completion-and-xp-rewards.md`
- `.gsd/ui/index.html`

## Related

ShipSpec repo:

https://github.com/shipspec-dev/ShipSpec
