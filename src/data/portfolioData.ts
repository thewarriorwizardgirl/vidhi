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
  theme: 'yellow' | 'green' | 'red';
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
    ctaText: 'Check out my work samples',
    ctaPath: 'projects',
    theme: 'yellow',
    dotColor: 'bg-[#eab308]',
    activeBtnClass: 'bg-[#eab308] text-[#1e1b18] shadow-sm font-semibold',
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
    theme: 'green',
    dotColor: 'bg-[#16a34a]',
    activeBtnClass: 'bg-[#16a34a] text-white shadow-sm font-semibold',
    borderClass: 'border-l-[#16a34a]',
    tagClass: 'bg-green-600/15 text-green-900 border border-green-600/30',
    darkTagClass: 'bg-green-500/20 text-white border border-green-400/50 shadow-sm',
    btnClass: 'bg-[#16a34a] hover:bg-[#15803d] text-white',
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
    theme: 'red',
    dotColor: 'bg-[#dc2626]',
    activeBtnClass: 'bg-[#dc2626] text-white shadow-sm font-semibold',
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
