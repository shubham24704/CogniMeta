import { Link, Navigate, useParams } from "react-router-dom";
import { dsaCatalog } from "../domains/dsa/content/catalog";

export function CategoryPage() {
  const { category } = useParams();
  const entry = dsaCatalog.find((c) => c.slug === category);

  if (!entry) return <Navigate to="/learn" replace />;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link to="/learn" className="text-xs font-mono text-[var(--cm-ink-soft)] hover:text-[var(--cm-ink)] mb-4 inline-block">
        ← Learn
      </Link>
      <h1 className="text-3xl font-semibold mb-2">{entry.title}</h1>
      <p className="text-[var(--cm-ink-soft)] mb-10 max-w-2xl">{entry.description}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {entry.algorithms.map((a) =>
          a.live ? (
            <Link
              key={a.slug}
              to={`/learn/${entry.slug}/${a.slug}`}
              className="rounded-2xl border border-white/10 bg-[var(--cm-panel)] p-5 hover:border-[var(--cm-mint)]/50 transition-colors"
            >
              <h3 className="text-lg font-medium">{a.title}</h3>
            </Link>
          ) : (
            <div key={a.slug} className="rounded-2xl border border-white/5 bg-[var(--cm-panel)]/50 p-5 opacity-50">
              <h3 className="text-lg font-medium">{a.title}</h3>
              <p className="text-xs text-[var(--cm-ink-soft)] mt-2">Coming soon</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
