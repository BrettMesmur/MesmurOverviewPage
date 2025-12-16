import fs from 'fs';
import path from 'path';

export type DiscoveryResult = {
  heroBackground?: string;
  heroesAndItems: string[];
  worlds: string[];
};

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

function isImage(file: string) {
  return IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase());
}

async function recursiveFindDirectories(
  root: string,
  targetName: string
): Promise<string[]> {
  const matches: string[] = [];
  const entries = await fs.promises.readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.toLowerCase() === targetName.toLowerCase()) {
        matches.push(fullPath);
      }
      matches.push(...(await recursiveFindDirectories(fullPath, targetName)));
    }
  }

  return matches;
}

async function findMainImage(root: string): Promise<string | undefined> {
  const entries = await fs.promises.readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      const nested = await findMainImage(fullPath);
      if (nested) return nested;
    } else {
      const base = path.parse(entry.name).name.toLowerCase();
      if (base === 'mainimage' && isImage(entry.name)) {
        return fullPath;
      }
    }
  }
  return undefined;
}

async function getImagesFromDirectories(dirs: string[]): Promise<string[]> {
  const all: string[] = [];
  for (const dir of dirs) {
    const files = await fs.promises.readdir(dir);
    const images = files
      .filter((file) => isImage(file))
      .sort((a, b) => a.localeCompare(b))
      .map((file) => path.join(dir, file));
    all.push(...images);
  }
  return all;
}

function toPublicUrl(publicDir: string, filePath: string) {
  const relative = path.relative(publicDir, filePath);
  return '/' + relative.split(path.sep).join('/');
}

export async function discoverImages(): Promise<DiscoveryResult> {
  const publicDir = path.join(process.cwd(), 'public');

  const [heroDirs, worldDirs, heroBackground] = await Promise.all([
    recursiveFindDirectories(publicDir, 'HeroImages'),
    recursiveFindDirectories(publicDir, 'LevelImages'),
    findMainImage(publicDir),
  ]);

  const [heroImages, worldImages] = await Promise.all([
    getImagesFromDirectories(heroDirs),
    getImagesFromDirectories(worldDirs),
  ]);

  return {
    heroBackground: heroBackground ? toPublicUrl(publicDir, heroBackground) : undefined,
    heroesAndItems: heroImages.map((img) => toPublicUrl(publicDir, img)),
    worlds: worldImages.map((img) => toPublicUrl(publicDir, img)),
  };
}
