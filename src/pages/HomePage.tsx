import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  EyeOff,
  Sparkles,
  Activity,
  Cpu,
  CheckCircle2,
  School,
  Train,
  Cross,
  ShoppingBag,
  Building2,
  Droplet,
  HeartPulse,
  Users2,
  Globe2,
  Award,
} from 'lucide-react';

// Import bundled assets for Vite
import heroDevicePhoto from '../assets/images/alaya_arduino_box_prototype_1793812969113.jpg';
import whereNextPhoto from '../assets/images/where_alaya_goes_next_infographic_1793812990186.jpg';

// =====================================================================
// 📸 CHANGE HOME PAGE PHOTOS HERE (CODE MEIN YAHAAN SE CHANGE KAREIN):
// =====================================================================
// 1. Hero Device Photo (1st Image on Main Page - Arduino Prototype Box):
export const HERO_DEVICE_PHOTO = heroDevicePhoto || '/hero_prototype.jpg';

// 2. Where ALAYA Goes Next Infographic (2nd Image Down Below):
export const ROADMAP_INFOGRAPHIC_PHOTO = whereNextPhoto || '/where_alaya_goes_next.jpg';
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
      {/* =========================================================================
          HERO SECTION: 1st Image at Main Page (Physical Arduino Box Prototype)
         ========================================================================= */}
      <section className="min-h-[85vh] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7">
            {/* Science Exhibition Category */}
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono animate-open-1">
              <span className="text-[#C6F432] font-semibold bg-[#C6F432]/10 px-3 py-1 rounded-full border border-[#C6F432]/35 flex items-center gap-1.5 shadow-[0_0_12px_rgba(198,244,50,0.15)]">
                <Sparkles className="w-3.5 h-3.5" />
                School Science Exhibition 2026
              </span>
              <span className="text-[#9AA3B5]">·</span>
              <span className="text-[#2F86FF] font-medium tracking-wide">IoT & Embedded Systems Category</span>
            </div>

            {/* Big ALAYA Wordmark & Subtitle */}
            <h1 className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl tracking-[-0.04em] text-white mb-2 animate-open-2 drop-shadow-[0_0_40px_rgba(47,134,255,0.3)]">
              ALAYA
            </h1>
            <p className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gradient-electric mb-2 tracking-[-0.02em] animate-open-3">
              AI-enabled Lavatory & Hygiene Assistant
            </p>

            <p className="font-mono text-lg sm:text-xl text-gradient-lime font-bold italic mb-4 animate-open-4">
              "clean restrooms, predicted"
            </p>

            <p className="text-xl sm:text-2xl text-white/95 font-medium leading-relaxed max-w-2xl mb-6 tracking-tight animate-open-5">
              Measures the room, not the person.
            </p>

            <p className="text-sm sm:text-base text-[#9AA3B5] leading-relaxed max-w-xl mb-8 animate-open-6 font-normal">
              A camera-free smart washroom hygiene monitor built on Arduino Uno and edge micro-telemetry.
              ALAYA warns maintenance teams before restrooms turn unhygienic, verifies chemical sanitizer
              application, and respects student privacy with zero optical sensors.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 animate-open-6">
              <button
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-heading font-bold text-sm text-white bg-[#2F86FF] hover:bg-[#2570d8] shadow-[0_0_30px_rgba(47,134,255,0.45)] hover:shadow-[0_0_35px_rgba(47,134,255,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Open Live Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('report')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-heading font-bold text-sm text-[#C6F432] bg-[#101C40] border border-[#2F86FF]/50 hover:border-[#C6F432] hover:bg-[#101C40]/80 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Report a problem
              </button>

              <button
                onClick={onStartSimulator}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full font-mono text-xs text-[#9AA3B5] hover:text-white border border-[#2F86FF]/30 hover:border-[#2F86FF]/70 bg-[#0A1433]/80 backdrop-blur-md transition-all"
              >
                <Cpu className="w-4 h-4 text-[#2F86FF]" />
                Demo Simulator
              </button>
            </div>
          </div>

          {/* Right Column: 1st Image Showcase (ALAYA Arduino Prototype Box) */}
          <div className="lg:col-span-5 animate-open-card">
            <div className="relative group">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#2F86FF]/30 to-[#C6F432]/30 opacity-70 blur-xl group-hover:opacity-100 transition duration-500" />

              {/* Main Photo Card */}
              <div className="relative alaya-card p-3 overflow-hidden shadow-2xl">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#0A1433]">
                  <img
                    src={HERO_DEVICE_PHOTO}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/hero_prototype.jpg';
                    }}
                    alt="ALAYA Physical Hardware Prototype Box with Arduino Uno, MQ-135 Gas Sensor, LCD reading CUS: 45 AMBER, LEDs, and PIR Dome Sensor"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Dark subtle gradient scrim at bottom for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1433] via-transparent to-transparent opacity-85" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#101C40]/90 backdrop-blur-md border border-[#2F86FF]/40 text-[11px] font-mono text-[#C6F432]">
                      <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                      <span>Physical Working Prototype</span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#101C40]/90 backdrop-blur-md border border-[#2F86FF]/40 text-[11px] font-mono text-white">
                      <EyeOff className="w-3 h-3 text-[#2F86FF]" />
                      <span>0 Cameras</span>
                    </div>
                  </div>

                  {/* Photo Caption / Callouts */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-lg bg-[#101C40]/95 backdrop-blur-md border border-[#2F86FF]/30">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold">ALAYA Arduino Box Hardware</span>
                      <span className="text-[#F5B301] font-bold">LCD: CUS: 45 | AMBER</span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] font-mono text-[#9AA3B5]">
                      <span className="text-white">Arduino Uno</span>
                      <span>·</span>
                      <span className="text-[#2F86FF]">MQ-135 Air Sensor</span>
                      <span>·</span>
                      <span className="text-[#3BB54A]">Green</span>
                      <span className="text-[#F5B301]">Amber</span>
                      <span className="text-[#E0525A]">Red LEDs</span>
                      <span>·</span>
                      <span className="text-[#C6F432]">PIR Dome</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
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

      {/* =========================================================================
          2nd IMAGE DOWN BELOW: "Where ALAYA goes next" Complete Architecture Section
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="alaya-card p-6 sm:p-10 border-[#2F86FF]/50 relative overflow-hidden bg-[#101C40]">
          {/* Top Title & Traffic Light Motif */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2F86FF]/20">
            <div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                Where ALAYA goes next
              </h2>
              <p className="text-base text-[#9AA3B5] mt-1 font-sans">
                Anywhere crowds use washrooms, one unit per washroom.
              </p>
            </div>

            {/* Traffic Light Motif */}
            <div className="flex items-center gap-2 self-start sm:self-center px-3 py-1.5 rounded-full bg-[#0A1433] border border-[#2F86FF]/30">
              <span className="w-3 h-3 rounded-full bg-[#3BB54A] shadow-[0_0_8px_#3BB54A]" />
              <span className="w-3 h-3 rounded-full bg-[#F5B301] shadow-[0_0_8px_#F5B301]" />
              <span className="w-3 h-3 rounded-full bg-[#E0525A] shadow-[0_0_8px_#E0525A]" />
            </div>
          </div>

          {/* 2nd Image Banner: Where ALAYA goes next Infographic */}
          <div className="mt-8 mb-8 rounded-2xl overflow-hidden border border-[#2F86FF]/40 shadow-2xl bg-[#0A1433] relative group">
            <img
              src={ROADMAP_INFOGRAPHIC_PHOTO}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/where_alaya_goes_next.jpg';
              }}
              alt="Where ALAYA goes next roadmap, schools, hospitals, metro, and UN SDGs"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>

          {/* 1. WHERE IT HELPS */}
          <div className="mt-8">
            <span className="text-xs uppercase font-mono tracking-widest text-[#2F86FF] font-bold block mb-4">
              WHERE IT HELPS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {/* Schools */}
              <div className="p-4 rounded-xl bg-[#0A1433] border border-[#2F86FF]/40 flex flex-col items-center text-center justify-center gap-3 alaya-card-hover group">
                <div className="w-12 h-12 rounded-lg bg-[#2F86FF]/10 border border-[#2F86FF]/30 flex items-center justify-center text-[#C6F432] group-hover:scale-110 transition-transform">
                  <School className="w-6 h-6" />
                </div>
                <span className="font-heading font-bold text-sm text-white">Schools</span>
              </div>

              {/* Metro & railway */}
              <div className="p-4 rounded-xl bg-[#0A1433] border border-[#2F86FF]/40 flex flex-col items-center text-center justify-center gap-3 alaya-card-hover group">
                <div className="w-12 h-12 rounded-lg bg-[#2F86FF]/10 border border-[#2F86FF]/30 flex items-center justify-center text-[#2F86FF] group-hover:scale-110 transition-transform">
                  <Train className="w-6 h-6" />
                </div>
                <span className="font-heading font-bold text-sm text-white">Metro & railway</span>
              </div>

              {/* Hospitals */}
              <div className="p-4 rounded-xl bg-[#0A1433] border border-[#2F86FF]/40 flex flex-col items-center text-center justify-center gap-3 alaya-card-hover group">
                <div className="w-12 h-12 rounded-lg bg-[#2F86FF]/10 border border-[#2F86FF]/30 flex items-center justify-center text-[#C6F432] group-hover:scale-110 transition-transform">
                  <Cross className="w-6 h-6" />
                </div>
                <span className="font-heading font-bold text-sm text-white">Hospitals</span>
              </div>

              {/* Public toilets */}
              <div className="p-4 rounded-xl bg-[#0A1433] border border-[#2F86FF]/40 flex flex-col items-center text-center justify-center gap-3 alaya-card-hover group">
                <div className="w-12 h-12 rounded-lg bg-[#2F86FF]/10 border border-[#2F86FF]/30 flex items-center justify-center text-[#C6F432] group-hover:scale-110 transition-transform">
                  <Droplet className="w-6 h-6" />
                </div>
                <span className="font-heading font-bold text-sm text-white">Public toilets</span>
              </div>

              {/* Malls & offices */}
              <div className="p-4 rounded-xl bg-[#0A1433] border border-[#2F86FF]/40 flex flex-col items-center text-center justify-center gap-3 alaya-card-hover group col-span-2 sm:col-span-1">
                <div className="w-12 h-12 rounded-lg bg-[#2F86FF]/10 border border-[#2F86FF]/30 flex items-center justify-center text-[#2F86FF] group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="font-heading font-bold text-sm text-white">Malls & offices</span>
              </div>
            </div>
          </div>

          {/* 2. ROADMAP */}
          <div className="mt-10">
            <span className="text-xs uppercase font-mono tracking-widest text-[#2F86FF] font-bold block mb-6">
              ROADMAP
            </span>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Connecting line on desktop */}
              <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-[#2F86FF]/30 -z-0" />

              {/* Step 1: Prototype (NOW) */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#C6F432] border border-[#C6F432]/60 bg-[#C6F432]/10 mb-2">
                  NOW
                </span>
                <div className="w-12 h-12 rounded-full bg-[#C6F432] text-[#0A1433] font-heading font-black text-lg flex items-center justify-center shadow-[0_0_20px_rgba(198,244,50,0.5)]">
                  1
                </div>
                <h4 className="font-heading font-bold text-base text-[#C6F432] mt-3">Prototype</h4>
                <p className="text-xs text-[#9AA3B5] mt-1">Arduino box, working now</p>
              </div>

              {/* Step 2: Upgrade */}
              <div className="relative z-10 flex flex-col items-center text-center mt-6 md:mt-0">
                <div className="w-12 h-12 rounded-full bg-[#101C40] border-2 border-[#2F86FF] text-[#2F86FF] font-heading font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(47,134,255,0.3)] mt-6">
                  2
                </div>
                <h4 className="font-heading font-bold text-base text-white mt-3">Upgrade</h4>
                <p className="text-xs text-[#9AA3B5] mt-1">ESP32 WiFi + MQ137 ammonia sensor</p>
              </div>

              {/* Step 3: School pilot */}
              <div className="relative z-10 flex flex-col items-center text-center mt-6 md:mt-0">
                <div className="w-12 h-12 rounded-full bg-[#101C40] border-2 border-[#2F86FF] text-[#2F86FF] font-heading font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(47,134,255,0.3)] mt-6">
                  3
                </div>
                <h4 className="font-heading font-bold text-base text-white mt-3">School pilot</h4>
                <p className="text-xs text-[#9AA3B5] mt-1">one month in our school washrooms</p>
              </div>

              {/* Step 4: City scale */}
              <div className="relative z-10 flex flex-col items-center text-center mt-6 md:mt-0">
                <div className="w-12 h-12 rounded-full bg-[#101C40] border-2 border-[#2F86FF] text-[#2F86FF] font-heading font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(47,134,255,0.3)] mt-6">
                  4
                </div>
                <h4 className="font-heading font-bold text-base text-white mt-3">City scale</h4>
                <p className="text-xs text-[#9AA3B5] mt-1">public toilets under Swachh Bharat</p>
              </div>
            </div>
          </div>

          {/* 3. SUPPORTS UN SUSTAINABLE DEVELOPMENT GOALS (SDGs WE ARE FULFILLING) */}
          <div className="mt-14 pt-10 border-t border-[#2F86FF]/25">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#2F86FF] font-bold flex items-center gap-1.5 mb-1">
                  <Globe2 className="w-3.5 h-3.5 text-[#2F86FF]" />
                  UN 2030 Agenda Alignment
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  UN Sustainable Development Goals We Are Fulfilling
                </h3>
              </div>
              <span className="text-xs font-mono text-[#C6F432] bg-[#C6F432]/10 px-3 py-1 rounded-full border border-[#C6F432]/30 shrink-0">
                4 Primary SDG Targets
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SDG 3: Good Health and Well-Being */}
              <div className="p-5 rounded-2xl bg-[#060B1C]/80 border border-[#3BB54A]/40 flex flex-col justify-between alaya-card-hover group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#3BB54A] text-white font-heading font-black text-2xl flex items-center justify-center shadow-[0_0_15px_rgba(59,181,74,0.4)]">
                        3
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-base text-white">
                          Good Health & Well-Being
                        </h4>
                        <span className="text-[11px] font-mono text-[#3BB54A] font-medium">
                          UN Target 3.3 & 3.9 (Infectious Disease Control)
                        </span>
                      </div>
                    </div>
                    <HeartPulse className="w-5 h-5 text-[#3BB54A] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-xs text-[#9AA3B5] leading-relaxed">
                    <strong>How ALAYA fulfills it:</strong> Breaks transmission chains of water-borne pathogens, E. coli, and respiratory irritants in school washrooms. Real-time VOC chemical verification ensures bacteria are genuinely neutralized rather than masked.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#3BB54A]/20 flex items-center justify-between text-[11px] font-mono text-[#3BB54A]">
                  <span>Airborne pathogen reduction</span>
                  <span>100% verified sanitization</span>
                </div>
              </div>

              {/* SDG 5: Gender Equality */}
              <div className="p-5 rounded-2xl bg-[#060B1C]/80 border border-[#E0525A]/40 flex flex-col justify-between alaya-card-hover group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#E0525A] text-white font-heading font-black text-2xl flex items-center justify-center shadow-[0_0_15px_rgba(224,82,90,0.4)]">
                        5
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-base text-white">
                          Gender Equality
                        </h4>
                        <span className="text-[11px] font-mono text-[#E0525A] font-medium">
                          UN Target 5.1 & 5.5 (Menstrual Hygiene Dignity)
                        </span>
                      </div>
                    </div>
                    <Users2 className="w-5 h-5 text-[#E0525A] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-xs text-[#9AA3B5] leading-relaxed">
                    <strong>How ALAYA fulfills it:</strong> Tackles the #1 cause of female school absenteeism in India—unusable and neglected student toilets. Guarantees safe, hygienic, and dignified sanitation facilities so female students never have to miss classes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E0525A]/20 flex items-center justify-between text-[11px] font-mono text-[#E0525A]">
                  <span>Reduces female dropout rates</span>
                  <span>Private & safe facilities</span>
                </div>
              </div>

              {/* SDG 6: Clean Water and Sanitation */}
              <div className="p-5 rounded-2xl bg-[#060B1C]/80 border border-[#00A3DA]/40 flex flex-col justify-between alaya-card-hover group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#00A3DA] text-white font-heading font-black text-2xl flex items-center justify-center shadow-[0_0_15px_rgba(0,163,218,0.4)]">
                        6
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-base text-white">
                          Clean Water & Sanitation
                        </h4>
                        <span className="text-[11px] font-mono text-[#00A3DA] font-medium">
                          UN Target 6.2 (Equitable Sanitation & Hygiene)
                        </span>
                      </div>
                    </div>
                    <Droplet className="w-5 h-5 text-[#00A3DA] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-xs text-[#9AA3B5] leading-relaxed">
                    <strong>How ALAYA fulfills it:</strong> Direct realization of UN Target 6.2: <em>"Access to adequate and equitable sanitation and hygiene for all"</em>. Eliminates soap outages with acoustic level sensors and prevents slip-and-fall hazards with floor conductivity probes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#00A3DA]/20 flex items-center justify-between text-[11px] font-mono text-[#00A3DA]">
                  <span>Zero empty soap dispensers</span>
                  <span>Proactive spill alarms</span>
                </div>
              </div>

              {/* SDG 9: Industry, Innovation and Infrastructure */}
              <div className="p-5 rounded-2xl bg-[#060B1C]/80 border border-[#F58220]/40 flex flex-col justify-between alaya-card-hover group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#F58220] text-white font-heading font-black text-2xl flex items-center justify-center shadow-[0_0_15px_rgba(245,130,32,0.4)]">
                        9
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-base text-white">
                          Industry & Innovation
                        </h4>
                        <span className="text-[11px] font-mono text-[#F58220] font-medium">
                          UN Target 9.4 (Sustainable Low-Cost Retrofit)
                        </span>
                      </div>
                    </div>
                    <Cpu className="w-5 h-5 text-[#F58220] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-xs text-[#9AA3B5] leading-relaxed">
                    <strong>How ALAYA fulfills it:</strong> Democratizes smart facility monitoring. Instead of ₹1,50,000 enterprise proprietary building systems, ALAYA delivers an open-source ₹2,000 Arduino Uno edge node that retrofits existing public school washrooms instantly.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F58220]/20 flex items-center justify-between text-[11px] font-mono text-[#F58220]">
                  <span>₹2,000 Open hardware BOM</span>
                  <span>Zero subscription lock-in</span>
                </div>
              </div>
            </div>

            {/* National Mission Callout Banner */}
            <div className="mt-6 p-4 rounded-xl bg-[#060B1C] border border-[#2F86FF]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#C6F432] shrink-0" />
                <span className="text-white">
                  Also directly supports the Government of India's <strong className="text-[#C6F432]">Swachh Bharat Mission</strong> & <strong className="text-[#2F86FF]">Swachh Vidyalaya Initiative</strong>.
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#9AA3B5] shrink-0">
                Ministry of Education Aligned
              </span>
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
