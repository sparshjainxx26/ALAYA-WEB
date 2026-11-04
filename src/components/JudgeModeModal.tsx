import React, { useState, useEffect } from 'react';
import {
  Award,
  X,
  ArrowRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Sparkles,
  AlertTriangle,
  Cpu,
  CheckCircle2,
  BellRing,
  TrendingUp,
  Globe2,
  ShieldAlert,
} from 'lucide-react';
import { soundEffects } from '../services/soundEffects';
import { serialManager } from '../services/serialManager';
import { ConnectionStatus } from '../types';

interface JudgeModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectionStatus: ConnectionStatus;
  onNavigateToDashboard: () => void;
  onNavigateToExplorer: () => void;
}

export const JudgeModeModal: React.FC<JudgeModeModalProps> = ({
  isOpen,
  onClose,
  connectionStatus,
  onNavigateToDashboard,
  onNavigateToExplorer,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [buzzerPlaying, setBuzzerPlaying] = useState<boolean>(false);

  useEffect(() => {
    soundEffects.enabled = audioEnabled;
  }, [audioEnabled]);

  if (!isOpen) return null;

  const handleTestBuzzer = () => {
    setBuzzerPlaying(true);
    soundEffects.playBuzzerAlert();
    setTimeout(() => setBuzzerPlaying(false), 800);
  };

  const steps = [
    {
      step: 1,
      badge: 'Step 1 of 4 · The School Sanitation Crisis',
      title: 'Why 70% of School Washrooms in India Fail within 6 Months',
      tagline: 'The Paper Checklist Paradox & The Camera Taboo',
      content: (
        <div className="space-y-4 text-sm text-[#9AA3B5] leading-relaxed">
          <p>
            Under the national <strong className="text-white">Swachh Vidyalaya initiative</strong>, toilets were built in over 2.6 lakh schools. Yet government audits report over <strong className="text-[#E0525A]">70% become unhygienic and abandoned</strong> due to absent maintenance accountability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-[#060B1C] border border-[#E0525A]/40 text-xs">
              <span className="font-bold text-[#E0525A] block mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Paper Register Sheets are Forged
              </span>
              Cleaning logs hung on doors are scribbled in bulk at day-end without actual mopping or chemical disinfection.
            </div>
            <div className="p-3 rounded-xl bg-[#060B1C] border border-[#2F86FF]/40 text-xs">
              <span className="font-bold text-[#2F86FF] block mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Cameras are Strictly Illegal
              </span>
              Optical lenses or biometric facial cameras can never be installed in washrooms due to student child safeguarding laws.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#2F86FF]/10 border border-[#2F86FF]/30 text-xs text-[#90C1FF]">
            💡 <strong>Pitch Key:</strong> <em>"We asked: Can we measure the room's atmospheric biology without measuring the student's identity?"</em>
          </div>
        </div>
      ),
    },
    {
      step: 2,
      badge: 'Step 2 of 4 · The Hardware Innovation',
      title: 'ALAYA: 4 Sensors, 1 Arduino, ₹2,000 BOM Cost',
      tagline: 'AI Cleanliness & Urgency Score (CUS) from 0 to 100',
      content: (
        <div className="space-y-4 text-sm text-[#9AA3B5] leading-relaxed">
          <p>
            ALAYA operates on a standard <strong className="text-white">Arduino Uno</strong> at 115200 baud, continuously streaming 1-second telemetry across 4 non-optical environmental dimensions:
          </p>
          <div className="p-3.5 rounded-xl bg-[#060B1C] border border-[#2F86FF]/30 font-mono text-xs text-white overflow-x-auto">
            <span className="text-[#C6F432] font-bold">CUS</span> = 0.25·Air(VOC) + 0.20·Reports + 0.15·Time + 0.15·Visits + 0.15·FloorWet + 0.10·SoapEmpty
          </div>
          <ul className="grid grid-cols-2 gap-2 text-xs font-mono">
            <li className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3BB54A]" />
              MQ-135 Gas Sniffer (NH3/VOCs)
            </li>
            <li className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3BB54A]" />
              PIR Footfall Barrier Counter
            </li>
            <li className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3BB54A]" />
              Copper Conductivity Floor Probe
            </li>
            <li className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3BB54A]" />
              Ultrasonic Soap Level Echo
            </li>
          </ul>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#C6F432] font-mono">Total Component BOM: ₹2,000 (~$24 USD)</span>
            <button
              onClick={onNavigateToExplorer}
              className="text-[#2F86FF] hover:text-white underline font-mono text-[11px]"
            >
              Inspect X-Ray Circuit Explorer →
            </button>
          </div>
        </div>
      ),
    },
    {
      step: 3,
      badge: 'Step 3 of 4 · Live Demonstration',
      title: 'Live Hardware & Anti-Fraud Chemical Verification',
      tagline: 'Detects real sanitizer vapours — paper ticks are rejected',
      content: (
        <div className="space-y-4 text-sm text-[#9AA3B5] leading-relaxed">
          <p>
            When a caretaker cleans, ALAYA's MQ-135 array sniffs for the volatile organic spike of <strong className="text-white">isopropanol, chlorine, or pine disinfectant</strong> over a 45s curve. If no chemicals are detected, ALAYA awards <strong className="text-[#E0525A]">Code 4: Register Tick Only (REJECTED)</strong>.
          </p>
          <div className="p-3.5 rounded-xl bg-[#060B1C] border border-[#2F86FF]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#C6F432] font-bold">Interactive Exhibition Triggers:</span>
              <span className="text-[10px] text-[#9AA3B5]">Click to trigger live telemetry</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => serialManager.simulateTrigger('mop_cycle')}
                className="px-3 py-2 rounded-lg bg-[#101C40] hover:bg-[#2F86FF]/20 border border-[#2F86FF]/40 text-xs font-mono text-white text-left transition-colors"
              >
                🧹 Chemical Mop Cycle
              </button>
              <button
                onClick={() => serialManager.simulateTrigger('wet_toggle')}
                className="px-3 py-2 rounded-lg bg-[#101C40] hover:bg-[#E0525A]/20 border border-[#E0525A]/40 text-xs font-mono text-white text-left transition-colors"
              >
                💧 Trigger Floor Spill
              </button>
              <button
                onClick={handleTestBuzzer}
                className="px-3 py-2 rounded-lg bg-[#101C40] hover:bg-[#F5B301]/20 border border-[#F5B301]/40 text-xs font-mono text-white text-left transition-colors flex items-center justify-between"
              >
                <span>🔊 Test Piezo Buzzer</span>
                {buzzerPlaying && <span className="w-2 h-2 rounded-full bg-[#E0525A] animate-ping" />}
              </button>
            </div>
          </div>
          <p className="text-xs text-[#9AA3B5]">
            Hardware link: Web Serial API stream at 115200 baud with ASCII command dispatch.
          </p>
        </div>
      ),
    },
    {
      step: 4,
      badge: 'Step 4 of 4 · National Scale & Impact',
      title: 'Swachh Bharat Alignment & UN SDG Fulfillment',
      tagline: 'Keeping Girls in School & Saving 42% Water',
      content: (
        <div className="space-y-4 text-sm text-[#9AA3B5] leading-relaxed">
          <p>
            ALAYA directly fulfills 4 core UN Sustainable Development Goals:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#3BB54A]/15 border border-[#3BB54A]/40 text-white">
              <span className="font-bold block text-[#3BB54A]">SDG 3: Good Health</span>
              Stops viral pathogen contagion
            </div>
            <div className="p-2.5 rounded-xl bg-[#E0525A]/15 border border-[#E0525A]/40 text-white">
              <span className="font-bold block text-[#E0525A]">SDG 5: Gender Equality</span>
              Reduces female dropout rates
            </div>
            <div className="p-2.5 rounded-xl bg-[#00A3DA]/15 border border-[#00A3DA]/40 text-white">
              <span className="font-bold block text-[#00A3DA]">SDG 6: Clean Water</span>
              Target 6.2 universal sanitation
            </div>
            <div className="p-2.5 rounded-xl bg-[#F58220]/15 border border-[#F58220]/40 text-white">
              <span className="font-bold block text-[#F58220]">SDG 9: Low-Cost IoT</span>
              ₹2,000 Open Source hardware
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#060B1C] border border-[#C6F432]/30 flex items-center justify-between text-xs">
            <span className="text-white font-medium">Ready for deployment in 1.4 million schools across India</span>
            <span className="font-mono text-[#C6F432]">Scale: Swachh Bharat</span>
          </div>
        </div>
      ),
    },
  ];

  const activeContent = steps[currentStep - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060B1C]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl alaya-card p-6 sm:p-8 border-[#2F86FF]/60 shadow-[0_20px_50px_rgba(6,11,28,0.9),0_0_30px_rgba(47,134,255,0.25)] flex flex-col justify-between max-h-[92vh] overflow-y-auto">
        {/* Top Header Bar */}
        <div>
          <div className="flex items-center justify-between border-b border-[#2F86FF]/20 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C6F432]/20 border border-[#C6F432]/50 flex items-center justify-center text-[#C6F432]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-black text-lg text-white block">
                  Exhibition Judge Mode
                </span>
                <span className="text-[11px] font-mono text-[#2F86FF] block">
                  2-Minute High-Impact Science Project Presentation
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="p-1.5 rounded-lg bg-[#060B1C] border border-[#2F86FF]/30 text-[#9AA3B5] hover:text-white transition-colors"
                title={audioEnabled ? 'Mute buzzer audio' : 'Enable buzzer audio'}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4 text-[#C6F432]" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-[#060B1C] border border-[#2F86FF]/30 text-[#9AA3B5] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Step Progress Pills */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {steps.map((s) => (
              <button
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={`py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                  currentStep === s.step
                    ? 'bg-[#2F86FF] text-white shadow-[0_0_15px_rgba(47,134,255,0.4)]'
                    : currentStep > s.step
                    ? 'bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/40'
                    : 'bg-[#060B1C] text-[#9AA3B5] border border-[#2F86FF]/20'
                }`}
              >
                Step {s.step}
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="mb-6">
            <span className="text-xs uppercase font-mono tracking-wider text-[#C6F432] font-semibold block mb-1">
              {activeContent.badge}
            </span>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight">
              {activeContent.title}
            </h3>
            <p className="text-xs font-mono text-[#2F86FF] mb-4">
              {activeContent.tagline}
            </p>

            <div className="mt-3">{activeContent.content}</div>
          </div>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="pt-4 border-t border-[#2F86FF]/20 flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#060B1C] border border-[#2F86FF]/30 text-[#9AA3B5] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {currentStep === 4 ? (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToDashboard();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-bold bg-[#C6F432] hover:bg-[#b5e028] text-[#060B1C] shadow-[0_0_20px_rgba(198,244,50,0.5)] transition-all"
              >
                Open Full Live Telemetry
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-bold bg-[#2F86FF] hover:bg-[#2570d8] text-white shadow-[0_0_20px_rgba(47,134,255,0.4)] transition-all"
              >
                Next Point
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
