import React, { useState } from 'react';
import {
  Cpu,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Layers,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  // Interactive Sandbox state for science fair visitors
  const [airInput, setAirInput] = useState<number>(35);
  const [reportsInput, setReportsInput] = useState<number>(1);
  const [visitsInput, setVisitsInput] = useState<number>(5);
  const [wetInput, setWetInput] = useState<boolean>(false);
  const [soapInput, setSoapInput] = useState<number>(85);
  const [timeMinsInput, setTimeMinsInput] = useState<number>(20);

  // Compute live sandbox CUS
  const sAir = airInput;
  const sReports = Math.min(100, reportsInput * 25);
  const sVisits = Math.min(100, visitsInput * 10);
  const sWet = wetInput ? 100 : 0;
  const sSoap = Math.max(0, 100 - soapInput);
  const sTime = Math.min(100, timeMinsInput * 1.6);

  const sandboxCus = Math.min(
    100,
    0.25 * sAir +
    0.20 * sReports +
    0.15 * sTime +
    0.15 * sVisits +
    0.15 * sWet +
    0.10 * sSoap
  );

  const sandboxBand = sandboxCus >= 70 ? 2 : sandboxCus >= 40 ? 1 : 0;
  const sandboxColor = sandboxBand === 2 ? '#E0525A' : sandboxBand === 1 ? '#F5B301' : '#3BB54A';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-mono tracking-widest text-[#2F86FF] font-semibold">
          School Science Exhibition · Engineering Breakdown
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mt-2">
          How ALAYA Works
        </h1>
        <p className="text-base text-[#9AA3B5] mt-3 leading-relaxed">
          The physics, sensor electronics, mathematical predictive modeling, and chemical verification
          that power our low-cost, camera-free hygiene monitor.
        </p>
      </div>

      {/* SECTION 1: The 4-Sensor Hardware Suite */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#2F86FF]" />
          <h2 className="font-heading font-bold text-2xl text-white">
            1. The Hardware & Sensor Suite (~₹2,000 BOM)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sensor 1 */}
          <div className="alaya-card p-5 space-y-3">
            <div className="text-xs font-mono text-[#2F86FF] uppercase font-bold">Sensor A · VOC/Gas</div>
            <h3 className="font-heading font-bold text-lg text-white">MQ-135 Gas Array</h3>
            <p className="text-xs text-[#9AA3B5] leading-relaxed">
              Equipped with a tin-dioxide ($SnO_2$) heating layer sensitive to ammonia ($NH_3$), sulphides,
              and volatile organic compounds. Dual-purposed: monitors foul odour accumulation and verifies
              chemical disinfectant vapours during cleans.
            </p>
            <div className="pt-2 border-t border-[#2F86FF]/15 text-[11px] font-mono text-[#C6F432]">
              Pin A0 · Cost: ~₹180
            </div>
          </div>

          {/* Sensor 2 */}
          <div className="alaya-card p-5 space-y-3">
            <div className="text-xs font-mono text-[#C6F432] uppercase font-bold">Sensor B · Footfall</div>
            <h3 className="font-heading font-bold text-lg text-white">PIR / Ultrasonic</h3>
            <p className="text-xs text-[#9AA3B5] leading-relaxed">
              Passive Infrared (HC-SR501) directional barrier mounted at doorway height. Counts entering
              occupants without any optical imaging or facial tracking, strictly measuring usage volume.
            </p>
            <div className="pt-2 border-t border-[#2F86FF]/15 text-[11px] font-mono text-[#C6F432]">
              Pin D2 (Interrupt) · Cost: ~₹90
            </div>
          </div>

          {/* Sensor 3 */}
          <div className="alaya-card p-5 space-y-3">
            <div className="text-xs font-mono text-[#F5B301] uppercase font-bold">Sensor C · Slip Hazard</div>
            <h3 className="font-heading font-bold text-lg text-white">Conductivity Grid</h3>
            <p className="text-xs text-[#9AA3B5] leading-relaxed">
              Flush floor conductive copper traces near washbasins. Water puddles bridge the contacts,
              altering circuit impedance to flag slippery washroom conditions immediately.
            </p>
            <div className="pt-2 border-t border-[#2F86FF]/15 text-[11px] font-mono text-[#C6F432]">
              Pin D4 · Cost: ~₹40
            </div>
          </div>

          {/* Sensor 4 */}
          <div className="alaya-card p-5 space-y-3">
            <div className="text-xs font-mono text-[#06B6D4] uppercase font-bold">Sensor D · Supply</div>
            <h3 className="font-heading font-bold text-lg text-white">Ultrasonic / IR Level</h3>
            <p className="text-xs text-[#9AA3B5] leading-relaxed">
              Miniature acoustic echo sensor installed within soap reservoir ceiling to gauge remaining fluid level
              from 0% (empty) to 100% (full), preventing empty dispenser frustration.
            </p>
            <div className="pt-2 border-t border-[#2F86FF]/15 text-[11px] font-mono text-[#C6F432]">
              Pins D6/D7 · Cost: ~₹120
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Mathematical Formulation */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#2F86FF]" />
          <h2 className="font-heading font-bold text-2xl text-white">
            2. The Cleanliness & Urgency Score (CUS)
          </h2>
        </div>

        <div className="alaya-card p-6 sm:p-8 space-y-6">
          <div className="p-4 rounded-xl bg-[#0A1433] border border-[#2F86FF]/30 font-mono text-sm text-center text-white leading-relaxed">
            <span className="text-[#C6F432] font-black text-lg">CUS</span> ={' '}
            <span className="text-[#2F86FF]">0.25·Air</span> +{' '}
            <span className="text-[#E0525A]">0.20·Reports</span> +{' '}
            <span className="text-[#F5B301]">0.15·Time</span> +{' '}
            <span className="text-[#C6F432]">0.15·Visits</span> +{' '}
            <span className="text-[#3BB54A]">0.15·Floor</span> +{' '}
            <span className="text-[#06B6D4]">0.10·Soap</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#9AA3B5] leading-relaxed">
            <div>
              <h4 className="font-heading font-bold text-white mb-1.5">
                Why Weighted Linear Multi-Factor?
              </h4>
              <p>
                A single sensor can fail or be noisy. By fusing gaseous air telemetry (25%), direct user complaints (20%),
                physical visitor volume (15%), floor hazards (15%), natural time decay (15%), and soap availability (10%),
                ALAYA produces a resilient single number from 0 to 100 that directly informs janitorial priorities.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-1.5">
                Band Classification & Actions
              </h4>
              <ul className="space-y-1.5 text-xs font-mono">
                <li className="flex items-center gap-2 text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3BB54A]" />
                  <span>Band 0 [0.0 – 39.9]: <strong>CLEAN</strong> (Restroom pristine)</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5B301]" />
                  <span>Band 1 [40.0 – 69.9]: <strong>PLAN A CLEAN</strong> (Proactive maintenance)</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E0525A]" />
                  <span>Band 2 [70.0 – 100.0]: <strong>CLEAN NOW</strong> (Immediate intervention)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Chemical Verification (No Fraudulent Ticks) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#2F86FF]" />
          <h2 className="font-heading font-bold text-2xl text-white">
            3. Chemical Cleaning Verification
          </h2>
        </div>

        <div className="alaya-card p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-white">
                "A tick on paper isn't enough."
              </h3>
              <p className="text-sm text-[#9AA3B5] leading-relaxed">
                In physical washrooms worldwide, janitorial compliance is tracked with a paper clipboard
                sheet hung on the door. Studies reveal over 68% of check marks are forged or scribbled in advance.
              </p>
              <p className="text-sm text-[#9AA3B5] leading-relaxed">
                ALAYA introduces <strong>Sniff-Based Chemical Verification</strong>. When a janitor cleans:
              </p>
              <ol className="text-xs text-[#9AA3B5] space-y-2 list-decimal list-inside leading-relaxed">
                <li>The mop handle vibration/gyro sensor registers spinning motion.</li>
                <li>The Arduino triggers a 45-second sampling routine (<span className="font-mono text-[#2F86FF]">check = 1</span>).</li>
                <li>The MQ-135 sensor monitors the sharp transient spike of volatile disinfectant alcohols, chlorine, or pine phenols.</li>
                <li>If the signature matches the chemical curve, <span className="font-mono text-[#C6F432]">result = 1 (VERIFIED)</span> is awarded.</li>
              </ol>
            </div>

            {/* The 4 Result Codes Explained */}
            <div className="bg-[#0A1433] p-5 rounded-xl border border-[#2F86FF]/30 space-y-3">
              <span className="text-xs font-mono uppercase text-[#2F86FF] font-bold block">
                The 4 Verification Outcomes
              </span>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded bg-[#101C40] border border-[#C6F432]/40 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C6F432] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#C6F432]">Code 1: VERIFIED</span>
                    <p className="text-[#9AA3B5] mt-0.5">Disinfectant chemical vapour spike confirmed. Full sanitisation achieved.</p>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#101C40] border border-[#E0525A]/40 flex items-start gap-2">
                  <AlertOctagon className="w-4 h-4 text-[#E0525A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#E0525A]">Code 2: Too Quick (Rejected)</span>
                    <p className="text-[#9AA3B5] mt-0.5">Mop contact duration was &lt;45s. Chemical contact time insufficient to kill bacteria.</p>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#101C40] border border-[#E0525A]/40 flex items-start gap-2">
                  <AlertOctagon className="w-4 h-4 text-[#E0525A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#E0525A]">Code 3: Didn't Settle (Rejected)</span>
                    <p className="text-[#9AA3B5] mt-0.5">Vapour curves did not stabilize. Room lacked ventilation or improper chemical dilution.</p>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#101C40] border border-[#E0525A]/40 flex items-start gap-2">
                  <AlertOctagon className="w-4 h-4 text-[#E0525A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#E0525A]">Code 4: Register Tick Only (Rejected)</span>
                    <p className="text-[#9AA3B5] mt-0.5">Clean logged on keypad/dashboard without ANY disinfectant chemicals sniffed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Interactive Exhibition Formula Sandbox */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#C6F432]" />
          <h2 className="font-heading font-bold text-2xl text-white">
            4. Interactive Exhibition Sandbox
          </h2>
        </div>

        <div className="alaya-card p-6 sm:p-8 space-y-6 border-[#C6F432]/40">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">
              Test the ALAYA Math Engine
            </h3>
            <p className="text-xs text-[#9AA3B5] mt-1">
              Drag the sliders below to simulate different washroom conditions and watch how the CUS score,
              bands, and predictive alarms respond in real time!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Sliders */}
            <div className="space-y-4">
              {/* Air Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono text-[#9AA3B5] mb-1">
                  <span>Air Odour Level (0-100)</span>
                  <span className="text-white font-bold">{airInput}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={airInput}
                  onChange={(e) => setAirInput(Number(e.target.value))}
                  className="w-full accent-[#2F86FF]"
                />
              </div>

              {/* Reports Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono text-[#9AA3B5] mb-1">
                  <span>Student Reports (0-5)</span>
                  <span className="text-white font-bold">{reportsInput}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={reportsInput}
                  onChange={(e) => setReportsInput(Number(e.target.value))}
                  className="w-full accent-[#E0525A]"
                />
              </div>

              {/* Visits Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono text-[#9AA3B5] mb-1">
                  <span>Visitors Since Last Clean (0-20)</span>
                  <span className="text-white font-bold">{visitsInput}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={visitsInput}
                  onChange={(e) => setVisitsInput(Number(e.target.value))}
                  className="w-full accent-[#C6F432]"
                />
              </div>

              {/* Time Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono text-[#9AA3B5] mb-1">
                  <span>Time Elapsed (0-60 mins)</span>
                  <span className="text-white font-bold">{timeMinsInput} min</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={timeMinsInput}
                  onChange={(e) => setTimeMinsInput(Number(e.target.value))}
                  className="w-full accent-[#F5B301]"
                />
              </div>

              {/* Soap Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono text-[#9AA3B5] mb-1">
                  <span>Soap Supply Remaining (0-100%)</span>
                  <span className="text-white font-bold">{soapInput}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soapInput}
                  onChange={(e) => setSoapInput(Number(e.target.value))}
                  className="w-full accent-[#06B6D4]"
                />
              </div>

              {/* Floor Wet Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A1433] border border-[#2F86FF]/20">
                <span className="text-xs font-mono text-white">Floor Condition</span>
                <button
                  type="button"
                  onClick={() => setWetInput(!wetInput)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                    wetInput
                      ? 'bg-[#E0525A] text-white shadow-[0_0_10px_#E0525A]'
                      : 'bg-[#3BB54A]/20 text-[#3BB54A] border border-[#3BB54A]/40'
                  }`}
                >
                  {wetInput ? 'WET SPILL (+15 pts)' : 'DRY (0 pts)'}
                </button>
              </div>
            </div>

            {/* Sandbox Calculated Result */}
            <div className="p-6 rounded-2xl bg-[#0A1433] border border-[#2F86FF]/40 text-center space-y-4">
              <span className="text-xs font-mono uppercase text-[#9AA3B5] tracking-wider">
                Simulated Sandbox CUS Output
              </span>

              <div className="font-heading font-black text-6xl tracking-tight text-white tabular-nums">
                {sandboxCus.toFixed(1)}
              </div>

              <div
                className="inline-block px-4 py-1.5 rounded-full font-heading font-black text-sm uppercase tracking-wide border shadow-lg"
                style={{
                  backgroundColor: `${sandboxColor}20`,
                  color: sandboxColor,
                  borderColor: sandboxColor,
                }}
              >
                BAND {sandboxBand}: {sandboxBand === 0 ? 'CLEAN' : sandboxBand === 1 ? 'PLAN A CLEAN' : 'CLEAN NOW'}
              </div>

              <div className="text-xs text-[#9AA3B5] max-w-sm mx-auto leading-relaxed pt-2 border-t border-[#2F86FF]/15">
                {sandboxBand === 2 ? (
                  <span className="text-[#E0525A] font-semibold">
                    Critical warning! SMS buzzer sent to school caretaker.
                  </span>
                ) : sandboxBand === 1 ? (
                  <span className="text-[#F5B301] font-semibold">
                    Hygiene decaying. Dashboard displays predictive countdown.
                  </span>
                ) : (
                  <span className="text-[#3BB54A] font-semibold">
                    Sanitary conditions optimal. Green light glowing on box.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
