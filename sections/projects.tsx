'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Info } from 'lucide-react';
import { projects, Project } from '@/constants/data';
import { Reveal } from '@/components/motion';
import { ProjectModal } from '@/components/project-modal';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section">
      <Reveal>
        <p className="eyebrow">03 — Selected work</p>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="section-title">
            Built to be<br />
            <span className="gradient-text">experienced.</span>
          </h2>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            A selection of product experiments and production-minded systems across web, mobile, and AI.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.06}>
            <motion.article
              whileHover={{ y: -8 }}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[.09] to-white/[.03] shadow-2xl shadow-black/25 transition hover:border-cyan-300/35 hover:shadow-cyan-950/20"
            >
              <div>
                <div
                  onClick={() => setSelectedProject(project)}
                  className="relative aspect-[16/8.5] overflow-hidden cursor-pointer"
                >
                  <Image
                    src={project.image}
                    alt={`${project.name} project preview`}
                    fill
                    className="object-cover brightness-110 transition duration-700 group-hover:scale-110 group-hover:brightness-125"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1e] via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-cyan-200/30 bg-slate-950/60 px-3 py-1 text-[11px] font-medium text-cyan-100 backdrop-blur">
                    {project.tag}
                  </span>
                </div>

                <div className="p-6 pt-4">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-xl font-medium text-white cursor-pointer hover:text-cyan-200 transition"
                  >
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-cyan-300/10 px-2 py-1 text-[11px] text-cyan-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 mt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500/80 to-cyan-500/80 px-3.5 py-2 text-xs font-semibold text-white transition hover:scale-105"
                >
                  <Info size={14} /> View Details
                </button>
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-white transition hover:border-cyan-300/50 hover:text-cyan-200"
                  >
                    <Github size={14} /> GitHub
                  </a>
                ) : (
                  <a
                    href="https://github.com/Narasimhudu-panyam"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-white transition hover:border-cyan-300/50 hover:text-cyan-200"
                  >
                    <Github size={14} /> Profile
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-300 transition hover:text-cyan-200"
                  >
                    Live Demo <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>

      {/* Detailed Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
