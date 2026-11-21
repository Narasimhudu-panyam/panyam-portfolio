import { BriefcaseBusiness, GraduationCap, Award } from 'lucide-react';
import { Reveal } from '@/components/motion';

const education = [
  {
    title: 'Master of Computer Applications (MCA)',
    org: 'Mohan Babu University',
    meta: 'CGPA 9.1 / 10.0',
    years: '2023 – 2025',
    coursework: 'Full Stack Systems, Artificial Intelligence, Machine Learning, Data Structures & Algorithms',
  },
  {
    title: 'Bachelor of Science (Maths, Physics, CS)',
    org: 'S V Arts College',
    meta: 'CGPA 7.9 / 10.0',
    years: '2020 – 2023',
    coursework: 'Computer Science foundations, Mathematics, Database Management, OOP & MVC principles',
  },
];

export function Journey() {
  return (
    <section className="section grid gap-16 lg:grid-cols-2">
      {/* Experience */}
      <div id="experience">
        <Reveal>
          <p className="eyebrow">05 — Experience</p>
          <h2 className="section-title">
            Work that<br />
            <span className="gradient-text">compounds.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative mt-10 border-l border-cyan-300/30 pl-7">
            <span className="absolute -left-2 top-1 grid h-4 w-4 place-items-center rounded-full bg-cyan-300 ring-8 ring-cyan-300/10" />
            <article className="glass rounded-2xl border border-white/15 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-lg hover:shadow-cyan-950/20">
              <div className="flex items-center gap-3 text-cyan-200">
                <span className="rounded-xl bg-violet-500/20 p-2 text-cyan-300">
                  <BriefcaseBusiness size={18} />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Jan 2024 – May 2024
                </p>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">Python Full Stack Development Intern</h3>
              <p className="mt-1 text-sm font-medium text-slate-300">Sattva Infotech</p>
              <p className="mt-4 text-xs sm:text-sm leading-6 text-slate-300">
                Developed and maintained responsive web pages following MVC design principles, built backend Python components, and collaborated in an Agile team setting to deliver scalable features.
              </p>
            </article>
          </div>
        </Reveal>
      </div>

      {/* Education */}
      <div id="education">
        <Reveal>
          <p className="eyebrow">06 — Education</p>
          <h2 className="section-title">
            Always<br />
            <span className="gradient-text">learning.</span>
          </h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {education.map((item, i) => (
            <Reveal key={item.org} delay={i * 0.12}>
              <article className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-violet-950/40 via-slate-950/80 to-cyan-950/40 p-6 shadow-xl shadow-violet-950/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40">
                <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-violet-400 to-cyan-300" />
                <div className="flex gap-4 sm:gap-5">
                  <span className="mt-0.5 shrink-0 rounded-xl border border-cyan-300/30 bg-cyan-400/10 p-2.5 text-cyan-300">
                    <GraduationCap size={22} />
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-cyan-300">{item.years}</span>
                    <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm font-medium text-slate-300">{item.org}</p>
                    <p className="mt-3 text-xs leading-5 text-slate-400">{item.coursework}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-cyan-300/40 bg-cyan-400/15 px-2.5 py-1 text-xs font-semibold text-cyan-100 shadow-sm">
                      <Award size={13} className="text-cyan-300" />
                      <span>{item.meta}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
