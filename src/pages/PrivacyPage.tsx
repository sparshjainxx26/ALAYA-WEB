import React from 'react';
import { EyeOff, ShieldCheck, Lock, CheckCircle2, XCircle, HeartHandshake } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-mono tracking-widest text-[#C6F432] font-semibold flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#C6F432]" />
          Zero-Compromise Ethics & Child Protection
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mt-2">
          Measures the Room, Not the Person.
        </h1>
        <p className="text-base text-[#9AA3B5] mt-3 leading-relaxed">
          ALAYA was engineered specifically for school science exhibitions and campus deployment,
          adhering to strict international student safeguarding frameworks.
        </p>
      </div>

      {/* The 4 Privacy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="alaya-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#2F86FF]/15 border border-[#2F86FF]/40 flex items-center justify-center text-[#2F86FF]">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">0 Cameras, Ever</h3>
          <p className="text-sm text-[#9AA3B5] leading-relaxed">
            There are zero lenses, optical CMOS sensors, or infrared thermal imagers anywhere in the ALAYA
            hardware bill of materials. The hardware cannot capture visual likenesses or identifiable imagery.
          </p>
        </div>

        <div className="alaya-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#C6F432]/15 border border-[#C6F432]/40 flex items-center justify-center text-[#C6F432]">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Zero Accounts or Logins</h3>
          <p className="text-sm text-[#9AA3B5] leading-relaxed">
            Students and teachers never need to log in, register email addresses, or provide phone numbers.
            Hygiene reports dispatched via QR code carry zero IP logging or identification cookies.
          </p>
        </div>

        <div className="alaya-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#2F86FF]/15 border border-[#2F86FF]/40 flex items-center justify-center text-[#2F86FF]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Pure Environmental Telemetry</h3>
          <p className="text-sm text-[#9AA3B5] leading-relaxed">
            All data points reflect physical atmospheric states: parts-per-million gas resistance,
            binary conductive floor water presence, and ultrasonic liquid reservoir depth.
          </p>
        </div>

        <div className="alaya-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#C6F432]/15 border border-[#C6F432]/40 flex items-center justify-center text-[#C6F432]">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Open Source & Auditable</h3>
          <p className="text-sm text-[#9AA3B5] leading-relaxed">
            The Arduino C++ firmware and React telemetry dashboard are completely open source.
            School boards, parents, and science exhibition judges can inspect every single line of code.
          </p>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="alaya-card p-6 sm:p-8 space-y-6">
        <h3 className="font-heading font-bold text-xl text-white">
          Architectural Comparison: Privacy vs Hygiene Efficacy
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-sans">
            <thead>
              <tr className="border-b border-[#2F86FF]/20 text-xs font-mono uppercase text-[#9AA3B5]">
                <th className="py-3 px-4">Evaluation Criteria</th>
                <th className="py-3 px-4 text-[#C6F432]">ALAYA Smart Node</th>
                <th className="py-3 px-4 text-[#E0525A]">Optical Cameras (CCTV)</th>
                <th className="py-3 px-4 text-[#F5B301]">Manual Paper Sheets</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2F86FF]/10 text-xs sm:text-sm">
              <tr>
                <td className="py-3 px-4 font-medium text-white">Student Dignity & Privacy</td>
                <td className="py-3 px-4 text-[#C6F432] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 100% Protected (No Optics)
                </td>
                <td className="py-3 px-4 text-[#E0525A] flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Illegal in Washrooms
                </td>
                <td className="py-3 px-4 text-white">Protected</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Chemical Clean Verification</td>
                <td className="py-3 px-4 text-[#C6F432] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Yes (VOC Gas Sniffing)
                </td>
                <td className="py-3 px-4 text-[#9AA3B5]">Visual only (cannot sniff)</td>
                <td className="py-3 px-4 text-[#E0525A] flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Easily falsified signatures
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Predictive Warning ("Turns Red")</td>
                <td className="py-3 px-4 text-[#C6F432] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Yes (Linear Drift Math)
                </td>
                <td className="py-3 px-4 text-[#9AA3B5]">Reactive only</td>
                <td className="py-3 px-4 text-[#E0525A] flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Zero prediction
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Hardware Cost Per Unit</td>
                <td className="py-3 px-4 text-[#C6F432] font-semibold font-mono">
                  ~₹2,000 (~$24 USD)
                </td>
                <td className="py-3 px-4 text-[#9AA3B5] font-mono">₹15,000+ per unit</td>
                <td className="py-3 px-4 text-white font-mono">₹20 (clipboard + paper)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Slip Hazard Alert</td>
                <td className="py-3 px-4 text-[#C6F432] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Immediate &lt;1s
                </td>
                <td className="py-3 px-4 text-[#9AA3B5]">Delayed</td>
                <td className="py-3 px-4 text-[#E0525A] flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Undetected until fall
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
