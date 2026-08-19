'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Calendar, Building2 } from 'lucide-react';
import { certifications, Certification } from '@/constants/data';
import { Reveal } from '@/components/motion';
import { CertificateModal } from '@/components/certificate-modal';

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="section">
      <Reveal>
        <p className="eyebrow">04 — Verified Credentials</p>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="section-title">
            Industry recognized<br />
            <span className="gradient-text">certifications.</span>
          </h2>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            Formal training and project-based certifications in Web Development, Cloud Computing, and Generative AI.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 0.08}>
            <motion.article
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[.08] via-slate-950/60 to-white/[.02] p-6 shadow-2xl shadow-black/25 transition duration-300 hover:border-cyan-300/35 hover:shadow-cyan-950/30"
            >
              <div>
                {/* Certificate Preview Image */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-inner group-hover:border-cyan-300/30 transition"
                >
                  <Image
                    src={cert.previewUrl}
                    alt={`${cert.title} preview`}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-200/30 bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-cyan-100 backdrop-blur">
                    <Award size={13} className="text-cyan-300" />
                    {cert.organization}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-5">
                  <h3 className="text-lg sm:text-xl font-medium text-white group-hover:text-cyan-100 transition">
                    {cert.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Building2 size={13} className="text-cyan-400" />
                      {cert.organization}
                    </span>
                    {(cert.date || cert.duration) && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-violet-300" />
                        {cert.date || cert.duration}
                      </span>
                    )}
                  </div>

                  {cert.inAssociationWith && (
                    <p className="mt-2 text-xs text-slate-400">
                      <span className="text-slate-500">In association with:</span> {cert.inAssociationWith}
                    </p>
                  )}

                  <p className="mt-3 text-xs sm:text-sm leading-6 text-slate-300">
                    {cert.description}
                  </p>

                  {cert.certId && (
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <ShieldCheck size={13} className="text-cyan-400" />
                      <span>Certificate ID: <strong className="font-semibold text-cyan-200">{cert.certId}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500/80 to-cyan-500/80 px-4 py-2.5 text-xs font-semibold text-white transition hover:scale-105 shadow-md shadow-cyan-950/20"
                >
                  <ExternalLink size={14} /> View Certificate
                </button>
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-cyan-200 transition"
                >
                  Open PDF →
                </a>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>

      {/* Certificate Viewer Modal */}
      <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
}
