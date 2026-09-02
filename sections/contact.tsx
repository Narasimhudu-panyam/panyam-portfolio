'use client';

import emailjs from '@emailjs/browser';
import { FormEvent, useState } from 'react';
import { CheckCircle2, Github, Linkedin, Mail, MapPin, Send, XCircle } from 'lucide-react';
import { Reveal } from '@/components/motion';

type Status = 'idle' | 'sending' | 'success' | 'error';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error && 'text' in error && typeof error.text === 'string') return error.text;
  if (typeof error === 'string') return error;
  return 'Failed to send message. Please try again later.';
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [toastMessage, setToastMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) return;

    const formData = new FormData(form);
    setStatus('sending');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email service configuration missing. Please check your environment variables.');
      }

      const templateParams = {
        name: String(formData.get('name') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
        time: new Date().toLocaleString(),
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        { publicKey }
      );

      form.reset();
      setToastMessage('Message sent successfully!');
      setStatus('success');
    } catch (error) {
      setToastMessage(getErrorMessage(error));
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-violet-900/50 via-[#0a1124] to-cyan-950/40 p-7 shadow-[0_30px_100px_rgba(34,211,238,.08)] sm:p-12">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-[80px]" />
          <p className="eyebrow">07 — Contact</p>
          <div className="relative grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <h2 className="section-title">
                Let&apos;s make the
                <br />
                <span className="gradient-text">next thing count.</span>
              </h2>
              <p className="mt-6 max-w-md leading-7 text-slate-300">
                Have a role, a product idea, or an interesting problem? I&apos;d love to hear about it.
              </p>
              <div className="mt-9 space-y-4 text-sm text-slate-300">
                <a
                  className="flex items-center gap-3 transition hover:text-cyan-200"
                  href="mailto:plnarashima0@gmail.com"
                  aria-label="Email Panyam Lakshmi Narasimhudu"
                >
                  <Mail size={17} />
                  plnarashima0@gmail.com
                </a>
                <a
                  className="flex items-center gap-3 transition hover:text-cyan-200"
                  href="https://www.linkedin.com/in/panyam-lakshmi-narasimhudu"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open LinkedIn profile"
                >
                  <Linkedin size={17} />
                  LinkedIn
                </a>
                <a
                  className="flex items-center gap-3 transition hover:text-cyan-200"
                  href="https://github.com/Narasimhudu-panyam"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub profile"
                >
                  <Github size={17} />
                  GitHub
                </a>
                <p className="flex items-center gap-3">
                  <MapPin size={17} />
                  Alamur (V), AP – 518543
                </p>
              </div>
            </div>

            <div>
              <form
                onSubmit={submit}
                className="grid gap-4 rounded-2xl border border-white/15 bg-slate-950/45 p-5 shadow-xl shadow-black/20 sm:p-6"
              >
                <label className="text-xs font-medium text-slate-300">
                  Name
                  <input
                    required
                    minLength={2}
                    name="name"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.06] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
                    placeholder="Your name"
                  />
                </label>
                <label className="text-xs font-medium text-slate-300">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.06] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="text-xs font-medium text-slate-300">
                  Message
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[.06] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
                    placeholder="Tell me about your project..."
                  />
                </label>
                <button
                  disabled={status === 'sending'}
                  className="rounded-xl bg-gradient-to-r from-white to-cyan-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-70"
                  type="submit"
                >
                  {status === 'sending' ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="mr-2 inline" size={15} />
                      Send message
                    </>
                  )}
                </button>
              </form>
              {status !== 'idle' && status !== 'sending' && (
                <div
                  role="status"
                  className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
                    status === 'success'
                      ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100'
                      : 'border-rose-300/30 bg-rose-300/10 text-rose-100'
                  }`}
                >
                  {status === 'success' ? <CheckCircle2 size={17} /> : <XCircle size={17} />} {toastMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
