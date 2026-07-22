/**
 * DSA-domain event vocabulary for array-based algorithms.
 *
 * This lives in the DSA domain, NOT the engine core, on purpose: a future
 * "puzzles" or "math" domain will have its own vocabulary (Reveal, Branch,
 * Eliminate...) and should never need to touch this file or the engine.
 */
export type ArrayEventType =
  | "init"
  | "compare"
  | "swap"
  | "overwrite"
  | "markSorted"
  | "done";

export interface ArrayStepState {
  type: ArrayEventType;
  array: number[];
  /** Indices actively being compared this step, for highlighting. */
  comparing?: [number, number];
  /** Indices being swapped this step. */
  swapping?: [number, number];
  /** Indices already confirmed to be in final sorted position. */
  sortedIndices: number[];
  /** Number of comparisons / swaps so far, for the complexity panel. */
  stats: { comparisons: number; swaps: number };
}
