import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.25), transparent 35%), radial-gradient(circle at 80% 0%, rgba(56, 189, 248, 0.3), transparent 30%), radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.2), transparent 40%), linear-gradient(135deg, #0b1022 0%, #0d1530 50%, #0b1022 100%)',
      },
      colors: {
        aurora: '#6dd5ed',
        prism: '#b57fe7',
        nebula: '#12172a',
      },
      boxShadow: {
        glow: '0 0 30px rgba(93, 201, 255, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
