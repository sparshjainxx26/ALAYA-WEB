import React, { useState } from 'react';
import { serialManager } from '../services/serialManager';
import { soundEffects } from '../services/soundEffects';
import { ConnectionStatus, ActiveReportItem } from '../types';
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
  Clock,
  MapPin,
  ArrowRight,
  RefreshCw,
  LayoutDashboard,
} from 'lucide-react';

interface ReportPageProps {
  connectionStatus: ConnectionStatus;
  onNavigateToDashboard: () => void;
  onSubmitReport: (report: ActiveReportItem) => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({
  connectionStatus,
  onNavigateToDashboard,
  onSubmitReport,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('odour');
  const [location, setLocation] = useState<string>('Ground Floor - Science Wing');
  const [notes, setNotes] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<ActiveReportItem | null>(null);

  const categories = [
    {
      id: 'odour',
      label: 'Foul Odour / Poor Ventilation',
      desc: 'Stale air, ammonia or drain smell',
      icon: Wind,
      color: '#2F86FF',
      severity: 'high' as const,
    },
    {
      id: 'floor',
      label: 'Wet / Slippery Floor',
      desc: 'Puddles or slip hazard near washbasins',
      icon: Droplets,
      color: '#E0525A',
      severity: 'urgent' as const,
    },
    {
      id: 'soap',
      label: 'Soap Dispenser Empty',
      desc: 'Hand sanitizer or liquid soap depleted',
      icon: Package,
      color: '#F5B301',
      severity: 'medium' as const,
    },
    {
      id: 'clean',
      label: 'Urgent Sanitation Needed',
      desc: 'Cubicle requires comprehensive janitorial clean',
      icon: Sparkles,
      color: '#C6F432',
      severity: 'urgent' as const,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const time = new Date().toLocaleTimeString();
    const randomTicketNum = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `INC-${randomTicketNum}`;
    const categoryObj = categories.find((c) => c.id === selectedCategory);
    const catLabel = categoryObj ? categoryObj.label : selectedCategory.toUpperCase();
    const catSeverity = categoryObj ? categoryObj.severity : 'high';

    // 1. Play subtle audio confirmation chime
    try {
      soundEffects.playRelayClick();
    } catch (err) {
      console.log('Audio playback', err);
    }

    // 2. Transmit REPORT command to connected Arduino or Simulator
    try {
      if (connectionStatus === 'connected' || connectionStatus === 'simulated') {
        await serialManager.sendCommand('REPORT');
      } else {
        serialManager.logEvent(
          `Student submitted report: [${catLabel}] at ${location}`,
          'report_submitted'
        );
      }
    } catch (err) {
      console.error(err);
    }

    // 3. Create report object and pass to parent state to appear on Live Dashboard
    const newReport: ActiveReportItem = {
      id: ticketId,
      category: selectedCategory,
      categoryLabel: catLabel,
      location,
      notes: notes.trim(),
      time,
      timestamp: Date.now(),
      severity: catSeverity,
      status: 'active',
    };

    onSubmitReport(newReport);
    setSubmittedReport(newReport);
    setSubmitting(false);
  };

  const resetForm = () => {
    setSubmittedReport(null);
    setNotes('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-mono tracking-widest text-[#2F86FF] font-semibold flex items-center justify-center gap-1.5">
          <QrCode className="w-4 h-4 text-[#C6F432]" />
          1-Tap QR Washroom Reporting Portal
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
          Report a Restroom Hygiene Issue
        </h1>
        <p className="text-sm text-[#9AA3B5] mt-2">
          Anonymous, zero-camera student reporting. Submitting immediately logs the complaint
          on the Live Dashboard, updates the ALAYA sensor node, and prompts caretaker attention.
        </p>
      </div>

      {submittedReport ? (
        /* =========================================================================
           SUCCESS STATE: Normal, Clean Confirmation & Live Dashboard Link
           ========================================================================= */
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="alaya-card p-6 sm:p-8 space-y-6 border-[#C6F432]/60 bg-[#101C40] shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#C6F432]/20 border border-[#C6F432] flex items-center justify-center mx-auto text-[#C6F432]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6F432]/10 border border-[#C6F432]/30 text-xs font-mono text-[#C6F432] mb-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                REPORT QUEUED ON LIVE DASHBOARD
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Report Submitted Successfully!
              </h2>
              <p className="text-sm text-[#9AA3B5] mt-1.5">
                Logged at <span className="font-mono text-white">{submittedReport.time}</span>. Ticket{' '}
                <span className="font-mono text-[#C6F432] font-bold">#{submittedReport.id}</span> is now active.
              </p>
            </div>

            {/* Incident Details Summary Card */}
            <div className="p-4 rounded-xl bg-[#060B1C]/90 border border-[#2F86FF]/30 text-left space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[#9AA3B5] text-[10px] uppercase block">Location:</span>
                  <span className="text-white font-bold">{submittedReport.location}</span>
                </div>
                <div>
                  <span className="text-[#9AA3B5] text-[10px] uppercase block">Concern:</span>
                  <span className="text-[#F5B301] font-bold">{submittedReport.categoryLabel}</span>
                </div>
              </div>

              {submittedReport.notes && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[#9AA3B5] text-[10px] uppercase block">Additional Notes:</span>
                  <span className="text-white/90 italic">"{submittedReport.notes}"</span>
                </div>
              )}

              <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-[#3BB54A]">
                <span>Status: Visible on Caretaker Dashboard</span>
                <span>CUS Urgency Score: Recalculated (+25)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onNavigateToDashboard}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-[#2F86FF] hover:bg-[#2570d8] shadow-[0_0_20px_rgba(47,134,255,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>View on Live Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={resetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-heading font-semibold text-xs text-[#9AA3B5] hover:text-white bg-[#0A1433] border border-[#2F86FF]/30 hover:border-[#2F86FF]/60 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another Issue</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           REPORT FORM: Fast, Anonymous Student Hygiene Filing
           ========================================================================= */
        <div className="alaya-card p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Category Selector */}
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
                      className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
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

            {/* 2. Restroom Location */}
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white mb-2">
                2. Restroom Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0A1433] border border-[#2F86FF]/30 text-sm text-white focus:outline-none focus:border-[#2F86FF] font-sans cursor-pointer"
              >
                <option value="Ground Floor - Science Wing">Ground Floor - Science Wing (ALAYA Demo Unit)</option>
                <option value="1st Floor - Senior School Wing">1st Floor - Senior School Wing</option>
                <option value="2nd Floor - Library & Labs">2nd Floor - Library & Labs</option>
                <option value="Ground Floor - Sports Complex">Ground Floor - Sports Complex</option>
              </select>
            </div>

            {/* 3. Optional Description */}
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
                <span>Zero login · 100% Anonymous · Instant Live Dashboard Sync</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-[#2F86FF] hover:bg-[#2570d8] shadow-[0_0_20px_rgba(47,134,255,0.4)] transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Info card */}
      <div className="alaya-card p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-xl bg-[#0A1433] border border-[#2F86FF]/30 flex items-center justify-center text-[#2F86FF] shrink-0">
          <QrCode className="w-10 h-10" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-base text-white">
            How Cubicle QR Reporting Works
          </h3>
          <p className="text-xs text-[#9AA3B5] leading-relaxed mt-1">
            In physical deployments, a waterproof QR sticker is affixed behind every stall door.
            Students scan with any phone camera to report concerns without logins or apps.
            Every submission triggers an immediate increment in the edge CUS algorithm and appears
            instantly on the Live Dashboard for school facility staff to address.
          </p>
        </div>
      </div>
    </div>
  );
};
