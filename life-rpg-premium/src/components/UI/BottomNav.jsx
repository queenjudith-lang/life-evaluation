import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const links = [
    { to: '/', icon: '🏠', label: 'Home' },
    { to: '/quests', icon: '⚔️', label: 'Quests' },
    { to: '/exercises', icon: '💪', label: 'Exercise' },
    { to: '/legend', icon: '🎯', label: 'Legend' },
    { to: '/profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-cyan-500/30 py-2 flex justify-around items-center z-20 md:hidden">
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs transition ${isActive ? 'text-cyan-400' : 'text-gray-400'}`
          }
        >
          <span className="text-xl">{link.icon}</span>
          <span>{link.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;