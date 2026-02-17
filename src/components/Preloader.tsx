"use client";
import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      // A mágica da saída: quando o componente for desmontado, ele faz essa animação
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950"
    >
      <div className="flex items-center text-purple-500 font-mono text-xl md:text-2xl font-bold tracking-widest">
        <span>Deepslate_Labs</span>
        {/* O cursor piscando estilo terminal */}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block w-3 h-6 bg-purple-500 ml-2"
        />
      </div>
    </motion.div>
  );
}