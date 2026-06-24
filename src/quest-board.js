export function createQuestBoard(initialQuests = []) {
  const streakBonusXp = 10;
  const quests = initialQuests.map((quest) => ({
    id: quest.id,
    title: quest.title,
    xp: quest.xp,
    priority: quest.priority ?? "normal",
    completed: Boolean(quest.completed),
  }));
  let totalXp = quests.reduce(
    (sum, quest) => sum + (quest.completed ? quest.xp : 0),
    0,
  );
  let currentStreak = 0;

  return {
    listQuests() {
      return quests.map(copyQuest);
    },

    getTotalXp() {
      return totalXp;
    },

    getCurrentStreak() {
      return currentStreak;
    },

    completeQuest(questId) {
      const quest = quests.find((candidate) => candidate.id === questId);

      if (!quest) {
        throw new Error(`Unknown quest: ${questId}`);
      }

      let baseXpAwarded = 0;
      let streakBonusAwarded = 0;

      if (!quest.completed) {
        currentStreak += 1;
        baseXpAwarded = quest.xp;
        streakBonusAwarded = (currentStreak - 1) * streakBonusXp;
        quest.completed = true;
      }

      const xpAwarded = baseXpAwarded + streakBonusAwarded;
      totalXp += xpAwarded;

      return {
        quest: copyQuest(quest),
        baseXpAwarded,
        streakBonusAwarded,
        xpAwarded,
        totalXp,
        currentStreak,
      };
    },
  };
}

function copyQuest(quest) {
  return {
    id: quest.id,
    title: quest.title,
    xp: quest.xp,
    priority: quest.priority,
    completed: quest.completed,
  };
}
