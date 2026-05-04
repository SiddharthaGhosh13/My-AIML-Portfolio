# My-Portfolio — Siddhartha Ghosh

Production-grade AI/ML engineer portfolio (React + Vite + Tailwind CSS + Framer Motion). Content is data-driven from `src/data/`; visuals follow a dark editorial theme with amber and electric cyan accents.

## Local setup

```bash
cd My-Portfolio
npm install
npm run dev
```

## Scripts

- `npm run dev` — dev server (Vite)
- `npm run build` — production build → `dist/`
- `npm run preview` — preview production build locally

## Updating content

| Location | What to edit |
|----------|----------------|
| `src/data/site.js` | Name, titles, bio, vision, tagline, social URLs, nav |
| `src/data/projects.js` | Project cards, metrics, links, image paths |
| `src/data/skills.js` | Skill categories and pills |
| `src/data/roadmap.js` | 18-month roadmap phases |
| `src/data/experience.js` | Roles and timelines |

Swap imagery by replacing imports in `About.jsx` or pointing `image` fields in `projects.js` to files under `public/`.

## EmailJS

The contact form uses EmailJS (`src/components/Contact.jsx`). These IDs are wired:

- **SERVICE_ID:** `service_t2qj5l7`
- **TEMPLATE_ID:** `template_55x7d7h`
- **PUBLIC_KEY:** `I8Nomv9Y10EEPdxOw`

Your EmailJS template should expose: `{{from_name}}`, `{{reply_to}}`, `{{message}}`.

If the repository is public, rotate keys from the EmailJS dashboard if you prefer not to embed identifiers in git history.

## Deploy (Vercel)

1. Push this folder to GitHub.
2. **New Project** in Vercel → import the repo; framework **Vite**.
3. Build: `npm run build`, output: `dist`.
4. Update `og:url` and `og:image` in `index.html` to your live domain and final OG asset.

## Favicon

`public/favicon.svg` is configured in `index.html`. Add `public/favicon.ico` if you need legacy `.ico` support and link it alongside the SVG.

---

Built with React 19, Vite 8, Tailwind 3, Framer Motion, react-intersection-observer, tsParticles (lazy-loaded), and `@emailjs/browser`.
