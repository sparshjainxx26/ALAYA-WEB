import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Info,
  Radio,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

interface ComponentSpec {
  id: string;
  name: string;
  subtitle: string;
  pin: string;
  voltage: string;
  priceINR: number;
  physicsPrinciple: string;
  firmwareCode: string;
  xPercent: number; // For hotspot placement on image (0-100)
  yPercent: number;
  color: string;
  waveformType: 'analog_noise' | 'digital_pulse' | 'square_pwm' | 'i2c_stream' | 'step_toggle';
}

const COMPONENTS: ComponentSpec[] = [
  {
    id: 'arduino',
    name: 'Arduino Uno R3',
    subtitle: 'ATmega328P 16MHz Microcontroller',
    pin: 'Core Controller (14 Digital I/O, 6 Analog ADC)',
    voltage: '5.0V Regulated / 7-12V Vin',
    priceINR: 450,
    physicsPrinciple:
      'High-performance AVR 8-bit RISC architecture executing single-cycle instructions. Runs the ALAYA CUS linear regression loop once every 1,000ms with non-blocking timer interrupts and serial JSON stringification at 115,200 baud.',
    firmwareCode: `// 1-Second Telemetry Execution Loop
void loop() {
  readAllSensors();
  calculateCUS();
  transmitJsonSerial();
  delay(1000);
}`,
    xPercent: 32,
    yPercent: 44,
    color: '#2F86FF',
    waveformType: 'digital_pulse',
  },
  {
    id: 'mq135',
    name: 'MQ-135 Gas Sniffer Array',
    subtitle: 'Heated SnO2 Semiconductor Sensor',
    pin: 'Analog Pin A0 (10-bit ADC 0-1023)',
    voltage: '5.0V (Heater: 31Ω ±3Ω)',
    priceINR: 180,
    physicsPrinciple:
      'Utilizes a heated tin-dioxide (SnO2) ceramic surface. When reducing gases (ammonia NH3, sulphides, alcohols, or chlorine) contact the heated surface, oxygen anions release electrons, drastically lowering resistance Rs and raising output voltage linearly with gas concentration.',
    firmwareCode: `int rawGas = analogRead(A0);
float rs_ro = ((1023.0 / rawGas) - 1.0);
float ppm = a * pow(rs_ro, b); // Calibrated for ammonia/VOCs`,
    xPercent: 27,
    yPercent: 22,
    color: '#00A3DA',
    waveformType: 'analog_noise',
  },
  {
    id: 'lcd',
    name: '16x2 I2C OLED/LCD Display',
    subtitle: 'HD44780 + PCF8574 I2C Expander',
    pin: 'I2C Bus: SDA (A4), SCL (A5)',
    voltage: '5.0V (0x27 I2C Address)',
    priceINR: 220,
    physicsPrinciple:
      'Two-wire synchronous communication at 100kHz clock rate. Displays current CUS number and band status ("CUS: 45 | AMBER") directly on the front panel so janitors and students can inspect hygiene status locally without opening the enclosure.',
    firmwareCode: `LiquidCrystal_I2C lcd(0x27, 16, 2);
lcd.setCursor(0, 0);
lcd.print("CUS: "); lcd.print(cusScore);
lcd.print(" | "); lcd.print(bandName);`,
    xPercent: 64,
    yPercent: 34,
    color: '#2F86FF',
    waveformType: 'i2c_stream',
  },
  {
    id: 'leds',
    name: 'Traffic Light LED Array',
    subtitle: '5mm Diffused Indicators (Green, Amber, Red)',
    pin: 'Digital Pins D9 (Grn), D10 (Amb), D11 (Red)',
    voltage: '2.0V - 3.2V (220Ω Current Limiting)',
    priceINR: 30,
    physicsPrinciple:
      'Direct bandgap semiconductor electroluminescence. Indicates hygiene threshold at a glance: Green (<40 Clean), Amber (40-69 Plan Clean), and Red (70+ Urgent Disinfection Required). Current image shows Amber LED illuminated.',
    firmwareCode: `digitalWrite(LED_GREEN, band == 0 ? HIGH : LOW);
digitalWrite(LED_AMBER, band == 1 ? HIGH : LOW);
digitalWrite(LED_RED,   band == 2 ? HIGH : LOW);`,
    xPercent: 65,
    yPercent: 47,
    color: '#F5B301',
    waveformType: 'step_toggle',
  },
  {
    id: 'pir',
    name: 'PIR Motion Sensor Dome',
    subtitle: 'HC-SR501 Pyroelectric Infrared Sensor',
    pin: 'Digital Pin D2 (Hardware Interrupt INT0)',
    voltage: '4.5V - 12V (3.3V Logic Output)',
    priceINR: 110,
    physicsPrinciple:
      'Equipped with a segmented HDPE Fresnel lens dome dividing the optical field into dual detection zones. When human thermal radiation (9-10µm wavelength) crosses the zones, the differential pyroelectric element generates a measurable microvolt charge, incrementing the footfall count.',
    firmwareCode: `void onVisitorEnter() {
  visitorCount++;
  lastVisitMillis = millis();
}
attachInterrupt(digitalPinToInterrupt(2), onVisitorEnter, RISING);`,
    xPercent: 65,
    yPercent: 74,
    color: '#C6F432',
    waveformType: 'digital_pulse',
  },
  {
    id: 'relay',
    name: '5V Single-Channel Relay Module',
    subtitle: 'Songle SRD-05VDC-SL-C Armature Relay',
    pin: 'Digital Pin D7 (Transistor Driver with Flyback Diode)',
    voltage: '5.0V Coil / 250VAC 10A Contacts',
    priceINR: 90,
    physicsPrinciple:
      'Electromagnetic coil energizes to pull a mechanical armature switch, isolating 5V microcontroller logic from high-voltage washroom exhaust fans or solenoid chemical dispensing valves during automated air flush cycles.',
    firmwareCode: `// Activate exhaust fan when CUS >= 70
if (cusScore >= 70.0) {
  digitalWrite(RELAY_FAN_PIN, HIGH);
}`,
    xPercent: 37,
    yPercent: 71,
    color: '#E0525A',
    waveformType: 'step_toggle',
  },
  {
    id: 'buzzer',
    name: 'Piezoelectric Audio Transducer',
    subtitle: 'Passive Piezo Resonator with Cavity',
    pin: 'Digital Pin D8 (PWM Tone Output)',
    voltage: '3.3V - 5.0V (Resonant Freq: 2,400Hz)',
    priceINR: 40,
    physicsPrinciple:
      'Inverse piezoelectric effect: oscillating AC voltage across a lead zirconate titanate (PZT) ceramic disc induces physical mechanical deformation, vibrating the perforated front casing cavity to produce a sharp 85dB alarm tone at 2.4kHz.',
    firmwareCode: `// Emit 3-tone urgency chime
tone(BUZZER_PIN, 2400, 150);
delay(200);
tone(BUZZER_PIN, 2800, 150);`,
    xPercent: 38,
    yPercent: 23,
    color: '#F5B301',
    waveformType: 'square_pwm',
  },
  {
    id: 'battery',
    name: '4xAA Battery Power Bank',
    subtitle: '6.0V DC Standalone Supply with Diode Protection',
    pin: 'Vin & GND Power Rails',
    voltage: '6.0V Nominal (4x 1.5V Alkaline Cells)',
    priceINR: 120,
    physicsPrinciple:
      'Electrochemical alkaline zinc-manganese dioxide (Zn/MnO2) power bank with low internal resistance. Guarantees 72 hours of uninterrupted autonomous hygiene monitoring during school power outages.',
    firmwareCode: `// Voltage divider monitoring on Pin A1
float batteryVoltage = (analogRead(A1) * (5.0 / 1023.0)) * 2.0;`,
    xPercent: 22,
    yPercent: 73,
    color: '#3BB54A',
    waveformType: 'step_toggle',
  },
  {
    id: 'ir_barrier',
    name: 'Directional IR Barrier Module',
    subtitle: 'Infrared Emitter & Phototransistor Pair',
    pin: 'Digital Pin D3',
    voltage: '5.0V (940nm Wavelength)',
    priceINR: 70,
    physicsPrinciple:
      'Narrow 940nm modulated infrared beam paired with high-gain photodiode mounted on the right casing exterior. Accurately determines visitor entry vs exit vector to prevent double-counting when groups gather near doorways.',
    firmwareCode: `int irState = digitalRead(IR_PIN);
if (irState == LOW) { /* Doorway obstructed */ }`,
    xPercent: 88,
    yPercent: 42,
    color: '#00A3DA',
    waveformType: 'digital_pulse',
  },
];

export const CircuitExplorerPage: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentSpec>(COMPONENTS[0]);
  const [viewMode, setViewMode] = useState<'physical' | 'schematic' | 'probe'>('physical');
  const [isSimulatingSpike, setIsSimulatingSpike] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live Oscilloscope Waveform Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 400);
      const height = (canvas.height = 140);
      const midY = height / 2;

      ctx.fillStyle = '#060B1C';
      ctx.fillRect(0, 0, width, height);

      // Oscilloscope grid lines
      ctx.strokeStyle = 'rgba(47, 134, 255, 0.15)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Waveform based on selected component
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = selectedComponent.color;

      const type = selectedComponent.waveformType;

      for (let x = 0; x < width; x++) {
        let y = midY;
        const t = (x + phase) * 0.05;

        if (type === 'analog_noise') {
          // MQ-135 Gas analog waveform
          const baseNoise = (Math.sin(t * 0.4) + Math.cos(t * 0.8)) * 14;
          const spikeAmp = isSimulatingSpike ? Math.exp(-((x - width / 2) ** 2) / 1200) * 45 : 0;
          const jitter = (Math.random() - 0.5) * 4;
          y = midY + baseNoise - spikeAmp + jitter;
        } else if (type === 'square_pwm') {
          // 2.4kHz Buzzer PWM
          const square = Math.sin(t * 3.5) > 0 ? 32 : -32;
          y = midY + square;
        } else if (type === 'digital_pulse') {
          // PIR / IR pulse
          const pulse = Math.sin(t * 0.7) > 0.6 ? -35 : 30;
          y = midY + pulse;
        } else if (type === 'i2c_stream') {
          // I2C clock / data bursts
          const burst = Math.sin(t * 2) > 0 ? (Math.sin(t * 12) > 0 ? 25 : -25) : 30;
          y = midY + burst;
        } else {
          // Step toggle (Relay / LED)
          const step = Math.sin(t * 0.5) > 0 ? -30 : 30;
          y = midY + step;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 1.8;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [selectedComponent, isSimulatingSpike]);

  const handleSelectComponent = (comp: ComponentSpec) => {
    setSelectedComponent(comp);
    soundEffects.playProbeHum(comp.id === 'buzzer' ? 2400 : 1200);
  };

  const handleTriggerAction = () => {
    if (selectedComponent.id === 'buzzer') {
      soundEffects.playBuzzerAlert();
    } else if (selectedComponent.id === 'relay') {
      soundEffects.playRelayClick();
    } else if (selectedComponent.id === 'mq135') {
      setIsSimulatingSpike(true);
      soundEffects.playProbeHum(900);
      setTimeout(() => setIsSimulatingSpike(false), 2500);
    } else {
      soundEffects.playProbeHum(1400);
    }
  };

  const totalBOM = COMPONENTS.reduce((sum, c) => sum + c.priceINR, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#2F86FF]/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C6F432] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Digital Twin & Circuit Explorer</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            ALAYA Hardware Architecture
          </h1>
          <p className="text-sm text-[#9AA3B5] mt-1.5 max-w-2xl">
            Live interactive telemetry digital twin of the physical Arduino Uno prototype box. Click any component to inspect pinout connections, operating physics, and real-time logic signals.
          </p>
        </div>

        {/* View Mode Segmented Controls */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#101C40] border border-[#2F86FF]/40 self-start lg:self-center shadow-lg">
          <button
            onClick={() => setViewMode('physical')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'physical'
                ? 'bg-[#2F86FF] text-white shadow-[0_0_15px_rgba(47,134,255,0.4)]'
                : 'text-[#9AA3B5] hover:text-white'
            }`}
          >
            Physical View
          </button>
          <button
            onClick={() => setViewMode('schematic')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'schematic'
                ? 'bg-[#2F86FF] text-white shadow-[0_0_15px_rgba(47,134,255,0.4)]'
                : 'text-[#9AA3B5] hover:text-white'
            }`}
          >
            X-Ray Schematic
          </button>
          <button
            onClick={() => setViewMode('probe')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'probe'
                ? 'bg-[#2F86FF] text-white shadow-[0_0_15px_rgba(47,134,255,0.4)]'
                : 'text-[#9AA3B5] hover:text-white'
            }`}
          >
            Signal Probe
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Hardware Box with Hotspot Pins (7 cols) */}
        <div className="lg:col-span-7 alaya-card p-4 sm:p-6 border-[#2F86FF]/50 relative overflow-hidden bg-[#0A1433]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-[#2F86FF] font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              {viewMode === 'physical'
                ? 'Prototype Inspection (Click pins to inspect)'
                : viewMode === 'schematic'
                ? 'X-Ray Bus Schematic Overlay'
                : 'Live Oscilloscope Tap Matrix'}
            </span>
            <span className="text-xs font-mono text-[#C6F432]">
              Node: ARDUINO-UNO-v2.4
            </span>
          </div>

          {/* The Prototype Image with Interactive SVG/Hotspot Pins */}
          <div className="relative rounded-2xl overflow-hidden border border-[#2F86FF]/30 shadow-2xl aspect-[4/3] bg-[#060B1C]">
            <img
              src="/hero_prototype.jpg"
              alt="ALAYA Prototype Box Interior and Faceplate"
              className={`w-full h-full object-cover transition-all duration-500 ${
                viewMode === 'schematic' ? 'contrast-125 brightness-75 invert-[15%]' : ''
              }`}
            />

            {/* X-Ray Schematic Circuit Bus Overlay (Visible in Schematic mode) */}
            {viewMode === 'schematic' && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2F86FF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C6F432" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Circuit Traces between Arduino and sensors */}
                <path d="M 32% 44% L 27% 22%" stroke="url(#traceGrad)" strokeWidth="3" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                <path d="M 32% 44% L 64% 34%" stroke="url(#traceGrad)" strokeWidth="3" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                <path d="M 32% 44% L 65% 47%" stroke="url(#traceGrad)" strokeWidth="3" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                <path d="M 32% 44% L 65% 74%" stroke="url(#traceGrad)" strokeWidth="3" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                <path d="M 32% 44% L 37% 71%" stroke="url(#traceGrad)" strokeWidth="3" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                <path d="M 32% 44% L 38% 23%" stroke="url(#traceGrad)" strokeWidth="3" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                <path d="M 32% 44% L 88% 42%" stroke="url(#traceGrad)" strokeWidth="3" strokeDasharray="4 4" fill="none" className="animate-pulse" />
              </svg>
            )}

            {/* Interactive Component Hotspot Pins */}
            {COMPONENTS.map((comp) => {
              const isSelected = selectedComponent.id === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => handleSelectComponent(comp)}
                  style={{
                    left: `${comp.xPercent}%`,
                    top: `${comp.yPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full z-20 group transition-all duration-300 focus:outline-none ${
                    isSelected
                      ? 'scale-125 ring-4 ring-[#C6F432] shadow-[0_0_20px_#C6F432]'
                      : 'hover:scale-110 hover:ring-2 hover:ring-white'
                  }`}
                  title={`${comp.name} (${comp.pin})`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full block border-2 border-white shadow-lg animate-pulse"
                    style={{ backgroundColor: comp.color }}
                  />
                  {/* Tooltip Tag on hover */}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-2 py-0.5 rounded bg-[#060B1C]/90 border border-[#2F86FF]/50 text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {comp.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Component Carousel Selector */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
            {COMPONENTS.map((comp) => {
              const isSelected = selectedComponent.id === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => handleSelectComponent(comp)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap border transition-all ${
                    isSelected
                      ? 'bg-[#2F86FF]/20 border-[#C6F432] text-white font-bold shadow-[0_0_10px_rgba(47,134,255,0.3)]'
                      : 'bg-[#060B1C] border-[#2F86FF]/20 text-[#9AA3B5] hover:text-white'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block mr-1.5"
                    style={{ backgroundColor: comp.color }}
                  />
                  {comp.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Technical Inspector & Live Signal Oscilloscope (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Component Deep Inspector Card */}
          <div className="alaya-card p-6 border-[#2F86FF]/60 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-[#2F86FF]/20 pb-3">
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-bold inline-block mb-1"
                  style={{
                    backgroundColor: `${selectedComponent.color}25`,
                    color: selectedComponent.color,
                    border: `1px solid ${selectedComponent.color}60`,
                  }}
                >
                  {selectedComponent.pin}
                </span>
                <h3 className="font-heading font-black text-2xl text-white">
                  {selectedComponent.name}
                </h3>
                <p className="text-xs font-mono text-[#9AA3B5]">
                  {selectedComponent.subtitle}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#9AA3B5] block uppercase">BOM Cost</span>
                <span className="font-heading font-black text-xl text-[#C6F432]">
                  ₹{selectedComponent.priceINR}
                </span>
              </div>
            </div>

            {/* Scientific Operating Principle */}
            <div>
              <span className="text-xs uppercase font-mono text-[#2F86FF] font-semibold block mb-1">
                Physics & Working Principle
              </span>
              <p className="text-xs text-[#9AA3B5] leading-relaxed">
                {selectedComponent.physicsPrinciple}
              </p>
            </div>

            {/* Operating Voltage & Interface */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-[#060B1C] p-3 rounded-xl border border-[#2F86FF]/20">
              <div>
                <span className="text-[#9AA3B5] block text-[10px]">Supply Voltage</span>
                <span className="text-white font-bold">{selectedComponent.voltage}</span>
              </div>
              <div>
                <span className="text-[#9AA3B5] block text-[10px]">Signal Interface</span>
                <span className="text-[#C6F432] font-bold">{selectedComponent.waveformType}</span>
              </div>
            </div>

            {/* Firmware Code Snippet */}
            <div>
              <span className="text-xs uppercase font-mono text-[#2F86FF] font-semibold block mb-1">
                Firmware Logic (Arduino C++)
              </span>
              <pre className="p-3 rounded-xl bg-[#060B1C] border border-[#2F86FF]/20 text-[11px] font-mono text-white/90 overflow-x-auto leading-relaxed">
                <code>{selectedComponent.firmwareCode}</code>
              </pre>
            </div>

            {/* Interactive Live Hardware Simulation Action */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleTriggerAction}
                className="flex-1 py-2.5 px-4 rounded-xl font-heading font-bold text-xs bg-[#2F86FF] hover:bg-[#2570d8] text-white shadow-[0_0_20px_rgba(47,134,255,0.4)] flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-[#C6F432]" />
                {selectedComponent.id === 'buzzer'
                  ? 'Sound Piezo Tone'
                  : selectedComponent.id === 'relay'
                  ? 'Click Relay Coil'
                  : selectedComponent.id === 'mq135'
                  ? 'Inject Simulated Gas Spike'
                  : 'Probe Active Signal'}
              </button>
            </div>
          </div>

          {/* Live Waveform Oscilloscope */}
          <div className="alaya-card p-4 border-[#2F86FF]/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#2F86FF]" />
                Live Pin Probe Oscilloscope
              </span>
              <span className="text-[#C6F432]">500ms/div · 10-Bit ADC</span>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#2F86FF]/25">
              <canvas ref={canvasRef} className="w-full h-28 block bg-[#060B1C]" />
            </div>
          </div>
        </div>
      </div>

      {/* Complete System Bill of Materials (BOM) Table */}
      <section className="alaya-card p-6 sm:p-8 border-[#2F86FF]/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#2F86FF] font-bold block mb-1">
              Affordable Public School Economics
            </span>
            <h3 className="font-heading font-black text-2xl text-white">
              Complete Hardware Bill of Materials (BOM)
            </h3>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#060B1C] border border-[#C6F432]/40 text-right">
            <span className="text-[10px] uppercase font-mono text-[#9AA3B5] block">Total Unit Cost</span>
            <span className="font-heading font-black text-2xl text-[#C6F432]">₹{totalBOM}</span>
            <span className="text-[11px] font-mono text-[#9AA3B5] ml-1">(~$24 USD)</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#2F86FF]/20 text-[#9AA3B5] uppercase">
                <th className="py-2.5 px-3">Component</th>
                <th className="py-2.5 px-3">Interface / Pin</th>
                <th className="py-2.5 px-3">Operating Role</th>
                <th className="py-2.5 px-3 text-right">Unit Cost (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2F86FF]/10 text-white/90">
              {COMPONENTS.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => handleSelectComponent(c)}
                  className="hover:bg-[#101C40] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.name}
                  </td>
                  <td className="py-2.5 px-3 text-[#2F86FF]">{c.pin.split('(')[0]}</td>
                  <td className="py-2.5 px-3 text-[#9AA3B5]">{c.subtitle}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-[#C6F432]">₹{c.priceINR}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
