/**
 * Engine core types.
 *
 * IMPORTANT: Nothing in here knows about "arrays", "compare", "swap",
 * "nodes", or any domain-specific vocabulary. A domain (e.g. src/domains/dsa)
 * defines its own event/state shape as TState. The engine only knows how to
 * play, pause, scrub, and step through a list of these opaque snapshots.
 *
 * This is what lets a future domain (math, puzzles, paradoxes) plug into the
 * exact same Timeline/playback machinery without touching engine code.
 */

export interface VisualizerStep<TState> {
  /** Unique id, stable across re-renders (used as React key). */
  id: string;
  /** Domain-defined snapshot of "what the visualization should look like now". */
  state: TState;
  /** Human-readable explanation of *why* this step is happening. */
  explanation: string;
}

export type PlaybackSpeed = 0.5 | 1 | 1.5 | 2 | 4;

export interface TimelineSnapshot<TState> {
  steps: VisualizerStep<TState>[];
  currentIndex: number;
  isPlaying: boolean;
  speed: PlaybackSpeed;
}
