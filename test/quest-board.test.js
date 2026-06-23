import assert from "node:assert/strict";
import { test } from "node:test";

import { createQuestBoard } from "../src/quest-board.js";

test("completing an open quest marks it complete and awards its XP once", () => {
  const board = createQuestBoard([
    { id: "gather-herbs", title: "Gather herbs", xp: 25 },
    { id: "map-cave", title: "Map the cave", xp: 40 },
  ]);

  const result = board.completeQuest("gather-herbs");

  assert.deepEqual(result, {
    quest: {
      id: "gather-herbs",
      title: "Gather herbs",
      xp: 25,
      completed: true,
    },
    xpAwarded: 25,
    totalXp: 25,
  });
  assert.equal(board.getTotalXp(), 25);
  assert.deepEqual(board.listQuests(), [
    { id: "gather-herbs", title: "Gather herbs", xp: 25, completed: true },
    { id: "map-cave", title: "Map the cave", xp: 40, completed: false },
  ]);

  const duplicateResult = board.completeQuest("gather-herbs");

  assert.equal(duplicateResult.xpAwarded, 0);
  assert.equal(duplicateResult.totalXp, 25);
  assert.equal(board.getTotalXp(), 25);
});

test("completing an unknown quest reports a clear failure", () => {
  const board = createQuestBoard([
    { id: "gather-herbs", title: "Gather herbs", xp: 25 },
  ]);

  assert.throws(
    () => board.completeQuest("missing-quest"),
    /Unknown quest: missing-quest/,
  );
  assert.equal(board.getTotalXp(), 0);
});
