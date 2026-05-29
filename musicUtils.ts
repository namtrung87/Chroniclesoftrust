
/**
 * Procedural Ambient Music Engine
 * Generates evolving historical soundscapes using WebAudio.
 */

class AmbienceManager {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];
  private isPlaying: boolean = false;

  constructor() {}

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  public async start(eraLevel: number) {
    this.initContext();
    if (!this.ctx) return;
    
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.stop(); // Clear previous Era sound
    this.isPlaying = true;

    // Era-specific sonic characteristics
    const configs = [
      { base: 60, harmonics: [1, 1.5, 2], type: 'sine', detune: 5 },     // Era 0: Primal/Cave (Deep drones)
      { base: 110, harmonics: [1, 1.25, 1.5], type: 'triangle', detune: 2 }, // Era 1: Civics (Organ-like harmonics)
      { base: 80, harmonics: [1, 1.33, 2], type: 'sine', detune: 8 },    // Era 2: Trade (Oceanic flow)
      { base: 130, harmonics: [1, 1.5, 1.75], type: 'square', detune: 1 }, // Era 3: Industry (Mechanical)
      { base: 100, harmonics: [1, 2, 4], type: 'sine', detune: 15 },    // Era 4: Global (Complex layers)
      { base: 150, harmonics: [1, 2.5, 5], type: 'sawtooth', detune: 0.5 }, // Era 5: Future (Digital/Crisp)
      { base: 50, harmonics: [1, 3, 9], type: 'sine', detune: 10 }      // Era 6: Citadel/Nexus (Ethereal)
    ];

    const config = configs[eraLevel] || configs[0];

    config.harmonics.forEach((h, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = config.type as OscillatorType;
      osc.frequency.setValueAtTime(config.base * h, this.ctx.currentTime);
      
      // Add "shimmer" / detune
      osc.detune.setValueAtTime(Math.random() * config.detune, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.02 / (i + 1), this.ctx.currentTime + 2);
      
      // LFO for "Movement"
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.2, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.005, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      
      this.oscillators.push(osc);
      this.gainNodes.push(gain);
    });
  }

  public stop() {
    this.oscillators.forEach(osc => {
      try { osc.stop(); } catch(e) {}
    });
    this.gainNodes.forEach(g => {
      if (this.ctx) g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
    });
    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
  }
}

export const musicEngine = new AmbienceManager();
