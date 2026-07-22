import { Link } from "react-router-dom";
import { dsaCatalog } from "../domains/dsa/content/catalog";

export function Learn() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Learn</h1>
      <p className="text-[var(--cm-ink-soft)] mb-10">
        Pick a topic. Every module follows the same flow: intuition → visualization → code → complexity.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {dsaCatalog.map((c) => {
          const liveCount = c.algorithms.filter((a) => a.live).length;
          return (
            <Link
              key={c.slug}
              to={`/learn/${c.slug}`}
              className="rounded-2xl border border-white/10 bg-[var(--cm-panel)] p-5 hover:border-[var(--cm-mint)]/50 transition-colors"
            >
              <p className="text-xs font-mono text-[var(--cm-ink-soft)] mb-1">
                {c.algorithms.length} algorithm{c.algorithms.length === 1 ? "" : "s"}
              </p>
              <h3 className="text-lg font-medium mb-2">{c.title}</h3>
              <span
                className={`text-xs font-mono px-2 py-1 rounded-md ${
                  liveCount > 0
                    ? "bg-[var(--cm-mint)]/15 text-[var(--cm-mint)]"
                    : "bg-white/5 text-[var(--cm-ink-soft)]"
                }`}
              >
                {liveCount > 0 ? `${liveCount} available now` : "coming soon"}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
