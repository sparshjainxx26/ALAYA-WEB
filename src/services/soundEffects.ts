/**
 * Authentic Web Audio API Synthesizer for ALAYA
 * Generates physical piezo buzzer tones, relay clicks, and frequency sweeps
 * Zero external audio files required.
 */

class SoundEffectsService {
  private audioCtx: AudioContext | null = null;
  public enabled = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Authentic 3-Tone Piezo Buzzer Alert (used when CUS >= 70 or during alarm testing)
   */
  public playBuzzerAlert() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const tones = [2400, 2800, 2400]; // Classical piezoelectric buzzer frequency

    tones.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square'; // Typical piezo square wave harmonics
      osc.frequency.setValueAtTime(freq, now + idx * 0.16);

      gain.gain.setValueAtTime(0.12, now + idx * 0.16);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.16 + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.16);
      osc.stop(now + idx * 0.16 + 0.13);
    });
  }

  /**
   * Relay Switch Click (Physical armature contact sound)
   */
  public playRelayClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Probe Touch Blip (High tech oscilloscope tick)
   */
  public playProbeHum(freq = 1200) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }
}

export const soundEffects = new SoundEffectsService();
