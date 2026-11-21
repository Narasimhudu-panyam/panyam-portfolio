'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, Download, Mail } from 'lucide-react';

function Cloud({ className, delay = 0 }: { className: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div aria-hidden="true" className={`cloud ${className}`} animate={reduceMotion ? {} : { x: [0, 28, 0] }} transition={{ duration: 28, delay, repeat: Infinity, ease: 'easeInOut' }} />;
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="home" className="hero relative isolate min-h-[min(900px,100svh)] overflow-hidden pt-28">
      <div className="hero-sun" aria-hidden="true" />
      <Cloud className="cloud-one" />
      <Cloud className="cloud-two" delay={-10} />
      <Cloud className="cloud-three" delay={-18} />
      <div className="hero-island" aria-hidden="true"><span /><i /><b /></div>
      <div className="section relative z-10 flex min-h-[min(780px,calc(100svh-7rem))] items-center pb-40 lg:pb-44">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.25fr_.75fr]">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#168DAB]/20 bg-white/75 px-4 py-2 text-sm font-semibold text-[#23647a] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#E76F51]" /> An open horizon for thoughtful ideas
            </div>
            <h1 className="max-w-4xl text-[clamp(2.65rem,7.4vw,6.35rem)] font-extrabold leading-[.98] tracking-[-.055em] text-[#18324A]">
              Hey, I&apos;m <span className="text-[#168DAB]">Panyam Lakshmi Narasimhudu</span>
            </h1>
            <p className="mt-6 text-lg font-semibold tracking-wide text-[#28566c] sm:text-xl">Full Stack Developer <span className="text-[#E76F51]">•</span> AI Enthusiast <span className="text-[#E76F51]">•</span> Creative Problem Solver</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#35566a] sm:text-lg">MCA student and developer building modern web applications and AI-powered solutions. I enjoy turning ambitious ideas into useful products with clean architecture, thoughtful interfaces, and practical problem-solving.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="button-primary">Explore My Projects <ArrowDownRight size={17} /></a>
              <a href="/resume.pdf" download="Panyam_Lakshmi_Narasimhudu_Resume.pdf" className="button-secondary"><Download size={16} /> Download Resume</a>
              <a href="#contact" className="button-secondary"><Mail size={16} /> Contact Me</a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-[#42677a]"><span>06 featured projects</span><span>MCA · CGPA 9.1</span><span>Web · AI · Mobile</span></div>
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .94, y: 18 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .12 }} className="relative mx-auto w-full max-w-[390px]">
            <div className="portrait-frame"><div className="portrait-photo"><Image src="/headshot.jpg" alt="Panyam Lakshmi Narasimhudu" fill priority sizes="(max-width: 640px) 80vw, 360px" className="object-cover" /></div><span className="portrait-stamp">CURIOUS<br />BY NATURE</span><span className="portrait-spark">✳</span></div>
            <div className="portrait-caption"><span>Currently exploring</span><strong>Full Stack &amp; Applied AI</strong></div>
          </motion.div>
        </div>
      </div>
      <div className="ocean" aria-hidden="true"><div className="wave wave-back" /><div className="wave wave-front" /><div className="ocean-line" /></div>
      <a href="#about" className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/75 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[#31586c] shadow-sm">Begin the journey</a>
    </section>
  );
}
