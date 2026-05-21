import React, { useState, useEffect } from 'react';
import { useStore } from '../state/store';
import { getSmartSuggestion } from '../systems/adaptiveCoach';
import GlassCard from './UI/GlassCard';

const SmartSuggestion = () => {
  const { user } = useStore();
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    if (user) {
      setSuggestion(getSmartSuggestion(user));
    }
  }, [user]);

  if (!user) return null;

  return (
    <GlassCard className="mt-6 text-center">
      <div className="flex items-center justify-center gap-2 text-cyan-400 text-lg">
        <span>🧠</span> Smart Suggestion
      </div>
      <p className="mt-2">{suggestion}</p>
    </GlassCard>
  );
};

export default SmartSuggestion;