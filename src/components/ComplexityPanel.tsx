interface Props {
  best: string;
  average: string;
  worst: string;
  space: string;
  intuition: string;
  comparisons: number;
  swaps: number;
  swapsLabel?: string;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm py-1.5 border-b border-white/5 last:border-0">
      <span className="text-[var(--cm-ink-soft)]">{label}</span>
      <span className="font-mono text-[var(--cm-mint)]">{value}</span>
    </div>
  );
}

export function ComplexityPanel({ best, average, worst, space, intuition, comparisons, swaps, swapsLabel = "Swaps so far" }: Props) {
    return (
    <div className="rounded-2xl border border-white/10 bg-[var(--cm-panel)] p-5">
      <h3 className="text-sm font-semibold tracking-wide text-[var(--cm-ink)] mb-2">Complexity</h3>
      <Row label="Best case" value={best} />
      <Row label="Average case" value={average} />
      <Row label="Worst case" value={worst} />
      <Row label="Space" value={space} />
      <p className="text-xs text-[var(--cm-ink-soft)] mt-3 leading-relaxed">{intuition}</p>
      <div className="mt-3 flex gap-4 text-xs text-[var(--cm-ink-soft)]">
        <span>Comparisons so far: <strong className="text-[var(--cm-ink)]">{comparisons}</strong></span>
        <span>{swapsLabel}: <strong className="text-[var(--cm-ink)]">{swaps}</strong></span>
      </div>
    </div>
  );
}
