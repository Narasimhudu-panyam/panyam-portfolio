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
  return <section id="projects" className="section scroll-mt-20">
    <Reveal><p className="eyebrow">03 · Adventure islands</p><div className="flex flex-wrap items-end justify-between gap-5"><h2 className="section-title">Places I&apos;ve <span className="text-[#168DAB]">built.</span></h2><p className="max-w-sm leading-7 text-[#587184]">A selection of product experiments and production-minded systems across web, mobile, and AI.</p></div></Reveal>
    <div className="mt-10 grid gap-6 md:grid-cols-2">{projects.map((project, i) => <Reveal key={project.name} delay={i * .05}><motion.article whileHover={{ y: -5 }} className="island-card group">
      <button type="button" onClick={() => setSelectedProject(project)} className="relative block aspect-[16/8.5] w-full overflow-hidden bg-[#dceef2] text-left" aria-label={`View details for ${project.name}`}>
        <Image src={project.image} alt={`${project.name} project preview`} fill className="object-cover transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 768px) 100vw, 50vw" />
        <span className="absolute left-4 top-4 max-w-[90%] rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#28566c] shadow-sm">{project.tag}</span>
      </button>
      <div className="p-5 sm:p-6"><h3 className="text-xl font-bold leading-snug text-[#18324A]">{project.name}</h3><p className="mt-3 text-sm leading-6 text-[#526d7d]">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">{project.stack.map(item => <span key={item} className="project-chip">{item}</span>)}</div>
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#168DAB]/10 pt-4">
          <button onClick={() => setSelectedProject(project)} className="inline-flex items-center gap-2 rounded-xl bg-[#168DAB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#117992]"><Info size={15}/> View Details</button>
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[#168DAB]/20 px-3.5 py-2.5 text-sm font-semibold text-[#28566c] transition hover:bg-[#e9f7fb]"><Github size={15}/> GitHub</a>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-[#c6533b] transition hover:text-[#963d2b]">Live Demo <ArrowUpRight size={15}/></a>}
        </div>
      </div>
    </motion.article></Reveal>)}</div>
    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
  </section>;
}
