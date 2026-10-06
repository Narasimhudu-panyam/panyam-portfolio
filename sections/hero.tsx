'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDownRight, Download } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden pt-32">
      <div className="grid-bg absolute inset-0 -z-10" />
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -left-28 top-24 -z-10 h-96 w-96 rounded-full bg-violet-500/40 blur-[110px]"
      />
      <motion.div
        animate={{ x: [0, -45, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute right-0 top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-cyan-400/25 blur-[120px]"
      />

      <div className="section flex min-h-[calc(100vh-8rem)] items-center">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.35fr_.65fr]">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,.15)]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" /> Available for opportunities
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.06em] text-white sm:text-7xl lg:text-[5.7rem]">
              Building intelligent applications with <span className="gradient-text">modern web technologies &amp; AI.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              I&apos;m <strong className="font-medium text-white">Panyam Lakshmi Narasimhudu</strong> &mdash; a <span className="text-cyan-200">Full Stack Developer</span> and MCA student building modern web applications and AI-powered solutions with a focus on clean UI, reliable systems, and practical problem-solving.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                download="Panyam_Lakshmi_Narasimhudu_Resume.pdf"
                className="group rounded-xl bg-gradient-to-r from-white to-cyan-100 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/15 transition duration-300 hover:-translate-y-1 hover:shadow-cyan-400/30"
              >
                <Download className="mr-2 inline-block transition group-hover:-translate-y-0.5" size={16} />
                Download resume
              </a>
              <a
                href="#projects"
                className="rounded-xl border border-white/20 bg-white/[.08] px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-950/30 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/10"
              >
                Explore projects <ArrowDownRight className="ml-1 inline-block" size={16} />
              </a>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-3 gap-3">
              <Stat n="05" label="Featured projects" />
              <Stat n="9.1" label="MCA CGPA" />
              <Stat n="AI" label="Driven products" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{ opacity: { duration: 0.7 }, scale: { duration: 0.7 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
            className="relative mx-auto -mt-2 sm:-mt-4 lg:-mt-24"
          >
            <div className="absolute -inset-5 rounded-full bg-gradient-to-r from-violet-500 via-cyan-300 to-blue-500 opacity-75 blur-xl" />
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-white/50 bg-slate-900 p-1 shadow-[0_0_65px_rgba(34,211,238,.3)] transition duration-500 hover:scale-105 sm:h-60 sm:w-60">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image src="/headshot.jpg" alt="Panyam Lakshmi Narasimhudu" fill priority sizes="(max-width: 640px) 192px, 240px" className="object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="glass rounded-xl px-3 py-3">
      <p className="text-2xl font-semibold text-white">{n}</p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  );
}
