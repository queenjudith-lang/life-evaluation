import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import BottomNav from './components/UI/BottomNav';
import BrainAtlasScene from './3d/BrainAtlasScene';
import { useStore } from './state/store';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Quests = lazy(() => import('./pages/Quests'));
const Exercises = lazy(() => import('./pages/Exercises'));
const Legend = lazy(() => import('./pages/Legend'));
const SkillTree = lazy(() => import('./pages/SkillTree'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  const { loadUser, user } = useStore();

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;

  return (
    <BrowserRouter>
      <div className="fixed inset-0 z-0">
        <GlobalScene />
      </div>
      <div className="relative z-10 min-h-screen pb-20 md:pb-6">
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/legend" element={<Legend />} />
              <Route path="/skill-tree" element={<SkillTree />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;