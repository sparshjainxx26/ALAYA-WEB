import React from 'react';

interface CircularGaugeProps {
  cus: number;
  band: 0 | 1 | 2;
  size?: number;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({ cus, band, size = 260 }) => {
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // We map 0-100 to an open arc or 270 degrees, or full circle with smooth open bottom
  // Let's use a 260-degree sweep arc so it has a classic speedometer/gauge look
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, cus)) / 100) * circumference;

  let bandColor = '#3BB54A'; // green
  let statusText = 'CLEAN';
  let statusSubtext = 'Restroom is sanitised & ready';

  if (band === 1) {
    bandColor = '#F5B301'; // amber
    statusText = 'PLAN A CLEAN';
    statusSubtext = 'Traffic & air index climbing';
  } else if (band === 2) {
    bandColor = '#E0525A'; // red
    statusText = 'CLEAN NOW';
    statusSubtext = 'Sanitation threshold breached';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#192A56"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
          />

          {/* Calibrated threshold ticks at 40 (amber) and 70 (red) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(47, 134, 255, 0.15)"
            strokeWidth={strokeWidth + 4}
            strokeDasharray={`2 ${circumference / 40 - 2}`}
            fill="transparent"
          />

          {/* Active progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={bandColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 12px ${bandColor}80)`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] uppercase tracking-widest text-[#9AA3B5] font-semibold">
            CUS Score
          </span>
          <div className="flex items-baseline justify-center">
            <span
              className="font-heading font-black tracking-tight text-white tabular-nums transition-all"
              style={{ fontSize: size * 0.24 }}
            >
              {cus.toFixed(1)}
            </span>
            <span className="text-[#9AA3B5] font-mono text-sm ml-1 font-semibold">/100</span>
          </div>

          <div
            className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider mt-1 transition-colors"
            style={{
              backgroundColor: `${bandColor}25`,
              color: bandColor,
              border: `1px solid ${bandColor}60`,
            }}
          >
            BAND {band}
          </div>
        </div>
      </div>

      {/* Prominent Action Word under the gauge */}
      <div className="mt-4 text-center">
        <div
          className="font-heading font-black text-2xl tracking-wide uppercase transition-colors"
          style={{ color: bandColor }}
        >
          {statusText}
        </div>
        <p className="text-xs text-[#9AA3B5] mt-0.5 font-medium">{statusSubtext}</p>
      </div>
    </div>
  );
};
