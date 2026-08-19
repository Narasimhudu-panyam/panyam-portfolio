# Panyam Lakshmi Narasimhudu — Portfolio

A premium, SaaS-style personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Keep the default Next.js build settings and deploy.
4. Update the site URL in `app/sitemap.ts` and replace `public/resume.pdf` with the final résumé before going live.

## Notes

- GitHub data is fetched server-side from the public GitHub REST API and cached for one hour.
- The contact form provides polished client-side feedback. Connect it to Resend, Formspree, or a server action to deliver email.
- Remote project imagery is optimized by Next.js. Add the domain to `next.config.ts` if you change sources.
