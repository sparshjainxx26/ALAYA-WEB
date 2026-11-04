import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'dashboard' | 'circuit' | 'report' | 'how-it-works' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-[#2F86FF]/20 bg-[#0A1433]/90 py-10 px-4 sm:px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-lg text-white">ALAYA</span>
            <span className="text-[#9AA3B5]">·</span>
            <span className="text-xs font-mono text-[#C6F432]">clean restrooms, predicted</span>
          </div>
          <p className="text-xs text-[#9AA3B5] mt-1">
            AI-enabled Lavatory & Hygiene Assistant · Measures the room, not the person.
          </p>
        </div>

        {/* Clean Nav Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-[#9AA3B5]">
          <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
            Home
          </button>
          <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
            Live Dashboard
          </button>
          <button onClick={() => onNavigate('circuit')} className="hover:text-[#C6F432] transition-colors">
            Circuit Explorer
          </button>
          <button onClick={() => onNavigate('report')} className="hover:text-white transition-colors">
            Report
          </button>
          <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">
            How it works
          </button>
          <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
            Privacy
          </button>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-mono text-[#9AA3B5] block">
            School Science Exhibition 2026
          </span>
          <span className="text-[11px] text-[#2F86FF] block mt-0.5">
            Arduino Uno · Web Serial API
          </span>
        </div>
      </div>
    </footer>
  );
};
