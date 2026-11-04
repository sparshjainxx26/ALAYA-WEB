import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, EyeOff, Sparkles, Activity, Cpu, CheckCircle2, MapPin } from 'lucide-react';

// =====================================================================
// 📸 CHANGE HOME PAGE PHOTOS HERE (CODE MEIN YAHAAN SE CHANGE KAREIN):
// =====================================================================
// 1. Hero Device Photo (Hero section ke right side me):
export const HERO_DEVICE_PHOTO = '/src/assets/images/alaya_smart_box_hero_1793812160975.jpg';

// 2. Washroom Installation Photo (Deployment architecture section me):
export const INSTALLATION_PHOTO = '/src/assets/images/alaya_device_installation_1793812160798.jpg';
// =====================================================================

interface HomePageProps {
  onNavigate: (tab: 'home' | 'dashboard' | 'report' | 'how-it-works' | 'privacy') => void;
  onConnectBox: () => void;
  isSerialSupported: boolean;
  onStartSimulator: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onStartSimulator,
}) => {
  return (
    <div className="relative w-full">
      {/* Hero Section with Split Grid featuring the ALAYA Smart Box Photo */}
      <section className="min-h-[85vh] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7">
            {/* Science Exhibition Category */}
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono">
              <span className="text-[#C6F432] font-semibold bg-[#C6F432]/10 px-2.5 py-1 rounded-md border border-[#C6F432]/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                School Science Exhibition 2026
              </span>
              <span className="text-[#9AA3B5]">·</span>
              <span className="text-[#2F86FF] font-medium">IoT & Embedded Systems Category</span>
            </div>

            {/* Big ALAYA Wordmark & Subtitle */}
            <h1 className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-white mb-2">
              ALAYA
            </h1>
            <p className="font-heading font-bold text-xl sm:text-2xl text-[#2F86FF] mb-2 tracking-wide">
              AI-enabled Lavatory & Hygiene Assistant
            </p>

            <p className="font-heading text-lg sm:text-xl text-[#C6F432] font-semibold italic mb-4">
              "clean restrooms, predicted"
            </p>

            <p className="text-xl sm:text-2xl text-white/95 font-medium leading-relaxed max-w-2xl mb-6">
              Measures the room, not the person.
            </p>

            <p className="text-sm sm:text-base text-[#9AA3B5] leading-relaxed max-w-xl mb-8">
              A camera-free smart washroom hygiene monitor built on Arduino Uno and edge micro-telemetry.
              ALAYA warns maintenance teams before restrooms turn unhygienic, verifies chemical sanitizer
              application, and respects student privacy with zero optical sensors.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-[#2F86FF] hover:bg-[#2570d8] shadow-[0_0_25px_rgba(47,134,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Open Live Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('report')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-[#C6F432] bg-[#101C40] border border-[#2F86FF]/40 hover:border-[#C6F432] hover:bg-[#101C40]/80 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Report a problem
              </button>

              <button
                onClick={onStartSimulator}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs text-[#9AA3B5] hover:text-white border border-[#2F86FF]/20 hover:border-[#2F86FF]/50 bg-[#0A1433]/70 transition-all"
              >
                <Cpu className="w-4 h-4 text-[#2F86FF]" />
                Demo Simulator
              </button>
            </div>
          </div>

          {/* Right Column: Hero Photo Showcase of ALAYA Smart Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#2F86FF]/30 to-[#C6F432]/30 opacity-70 blur-xl group-hover:opacity-100 transition duration-500" />

              {/* Main Photo Card */}
              <div className="relative alaya-card p-3 overflow-hidden shadow-2xl">
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] bg-[#0A1433]">
                  <img
                    src={HERO_DEVICE_PHOTO}
                    alt="ALAYA Smart Washroom Hardware Unit with Green, Amber, Red Status LEDs and Sniffing Grille"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Dark subtle gradient scrim at bottom for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1433] via-transparent to-transparent opacity-85" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#101C40]/90 backdrop-blur-md border border-[#2F86FF]/40 text-[11px] font-mono text-[#C6F432]">
                      <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                      <span>Hardware Prototype v2.4</span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#101C40]/90 backdrop-blur-md border border-[#2F86FF]/40 text-[11px] font-mono text-white">
                      <EyeOff className="w-3 h-3 text-[#2F86FF]" />
                      <span>0 Cameras</span>
                    </div>
                  </div>

                  {/* Photo Caption / Callouts */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-lg bg-[#101C40]/95 backdrop-blur-md border border-[#2F86FF]/30">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold">ALAYA Sensor Node Unit</span>
                      <span className="text-[#C6F432]">₹2,000 BOM</span>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-[11px] text-[#9AA3B5]">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3BB54A]" />
                        Traffic Light LEDs
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-[#2F86FF]" />
                        VOC Gas Grille
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Exact Stats Strip from prompt */}
        {/* "4 sensors · 1-second checks · 0 cameras · ₹2,000 per washroom" */}
        <div className="mt-16 pt-8 border-t border-[#2F86FF]/25">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div className="p-4 rounded-xl bg-[#101C40]/60 border border-[#2F86FF]/25">
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#C6F432] tabular-nums block">
                4 Sensors
              </span>
              <span className="text-xs text-[#9AA3B5] mt-1 block">
                Air VOC, PIR Footfall, Moisture, Soap Level
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#101C40]/60 border border-[#2F86FF]/25">
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#2F86FF] tabular-nums block">
                1-Second Checks
              </span>
              <span className="text-xs text-[#9AA3B5] mt-1 block">
                Continuous real-time edge telemetry loop
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#101C40]/60 border border-[#2F86FF]/25">
              <span className="font-heading font-black text-2xl sm:text-3xl text-white tabular-nums block">
                0 Cameras
              </span>
              <span className="text-xs text-[#9AA3B5] mt-1 block">
                100% privacy-preserving non-biometric sensing
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#101C40]/60 border border-[#2F86FF]/25">
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#C6F432] tabular-nums block">
                ₹2,000
              </span>
              <span className="text-xs text-[#9AA3B5] mt-1 block">
                Per washroom hardware BOM cost
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section: Predicts · Verifies · Private */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-widest text-[#2F86FF] font-semibold">
            The Three Pillars of ALAYA
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-2">
            Why School Restrooms Need Prediction, Not Paper Sign-Offs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Predicts */}
          <div className="alaya-card p-6 flex flex-col justify-between alaya-card-hover group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2F86FF]/15 border border-[#2F86FF]/40 flex items-center justify-center text-[#2F86FF] mb-5 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                Predicts
              </h3>
              <p className="text-sm text-[#9AA3B5] leading-relaxed">
                One consolidated Cleanliness & Urgency Score (CUS) out of 100.
                Using rate-of-change analysis across footfall, volatile gas readings, and elapsed time,
                ALAYA warns staff before the restroom turns red.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2F86FF]/15 flex items-center justify-between text-xs text-[#C6F432] font-mono">
              <span>Proactive Cleaning</span>
              <span>Turns Red in ~X min</span>
            </div>
          </div>

          {/* Card 2: Verifies */}
          <div className="alaya-card p-6 flex flex-col justify-between alaya-card-hover group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C6F432]/15 border border-[#C6F432]/40 flex items-center justify-center text-[#C6F432] mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                Verifies
              </h3>
              <p className="text-sm text-[#9AA3B5] leading-relaxed">
                Detects cleaning chemicals; a tick on paper isn't enough.
                ALAYA's gas array sniffs for volatile organic compound (VOC) spikes produced by
                chlorine, isopropanol, or phenol sanitizers to mathematically confirm genuine cleaning.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2F86FF]/15 flex items-center justify-between text-xs text-[#C6F432] font-mono">
              <span>Chemical Sniff Check</span>
              <span>No Fraudulent Ticks</span>
            </div>
          </div>

          {/* Card 3: Private */}
          <div className="alaya-card p-6 flex flex-col justify-between alaya-card-hover group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2F86FF]/15 border border-[#2F86FF]/40 flex items-center justify-center text-[#2F86FF] mb-5 group-hover:scale-105 transition-transform">
                <EyeOff className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                Private
              </h3>
              <p className="text-sm text-[#9AA3B5] leading-relaxed">
                No cameras, no names, no microphones.
                Built specifically for sensitive school environments where student dignity is paramount.
                Monitors physical room environmental metrics only.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2F86FF]/15 flex items-center justify-between text-xs text-[#C6F432] font-mono">
              <span>Zero Biometrics</span>
              <span>100% Student Privacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase: Real-World Washroom Deployment Photo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="alaya-card p-6 sm:p-8 border-[#2F86FF]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Image Showcase (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-[#2F86FF]/30 shadow-xl group aspect-[4/3] bg-[#0A1433]">
                <img
                  src={INSTALLATION_PHOTO}
                  alt="ALAYA Smart Hygiene Unit Installed in Modern School Restroom Facility"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1433] via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#101C40]/90 backdrop-blur-md border border-[#2F86FF]/30 text-xs font-mono text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2F86FF]" />
                    <span>Basin & Mirror Zone</span>
                  </span>
                  <span className="text-[#C6F432]">Touchless Monitoring</span>
                </div>
              </div>
            </div>

            {/* Right Information Details (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <span className="text-xs uppercase font-mono text-[#C6F432] tracking-wider font-semibold">
                Physical Deployment Architecture
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Installed in Seconds, Zero Infrastructure Overhaul
              </h3>
              <p className="text-sm text-[#9AA3B5] leading-relaxed">
                ALAYA mounts non-destructively beside washbasin mirrors or entryway door frames.
                Operating on 5V USB power from an Arduino Uno, it connects effortlessly to laptops or
                school administration PCs via the Web Serial API—no proprietary cloud subscription fees required.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-[#0A1433] border border-[#2F86FF]/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C6F432] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Non-Intrusive Mounting</span>
                    <p className="text-[#9AA3B5] mt-0.5">Dual-adhesive or screw-mount bracket at 1.4m height.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0A1433] border border-[#2F86FF]/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C6F432] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Continuous Self-Recalibration</span>
                    <p className="text-[#9AA3B5] mt-0.5">Air baseline auto-adjusts for seasonal humidity.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-[#2F86FF] hover:bg-[#2570d8] transition-colors"
                >
                  Inspect Live Hardware Readings
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Science Exhibition Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="alaya-card p-8 border-[#2F86FF]/50 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-xs uppercase font-mono text-[#C6F432] tracking-wider font-semibold">
                Science Project Thesis & Real-World Impact
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1 mb-3">
                Solving the Clean India (Swachh Vidyalaya) School Restroom Paradox
              </h3>
              <p className="text-sm text-[#9AA3B5] leading-relaxed mb-4">
                While thousands of toilets are constructed in schools across India, over 70% become unusable
                within 6 months due to erratic maintenance, lack of supplies, and absent accountability.
                Paper register sheets on doors are routinely ticked in bulk at day-end without cleaning.
              </p>
              <p className="text-sm text-[#9AA3B5] leading-relaxed">
                ALAYA solves this with a ₹2,000 open-source Arduino node that calculates when maintenance is needed
                before foul conditions arise, and rejects false paper logs when chemical disinfectants are absent.
              </p>
            </div>

            <div className="flex flex-col gap-3 bg-[#0A1433] p-5 rounded-xl border border-[#2F86FF]/30">
              <div className="text-xs font-mono text-[#2F86FF] uppercase font-bold">
                Exhibition Quick Links
              </div>
              <button
                onClick={() => onNavigate('how-it-works')}
                className="text-left text-xs font-medium text-white hover:text-[#C6F432] py-1.5 border-b border-[#2F86FF]/15 transition-colors flex items-center justify-between"
              >
                <span>Full Sensor Wiring & Equations</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2F86FF]" />
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-left text-xs font-medium text-white hover:text-[#C6F432] py-1.5 border-b border-[#2F86FF]/15 transition-colors flex items-center justify-between"
              >
                <span>Connect Hardware via Web Serial</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2F86FF]" />
              </button>
              <button
                onClick={() => onNavigate('privacy')}
                className="text-left text-xs font-medium text-white hover:text-[#C6F432] py-1.5 transition-colors flex items-center justify-between"
              >
                <span>Camera-Free Ethical Manifesto</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2F86FF]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
