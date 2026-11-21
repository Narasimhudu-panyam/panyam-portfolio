'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, SkipForward } from 'lucide-react';

type IntroSceneProps = {
  onNext: () => void;
};

export function IntroScene({ onNext }: IntroSceneProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      className="intro-scene"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio introduction"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.035, filter: 'blur(8px)' }}
      transition={{ duration: reduceMotion ? 0.15 : 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="intro-atmosphere" aria-hidden="true" />
      <div className="intro-grain" aria-hidden="true" />
      <a className="intro-skip" href="#home" onClick={event => { event.preventDefault(); onNext(); }}>
        <span>Skip intro</span><SkipForward size={15} />
      </a>
      <div className="intro-composition">
        <motion.p className="intro-role-label" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.28, duration: 0.5 }}>
          FULL STACK DEVELOPER
        </motion.p>
        <motion.h1 className="intro-title" aria-label="Panyam Lakshmi Narasimhudu" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}>
          <span>PANYAM LAKSHMI</span>
          <span>NARASIMHUDU</span>
        </motion.h1>
        <motion.div className="intro-portrait" initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: reduceMotion ? 0 : 0.32, duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}>
          <Image src="/headshot.jpg" alt="Panyam Lakshmi Narasimhudu" fill priority sizes="(max-width: 640px) 72vw, 420px" className="intro-photo" />
          <span className="portrait-edge" aria-hidden="true" />
        </motion.div>
        <motion.div className="intro-bottomline" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.75, duration: 0.55 }}>
          <span className="intro-index">PERSONAL PORTFOLIO · 2026</span>
          <button className="intro-next" type="button" onClick={onNext} autoFocus>
            <span>NEXT</span><ArrowRight size={20} strokeWidth={1.7} />
          </button>
          <span className="intro-hint">A voyage through work, craft, and curiosity</span>
        </motion.div>
      </div>
      <span className="intro-corner intro-corner-top" aria-hidden="true" />
      <span className="intro-corner intro-corner-bottom" aria-hidden="true" />
    </motion.section>
  );
}
