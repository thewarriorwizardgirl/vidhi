import React, { useState, useRef, useEffect } from 'react';
import { PortfolioPage } from './Header';
import {
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  ChevronDown,
  MapPin,
  Sparkles,
} from 'lucide-react';
import characterAvatar from '../assets/images/character_avatar_timeline_1792320820922.jpg';

interface MyStoryPageProps {
  onNavigate: (page: PortfolioPage) => void;
  darkMode?: boolean;
}

interface TimelineItem {
  id: string;
  dateBadge: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  category: 'work' | 'teaching' | 'research' | 'education';
  categoryLabel: string;
  summary: string;
  bullets: string[];
  techStack?: string[];
  awardOrHighlight?: string;
  icon: React.ReactNode;
}

export const MyStoryPage: React.FC<MyStoryPageProps> = ({ onNavigate, darkMode = false }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'work' | 'teaching' | 'education'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null); // None expanded by default
  const [characterTop, setCharacterTop] = useState<number>(0);

  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  const timelineData: TimelineItem[] = [
    {
      id: 'salesforce',
      dateBadge: 'JAN, 2025 – PRESENT',
      period: 'Jan 2025 – Present',
      title: 'Senior Member of Technical Staff (SMTS)',
      organization: 'Salesforce (Data Cloud)',
      location: 'Bengaluru, India',
      category: 'work',
      categoryLabel: 'Work Experience',
      summary: 'Architecting core software systems processing massive customer data 24/7 with high reliability.',
      bullets: [
        'Build and scale the core software systems that process massive amounts of customer data every second for businesses worldwide.',
        'Collaborate with international engineering teams to ensure the Data Cloud platform stays fast, reliable, resilient, and runs 24/7 without crashing.',
      ],
      techStack: ['LWC', 'React', 'Java', 'Spring Boot', 'Salesforce Data Cloud', 'Microservices'],
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 'indihood',
      dateBadge: 'SEP, 2020 – JAN, 2025',
      period: 'Sept 2020 – Jan 2025',
      title: 'Application Developer',
      organization: 'Indihood',
      location: 'Bengaluru, India',
      category: 'work',
      categoryLabel: 'Work Experience',
      summary: 'Built automated loan repayment engines, 12-language legal contracts, and instant QR payment systems.',
      bullets: [
        'Built an automated payment system that processes electronic loan repayments quickly and securely without manual intervention.',
        'Created a smart document tool that automatically generates official legal contracts in 12 different regional Indian languages.',
        'Connected automated SMS and WhatsApp notification services, as well as instant QR code payment options for users.',
        'Designed simple and secure login systems using OTPs (one-time passwords) to protect user accounts.',
      ],
      techStack: ['Kotlin', 'Java', 'TypeScript', 'Flutter', 'Google Cloud (GCP)', 'REST APIs'],
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 'scholarminds',
      dateBadge: 'DEC, 2018 – SEP, 2020',
      period: 'Dec 2018 – Sept 2020',
      title: 'Founder | Tech Department',
      organization: 'ScholarMinds',
      location: 'Bengaluru, India',
      category: 'teaching',
      categoryLabel: 'Leadership & Teaching',
      summary: 'Combined software programming with hands-on robotics and microcontroller hardware for learners.',
      bullets: [
        'Founded the technology wing of ScholarMinds, spearheading hands-on tech curriculum.',
        'Taught building fun, hands-on projects combining software code with simple robotics, microcontrollers, and electronics hardware.',
      ],
      techStack: ['Python', 'C++', 'Arduino', 'Raspberry Pi', 'Robotics Hardware'],
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'bofa',
      dateBadge: 'JUL, 2016 – AUG, 2018',
      period: 'Jul 2016 – Aug 2018',
      title: 'Senior Software Associate (Financial Systems)',
      organization: 'Bank of America',
      location: 'Gurgaon, India',
      category: 'work',
      categoryLabel: 'Financial Tech',
      summary: 'Engineered backend for peer-to-peer money transfers and improved internal web app latency for investment bankers.',
      bullets: [
        'Built the background software for a person-to-person money transfer system that safely links bank accounts to phone numbers and email addresses.',
        'Improved the look, feel, and loading speed of internal web applications used daily by investment bankers worldwide.',
      ],
      techStack: ['Java', 'Spring Framework', 'JavaScript', 'SQL', 'Financial Systems'],
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 'codingblocks',
      dateBadge: 'DEC, 2015 – AUG, 2016',
      period: 'Dec 2015 – Aug 2016',
      title: 'Teaching Assistant',
      organization: 'Coding Blocks',
      location: 'New Delhi, India',
      category: 'teaching',
      categoryLabel: 'Teaching',
      summary: 'Taught programming, data structures, and problem-solving to over 200 college students.',
      bullets: [
        'Taught programming, algorithms, and problem-solving skills to over 200 college students and aspiring developers.',
        'Authored technical blogs for Coding Ninjas breaking down complex algorithmic concepts into digestible steps.',
      ],
      techStack: ['C++', 'Data Structures & Algorithms', 'Technical Writing'],
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'iisc',
      dateBadge: 'APR, 2014 – AUG, 2014',
      period: 'Apr 2014 – Aug 2014',
      title: 'Research Intern — Biomedical Diagnostics',
      organization: 'Indian Institute of Science (IISc)',
      location: 'Bengaluru, India',
      category: 'research',
      categoryLabel: 'Research & Innovation',
      summary: 'Helped build a portable laser-based diagnostic malaria detection device; received National Innovation Award.',
      bullets: [
        'Helped build a portable diagnostic device for malaria detection that analyzes blood samples on the spot using laser optics and custom software.',
        'Awarded the "Best Innovator\'s Pitch" from the Government of India for the breakthrough project.',
      ],
      techStack: ['Optical Laser Diagnostics', 'Custom Diagnostic Software', 'Signal Analysis'],
      awardOrHighlight: "Won Government of India's 'Best Innovator's Pitch' Award",
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: 'dtu',
      dateBadge: '2012 – 2016',
      period: '2012 – 2016',
      title: 'Bachelor of Technology (B.Tech)',
      organization: 'Delhi College of Engineering (DTU)',
      location: 'Delhi, India',
      category: 'education',
      categoryLabel: 'Education & Leadership',
      summary: 'Major in Electronics Engineering, Minors in Computer Science & Physics (GPA: 7.7/10.0).',
      bullets: [
        'Major: Electronics Engineering | Minors: Computer Science & Physics (GPA: 7.7 / 10.0).',
        'Founder of 3Z3S (sustainable and smart places) — 2nd Position in Delhi Business Plan Contest (2015).',
        'Transmission Systems Lead at Efficycle-DTU, Team Coordinator at Texas Instruments Analog Circuit Design (2014).',
        'Organizer cum Compere of E-Summit 2014, Engifest 2014, Global Alumni Conclave 2013, and Student Member at E-Cell DTU, IEEE-DTU, Taekwondo Club DTU.',
      ],
      techStack: ['Computer Science', 'Physics', 'Electronics Engineering', 'Team Leadership'],
      icon: <GraduationCap className="w-4 h-4" />,
    },
  ];

  const filteredData = timelineData.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'work') return item.category === 'work';
    if (activeFilter === 'teaching') return item.category === 'teaching' || item.category === 'research';
    if (activeFilter === 'education') return item.category === 'education';
    return true;
  });

  // Calculate vertical position of character avatar to follow active or top section
  useEffect(() => {
    const updateCharacterPosition = () => {
      const targetId = expandedId || filteredData[0]?.id;
      if (!targetId) return;
      const activeEl = itemRefs.current[targetId];
      const containerEl = containerRef.current;
      if (activeEl && containerEl) {
        const containerRect = containerEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        const relativeTop = activeRect.top - containerRect.top + 8;
        setCharacterTop(relativeTop);
      }
    };

    updateCharacterPosition();
    const t1 = setTimeout(updateCharacterPosition, 60);
    const t2 = setTimeout(updateCharacterPosition, 320);
    window.addEventListener('resize', updateCharacterPosition);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateCharacterPosition);
    };
  }, [expandedId, activeFilter, filteredData]);

  const handleToggleSection = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`w-full min-h-[calc(100vh-5rem)] py-8 sm:py-12 px-3 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300 font-sans ${
        darkMode ? 'bg-black text-[#f4efe8]' : 'bg-[#f7f5ef] text-stone-900'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Top Header Section */}
        <div className="mb-8 sm:mb-12">
          {/* Main Heading - Explicitly White in Dark Mode */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-stone-900'
            }`}
          >
            Professional Journey
          </h1>

          {/* Subtitle text requested by user */}
          <p
            className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-6 ${
              darkMode ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            Software Engineer with 8+ years of experience crafting large-scale, resilient digital platforms for. Click any milestone to explore technical achievements, architectures, and stories.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-stone-200/80 dark:border-stone-800 pb-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : darkMode
                  ? 'bg-[#2f2b26] text-stone-300 hover:text-white hover:bg-[#38332d]'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              All Milestones ({timelineData.length})
            </button>
            <button
              onClick={() => setActiveFilter('work')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'work'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : darkMode
                  ? 'bg-[#2f2b26] text-stone-300 hover:text-white hover:bg-[#38332d]'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              Software Engineering (3)
            </button>
            <button
              onClick={() => setActiveFilter('teaching')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'teaching'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : darkMode
                  ? 'bg-[#2f2b26] text-stone-300 hover:text-white hover:bg-[#38332d]'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              EdTech & Research (3)
            </button>
            <button
              onClick={() => setActiveFilter('education')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'education'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : darkMode
                  ? 'bg-[#2f2b26] text-stone-300 hover:text-white hover:bg-[#38332d]'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              Education (1)
            </button>
          </div>
        </div>

        {/* Timeline Infographic Container */}
        <div
          ref={containerRef}
          className="relative pt-2 pb-8 pl-2 sm:pl-4"
        >
          {/* Vertical Timeline Guide Line (Deep Scarlet) */}
          <div
            className="absolute left-[138px] sm:left-[178px] top-6 bottom-8 w-[2px] bg-gradient-to-b from-rose-600 via-stone-300 to-stone-200 dark:via-stone-700 dark:to-stone-800"
          />

          {/* Traveling Character Avatar Gliding Along the Timeline (Deep Scarlet) */}
          <div
            className="absolute left-[122px] sm:left-[162px] z-30 pointer-events-none transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateY(${characterTop}px)`,
            }}
          >
            <div className="relative group">
              {/* Outer Deep Scarlet Glow */}
              <div className="absolute -inset-1 rounded-full bg-rose-500/40 dark:bg-rose-500/30 blur-sm animate-pulse" />
              {/* Character Avatar Round Token */}
              <img
                src={characterAvatar}
                alt="Vidhi Aggarwal - Guide along timeline"
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 sm:ring-3 ring-rose-600 shadow-md bg-rose-50"
              />
              {/* Active Marker Dot */}
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-rose-600 rounded-full border-2 border-white dark:border-[#22201d]" />
            </div>
          </div>

          {/* Timeline Milestones List */}
          <div className="space-y-6 sm:space-y-8">
            {filteredData.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  onClick={() => handleToggleSection(item.id)}
                  className="group relative flex items-start cursor-pointer select-none transition-all duration-200"
                >
                  {/* Left Column: Date Badge Pill (Deep Scarlet when expanded, Teal when inactive) */}
                  <div className="w-[120px] sm:w-[155px] shrink-0 pr-3 sm:pr-5 text-right pt-1.5">
                    <span
                      className={`inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-tight transition-all duration-300 shadow-xs ${
                        isExpanded
                          ? 'bg-rose-600 text-white shadow-sm scale-105'
                          : darkMode
                          ? 'bg-teal-950/60 text-teal-300 border border-teal-800 group-hover:border-rose-500/60'
                          : 'bg-teal-50 text-teal-800 border border-teal-200 group-hover:border-teal-400'
                      }`}
                    >
                      {item.dateBadge}
                    </span>
                  </div>

                  {/* Center Node Circle (Deep Scarlet) */}
                  <div className="relative z-10 shrink-0 w-8 flex justify-center pt-2.5">
                    <div
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                        isExpanded
                          ? 'bg-rose-600 ring-4 ring-rose-100 dark:ring-rose-950 scale-125'
                          : darkMode
                          ? 'bg-stone-600 ring-4 ring-[#22201d] group-hover:bg-rose-500'
                          : 'bg-rose-600 ring-4 ring-[#f7f5ef] group-hover:bg-rose-700'
                      }`}
                    />
                  </div>

                  {/* Right Column: Content Card */}
                  <div className="flex-grow pl-3 sm:pl-5">
                    <div
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                        isExpanded
                          ? darkMode
                            ? 'bg-[#181614] border-rose-600/50 shadow-md ring-1 ring-rose-500/30'
                            : 'bg-white border-rose-500/40 shadow-md ring-1 ring-rose-500/20'
                          : darkMode
                          ? 'bg-[#141210] border-stone-800 hover:border-stone-700'
                          : 'bg-white/80 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {/* Card Header Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          {/* Heading with Animated Underline on Hover & Expand - Explicitly White in Dark Mode */}
                          <div className="relative inline-block pb-0.5">
                            <h3
                              className={`text-base sm:text-lg md:text-xl font-bold tracking-tight transition-colors duration-200 ${
                                isExpanded
                                  ? darkMode
                                    ? 'text-rose-400'
                                    : 'text-rose-700'
                                  : darkMode
                                  ? 'text-white group-hover:text-rose-400'
                                  : 'text-stone-900 group-hover:text-rose-700'
                              }`}
                            >
                              {item.title}
                            </h3>
                            {/* Animated Underline Line (Deep Scarlet) */}
                            <span
                              className={`absolute bottom-0 left-0 h-[2.5px] bg-rose-600 dark:bg-rose-400 transition-all duration-300 ${
                                isExpanded
                                  ? 'w-full'
                                  : 'w-0 group-hover:w-full'
                              }`}
                            />
                          </div>

                          {/* Organization & Location Subtitle */}
                          <div className={`flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 text-xs sm:text-sm ${
                            darkMode ? 'text-stone-300' : 'text-stone-500'
                          }`}>
                            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-stone-700'}`}>
                              {item.organization}
                            </span>
                            <span>·</span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-stone-400" />
                              {item.location}
                            </span>
                          </div>
                        </div>

                        {/* Chevron Expand Indicator */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isExpanded
                              ? 'rotate-180 bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                              : 'text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-200'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Brief Summary (Always visible) */}
                      <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Expanded Section (Revealed when clicked) */}
                      <div
                        className={`overflow-hidden transition-all duration-400 ease-in-out ${
                          isExpanded
                            ? 'max-h-[600px] opacity-100 mt-4 pt-3 border-t border-stone-200/70 dark:border-stone-700/60'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        {/* Highlights / Awards Banner if present (Deep Scarlet Theme) */}
                        {item.awardOrHighlight && (
                          <div className="mb-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs font-semibold text-rose-800 dark:text-rose-300">
                            <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                            <span>{item.awardOrHighlight}</span>
                          </div>
                        )}

                        {/* Detailed CV Bullets */}
                        <ul className="space-y-2 mb-4">
                          {item.bullets.map((bullet, idx) => (
                            <li
                              key={idx}
                              className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 flex items-start gap-2.5 leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack Chips */}
                        {item.techStack && item.techStack.length > 0 && (
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-1.5">
                              Core Technologies & Domains
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {item.techStack.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                                    darkMode
                                      ? 'bg-[#221f1d] text-teal-300/90 border border-teal-900/50'
                                      : 'bg-teal-50/70 text-teal-800 border border-teal-200/60'
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
