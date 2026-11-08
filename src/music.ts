/**
 * Background music
 * ----------------
 * 1. If you drop an audio file (mp3 / m4a / ogg / wav) into  src/assets/music/  it is used.
 * 2. Otherwise a gentle, royalty-free instrumental (veena-like plucks over a tanpura drone,
 *    in the auspicious Mohanam scale) is synthesised live in the browser — ₹0, no files,
 *    no copyright concerns.
 */

const audioFiles = import.meta.glob("./assets/music/*.{mp3,m4a,ogg,wav,MP3}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export interface Player {
  play(): Promise<void>;
  pause(): void;
  readonly playing: boolean;
}

/* ---------- File-based player ---------- */
function fileePlayer(src: string): Player {
  const el = new Audio(src);
  el.loop = true;
  el.volume = 0.55;
  el.preload = "auto";
  return {
    async play() {
      await el.play();
    },
    pause() {
      el.pause();
    },
    get playing() {
      return !el.paused;
    },
  };
}

/* ---------- Synth player ---------- */
const SCALE = [0, 2, 4, 7, 9]; // Mohanam / Bhoopali
const ROOT = 196; // G3

const freq = (deg: number) => {
  const oct = Math.floor(deg / 5);
  const i = ((deg % 5) + 5) % 5;
  return ROOT * Math.pow(2, (SCALE[i] + 12 * oct) / 12);
};

// [scale degree, beats]
const PHRASES: [number, number][][] = [
  [[0, 1], [1, 0.5], [2, 0.5], [4, 1], [2, 1], [1, 0.5], [0, 0.5], [-1, 2]],
  [[4, 1], [5, 1], [7, 1.5], [5, 0.5], [4, 1], [2, 2]],
  [[2, 0.5], [4, 0.5], [5, 1], [4, 0.5], [2, 0.5], [1, 1], [0, 2]],
  [[7, 1], [5, 0.5], [4, 0.5], [5, 1], [4, 1], [2, 1], [4, 2]],
  [[0, 0.5], [2, 0.5], [4, 1], [5, 0.5], [7, 0.5], [9, 1], [7, 1], [5, 2]],
  [[5, 1], [4, 0.5], [2, 0.5], [1, 1], [2, 1], [0, 1], [-1, 1], [0, 2]],
];

function synthPlayer(): Player {
  let ctx: AudioContext | null = null;
  let master: GainNode;
  let reverb: ConvolverNode;
  let timer: number | null = null;
  let nextTime = 0;
  let queue: [number, number][] = [];
  let phraseIdx = 0;
  let drone: OscillatorNode[] = [];
  let isPlaying = false;
  const BEAT = 0.62;

  const build = () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);

    // soft hall reverb from generated noise
    const len = ctx.sampleRate * 3.2;
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    reverb = ctx.createConvolver();
    reverb.buffer = ir;
    const wet = ctx.createGain();
    wet.gain.value = 0.55;
    reverb.connect(wet).connect(master);
  };

  const startDrone = () => {
    if (!ctx) return;
    drone = [];
    const dg = ctx.createGain();
    dg.gain.value = 0.05;
    const lfo = ctx.createOscillator();
    const lfoG = ctx.createGain();
    lfo.frequency.value = 0.18;
    lfoG.gain.value = 0.02;
    lfo.connect(lfoG).connect(dg.gain);
    lfo.start();
    drone.push(lfo);
    dg.connect(master);
    dg.connect(reverb);
    [ROOT / 2, (ROOT / 2) * 1.5, ROOT, ROOT / 2].forEach((f, i) => {
      const o = ctx!.createOscillator();
      o.type = i === 2 ? "sine" : "triangle";
      o.frequency.value = f * (i === 3 ? 1.002 : 1);
      const g = ctx!.createGain();
      g.gain.value = i === 2 ? 0.25 : 0.6;
      o.connect(g).connect(dg);
      o.start();
      drone.push(o);
    });
  };

  const pluck = (f: number, t: number, dur: number) => {
    if (!ctx) return;
    const out = ctx.createGain();
    const filt = ctx.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.setValueAtTime(3600, t);
    filt.frequency.exponentialRampToValueAtTime(900, t + 1.4);
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(0.28, t + 0.012);
    out.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(1.6, dur * 2.4));
    [
      ["triangle", 1, 1],
      ["sine", 2, 0.35],
      ["sine", 3, 0.12],
    ].forEach(([type, mult, gain]) => {
      const o = ctx!.createOscillator();
      o.type = type as OscillatorType;
      o.frequency.value = f * (mult as number);
      const g = ctx!.createGain();
      g.gain.value = gain as number;
      o.connect(g).connect(filt);
      o.start(t);
      o.stop(t + 3);
    });
    filt.connect(out);
    out.connect(master);
    out.connect(reverb);
  };

  const schedule = () => {
    if (!ctx) return;
    while (nextTime < ctx.currentTime + 1.2) {
      if (!queue.length) {
        queue = PHRASES[phraseIdx % PHRASES.length].slice();
        phraseIdx = (phraseIdx + 1 + (Math.random() > 0.6 ? 1 : 0)) % PHRASES.length;
        queue.push([-99, 1.6]); // breath between phrases
      }
      const [deg, beats] = queue.shift()!;
      const dur = beats * BEAT;
      if (deg !== -99) {
        pluck(freq(deg), nextTime, dur);
        if (deg % 5 === 0 && beats >= 1.5) pluck(freq(deg + 5), nextTime + 0.02, dur); // octave shimmer on long notes
      }
      nextTime += dur;
    }
  };

  return {
    async play() {
      if (!ctx) {
        build();
        startDrone();
      }
      await ctx!.resume();
      master.gain.cancelScheduledValues(ctx!.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx!.currentTime);
      master.gain.linearRampToValueAtTime(0.55, ctx!.currentTime + 2.5);
      nextTime = ctx!.currentTime + 0.2;
      if (timer === null) timer = window.setInterval(schedule, 250);
      isPlaying = true;
    },
    pause() {
      if (!ctx) return;
      isPlaying = false;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
      queue = [];
      const c = ctx;
      window.setTimeout(() => {
        if (!isPlaying && c.state === "running") c.suspend();
      }, 900);
    },
    get playing() {
      return isPlaying;
    },
  };
}

export function createPlayer(): Player {
  const first = Object.keys(audioFiles).sort()[0];
  return first ? fileePlayer(audioFiles[first]) : synthPlayer();
}
