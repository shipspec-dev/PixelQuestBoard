const starterQuests = [
  {
    id: "gather-herbs",
    title: "Gather moonlit herbs",
    xp: 25,
    priority: "normal",
  },
  { id: "map-cave", title: "Map the crystal cave", xp: 40, priority: "high" },
  {
    id: "repair-bridge",
    title: "Repair the river bridge",
    xp: 35,
    priority: "normal",
  },
  {
    id: "calm-sprite",
    title: "Calm the forest sprite",
    xp: 55,
    priority: "urgent",
  },
];

const questList = document.querySelector("#quest-list");
const totalXp = document.querySelector("#total-xp");
const progressLabel = document.querySelector("#progress-label");
const progressFill = document.querySelector("#progress-fill");
const streakLabel = document.querySelector("#streak-label");
const rankLabel = document.querySelector("#rank-label");
const statusMessage = document.querySelector("#status-message");

init();

async function init() {
  const createQuestBoard = await loadQuestBoard();
  const board = createQuestBoard(starterQuests);

  questList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quest-id]");

    if (!button) {
      return;
    }

    try {
      const result = board.completeQuest(button.dataset.questId);

      render(board, formatCompletionMessage(result));
    } catch (error) {
      render(board, error.message);
    }
  });

  render(board, "Choose a quest to claim its XP.");
}

async function loadQuestBoard() {
  if (window.location.protocol !== "file:") {
    const module = await import("./quest-board.js");
    return module.createQuestBoard;
  }

  return createQuestBoardForFileOpen;
}

function render(board, message) {
  const quests = board.listQuests();
  const completedCount = quests.filter((quest) => quest.completed).length;
  const completionPercent =
    quests.length === 0 ? 0 : Math.round((completedCount / quests.length) * 100);

  totalXp.textContent = board.getTotalXp();
  progressLabel.textContent = `${completedCount} of ${quests.length} quests complete`;
  streakLabel.textContent = `Streak: ${board.getCurrentStreak()}`;
  progressFill.style.width = `${completionPercent}%`;
  rankLabel.textContent = `Rank: ${getRank(board.getTotalXp(), completedCount, quests.length)}`;
  statusMessage.textContent = message;

  questList.replaceChildren(...quests.map(createQuestElement));
}

function createQuestElement(quest) {
  const card = document.createElement("article");
  card.className = `quest-card${quest.completed ? " is-complete" : ""}`;

  const content = document.createElement("div");

  const title = document.createElement("h2");
  title.className = "quest-title";
  title.textContent = quest.title;

  const meta = document.createElement("p");
  meta.className = "quest-meta";
  const xpText = quest.completed
    ? `${quest.xp} XP earned`
    : `${quest.xp} XP reward`;

  const priority = document.createElement("span");
  priority.className = `priority-label priority-label--${quest.priority}`;
  priority.textContent = `${formatPriority(quest.priority)} priority`;

  const xpLabel = document.createElement("span");
  xpLabel.textContent = xpText;

  meta.append(priority, xpLabel);

  const button = document.createElement("button");
  button.className = "quest-action";
  button.type = "button";
  button.dataset.questId = quest.id;
  button.disabled = quest.completed;
  button.textContent = quest.completed ? "Completed" : "Complete quest";

  content.append(title, meta);
  card.append(content, button);

  return card;
}

function formatCompletionMessage(result) {
  if (result.xpAwarded === 0) {
    return `${result.quest.title} was already complete.`;
  }

  if (result.streakBonusAwarded > 0) {
    return `${result.quest.title} complete. +${result.xpAwarded} XP claimed (${result.baseXpAwarded} XP + ${result.streakBonusAwarded} streak bonus).`;
  }

  return `${result.quest.title} complete. +${result.xpAwarded} XP claimed.`;
}

function formatPriority(priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function getRank(xp, completedCount, totalCount) {
  if (totalCount > 0 && completedCount === totalCount) {
    return "Guild Hero";
  }

  if (xp >= 100) {
    return "Pathfinder";
  }

  if (xp >= 50) {
    return "Scout";
  }

  return "Novice";
}

function createQuestBoardForFileOpen(initialQuests = []) {
  // Chrome blocks local ES module imports under file://, so direct-open mode
  // mirrors the quest-board module behavior used when served over HTTP.
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
