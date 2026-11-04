import React from 'react';
import { Clock, AlertTriangle, ShieldCheck, TrendingUp } from 'lucide-react';

interface PredictionCardProps {
  mins: number;
  band: 0 | 1 | 2;
  cus: number;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ mins, band, cus }) => {
  const isRed = band === 2;
  const hasPrediction = mins > 0;

  return (
    <div className="alaya-card p-5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-[#9AA3B5] font-semibold flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#2F86FF]" />
          Predictive Hygiene Forecast
        </span>
        <span className="text-[11px] font-mono text-[#2F86FF] px-2 py-0.5 rounded bg-[#2F86FF]/10 border border-[#2F86FF]/30">
          Linear Decay Model
        </span>
      </div>

      <div className="my-3">
        {isRed ? (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#E0525A]/20 border border-[#E0525A]/50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-[#E0525A] animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-heading font-black text-[#E0525A] tracking-tight">
                CLEAN NOW
              </div>
              <p className="text-xs text-[#9AA3B5] mt-0.5">
                Critical threshold (70/100) exceeded. Immediate janitorial dispatch needed.
              </p>
            </div>
          </div>
        ) : hasPrediction ? (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F5B301]/20 border border-[#F5B301]/50 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#F5B301]" />
            </div>
            <div>
              <div className="text-2xl font-heading font-black text-white tracking-tight">
                Turns red in <span className="text-[#C6F432]">~{mins} min</span>
              </div>
              <p className="text-xs text-[#9AA3B5] mt-0.5">
                Proactive alert: Schedule cleaning before restroom reaches foul threshold.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#3BB54A]/20 border border-[#3BB54A]/50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#3BB54A]" />
            </div>
            <div>
              <div className="text-2xl font-heading font-black text-[#3BB54A] tracking-tight">
                No rise predicted
              </div>
              <p className="text-xs text-[#9AA3B5] mt-0.5">
                Telemetry baseline is stable. Traffic rate is within sanitary capacity.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Progress towards red (70 pts threshold) */}
      <div className="space-y-1.5 pt-2 border-t border-[#2F86FF]/15">
        <div className="flex justify-between text-xs text-[#9AA3B5]">
          <span>Margin to Red Alert (70.0)</span>
          <span className="font-mono text-white font-medium">
            {isRed ? '0.0 pts remaining' : `${(70.0 - cus).toFixed(1)} pts remaining`}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#0A1433] overflow-hidden border border-[#2F86FF]/20">
          <div
            className={`h-full transition-all duration-500 ${
              isRed ? 'bg-[#E0525A]' : cus >= 40 ? 'bg-[#F5B301]' : 'bg-[#3BB54A]'
            }`}
            style={{ width: `${Math.min(100, (cus / 70) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
