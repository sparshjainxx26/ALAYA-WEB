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

          {/* Right Column: 1st Image Showcase (ALAYA Arduino Prototype Box) */}
          <div className="lg:col-span-5">
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

          {/* 3. SUPPORTS UN SUSTAINABLE DEVELOPMENT GOALS */}
          <div className="mt-12 pt-8 border-t border-[#2F86FF]/20">
            <span className="text-xs uppercase font-mono tracking-widest text-[#2F86FF] font-bold block mb-4">
              SUPPORTS UN SUSTAINABLE DEVELOPMENT GOALS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* SDG 3 */}
              <div className="p-4 rounded-xl bg-[#3BB54A] text-white flex items-center gap-3.5 shadow-lg">
                <span className="text-4xl font-heading font-black leading-none shrink-0">3</span>
                <div>
                  <div className="font-heading font-bold text-sm leading-snug">Good health</div>
                  <div className="text-xs opacity-90">and well-being</div>
                </div>
              </div>

              {/* SDG 5 */}
              <div className="p-4 rounded-xl bg-[#E0525A] text-white flex items-center gap-3.5 shadow-lg">
                <span className="text-4xl font-heading font-black leading-none shrink-0">5</span>
                <div>
                  <div className="font-heading font-bold text-sm leading-snug">Gender</div>
                  <div className="text-xs opacity-90">equality</div>
                </div>
              </div>

              {/* SDG 6 */}
              <div className="p-4 rounded-xl bg-[#00A3DA] text-white flex items-center gap-3.5 shadow-lg">
                <span className="text-4xl font-heading font-black leading-none shrink-0">6</span>
                <div>
                  <div className="font-heading font-bold text-sm leading-snug">Clean water</div>
                  <div className="text-xs opacity-90">and sanitation</div>
                </div>
              </div>

              {/* SDG 9 */}
              <div className="p-4 rounded-xl bg-[#F58220] text-white flex items-center gap-3.5 shadow-lg">
                <span className="text-4xl font-heading font-black leading-none shrink-0">9</span>
                <div>
                  <div className="font-heading font-bold text-sm leading-snug">Industry, innovation</div>
                  <div className="text-xs opacity-90">and infrastructure</div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Callout from Image 2 */}
            <div className="text-center mt-6 text-xs text-[#9AA3B5] font-sans">
              Also supports the <strong className="text-white font-semibold">Swachh Bharat Mission</strong>
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
