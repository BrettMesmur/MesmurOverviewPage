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
    const showControls = length > 1;

    const slideOffset = (idx: number) => {
      if (length === 1) return 0;
      if ((index - idx + length) % length === 1) return -1; // immediate left
      if ((idx - index + length) % length === 1) return 1; // immediate right
      return null;
    };

    return (
      <div className="relative mt-6 min-h-[420px] overflow-hidden">
        {images.map((src, idx) => {
          const offset = slideOffset(idx);
          if (offset === null) {
            return null;
          }

          const isActive = offset === 0;
          const translate = offset * 110;
          const onClick = offset === -1 ? prev : offset === 1 ? next : undefined;

          return (
            <button
              key={idx}
              aria-label={`${title} slide ${idx + 1}`}
              onClick={onClick}
              disabled={!onClick || !showControls}
              className="absolute inset-0 mx-auto flex w-full max-w-5xl items-center justify-center focus:outline-none focus:ring-2 focus:ring-aurora/70"
              style={{
                transform: `translateX(${translate}%) scale(${isActive ? 1 : 0.9})`,
                opacity: isActive ? 1 : 0.82,
                pointerEvents: isActive || showControls ? 'auto' : 'none',
                transition: 'transform 500ms ease-out, opacity 500ms ease-out',
              }}
            >
              <div className="w-4/5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-glow">
                <Image
                  src={src}
                  alt={`${title} ${idx + 1}`}
                  width={900}
                  height={600}
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 90vw"
                  className="h-full w-full object-cover"
                />
              </div>
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
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="relative h-72 w-full flex-shrink-0">
              <Image
                src={src}
                alt={`${title} ${i + 1}`}
                fill
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
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
