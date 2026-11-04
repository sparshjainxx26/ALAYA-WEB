import { AlayaTelemetry, ConnectionStatus, EventLogEntry } from '../types';

export const isWebSerialSupported = (): boolean => {
  return typeof navigator !== 'undefined' && 'serial' in (navigator as any);
};

export const CLEANING_RESULTS: Record<number, { title: string; description: string; isVerified: boolean }> = {
  0: {
    title: 'No Clean Logged Yet',
    description: 'Awaiting scheduled sanitation cycle',
    isVerified: false,
  },
  1: {
    title: 'VERIFIED',
    description: 'Chemical VOC spike confirmed & settled. Genuine disinfection achieved.',
    isVerified: true,
  },
  2: {
    title: 'Too Quick (Rejected)',
    description: 'Mop action was under 45s minimum contact threshold. Sanitizer contact time insufficient.',
    isVerified: false,
  },
  3: {
    title: "Didn't Settle (Rejected)",
    description: 'Chemical vapour dispersal did not stabilize. Room may not have been properly aired or mopped.',
    isVerified: false,
  },
  4: {
    title: 'Register Tick Only (Rejected)',
    description: 'Manual clean marked without any chemical disinfectant detected by the sensor array.',
    isVerified: false,
  },
};

// Default initial state
export const INITIAL_TELEMETRY: AlayaTelemetry = {
  cus: 24.5,
  band: 0,
  air: 28,
  gas: 410,
  visits: 4,
  reports: 0,
  wet: 0,
  supply: 90,
  mop: 0,
  verified: 1,
  check: 0,
  result: 1,
  mins: -1,
  timestamp: Date.now(),
};

export class SerialManager {
  private port: any = null;
  private reader: any = null;
  private readableStreamClosed: Promise<void> | null = null;
  private keepReading = false;
  private onTelemetryCallback: ((data: AlayaTelemetry) => void) | null = null;
  private onEventCallback: ((entry: EventLogEntry) => void) | null = null;
  private onStatusChangeCallback: ((status: ConnectionStatus) => void) | null = null;

  // Simulator state
  private isSimulating = false;
  private simTimer: any = null;
  private simState: AlayaTelemetry = { ...INITIAL_TELEMETRY };
  private simTimeMinutes = 18;

  constructor() {
    this.simState = { ...INITIAL_TELEMETRY };
  }

  public setCallbacks(
    onTelemetry: (data: AlayaTelemetry) => void,
    onEvent: (entry: EventLogEntry) => void,
    onStatusChange: (status: ConnectionStatus) => void
  ) {
    this.onTelemetryCallback = onTelemetry;
    this.onEventCallback = onEvent;
    this.onStatusChangeCallback = onStatusChange;
  }

  public async connect(): Promise<boolean> {
    if (!isWebSerialSupported()) {
      throw new Error('Web Serial API is not supported in this browser. Please use Chrome or Edge on desktop.');
    }

    try {
      this.onStatusChangeCallback?.('connecting');
      const navSerial = (navigator as any).serial;
      this.port = await navSerial.requestPort();
      await this.port.open({ baudRate: 115200 });

      this.keepReading = true;
      this.onStatusChangeCallback?.('connected');
      this.logEvent('ALAYA ready: Web Serial port opened at 115200 baud', 'system');

      // Stop simulator if it was active
      this.stopSimulator();

      this.startReadingLoop();
      return true;
    } catch (err: any) {
      this.onStatusChangeCallback?.('disconnected');
      if (err.name === 'NotFoundError') {
        // User cancelled picker
        this.logEvent('Serial port selection cancelled by user', 'system');
        return false;
      }
      this.logEvent(`Serial connection error: ${err.message || err}`, 'system');
      throw err;
    }
  }

  private async startReadingLoop() {
    let lineBuffer = '';

    while (this.port?.readable && this.keepReading) {
      const textDecoder = new (window as any).TextDecoderStream();
      this.readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
      this.reader = textDecoder.readable.getReader();

      try {
        while (true) {
          const { value, done } = await this.reader.read();
          if (done) break;
          if (value) {
            lineBuffer += value;
            const lines = lineBuffer.split('\n');
            lineBuffer = lines.pop() || ''; // Keep unfinished chunk

            for (const line of lines) {
              const cleanLine = line.trim();
              if (cleanLine) {
                this.processIncomingLine(cleanLine);
              }
            }
          }
        }
      } catch (err: any) {
        if (this.keepReading) {
          this.logEvent(`Read stream warning: ${err.message}`, 'system');
        }
      } finally {
        try {
          this.reader?.releaseLock();
        } catch {
          // Ignore
        }
      }
    }
  }

  private processIncomingLine(line: string) {
    if (line.startsWith('{') && line.endsWith('}')) {
      try {
        const parsed = JSON.parse(line);
        if (typeof parsed.cus === 'number') {
          const telemetry: AlayaTelemetry = {
            cus: Number(parsed.cus.toFixed(1)),
            band: (parsed.band === 0 || parsed.band === 1 || parsed.band === 2) ? parsed.band : 0,
            air: Math.min(100, Math.max(0, Number(parsed.air) || 0)),
            gas: Number(parsed.gas) || 0,
            visits: Number(parsed.visits) || 0,
            reports: Number(parsed.reports) || 0,
            wet: parsed.wet ? 1 : 0,
            supply: Math.min(100, Math.max(0, Number(parsed.supply) || 0)),
            mop: parsed.mop ? 1 : 0,
            verified: parsed.verified ? 1 : 0,
            check: parsed.check ? 1 : 0,
            result: [0, 1, 2, 3, 4].includes(parsed.result) ? parsed.result : 0,
            mins: typeof parsed.mins === 'number' ? parsed.mins : -1,
            timestamp: Date.now(),
          };

          this.onTelemetryCallback?.(telemetry);
          return;
        }
      } catch {
        // Not standard JSON, fall through to event log
      }
    }

    // Handle non-JSON lines (EVENT, OK, SMS, ALAYA ready, LCD address, etc.)
    this.logEvent(line, 'serial_event');
  }

  public async sendCommand(cmd: string): Promise<boolean> {
    const cleanCmd = cmd.trim();

    if (this.isSimulating) {
      this.handleSimulatorCommand(cleanCmd);
      this.logEvent(`Sent command to simulator: "${cleanCmd}"`, 'command_sent');
      return true;
    }

    if (!this.port || !this.port.writable) {
      throw new Error('ALAYA hardware not connected. Connect via Web Serial or enable Demo Simulator.');
    }

    try {
      const textEncoder = new TextEncoder();
      const writer = this.port.writable.getWriter();
      await writer.write(textEncoder.encode(cleanCmd + '\n'));
      writer.releaseLock();
      this.logEvent(`Sent to Arduino: "${cleanCmd}"`, 'command_sent');
      return true;
    } catch (err: any) {
      this.logEvent(`Failed to send command "${cleanCmd}": ${err.message}`, 'system');
      throw err;
    }
  }

  public async disconnect(): Promise<void> {
    this.stopSimulator();
    this.keepReading = false;

    if (this.reader) {
      try {
        await this.reader.cancel();
      } catch {
        // Ignore
      }
      this.reader = null;
    }

    if (this.readableStreamClosed) {
      try {
        await this.readableStreamClosed;
      } catch {
        // Ignore
      }
      this.readableStreamClosed = null;
    }

    if (this.port) {
      try {
        await this.port.close();
      } catch (err: any) {
        console.error('Error closing port', err);
      }
      this.port = null;
    }

    this.onStatusChangeCallback?.('disconnected');
    this.logEvent('ALAYA box disconnected', 'system');
  }

  public logEvent(rawText: string, type: EventLogEntry['type'] = 'system') {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
    const entry: EventLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp,
      rawText,
      type,
    };
    this.onEventCallback?.(entry);
  }

  // --- DEMO SIMULATOR FOR SCIENCE EXHIBITION & NON-SERIAL BROWSERS ---

  public startSimulator() {
    if (this.port) {
      this.disconnect();
    }
    this.isSimulating = true;
    this.onStatusChangeCallback?.('simulated');
    this.logEvent('Demo Simulator activated: Emulating Arduino Uno @ 115200 baud', 'system');
    this.logEvent('ALAYA ready: firmware v2.4 initialized. MQ-135 warmed up.', 'serial_event');

    this.simTimer = setInterval(() => {
      this.tickSimulator();
    }, 1000);
  }

  public stopSimulator() {
    if (this.simTimer) {
      clearInterval(this.simTimer);
      this.simTimer = null;
    }
    this.isSimulating = false;
  }

  private handleSimulatorCommand(cmd: string) {
    const upper = cmd.toUpperCase();
    if (upper === 'REPORT') {
      this.simState.reports += 1;
      this.logEvent('OK: User hygiene report logged (+1 report)', 'serial_event');
      this.logEvent('EVENT: user_report_buzz_alert_sent', 'serial_event');
    } else if (upper === 'RESETREPORTS') {
      this.simState.reports = 0;
      this.logEvent('OK: User reports reset to 0', 'serial_event');
    } else if (upper === 'CLEANED') {
      this.simState.visits = 0;
      this.simState.wet = 0;
      this.simState.verified = 0;
      this.simState.result = 4; // register tick only (rejected)
      this.simState.mop = 0;
      this.simState.check = 0;
      this.logEvent('EVENT: Manual clean logged without chemical spike (Register tick only)', 'serial_event');
      this.logEvent('SMS: Warning sent: Clean logged but no sanitizer VOC detected', 'serial_event');
    } else if (upper === 'RECAL') {
      this.simState.air = 14;
      this.simState.gas = 280;
      this.logEvent('OK: Baseline air recalibrated. New baseline = 14', 'serial_event');
      this.logEvent('LCD address 0x27: Baseline updated', 'serial_event');
    }
    this.recalcSimCus();
    this.onTelemetryCallback?.({ ...this.simState, timestamp: Date.now() });
  }

  public simulateTrigger(action: 'visit' | 'report' | 'wet_toggle' | 'mop_cycle' | 'soap_refill') {
    if (!this.isSimulating) {
      this.startSimulator();
    }

    if (action === 'visit') {
      this.simState.visits += 1;
      this.logEvent('EVENT: PIR trigger - visitor detected at entry', 'serial_event');
    } else if (action === 'report') {
      this.simState.reports += 1;
      this.logEvent('EVENT: Student scanned QR code & filed report', 'serial_event');
    } else if (action === 'wet_toggle') {
      this.simState.wet = this.simState.wet ? 0 : 1;
      this.logEvent(`EVENT: Floor conductivity probe = ${this.simState.wet ? 'WET SPILL DETECTED' : 'DRY'}`, 'serial_event');
    } else if (action === 'soap_refill') {
      this.simState.supply = 100;
      this.logEvent('OK: Soap dispenser refilled to 100%', 'serial_event');
    } else if (action === 'mop_cycle') {
      // Run complete chemical clean simulation
      this.simState.mop = 1;
      this.simState.check = 1;
      this.logEvent('EVENT: Mop vibration sensor active (spinning)', 'serial_event');
      this.logEvent('EVENT: Cleaning check started - monitoring VOC spike...', 'serial_event');

      setTimeout(() => {
        if (this.isSimulating) {
          this.simState.mop = 0;
          this.simState.check = 0;
          this.simState.verified = 1;
          this.simState.result = 1; // VERIFIED
          this.simState.reports = 0;
          this.simState.visits = 0;
          this.simState.wet = 0;
          this.simState.air = Math.max(10, this.simState.air - 25);
          this.logEvent('OK: Chemical sanitizer VOC curve verified (Isopropanol/Chlorine signature detected)', 'serial_event');
          this.logEvent('SMS: Clean verified by ALAYA sensor array', 'serial_event');
          this.recalcSimCus();
          this.onTelemetryCallback?.({ ...this.simState, timestamp: Date.now() });
        }
      }, 3500);
    }

    this.recalcSimCus();
    this.onTelemetryCallback?.({ ...this.simState, timestamp: Date.now() });
  }

  private recalcSimCus() {
    // Formula from prompt:
    // CUS = 0.25*Air + 0.20*Reports + 0.15*Time + 0.15*Visits + 0.15*Floor wet + 0.10*Soap empty
    // Visible terms:
    // Reports term = min(100, reports*25)
    // Floor term = wet * 100
    // Soap term = 100 - supply
    // Visits term = min(100, visits * 8)
    // Time term = min(100, simTimeMinutes * 1.5)
    const airTerm = this.simState.air;
    const reportsTerm = Math.min(100, this.simState.reports * 25);
    const floorTerm = this.simState.wet * 100;
    const soapTerm = 100 - this.simState.supply;
    const visitsTerm = Math.min(100, this.simState.visits * 8);
    const timeTerm = Math.min(100, this.simTimeMinutes * 1.6);

    const calculatedCus = (
      0.25 * airTerm +
      0.20 * reportsTerm +
      0.15 * timeTerm +
      0.15 * visitsTerm +
      0.15 * floorTerm +
      0.10 * soapTerm
    );

    const clampedCus = Math.min(100, Math.max(0, calculatedCus));
    this.simState.cus = Number(clampedCus.toFixed(1));

    // Band calculation: 0 green (0-39), 1 amber (40-69), 2 red (70-100)
    if (this.simState.cus >= 70) {
      this.simState.band = 2;
      this.simState.mins = 0;
    } else if (this.simState.cus >= 40) {
      this.simState.band = 1;
      const pointsToRed = 70 - this.simState.cus;
      this.simState.mins = Math.max(1, Math.round(pointsToRed * 0.4));
    } else {
      this.simState.band = 0;
      const pointsToAmber = 40 - this.simState.cus;
      this.simState.mins = Math.max(3, Math.round(pointsToAmber * 0.7));
    }
  }

  private tickSimulator() {
    // Subtle real-world natural fluctuations
    const airNoise = (Math.random() - 0.48) * 1.5;
    this.simState.air = Math.min(95, Math.max(12, Math.round(this.simState.air + airNoise)));
    this.simState.gas = Math.round(280 + this.simState.air * 7.5 + (Math.random() - 0.5) * 10);

    // Occasional visitor (every ~20 seconds)
    if (Math.random() < 0.05) {
      this.simState.visits += 1;
      this.simState.supply = Math.max(10, this.simState.supply - 1);
    }

    this.recalcSimCus();
    this.simState.timestamp = Date.now();

    this.onTelemetryCallback?.({ ...this.simState });
  }
}

export const serialManager = new SerialManager();
