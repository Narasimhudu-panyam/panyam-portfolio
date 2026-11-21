import { Navbar } from '@/components/navbar';
import { Hero } from '@/sections/hero';
import { About } from '@/sections/about';
import { Projects } from '@/sections/projects';
import { Certifications } from '@/sections/certifications';
import { Journey } from '@/sections/journey';
import { GitHub } from '@/sections/github';
import { Contact } from '@/sections/contact';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Certifications />
      <Journey />
      <GitHub />
      <Contact />
      <Footer />
    </main>
  );
}
