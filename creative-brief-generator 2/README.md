# Creative Brief — GET · WHO · TO · BY

This is a tiny React web app that generates a succinct interlaced creative brief and a full brief for hand‑over to creative/production teams.

## Run locally

```bash
npm install
npm run dev
```

## Build for the web

```bash
npm run build
```
This produces a static site in `dist/`.

## Share it publicly (pick one)

### Option A — Vercel (recommended)
1. Create a new repo on GitHub and push these files.
2. Go to Vercel → **New Project** → **Import Git Repository**.
3. Framework preset: **Vite** (auto-detected). Build command: `vite build`. Output: `dist`.
4. Deploy. You’ll get a public HTTPS URL.

### Option B — Netlify
1. Push to GitHub.
2. In Netlify, **New site from Git**, pick your repo.
3. Build command: `vite build`. Publish directory: `dist/`.
4. Deploy.

### Option C — GitHub Pages (static hosting)
1. Run `npm run build` locally.
2. Push the contents of `dist/` to a branch (e.g. `gh-pages`).
3. In the repo settings → Pages → set **Source** to that branch.

## Accessibility checklist

- The page has `lang="en-GB"` and scalable text.
- All form fields have `<label>` elements.
- Clear focus styles for keyboard users.
- Colour contrast aims for AA (pink accent with dark text).
- Buttons have text and icons; icons are marked `aria-hidden`.

---

Made with Vite + React + Tailwind + framer-motion + lucide-react.
