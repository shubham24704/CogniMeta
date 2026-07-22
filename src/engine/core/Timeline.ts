import type { PlaybackSpeed, VisualizerStep } from "./types";

type Listener = () => void;

/**
 * Timeline is the engine's playback brain. It holds a precomputed list of
 * steps (produced by a domain algorithm) and exposes play/pause/scrub
 * controls. It never inspects `state` — that's the domain's business.
 */
export class Timeline<TState> {
  private steps: VisualizerStep<TState>[];
  private currentIndex = 0;
  private isPlaying = false;
  private speed: PlaybackSpeed = 1;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private listeners = new Set<Listener>();
  // useSyncExternalStore requires getSnapshot to return the SAME reference
  // between calls unless state actually changed — otherwise React sees a
  // "new" value on every render and loops forever. We cache it here and
  // only invalidate inside emit().
  private cachedSnapshot: ReturnType<Timeline<TState>["computeSnapshot"]> | null = null;

  constructor(steps: VisualizerStep<TState>[]) {
    this.steps = steps;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    this.cachedSnapshot = null; // invalidate — next getSnapshot() rebuilds once
    this.listeners.forEach((l) => l());
  }

  private computeSnapshot() {
    return {
      steps: this.steps,
      currentIndex: this.currentIndex,
      isPlaying: this.isPlaying,
      speed: this.speed,
      total: this.steps.length,
      current: this.steps[this.currentIndex] ?? null,
      isFirst: this.currentIndex === 0,
      isLast: this.currentIndex === this.steps.length - 1,
    };
  }

  getSnapshot() {
    if (!this.cachedSnapshot) {
      this.cachedSnapshot = this.computeSnapshot();
    }
    return this.cachedSnapshot;
  }

  replaceSteps(steps: VisualizerStep<TState>[]) {
    this.pause();
    this.steps = steps;
    this.currentIndex = 0;
    this.emit();
  }

  goTo(index: number) {
    const clamped = Math.max(0, Math.min(index, this.steps.length - 1));
    if (clamped === this.steps.length - 1) this.pause();
    this.currentIndex = clamped;
    this.emit();
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  previous() {
    this.pause();
    this.goTo(this.currentIndex - 1);
  }

  restart() {
    this.pause();
    this.goTo(0);
  }

  setSpeed(speed: PlaybackSpeed) {
    this.speed = speed;
    if (this.isPlaying) {
      this.play(); // restart interval at new speed
    } else {
      this.emit();
    }
  }

  play() {
    if (this.currentIndex >= this.steps.length - 1) {
      this.currentIndex = 0;
    }
    this.isPlaying = true;
    if (this.intervalId) clearInterval(this.intervalId);
    const baseMs = 900;
    this.intervalId = setInterval(() => {
      if (this.currentIndex >= this.steps.length - 1) {
        this.pause();
        return;
      }
      this.currentIndex += 1;
      this.emit();
    }, baseMs / this.speed);
    this.emit();
  }

  pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.emit();
  }

  destroy() {
    this.pause();
    this.listeners.clear();
  }
}
