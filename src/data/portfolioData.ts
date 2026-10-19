import developerWorkstationBg from '../assets/images/cabin_left_swivel_window_1792317845512.jpg';
import explorerRightBg from '../assets/images/explorer_trekker_left_1792319323804.jpg';
import writerNightRightBg from '../assets/images/writer_night_left_1792319322492.jpg';

import image1Mobile from '../assets/images/cabin_left_swivel_window_1792317845512.jpg';
import image2Mobile from '../assets/images/explorer_trekker_left_1792319323804.jpg';
import image3Mobile from '../assets/images/writer_night_left_1792319322492.jpg';

import { PortfolioPage } from '../components/Header';

export interface HeroSlide {
  id: number;
  label: string;
  tag: string;
  act: string;
  headline: string;
  body: string;
  ctaText: string;
  ctaPath: PortfolioPage;
  externalUrl?: string;
  theme: 'yellow' | 'green' | 'teal' | 'red';
  dotColor: string;
  activeBtnClass: string;
  borderClass: string;
  tagClass: string;
  darkTagClass?: string;
  btnClass: string;
  bgImage: string;
  fallbackImage: string;
  bgImageMobile: string;
  icon: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    label: '01 Developer',
    tag: 'Software developer | Writer | Experience Designer',
    act: '',
    headline: 'Creative Technologist',
    body: 'I like building web apps for businesses and portfolios.',
    ctaText: 'Checkout My Work',
    ctaPath: 'projects',
    theme: 'yellow',
    dotColor: 'bg-[#eab308]',
    activeBtnClass: 'bg-amber-500/15 text-stone-900 dark:text-white border-2 border-amber-500 shadow-sm font-semibold',
    borderClass: 'border-l-[#eab308]',
    tagClass: 'bg-amber-500/15 text-amber-900 border border-amber-500/30',
    darkTagClass: 'bg-amber-500/20 text-white border border-amber-400/50 shadow-sm',
    btnClass: 'bg-[#eab308] hover:bg-[#ca8a04] text-[#1e1b18]',
    bgImage: developerWorkstationBg,
    fallbackImage: developerWorkstationBg,
    bgImageMobile: image1Mobile,
    icon: 'terminal',
  },
  {
    id: 1,
    label: '02 Explorer',
    tag: 'Traveler | Outdoor Sports Enthusiast',
    act: '',
    headline: 'Adventurer & Fitness Enthusiast',
    body: 'From high-altitude Himalayan passes to fast badminton rallies, exploration feeds the rhythm of my thinking and creative work.',
    ctaText: 'Explore my journeys',
    ctaPath: 'journal',
    theme: 'teal',
    dotColor: 'bg-[#0d9488]',
    activeBtnClass: 'bg-teal-500/15 text-stone-900 dark:text-white border-2 border-teal-500 shadow-sm font-semibold',
    borderClass: 'border-l-[#0d9488]',
    tagClass: 'bg-teal-600/15 text-teal-900 border border-teal-600/30',
    darkTagClass: 'bg-teal-500/20 text-white border border-teal-400/50 shadow-sm',
    btnClass: 'bg-[#0d9488] hover:bg-[#0f766e] text-white',
    bgImage: explorerRightBg,
    fallbackImage: explorerRightBg,
    bgImageMobile: image2Mobile,
    icon: 'hiking',
  },
  {
    id: 2,
    label: '03 Writer',
    tag: 'Stories | Reflections | Experiences',
    act: '',
    headline: 'Midnight Writer & Thinker',
    body: 'Late night reflections, tech essays, and storybook chronicles. Capturing the nuances and quiet spaces between lines of code.',
    ctaText: 'Read my journal',
    ctaPath: 'journal',
    externalUrl: 'https://journal-aggarwalvidhi.netlify.app/',
    theme: 'red',
    dotColor: 'bg-[#dc2626]',
    activeBtnClass: 'bg-rose-500/15 text-stone-900 dark:text-white border-2 border-rose-500 shadow-sm font-semibold',
    borderClass: 'border-l-[#dc2626]',
    tagClass: 'bg-red-500/15 text-red-900 border border-red-500/30',
    darkTagClass: 'bg-red-500/20 text-white border border-red-400/50 shadow-sm',
    btnClass: 'bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-md',
    bgImage: writerNightRightBg,
    fallbackImage: writerNightRightBg,
    bgImageMobile: image3Mobile,
    icon: 'edit_note',
  },
];
