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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0A1433]/85 border-b border-[#2F86FF]/20 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F86FF] rounded-lg"
        >
          <div className="w-8 h-8 rounded-lg bg-[#101C40] border border-[#2F86FF]/50 flex items-center justify-center text-[#2F86FF] font-heading font-black text-base shadow-sm group-hover:border-[#2F86FF] transition-colors">
            A
          </div>
          <div>
            <div className="font-heading font-black text-xl tracking-wider text-white flex items-center gap-2">
              ALAYA
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#C6F432] bg-[#101C40] border border-[#2F86FF]/40 shadow-[0_0_12px_rgba(47,134,255,0.15)]'
                    : 'text-[#9AA3B5] hover:text-white hover:bg-[#101C40]/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Traffic Light Motif & Connection Status */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Traffic Light Motif */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 bg-[#101C40] border border-[#2F86FF]/30 rounded-full"
            title={`Hygiene Status: ${currentBand === 0 ? 'Clean (Green)' : currentBand === 1 ? 'Plan a Clean (Amber)' : 'Clean Now (Red)'}`}
            aria-label="Hygiene Traffic Light Indicator"
          >
            {/* Green Dot (#3BB54A) */}
            <span
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentBand === 0
                  ? 'bg-[#3BB54A] shadow-[0_0_8px_#3BB54A] scale-110'
                  : 'bg-[#3BB54A]/30'
              }`}
            />
            {/* Amber Dot (#F5B301) */}
            <span
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentBand === 1
                  ? 'bg-[#F5B301] shadow-[0_0_8px_#F5B301] scale-110 animate-pulse'
                  : 'bg-[#F5B301]/30'
              }`}
            />
            {/* Red Dot (#E0525A) */}
            <span
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentBand === 2
                  ? 'bg-[#E0525A] shadow-[0_0_10px_#E0525A] scale-125 animate-ping'
                  : 'bg-[#E0525A]/30'
              }`}
            />
          </div>

          {/* Quick Hardware Action / Dashboard CTA */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg bg-[#2F86FF]/15 text-[#2F86FF] hover:bg-[#2F86FF] hover:text-white border border-[#2F86FF]/40 transition-colors whitespace-nowrap"
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
              : 'Box Offline'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex md:hidden items-center justify-around pt-2.5 mt-2 border-t border-[#2F86FF]/15 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-2 py-1 text-xs font-medium whitespace-nowrap ${
                isActive ? 'text-[#C6F432] font-semibold' : 'text-[#9AA3B5]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
