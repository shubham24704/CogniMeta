import { useState } from "react";

interface Props {
  code: Record<string, string>;
}

const LANGUAGE_LABELS: Record<string, string> = {
  cpp: "C++",
  java: "Java",
  python: "Python",
  JS: "JS",
};

export function CodeViewer({ code }: Props) {
  const langs = Object.keys(code);
  const [active, setActive] = useState(langs[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--cm-panel)] overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex gap-1">
          {langs.map((lang) => (
            <button
              key={lang}
              onClick={() => setActive(lang)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                active === lang
                  ? "bg-[var(--cm-mint)] text-[var(--cm-ink-on-mint)]"
                  : "text-[var(--cm-ink-soft)] hover:text-[var(--cm-ink)]"
              }`}
            >
              {LANGUAGE_LABELS[lang] ?? lang}
            </button>
          ))}
        </div>
        <button onClick={handleCopy} className="text-xs text-[var(--cm-ink-soft)] hover:text-[var(--cm-ink)] px-2 py-1">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-[var(--cm-ink)]">
        <code>{code[active]}</code>
      </pre>
    </div>
  );
}
