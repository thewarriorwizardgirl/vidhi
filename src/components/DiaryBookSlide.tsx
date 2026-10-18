import React from 'react';
import { HeroSlide } from '../data/portfolioData';
import { PortfolioPage } from './Header';
import { ArrowRight, Eraser } from 'lucide-react';

interface DiaryBookSlideProps {
  slide: HeroSlide;
  onNavigate: (page: PortfolioPage) => void;
  darkMode?: boolean;
  isWiping?: boolean;
}

export const DiaryBookSlide: React.FC<DiaryBookSlideProps> = ({
  slide,
  onNavigate,
  darkMode = false,
  isWiping = false,
}) => {
  const getSubheadingColor = () => {
    switch (slide.theme) {
      case 'green':
        return 'text-emerald-700 dark:text-emerald-400';
      case 'red':
        return 'text-rose-700 dark:text-rose-400';
      case 'yellow':
      default:
        return 'text-amber-700 dark:text-amber-400';
    }
  };

  const getButtonClass = () => {
    switch (slide.theme) {
      case 'green':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white';
      case 'red':
        return 'bg-rose-600 hover:bg-rose-700 text-white';
      case 'yellow':
      default:
        return 'bg-amber-600 hover:bg-amber-700 text-white';
    }
  };

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center p-3 sm:p-5 md:p-8 lg:p-10 pb-16 sm:pb-20 overflow-hidden select-none transition-colors duration-300 font-sans ${
        darkMode ? 'bg-[#22201d]' : 'bg-[#f7f4ec]'
      }`}
    >
      {/* Rubber Eraser Sweeper Line during transition */}
      <div className={`eraser-sweeper ${isWiping ? 'eraser-active' : ''}`}>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white rounded-full p-1 shadow-md flex items-center justify-center">
          <Eraser className="w-3 h-3" />
        </div>
      </div>

      {/* The Clean Picture Book / Diary Spread */}
      <div
        className={`relative z-10 w-full max-w-5xl h-full max-h-[580px] rounded-2xl md:rounded-3xl border transition-all duration-300 flex flex-col md:flex-row overflow-hidden font-sans ${
          darkMode
            ? 'bg-[#2b2723] border-[#443e36] text-[#f4efe8] shadow-[0_16px_45px_rgba(0,0,0,0.35)]'
            : 'bg-[#fffdfa] border-stone-200/90 text-stone-900 shadow-[0_16px_45px_rgba(0,0,0,0.06)]'
        } ${isWiping ? 'eraser-wipe-out' : 'eraser-wipe-in'}`}
      >
        {/* Center Spine Crease (Soft natural book fold shadow) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 lg:w-12 pointer-events-none z-20 bg-gradient-to-r from-transparent via-stone-900/[0.05] to-transparent dark:via-black/30" />

        {/* ===================== LEFT PAGE: PICTURE ONLY (NO TEXT) ===================== */}
        <div
          className={`w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center p-3 sm:p-5 md:p-7 lg:p-8 transition-colors border-b md:border-b-0 md:border-r ${
            darkMode
              ? 'bg-[#26221e] border-stone-800/80'
              : 'bg-[#faf7f0] border-stone-200/80'
          }`}
        >
          {/* Framed Picture Book Plate */}
          <div
            className={`w-full h-full max-h-[420px] p-2 sm:p-2.5 rounded-xl md:rounded-2xl transition-all border shadow-sm flex items-center justify-center ${
              darkMode
                ? 'bg-[#1f1b18] border-stone-700/60'
                : 'bg-white border-stone-200/90'
            }`}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg md:rounded-xl">
              <img
                src={slide.bgImage}
                alt={slide.headline}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* ===================== RIGHT PAGE: HEADING ABOVE SUBHEADING, PARAGRAPH, BUTTON ===================== */}
        <div
          className={`w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-14 transition-colors overflow-y-auto font-sans ${
            darkMode ? 'bg-[#2b2723]' : 'bg-[#fffdfa]'
          }`}
        >
          <div className="max-w-md my-auto font-sans">
            {/* Heading (above Subheading) */}
            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-stone-900 dark:text-[#f8f4ec] leading-[1.14] mb-2 sm:mb-2.5 text-balance">
              {slide.headline}
            </h1>

            {/* Subheading (directly underneath Heading) */}
            <p className={`font-sans text-xs sm:text-sm font-semibold tracking-wide ${getSubheadingColor()} mb-5 sm:mb-6`}>
              {slide.tag}
            </p>

            {/* Paragraph */}
            <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed text-stone-600 dark:text-stone-300 mb-6 sm:mb-8 font-normal">
              {slide.body}
            </p>

            {/* Button */}
            <div>
              <button
                onClick={() => onNavigate(slide.ctaPath || 'projects')}
                className={`group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl ${getButtonClass()} active:scale-[0.98] font-sans text-xs sm:text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer`}
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
