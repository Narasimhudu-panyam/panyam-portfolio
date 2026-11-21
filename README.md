# Panyam Lakshmi Narasimhudu — Portfolio

A bright sky and ocean inspired portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion. The visual theme uses original CSS scenery and the existing portfolio photography, screenshots, and certificate previews.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Features

- Responsive portfolio sections for about, skills, projects, certifications, experience, education, GitHub, and contact.
- Existing project screenshots, GitHub and live-demo URLs, detailed project modal, certificate PDFs, and certificate preview modal.
- Resume download at `/resume.pdf`.
- Contact form delivery through EmailJS. Configure `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` in `.env.local`.
- GitHub profile and repository data fetched from the GitHub REST API. If the API is unavailable, the section reports that state without showing placeholder statistics.
- Motion effects respect the browser's reduced-motion preference.

## Validation

`npx tsc --noEmit` and `npm run build` pass. Browser-based visual checks at specific viewport widths were not available in this workspace.

## Deploy to Vercel

1. Push the feature branch to GitHub and open a pull request.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Configure the EmailJS environment variables in the deployment settings.
4. Check the canonical URL in `app/layout.tsx` and `app/sitemap.ts` before production deployment.
