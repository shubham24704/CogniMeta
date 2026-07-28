import type { VisualizerStep } from "../../../../engine/core/types";
import type { ArrayStepState } from "../../events/arrayEvents";

/**
 * Merge Sort: recursively splits the array in half, sorts each half, then
 * merges the two sorted halves back together.
 *
 * IMPORTANT: all comparisons for a merge happen against `left`/`right` —
 * snapshots taken BEFORE any writes back into `arr` for this merge — and
 * every write into `arr` happens afterward, in a separate pass. If writes
 * were interleaved with comparisons directly on `arr` (writing arr[k] as
 * soon as a winner is picked), an index still to be compared could already
 * have been overwritten by an earlier iteration of the same merge, making
 * the highlighted bar show a different value than the one named in the
 * explanation text.
 */
export function mergeSortSteps(input: number[]): VisualizerStep<ArrayStepState>[] {
  const arr = [...input];
  const n = arr.length;
  const steps: VisualizerStep<ArrayStepState>[] = [];
  let comparisons = 0;
  let swaps = 0; // counts writes back into the array during merges
  let stepId = 0;

  const push = (
    partial: Omit<ArrayStepState, "array" | "sortedIndices" | "stats">,
    explanation: string,
    sorted: number[] = []
  ) => {
    steps.push({
      id: `step-${stepId++}`,
      explanation,
      state: {
        ...partial,
        array: [...arr],
        sortedIndices: sorted,
        stats: { comparisons, swaps },
      },
    });
  };

  push(
    { type: "init" },
    `Starting with ${n} unsorted elements. Merge Sort splits the array in half recursively until each piece has one element, then merges sorted pieces back together.`
  );

  function sort(lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    push(
      { type: "split", activeRange: [lo, hi] },
      `Splitting range [${lo}, ${hi}] into [${lo}, ${mid}] and [${mid + 1}, ${hi}].`
    );
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  function merge(lo: number, mid: number, hi: number) {
    // Snapshot both halves BEFORE touching arr — see note above.
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);

    push(
      { type: "merge", activeRange: [lo, hi] },
      `Both halves of [${lo}, ${hi}] are individually sorted. Merging them back together in order.`
    );

    const merged: number[] = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      comparisons++;
      push(
        { type: "compare", activeRange: [lo, hi], comparing: [lo + i, mid + 1 + j] },
        `Comparing ${left[i]} (left half) and ${right[j]} (right half) — the smaller one goes next.`
      );
      if (left[i] <= right[j]) {
        merged.push(left[i]);
        i++;
      } else {
        merged.push(right[j]);
        j++;
      }
    }
    while (i < left.length) {
      merged.push(left[i]);
      i++;
    }
    while (j < right.length) {
      merged.push(right[j]);
      j++;
    }

    for (let k = 0; k < merged.length; k++) {
      arr[lo + k] = merged[k];
      swaps++;
      push(
        { type: "overwrite", activeRange: [lo, hi], swapping: [lo + k, lo + k] },
        `Writing ${merged[k]} into index ${lo + k}.`
      );
    }
  }

  sort(0, n - 1);

  push(
    { type: "done" },
    `Done! The array is fully sorted after ${comparisons} comparisons.`,
    Array.from({ length: n }, (_, i) => i)
  );

  return steps;
}