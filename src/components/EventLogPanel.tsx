import React from 'react';
import { EventLogEntry } from '../types';
import { Terminal, Trash2, ShieldCheck, MessageSquare, AlertCircle, Cpu } from 'lucide-react';

interface EventLogPanelProps {
  logs: EventLogEntry[];
  onClearLogs: () => void;
}

export const EventLogPanel: React.FC<EventLogPanelProps> = ({ logs, onClearLogs }) => {
  const getLineBadge = (text: string) => {
    if (text.startsWith('EVENT')) {
      return { label: 'EVENT', color: 'text-[#2F86FF] bg-[#2F86FF]/15 border-[#2F86FF]/40', icon: AlertCircle };
    }
    if (text.startsWith('OK')) {
      return { label: 'OK', color: 'text-[#C6F432] bg-[#C6F432]/15 border-[#C6F432]/40', icon: ShieldCheck };
    }
    if (text.startsWith('SMS:')) {
      return { label: 'SMS', color: 'text-[#F5B301] bg-[#F5B301]/15 border-[#F5B301]/40', icon: MessageSquare };
    }
    if (text.startsWith('ALAYA ready')) {
      return { label: 'INIT', color: 'text-[#C6F432] bg-[#C6F432]/20 border-[#C6F432]/50', icon: Cpu };
    }
    if (text.startsWith('LCD address')) {
      return { label: 'I2C', color: 'text-[#06B6D4] bg-[#06B6D4]/15 border-[#06B6D4]/40', icon: Cpu };
    }
    return { label: 'LOG', color: 'text-[#9AA3B5] bg-[#9AA3B5]/15 border-[#9AA3B5]/30', icon: Terminal };
  };

  return (
    <div className="alaya-card p-5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#2F86FF]" />
          <span className="text-xs uppercase tracking-wider text-[#9AA3B5] font-semibold">
            Serial Event Log (Non-JSON Lines)
          </span>
          <span className="text-[11px] font-mono text-[#9AA3B5] bg-[#0A1433] px-2 py-0.5 rounded border border-[#2F86FF]/20">
            {logs.length} events
          </span>
        </div>

        {logs.length > 0 && (
          <button
            onClick={onClearLogs}
            className="flex items-center gap-1 text-[11px] text-[#9AA3B5] hover:text-[#E0525A] transition-colors"
            title="Clear event log"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Terminal Viewport */}
      <div className="bg-[#0A1433] border border-[#2F86FF]/20 rounded-xl p-3 h-56 sm:h-64 overflow-y-auto font-mono text-xs space-y-2">
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-[#9AA3B5] text-xs">
            <Terminal className="w-6 h-6 mb-2 opacity-40 text-[#2F86FF]" />
            <span>Awaiting asynchronous serial events & alerts from Arduino...</span>
          </div>
        ) : (
          logs.map((entry) => {
            const badge = getLineBadge(entry.rawText);
            const Icon = badge.icon;
            return (
              <div
                key={entry.id}
                className="flex items-start gap-2.5 py-1 px-1.5 rounded hover:bg-[#101C40]/50 transition-colors"
              >
                <span className="text-[10px] text-[#9AA3B5] shrink-0 tabular-nums">
                  {entry.timestamp}
                </span>

                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-bold border shrink-0 flex items-center gap-1 ${badge.color}`}
                >
                  <Icon className="w-2.5 h-2.5" />
                  {badge.label}
                </span>

                <span className="text-white break-all leading-relaxed">
                  {entry.rawText}
                </span>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-2.5 text-[11px] text-[#9AA3B5] flex items-center justify-between font-mono">
        <span>Non-telemetry serial lines piped automatically</span>
        <span className="text-[#C6F432]">Newest on top</span>
      </div>
    </div>
  );
};
