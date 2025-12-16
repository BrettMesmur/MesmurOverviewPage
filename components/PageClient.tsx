'use client';

import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import Carousel from './Carousel';
import Modal from './Modal';
import type { DiscoveryResult } from '@/lib/discoverImages';

const features = [
  {
    title: 'Deck-Building Depth',
    body: 'Fuse heroes and relics to chain-card effects, crafting outrageous plays that snowball across turns.',
  },
  {
    title: 'Reactive AI',
    body: 'Adversaries read your patterns—forcing quick pivots, clever bluffs, and clutch saves.',
  },
  {
    title: 'Co-op Synergy',
    body: 'Drop in with a friend, splice your loadouts, and unlock duo ultimates that reshape the map.',
  },
  {
    title: 'Risk & Reward',
    body: 'Push deeper for rarities while storms amplify; every encounter is a gamble with teeth.',
  },
  {
    title: 'Tactical Battlemaps',
    body: 'Cover, elevation, and environmental hazards layer strategy on top of every card you play.',
  },
];

type Props = {
  discovery: DiscoveryResult;
};

export default function PageClient({ discovery }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'heroes', label: 'Heroes & Items' },
      { id: 'worlds', label: 'Worlds' },
      { id: 'gameplay', label: 'Gameplay' },
    ],
    []
  );

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 88;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative">
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-white/5 backdrop-blur-md">
        <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4">
          <div className="text-lg font-display uppercase tracking-[0.2em] text-white/80">Mesmur</div>
          <div className="flex items-center gap-6 md:gap-7">
            <div className="flex items-center gap-4 md:gap-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="nav-link text-white/70 transition hover:text-white"
                  aria-label={`Jump to ${item.label}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <button
              aria-label="Try the demo"
              onClick={() => setModalOpen(true)}
              className="nav-link rounded-full border border-white/30 bg-white/10 px-4 py-2 font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Try the demo
            </button>
          </div>
        </div>
      </nav>

      <header id="home" className="section relative isolate min-h-[86vh] overflow-hidden">
        {discovery.heroBackground ? (
          <Image
            src={discovery.heroBackground}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1025] via-[#0d1430] to-[#0b1022]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/25" />
        <div className="relative mx-auto flex max-w-page items-center px-5 py-24">
          <div className="max-w-3xl space-y-6">
            <h1 className="hero-title">Adventure is in the cards</h1>
            <p className="body-text text-white/85">
              Command a living deck of mystic rogues and luminous relics. Every draw bends the battlefield, every combo rewrites
              the run.
            </p>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 transform items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 md:flex">
          Scroll
          <span className="h-px w-10 bg-gradient-to-r from-white/10 via-white/60 to-transparent" />
        </div>
      </header>

      <main className="relative z-10 space-y-28 pb-28">
        <section id="heroes" className="section mx-auto max-w-page px-5">
          <div className="grid gap-12 md:grid-cols-[1.05fr_1.4fr] md:items-center">
            <div className="space-y-4">
              <p className="small-meta text-aurora/90">Heroes & Items</p>
              <h2 className="section-title">Collect Powerful Heroes and Items</h2>
              <p className="body-text text-white/80">
                Draft radiant champions and void-touched relics into a single deck. Stack synergies, awaken ultimates, and slam
                into impossible odds.
              </p>
            </div>
            <Carousel images={discovery.heroesAndItems} title="Heroes and Items" />
          </div>
        </section>

        <section id="worlds" className="section mx-auto max-w-page px-5">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1.05fr] md:items-center">
            <Carousel images={discovery.worlds} title="Worlds" />
            <div className="space-y-4 md:justify-self-end">
              <p className="small-meta text-prism/90">Worlds</p>
              <h2 className="section-title">Explore Strange New Worlds</h2>
              <p className="body-text text-white/80">
                Slipstream through shattered nebulae, crystalline ruins, and living starships. Each realm rewrites hazards,
                rewards, and the cards that flourish there.
              </p>
            </div>
          </div>
        </section>

        <section id="gameplay" className="section mx-auto max-w-page px-5">
          <div className="max-w-3xl space-y-3">
            <p className="small-meta text-white/70">Gameplay</p>
            <h2 className="section-title">How It Plays</h2>
            <p className="body-text text-white/80">
              Draft, dive, adapt, repeat. Each run folds tactical positioning into quickfire cardplay so your deck feels alive in
              motion.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="glass-panel relative overflow-hidden rounded-2xl p-5">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/5" aria-hidden />
                <h3 className="mb-2 text-lg font-semibold text-aurora">{feature.title}</h3>
                <p className="body-text text-white/80">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} message="Coming soon." />
    </div>
  );
}
