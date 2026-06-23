export function createQuestBoard(initialQuests = []) {
  const quests = initialQuests.map((quest) => ({
    id: quest.id,
    title: quest.title,
    xp: quest.xp,
    completed: Boolean(quest.completed),
  }));
  let totalXp = quests.reduce(
    (sum, quest) => sum + (quest.completed ? quest.xp : 0),
    0,
  );

  return {
    listQuests() {
      return quests.map(copyQuest);
    },

    getTotalXp() {
      return totalXp;
    },

    completeQuest(questId) {
      const quest = quests.find((candidate) => candidate.id === questId);

      if (!quest) {
        throw new Error(`Unknown quest: ${questId}`);
      }

      const xpAwarded = quest.completed ? 0 : quest.xp;
      quest.completed = true;
      totalXp += xpAwarded;

      return {
        quest: copyQuest(quest),
        xpAwarded,
        totalXp,
      };
    },
  };
}

function copyQuest(quest) {
  return {
    id: quest.id,
    title: quest.title,
    xp: quest.xp,
    completed: quest.completed,
  };
}
