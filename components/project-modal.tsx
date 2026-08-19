'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, Layers, Cpu, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/constants/data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

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
          className="relative z-10 my-8 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-slate-900/95 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
            <div>
              <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200 mb-2">
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
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl border border-white/10">
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
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-2">
                Overview & Description
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Architecture Highlights if present */}
            {project.architecture && (
              <div className="rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-violet-950/30 via-slate-950 to-cyan-950/30 p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-200 mb-3">
                  <Cpu size={17} /> Architecture & System Design
                </h3>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {project.architecture.map((archItem) => (
                    <div key={archItem} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                      <span>{archItem}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-3">
                <Layers size={17} /> Key Highlights & Features
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100"
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
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:scale-105"
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
