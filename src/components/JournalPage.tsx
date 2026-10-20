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
      className={`w-full min-h-[calc(100vh-5rem)] py-8 sm:py-12 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center transition-colors duration-300 font-sans ${
        darkMode ? 'bg-black text-[#f4efe8]' : 'bg-[#f7f5ef] text-stone-900'
      }`}
    >
      <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
        {/* Girl Character Pointing Image - Shown Directly on Page (No Enclosing Boxes) */}
        <div className="w-full flex justify-center mb-6 sm:mb-8">
          <img
            src={girlPointingImg}
            alt="Vidhi pointing to her journal"
            className="w-full max-w-md sm:max-w-lg h-auto max-h-[500px] object-contain drop-shadow-xl select-none"
          />
        </div>

        {/* Actions & Explicit Link - Directly on Page */}
        <div className="w-full max-w-md flex flex-col items-center gap-4 text-center">
          {/* Read Journal Button */}
          <a
            href={journalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white text-base font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>Read Journal</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>

          {/* Explicit Link */}
          <div className="pt-1">
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
  );
};
