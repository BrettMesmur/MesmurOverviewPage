'use client';

import Image from 'next/image';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

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

  const prev = () => setIndex((i) => (i - 1 + length) % Math.max(length, 1));
  const next = () => setIndex((i) => (i + 1) % Math.max(length, 1));

  useEffect(() => {
    setIndex(0);
  }, [length]);

  const visibleIndexes = useMemo(() => {
    if (length === 0) return [];
    if (length === 1) return [0];
    if (isMobile) return [index];
    const left = (index - 1 + length) % length;
    const right = (index + 1) % length;
    return Array.from(new Set([left, index, right]));
  }, [index, length, isMobile]);

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

  const renderDesktop = () => {
    const leftIdx = (index - 1 + length) % length;
    const rightIdx = (index + 1) % length;
    const showControls = length > 1;

    return (
      <div className="relative mt-6 flex min-h-[420px] items-center justify-center gap-4">
        {visibleIndexes.map((idx) => {
          const position = idx === index ? 'center' : idx === leftIdx ? 'left' : 'right';
          const baseClasses =
            'relative transition-all duration-500 ease-out cursor-pointer rounded-2xl overflow-hidden border border-white/10 shadow-glow';
          const sizes = {
            left: 'w-1/4 scale-90 opacity-80 hover:opacity-100',
            center: 'w-2/5 scale-100 opacity-100 z-10',
            right: 'w-1/4 scale-90 opacity-80 hover:opacity-100',
          } as const;

          const onClick = position === 'left' ? prev : position === 'right' ? next : undefined;

          return (
            <button
              key={`${idx}-${position}`}
              aria-label={`${title} slide ${idx + 1}`}
              onClick={onClick}
              disabled={!onClick || !showControls}
              className={`${baseClasses} ${sizes[position]} bg-white/5 focus:outline-none focus:ring-2 focus:ring-aurora/70`}
            >
              <Image
                src={images[idx]}
                alt={`${title} ${idx + 1}`}
                width={900}
                height={600}
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 90vw"
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
        {showControls && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-100">Click sides to navigate</span>
          </div>
        )}
      </div>
    );
  };

  const renderMobile = () => (
    <div className="relative mt-6 w-full touch-pan-y focus:outline-none">
      <div className="overflow-hidden rounded-2xl border border-white/10 shadow-glow">
        <div className="relative h-72 w-full">
          <Image
            key={index}
            src={images[index]}
            alt={`${title} ${index + 1}`}
            fill
            sizes="100vw"
            className="h-full w-full object-cover transition-opacity duration-500"
          />
        </div>
      </div>
      {length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-6 rounded-full transition-all ${
                i === index ? 'bg-aurora' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="group relative"
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      {length === 1 && !isMobile && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 shadow-glow">
          <Image
            src={images[0]}
            alt={`${title} 1`}
            width={1200}
            height={700}
            sizes="(min-width: 1024px) 60vw, (min-width: 768px) 75vw, 90vw"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      {length === 1 && isMobile && renderMobile()}
      {length > 1 && (isMobile ? renderMobile() : renderDesktop())}
    </div>
  );
}
