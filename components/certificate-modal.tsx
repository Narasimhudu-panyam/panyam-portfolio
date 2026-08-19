'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, Download, ShieldCheck, Award } from 'lucide-react';
import Image from 'next/image';
import { Certification } from '@/constants/data';

interface CertificateModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export function CertificateModal({ cert, onClose }: CertificateModalProps) {
  if (!cert) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 my-6 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-slate-900/95 p-5 sm:p-7 shadow-2xl shadow-cyan-950/50 text-slate-100 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <Award size={16} /> Official Certificate
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1">{cert.title}</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{cert.organization}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-white/10 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Viewer */}
          <div className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1 custom-scrollbar">
            {/* Embedded PDF Viewer / Image Preview */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-slate-950 min-h-[350px] sm:min-h-[480px]">
              <object
                data={cert.pdfUrl}
                type="application/pdf"
                className="w-full h-[450px] sm:h-[550px] rounded-2xl"
              >
                {/* Fallback image if PDF plugin isn't rendering inline */}
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                  <Image
                    src={cert.previewUrl}
                    alt={cert.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </object>
            </div>

            {/* Metadata Footer */}
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs sm:text-sm">
              <p className="text-slate-300">{cert.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-white/10">
                {cert.certId && (
                  <span className="flex items-center gap-1.5 font-mono text-cyan-200">
                    <ShieldCheck size={14} className="text-cyan-400" /> Certificate ID: {cert.certId}
                  </span>
                )}
                {cert.teamId && (
                  <span className="font-mono text-slate-400">Team ID: {cert.teamId}</span>
                )}
                {(cert.date || cert.duration) && (
                  <span>Period: {cert.date || cert.duration}</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-white/10 shrink-0">
            <a
              href={cert.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500/80 to-cyan-500/80 px-4 py-2 text-xs font-semibold text-white transition hover:scale-105 shadow-md shadow-cyan-950/40"
            >
              <ExternalLink size={15} /> Open Full PDF
            </a>
            <a
              href={cert.pdfUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
            >
              <Download size={15} /> Download PDF
            </a>
            <button
              onClick={onClose}
              className="rounded-xl border border-white/15 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
