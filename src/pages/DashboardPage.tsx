import React from 'react';
import { AlayaTelemetry, ConnectionStatus, EventLogEntry, TelemetryHistoryPoint, ActiveReportItem } from '../types';
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
import { Usb, Power, AlertTriangle, Play, Sparkles, CheckCircle2, MessageSquare, Clock, MapPin, Check, PlusCircle } from 'lucide-react';

interface DashboardPageProps {
  telemetry: AlayaTelemetry;
  history: TelemetryHistoryPoint[];
  eventLogs: EventLogEntry[];
  connectionStatus: ConnectionStatus;
  activeReports: ActiveReportItem[];
  onResolveReport: (id: string) => void;
  onNavigateToReport: () => void;
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
  activeReports,
  onResolveReport,
  onNavigateToReport,
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

      {/* SECTION 2.5: Active Complaints & Live Incident Feed */}
      <div className="alaya-card p-6 space-y-4 border-[#2F86FF]/35">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2F86FF]/20 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E0525A]/20 border border-[#E0525A]/50 flex items-center justify-center text-[#E0525A]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-lg text-white">
                  Live Restroom Reports & Complaints
                </h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#E0525A]/20 text-[#E0525A] border border-[#E0525A]/40">
                  {activeReports.filter((r) => r.status === 'active').length} Active
                </span>
              </div>
              <p className="text-xs text-[#9AA3B5]">
                Real-time hygiene issues filed anonymously by students via door QR tags
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-heading font-semibold text-xs text-[#2F86FF] hover:text-white bg-[#2F86FF]/15 hover:bg-[#2F86FF]/30 border border-[#2F86FF]/40 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>File New Report</span>
          </button>
        </div>

        {/* Reports List */}
        {activeReports.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono text-[#9AA3B5] space-y-1">
            <CheckCircle2 className="w-6 h-6 text-[#3BB54A] mx-auto mb-2 opacity-80" />
            <p className="text-white font-medium">All Restrooms In Good Condition</p>
            <p className="text-[11px] text-[#9AA3B5]/70">Zero unresolved complaints filed by students.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeReports.map((report) => {
              const isResolved = report.status === 'resolved';
              return (
                <div
                  key={report.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                    isResolved
                      ? 'bg-[#060B1C]/50 border-white/5 opacity-60'
                      : 'bg-[#0A1433] border-[#2F86FF]/40 shadow-lg'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#9AA3B5]">#{report.id}</span>
                      <span className="text-[#9AA3B5] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#2F86FF]" />
                        {report.time}
                      </span>
                    </div>

                    <div className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isResolved
                            ? 'bg-[#3BB54A]'
                            : report.severity === 'urgent'
                            ? 'bg-[#E0525A] animate-pulse'
                            : 'bg-[#F5B301]'
                        }`}
                      />
                      <span>{report.categoryLabel}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-[#9AA3B5] font-mono">
                      <MapPin className="w-3 h-3 text-[#2F86FF] shrink-0" />
                      <span className="truncate">{report.location}</span>
                    </div>

                    {report.notes && (
                      <p className="text-xs text-white/80 bg-[#060B1C] p-2 rounded-md italic border border-white/5">
                        "{report.notes}"
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                        isResolved
                          ? 'bg-[#3BB54A]/20 text-[#3BB54A]'
                          : 'bg-[#E0525A]/20 text-[#E0525A]'
                      }`}
                    >
                      {isResolved ? 'Resolved' : 'Needs Action'}
                    </span>

                    {!isResolved && (
                      <button
                        onClick={() => onResolveReport(report.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#3BB54A]/20 hover:bg-[#3BB54A]/30 text-[#3BB54A] border border-[#3BB54A]/40 text-xs font-mono font-semibold transition-colors cursor-pointer"
                        title="Mark issue as cleaned / resolved"
                      >
                        <Check className="w-3 h-3" />
                        <span>Mark Resolved</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
