import { Compass, Sparkles } from 'lucide-react';
import { skills } from '@/constants/data';
import { Reveal } from '@/components/motion';

const aiUse = [['TensorFlow', 'Trained real-time sign language recognition models for VSign.'], ['MediaPipe', 'Implemented hand landmark detection for gesture tracking in VSign.'], ['OpenCV', 'Built computer-vision pipelines that produce real-time subtitles.'], ['RAG & ChromaDB', 'Implemented vector search and technical doc retrieval for error resolution.'], ['Ollama & Local LLM', 'Hosted Qwen2.5 for offline, privacy-first technical troubleshooting AI.'], ['Gemini AI', 'Integrated personalized itinerary generation in the travel planner.'], ['Google Maps API', 'Powered location search, attractions, hotels, and route planning.'], ['NumPy', 'Handled dataset preprocessing and numerical computations.']];

export function About() {
  return <section id="about" className="section relative">
    <Reveal><div className="parchment-panel relative overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-14">
      <Compass aria-hidden="true" className="absolute -right-5 -top-7 h-40 w-40 rotate-12 text-[#d6b76b]/25" strokeWidth={.7} />
      <div className="relative grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="eyebrow">01 · The explorer</p><h2 className="section-title text-[#18324A]">Building the useful <span className="text-[#168DAB]">and the unforgettable.</span></h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#38596c] sm:text-lg">Motivated MCA student with hands-on experience in full stack development and AI-powered applications. I enjoy turning ambitious ideas into scalable applications with clean architecture and modern, human-centered interfaces.</p>
          <p className="mt-4 max-w-xl leading-7 text-[#567184]">My curiosity lives across Full Stack Development, Python, AI, Machine Learning, and cloud technology — especially where these disciplines combine to solve a real problem.</p>
          <div className="mt-7 flex items-center gap-3 border-t border-[#b99b5b]/30 pt-5 text-sm font-semibold text-[#426276]"><Sparkles size={17} className="text-[#E76F51]" /> Curious by nature, practical by design.</div>
        </div>
        <div id="skills" className="scroll-mt-28"><p className="eyebrow">02 · Adventurer&apos;s toolkit</p><h2 className="text-3xl font-bold tracking-tight text-[#18324A] sm:text-4xl">Technical skills</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{skills.map((group, i) => { const Icon = group.icon; return <Reveal key={group.label} delay={i * .04}><article className="skill-card h-full"><div className="mb-3 flex items-center gap-3"><span className="skill-icon"><Icon size={18} /></span><h3 className="font-semibold text-[#24475b]">{group.label}</h3></div><div className="flex flex-wrap gap-1.5">{group.items.map(item => <span key={item} className="skill-chip">{item}</span>)}</div></article></Reveal>; })}</div>
        </div>
      </div>
    </div></Reveal>
    <Reveal><div className="mt-8 rounded-[1.75rem] border border-[#168DAB]/15 bg-white/75 p-6 shadow-[0_12px_40px_rgba(24,50,74,.06)] sm:p-8"><p className="eyebrow">Applied AI · where ideas meet practice</p><div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">{aiUse.map(([name, description]) => <div key={name} className="border-l-2 border-[#E76F51]/55 pl-4"><h3 className="font-semibold text-[#28566c]">{name}</h3><p className="mt-1 text-sm leading-6 text-[#587184]">{description}</p></div>)}</div></div></Reveal>
  </section>;
}
