import { useMemo, useState } from "react";
import { useVisualizer } from "../../../engine/hooks/useVisualizer";
import { MergeTreeRenderer } from "../../../engine/renderers/MergeTreeRenderer";
import { mergeSortTreeSteps } from "../algorithms/sorting/mergeSortTree";
import { mergeSortContent } from "../content/mergeSortContent";
import { ControlPanel } from "../../../components/ControlPanel";
import { StepExplanation } from "../../../components/StepExplanation";
import { ComplexityPanel } from "../../../components/ComplexityPanel";
import { CodeViewer } from "../../../components/CodeViewer";

function randomArray(size = 8) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 5);
}

/**
 * Merge Sort gets its own bespoke module (rather than reusing the generic
 * ArraySortModule shell that Bubble/Insertion/Selection Sort share) because
 * its natural visualization is a recursion TREE of sub-arrays, not a single
 * row of bars — a genuinely different shape, not just a different color.
 */
export function MergeSortModule() {
  const [input, setInput] = useState<number[]>(() => randomArray());
  const steps = useMemo(() => mergeSortTreeSteps(input), [input]);
  const { current, currentIndex, total, isPlaying, isFirst, isLast, speed, controls } = useVisualizer(steps);

  if (!current) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-[var(--cm-mint)] mb-2">Data Structures & Algorithms · Sorting</p>
        <h1 className="text-4xl font-semibold text-[var(--cm-ink)] mb-2">{mergeSortContent.title}</h1>
        <p className="text-[var(--cm-ink-soft)] max-w-2xl">{mergeSortContent.tagline}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="rounded-2xl border border-white/10 bg-[var(--cm-panel)] p-4 h-[380px] flex items-center justify-center overflow-auto">
            <MergeTreeRenderer state={current.state} />
          </div>
          <StepExplanation text={current.explanation} stepKey={current.id} />
          <ControlPanel
            isPlaying={isPlaying}
            isFirst={isFirst}
            isLast={isLast}
            speed={speed}
            currentIndex={currentIndex}
            total={total}
            onPlay={controls.play}
            onPause={controls.pause}
            onNext={controls.next}
            onPrevious={controls.previous}
            onRestart={controls.restart}
            onSpeedChange={controls.setSpeed}
            onScrub={controls.goTo}
          />
          <div className="flex gap-3">
            <button onClick={() => setInput(randomArray())} className="cm-btn">
              🎲 Random input
            </button>
            <button onClick={() => setInput([...input])} className="cm-btn">
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ComplexityPanel
            best={mergeSortContent.complexity.best}
            average={mergeSortContent.complexity.average}
            worst={mergeSortContent.complexity.worst}
            space={mergeSortContent.complexity.space}
            intuition={mergeSortContent.intuition}
            comparisons={current.state.comparisons}
            swaps={current.state.writes}
            swapsLabel="Writes so far"
          />
          <CodeViewer code={mergeSortContent.code} />
        </div>
      </div>
    </div>
  );
}