import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/UI/GlassCard';
import { useStore } from '../state/store';

const Profile = () => {
  const { user } = useStore();
  const [username, setUsername] = useState(user.profile?.username || 'Adventurer');

  const saveProfile = () => {
    user.profile = { username };
    useStore.setState({ user: { ...user } });
  };

  return (
    <motion.div className="max-w-4xl mx-auto px-4 py-6">
      <GlassCard className="p-6">
        <h2 className="text-2xl font-['Orbitron'] mb-4">👤 Profile</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center text-3xl">🎮</div>
          <div>
            <div className="text-xl font-bold">{user.profile?.username || 'Adventurer'}</div>
            <div className="text-sm text-gray-400">Level {user.level} • {user.totalXPHistory.length} actions</div>
          </div>
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white mb-4"
        />
        <button onClick={saveProfile} className="bg-cyan-600 px-4 py-2 rounded-full">Save Profile</button>
      </GlassCard>
    </motion.div>
  );
};

export default Profile;