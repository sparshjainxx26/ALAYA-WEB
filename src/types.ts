/**
 * ALAYA System Telemetry & Event Types
 */

export interface AlayaTelemetry {
  cus: number;         // Cleanliness & Urgency Score, 0 to 100
  band: 0 | 1 | 2;     // 0 = green (Clean), 1 = amber (Plan clean), 2 = red (Clean now)
  air: number;         // Air quality score 0 to 100
  gas: number;         // Raw gas sensor reading (MQ-135 analog ADC value)
  visits: number;      // Visitor count since last clean
  reports: number;     // User complaint reports since last clean
  wet: 0 | 1;          // Floor wet status (1 = wet, 0 = dry)
  supply: number;      // Soap dispenser level (100 = full, 0 = empty)
  mop: 0 | 1;          // Mop spin detector (1 = spinning, 0 = idle)
  verified: 0 | 1;     // 1 if the last clean was chemical-verified
  check: 0 | 1;        // 1 while active cleaning chemical check is evaluating
  result: 0 | 1 | 2 | 3 | 4; // 0=none yet, 1=VERIFIED, 2=too quick, 3=didn't settle, 4=register tick only
  mins: number;        // Minutes until next band change, -1 if no rise predicted
  timestamp?: number;  // Local recording timestamp
}

export interface TelemetryHistoryPoint {
  timeStr: string;     // e.g. "14:32:05"
  timestamp: number;
  cus: number;
  air: number;
  visits: number;
  band: number;
}

export interface EventLogEntry {
  id: string;
  timestamp: string;
  rawText: string;
  type: 'serial_event' | 'command_sent' | 'system' | 'report_submitted';
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'simulated';

export interface CleaningResultConfig {
  code: number;
  title: string;
  description: string;
  isVerified: boolean;
  statusType: 'success' | 'warning' | 'error' | 'neutral';
}
