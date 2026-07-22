import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { bubbleSortSteps } from "../domains/dsa/algorithms/sorting/bubbleSort";

function randomArray() {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 10);
}

/**
 * The hero's signature element: a tiny array that quietly sorts itself,
 * on loop, for as long as you look at it. It's the product's core value
 * proposition -- watching an algorithm think -- shown, not described.
 */
export function AmbientSort() {
  const [steps, setSteps] = useState(() => bubbleSortSteps(randomArray()));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => {
        if (i >= steps.length - 1) {
          setTimeout(() => {
            setSteps(bubbleSortSteps(randomArray()));
            setIndex(0);
          }, 900);
          return i;
        }
        return i + 1;
      });
    }, 260);
    return () => clearInterval(id);
  }, [steps]);

  const state = steps[index].state;
  const max = Math.max(...state.array);

  return (
    <div className="flex items-end gap-1.5 h-40" aria-hidden="true">
      {state.array.map((value, i) => {
        const isSwap = state.swapping?.includes(i);
        const isCompare = state.comparing?.includes(i);
        const isSorted = state.sortedIndices.includes(i);
        const color = isSwap
          ? "var(--cm-coral)"
          : isCompare
          ? "var(--cm-amber)"
          : isSorted
          ? "var(--cm-mint)"
          : "var(--cm-ice)";
        return (
          <motion.div
            key={i}
            className="w-3.5 rounded-t-md"
            style={{ background: color }}
            initial={false}
            animate={{ height: (value / max) * 148 + 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          />
        );
      })}
    </div>
  );
}
