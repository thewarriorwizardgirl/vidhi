/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, PortfolioPage } from './components/Header';
import { HomeHeroSlider } from './components/HomeHeroSlider';
import { ProjectsPage } from './components/ProjectsPage';
import { MyStoryPage } from './components/MyStoryPage';
import { JournalPage } from './components/JournalPage';
import { ContactPage } from './components/ContactPage';
import { ComingSoonPage } from './components/ComingSoonPage';
import { Footer } from './components/Footer';
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PortfolioPage>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between antialiased transition-colors duration-300 font-sans ${
        darkMode ? 'dark bg-black text-[#f3eee6]' : 'bg-[#f7f5ef] text-[#1c1c18]'
      }`}
    >
      {/* Top Application Header */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Viewport */}
      <main className="w-full flex-grow pt-16 sm:pt-20 flex flex-col justify-center font-sans">
        {currentPage === 'home' ? (
          <HomeHeroSlider onNavigate={setCurrentPage} darkMode={darkMode} />
        ) : currentPage === 'projects' ? (
          <ProjectsPage darkMode={darkMode} />
        ) : currentPage === 'my-story' ? (
          <MyStoryPage onNavigate={setCurrentPage} darkMode={darkMode} />
        ) : currentPage === 'journal' ? (
          <JournalPage darkMode={darkMode} />
        ) : currentPage === 'contact-me' ? (
          <ContactPage darkMode={darkMode} />
        ) : (
          <ComingSoonPage
            page={currentPage}
            onNavigateHome={() => setCurrentPage('home')}
            darkMode={darkMode}
          />
        )}
      </main>

      {/* Mobile Floating Theme Switcher Button - Guarantees 1-tap theme switching on any mobile screen */}
      <button
        onClick={toggleDarkMode}
        aria-label={darkMode ? 'Switch to daylight theme' : 'Switch to dark theme'}
        className={`sm:hidden fixed bottom-6 right-4 z-50 p-3 rounded-full shadow-2xl border transition-all duration-300 cursor-pointer flex items-center justify-center ${
          darkMode
            ? 'bg-stone-900 border-amber-500/40 text-amber-300 ring-2 ring-amber-500/30'
            : 'bg-white border-stone-300 text-stone-800 ring-2 ring-stone-900/10'
        }`}
      >
        {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-700" />}
      </button>

      {/* Footer */}
      <Footer onNavigate={setCurrentPage} darkMode={darkMode} />
    </div>
  );
}
