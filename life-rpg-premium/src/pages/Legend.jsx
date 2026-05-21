import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/UI/GlassCard';
import { useStore } from '../state/store';

const Legend = () => {
  const { user, awardXP } = useStore();
  const [goal, setGoal] = useState(user.legendGoal?.title || '');
  const [day, setDay] = useState(user.legendGoal?.day || 1);

  const startLegend = () => {
    if (!goal) return;
    user.legendGoal = { title: goal, day: 1, completedDays: [] };
    useStore.setState({ user: { ...user } });
  };

  const completeDay = () => {
    if (!user.legendGoal) return;
    user.legendGoal.completedDays.push(day);
    user.legendGoal.day++;
    awardXP(1000, 'legend day');
    useStore.setState({ user: { ...user } });
    setDay(user.legendGoal.day);
  };

  if (!user.legendGoal) {
    return (
      <motion.div className="max-w-4xl mx-auto px-4 py-6">
        <GlassCard className="text-center p-8">
          <h2 className="text-2xl font-['Orbitron'] mb-4">🎯 90‑Day Legend Goal</h2>
          <p className="mb-4">90 minutes for 90 days on one life‑changing goal.</p>
          <input
            type="text"
            placeholder="Your epic goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white mb-4"
          />
          <button onClick={startLegend} className="bg-cyan-600 px-6 py-2 rounded-full">Begin Journey</button>
        </GlassCard>
      </motion.div>
    );
  }

  return (
    <motion.div className="max-w-4xl mx-auto px-4 py-6">
      <GlassCard className="text-center p-8">
        <h2 className="text-2xl font-['Orbitron'] mb-2">{user.legendGoal.title}</h2>
        <div className="text-4xl font-bold text-cyan-400 mb-4">Day {user.legendGoal.day} / 90</div>
        <div className="grid grid-cols-10 gap-1 mb-6">
          {Array.from({ length: 90 }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-sm ${user.legendGoal.completedDays.includes(i + 1) ? 'bg-cyan-500' : 'bg-white/20'}`}
            />
          ))}
        </div>
        <button onClick={completeDay} className="bg-cyan-600 px-6 py-2 rounded-full">Complete Today's 90 min</button>
      </GlassCard>
    </motion.div>
  );
};

export default Legend;