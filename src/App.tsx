import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import RoomPage from './pages/RoomPage';
import Lobby from './pages/Lobby';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="relative h-screen w-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center  p-4 transition-colors duration-300 overflow-auto">
      <button
        type="button"
        onClick={() => setDarkMode(prev => !prev)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? '🌞' : '🌙'}
      </button>

      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
}
