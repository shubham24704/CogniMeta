import { motion } from "framer-motion";
import type { ArrayStepState } from "../../domains/dsa/events/arrayEvents";

interface Props {
  state: ArrayStepState;
}

const WIDTH = 640;
const HEIGHT = 280;
const PADDING = 24;

export function ArrayRenderer({ state }: Props) {
  const { array, comparing, swapping, sortedIndices } = state;
  const n = array.length;
  const max = Math.max(...array, 1);
  const barGap = 10;
  const barWidth = (WIDTH - PADDING * 2 - barGap * (n - 1)) / n;

  const colorFor = (i: number) => {
    if (swapping?.includes(i)) return "var(--cm-coral)";
    if (comparing?.includes(i)) return "var(--cm-amber)";
    if (sortedIndices.includes(i)) return "var(--cm-mint)";
    return "var(--cm-ice)";
  };

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-full"
      role="img"
      aria-label="Array visualization"
    >
      {array.map((value, i) => {
        const barHeight = (value / max) * (HEIGHT - PADDING * 2 - 24);
        const x = PADDING + i * (barWidth + barGap);
        const y = HEIGHT - PADDING - barHeight;
        return (
          <g key={i}>
            <motion.rect
              x={x}
              width={barWidth}
              rx={6}
              fill={colorFor(i)}
              initial={false}
              animate={{ y, height: barHeight }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            />
            <text
              x={x + barWidth / 2}
              y={HEIGHT - PADDING + 16}
              textAnchor="middle"
              fontSize="12"
              fill="var(--cm-ink-soft)"
              fontFamily="var(--font-mono)"
            >
              {value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
