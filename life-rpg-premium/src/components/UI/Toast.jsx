import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-5 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
      >
        <span>{type === 'success' ? '✅' : 'ℹ️'}</span>
        <span>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;