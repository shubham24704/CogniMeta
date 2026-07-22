import { Link } from "react-router-dom";
import { AmbientSort } from "../components/AmbientSort";

const features = [
  {
    title: "Every step explains why",
    body: "Not just what moved, but why it moved — the reasoning behind each comparison, swap, and rotation.",
  },
  {
    title: "You control the pace",
    body: "Play, pause, step forward and back, or scrub the whole execution like a video timeline.",
  },
  {
    title: "One reusable engine",
    body: "Every visualization runs on the same domain-agnostic playback core — built to scale far past DSA.",
  },
];

const roadmap = [
  { label: "Arrays & Sorting", status: "live" },
  { label: "Linked Lists", status: "soon" },
  { label: "Trees & Heaps", status: "soon" },
  { label: "Graphs", status: "soon" },
  { label: "Dynamic Programming", status: "soon" },
];

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[var(--cm-mint)] mb-4">
            Interactive intuition, not memorization
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold leading-[1.05] mb-6">
            Watch an algorithm<br />think.
          </h1>
          <p className="text-[var(--cm-ink-soft)] text-lg leading-relaxed mb-8 max-w-md">
            CogniMeta turns Data Structures & Algorithms into something you can see,
            control, and understand step by step — starting with DSA, built to grow
            into anything worth building intuition for.
          </p>
          <div className="flex gap-3">
            <Link to="/learn/sorting/bubble-sort" className="cm-btn cm-btn-primary px-5 py-2.5">
              Try a visualizer →
            </Link>
            <Link to="/learn" className="cm-btn px-5 py-2.5">
              Browse modules
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[var(--cm-panel)] p-8 flex flex-col items-center gap-4">
          <AmbientSort />
          <p className="font-mono text-xs text-[var(--cm-ink-soft)]">bubble_sort() · running on loop</p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <h2 className="text-2xl font-semibold mb-10">Built around three ideas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title}>
              <h3 className="text-lg font-medium mb-2">{f.title}</h3>
              <p className="text-[var(--cm-ink-soft)] text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <h2 className="text-2xl font-semibold mb-2">Learning roadmap</h2>
        <p className="text-[var(--cm-ink-soft)] text-sm mb-8">Suggested order for beginners — more modules ship continuously.</p>
        <div className="flex flex-col divide-y divide-white/5 rounded-2xl border border-white/10 bg-[var(--cm-panel)] overflow-hidden">
          {roadmap.map((r, i) => (
            <div key={r.label} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[var(--cm-ink-soft)] w-6">{String(i + 1).padStart(2, "0")}</span>
                <span>{r.label}</span>
              </div>
              <span
                className={`text-xs font-mono px-2 py-1 rounded-md ${
                  r.status === "live"
                    ? "bg-[var(--cm-mint)]/15 text-[var(--cm-mint)]"
                    : "bg-white/5 text-[var(--cm-ink-soft)]"
                }`}
              >
                {r.status === "live" ? "live" : "coming soon"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
