import React from 'react';
import { ExternalLink, Clock, Briefcase, UserCheck } from 'lucide-react';
import kitchenGardenImg from '../assets/images/kitchen_garden_showcase_1792323606708.jpg';
import comingSoonImg from '../assets/images/coming_soon_card_1792323606281.jpg';

interface ProjectItem {
  id: string;
  name: string;
  link?: string;
  image: string;
  category: 'business' | 'portfolio';
  subtitle?: string;
}

interface ProjectsPageProps {
  darkMode?: boolean;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ darkMode = false }) => {
  // Column 1: Business Websites (Teal Theme)
  const businessProjects: ProjectItem[] = [
    {
      id: 'kitchen-garden',
      name: 'My Kitchen Garden',
      link: 'https://my-kitchen-garden.netlify.app',
      image: kitchenGardenImg,
      category: 'business',
      subtitle: 'E-commerce & Homegrown Produce',
    },
    {
      id: 'india-logistics',
      name: 'New India Logistics (Import Export Business)',
      image: comingSoonImg,
      category: 'business',
      subtitle: 'Global Freight & Supply Chain',
    },
    {
      id: 'south-indian-tea',
      name: 'South Indian Tea',
      image: comingSoonImg,
      category: 'business',
      subtitle: 'Single-Estate Direct Storefront',
    },
    {
      id: 'custom-gifting',
      name: 'Custom Gifting',
      image: comingSoonImg,
      category: 'business',
      subtitle: 'Bespoke Packaging & Hampers',
    },
  ];

  // Column 2: Personal Portfolios (Scarlet Theme)
  const personalPortfolios: ProjectItem[] = [
    {
      id: 'ca-bhawna',
      name: 'CA Bhawna',
      image: comingSoonImg,
      category: 'portfolio',
      subtitle: 'Chartered Accountancy Practice',
    },
    {
      id: 'versatile-shruti',
      name: 'Versatile Shruti',
      image: comingSoonImg,
      category: 'portfolio',
      subtitle: 'Creative Portfolio & Design',
    },
    {
      id: 'pm-ishika',
      name: 'Product Manager Ishika',
      image: comingSoonImg,
      category: 'portfolio',
      subtitle: 'Product Leadership & Systems',
    },
  ];

  const renderProjectCard = (project: ProjectItem, theme: 'teal' | 'scarlet') => {
    const isTeal = theme === 'teal';
    const hasLink = Boolean(project.link);

    const cardContent = (
      <div
        className={`group rounded-2xl transition-all duration-200 overflow-hidden flex flex-row items-stretch w-full max-w-[390px] h-[152px] mx-auto sm:mx-0 shadow-sm border-2 ${
          isTeal
            ? darkMode
              ? 'bg-[#151413] border-stone-800 hover:border-4 hover:border-teal-400 hover:shadow-[0_8px_24px_rgba(20,184,166,0.18)] text-[#f4efe8]'
              : 'bg-white border-stone-200/90 hover:border-4 hover:border-teal-600 hover:shadow-[0_8px_24px_rgba(20,184,166,0.14)] text-stone-900'
            : darkMode
            ? 'bg-[#151413] border-stone-800 hover:border-4 hover:border-rose-400 hover:shadow-[0_8px_24px_rgba(225,29,72,0.18)] text-[#f4efe8]'
            : 'bg-white border-stone-200/90 hover:border-4 hover:border-rose-600 hover:shadow-[0_8px_24px_rgba(225,29,72,0.14)] text-stone-900'
        } ${hasLink ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {/* Left Part: Image (2-part horizontal layout) */}
        <div className="relative w-32 sm:w-36 h-full shrink-0 overflow-hidden bg-stone-100 dark:bg-stone-900">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Status Badge on Image */}
          {hasLink ? (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-teal-600/95 text-white text-[10px] font-bold tracking-wide backdrop-blur-xs flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-200 animate-pulse" />
              <span>Live</span>
            </div>
          ) : (
            <div
              className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide backdrop-blur-xs flex items-center gap-1 shadow-xs ${
                isTeal
                  ? 'bg-stone-900/90 text-teal-300 border border-teal-500/40'
                  : 'bg-stone-900/90 text-rose-300 border border-rose-500/40'
              }`}
            >
              <Clock className="w-2.5 h-2.5" />
              <span>Soon</span>
            </div>
          )}
        </div>

        {/* Right Part: Text */}
        <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow min-w-0 h-full">
          <div>
            {/* Title with hover underline */}
            <h3
              className={`text-sm sm:text-base font-bold tracking-tight leading-snug line-clamp-2 transition-all group-hover:underline underline-offset-2 decoration-2 ${
                isTeal
                  ? darkMode
                    ? 'text-white group-hover:text-teal-300 group-hover:decoration-teal-400'
                    : 'text-stone-900 group-hover:text-teal-700 group-hover:decoration-teal-600'
                  : darkMode
                  ? 'text-white group-hover:text-rose-300 group-hover:decoration-rose-400'
                  : 'text-stone-900 group-hover:text-rose-700 group-hover:decoration-rose-600'
              }`}
            >
              <span>{project.name}</span>
              {hasLink && (
                <ExternalLink
                  className={`inline-block ml-1.5 w-3.5 h-3.5 shrink-0 align-middle ${
                    isTeal ? 'text-teal-500' : 'text-rose-500'
                  }`}
                />
              )}
            </h3>

            {project.subtitle && (
              <p
                className={`text-xs mt-1 leading-snug line-clamp-2 ${
                  darkMode ? 'text-stone-400' : 'text-stone-500'
                }`}
              >
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Action / Link footer in Card */}
          <div className="pt-2 mt-auto border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between shrink-0">
            {project.link ? (
              <span
                className={`text-xs font-semibold inline-flex items-center gap-1 ${
                  isTeal
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                <span>Visit site</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            ) : (
              <span className="text-xs text-stone-400 dark:text-stone-500 italic flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Coming soon</span>
              </span>
            )}
          </div>
        </div>
      </div>
    );

    if (hasLink && project.link) {
      return (
        <a
          key={project.id}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus:outline-none"
        >
          {cardContent}
        </a>
      );
    }

    return <div key={project.id}>{cardContent}</div>;
  };

  return (
    <div
      className={`w-full min-h-[calc(100vh-5rem)] py-8 sm:py-12 px-4 sm:px-8 md:px-12 lg:px-16 transition-colors duration-300 font-sans ${
        darkMode ? 'bg-black text-[#f4efe8]' : 'bg-[#f7f5ef] text-stone-900'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 sm:mb-14 text-center sm:text-left">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 ${
              darkMode ? 'text-white' : 'text-stone-900'
            }`}
          >
            Projects
          </h1>
          <p
            className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              darkMode ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            A curated photogallery of business websites and personal portfolio applications.
          </p>
        </div>

        {/* Two-Column Photogallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-start justify-items-center sm:justify-items-start">
          {/* Column 1: Business Websites (Teal Theme) */}
          <div className="flex flex-col items-center sm:items-start w-full">
            {/* Column Header */}
            <div className="w-full max-w-[390px] pb-3 mb-6 border-b-2 border-teal-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h2
                    className={`text-lg sm:text-xl font-bold tracking-tight ${
                      darkMode ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    Business Websites
                  </h2>
                  <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                    Commercial & Storefronts
                  </span>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-6 sm:gap-8 w-full">
              {businessProjects.map((proj) => renderProjectCard(proj, 'teal'))}
            </div>
          </div>

          {/* Column 2: Personal Portfolios (Scarlet Theme) */}
          <div className="flex flex-col items-center sm:items-start w-full">
            {/* Column Header */}
            <div className="w-full max-w-[390px] pb-3 mb-6 border-b-2 border-rose-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2
                    className={`text-lg sm:text-xl font-bold tracking-tight ${
                      darkMode ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    Personal Portfolios
                  </h2>
                  <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                    Profiles & Case Studies
                  </span>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-6 sm:gap-8 w-full">
              {personalPortfolios.map((proj) => renderProjectCard(proj, 'scarlet'))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
