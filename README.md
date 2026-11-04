# Abhishek Kumar — 3D Portfolio

A cinematic, interactive developer portfolio built with React, Vite, TypeScript, Tailwind CSS, React Three Fiber, Drei, Framer Motion, GSAP, and Lenis.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- React Three Fiber + Drei + Three.js
- Framer Motion + GSAP
- Lenis Smooth Scrolling

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Production Build

```bash
npm run build
npm run preview
```

## Resume

Place your PDF at `public/Abhishek_Kumar_Resume.pdf`.

The portfolio checks whether the resume file is available before enabling the download button. Make sure the filename matches exactly.

## Contact Form

Without a backend endpoint, the contact form opens the visitor's default email application using a `mailto:` link. It does not claim that a message has been sent.

For real submissions:

1. Create a free form at Formspree.
2. Copy your form endpoint.
3. Set `VITE_FORM_ENDPOINT` in your local `.env` file.
4. Add the same variable in Vercel under Project → Settings → Environment Variables.
5. Redeploy the project.

Never commit private API keys or secrets to GitHub.

## Deploy to Vercel

1. Push the project to GitHub.
2. Open Vercel and select Add New → Project.
3. Import this repository.
4. Select Vite as the framework.
5. Set build command to `npm run build` and output directory to `dist`.
6. Deploy.

CLI alternative:

```bash
npm install -g vercel
vercel --prod
```

## Edit Portfolio Content

All portfolio text, links, projects, and skills live in `src/data/portfolio.ts`.

Add valid `live` and/or `repo` URLs to a project to show its corresponding buttons.