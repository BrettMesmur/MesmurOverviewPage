/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages && repoName ? `/${repoName}` : undefined,
  assetPrefix: isGithubPages && repoName ? `/${repoName}/` : undefined,
};

module.exports = nextConfig;
