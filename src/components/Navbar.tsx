import React from 'react';
import { ConnectionStatus } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'dashboard' | 'report' | 'how-it-works' | 'privacy';
  onNavigate: (tab: 'home' | 'dashboard' | 'report' | 'how-it-works' | 'privacy') => void;
  connectionStatus: ConnectionStatus;
  currentBand: 0 | 1 | 2;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  connectionStatus,
  currentBand,
}) => {
  const navItems: Array<{ id: 'home' | 'dashboard' | 'report' | 'how-it-works' | 'privacy'; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Live Dashboard' },
    { id: 'report', label: 'Report' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'privacy', label: 'Privacy' },
  ];

  return (
    <div className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <header className="pointer-events-auto max-w-7xl mx-auto floating-navbar rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300">
        <div className="flex items-center justify-between gap-3">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F86FF] rounded-full shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-[#101C40] border border-[#2F86FF]/60 flex items-center justify-center text-[#2F86FF] font-heading font-black text-sm shadow-[0_0_10px_rgba(47,134,255,0.3)] group-hover:border-[#C6F432] group-hover:text-[#C6F432] transition-colors">
              A
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-lg tracking-wider text-white group-hover:text-[#90C1FF] transition-colors">
                ALAYA
              </span>
              <span className="hidden lg:inline text-[10px] font-mono text-[#C6F432] px-1.5 py-0.5 rounded-full bg-[#C6F432]/10 border border-[#C6F432]/30">
                v2.4
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#C6F432] bg-[#2F86FF]/20 border border-[#2F86FF]/50 shadow-[0_0_15px_rgba(47,134,255,0.25)]'
                      : 'text-[#9AA3B5] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Traffic Light Motif & Connection Status */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Traffic Light Motif */}
            <div
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-[#0A1433]/90 border border-[#2F86FF]/40 rounded-full shadow-inner"
              title={`Hygiene Status: ${currentBand === 0 ? 'Clean (Green)' : currentBand === 1 ? 'Plan a Clean (Amber)' : 'Clean Now (Red)'}`}
              aria-label="Hygiene Traffic Light Indicator"
            >
              {/* Green Dot (#3BB54A) */}
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentBand === 0
                    ? 'bg-[#3BB54A] shadow-[0_0_10px_#3BB54A] scale-110'
                    : 'bg-[#3BB54A]/30'
                }`}
              />
              {/* Amber Dot (#F5B301) */}
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentBand === 1
                    ? 'bg-[#F5B301] shadow-[0_0_10px_#F5B301] scale-110 animate-pulse'
                    : 'bg-[#F5B301]/30'
                }`}
              />
              {/* Red Dot (#E0525A) */}
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentBand === 2
                    ? 'bg-[#E0525A] shadow-[0_0_12px_#E0525A] scale-125 animate-ping'
                    : 'bg-[#E0525A]/30'
                }`}
              />
            </div>

            {/* Quick Hardware Action / Dashboard CTA */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#2F86FF]/15 text-[#2F86FF] hover:bg-[#2F86FF] hover:text-white border border-[#2F86FF]/40 shadow-[0_0_15px_rgba(47,134,255,0.15)] transition-all whitespace-nowrap"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected'
                    ? 'bg-[#C6F432] animate-pulse'
                    : connectionStatus === 'simulated'
                    ? 'bg-[#2F86FF]'
                    : 'bg-[#9AA3B5]'
                }`}
              />
              {connectionStatus === 'connected'
                ? 'Arduino Live'
                : connectionStatus === 'simulated'
                ? 'Simulator'
                : 'Offline'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around pt-2 mt-2 border-t border-[#2F86FF]/20 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-2 py-1 text-[11px] font-semibold whitespace-nowrap rounded-lg transition-colors shrink-0 ${
                  isActive ? 'text-[#C6F432] bg-[#2F86FF]/20 font-bold' : 'text-[#9AA3B5]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>
    </div>
  );
};
