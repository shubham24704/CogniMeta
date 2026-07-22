import type { PlaybackSpeed } from "../engine/core/types";

interface Props {
  isPlaying: boolean;
  isFirst: boolean;
  isLast: boolean;
  speed: PlaybackSpeed;
  currentIndex: number;
  total: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onRestart: () => void;
  onSpeedChange: (s: PlaybackSpeed) => void;
  onScrub: (i: number) => void;
}

const SPEEDS: PlaybackSpeed[] = [0.5, 1, 1.5, 2, 4];

export function ControlPanel({
  isPlaying,
  isFirst,
  isLast,
  speed,
  currentIndex,
  total,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onRestart,
  onSpeedChange,
  onScrub,
}: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[var(--cm-panel)] p-4">
      <input
        type="range"
        min={0}
        max={total - 1}
        value={currentIndex}
        onChange={(e) => onScrub(Number(e.target.value))}
        className="w-full accent-[var(--cm-mint)]"
        aria-label="Scrub through steps"
      />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button onClick={onRestart} className="cm-btn" aria-label="Restart">
            ⟲
          </button>
          <button onClick={onPrevious} disabled={isFirst} className="cm-btn" aria-label="Previous step">
            ⏮
          </button>
          {isPlaying ? (
            <button onClick={onPause} className="cm-btn cm-btn-primary" aria-label="Pause">
              ⏸ Pause
            </button>
          ) : (
            <button onClick={onPlay} disabled={isLast} className="cm-btn cm-btn-primary" aria-label="Play">
              ▶ Play
            </button>
          )}
          <button onClick={onNext} disabled={isLast} className="cm-btn" aria-label="Next step">
            ⏭
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--cm-ink-soft)]">
          <span>Speed</span>
          <select
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value) as PlaybackSpeed)}
            className="rounded-md bg-transparent border border-white/15 px-2 py-1"
          >
            {SPEEDS.map((s) => (
              <option key={s} value={s} className="text-black">
                {s}×
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-xs text-[var(--cm-ink-soft)]">
        Step {currentIndex + 1} of {total}
      </div>
    </div>
  );
}
