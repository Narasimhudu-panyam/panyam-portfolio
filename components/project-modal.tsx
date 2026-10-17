'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, Layers, Cpu, ExternalLink, Github, GitBranch, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/constants/data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const isEmerald = project.accent === 'emerald';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative z-10 my-8 w-full max-w-3xl overflow-hidden rounded-3xl border bg-slate-900/95 p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] flex flex-col ${
            isEmerald
              ? 'border-emerald-300/30 shadow-emerald-950/40'
              : 'border-white/20 shadow-cyan-950/40'
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
            <div>
              <span
                className={`inline-block rounded-full border px-3 py-1 text-xs font-medium mb-2 ${
                  isEmerald
                    ? 'border-emerald-300/40 bg-emerald-400/10 text-emerald-200'
                    : 'border-cyan-300/30 bg-cyan-300/10 text-cyan-200'
                }`}
              >
                {project.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">{project.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-white/10 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="mt-6 space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {/* Image banner */}
            <div className="relative aspect-[16/8.5] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>

            {/* Detailed Description */}
            <div>
              <h3
                className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
                  isEmerald ? 'text-emerald-300' : 'text-cyan-300'
                }`}
              >
                Overview & Description
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Simple Architecture Diagram if present */}
            {project.architectureDiagram && (
              <div className={`rounded-2xl border p-4 sm:p-5 ${
                isEmerald
                  ? 'border-emerald-300/25 bg-slate-950/80'
                  : 'border-white/15 bg-slate-950/80'
              }`}>
                <h3 className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-3 ${
                  isEmerald ? 'text-emerald-300' : 'text-cyan-300'
                }`}>
                  <GitBranch size={16} /> System Architecture Flow
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-2 py-3 px-3 sm:px-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 font-medium">
                    Next.js Frontend
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="px-3 py-1.5 rounded-lg bg-teal-500/15 border border-teal-400/30 text-teal-200 font-medium">
                    FastAPI Backend
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 font-medium">
                    PostgreSQL / PostGIS
                  </span>
                </div>
                <p className="mt-2 text-center text-xs text-slate-400">
                  Real-time events synchronized via WebSockets for live notifications & dispatch updates
                </p>
              </div>
            )}

            {/* Architecture Highlights if present */}
            {project.architecture && (
              <div
                className={`rounded-2xl border p-5 ${
                  isEmerald
                    ? 'border-emerald-300/20 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-teal-950/30'
                    : 'border-cyan-300/20 bg-gradient-to-br from-violet-950/30 via-slate-950 to-cyan-950/30'
                }`}
              >
                <h3
                  className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${
                    isEmerald ? 'text-emerald-200' : 'text-cyan-200'
                  }`}
                >
                  <Cpu size={17} /> Architecture & System Design
                </h3>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {project.architecture.map((archItem) => (
                    <div key={archItem} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          isEmerald ? 'bg-emerald-400' : 'bg-cyan-300'
                        }`}
                      />
                      <span>{archItem}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            <div>
              <h3
                className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${
                  isEmerald ? 'text-emerald-300' : 'text-cyan-300'
                }`}
              >
                <Layers size={17} /> Key Highlights & Features
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2
                      size={16}
                      className={`mt-0.5 shrink-0 ${isEmerald ? 'text-emerald-400' : 'text-cyan-400'}`}
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Challenges if present */}
            {project.challenges && (
              <div className="rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-950/20 via-slate-950 to-slate-900/60 p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-300 mb-3">
                  <AlertCircle size={17} /> Technical Challenges & Engineering Solutions
                </h3>
                <div className="space-y-3">
                  {project.challenges.map((challenge, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Badges */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                      isEmerald
                        ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-100'
                        : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-white/10"
              >
                <Github size={15} /> Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white transition hover:scale-105 ${
                  isEmerald
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 shadow-md shadow-emerald-950/40'
                    : 'bg-gradient-to-r from-violet-500 to-cyan-500'
                }`}
              >
                Live Demo <ExternalLink size={15} />
              </a>
            )}
            <button
              onClick={onClose}
              className="rounded-xl border border-white/15 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/10 transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
