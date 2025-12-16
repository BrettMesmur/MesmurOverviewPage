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

## Running the project locally
```bash
npm install
npm run dev
```

- Development server: http://localhost:3000
- Production-like static build (e.g., for local preview): `npm run build` and serve the generated `out/` directory with any static file server.

## Deploying to GitHub Pages
This repository is preconfigured for GitHub Pages. The Next.js build exports a static site, includes a `.nojekyll` file, and adjusts paths automatically when the `GITHUB_PAGES` flag is set.

### One-time GitHub setup
1. Enable GitHub Pages to deploy from **GitHub Actions** in your repository settings.
2. Commit and push the included workflow at `.github/workflows/pages.yml`.

### Commands to run locally (if you want to verify the Pages build)
```bash
# Install dependencies
npm install

# Build the GitHub Pages export (replace OWNER/REPO with your repo name)
GITHUB_PAGES=true GITHUB_REPOSITORY=OWNER/REPO npm run build

# Serve the exported site from ./out if you want to preview locally
npx serve out
```

`GITHUB_PAGES` toggles the Pages-specific base path/asset prefix, and `GITHUB_REPOSITORY` lets the build derive the repo folder name.

### Automated deployment
The workflow in `.github/workflows/pages.yml` installs dependencies, exports the static site to `out/`, uploads it as the Pages artifact, and deploys it to GitHub Pages whenever you push to `main`. You can trigger a manual run from the Actions tab if needed.
