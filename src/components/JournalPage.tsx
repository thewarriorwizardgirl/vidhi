import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import girlPointingImg from '../assets/images/girl_pointing_journal_1792321980355.jpg';

interface JournalPageProps {
  darkMode?: boolean;
}

export const JournalPage: React.FC<JournalPageProps> = ({ darkMode = false }) => {
  const journalUrl = 'https://journal-aggarwalvidhi.netlify.app/';

  return (
    <div
      className={`w-full min-h-[calc(100vh-5rem)] py-8 sm:py-12 px-3 sm:px-6 md:px-10 lg:px-16 flex items-center justify-center transition-colors duration-300 font-sans ${
        darkMode ? 'bg-black text-[#f4efe8]' : 'bg-[#f7f5ef] text-stone-900'
      }`}
    >
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center">
        {/* Main Card with Character Image, Read Button & Explicit Link */}
        <div
          className={`w-full rounded-3xl border transition-all duration-300 overflow-hidden shadow-xl p-6 sm:p-8 md:p-10 flex flex-col items-center ${
            darkMode
              ? 'bg-[#181614] border-stone-800 text-[#f4efe8]'
              : 'bg-white border-stone-200/90 text-stone-900 shadow-[0_12px_40px_rgba(0,0,0,0.06)]'
          }`}
        >
          {/* Girl Character Pointing Image */}
          <div className="w-full max-w-2xl mb-8 flex justify-center">
            <div
              className={`w-full rounded-2xl border p-2 sm:p-3 shadow-md overflow-hidden ${
                darkMode ? 'bg-[#12100e] border-stone-800' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <img
                src={girlPointingImg}
                alt="Vidhi pointing to her journal"
                className="w-full h-auto max-h-[500px] object-contain rounded-xl mx-auto"
              />
            </div>
          </div>

          {/* Actions & Explicit Link Container */}
          <div className="w-full max-w-lg flex flex-col items-center gap-4 text-center">
            {/* Read Journal Button */}
            <a
              href={journalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white text-base font-bold shadow-lg transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              <span>Read Journal</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>

            {/* Explicit Link */}
            <div className="pt-2">
              <a
                href={journalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm sm:text-base font-semibold tracking-wide underline underline-offset-4 transition-colors break-all ${
                  darkMode
                    ? 'text-amber-400 hover:text-amber-300'
                    : 'text-amber-700 hover:text-amber-800'
                }`}
              >
                https://journal-aggarwalvidhi.netlify.app/
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
