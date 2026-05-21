import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuestCard from '../components/QuestCard';
import GlassCard from '../components/UI/GlassCard';
import Modal from '../components/UI/Modal';
import { useStore } from '../state/store';

const Quests = () => {
  const { user, completeQuest, addQuest } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestName, setNewQuestName] = useState('');
  const [newQuestXP, setNewQuestXP] = useState(30);

  const handleAddQuest = () => {
    if (newQuestName.trim()) {
      addQuest(newQuestName.trim(), parseInt(newQuestXP));
      setNewQuestName('');
      setIsModalOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-['Orbitron']">⚔️ All Quests</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-full text-sm font-semibold transition"
        >
          + New Quest
        </button>
      </div>
      <div className="space-y-3">
        {user.quests.map(quest => (
          <QuestCard key={quest.id} quest={quest} onComplete={() => completeQuest(quest.id)} />
        ))}
        {user.quests.length === 0 && <GlassCard className="text-center py-8 text-gray-400">No quests yet. Create your first!</GlassCard>}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Quest">
        <input
          type="text"
          placeholder="Quest name"
          value={newQuestName}
          onChange={(e) => setNewQuestName(e.target.value)}
          className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white mb-3"
        />
        <select
          value={newQuestXP}
          onChange={(e) => setNewQuestXP(e.target.value)}
          className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white mb-4"
        >
          <option value="20">Easy (+20 XP)</option>
          <option value="50">Medium (+50 XP)</option>
          <option value="100">Hard (+100 XP)</option>
        </select>
        <button
          onClick={handleAddQuest}
          className="w-full bg-cyan-600 py-2 rounded-lg font-bold"
        >
          Save Quest
        </button>
      </Modal>
    </motion.div>
  );
};

export default Quests;