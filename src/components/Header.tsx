import React from 'react';
import { Moon, Sun, Home, FolderCode, BookOpen, User, Mail } from 'lucide-react';

export type PortfolioPage = 'home' | 'projects' | 'journal' | 'my-story' | 'contact-me';

interface HeaderProps {
  currentPage: PortfolioPage;
  onNavigate: (page: PortfolioPage) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  darkMode,
  onToggleDarkMode,
}) => {
  const navItems: { id: PortfolioPage; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderCode className="w-4 h-4" /> },
    { id: 'journal', label: 'Journal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'my-story', label: 'MyStory', icon: <User className="w-4 h-4" /> },
    { id: 'contact-me', label: 'Contact Me', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        darkMode
          ? 'bg-[#2b2926]/95 border-b border-[#3d3934] text-[#f3eee6] shadow-[0_2px_12px_rgba(0,0,0,0.15)]'
          : 'bg-[#f7f5ef]/95 border-b border-[#e5e2dc]/80 text-[#1c1c18] shadow-[0_1px_6px_rgba(0,0,0,0.03)]'
      }`}
    >
      <div className="h-18 sm:h-20 w-full px-3 sm:px-6 lg:px-10 flex items-center justify-between max-w-[1600px] mx-auto gap-2">
        {/* Brand Name Lockup */}
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col text-left group cursor-pointer focus-visible:outline-none shrink-0"
        >
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="font-sans font-bold text-amber-500 sm:text-lg group-hover:text-amber-400 transition-colors">
              VA
            </span>
            <span className={`text-sm sm:text-base font-normal ${darkMode ? 'text-stone-500' : 'text-stone-300'}`}>
              /
            </span>
            <span
              className={`font-sans text-sm sm:text-lg font-bold tracking-tight uppercase group-hover:text-amber-500 transition-colors ${
                darkMode ? 'text-[#f5f0e8]' : 'text-stone-900'
              }`}
            >
              Vidhi Aggarwal
            </span>
          </div>
          <span
            className={`text-[9px] sm:text-[11px] tracking-wider uppercase font-semibold hidden md:block ${
              darkMode ? 'text-[#a8a196]' : 'text-stone-500'
            }`}
          >
            Software Developer & Writer
          </span>
        </button>

        {/* Central Navigation Bar:
            - Mobile & Tablet (< lg): Compact Icon Navbar with informative name badges
            - Desktop (>= lg): Full text pill navbar with icons + labels
        */}
        <nav
          className={`flex items-center p-1 sm:p-1.5 rounded-full border shadow-xs transition-colors ${
            darkMode
              ? 'bg-[#33302c]/90 border-[#45413a]'
              : 'bg-white/90 border-stone-200/80'
          }`}
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => onNavigate(item.id)}
                  title={item.label}
                  aria-label={item.label}
                  className={`relative flex items-center justify-center gap-1.5 transition-all rounded-full cursor-pointer px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? darkMode
                        ? 'bg-[#403c36] text-amber-300 font-semibold shadow-xs border border-amber-500/30'
                        : 'bg-[#ebe8e2] text-stone-900 font-semibold shadow-xs'
                      : darkMode
                      ? 'text-stone-300 hover:text-white hover:bg-[#3b3731]'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-[#f3f0e8]'
                  }`}
                >
                  {/* Icon visible always */}
                  <span className="shrink-0">{item.icon}</span>

                  {/* Full label on desktop >= lg */}
                  <span className="hidden lg:inline">{item.label}</span>

                  {/* Active indicator dot on mobile & tablet (< lg) */}
                  {isActive && (
                    <span className="lg:hidden w-1.5 h-1.5 rounded-full bg-amber-500 absolute -bottom-0.5" />
                  )}
                </button>

                {/* Informative Hover / Focus Name Badge for Mobile & Tablet (< lg) */}
                <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-full mt-1.5 pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-50">
                  <div
                    className={`px-2 py-0.5 text-[10px] font-semibold tracking-wide rounded-md shadow-lg whitespace-nowrap border ${
                      darkMode
                        ? 'bg-[#3c3832] text-amber-200 border-[#4f4940]'
                        : 'bg-stone-900 text-stone-100 border-stone-800'
                    }`}
                  >
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Daylight / Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle color mode"
            title={darkMode ? 'Switch to daylight theme' : 'Switch to dark charcoal paper theme'}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors border cursor-pointer ${
              darkMode
                ? 'text-amber-400 hover:text-amber-300 bg-[#38342e] hover:bg-[#433f38] border-[#48443d]'
                : 'text-stone-600 hover:text-stone-900 bg-white/80 hover:bg-white border-stone-200/60'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          {/* Vidhi's Avatar */}
          <div className="relative flex items-center">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1WKw2KLB88G8ycP35cye-xtn2jb1QtjhmPOPMBoOvfluSucir2cExBVjmIqaVb_vU7os5AjLb4DhqmlaiTPJ4z8gbJh9jmWGk9EKff8wxa2iGzKvnque-5qgHaP6CrD6T-PF0uAht37w5ulncmUPdE48qT4DdsE-zgaRvPjuarMeCHuQ5Pv56gAZJmL2WhMsysKYEivC8ZBrmmSPQXiXxZaoXNc7dALB2w9CKkFXL_Lcz-C_mBMG0w2bw"
              alt="Vidhi Aggarwal - Illustrated Avatar"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML =
                    '<div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs ring-2 ring-amber-500/30">VA</div>';
                }
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-amber-500/30 shadow-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
