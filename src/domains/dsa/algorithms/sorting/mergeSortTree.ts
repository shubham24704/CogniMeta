import type { VisualizerStep } from "../../../../engine/core/types";
import type { MergeTreeNode, MergeTreeStepState } from "../../events/mergeTreeEvents";

interface NodeMeta {
  id: string;
  lo: number;
  hi: number;
  depth: number;
  parentId: string | null;
}

/**
 * Merge Sort, visualized as its actual recursion tree: the whole tree
 * skeleton (every range that will ever be split) is computed up front so
 * all of it is visible (as dim "pending" placeholders) from step one —
 * then each step fills in nodes as the algorithm actually visits them.
 */
export function mergeSortTreeSteps(input: number[]): VisualizerStep<MergeTreeStepState>[] {
  const n = input.length;
  const steps: VisualizerStep<MergeTreeStepState>[] = [];
  let stepId = 0;
  let comparisons = 0;
  let writes = 0;

  if (n === 0) {
    steps.push({
      id: "step-0",
      explanation: "The array is empty — there's nothing to sort.",
      state: { nodes: [], activeNodeId: null, comparisons: 0, writes: 0 },
    });
    return steps;
  }

  // ---- Build the full tree skeleton (shape only, no values yet) ----
  const skeleton: NodeMeta[] = [];
  function buildSkeleton(lo: number, hi: number, depth: number, parentId: string | null): void {
    const id = `${lo}-${hi}`;
    skeleton.push({ id, lo, hi, depth, parentId });
    if (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      buildSkeleton(lo, mid, depth + 1, id);
      buildSkeleton(mid + 1, hi, depth + 1, id);
    }
  }
  buildSkeleton(0, n - 1, 0, null);

  // ---- Live per-node state, mutated as the algorithm runs ----
  const nodeState = new Map<string, { status: MergeTreeNode["status"]; values: number[] }>();
  for (const meta of skeleton) {
    nodeState.set(meta.id, { status: "pending", values: [] });
  }

  const snapshotNodes = (): MergeTreeNode[] =>
    skeleton.map((meta) => ({ ...meta, ...nodeState.get(meta.id)! }));

  const push = (
    activeNodeId: string | null,
    explanation: string,
    mergeInfo?: MergeTreeStepState["mergeInfo"]
  ) => {
    steps.push({
      id: `step-${stepId++}`,
      explanation,
      state: { nodes: snapshotNodes(), activeNodeId, mergeInfo, comparisons, writes },
    });
  };

  push(
    null,
    `Starting with ${n} unsorted elements. Merge Sort's recursion tree splits this range in half repeatedly until each leaf is a single element, then merges pairs of sorted leaves back up.`
  );

  function sort(lo: number, hi: number): number[] {
    const id = `${lo}-${hi}`;

    if (lo === hi) {
      nodeState.set(id, { status: "sorted-leaf", values: [input[lo]] });
      push(id, `Index ${lo} is a single element — trivially sorted on its own.`);
      return [input[lo]];
    }

    nodeState.set(id, { status: "splitting", values: [] });
    const mid = Math.floor((lo + hi) / 2);
    push(id, `Splitting range [${lo}, ${hi}] into [${lo}, ${mid}] and [${mid + 1}, ${hi}].`);

    const leftValues = sort(lo, mid);
    const rightValues = sort(mid + 1, hi);

    nodeState.set(id, { status: "merging", values: [] });
    push(
      id,
      `Both halves of [${lo}, ${hi}] are now sorted. Merging them back together, one element at a time.`,
      { leftValues, rightValues, mergedSoFar: [], leftPointer: 0, rightPointer: 0, lastTaken: null }
    );

    const merged: number[] = [];
    let i = 0;
    let j = 0;
    while (i < leftValues.length && j < rightValues.length) {
      comparisons++;
      const takeLeft = leftValues[i] <= rightValues[j];
      const taken = takeLeft ? leftValues[i] : rightValues[j];
      merged.push(taken);
      writes++;
      nodeState.set(id, { status: "merging", values: [...merged] });
      push(
        id,
        `Comparing ${leftValues[i]} (left) and ${rightValues[j]} (right) — ${taken} is smaller, so it's copied up next.`,
        { leftValues, rightValues, mergedSoFar: [...merged], leftPointer: i, rightPointer: j, lastTaken: takeLeft ? "left" : "right" }
      );
      if (takeLeft) i++;
      else j++;
    }
    while (i < leftValues.length) {
      merged.push(leftValues[i]);
      writes++;
      nodeState.set(id, { status: "merging", values: [...merged] });
      push(
        id,
        `Right half is exhausted — copying remaining left value ${leftValues[i]} up.`,
        { leftValues, rightValues, mergedSoFar: [...merged], leftPointer: i, rightPointer: j, lastTaken: "left" }
      );
      i++;
    }
    while (j < rightValues.length) {
      merged.push(rightValues[j]);
      writes++;
      nodeState.set(id, { status: "merging", values: [...merged] });
      push(
        id,
        `Left half is exhausted — copying remaining right value ${rightValues[j]} up.`,
        { leftValues, rightValues, mergedSoFar: [...merged], leftPointer: i, rightPointer: j, lastTaken: "right" }
      );
      j++;
    }

    nodeState.set(id, { status: "merged", values: merged });
    push(id, `Range [${lo}, ${hi}] is fully merged and sorted: [${merged.join(", ")}].`);

    return merged;
  }

  sort(0, n - 1);
  push(null, `Done! The array is fully sorted after ${comparisons} comparisons and ${writes} writes.`);

  return steps;
}