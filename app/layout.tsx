import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

export const metadata: Metadata = {
  title: 'Mesmur: Adventure is in the cards',
  description: 'Promo page for the Mesmur adventure card game.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="bg-space-gradient text-white font-body antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
