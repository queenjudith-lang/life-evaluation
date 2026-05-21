import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-black/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6 w-11/12 max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {children}
          <button onClick={onClose} className="mt-4 text-sm text-gray-400 hover:text-white">Close</button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;