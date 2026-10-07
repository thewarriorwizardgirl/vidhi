/**
 * Web Audio API ambient sound generator.
 * Synthesizes nature soundscapes & cozy lofi tones without external audio files.
 */

class CabinSoundEngine {
  private ctx: AudioContext | null = null;
  private isInitialized = false;

  // Master Gain
  private masterGain: GainNode | null = null;
  private masterVolume = 0.7;

  // Sound channels
  private channels: {
    [key: string]: {
      gain: GainNode | null;
      volume: number;
      nodes: (AudioNode | number)[];
      active: boolean;
    };
  } = {
    river: { gain: null, volume: 0.45, nodes: [], active: false },
    rain: { gain: null, volume: 0.0, nodes: [], active: false },
    wind: { gain: null, volume: 0.3, nodes: [], active: false },
    fireplace: { gain: null, volume: 0.35, nodes: [], active: false },
    keyboard: { gain: null, volume: 0.25, nodes: [], active: false },
    lofiChords: { gain: null, volume: 0.4, nodes: [], active: false },
  };

  private keyboardInterval: number | null = null;
  private lofiInterval: number | null = null;

  public init() {
    if (this.isInitialized && this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
    }
  }

  public ensureContext() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.masterVolume, this.ctx.currentTime, 0.05);
    }
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }

  public setChannelVolume(channel: string, vol: number) {
    if (!this.channels[channel]) return;
    this.channels[channel].volume = Math.max(0, Math.min(1, vol));
    if (this.channels[channel].gain && this.ctx) {
      this.channels[channel].gain!.gain.setTargetAtTime(
        this.channels[channel].active ? this.channels[channel].volume : 0,
        this.ctx.currentTime,
        0.05
      );
    }
  }

  public getChannelVolume(channel: string): number {
    return this.channels[channel]?.volume ?? 0;
  }

  public isChannelActive(channel: string): boolean {
    return this.channels[channel]?.active ?? false;
  }

  public toggleChannel(channel: string, force?: boolean): boolean {
    this.ensureContext();
    if (!this.channels[channel]) return false;
    const newState = force !== undefined ? force : !this.channels[channel].active;
    this.channels[channel].active = newState;

    if (newState) {
      this.startChannel(channel);
    } else {
      this.stopChannel(channel);
    }
    return newState;
  }

  // --- CHANNEL IMPLEMENTATIONS ---

  private startChannel(channel: string) {
    if (!this.ctx || !this.masterGain) return;

    if (!this.channels[channel].gain) {
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(this.channels[channel].volume, this.ctx.currentTime);
      g.connect(this.masterGain);
      this.channels[channel].gain = g;
    } else {
      this.channels[channel].gain!.gain.setTargetAtTime(this.channels[channel].volume, this.ctx.currentTime, 0.1);
    }

    const g = this.channels[channel].gain!;

    if (channel === 'river') {
      this.startRiver(g);
    } else if (channel === 'rain') {
      this.startRain(g);
    } else if (channel === 'wind') {
      this.startWind(g);
    } else if (channel === 'fireplace') {
      this.startFireplace(g);
    } else if (channel === 'keyboard') {
      this.startKeyboard(g);
    } else if (channel === 'lofiChords') {
      this.startLofiChords(g);
    }
  }

  private stopChannel(channel: string) {
    if (!this.channels[channel]) return;
    if (this.channels[channel].gain && this.ctx) {
      this.channels[channel].gain!.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    }
    // Clean up timers
    if (channel === 'keyboard' && this.keyboardInterval) {
      window.clearInterval(this.keyboardInterval);
      this.keyboardInterval = null;
    }
    if (channel === 'lofiChords' && this.lofiInterval) {
      window.clearInterval(this.lofiInterval);
      this.lofiInterval = null;
    }
  }

  // Pink / Brownian noise generator buffer
  private createNoiseBuffer(durationSeconds = 3, type: 'pink' | 'brown' | 'white' = 'pink'): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * durationSeconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'pink') {
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      } else if (type === 'brown') {
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5;
      } else {
        data[i] = white * 0.15;
      }
    }
    return buffer;
  }

  // River water stream
  private startRiver(destination: GainNode) {
    if (!this.ctx) return;
    const buffer = this.createNoiseBuffer(5, 'brown');
    if (!buffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(420, this.ctx.currentTime);
    filter1.Q.setValueAtTime(1.8, this.ctx.currentTime);

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(800, this.ctx.currentTime);

    // LFO for river undulating wave
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter1.frequency);

    source.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(destination);

    source.start();
    lfo.start();
  }

  // Rain against glass
  private startRain(destination: GainNode) {
    if (!this.ctx) return;
    const buffer = this.createNoiseBuffer(4, 'pink');
    if (!buffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(destination);
    source.start();
  }

  // Mountain Pine Breeze / Wind
  private startWind(destination: GainNode) {
    if (!this.ctx) return;
    const buffer = this.createNoiseBuffer(6, 'brown');
    if (!buffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(260, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.4, this.ctx.currentTime);

    // Wind swell LFO
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(160, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    source.connect(filter);
    filter.connect(destination);

    source.start();
    lfo.start();
  }

  // Cabin Fireplace Crackle
  private startFireplace(destination: GainNode) {
    if (!this.ctx) return;
    const buffer = this.createNoiseBuffer(4, 'brown');
    if (!buffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(280, this.ctx.currentTime);

    source.connect(lowpass);
    lowpass.connect(destination);
    source.start();

    // Occasional wood pops
    const triggerPop = () => {
      if (!this.channels.fireplace.active || !this.ctx) return;
      const popTime = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120 + Math.random() * 240, popTime);
      osc.frequency.exponentialRampToValueAtTime(30, popTime + 0.05);

      popGain.gain.setValueAtTime(0.18 + Math.random() * 0.15, popTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.05);

      osc.connect(popGain);
      popGain.connect(destination);

      osc.start(popTime);
      osc.stop(popTime + 0.06);

      const nextDelay = 300 + Math.random() * 1400;
      setTimeout(triggerPop, nextDelay);
    };

    setTimeout(triggerPop, 500);
  }

  // Keyboard clicks ASMR
  private startKeyboard(destination: GainNode) {
    if (!this.ctx) return;

    const playKeyClick = () => {
      if (!this.channels.keyboard.active || !this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Mechanical switch click resonance
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900 + Math.random() * 600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.035);

      gain.gain.setValueAtTime(0.08 + Math.random() * 0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(destination);

      osc.start(now);
      osc.stop(now + 0.04);
    };

    // Realistic burst typing pattern
    let inBurst = false;
    let burstRemaining = 0;

    const loop = () => {
      if (!this.channels.keyboard.active) return;

      if (!inBurst) {
        if (Math.random() > 0.4) {
          inBurst = true;
          burstRemaining = 4 + Math.floor(Math.random() * 12);
        }
      }

      if (inBurst) {
        playKeyClick();
        burstRemaining--;
        if (burstRemaining <= 0) {
          inBurst = false;
        }
      }

      const nextInterval = inBurst ? 70 + Math.random() * 80 : 350 + Math.random() * 700;
      setTimeout(loop, nextInterval);
    };

    setTimeout(loop, 200);
  }

  // Cozy Lofi Rhodes Chords
  private startLofiChords(destination: GainNode) {
    if (!this.ctx) return;

    // Nostalgic lofi jazz chord progressions:
    // Cmaj7 -> Am9 -> Dm7 -> G13
    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [196.00, 246.94, 329.63, 392.00, 440.00], // G13
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.channels.lofiChords.active || !this.ctx) return;

      const chord = chordProgressions[chordIndex % chordProgressions.length];
      chordIndex++;

      const now = this.ctx.currentTime;
      const duration = 4.2;

      chord.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const chordGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Warm sine/triangle mixture
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.04); // Slight strum arpeggio

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now);

        // Soft Rhodes bell attack and gentle decay
        chordGain.gain.setValueAtTime(0, now + i * 0.04);
        chordGain.gain.linearRampToValueAtTime(0.04, now + i * 0.04 + 0.15);
        chordGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(chordGain);
        chordGain.connect(destination);

        osc.start(now + i * 0.04);
        osc.stop(now + duration + 0.2);
      });
    };

    playChord();
    this.lofiInterval = window.setInterval(playChord, 4500);
  }

  // Play a gentle audio cue for Pomodoro bell
  public playChime() {
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const chimeFreqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    chimeFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.12, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 2.0);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 2.1);
    });
  }
}

export const soundEngine = new CabinSoundEngine();
