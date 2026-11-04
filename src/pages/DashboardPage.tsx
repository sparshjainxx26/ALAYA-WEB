import React from 'react';
import { AlayaTelemetry, ConnectionStatus, EventLogEntry, TelemetryHistoryPoint } from '../types';
import { CircularGauge } from '../components/CircularGauge';
import { PredictionCard } from '../components/PredictionCard';
import { AirQualityCard } from '../components/AirQualityCard';
import { SensorTiles } from '../components/SensorTiles';
import { CleaningVerificationCard } from '../components/CleaningVerificationCard';
import { LiveTelemetryChart } from '../components/LiveTelemetryChart';
import { ScoreBreakdown } from '../components/ScoreBreakdown';
import { CommandPanel } from '../components/CommandPanel';
import { EventLogPanel } from '../components/EventLogPanel';
import { isWebSerialSupported } from '../services/serialManager';
import { Usb, Power, AlertTriangle, Play, Sparkles, CheckCircle2 } from 'lucide-react';

interface DashboardPageProps {
  telemetry: AlayaTelemetry;
  history: TelemetryHistoryPoint[];
  eventLogs: EventLogEntry[];
  connectionStatus: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
  onStartSimulator: () => void;
  onClearLogs: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  telemetry,
  history,
  eventLogs,
  connectionStatus,
  onConnect,
  onDisconnect,
  onStartSimulator,
  onClearLogs,
}) => {
  const serialSupported = isWebSerialSupported();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Top Telemetry Header & Connection Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#2F86FF]/20">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
              ALAYA Live Telemetry Console
            </h1>
            {/* Live Connection Badge */}
            {connectionStatus === 'connected' ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/50 shadow-[0_0_12px_rgba(198,244,50,0.3)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6F432] animate-pulse" />
                Live (115200 baud)
              </span>
            ) : connectionStatus === 'simulated' ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#2F86FF]/20 text-[#2F86FF] border border-[#2F86FF]/50 shadow-[0_0_12px_rgba(47,134,255,0.3)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F86FF] animate-pulse" />
                Demo Simulator
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#101C40] text-[#9AA3B5] border border-[#2F86FF]/20">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9AA3B5]" />
                Not connected
              </span>
            )}
          </div>
          <p className="text-sm text-[#9AA3B5] mt-1.5 font-sans">
            Real-time edge ingestion via Web Serial API. Node ID: <span className="font-mono text-white">WASHROOM-NODE-UNO-01</span>
          </p>
        </div>

        {/* Hardware Connection Action Strip */}
        <div className="flex flex-wrap items-center gap-3">
          {connectionStatus === 'connected' ? (
            <button
              onClick={onDisconnect}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-semibold text-xs text-[#E0525A] bg-[#101C40] border border-[#E0525A]/50 hover:bg-[#E0525A]/15 transition-all"
            >
              <Power className="w-4 h-4" />
              Disconnect
            </button>
          ) : (
            <>
              {serialSupported ? (
                <button
                  onClick={onConnect}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-[#2F86FF] hover:bg-[#2570d8] shadow-[0_0_20px_rgba(47,134,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Usb className="w-4 h-4" />
                  Connect ALAYA box
                </button>
              ) : null}

              {/* Demo Simulator Toggle */}
              <button
                onClick={onStartSimulator}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-semibold text-xs transition-all ${
                  connectionStatus === 'simulated'
                    ? 'bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/60'
                    : 'bg-[#101C40] text-[#9AA3B5] hover:text-white border border-[#2F86FF]/40'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#C6F432]" />
                {connectionStatus === 'simulated' ? 'Simulator Active' : 'Start Demo Simulator'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Browser compatibility banner if Web Serial is not supported */}
      {!serialSupported && (
        <div className="p-4 rounded-xl bg-[#101C40] border border-[#F5B301]/50 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#F5B301] shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-heading font-bold text-white block">
              Web Serial API requires Desktop Chrome or Edge
            </span>
            <p className="text-[#9AA3B5] mt-0.5">
              Open this page in Chrome or Edge on a laptop to connect the ALAYA box via USB.
              Meanwhile, you can use the built-in <strong className="text-[#C6F432]">Demo Simulator</strong> above to explore full real-time telemetry and test Arduino commands!
            </p>
          </div>
        </div>
      )}

      {/* SECTION 1: Gauge + Prediction + Air Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* a) Large Circular Gauge (Col span 5) */}
        <div className="lg:col-span-5 alaya-card p-6 flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-wider text-[#9AA3B5] font-semibold mb-4 self-start">
            Cleanliness & Urgency Score (CUS)
          </span>
          <CircularGauge cus={telemetry.cus} band={telemetry.band} size={250} />
          <div className="mt-6 w-full pt-4 border-t border-[#2F86FF]/15 flex items-center justify-around text-xs font-mono text-[#9AA3B5]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3BB54A]" />
              <span>0-39 Clean</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
              <span>40-69 Plan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E0525A]" />
              <span>70-100 Urgent</span>
            </div>
          </div>
        </div>

        {/* b & c) Prediction Card & Air Quality Card (Col span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Prediction Card */}
          <div className="flex-1">
            <PredictionCard
              mins={telemetry.mins}
              band={telemetry.band}
              cus={telemetry.cus}
            />
          </div>

          {/* Air Quality Card */}
          <div className="flex-1">
            <AirQualityCard air={telemetry.air} gas={telemetry.gas} />
          </div>
        </div>
      </div>

      {/* SECTION 2: Small Tiles (Visits, Reports, Floor, Soap, Mop) */}
      <div>
        <SensorTiles
          visits={telemetry.visits}
          reports={telemetry.reports}
          wet={telemetry.wet}
          supply={telemetry.supply}
          mop={telemetry.mop}
        />
      </div>

      {/* SECTION 3: Cleaning Verification & Live Recharts Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* e) Cleaning Verification Card (Col span 5) */}
        <div className="lg:col-span-5">
          <CleaningVerificationCard
            check={telemetry.check}
            result={telemetry.result}
            verified={telemetry.verified}
          />
        </div>

        {/* f) Live Line Chart (Col span 7) */}
        <div className="lg:col-span-7">
          <LiveTelemetryChart data={history} />
        </div>
      </div>

      {/* SECTION 4: Why this score? Mathematical Breakdown */}
      <div>
        <ScoreBreakdown telemetry={telemetry} />
      </div>

      {/* SECTION 5: Command Panel & Event Log Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Command Panel (Col span 6) */}
        <div className="lg:col-span-6">
          <CommandPanel connectionStatus={connectionStatus} />
        </div>

        {/* Event Log Panel (Col span 6) */}
        <div className="lg:col-span-6">
          <EventLogPanel logs={eventLogs} onClearLogs={onClearLogs} />
        </div>
      </div>
    </div>
  );
};
