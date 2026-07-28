export interface AlgorithmEntry {
  slug: string;
  title: string;
  live: boolean;
}

export interface CategoryEntry {
  slug: string;
  title: string;
  description: string;
  algorithms: AlgorithmEntry[];
}

export const dsaCatalog: CategoryEntry[] = [
  {
    slug: "sorting",
    title: "Sorting",
    description:
      "Arrange elements into order. Every sorting algorithm makes a different trade-off between speed, memory, and stability — watching them side by side is the fastest way to feel that difference.",
    algorithms: [
      { slug: "bubble-sort", title: "Bubble Sort", live: true },
      { slug: "insertion-sort", title: "Insertion Sort", live: true },
      { slug: "selection-sort", title: "Selection Sort", live: true },
      { slug: "merge-sort", title: "Merge Sort", live: false },
      { slug: "quick-sort", title: "Quick Sort", live: false },
      { slug: "heap-sort", title: "Heap Sort", live: false },
    ],
  },
  {
    slug: "linked-list",
    title: "Linked List",
    description: "Insertion, deletion, reversal, and cycle detection across singly and doubly linked structures.",
    algorithms: [{ slug: "reverse", title: "Reverse a Linked List", live: false }],
  },
  {
    slug: "trees",
    title: "Trees",
    description: "Binary search trees, self-balancing trees, heaps, and prefix trees.",
    algorithms: [{ slug: "bst", title: "Binary Search Tree", live: false }],
  },
  {
    slug: "graphs",
    title: "Graphs",
    description: "Traversal and shortest-path algorithms across nodes and edges.",
    algorithms: [{ slug: "bfs-dfs", title: "BFS / DFS", live: false }],
  },
];
