import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Timeline } from "../core/Timeline";
import type { PlaybackSpeed, VisualizerStep } from "../core/types";

/**
 * Wires a domain's precomputed steps into the engine's Timeline and exposes
 * a stable, render-friendly snapshot + controls. This is the ONE hook every
 * domain module (DSA today, math/puzzles later) is expected to use.
 */
export function useVisualizer<TState>(steps: VisualizerStep<TState>[]) {
  const timelineRef = useRef<Timeline<TState> | null>(null);
  if (!timelineRef.current) {
    timelineRef.current = new Timeline(steps);
  }
  const timeline = timelineRef.current;

  // Keep the timeline's step list in sync if the caller regenerates steps
  // (e.g. user provides a new custom input array).
  const stepsRef = useRef(steps);
  useEffect(() => {
    if (stepsRef.current !== steps) {
      stepsRef.current = steps;
      timeline.replaceSteps(steps);
    }
  }, [steps, timeline]);

  useEffect(() => () => timeline.destroy(), [timeline]);

  const snapshot = useSyncExternalStore(
    (cb) => timeline.subscribe(cb),
    () => timeline.getSnapshot()
  );

  const controls = useMemo(
    () => ({
      play: () => timeline.play(),
      pause: () => timeline.pause(),
      next: () => timeline.next(),
      previous: () => timeline.previous(),
      restart: () => timeline.restart(),
      goTo: (i: number) => timeline.goTo(i),
      setSpeed: (s: PlaybackSpeed) => timeline.setSpeed(s),
    }),
    [timeline]
  );

  return { ...snapshot, controls };
}
