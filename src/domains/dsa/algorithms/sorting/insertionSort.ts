import type { VisualizerStep } from "../../../../engine/core/types";
import type { ArrayStepState } from "../../events/arrayEvents";

/**
 * Insertion Sort: builds a sorted prefix one element at a time by shifting
 * larger elements right until the "key" finds its spot.
 */
export function insertionSortSteps(input: number[]): VisualizerStep<ArrayStepState>[] {
  const arr = [...input];
  const n = arr.length;
  const steps: VisualizerStep<ArrayStepState>[] = [];
  let comparisons = 0;
  let swaps = 0; // counts shifts + final placements, shown as "swaps" for UI consistency
  let stepId = 0;

  const sortedPrefixEnd = (i: number) => Array.from({ length: i + 1 }, (_, k) => k);

  const push = (
    partial: Omit<ArrayStepState, "array" | "sortedIndices" | "stats">,
    explanation: string,
    sortedUpTo: number
  ) => {
    steps.push({
      id: `step-${stepId++}`,
      explanation,
      state: {
        ...partial,
        array: [...arr],
        sortedIndices: sortedUpTo >= 0 ? sortedPrefixEnd(sortedUpTo) : [],
        stats: { comparisons, swaps },
      },
    });
  };

  push({ type: "init" }, `Starting with ${n} unsorted elements. The first element is trivially a "sorted" list of one.`, 0);

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    push(
      { type: "compare", comparing: [j, i] },
      `Picking up ${key} as the key. Everything to its left (indices 0–${i - 1}) is already sorted — we just need to find where ${key} belongs in it.`,
      i - 1
    );

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      push(
        { type: "compare", comparing: [j, j + 1] },
        `${arr[j]} is greater than the key (${key}), so it needs to move right to make room.`,
        i - 1
      );
      arr[j + 1] = arr[j];
      swaps++;
      push(
        { type: "overwrite", swapping: [j, j + 1] },
        `Shifting ${arr[j + 1]} one position right.`,
        i - 1
      );
      j--;
    }
    if (j >= 0) {
      comparisons++;
    }

    arr[j + 1] = key;
    push(
      { type: "overwrite", swapping: [j + 1, j + 1] },
      `${key} has found its spot at index ${j + 1}. The sorted prefix now covers indices 0–${i}.`,
      i
    );
  }

  push({ type: "done" }, `Done! The array is fully sorted after ${comparisons} comparisons and ${swaps} shifts.`, n - 1);

  return steps;
}