import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { TelemetryHistoryPoint } from '../types';
import { Activity } from 'lucide-react';

interface LiveTelemetryChartProps {
  data: TelemetryHistoryPoint[];
}

export const LiveTelemetryChart: React.FC<LiveTelemetryChartProps> = ({ data }) => {
  return (
    <div className="alaya-card p-5 h-full flex flex-col justify-between">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#9AA3B5] font-semibold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#2F86FF]" />
            Live Cleanliness & Urgency Score (Last 5 Min)
          </span>
          <p className="text-xs text-[#9AA3B5] mt-0.5">
            Real-time trajectory with dynamic threshold boundaries
          </p>
        </div>

        {/* Legend Indicators */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#2F86FF] inline-block" />
            <span className="text-white">CUS Value</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-[#F5B301] inline-block" />
            <span className="text-[#F5B301]">40 (Amber)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-[#E0525A] inline-block" />
            <span className="text-[#E0525A]">70 (Red)</span>
          </div>
        </div>
      </div>

      <div className="w-full h-64 sm:h-72">
        {data.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-sm text-[#9AA3B5]">
            Waiting for live serial data stream...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 12, right: 18, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(47, 134, 255, 0.12)" vertical={false} />
              
              <XAxis
                dataKey="timeStr"
                stroke="#9AA3B5"
                tick={{ fill: '#9AA3B5', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(47, 134, 255, 0.2)' }}
                minTickGap={25}
              />
              
              <YAxis
                domain={[0, 100]}
                stroke="#9AA3B5"
                tick={{ fill: '#9AA3B5', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(47, 134, 255, 0.2)' }}
                ticks={[0, 20, 40, 60, 70, 80, 100]}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const val = Number(payload[0].value);
                    const band = val >= 70 ? 'Red' : val >= 40 ? 'Amber' : 'Green';
                    const bandCol = val >= 70 ? '#E0525A' : val >= 40 ? '#F5B301' : '#3BB54A';

                    return (
                      <div
                        className="p-2.5 rounded-lg border text-xs font-mono shadow-xl"
                        style={{
                          backgroundColor: '#101C40',
                          borderColor: 'rgba(47, 134, 255, 0.4)',
                        }}
                      >
                        <div className="text-[#9AA3B5] mb-1">{label}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold text-sm">{val.toFixed(1)} CUS</span>
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                            style={{ backgroundColor: `${bandCol}25`, color: bandCol }}
                          >
                            {band}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Threshold Reference Lines */}
              <ReferenceLine
                y={40}
                stroke="#F5B301"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: '40 Plan Clean',
                  fill: '#F5B301',
                  position: 'insideTopRight',
                  fontSize: 10,
                  fontFamily: 'JetBrains Mono',
                }}
              />
              <ReferenceLine
                y={70}
                stroke="#E0525A"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: '70 Clean Now',
                  fill: '#E0525A',
                  position: 'insideTopRight',
                  fontSize: 10,
                  fontFamily: 'JetBrains Mono',
                }}
              />

              {/* Main CUS Telemetry Line */}
              <Line
                type="monotone"
                dataKey="cus"
                stroke="#2F86FF"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#C6F432', stroke: '#101C40', strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
