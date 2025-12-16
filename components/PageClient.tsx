'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import Carousel from './Carousel';
import Modal from './Modal';
import type { DiscoveryResult } from '@/lib/discoverImages';

const features = [
  {
    title: 'Deck-Building Depth',
    body: 'Chain hero abilities and relic items to craft unstoppable combos.',
  },
  {
    title: 'Reactive AI',
    body: 'Foes learn your patterns, forcing you to improvise mid-encounter.',
  },
  {
    title: 'Co-op Synergy',
    body: 'Pair with a friend to blend loadouts and discover team ultimates.',
  },
  {
    title: 'Risk & Reward',
    body: 'Push deeper for rarer loot while the void storms grow stronger.',
  },
  {
    title: 'Tactical Battlemaps',
    body: 'Cover, elevation, and environmental hazards shape every turn.',
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

  return (
    <div className="relative">
      <nav className="sticky top-0 z-40 bg-[#0b1022]/70 backdrop-blur-lg border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="text-lg font-display tracking-[0.25em] text-aurora">MESMUR</div>
          <div className="flex gap-4 text-sm uppercase tracking-wide text-gray-100">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-aurora">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header id="home" className="section relative min-h-[80vh] overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-br from-aurora/20 via-prism/10 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0b1022]" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl items-end justify-center px-4 pb-16 pt-24">
          <div className="max-w-3xl space-y-4 text-center">
            <h1 className="font-display text-3xl leading-tight text-white drop-shadow-lg md:text-4xl">
              Adventure is in the cards
            </h1>
            <div className="flex justify-center">
              <button
                aria-label="Try the demo"
                className="gradient-border relative overflow-hidden rounded-full bg-aurora/20 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-aurora/30"
                onClick={() => setModalOpen(true)}
              >
                Try the demo
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 space-y-24 pb-24">
        <section id="heroes" className="section mx-auto max-w-6xl px-4 text-center">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-center">
            <div>
              <h2 className="mt-8 text-3xl md:text-4xl">Collect Powerful Heroes and Items</h2>
              <p className="text-gray-200">Draft rare cards, awaken relics, and assemble a squad built for impossible odds.</p>
            </div>
          </div>
          <Carousel images={discovery.heroesAndItems} title="Heroes and Items" />
        </section>

        <section id="worlds" className="section mx-auto max-w-6xl px-4 text-center">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-center">
            <div>
              <h2 className="text-3xl md:text-4xl">Explore Strange New Worlds</h2>
              <p className="text-gray-200">Slipstream across shattered realms, each with hazards and loot that change every run.</p>
            </div>
          </div>
          <Carousel images={discovery.worlds} title="Worlds" />
        </section>

        <section id="gameplay" className="section mx-auto max-w-6xl px-4 text-center">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-center">
            <div>
              <h2 className="text-3xl md:text-4xl">How It Plays</h2>
              <p className="text-gray-200">Placeholder lorem ipsum to highlight the core loops and tactical texture of the adventure.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="glass-panel rounded-2xl p-5">
                <h3 className="mb-2 text-xl text-aurora">{feature.title}</h3>
                <p className="text-gray-200">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} message="Coming soon." />
    </div>
  );
}
