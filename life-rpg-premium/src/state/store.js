import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateLevel, awardXP as awardXPUtil } from '../systems/gamification';
import { updateUserModel } from '../systems/adaptiveCoach';

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      loadUser: () => {
        const defaultUser = {
          level: 1,
          xp: 0,
          maxXp: 100,
          streak: 0,
          lastActive: new Date().toDateString(),
          quests: [
            { id: 'q1', name: 'Morning Meditation', xp: 20, completed: false },
            { id: 'q2', name: 'Read 10 pages', xp: 30, completed: false },
            { id: 'q3', name: 'Hydrate 2L', xp: 15, completed: false }
          ],
          completedToday: [],
          totalXPHistory: [],
          achievements: [{ name: 'First Steps', unlocked: false, condition: () => get().user?.totalXPHistory?.length > 0 }],
          habits: [],
          skillTreeProgress: {},
          legendGoal: null,
          userModel: { consistencyScore: 0.5, preferredTime: 'morning', avgDailyXP: 0 }
        };
        set({ user: defaultUser });
      },
      completeQuest: (questId) => {
        const { user } = get();
        const quest = user.quests.find(q => q.id === questId);
        if (!quest || quest.completed) return;
        quest.completed = true;
        user.completedToday.push(quest.id);
        get().awardXP(quest.xp, quest.name);
        updateUserModel(quest);
        set({ user: { ...user } });
      },
      addQuest: (name, xp) => {
        const { user } = get();
        user.quests.push({ id: Date.now().toString(), name, xp, completed: false });
        set({ user: { ...user } });
      },
      awardXP: (amount, source) => {
        const { user } = get();
        let newXP = user.xp + amount;
        let newLevel = user.level;
        let newMaxXp = user.maxXp;
        if (newXP >= user.maxXp) {
          newLevel++;
          newXP -= user.maxXp;
          newMaxXp = Math.floor(user.maxXp * 1.2);
        }
        user.xp = newXP;
        user.level = newLevel;
        user.maxXp = newMaxXp;
        user.totalXPHistory.push({ date: new Date().toISOString(), xp: amount });
        set({ user: { ...user } });
      },
      updateStreak: () => {
        const { user } = get();
        const today = new Date().toDateString();
        if (user.lastActive !== today) {
          const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toDateString();
          if (user.lastActive === yesterday) user.streak++;
          else user.streak = 0;
          user.lastActive = today;
          set({ user: { ...user } });
        }
      }
    }),
    { name: 'life-rpg-premium' }
  )
);