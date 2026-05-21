import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;