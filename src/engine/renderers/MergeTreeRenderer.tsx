import { motion } from "framer-motion";
import type { MergeTreeStepState } from "../../domains/dsa/events/mergeTreeEvents";

interface Props {
  state: MergeTreeStepState;
}

const ELEM = 26;
const GAP = 3;
const ROW_HEIGHT = 62;
const PADDING = 20;
const PADDING_TOP = 16;

function statusColor(status: string) {
  switch (status) {
    case "sorted-leaf":
    case "merged":
      return "var(--cm-mint)";
    case "merging":
    case "splitting":
      return "var(--cm-amber)";
    default:
      return "var(--cm-ice)";
  }
}

export function MergeTreeRenderer({ state }: Props) {
  const { nodes, activeNodeId, mergeInfo } = state;

  if (nodes.length === 0) {
    return (
      <p className="text-sm text-[var(--cm-ink-soft)] font-mono" role="img" aria-label="Empty array">
        (empty array)
      </p>
    );
  }

  const root = nodes.find((nd) => nd.parentId === null)!;
  const n = root.hi + 1;
  const maxDepth = Math.max(...nodes.map((nd) => nd.depth));

  const width = PADDING * 2 + n * (ELEM + GAP);
  const height = PADDING_TOP + (maxDepth + 1) * ROW_HEIGHT + PADDING;

  const posFor = (nd: (typeof nodes)[number]) => {
    const count = nd.hi - nd.lo + 1;
    const centerIndex = (nd.lo + nd.hi) / 2;
    const xCenter = PADDING + (centerIndex + 0.5) * (ELEM + GAP);
    const boxWidth = count * (ELEM + GAP) - GAP;
    return { x: xCenter - boxWidth / 2, y: PADDING_TOP + nd.depth * ROW_HEIGHT, boxWidth, count };
  };

  const posMap = new Map(nodes.map((nd) => [nd.id, posFor(nd)]));

  const activeChildren = activeNodeId
    ? nodes.filter((nd) => nd.parentId === activeNodeId).sort((a, b) => a.lo - b.lo)
    : [];
  const [leftChild, rightChild] = activeChildren;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      role="img"
      aria-label="Merge sort recursion tree"
    >
      {nodes.map((nd) => {
        if (!nd.parentId) return null;
        const parentPos = posMap.get(nd.parentId);
        const pos = posMap.get(nd.id)!;
        if (!parentPos) return null;
        return (
          <line
            key={`edge-${nd.id}`}
            x1={parentPos.x + parentPos.boxWidth / 2}
            y1={parentPos.y + ELEM + 2}
            x2={pos.x + pos.boxWidth / 2}
            y2={pos.y - 2}
            stroke="var(--cm-ice)"
            strokeWidth={1.5}
            opacity={0.5}
          />
        );
      })}

      {nodes.map((nd) => {
        const pos = posMap.get(nd.id)!;
        const isActive = nd.id === activeNodeId;

        return (
          <g key={nd.id}>
            <rect
              x={pos.x - 2}
              y={pos.y - 2}
              width={pos.boxWidth + 4}
              height={ELEM + 4}
              rx={6}
              fill="none"
              stroke={isActive ? "var(--cm-mint)" : "rgba(255,255,255,0.15)"}
              strokeWidth={isActive ? 2 : 1}
              strokeDasharray={nd.status === "pending" ? "3 3" : undefined}
            />
            {Array.from({ length: pos.count }).map((_, idx) => {
              const value = nd.values[idx];
              const filled = value !== undefined;
              const boxX = pos.x + idx * (ELEM + GAP);

              let fill = filled ? statusColor(nd.status) : "transparent";
              if (mergeInfo) {
                if (nd.id === leftChild?.id && idx === mergeInfo.leftPointer && idx < leftChild.values.length) {
                  fill = "var(--cm-amber)";
                }
                if (nd.id === rightChild?.id && idx === mergeInfo.rightPointer && idx < rightChild.values.length) {
                  fill = "var(--cm-amber)";
                }
                if (nd.id === activeNodeId && idx === nd.values.length - 1 && mergeInfo.lastTaken) {
                  fill = "var(--cm-coral)";
                }
              }

              return (
                <g key={idx}>
                  <motion.rect
                    x={boxX}
                    y={pos.y}
                    width={ELEM}
                    height={ELEM}
                    rx={4}
                    stroke={filled ? "none" : "rgba(255,255,255,0.12)"}
                    strokeDasharray={filled ? undefined : "2 2"}
                    initial={false}
                    animate={{ fill }}
                    transition={{ duration: 0.2 }}
                  />
                  {filled && (
                    <text
                      x={boxX + ELEM / 2}
                      y={pos.y + ELEM / 2 + 4}
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="var(--font-mono)"
                      fill="var(--cm-ink-on-mint)"
                    >
                      {value}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}