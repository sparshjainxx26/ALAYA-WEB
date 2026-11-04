import React from 'react';
import { Users, AlertCircle, Droplets, Package, Disc3, ShieldAlert } from 'lucide-react';

interface SensorTilesProps {
  visits: number;
  reports: number;
  wet: 0 | 1;
  supply: number;
  mop: 0 | 1;
}

export const SensorTiles: React.FC<SensorTilesProps> = ({
  visits,
  reports,
  wet,
  supply,
  mop,
}) => {
  const isFloorWet = wet === 1;
  const isMopSpinning = mop === 1;
  const isSoapEmpty = supply <= 20;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {/* 1. Visits Tile */}
      <div className="alaya-card p-4 flex flex-col justify-between alaya-card-hover">
        <div className="flex items-center justify-between text-[#9AA3B5]">
          <span className="text-[11px] uppercase font-semibold tracking-wider">Visits</span>
          <Users className="w-4 h-4 text-[#2F86FF]" />
        </div>
        <div className="mt-2.5">
          <div className="text-2xl font-heading font-black text-white tabular-nums">
            {visits}
          </div>
          <p className="text-[11px] text-[#9AA3B5] mt-0.5 truncate">Since last clean</p>
        </div>
      </div>

      {/* 2. User Reports Tile */}
      <div className="alaya-card p-4 flex flex-col justify-between alaya-card-hover">
        <div className="flex items-center justify-between text-[#9AA3B5]">
          <span className="text-[11px] uppercase font-semibold tracking-wider">Reports</span>
          <AlertCircle className={`w-4 h-4 ${reports > 0 ? 'text-[#E0525A]' : 'text-[#2F86FF]'}`} />
        </div>
        <div className="mt-2.5">
          <div
            className={`text-2xl font-heading font-black tabular-nums ${
              reports > 0 ? 'text-[#E0525A]' : 'text-white'
            }`}
          >
            {reports}
          </div>
          <p className="text-[11px] text-[#9AA3B5] mt-0.5 truncate">
            {reports === 0 ? 'No open issues' : 'Staff alerted'}
          </p>
        </div>
      </div>

      {/* 3. Floor Moisture Tile */}
      <div
        className={`alaya-card p-4 flex flex-col justify-between transition-colors ${
          isFloorWet ? 'border-[#E0525A]/80 bg-[#101C40] shadow-[0_0_15px_rgba(224,82,90,0.25)]' : ''
        }`}
      >
        <div className="flex items-center justify-between text-[#9AA3B5]">
          <span className="text-[11px] uppercase font-semibold tracking-wider">Floor</span>
          <Droplets className={`w-4 h-4 ${isFloorWet ? 'text-[#E0525A]' : 'text-[#3BB54A]'}`} />
        </div>
        <div className="mt-2.5">
          <div
            className={`text-2xl font-heading font-black tracking-tight ${
              isFloorWet ? 'text-[#E0525A]' : 'text-[#3BB54A]'
            }`}
          >
            {isFloorWet ? 'WET' : 'Dry'}
          </div>
          <p className="text-[11px] text-[#9AA3B5] mt-0.5 truncate flex items-center gap-1">
            {isFloorWet ? (
              <>
                <ShieldAlert className="w-3 h-3 text-[#E0525A]" />
                Slip hazard detected
              </>
            ) : (
              'Conductivity nominal'
            )}
          </p>
        </div>
      </div>

      {/* 4. Soap Supply Tile */}
      <div className="alaya-card p-4 flex flex-col justify-between alaya-card-hover">
        <div className="flex items-center justify-between text-[#9AA3B5]">
          <span className="text-[11px] uppercase font-semibold tracking-wider">Soap Supply</span>
          <Package className={`w-4 h-4 ${isSoapEmpty ? 'text-[#F5B301]' : 'text-[#C6F432]'}`} />
        </div>
        <div className="mt-2.5">
          <div className="text-2xl font-heading font-black text-white tabular-nums flex items-baseline gap-1">
            {supply}%
            <span
              className={`text-xs font-mono font-semibold uppercase ${
                supply > 50 ? 'text-[#C6F432]' : isSoapEmpty ? 'text-[#E0525A]' : 'text-[#F5B301]'
              }`}
            >
              {supply >= 75 ? 'Full' : isSoapEmpty ? 'Empty' : 'Medium'}
            </span>
          </div>
          {/* Visual Mini Progress Bar */}
          <div className="w-full h-1.5 bg-[#0A1433] rounded-full overflow-hidden mt-1.5 border border-[#2F86FF]/20">
            <div
              className={`h-full transition-all duration-500 ${
                supply > 50 ? 'bg-[#C6F432]' : isSoapEmpty ? 'bg-[#E0525A]' : 'bg-[#F5B301]'
              }`}
              style={{ width: `${supply}%` }}
            />
          </div>
        </div>
      </div>

      {/* 5. Mop Spin Detector Tile */}
      <div
        className={`alaya-card p-4 flex flex-col justify-between transition-colors ${
          isMopSpinning ? 'border-[#C6F432]/70 bg-[#101C40] shadow-[0_0_15px_rgba(198,244,50,0.2)]' : ''
        }`}
      >
        <div className="flex items-center justify-between text-[#9AA3B5]">
          <span className="text-[11px] uppercase font-semibold tracking-wider">Mop Sensor</span>
          <Disc3
            className={`w-4 h-4 transition-transform ${
              isMopSpinning ? 'text-[#C6F432] animate-spin' : 'text-[#2F86FF]'
            }`}
          />
        </div>
        <div className="mt-2.5">
          <div
            className={`text-2xl font-heading font-black tracking-tight ${
              isMopSpinning ? 'text-[#C6F432]' : 'text-white'
            }`}
          >
            {isMopSpinning ? 'SPINNING' : 'Ready'}
          </div>
          <p className="text-[11px] text-[#9AA3B5] mt-0.5 truncate flex items-center gap-1">
            {isMopSpinning ? (
              <span className="text-[#C6F432] font-semibold">Active sanitation</span>
            ) : (
              'Vibration idle'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
