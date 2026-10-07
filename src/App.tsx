/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, PortfolioPage } from './components/Header';
import { HomeHeroSlider } from './components/HomeHeroSlider';
import { ComingSoonPage } from './components/ComingSoonPage';
import { Footer } from './components/Footer';

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
      className={`min-h-screen flex flex-col justify-between antialiased transition-colors duration-300 ${
        darkMode ? 'dark bg-[#282623] text-[#f3eee6]' : 'bg-[#f7f5ef] text-[#1c1c18]'
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
      <main className="w-full flex-grow pt-18 sm:pt-20 flex flex-col justify-center">
        {currentPage === 'home' ? (
          <HomeHeroSlider onNavigate={setCurrentPage} darkMode={darkMode} />
        ) : (
          <ComingSoonPage
            page={currentPage}
            onNavigateHome={() => setCurrentPage('home')}
            darkMode={darkMode}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentPage} darkMode={darkMode} />
    </div>
  );
}
