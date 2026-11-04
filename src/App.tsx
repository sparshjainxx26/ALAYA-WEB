/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AlayaTelemetry, ConnectionStatus, EventLogEntry, TelemetryHistoryPoint } from './types';
import { serialManager, INITIAL_TELEMETRY, isWebSerialSupported } from './services/serialManager';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ReportPage } from './pages/ReportPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CircuitExplorerPage } from './pages/CircuitExplorerPage';
import { JudgeModeModal } from './components/JudgeModeModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'circuit' | 'report' | 'how-it-works' | 'privacy'>('home');
  const [isJudgeModeOpen, setIsJudgeModeOpen] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<AlayaTelemetry>(INITIAL_TELEMETRY);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [history, setHistory] = useState<TelemetryHistoryPoint[]>([]);
  const [eventLogs, setEventLogs] = useState<EventLogEntry[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize seed telemetry history and event logs
  useEffect(() => {
    const now = Date.now();
    const seedPoints: TelemetryHistoryPoint[] = [];
    const baseCus = 26;

    for (let i = 12; i >= 0; i--) {
      const ptTime = new Date(now - i * 15000);
      const timeStr = ptTime.toTimeString().split(' ')[0];
      const noise = Math.sin(i * 0.8) * 4;
      const ptCus = Number(Math.max(15, Math.min(65, baseCus + noise)).toFixed(1));
      seedPoints.push({
        timeStr,
        timestamp: ptTime.getTime(),
        cus: ptCus,
        air: 28,
        visits: 4,
        band: ptCus >= 70 ? 2 : ptCus >= 40 ? 1 : 0,
      });
    }
    setHistory(seedPoints);

    // Initial event logs
    const initLogs: EventLogEntry[] = [
      {
        id: 'init-1',
        timestamp: new Date(now - 120000).toTimeString().split(' ')[0],
        rawText: 'ALAYA ready: firmware v2.4 initialized. MQ-135 warmed up.',
        type: 'serial_event',
      },
      {
        id: 'init-2',
        timestamp: new Date(now - 60000).toTimeString().split(' ')[0],
        rawText: 'LCD address 0x27 initialized. 16x2 I2C display online.',
        type: 'serial_event',
      },
      {
        id: 'init-3',
        timestamp: new Date().toTimeString().split(' ')[0],
        rawText: 'OK: Telemetry stream online. Ready for Web Serial host.',
        type: 'serial_event',
      },
    ];
    setEventLogs(initLogs);

    // Configure serial manager callbacks
    serialManager.setCallbacks(
      (data: AlayaTelemetry) => {
        setTelemetry(data);
        const timeStr = new Date().toTimeString().split(' ')[0];
        setHistory((prev) => {
          const next = [...prev, {
            timeStr,
            timestamp: Date.now(),
            cus: data.cus,
            air: data.air,
            visits: data.visits,
            band: data.band,
          }];
          // Keep last 40 telemetry points (~5 minutes)
          return next.slice(-40);
        });
      },
      (logEntry: EventLogEntry) => {
        setEventLogs((prev) => [logEntry, ...prev].slice(0, 80));
      },
      (status: ConnectionStatus) => {
        setConnectionStatus(status);
        if (status === 'connected') {
          showToast('ALAYA box connected via Web Serial!');
        } else if (status === 'simulated') {
          showToast('Demo Simulator active: emulating live Arduino data');
        } else if (status === 'disconnected') {
          showToast('ALAYA box disconnected');
        }
      }
    );

    return () => {
      serialManager.disconnect();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleConnectBox = async () => {
    try {
      await serialManager.connect();
    } catch (err: any) {
      showToast(err.message || 'Connection failed');
    }
  };

  const handleDisconnectBox = async () => {
    await serialManager.disconnect();
  };

  const handleStartSimulator = () => {
    serialManager.startSimulator();
  };

  const handleNavigate = (tab: 'home' | 'dashboard' | 'circuit' | 'report' | 'how-it-works' | 'privacy') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearLogs = () => {
    setEventLogs([]);
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col font-sans">
      {/* Full-screen Background Video with darker rgba(6, 11, 28, 0.92) overlay */}
      <BackgroundVideo />

      {/* Top Navigation Bar with Traffic Light Motif and Judge Mode Trigger */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        connectionStatus={connectionStatus}
        currentBand={telemetry.band}
        onOpenJudgeMode={() => setIsJudgeModeOpen(true)}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#101C40] border border-[#2F86FF]/60 text-white font-mono text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#C6F432]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onConnectBox={handleConnectBox}
            isSerialSupported={isWebSerialSupported()}
            onStartSimulator={handleStartSimulator}
            onOpenJudgeMode={() => setIsJudgeModeOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            telemetry={telemetry}
            history={history}
            eventLogs={eventLogs}
            connectionStatus={connectionStatus}
            onConnect={handleConnectBox}
            onDisconnect={handleDisconnectBox}
            onStartSimulator={handleStartSimulator}
            onClearLogs={handleClearLogs}
          />
        )}

        {activeTab === 'circuit' && <CircuitExplorerPage />}

        {activeTab === 'report' && (
          <ReportPage
            connectionStatus={connectionStatus}
            onNavigateToDashboard={() => handleNavigate('dashboard')}
          />
        )}

        {activeTab === 'how-it-works' && <HowItWorksPage />}

        {activeTab === 'privacy' && <PrivacyPage />}
      </main>

      {/* Judge Mode Modal / Pitch Console */}
      <JudgeModeModal
        isOpen={isJudgeModeOpen}
        onClose={() => setIsJudgeModeOpen(false)}
        connectionStatus={connectionStatus}
        onNavigateToDashboard={() => {
          setIsJudgeModeOpen(false);
          handleNavigate('dashboard');
        }}
        onNavigateToExplorer={() => {
          setIsJudgeModeOpen(false);
          handleNavigate('circuit');
        }}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
