/**
 * Merge Sort needs a fundamentally different visual shape than the flat
 * "array of bars" used by Bubble/Insertion/Selection Sort: it's a
 * recursion TREE of sub-arrays that split apart and then merge back
 * together. This is domain-specific to how we choose to render Merge Sort,
 * so it lives alongside the other DSA event types, not in the engine core.
 */
export type MergeTreeNodeStatus = "pending" | "splitting" | "sorted-leaf" | "merging" | "merged";

export interface MergeTreeNode {
  /** Stable id derived from the index range, e.g. "0-7". */
  id: string;
  lo: number;
  hi: number;
  depth: number;
  parentId: string | null;
  status: MergeTreeNodeStatus;
  /** Known values for this node's range so far (grows during merging). */
  values: number[];
}

export interface MergeTreeMergeInfo {
  leftValues: number[];
  rightValues: number[];
  mergedSoFar: number[];
  leftPointer: number;
  rightPointer: number;
  lastTaken: "left" | "right" | null;
}

export interface MergeTreeStepState {
  /** Every node in the tree, including ones not yet visited ("pending"). */
  nodes: MergeTreeNode[];
  activeNodeId: string | null;
  /** Present only during the step-by-step merge of activeNodeId's children. */
  mergeInfo?: MergeTreeMergeInfo;
  comparisons: number;
  writes: number;
}