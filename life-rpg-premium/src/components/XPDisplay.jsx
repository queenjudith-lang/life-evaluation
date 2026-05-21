import React from 'react';
import { useStore } from '../state/store';
import ProgressBar from './UI/ProgressBar';

const XPDisplay = () => {
  const { user } = useStore();
  if (!user) return null;
  return (
    <div className="glass-card p-5 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-center">
        <div className="text-3xl font-bold font-['Orbitron']">LVL {user.level}</div>
        <div className="text-xs text-gray-300">Warrior</div>
      </div>
      <div className="flex-1 w-full">
        <div className="flex justify-between text-sm mb-1">
          <span>XP Progress</span>
          <span>{user.xp} / {user.maxXp}</span>
        </div>
        <ProgressBar value={user.xp} max={user.maxXp} />
      </div>
    </div>
  );
};

export default XPDisplay;