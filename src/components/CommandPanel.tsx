import React, { useState } from 'react';
import { Send, RotateCcw, AlertOctagon, RefreshCw, Sparkles, Check, Droplets, Users } from 'lucide-react';
import { serialManager } from '../services/serialManager';
import { ConnectionStatus } from '../types';

interface CommandPanelProps {
  connectionStatus: ConnectionStatus;
  onCommandSent?: (cmd: string) => void;
}

export const CommandPanel: React.FC<CommandPanelProps> = ({ connectionStatus }) => {
  const [sendingCmd, setSendingCmd] = useState<string | null>(null);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const handleSendCommand = async (cmd: string, label: string) => {
    try {
      setSendingCmd(cmd);
      await serialManager.sendCommand(cmd);
      setLastFeedback(`Executed: ${cmd}`);
      setTimeout(() => setLastFeedback(null), 3000);
    } catch (err: any) {
      setLastFeedback(`Error: ${err.message || 'Failed'}`);
    } finally {
      setSendingCmd(null);
    }
  };

  const isConnectedOrSim = connectionStatus === 'connected' || connectionStatus === 'simulated';

  return (
    <div className="alaya-card p-5 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-[#9AA3B5] font-semibold flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-[#2F86FF]" />
            Arduino Hardware Command Console
          </span>
          <span className="text-[11px] font-mono text-[#9AA3B5]">
            Serial 115200 Baud Tx
          </span>
        </div>
        <p className="text-xs text-[#9AA3B5] mb-4">
          Transmits ASCII commands over USB serial stream directly into the Arduino runtime loop.
        </p>

        {/* The 4 Core Arduino Commands */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* 1. Add User Report */}
          <button
            onClick={() => handleSendCommand('REPORT', 'Add user report')}
            disabled={!isConnectedOrSim || sendingCmd !== null}
            className="flex items-center justify-between p-3 rounded-xl bg-[#0A1433] border border-[#2F86FF]/30 hover:border-[#2F86FF] hover:bg-[#101C40] text-left transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div>
              <div className="text-xs font-heading font-bold text-white group-hover:text-[#2F86FF] transition-colors">
                Add user report
              </div>
              <div className="text-[11px] font-mono text-[#9AA3B5] mt-0.5">
                Writes: <span className="text-[#C6F432]">REPORT\n</span>
              </div>
            </div>
            <Send className="w-4 h-4 text-[#2F86FF] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 2. Clear Reports */}
          <button
            onClick={() => handleSendCommand('RESETREPORTS', 'Clear reports')}
            disabled={!isConnectedOrSim || sendingCmd !== null}
            className="flex items-center justify-between p-3 rounded-xl bg-[#0A1433] border border-[#2F86FF]/30 hover:border-[#2F86FF] hover:bg-[#101C40] text-left transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div>
              <div className="text-xs font-heading font-bold text-white group-hover:text-[#2F86FF] transition-colors">
                Clear reports
              </div>
              <div className="text-[11px] font-mono text-[#9AA3B5] mt-0.5">
                Writes: <span className="text-[#C6F432]">RESETREPORTS\n</span>
              </div>
            </div>
            <RotateCcw className="w-4 h-4 text-[#2F86FF] group-hover:-rotate-45 transition-transform" />
          </button>

          {/* 3. Log Clean Without Chemicals */}
          <button
            onClick={() => handleSendCommand('CLEANED', 'Log clean without chemicals')}
            disabled={!isConnectedOrSim || sendingCmd !== null}
            className="flex items-center justify-between p-3 rounded-xl bg-[#0A1433] border border-[#E0525A]/40 hover:border-[#E0525A] hover:bg-[#101C40] text-left transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div>
              <div className="text-xs font-heading font-bold text-white group-hover:text-[#E0525A] transition-colors">
                Log clean without chemicals
              </div>
              <div className="text-[11px] font-mono text-[#9AA3B5] mt-0.5">
                Writes: <span className="text-[#E0525A]">CLEANED\n</span> (Simulates cheat)
              </div>
            </div>
            <AlertOctagon className="w-4 h-4 text-[#E0525A]" />
          </button>

          {/* 4. Recalibrate Clean Air */}
          <button
            onClick={() => handleSendCommand('RECAL', 'Recalibrate clean air')}
            disabled={!isConnectedOrSim || sendingCmd !== null}
            className="flex items-center justify-between p-3 rounded-xl bg-[#0A1433] border border-[#2F86FF]/30 hover:border-[#2F86FF] hover:bg-[#101C40] text-left transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div>
              <div className="text-xs font-heading font-bold text-white group-hover:text-[#2F86FF] transition-colors">
                Recalibrate clean air
              </div>
              <div className="text-[11px] font-mono text-[#9AA3B5] mt-0.5">
                Writes: <span className="text-[#C6F432]">RECAL\n</span>
              </div>
            </div>
            <RefreshCw className="w-4 h-4 text-[#2F86FF] group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Exhibition Interactive Hardware Sensor Triggers */}
        {connectionStatus === 'simulated' && (
          <div className="mt-4 pt-3 border-t border-[#2F86FF]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-[#C6F432] font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Exhibition Simulation Triggers:
              </span>
              <span className="text-[10px] text-[#9AA3B5]">Test physical sensor scenarios</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => serialManager.simulateTrigger('visit')}
                className="px-2.5 py-1.5 rounded-lg bg-[#0A1433] border border-[#2F86FF]/30 hover:border-[#C6F432] text-[11px] text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Users className="w-3 h-3 text-[#2F86FF]" />
                +1 Visitor
              </button>
              <button
                onClick={() => serialManager.simulateTrigger('wet_toggle')}
                className="px-2.5 py-1.5 rounded-lg bg-[#0A1433] border border-[#2F86FF]/30 hover:border-[#E0525A] text-[11px] text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Droplets className="w-3 h-3 text-[#E0525A]" />
                Toggle Spill
              </button>
              <button
                onClick={() => serialManager.simulateTrigger('mop_cycle')}
                className="px-2.5 py-1.5 rounded-lg bg-[#0A1433] border border-[#2F86FF]/30 hover:border-[#C6F432] text-[11px] text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-[#C6F432]" />
                Sanitize Mop
              </button>
              <button
                onClick={() => serialManager.simulateTrigger('soap_refill')}
                className="px-2.5 py-1.5 rounded-lg bg-[#0A1433] border border-[#2F86FF]/30 hover:border-[#2F86FF] text-[11px] text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Check className="w-3 h-3 text-[#2F86FF]" />
                Refill Soap
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Transmission Feedback */}
      <div className="mt-3 pt-2.5 border-t border-[#2F86FF]/15 flex items-center justify-between text-xs">
        <span className="text-[#9AA3B5]">
          Status:{' '}
          <span className="text-white font-mono">
            {isConnectedOrSim ? 'Channel open (115200 8N1)' : 'Channel closed (Hardware disconnected)'}
          </span>
        </span>
        {lastFeedback && (
          <span className="font-mono text-[11px] text-[#C6F432] bg-[#C6F432]/10 px-2 py-0.5 rounded border border-[#C6F432]/30 animate-pulse">
            {lastFeedback}
          </span>
        )}
      </div>
    </div>
  );
};
