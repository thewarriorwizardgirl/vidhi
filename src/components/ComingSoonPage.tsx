import React, { useState } from 'react';
import { PortfolioPage } from './Header';
import { Clock, ArrowLeft, Link as LinkIcon, ExternalLink, Copy, Check } from 'lucide-react';

interface ComingSoonPageProps {
  page: PortfolioPage;
  onNavigateHome: () => void;
  darkMode?: boolean;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  page,
  onNavigateHome,
  darkMode = false,
}) => {
  const [journalUrl, setJournalUrl] = useState('https://your-journal-or-substack-url.com');
  const [contactUrl, setContactUrl] = useState('https://calendly.com/your-booking-or-contact-url');
  const [copied, setCopied] = useState(false);

  const getPageMeta = () => {
    switch (page) {
      case 'projects':
        return {
          title: 'Projects',
          tag: 'Portfolio Archive',
          tagColor: darkMode
            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            : 'bg-amber-500/10 text-amber-900 border-amber-500/30',
          dotColor: 'bg-amber-500',
          description: 'Selected web applications, open source experiments, and case studies are currently being curated.',
          hasUrlPlaceholder: false,
        };
      case 'journal':
        return {
          title: 'Journal',
          tag: 'Nocturne & Field Logs',
          tagColor: darkMode
            ? 'bg-red-500/20 text-red-300 border-red-500/40'
            : 'bg-red-500/10 text-red-900 border-red-500/30',
          dotColor: 'bg-red-500',
          description: 'Nocturne essays, tech reflections, and field logs from the mountains are currently being prepared.',
          hasUrlPlaceholder: true,
          urlLabel: 'External Journal / Substack Publication URL',
          urlValue: journalUrl,
          onUrlChange: setJournalUrl,
          urlPlaceholder: 'https://substack.com/@your-handle',
        };
      case 'my-story':
        return {
          title: 'MyStory',
          tag: 'Background & Cadence',
          tagColor: darkMode
            ? 'bg-stone-700/60 text-stone-200 border-stone-600'
            : 'bg-stone-200/80 text-stone-800 border-stone-300',
          dotColor: 'bg-stone-400',
          description: 'The story of software craft, high altitude mountain passes, and intentional design is coming soon.',
          hasUrlPlaceholder: false,
        };
      case 'contact-me':
        return {
          title: 'Contact Me',
          tag: 'Direct Dispatch',
          tagColor: darkMode
            ? 'bg-emerald-600/20 text-emerald-300 border-emerald-600/40'
            : 'bg-emerald-600/10 text-emerald-900 border-emerald-600/30',
          dotColor: 'bg-emerald-500',
          description: 'Direct inquiry channel and dispatch portal is coming soon.',
          hasUrlPlaceholder: true,
          urlLabel: 'Contact Form / Calendar Booking / Formspree URL',
          urlValue: contactUrl,
          onUrlChange: setContactUrl,
          urlPlaceholder: 'https://calendly.com/your-username',
        };
      default:
        return {
          title: 'Coming Soon',
          tag: 'In Progress',
          tagColor: 'bg-stone-200 text-stone-800 border-stone-300',
          dotColor: 'bg-stone-500',
          description: 'Content is currently being polished.',
          hasUrlPlaceholder: false,
        };
    }
  };

  const meta = getPageMeta();

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`w-full flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none min-h-[calc(100vh-8.5rem)] transition-colors duration-300 ${
        darkMode ? 'bg-[#282623]' : 'bg-[#f7f5ef]'
      }`}
    >
      {/* Outer Card Frame */}
      <div
        className={`w-full max-w-2xl rounded-3xl p-8 sm:p-12 border relative text-center space-y-6 transition-all duration-300 ${
          darkMode
            ? 'bg-[#33302c] border-[#444038] text-[#f5f0e8] shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
            : 'bg-white border-[#ede9e1] text-stone-900 shadow-[0_8px_30px_rgba(0,0,0,0.05)]'
        }`}
      >
        {/* Tag Pill */}
        <div className="flex justify-center">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${meta.tagColor}`}
          >
            <span className={`w-2 h-2 rounded-full ${meta.dotColor} animate-pulse`} />
            <span>{meta.tag}</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1
            className={`text-3xl sm:text-4xl font-bold tracking-tight font-sans ${
              darkMode ? 'text-[#f5f0e8]' : 'text-stone-900'
            }`}
          >
            {meta.title}
          </h1>
          <div
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border ${
              darkMode
                ? 'bg-amber-950/40 text-amber-300 border-amber-600/40'
                : 'bg-amber-50 text-amber-700 border-amber-200/80'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Coming Soon</span>
          </div>
        </div>

        {/* Description */}
        <p
          className={`text-sm sm:text-base leading-relaxed max-w-md mx-auto font-serif ${
            darkMode ? 'text-[#d6d0c4]' : 'text-stone-600'
          }`}
        >
          {meta.description}
        </p>

        {/* URL Placeholder Card (for Journal and Contact Me) */}
        {meta.hasUrlPlaceholder && (
          <div className="pt-2 text-left">
            <div
              className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 transition-colors ${
                darkMode
                  ? 'bg-[#3c3933] border-[#4a463e]'
                  : 'bg-[#faf8f4] border-stone-200/90'
              }`}
            >
              <div className="flex items-center justify-between">
                <label
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    darkMode ? 'text-stone-200' : 'text-stone-600'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{meta.urlLabel}</span>
                </label>
                <span className={`text-[11px] font-mono ${darkMode ? 'text-stone-400' : 'text-stone-400'}`}>
                  URL Placeholder
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={meta.urlValue}
                  onChange={(e) => meta.onUrlChange && meta.onUrlChange(e.target.value)}
                  placeholder={meta.urlPlaceholder}
                  className={`flex-1 border rounded-xl px-3.5 py-2 text-xs sm:text-sm font-mono shadow-2xs focus:outline-none focus:border-amber-400 transition-colors ${
                    darkMode
                      ? 'bg-[#2b2824] border-[#4d4840] text-amber-200 placeholder-stone-500'
                      : 'bg-white border-stone-200 text-stone-800 placeholder-stone-400'
                  }`}
                />

                <button
                  onClick={() => handleCopyUrl(meta.urlValue || '')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors shrink-0 cursor-pointer ${
                    darkMode
                      ? 'bg-[#47433c] hover:bg-[#524d45] text-stone-200 border-[#595349]'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                  }`}
                  title="Copy URL"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>

                {meta.urlValue && (
                  <a
                    href={meta.urlValue}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs flex items-center justify-center transition-colors shrink-0"
                    title="Open Link in New Tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <p className={`text-[11px] ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                You can configure and link your destination URL here anytime.
              </p>
            </div>
          </div>
        )}

        {/* Back to Home Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={onNavigateHome}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer ${
              darkMode
                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
