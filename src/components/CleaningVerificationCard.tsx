import React from 'react';
import { Check, X, ShieldCheck, Loader2, Sparkles, HelpCircle } from 'lucide-react';
import { CLEANING_RESULTS } from '../services/serialManager';

interface CleaningVerificationCardProps {
  check: 0 | 1;
  result: 0 | 1 | 2 | 3 | 4;
  verified: 0 | 1;
}

export const CleaningVerificationCard: React.FC<CleaningVerificationCardProps> = ({
  check,
  result,
  verified,
}) => {
  const isChecking = check === 1;
  const resultInfo = CLEANING_RESULTS[result] || CLEANING_RESULTS[0];
  const isVerified = result === 1;
  const isRejected = result >= 2;

  return (
    <div className="alaya-card p-5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-[#9AA3B5] font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2F86FF]" />
          Chemical Disinfection Verifier
        </span>
        <span className="text-[11px] font-mono text-[#9AA3B5]">VOC Vapour Sniffing</span>
      </div>

      <div className="my-3">
        {isChecking ? (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2F86FF]/20 border border-[#2F86FF]/50 flex items-center justify-center shrink-0">
              <Loader2 className="w-6 h-6 text-[#2F86FF] animate-spin" />
            </div>
            <div>
              <div className="text-xl font-heading font-black text-white flex items-center gap-2">
                <span>Checking cleaning…</span>
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-ping" />
              </div>
              <p className="text-xs text-[#9AA3B5] mt-0.5">
                Sampling volatile sanitizer curve (isopropanol/chlorine) over 45s window...
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Status Icon */}
            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                isVerified
                  ? 'bg-[#C6F432]/20 border-[#C6F432]/60 text-[#C6F432]'
                  : isRejected
                  ? 'bg-[#E0525A]/20 border-[#E0525A]/60 text-[#E0525A]'
                  : 'bg-[#101C40] border-[#2F86FF]/30 text-[#9AA3B5]'
              }`}
            >
              {isVerified ? (
                <Check className="w-7 h-7 stroke-[3]" />
              ) : isRejected ? (
                <X className="w-7 h-7 stroke-[3]" />
              ) : (
                <Sparkles className="w-6 h-6 text-[#2F86FF]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xl font-heading font-black uppercase tracking-wide ${
                    isVerified
                      ? 'text-[#C6F432]'
                      : isRejected
                      ? 'text-[#E0525A]'
                      : 'text-white'
                  }`}
                >
                  {resultInfo.title}
                </span>
                {isVerified && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#C6F432]/15 text-[#C6F432] border border-[#C6F432]/40">
                    Passed
                  </span>
                )}
                {isRejected && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#E0525A]/15 text-[#E0525A] border border-[#E0525A]/40">
                    Failed
                  </span>
                )}
              </div>
              <p className="text-xs text-[#9AA3B5] mt-0.5 leading-relaxed">
                {resultInfo.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Explanatory footer line */}
      <div className="pt-2.5 border-t border-[#2F86FF]/15 flex items-center justify-between text-xs text-[#9AA3B5]">
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#2F86FF]" />
          <span>Detects cleaning chemicals — a tick on paper isn't enough.</span>
        </span>
        <span className="font-mono text-[11px] text-[#2F86FF]">
          State: {verified ? 'VERIFIED' : 'UNVERIFIED'}
        </span>
      </div>
    </div>
  );
};
