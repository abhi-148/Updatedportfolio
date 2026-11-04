# Abhishek Kumar — 3D Portfolio

React + Vite + TypeScript + Tailwind + React Three Fiber + Drei + Framer Motion + GSAP + Lenis.

## Run
    npm install
    npm run dev          # http://localhost:5173
    npm run build        # type-check + production build
    npm run preview

## Resume
Place your PDF at `public/Abhishek_Kumar_Resume.pdf`. The button auto-enables once the file exists.

## Contact form
Without a backend the form opens the visitor's email app (mailto) — it never claims a message was sent.
For real submissions: create a free Formspree form, copy its endpoint into `VITE_FORM_ENDPOINT`
(local `.env`, and Vercel → Project → Settings → Environment Variables), then redeploy.

## Deploy to Vercel
1. Push to GitHub.  2. vercel.com → Add New → Project → import the repo.
3. Framework: Vite (auto). Build `npm run build`, output `dist`.  4. Deploy.
CLI alternative: `npm i -g vercel && vercel --prod`.

## Edit content
All text, links, projects and skills live in `src/data/portfolio.ts`. Add `live` / `repo` URLs to a project there to show its buttons.
