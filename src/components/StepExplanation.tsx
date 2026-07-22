import { motion, AnimatePresence } from "framer-motion";

export function StepExplanation({ text, stepKey }: { text: string; stepKey: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--cm-panel)] p-5 min-h-[92px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={stepKey}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="text-[15px] leading-relaxed text-[var(--cm-ink)]"
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
