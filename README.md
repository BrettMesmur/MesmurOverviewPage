# Mesmur Promo Page

A single-page promotional experience for the Mesmur card adventure game, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Image placement
- Place your assets anywhere under the `public/` directory; the app discovers them by folder name, not fixed paths.
- **Heroes & Items carousel:** put images inside any folder named `HeroImages` (case-insensitive) under `public/`.
- **Worlds carousel:** put images inside any folder named `LevelImages` (case-insensitive) under `public/`.
- **Hero background:** place a file named `MainImage` with one of the supported extensions anywhere under `public/`.

Supported extensions: `.png`, `.jpg`, `.jpeg`, `.webp`.

## How discovery works
- On the server, `lib/discoverImages.ts` recursively scans `public/`.
- It looks for folders named `HeroImages` and `LevelImages`, gathers any supported image files within them, sorts them, and converts the file paths into public URLs.
- It also searches for a file named `MainImage.*` to use as the hero background. If any of these are missing, the UI shows a placeholder state instead of failing.

## Running the project
```bash
npm install
npm run dev
```

- Development server: http://localhost:3000
- Production build: `npm run build` then `npm start`
