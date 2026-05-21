import React from 'react';
import GlassCard from './UI/GlassCard';

const QuestCard = ({ quest, onComplete }) => {
  return (
    <GlassCard className="flex justify-between items-center mb-3">
      <div>
        <h3 className="font-semibold">{quest.name}</h3>
        <p className="text-xs text-cyan-300">+{quest.xp} XP</p>
      </div>
      <button
        onClick={onComplete}
        className="bg-cyan-600 hover:bg-cyan-500 px-4 py-1 rounded-full text-sm transition"
      >
        Complete
      </button>
    </GlassCard>
  );
};

export default QuestCard;