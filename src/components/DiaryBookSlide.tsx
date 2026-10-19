import React from 'react';
import { HeroSlide } from '../data/portfolioData';
import { PortfolioPage } from './Header';
import { ArrowRight, Eraser, Terminal, Footprints, PenTool } from 'lucide-react';

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
      case 'teal':
      case 'green':
        return 'text-teal-700';
      case 'red':
        return 'text-rose-700';
      case 'yellow':
      default:
        return 'text-amber-700';
    }
  };

  const getButtonClass = () => {
    switch (slide.theme) {
      case 'teal':
      case 'green':
        return 'bg-teal-600 hover:bg-teal-700 text-white';
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
        darkMode ? 'bg-black' : 'bg-[#f7f4ec]'
      }`}
    >
      {/* Rubber Eraser Sweeper Line during transition */}
      <div className={`eraser-sweeper ${isWiping ? 'eraser-active' : ''}`}>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white rounded-full p-1 shadow-md flex items-center justify-center">
          <Eraser className="w-3 h-3" />
        </div>
      </div>

      {/* The Clean Picture Book / Diary Spread - Kept WHITE in both Light & Dark modes */}
      <div
        className={`relative z-10 w-full max-w-5xl h-full max-h-[580px] rounded-2xl md:rounded-3xl border transition-all duration-300 flex flex-col md:flex-row overflow-hidden font-sans bg-white text-stone-900 border-stone-200 shadow-2xl ${
          isWiping ? 'eraser-wipe-out' : 'eraser-wipe-in'
        }`}
      >
        {/* Center Spine Crease (Soft natural book fold shadow) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 lg:w-12 pointer-events-none z-20 bg-gradient-to-r from-transparent via-stone-900/[0.06] to-transparent" />

        {/* ===================== LEFT PAGE: PICTURE ONLY (NO TEXT) ===================== */}
        <div
          className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center p-3 sm:p-5 md:p-7 lg:p-8 transition-colors border-b md:border-b-0 md:border-r bg-white border-stone-200"
        >
          {/* Framed Picture Book Plate */}
          <div
            className="w-full h-full max-h-[420px] p-2 sm:p-2.5 rounded-xl md:rounded-2xl transition-all border shadow-xs flex items-center justify-center bg-stone-50/80 border-stone-200"
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
          className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-14 transition-colors overflow-y-auto font-sans bg-white text-stone-900"
        >
          <div className="max-w-md my-auto font-sans">
            {/* Heading (above Subheading) */}
            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-stone-900 leading-[1.14] mb-2 sm:mb-2.5 text-balance">
              {slide.headline}
            </h1>

            {/* Subheading (directly underneath Heading) */}
            <p className={`font-sans text-xs sm:text-sm font-semibold tracking-wide ${getSubheadingColor()} mb-5 sm:mb-6`}>
              {slide.tag}
            </p>

            {/* Paragraph */}
            <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed text-stone-700 mb-6 sm:mb-8 font-normal">
              {slide.body}
            </p>

            {/* Button (opens externalUrl if present, e.g. Slide 3 journal) */}
            <div>
              {slide.externalUrl ? (
                <a
                  href={slide.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl ${getButtonClass()} active:scale-[0.98] font-sans text-xs sm:text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer`}
                >
                  {slide.id === 0 && <Terminal className="w-4 h-4 text-white shrink-0" />}
                  {slide.id === 1 && <Footprints className="w-4 h-4 text-white shrink-0" />}
                  {slide.id === 2 && <PenTool className="w-4 h-4 text-white shrink-0" />}
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <button
                  onClick={() => onNavigate(slide.ctaPath || 'projects')}
                  className={`group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl ${getButtonClass()} active:scale-[0.98] font-sans text-xs sm:text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer`}
                >
                  {slide.id === 0 && <Terminal className="w-4 h-4 text-white shrink-0" />}
                  {slide.id === 1 && <Footprints className="w-4 h-4 text-white shrink-0" />}
                  {slide.id === 2 && <PenTool className="w-4 h-4 text-white shrink-0" />}
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
