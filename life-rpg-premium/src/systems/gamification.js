export function calculateLevel(xp, maxXp) {
  let level = 1;
  let remainingXp = xp;
  let currentMax = maxXp;
  while (remainingXp >= currentMax) {
    level++;
    remainingXp -= currentMax;
    currentMax = Math.floor(currentMax * 1.2);
  }
  return { level, xp: remainingXp, maxXp: currentMax };
}

export function awardXP(amount, source) {
  // Called from store; kept for potential side effects
  console.log(`[Gamification] Awarded ${amount} XP for ${source}`);
}