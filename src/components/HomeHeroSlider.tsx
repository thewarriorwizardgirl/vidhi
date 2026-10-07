import React, { useState, useEffect } from 'react';
import { HERO_SLIDES, HeroSlide } from '../data/portfolioData';
import { PortfolioPage } from './Header';
import { ArrowLeft, ArrowRight, Terminal, Footprints, PenTool, Eraser } from 'lucide-react';

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
      className={`w-full flex-grow flex items-center justify-center p-3 sm:p-5 md:p-7 lg:p-8 select-none transition-colors duration-300 ${
        darkMode ? 'bg-[#282623]' : 'bg-[#f7f5ef]'
      }`}
    >
      {/* Screen Outer Frame Border */}
      <div
        className={`w-full max-w-[1520px] h-[calc(100vh-8.5rem)] min-h-[580px] rounded-3xl p-3 md:p-4 border relative flex flex-col justify-center transition-all duration-300 ${
          darkMode
            ? 'bg-[#33302c] border-[#444038] shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
            : 'bg-white border-[#ede9e1] shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
        }`}
      >
        {/* Slider Viewport */}
        <div
          className={`relative w-full h-full overflow-hidden rounded-2xl transition-colors ${
            darkMode ? 'bg-[#262421]' : 'bg-stone-100'
          }`}
        >
          {/* Slide Background Layers */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = currentSlideIndex === idx;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* Mobile portrait background (character in bottom half) */}
                  <div
                    className="sm:hidden absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${slide.bgImageMobile || slide.bgImage})`,
                    }}
                  />
                  {/* Desktop / tablet widescreen background */}
                  <div
                    className="hidden sm:block absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${slide.bgImage}), url(${slide.fallbackImage})`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Floating Tactile Side Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className={`group absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105 backdrop-blur-md cursor-pointer ${
              darkMode
                ? 'bg-[#3a3630]/95 hover:bg-[#454038] text-stone-200 border-[#4d4840] shadow-md'
                : 'bg-white/95 hover:bg-white text-stone-800 border-stone-200/90 shadow-lg hover:shadow-xl'
            }`}
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className={`group absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105 backdrop-blur-md cursor-pointer ${
              darkMode
                ? 'bg-[#3a3630]/95 hover:bg-[#454038] text-stone-200 border-[#4d4840] shadow-md'
                : 'bg-white/95 hover:bg-white text-stone-800 border-stone-200/90 shadow-lg hover:shadow-xl'
            }`}
          >
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Top-Left Positioned Editorial Paper Card over Sky Area */}
          <div className="relative z-20 h-full w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col justify-start items-start pointer-events-none pt-10 sm:pt-14 md:pt-18">
            <div
              className={`relative w-full max-w-sm sm:max-w-md pointer-events-auto overflow-hidden rounded-2xl p-5 sm:p-6 shadow-xl border border-l-[5px] transition-all duration-300 bg-tactile-dots ${
                displayedSlide.borderClass
              } ${
                darkMode
                  ? 'bg-[#33302c] text-[#f5f0e8] border-[#4a453d]'
                  : 'bg-white text-stone-900 border-stone-200/90'
              }`}
            >
              {/* Rubber Eraser Sweeper Line */}
              <div className={`eraser-sweeper ${isWiping ? 'eraser-active' : ''}`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white rounded-full p-1 shadow-md flex items-center justify-center">
                  <Eraser className="w-3 h-3" />
                </div>
              </div>

              {/* Card Inner Content */}
              <div className={`relative w-full ${isWiping ? 'eraser-wipe-out' : 'eraser-wipe-in'}`}>
                {/* Act & Tag Row */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-semibold text-[11px] uppercase tracking-wider transition-colors ${
                      darkMode
                        ? (displayedSlide.darkTagClass || 'bg-white/10 text-white border border-white/30')
                        : displayedSlide.tagClass
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${displayedSlide.dotColor} animate-pulse`} />
                    <span className={darkMode ? 'text-white' : ''}>{displayedSlide.tag}</span>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      darkMode ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    {displayedSlide.act}
                  </span>
                </div>

                {/* Headline */}
                <h2
                  className={`text-xl sm:text-2xl font-bold tracking-tight leading-snug mb-2.5 ${
                    darkMode ? 'text-[#f5f0e8]' : 'text-stone-900'
                  }`}
                >
                  {displayedSlide.headline}
                </h2>

                {/* Description Body */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                    darkMode ? 'text-[#d6d0c4]' : 'text-stone-700'
                  }`}
                >
                  {displayedSlide.body}
                </p>

                {/* CTA Button */}
                <div className="flex items-center">
                  <button
                    onClick={() => onNavigate(displayedSlide.ctaPath)}
                    className={`group inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98] ${displayedSlide.btnClass} cursor-pointer`}
                  >
                    <span>{displayedSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Slide Selector Pills */}
          <div className="absolute bottom-5 left-0 right-0 z-30 px-4 flex justify-center pointer-events-auto">
            <div
              className={`flex items-center gap-1.5 md:gap-2 backdrop-blur-xl p-1.5 rounded-full shadow-lg border transition-colors ${
                darkMode
                  ? 'bg-[#33302c]/95 border-[#45413a]'
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
                        ? 'bg-[#3d3933] text-stone-200 hover:text-white hover:bg-[#47433b]'
                        : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                    }`}
                  >
                    {idx === 0 && <Terminal className="w-3.5 h-3.5" />}
                    {idx === 1 && <Footprints className="w-3.5 h-3.5" />}
                    {idx === 2 && <PenTool className="w-3.5 h-3.5" />}
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
