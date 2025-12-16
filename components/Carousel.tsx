'use client';

import Image from 'next/image';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

type CarouselProps = {
  images: string[];
  title: string;
};

export default function Carousel({ images, title }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStart = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const length = images.length;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + length) % Math.max(length, 1));
  const next = () => setIndex((i) => (i + 1) % Math.max(length, 1));

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    node.addEventListener('keydown', onKey);
    return () => node.removeEventListener('keydown', onKey);
  }, [length]);

  useEffect(() => {
    setIndex(0);
  }, [length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  if (length === 0) {
    return (
      <div className="glass-panel flex h-64 items-center justify-center rounded-2xl border border-white/10 text-center text-lg text-gray-200">
        <p>Drop images into the right folders to see the gallery.</p>
      </div>
    );
  }

  const showControls = length > 1;
  const slideHeight = isMobile ? 'h-72' : 'h-[420px]';

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="group relative focus:outline-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`relative mt-6 overflow-hidden rounded-2xl border border-white/10 shadow-glow ${slideHeight}`}>
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={showControls ? next : undefined}
              aria-label={`${title} slide ${i + 1}`}
              className="relative h-full w-full flex-shrink-0 focus:outline-none"
              style={{ cursor: showControls ? 'pointer' : 'default' }}
            >
              <Image
                src={src}
                alt={`${title} ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 60vw, (min-width: 768px) 75vw, 100vw"
                className="h-full w-full object-cover"
                priority={i === 0}
              />
            </button>
          ))}
        </div>

        {showControls && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white opacity-0 transition-opacity duration-200 hover:bg-black/55 focus:opacity-100 focus:outline-none group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white opacity-0 transition-opacity duration-200 hover:bg-black/55 focus:opacity-100 focus:outline-none group-hover:opacity-100"
            >
              ›
            </button>
          </>
        )}
      </div>

      {showControls && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-8 rounded-full transition-all duration-200 ${i === index ? 'bg-aurora' : 'bg-white/25'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
