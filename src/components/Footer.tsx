import React from 'react';
import { PortfolioPage } from './Header';

interface FooterProps {
  onNavigate: (page: PortfolioPage) => void;
  darkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, darkMode = false }) => {
  return (
    <footer
      className={`w-full py-4 border-t transition-colors duration-300 select-none ${
        darkMode
          ? 'bg-[#282623] border-[#3d3934] text-stone-400'
          : 'bg-[#f7f5ef] border-stone-200/80 text-stone-500'
      }`}
    >
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <p className="font-sans">
          © Vidhi Aggarwal. Crafted with tactile code and quiet reflections.
        </p>
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('journal')}
            className={`font-semibold transition-colors cursor-pointer ${
              darkMode ? 'text-stone-300 hover:text-amber-400' : 'text-stone-600 hover:text-amber-700'
            }`}
          >
            Field Logs
          </button>
          <button
            onClick={() => onNavigate('contact-me')}
            className={`font-semibold transition-colors cursor-pointer ${
              darkMode ? 'text-stone-300 hover:text-amber-400' : 'text-stone-600 hover:text-amber-700'
            }`}
          >
            Send Dispatch
          </button>
        </div>
      </div>
    </footer>
  );
};
