// Web Audio API 内置环境音乐生成器
// 不依赖任何外部音乐文件

type Genre = 'Chill' | 'Lo-Fi' | 'Ambient' | 'Piano' | 'Acoustic';

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let activeNodes: { node: AudioNode; stop: () => void }[] = [];
let isPlaying = false;
let currentGenre: Genre = 'Chill';

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(audioCtx.destination);
  }
  return audioCtx;
}

function stopAll() {
  activeNodes.forEach(n => {
    try { n.stop(); } catch (_) {}
  });
  activeNodes = [];
}

// C大调五声音阶，听起来很悦耳
const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

function playNote(freq: number, startTime: number, duration: number, gainVal: number, type: OscillatorType = 'sine') {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.1);
  gain.gain.setValueAtTime(gainVal, startTime + duration - 0.3);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);
  
  osc.connect(gain);
  gain.connect(masterGain!);
  
  osc.start(startTime);
  osc.stop(startTime + duration);
  
  activeNodes.push({
    node: osc,
    stop: () => {
      try { osc.stop(); } catch (_) {}
      try { gain.disconnect(); } catch (_) {}
    }
  });
}

function scheduleNotes(genre: Genre, startOffset: number) {
  const ctx = getCtx();
  const now = ctx.currentTime + startOffset;

  switch (genre) {
    case 'Chill':
      // 舒缓的随机音符
      for (let i = 0; i < 8; i++) {
        const t = now + i * 0.8 + Math.random() * 0.3;
        const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        playNote(freq, t, 2 + Math.random(), 0.15, 'sine');
        if (Math.random() > 0.5) {
          playNote(freq * 0.5, t, 2 + Math.random(), 0.08, 'triangle');
        }
      }
      break;

    case 'Lo-Fi':
      // 低保真节奏型
      for (let i = 0; i < 12; i++) {
        const t = now + i * 0.5;
        const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        playNote(freq, t, 0.4, 0.12, 'triangle');
        if (i % 3 === 0) {
          playNote(freq * 0.5, t, 0.8, 0.06, 'sine');
        }
      }
      break;

    case 'Ambient':
      // 空灵长音
      for (let i = 0; i < 5; i++) {
        const t = now + i * 2.5;
        const freq = pentatonic[i % pentatonic.length];
        playNote(freq, t, 5, 0.12, 'sine');
        playNote(freq * 1.01, t, 5, 0.08, 'sine');
      }
      break;

    case 'Piano':
      // 钢琴风格 - 简单琶音
      for (let i = 0; i < 16; i++) {
        const t = now + i * 0.6;
        const freq = pentatonic[i % pentatonic.length];
        playNote(freq, t, 0.5, 0.18, 'triangle');
        if (i % 4 === 0) {
          playNote(freq * 0.5, t, 1.5, 0.1, 'sine');
        }
      }
      break;

    case 'Acoustic':
      // 原声风格 - 简单旋律
      for (let i = 0; i < 10; i++) {
        const t = now + i * 1.0;
        const idx = (i * 2) % pentatonic.length;
        playNote(pentatonic[idx], t, 0.8, 0.14, 'sine');
        playNote(pentatonic[(idx + 3) % pentatonic.length], t + 0.1, 0.6, 0.06, 'sine');
      }
      break;
  }
}

let intervalId: ReturnType<typeof setInterval> | null = null;

export function playMusic(genre: Genre = 'Chill') {
  const ctx = getCtx();
  currentGenre = genre;
  
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  stopAll();
  if (intervalId) clearInterval(intervalId);
  
  scheduleNotes(genre, 0);
  
  // 每4秒调度新音符
  const loopDuration = genre === 'Ambient' ? 6000 : genre === 'Lo-Fi' ? 3000 : 4000;
  intervalId = setInterval(() => {
    scheduleNotes(genre, 0);
  }, loopDuration);
  
  setTimeout(() => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        scheduleNotes(genre, 0);
      }, loopDuration);
    }
  }, loopDuration);
  
  isPlaying = true;
}

export function stopMusic() {
  stopAll();
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  isPlaying = false;
}

export function setVolume(vol: number) {
  if (masterGain) {
    masterGain.gain.value = vol;
  }
}

export function getIsPlaying() {
  return isPlaying;
}