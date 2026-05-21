export function updateUserModel(completedQuest) {
  const model = JSON.parse(localStorage.getItem('userModel') || '{"consistencyScore":0.5,"preferredTime":"morning","avgDailyXP":0}');
  model.avgDailyXP = (model.avgDailyXP * 0.7 + completedQuest.xp * 0.3);
  localStorage.setItem('userModel', JSON.stringify(model));
}

export function getSmartSuggestion(user) {
  const completedToday = user.completedToday.length;
  const model = JSON.parse(localStorage.getItem('userModel') || '{}');
  if (completedToday === 0) return "Start your day with one small quest – momentum builds!";
  if (completedToday < 3) return "Complete 3 quests to earn a bonus 50 XP.";
  if (model.preferredTime === 'morning' && new Date().getHours() > 12) 
    return "You're strongest in the morning – schedule important quests before noon.";
  return "Amazing consistency! Try a hard quest for double rewards.";
}