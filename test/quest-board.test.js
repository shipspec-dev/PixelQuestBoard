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
      priority: "normal",
      completed: true,
    },
    baseXpAwarded: 25,
    streakBonusAwarded: 0,
    xpAwarded: 25,
    totalXp: 25,
    currentStreak: 1,
  });
  assert.equal(board.getTotalXp(), 25);
  assert.deepEqual(board.listQuests(), [
    {
      id: "gather-herbs",
      title: "Gather herbs",
      xp: 25,
      priority: "normal",
      completed: true,
    },
    {
      id: "map-cave",
      title: "Map the cave",
      xp: 40,
      priority: "normal",
      completed: false,
    },
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

test("quest priority labels are preserved and default to normal", () => {
  const board = createQuestBoard([
    {
      id: "seal-rift",
      title: "Seal the rift",
      xp: 90,
      priority: "urgent",
    },
    { id: "restock-tent", title: "Restock the tent", xp: 15 },
  ]);

  assert.deepEqual(board.listQuests(), [
    {
      id: "seal-rift",
      title: "Seal the rift",
      xp: 90,
      completed: false,
      priority: "urgent",
    },
    {
      id: "restock-tent",
      title: "Restock the tent",
      xp: 15,
      completed: false,
      priority: "normal",
    },
  ]);

  const result = board.completeQuest("seal-rift");

  assert.equal(result.quest.priority, "urgent");
});

test("quest completions build a streak and award escalating bonus XP", () => {
  const board = createQuestBoard([
    { id: "gather-herbs", title: "Gather herbs", xp: 25 },
    { id: "map-cave", title: "Map the cave", xp: 40 },
    { id: "seal-rift", title: "Seal the rift", xp: 90 },
  ]);

  assert.equal(board.getCurrentStreak(), 0);

  const firstResult = board.completeQuest("gather-herbs");

  assert.equal(firstResult.baseXpAwarded, 25);
  assert.equal(firstResult.streakBonusAwarded, 0);
  assert.equal(firstResult.xpAwarded, 25);
  assert.equal(firstResult.currentStreak, 1);
  assert.equal(board.getCurrentStreak(), 1);

  const secondResult = board.completeQuest("map-cave");

  assert.equal(secondResult.baseXpAwarded, 40);
  assert.equal(secondResult.streakBonusAwarded, 10);
  assert.equal(secondResult.xpAwarded, 50);
  assert.equal(secondResult.totalXp, 75);
  assert.equal(secondResult.currentStreak, 2);
  assert.equal(board.getCurrentStreak(), 2);

  const thirdResult = board.completeQuest("seal-rift");

  assert.equal(thirdResult.baseXpAwarded, 90);
  assert.equal(thirdResult.streakBonusAwarded, 20);
  assert.equal(thirdResult.xpAwarded, 110);
  assert.equal(thirdResult.totalXp, 185);
  assert.equal(thirdResult.currentStreak, 3);
  assert.equal(board.getTotalXp(), 185);
});

test("completed quests do not increase streak or award duplicate bonus XP", () => {
  const board = createQuestBoard([
    { id: "gather-herbs", title: "Gather herbs", xp: 25 },
    { id: "map-cave", title: "Map the cave", xp: 40 },
  ]);

  board.completeQuest("gather-herbs");
  const duplicateResult = board.completeQuest("gather-herbs");

  assert.equal(duplicateResult.baseXpAwarded, 0);
  assert.equal(duplicateResult.streakBonusAwarded, 0);
  assert.equal(duplicateResult.xpAwarded, 0);
  assert.equal(duplicateResult.totalXp, 25);
  assert.equal(duplicateResult.currentStreak, 1);
  assert.equal(board.getCurrentStreak(), 1);

  const nextResult = board.completeQuest("map-cave");

  assert.equal(nextResult.streakBonusAwarded, 10);
  assert.equal(nextResult.currentStreak, 2);
  assert.equal(nextResult.totalXp, 75);
});

test("initial completed quests keep base XP but do not seed the active streak", () => {
  const board = createQuestBoard([
    { id: "gather-herbs", title: "Gather herbs", xp: 25, completed: true },
    { id: "map-cave", title: "Map the cave", xp: 40 },
  ]);

  assert.equal(board.getTotalXp(), 25);
  assert.equal(board.getCurrentStreak(), 0);

  const result = board.completeQuest("map-cave");

  assert.equal(result.baseXpAwarded, 40);
  assert.equal(result.streakBonusAwarded, 0);
  assert.equal(result.xpAwarded, 40);
  assert.equal(result.totalXp, 65);
  assert.equal(result.currentStreak, 1);
});
