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
      className={`relative w-full h-full flex flex-col md:flex-row overflow-hidden font-sans bg-white text-stone-900 select-none transition-all duration-300 ${
        isWiping ? 'eraser-wipe-out' : 'eraser-wipe-in'
      }`}
    >
      {/* Rubber Eraser Sweeper Line during transition */}
      <div className={`eraser-sweeper ${isWiping ? 'eraser-active' : ''}`}>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white rounded-full p-1 shadow-md flex items-center justify-center">
          <Eraser className="w-3 h-3" />
        </div>
      </div>

      {/* ===================== IN BETWEEN: CENTER SPINE WITH RIBBON & BOOKMARK ===================== */}
      {/* Center Spine Fold Shadow (Book gutter depth) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 lg:w-12 pointer-events-none z-20 bg-gradient-to-r from-transparent via-stone-900/[0.07] to-transparent" />

      {/* Ribbon & Bookmark in between the pages */}
      <div className="hidden md:flex flex-col items-center absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none z-30">
        {/* Physical Bookmark tucked into the top spine between pages */}
        <div className="absolute -top-1 w-6 lg:w-7 h-28 lg:h-36 rounded-b-md bg-[#faf7ef] border border-amber-900/25 shadow-md flex flex-col items-center pt-2 overflow-hidden transition-all duration-300">
          {/* Bookmark top ribbon header */}
          <div className="w-full h-1 bg-amber-600/80 mb-1.5" />
          {/* Subtle monogram crest */}
          <div className="w-4 h-4 rounded-full border border-amber-800/40 flex items-center justify-center my-0.5 bg-amber-50/50">
            <span className="text-[7.5px] font-serif font-bold text-amber-800 tracking-tighter">VA</span>
          </div>
          {/* Ornamental bookmark details */}
          <div className="w-3/4 h-px bg-stone-300/80 my-1" />
          <div className="w-1/2 h-px bg-stone-300/60 my-0.5" />
          <div className="w-3/4 h-px bg-stone-300/80 my-0.5" />
          <div className="w-1/2 h-px bg-stone-300/60 my-0.5" />
          {/* Inner bookmark paper shading */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* Satin Bookmark Ribbon hanging down between the pages */}
        <div className="relative top-0 w-3.5 lg:w-4 h-[84%] flex flex-col items-center filter drop-shadow-[2px_3px_5px_rgba(0,0,0,0.32)]">
          {/* Top anchor */}
          <div className="w-full h-2.5 bg-gradient-to-r from-rose-900 via-rose-600 to-rose-900 rounded-t-xs" />
          {/* Ribbon satin body */}
          <div className="w-full flex-grow bg-gradient-to-r from-rose-900 via-rose-600 to-rose-900 relative">
            {/* Satin silk sheen highlight */}
            <div className="absolute top-0 bottom-0 left-[30%] w-[35%] bg-white/20" />
            {/* Fine woven edge borders */}
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-rose-950/60" />
            <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-rose-950/60" />
          </div>
          {/* Classic V-notched / Swallowtail cut at the end of the ribbon */}
          <div
            className="w-full h-4 bg-gradient-to-r from-rose-900 via-rose-600 to-rose-900 shrink-0"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 65%, 0% 100%)',
            }}
          />
        </div>
      </div>

      {/* ===================== LEFT PAGE: PURE WHITE PARCHMENT BACKGROUND ===================== */}
      <div
        className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 transition-colors border-b md:border-b-0 md:border-r parchment-white-spread border-[#d8cdb8]"
      >
        {/* Stacked Diary Page Rim Accent on outer left */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-stone-300/40 via-stone-100/60 to-transparent border-r border-stone-300/30 pointer-events-none" />

        {/* Framed Picture Book Plate with warm antique matting */}
        <div
          className="w-full h-full max-h-[560px] p-2.5 sm:p-3 rounded-2xl transition-all border shadow-sm flex items-center justify-center bg-[#f7f2e7] border-[#d8cdb8]"
        >
          <div className="relative w-full h-full overflow-hidden rounded-xl border border-[#d8cdb8]/60 shadow-inner">
            <img
              src={slide.bgImage}
              alt={slide.headline}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* ===================== RIGHT PAGE: PURE WHITE PARCHMENT BACKGROUND ===================== */}
      <div
        className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-14 xl:p-18 pb-20 sm:pb-24 md:pb-20 transition-colors overflow-y-auto font-sans parchment-white-spread text-[#211c15]"
      >
        {/* Stacked Diary Page Rim Accent on outer right */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-l from-stone-300/40 via-stone-100/60 to-transparent border-l border-stone-300/30 pointer-events-none" />

        <div className="max-w-lg my-auto font-sans relative z-10">
          {/* Heading (above Subheading) */}
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[2.9rem] font-bold tracking-tight text-[#1c1813] leading-[1.12] mb-2 sm:mb-2.5 text-balance">
            {slide.headline}
          </h1>

          {/* Subheading (directly underneath Heading) */}
          <p className={`font-sans text-xs sm:text-sm md:text-base font-semibold tracking-wide ${getSubheadingColor()} mb-5 sm:mb-6`}>
            {slide.tag}
          </p>

          {/* Paragraph */}
          <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed text-stone-700 mb-6 sm:mb-8 font-normal max-w-lg">
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
  );
};
