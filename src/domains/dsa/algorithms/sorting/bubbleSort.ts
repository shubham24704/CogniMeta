import type { VisualizerStep } from "../../../../engine/core/types";
import type { ArrayStepState } from "../../events/arrayEvents";

/**
 * Pure algorithm logic. Never imports React, never touches the DOM.
 * It just narrates its own execution as a list of steps with plain-English
 * explanations — this is what Section 11 of the PRD ("every step explains
 * why") looks like in code.
 */
export function bubbleSortSteps(input: number[]): VisualizerStep<ArrayStepState>[] {
  const arr = [...input];
  const n = arr.length;
  const steps: VisualizerStep<ArrayStepState>[] = [];
  const sortedIndices: number[] = [];
  let comparisons = 0;
  let swaps = 0;
  let stepId = 0;

  const push = (state: Omit<ArrayStepState, "array" | "sortedIndices" | "stats">, explanation: string) => {
    steps.push({
      id: `step-${stepId++}`,
      explanation,
      state: {
        ...state,
        array: [...arr],
        sortedIndices: [...sortedIndices],
        stats: { comparisons, swaps },
      },
    });
  };

  push({ type: "init" }, `Starting with ${n} unsorted elements. Bubble Sort repeatedly steps through the array, comparing adjacent pairs.`);

  for (let i = 0; i < n - 1; i++) {
    let swappedThisPass = false;
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++;
      push(
        { type: "compare", comparing: [j, j + 1] },
        `Comparing ${arr[j]} and ${arr[j + 1]} because they are adjacent — Bubble Sort only ever compares neighbors.`
      );

      if (arr[j] > arr[j + 1]) {
        swaps++;
        push(
          { type: "swap", comparing: [j, j + 1], swapping: [j, j + 1] },
          `${arr[j]} is greater than ${arr[j + 1]}, so they're out of order. Swapping them moves the larger value one step closer to the end.`
        );
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swappedThisPass = true;
      }
    }
    sortedIndices.unshift(n - 1 - i);
    push(
      { type: "markSorted" },
      `${arr[n - 1 - i]} has bubbled up to its final position. Everything from here to the end is now sorted.`
    );

    if (!swappedThisPass) {
      // Early exit: nothing moved, so the rest must already be sorted.
      for (let k = 0; k <= n - 1 - i; k++) {
        if (!sortedIndices.includes(k)) sortedIndices.push(k);
      }
      break;
    }
  }

  if (!sortedIndices.includes(0)) sortedIndices.push(0);

  push({ type: "done" }, `Done! The array is fully sorted after ${comparisons} comparisons and ${swaps} swaps.`);

  return steps;
}
