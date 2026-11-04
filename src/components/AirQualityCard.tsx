import React from 'react';
import { Wind, Activity } from 'lucide-react';

interface AirQualityCardProps {
  air: number;
  gas: number;
}

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ air, gas }) => {
  const getAirHealthBand = (value: number) => {
    if (value <= 19) return { label: 'Good', color: '#3BB54A', desc: 'Fresh air, ammonia/VOC below baseline' };
    if (value <= 39) return { label: 'Satisfactory', color: '#C6F432', desc: 'Acceptable ambient conditions' };
    if (value <= 59) return { label: 'Moderate', color: '#F5B301', desc: 'Ventilation recommended' };
    if (value <= 79) return { label: 'Poor', color: '#FF7A00', desc: 'Stagnant odour & organic vapours' };
    return { label: 'Very Poor', color: '#E0525A', desc: 'Urgent air exchange & disinfection required' };
  };

  const health = getAirHealthBand(air);

  const bands = [
    { range: '0–19', label: 'Good', min: 0, max: 19, color: '#3BB54A' },
    { range: '20–39', label: 'Satisfactory', min: 20, max: 39, color: '#C6F432' },
    { range: '40–59', label: 'Moderate', min: 40, max: 59, color: '#F5B301' },
    { range: '60–79', label: 'Poor', min: 60, max: 79, color: '#FF7A00' },
    { range: '80–100', label: 'Very Poor', min: 80, max: 100, color: '#E0525A' },
  ];

  return (
    <div className="alaya-card p-5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-[#9AA3B5] font-semibold flex items-center gap-1.5">
          <Wind className="w-3.5 h-3.5 text-[#2F86FF]" />
          Air Quality & Odour Index
        </span>
        <span className="text-[11px] font-mono text-[#9AA3B5] flex items-center gap-1">
          <Activity className="w-3 h-3 text-[#2F86FF]" />
          MQ Gas Sensor
        </span>
      </div>

      <div className="my-3 flex items-baseline justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-black text-white tabular-nums">
              {air}
            </span>
            <span className="text-xs uppercase font-mono text-[#9AA3B5]">/100 Index</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-sm font-heading font-bold uppercase tracking-wide"
              style={{ color: health.color }}
            >
              {health.label}
            </span>
            <span className="text-xs text-[#9AA3B5]">· {health.desc}</span>
          </div>
        </div>

        {/* Raw Gas ADC Readout */}
        <div className="text-right bg-[#0A1433] px-3 py-1.5 rounded-lg border border-[#2F86FF]/20">
          <span className="text-[10px] uppercase font-mono text-[#9AA3B5] block">Raw Gas ADC</span>
          <span className="text-base font-mono font-semibold text-[#2F86FF] tabular-nums">
            {gas} <span className="text-[10px] text-[#9AA3B5]">raw</span>
          </span>
        </div>
      </div>

      {/* Segmented Band Bar */}
      <div className="space-y-1.5 pt-2 border-t border-[#2F86FF]/15">
        <div className="grid grid-cols-5 gap-1.5">
          {bands.map((b) => {
            const isActive = air >= b.min && air <= b.max;
            return (
              <div key={b.range} className="flex flex-col gap-1">
                <div
                  className={`h-2 rounded transition-all duration-300 ${
                    isActive ? 'ring-2 ring-white/60 scale-y-125' : 'opacity-40'
                  }`}
                  style={{ backgroundColor: b.color }}
                />
                <span
                  className={`text-[9px] text-center font-mono truncate ${
                    isActive ? 'text-white font-bold' : 'text-[#9AA3B5]'
                  }`}
                >
                  {b.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
