import React, { useState } from 'react';
import { serialManager } from '../services/serialManager';
import { ConnectionStatus } from '../types';
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  ShieldCheck,
  Droplets,
  Wind,
  Package,
  Sparkles,
} from 'lucide-react';

interface ReportPageProps {
  connectionStatus: ConnectionStatus;
  onNavigateToDashboard: () => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({
  connectionStatus,
  onNavigateToDashboard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('odour');
  const [location, setLocation] = useState<string>('Ground Floor - Science Wing');
  const [notes, setNotes] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportTimestamp, setReportTimestamp] = useState<string>('');

  const categories = [
    {
      id: 'odour',
      label: 'Foul Odour / Poor Ventilation',
      desc: 'Stale air, ammonia or drain smell',
      icon: Wind,
      color: '#2F86FF',
    },
    {
      id: 'floor',
      label: 'Wet / Slippery Floor',
      desc: 'Puddles or slip hazard near washbasins',
      icon: Droplets,
      color: '#E0525A',
    },
    {
      id: 'soap',
      label: 'Soap Dispenser Empty',
      desc: 'Hand sanitizer or liquid soap depleted',
      icon: Package,
      color: '#F5B301',
    },
    {
      id: 'clean',
      label: 'Urgent Sanitation Needed',
      desc: 'Cubicle requires comprehensive janitorial clean',
      icon: Sparkles,
      color: '#C6F432',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send the REPORT command to the connected Arduino or Simulator
      if (connectionStatus === 'connected' || connectionStatus === 'simulated') {
        await serialManager.sendCommand('REPORT');
      } else {
        // Log event locally
        serialManager.logEvent(`Student filed anonymous report: [${selectedCategory.toUpperCase()}] at ${location}`, 'report_submitted');
      }

      const time = new Date().toLocaleTimeString();
      setReportTimestamp(time);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setNotes('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-mono tracking-widest text-[#2F86FF] font-semibold">
          1-Tap QR Washroom Reporting Portal
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
          Report a Restroom Hygiene Issue
        </h1>
        <p className="text-sm text-[#9AA3B5] mt-2">
          Anonymous, instant transmission. No personal details, names, or accounts are recorded.
          Your report updates the ALAYA sensor node immediately.
        </p>
      </div>

      {submitted ? (
        /* Success State */
        <div className="alaya-card p-8 text-center space-y-6 max-w-xl mx-auto border-[#C6F432]/60 bg-[#101C40]">
          <div className="w-16 h-16 rounded-full bg-[#C6F432]/20 border border-[#C6F432] flex items-center justify-center mx-auto text-[#C6F432]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-heading font-black text-2xl text-white">
              Report Transmitted to ALAYA Box
            </h2>
            <p className="text-sm text-[#9AA3B5] mt-1.5">
              Logged at <span className="font-mono text-white">{reportTimestamp}</span>. The CUS score
              has been recalculated and janitorial staff notified.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0A1433] border border-[#2F86FF]/20 text-xs text-left space-y-1 font-mono">
            <div className="text-[#9AA3B5]">Location: <span className="text-white">{location}</span></div>
            <div className="text-[#9AA3B5]">Issue Category: <span className="text-[#C6F432]">{selectedCategory.toUpperCase()}</span></div>
            <div className="text-[#9AA3B5]">Command Dispatched: <span className="text-[#2F86FF]">REPORT\n</span></div>
            <div className="text-[#9AA3B5]">Privacy Status: <span className="text-[#3BB54A]">Anonymous (0 telemetry cookies)</span></div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onNavigateToDashboard}
              className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-[#2F86FF] hover:bg-[#2570d8] transition-all"
            >
              View Updated Score on Live Dashboard
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2.5 rounded-xl font-heading font-semibold text-xs text-[#9AA3B5] hover:text-white bg-[#0A1433] border border-[#2F86FF]/30 transition-all"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        /* Report Form */
        <div className="alaya-card p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selector */}
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white mb-3">
                1. Select Hygiene Concern
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const Icon = cat.icon;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#2F86FF] bg-[#0A1433] shadow-[0_0_15px_rgba(47,134,255,0.25)]'
                          : 'border-[#2F86FF]/25 bg-[#0A1433]/50 hover:border-[#2F86FF]/50'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${cat.color}20`,
                          color: cat.color,
                          border: `1px solid ${cat.color}50`,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-white">
                          {cat.label}
                        </div>
                        <div className="text-xs text-[#9AA3B5] mt-0.5">
                          {cat.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Restroom Location */}
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white mb-2">
                2. Restroom Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0A1433] border border-[#2F86FF]/30 text-sm text-white focus:outline-none focus:border-[#2F86FF] font-sans"
              >
                <option value="Ground Floor - Science Wing">Ground Floor - Science Wing (ALAYA Demo Unit)</option>
                <option value="1st Floor - Senior School Wing">1st Floor - Senior School Wing</option>
                <option value="2nd Floor - Library & Labs">2nd Floor - Library & Labs</option>
                <option value="Ground Floor - Sports Complex">Ground Floor - Sports Complex</option>
              </select>
            </div>

            {/* Optional Description */}
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white mb-2">
                3. Additional Details (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Washbasin 2 tap running, soap bottle cap cracked..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-[#0A1433] border border-[#2F86FF]/30 text-sm text-white focus:outline-none focus:border-[#2F86FF] font-sans placeholder-[#9AA3B5]/50 resize-none"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#9AA3B5]">
                <ShieldCheck className="w-4 h-4 text-[#3BB54A]" />
                <span>Zero login · Zero student tracking · Transmits <span className="font-mono text-[#C6F432]">REPORT\n</span></span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-sm text-white bg-[#2F86FF] hover:bg-[#2570d8] shadow-[0_0_20px_rgba(47,134,255,0.4)] transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Transmitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* How the QR code integration works in school exhibition */}
      <div className="alaya-card p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-xl bg-[#0A1433] border border-[#2F86FF]/30 flex items-center justify-center text-[#2F86FF] shrink-0">
          <QrCode className="w-10 h-10" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-base text-white">
            Exhibition Demo: Cubicle Door QR Tag
          </h3>
          <p className="text-xs text-[#9AA3B5] leading-relaxed mt-1">
            In physical deployments, a waterproof QR sticker is affixed behind every stall door.
            Students scan with any phone camera (no app download required) which opens this lightweight interface.
            When submitted, the report term <span className="font-mono text-[#C6F432]">min(100, reports × 25)</span> jumps by 25 points, immediately pulling the CUS score upward and prompting caretaker action.
          </p>
        </div>
      </div>
    </div>
  );
};
