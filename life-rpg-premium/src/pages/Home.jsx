import React from 'react';
import { motion } from 'framer-motion';
import XPDisplay from '../components/XPDisplay';
import SmartSuggestion from '../components/SmartSuggestion';
import QuestCard from '../components/QuestCard';
import GlassCard from '../components/UI/GlassCard';
import { useStore } from '../state/store';

const Home = () => {
  const { user, completeQuest } = useStore();
  const activeQuests = user.quests.filter(q => !q.completed).slice(0, 3);
  const todayXP = user.totalXPHistory
    .filter(h => new Date(h.date).toDateString() === new Date().toDateString())
    .reduce((a, b) => a + b.xp, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      <XPDisplay />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <GlassCard className="text-center">
          <div className="text-4xl">🔥</div>
          <div className="text-3xl font-bold">{user.streak}</div>
          <div className="text-sm text-gray-300">Day streak</div>
        </GlassCard>
        <GlassCard className="col-span-2">
          <h3 className="font-bold text-lg flex items-center gap-2">📊 Today's Progress</h3>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span>Quests done:</span>
              <span>{user.completedToday.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total XP today:</span>
              <span>{todayXP}</span>
            </div>
          </div>
        </GlassCard>
      </div>
      <SmartSuggestion />
      <div className="mt-8">
        <h2 className="text-xl font-bold font-['Orbitron'] mb-4">⚔️ Active Quests</h2>
        {activeQuests.map(quest => (
          <QuestCard key={quest.id} quest={quest} onComplete={() => completeQuest(quest.id)} />
        ))}
        {activeQuests.length === 0 && <GlassCard className="text-center py-8 text-gray-400">All done for today! 🎉</GlassCard>}
      </div>
    </motion.div>
  );
};

export default Home;