import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/UI/GlassCard';
import { useStore } from '../state/store';

const SkillTree = () => {
  const { user, awardXP } = useStore();
  const skills = {
    'Security': ['Cryptography', 'Network Security', 'Web Security'],
    'Data Science': ['Python', 'SQL', 'Machine Learning']
  };

  const completeSkill = (skill) => {
    if (!user.skillTreeProgress[skill]) {
      user.skillTreeProgress[skill] = true;
      awardXP(100, `skill: ${skill}`);
      useStore.setState({ user: { ...user } });
    }
  };

  return (
    <motion.div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-['Orbitron'] mb-6">🌳 Skill Tree</h1>
      {Object.entries(skills).map(([domain, skillList]) => (
        <GlassCard key={domain} className="mb-6">
          <h2 className="text-xl font-bold mb-3">{domain}</h2>
          <div className="space-y-2">
            {skillList.map(skill => (
              <div key={skill} className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                <span>{skill}</span>
                {user.skillTreeProgress[skill] ? (
                  <span className="text-green-400">✓ Mastered</span>
                ) : (
                  <button onClick={() => completeSkill(skill)} className="text-cyan-400 text-sm">Complete +100 XP</button>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      ))}
    </motion.div>
  );
};

export default SkillTree;