import type { VisualizerStep } from "../../../../engine/core/types";
import type { ArrayStepState } from "../../events/arrayEvents";

/**
 * Selection Sort: repeatedly scans the unsorted remainder for its minimum
 * and swaps it into place at the front of that remainder.
 */
export function selectionSortSteps(input: number[]): VisualizerStep<ArrayStepState>[] {
  const arr = [...input];
  const n = arr.length;
  const steps: VisualizerStep<ArrayStepState>[] = [];
  const sortedIndices: number[] = [];
  let comparisons = 0;
  let swaps = 0;
  let stepId = 0;

  const push = (
    partial: Omit<ArrayStepState, "array" | "sortedIndices" | "stats">,
    explanation: string
  ) => {
    steps.push({
      id: `step-${stepId++}`,
      explanation,
      state: {
        ...partial,
        array: [...arr],
        sortedIndices: [...sortedIndices],
        stats: { comparisons, swaps },
      },
    });
  };

  push({ type: "init" }, `Starting with ${n} unsorted elements. Selection Sort finds the smallest remaining value and places it at the front, one position at a time.`);

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    push(
      { type: "compare", comparing: [i, minIndex] },
      `Scanning indices ${i}–${n - 1} for the smallest value. Assuming ${arr[i]} (index ${i}) is the minimum so far.`
    );

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      push(
        { type: "compare", comparing: [minIndex, j] },
        `Comparing current minimum ${arr[minIndex]} with ${arr[j]}.`
      );
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        push(
          { type: "compare", comparing: [minIndex, minIndex] },
          `${arr[minIndex]} is smaller — it's now the minimum so far.`
        );
      }
    }

    if (minIndex !== i) {
      swaps++;
      push(
        { type: "swap", swapping: [i, minIndex] },
        `${arr[minIndex]} is the smallest remaining value, but it's sitting at index ${minIndex}. Swapping it into position ${i}.`
      );
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    } else {
      push(
        { type: "swap", swapping: [i, i] },
        `${arr[i]} was already the smallest remaining value — no swap needed.`
      );
    }

    sortedIndices.push(i);
    push({ type: "markSorted" }, `Index ${i} now holds its final, correctly sorted value.`);
  }

  sortedIndices.push(n - 1);
  push({ type: "done" }, `Done! The array is fully sorted after ${comparisons} comparisons and ${swaps} swaps.`);

  return steps;
}