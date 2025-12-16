'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type CarouselProps = {
  images: string[];
  title: string;
};

const MOBILE_BREAKPOINT = 768;

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
  });

  useEffect(() => {
    setIndex(0);
  }, [length]);

  const prev = () => {
    if (length <= 1) return;
    setIndex((i) => (i - 1 + length) % length);
  };

  const next = () => {
    if (length <= 1) return;
    setIndex((i) => (i + 1) % length);
  };

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
      <div className="glass-panel mt-8 flex h-64 items-center justify-center rounded-3xl text-center text-sm md:text-base text-gray-100">
        Drop images into the proper folders to see them appear here.
      </div>
    );
  }

  const renderDesktop = () => {
    const leftIdx = (index - 1 + length) % length;
    const rightIdx = (index + 1) % length;
    const showControls = length > 1;

    const positions: Record<'left' | 'center' | 'right', string> = {
      left: 'md:-translate-x-6 -rotate-1 w-[38%] lg:w-[32%] opacity-80',
      center: 'z-20 w-[54%] lg:w-[56%] shadow-glow',
      right: 'md:translate-x-6 rotate-1 w-[38%] lg:w-[32%] opacity-80',
    };

    return (
      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-plate" />
        <div className="relative flex min-h-[420px] items-center justify-center px-6">
          {visibleIndexes.map((idx) => {
            const position = idx === index ? 'center' : idx === leftIdx ? 'left' : 'right';
            const isDisabled = !showControls || position === 'center';
            const onClick = position === 'left' ? prev : position === 'right' ? next : undefined;

            return (
              <button
                key={`${idx}-${position}`}
                aria-label={`${title} slide ${idx + 1}`}
                onClick={onClick}
                disabled={isDisabled}
                className={`group absolute overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-aurora/70 ${positions[position]}`}
              >
                <Image
                  src={images[idx]}
                  alt={`${title} ${idx + 1}`}
                  width={1200}
                  height={760}
                  sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, (min-width: 768px) 60vw"
                  className={`h-full w-full object-cover transition duration-500 ${position === 'center' ? 'scale-100' : 'scale-95 group-hover:scale-100 group-hover:opacity-100'} ${position !== 'center' ? 'opacity-80' : ''}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
              </button>
            );
          })}
          {showControls && (
            <div className="absolute -bottom-4 flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-200">
              Click sides to navigate
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMobile = () => (
    <div className="mt-8 w-full" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-plate shadow-glow">
        <div className="relative h-72 w-full">
          <Image
            key={index}
            src={images[index]}
            alt={`${title} ${index + 1}`}
            fill
            sizes="100vw"
            className="h-full w-full object-cover"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/40" />
        </div>
      </div>
      {length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-6 rounded-full transition-all ${i === index ? 'bg-aurora' : 'bg-white/25'}`}
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
      className="group relative outline-none"
      aria-label={`${title} carousel`}
    >
      {length === 1 && !isMobile && (
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-plate shadow-glow">
          <Image
            src={images[0]}
            alt={`${title} 1`}
            width={1400}
            height={840}
            sizes="(min-width: 1024px) 60vw, (min-width: 768px) 72vw, 90vw"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />
        </div>
      )}
      {length === 1 && isMobile && renderMobile()}
      {length > 1 && (isMobile ? renderMobile() : renderDesktop())}
    </div>
  );
}
