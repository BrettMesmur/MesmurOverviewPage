# Mesmur Promo Page

A single-page promo for the in-progress Mesmur game, built with Next.js (App Router), TypeScript, and Tailwind CSS. The page discovers its images at runtime and adapts to desktop and mobile carousels.

## Image placement
- Place assets anywhere under `public/`; discovery is based on names, not fixed paths.
- **Heroes & Items carousel:** put supported image files inside any folder named `HeroImages` (case-insensitive).
- **Worlds carousel:** put supported image files inside any folder named `LevelImages` (case-insensitive).
- **Hero background:** add a file named `MainImage` with a supported extension anywhere under `public/`.

Supported extensions: `.png`, `.jpg`, `.jpeg`, `.webp`.

## How discovery works
`lib/discoverImages.ts` recursively walks the `public/` directory on the server to find:
- Directories named `HeroImages` and `LevelImages`; files inside them with supported extensions are sorted and converted to public URLs.
- A single `MainImage.*` file used as the hero background.

Missing folders or files result in graceful placeholders instead of runtime errors.

## Running the project
```bash
npm install
npm run dev
```

- Development server runs at http://localhost:3000.
- Production build: `npm run build` then `npm run start` to serve the optimized build.
