import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/learn", label: "Learn" },
  { to: "/playground", label: "Playground" },
  { to: "/compare", label: "Compare" },
  { to: "/interview", label: "Interview Mode" },
  { to: "/about", label: "About" },
];

export function NavBar() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--cm-bg)]/80 border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Cogni<span style={{ color: "var(--cm-mint)" }}>Meta</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                location.pathname.startsWith(l.to)
                  ? "text-[var(--cm-ink)] bg-white/5"
                  : "text-[var(--cm-ink-soft)] hover:text-[var(--cm-ink)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
