'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import Carousel from './Carousel';
import Modal from './Modal';
import type { DiscoveryResult } from '@/lib/discoverImages';

const howItPlays = [
  {
    title: 'Choose heroes, build resource',
    body: 'Recruit a tight-knit crew whose abilities set up the economy you want to snowball.',
    image: '/images/GameplayScreenshots/HeroesScreenShot.png',
  },
  {
    title: 'Build resource engine',
    body: 'Stack relics and cards that feed into each other until every turn fuels the next.',
    image: '/images/GameplayScreenshots/BuildEngineScreenShot.png',
  },
  {
    title: 'Battle enemies',
    body: 'Push your new combos against ruthless bosses and refine the loop each run.',
    image: '/images/GameplayScreenshots/CombatScreenshot.png',
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
              <p className="text-gray-200">
                choose a small crew, build a powerful resource engine around them, and then test the combos
                you discover against tough boss battles.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {howItPlays.map((step) => (
              <div key={step.title} className="glass-panel flex h-full flex-col overflow-hidden rounded-2xl">
                <div className="relative aspect-video w-full">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-xl text-aurora">{step.title}</h3>
                  <p className="text-gray-200">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} message="Coming soon." />
    </div>
  );
}
