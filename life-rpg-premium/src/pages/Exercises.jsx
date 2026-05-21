import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/UI/GlassCard';
import ExerciseScene from '../3d/exerciseScene';
import { useStore } from '../state/store';

const Exercises = () => {
  const [ascendLevel, setAscendLevel] = useState(1);
  const { awardXP } = useStore();

  const recordRep = () => {
    awardXP(5, 'exercise');
    if (Math.random() < 0.1) setAscendLevel(l => l + 1);
  };

  return (
    <>
      <ExerciseScene />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-4xl mx-auto px-4 py-6"
      >
        <GlassCard className="text-center p-8">
          <h2 className="text-3xl font-['Orbitron'] mb-2">⚡ Ascending Strength</h2>
          <div className="text-5xl font-bold text-cyan-400 mb-4">Level {ascendLevel}</div>
          <button
            onClick={recordRep}
            className="bg-cyan-600 hover:bg-cyan-500 px-8 py-3 rounded-full text-lg font-semibold transition"
          >
            +1 Rep
          </button>
          <p className="text-gray-300 mt-4">Every rep builds your real‑world power.</p>
        </GlassCard>
      </motion.div>
    </>
  );
};

export default Exercises;