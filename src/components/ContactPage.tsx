import React, { useState } from 'react';
import { Mail, MessageCircle, Copy, Check, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  darkMode?: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ darkMode = false }) => {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'thewarriorwizardgirl@gmail.com';
  const whatsappUrl = 'https://wa.me/?text=Hi%20Vidhi!%20I%20would%20like%20to%20discuss%20launching%20or%20upgrading%20a%20website%20or%20blog.';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`w-full min-h-[calc(100vh-5rem)] py-8 sm:py-12 px-3 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300 font-sans ${
        darkMode ? 'bg-black text-[#f4efe8]' : 'bg-[#f7f5ef] text-stone-900'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <div className="mb-8 sm:mb-12">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 ${
              darkMode ? 'text-white' : 'text-stone-900'
            }`}
          >
            Contact Me
          </h1>
          <p
            className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl ${
              darkMode ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            Whether you want to launch or upgrade a website or just want to correspond, here is how you can reach me directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Section 1: WhatsApp Web / Blog Launch (Teal Color) */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm flex flex-col justify-between ${
              darkMode
                ? 'bg-[#181614] border-stone-800 text-[#f4efe8]'
                : 'bg-white border-stone-200/90 text-stone-900 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'
            }`}
          >
            <div>
              {/* Teal Icon Badge */}
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 border border-teal-500/20">
                <MessageCircle className="w-6 h-6" />
              </div>

              <h2
                className={`text-xl sm:text-2xl font-bold tracking-tight mb-3 leading-snug ${
                  darkMode ? 'text-white' : 'text-stone-900'
                }`}
              >
                Want to launch or upgrade your website or blog?
              </h2>

              <p
                className={`text-xs sm:text-sm mb-6 leading-relaxed ${
                  darkMode ? 'text-stone-300' : 'text-stone-600'
                }`}
              >
                Send a direct message on WhatsApp to discuss web applications, business websites, architectures, or custom portfolio design.
              </p>
            </div>

            <div>
              {/* Teal Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Whatsapp me</span>
              </a>
            </div>
          </div>

          {/* Section 2: Direct Email & Personal Correspondence (Red, Vibrant Scarlet Shade) */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm flex flex-col justify-between ${
              darkMode
                ? 'bg-[#181614] border-stone-800 text-[#f4efe8]'
                : 'bg-white border-stone-200/90 text-stone-900 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'
            }`}
          >
            <div>
              {/* Vibrant Scarlet Red Icon Badge */}
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5 border border-rose-500/20">
                <Mail className="w-6 h-6" />
              </div>

              <h2
                className={`text-xl sm:text-2xl font-bold tracking-tight mb-3 leading-snug ${
                  darkMode ? 'text-white' : 'text-stone-900'
                }`}
              >
                Write to Me
              </h2>

              {/* Exact user text with Vibrant Scarlet Link */}
              <p
                className={`text-xs sm:text-sm mb-6 leading-relaxed ${
                  darkMode ? 'text-stone-300' : 'text-stone-600'
                }`}
              >
                Whether an essay reminded you of a mountain trail you walked, a heavy barbell session, or a quiet Tuesday, or just want to correspond..Write to me on{' '}
                <a
                  href={`mailto:${emailAddress}`}
                  className="font-bold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  {emailAddress}
                </a>
                . I read every letter sent my way.
              </p>

              {/* Email Address Display Box with Copy */}
              <div
                className={`p-3.5 rounded-xl border mb-6 flex items-center justify-between gap-2 ${
                  darkMode
                    ? 'bg-[#12100e] border-stone-800 text-stone-200'
                    : 'bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold truncate">
                    {emailAddress}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors flex items-center gap-1 shrink-0 cursor-pointer ${
                    darkMode
                      ? 'border-stone-700 hover:bg-stone-800 text-stone-200'
                      : 'border-stone-300 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-rose-500" />
                      <span className="text-rose-500 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              {/* Vibrant Scarlet Red Button */}
              <a
                href={`mailto:${emailAddress}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Write to me</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
