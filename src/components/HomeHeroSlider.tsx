import React, { useState, useEffect } from 'react';
import { HERO_SLIDES, HeroSlide } from '../data/portfolioData';
import { PortfolioPage } from './Header';
import { ArrowLeft, ArrowRight, Terminal, Footprints, PenTool, Eraser } from 'lucide-react';
import { DiaryBookSlide } from './DiaryBookSlide';

interface HomeHeroSliderProps {
  onNavigate: (page: PortfolioPage) => void;
  darkMode?: boolean;
}

export const HomeHeroSlider: React.FC<HomeHeroSliderProps> = ({ onNavigate, darkMode = false }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Default to Explorer as in user's image!
  const [isWiping, setIsWiping] = useState(false);
  const [displayedSlide, setDisplayedSlide] = useState<HeroSlide>(HERO_SLIDES[0]);

  const switchSlide = (targetIndex: number) => {
    if (isWiping || targetIndex === currentSlideIndex) return;
    setIsWiping(true);

    // Crossfade background and start rubber eraser sweep
    setTimeout(() => {
      setCurrentSlideIndex(targetIndex);
      setDisplayedSlide(HERO_SLIDES[targetIndex]);
    }, 200);

    setTimeout(() => {
      setIsWiping(false);
    }, 550);
  };

  const nextSlide = () => {
    const next = (currentSlideIndex + 1) % HERO_SLIDES.length;
    switchSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    switchSlide(prev);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, isWiping]);

  return (
    <div
      className={`w-full flex-grow flex items-center justify-center p-3 sm:p-5 md:p-7 lg:p-8 select-none transition-colors duration-300 font-sans ${
        darkMode ? 'bg-black' : 'bg-[#f7f5ef]'
      }`}
    >
      {/* Screen Outer Frame Border */}
      <div
        className={`w-full max-w-[1520px] h-[calc(100vh-8.5rem)] min-h-[580px] rounded-3xl p-3 md:p-4 border relative flex flex-col justify-center transition-all duration-300 ${
          darkMode
            ? 'bg-black border-stone-800 shadow-[0_8px_30px_rgba(0,0,0,0.9)]'
            : 'bg-white border-[#ede9e1] shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
        }`}
      >
        {/* Slider Viewport */}
        <div
          className={`relative w-full h-full overflow-hidden rounded-2xl transition-colors ${
            darkMode ? 'bg-black' : 'bg-stone-100'
          }`}
        >
          {/* Slide Content: All Carousel Slides Rendered in the Diary Format */}
          <DiaryBookSlide
            slide={displayedSlide}
            onNavigate={onNavigate}
            darkMode={darkMode}
            isWiping={isWiping}
          />

          {/* Floating Tactile Side Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className={`group absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105 backdrop-blur-md cursor-pointer ${
              darkMode
                ? 'bg-stone-900/90 hover:bg-stone-800 text-white border-stone-700 shadow-md'
                : 'bg-white/95 hover:bg-white text-stone-800 border-stone-200/90 shadow-lg hover:shadow-xl'
            }`}
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className={`group absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105 backdrop-blur-md cursor-pointer ${
              darkMode
                ? 'bg-stone-900/90 hover:bg-stone-800 text-white border-stone-700 shadow-md'
                : 'bg-white/95 hover:bg-white text-stone-800 border-stone-200/90 shadow-lg hover:shadow-xl'
            }`}
          >
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Bottom Slide Selector Pills */}
          <div className="absolute bottom-5 left-0 right-0 z-30 px-4 flex justify-center pointer-events-auto">
            <div
              className={`flex items-center gap-1.5 md:gap-2 backdrop-blur-xl p-1.5 rounded-full shadow-lg border transition-colors ${
                darkMode
                  ? 'bg-stone-950/95 border-stone-800'
                  : 'bg-white/95 border-stone-200/80'
              }`}
            >
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = currentSlideIndex === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => switchSlide(idx)}
                    className={`flex items-center gap-1.5 px-3 md:px-5 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
                      isActive
                        ? slide.activeBtnClass
                        : darkMode
                        ? 'bg-stone-900 text-stone-200 hover:text-white hover:bg-stone-800'
                        : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                    }`}
                  >
                    {idx === 0 && (
                      <Terminal className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                    )}
                    {idx === 1 && (
                      <Footprints className="w-3.5 h-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                    )}
                    {idx === 2 && (
                      <PenTool className="w-3.5 h-3.5 shrink-0 text-rose-600 dark:text-rose-400" />
                    )}
                    <span className="hidden xs:inline">{slide.label}</span>
                    <span className="xs:hidden">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
