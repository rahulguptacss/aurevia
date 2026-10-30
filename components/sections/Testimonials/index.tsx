'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TestimonialsSectionData } from '../../types';

export default function Testimonials({ data }: { data: TestimonialsSectionData }) {
  const items = data?.items || [];
  const total = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive perView detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setPerView(2); // Tablet: 2 cards
      } else {
        setPerView(3); // Desktop: 3 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, total - perView);

  // Keep currentIndex inside valid range if viewport resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const next = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex, total]);

  const prev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex, total]);

  const goTo = (idx: number) => {
    setCurrentIndex(Math.min(Math.max(0, idx), maxIndex));
  };

  // Auto-play every 5s (pauses on hover)
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, next]);

  // Touch Swipe for Mobile & Tablet
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 45) {
        next();
      } else if (distance < -45) {
        prev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  if (!data || items.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="relative overflow-x-hidden bg-[#f8faf9] py-16 sm:py-20 scroll-mt-20 border-t border-[#071c19]/08"
    >
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          {data.subtitle && (
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 rounded-full bg-[#c59d42]" />
              <p className="text-[13px] font-extrabold tracking-[0.22em] text-[#c59d42] uppercase">
                {data.subtitle}
              </p>
              <span className="h-[2px] w-8 rounded-full bg-[#c59d42]" />
            </div>
          )}

          <h2 className="text-[34px] font-black leading-tight tracking-[-0.02em] text-[#071c19] sm:text-[44px]">
            {data.title_line1} <span className="block text-[#c59d42]">{data.title_highlight}</span>
          </h2>

          {data.description && (
            <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-7 text-[#475569]">
              {data.description}
            </p>
          )}
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative px-0 sm:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop Left Arrow */}
          {maxIndex > 0 && (
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={prev}
              className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center h-11 w-11 rounded-full border border-[#c59d42]/30 bg-white text-[#071c19] shadow-[0_8px_20px_rgba(7,28,25,0.08)] transition-all duration-300 hover:border-[#c59d42] hover:bg-[#c59d42] hover:text-[#071c19] sm:flex cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Desktop Right Arrow */}
          {maxIndex > 0 && (
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={next}
              className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center h-11 w-11 rounded-full border border-[#c59d42]/30 bg-white text-[#071c19] shadow-[0_8px_20px_rgba(7,28,25,0.08)] transition-all duration-300 hover:border-[#c59d42] hover:bg-[#c59d42] hover:text-[#071c19] sm:flex cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Track Viewport */}
          <div
            className="overflow-hidden py-3"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * (100 / perView)}%)`,
              }}
            >
              {items.map((item, index) => {
                const avatarSrc = item.image || (item as any).avatar || '/testimonail/amit.webp';
                const quoteText = item.quote || (item as any).text || '';
                const itemTitle = (item as any).title || item.role;

                return (
                  <div
                    key={item.name || index}
                    className="shrink-0 px-2 sm:px-3"
                    style={{ width: `${100 / perView}%` }}
                  >
                    <div className="relative flex h-full min-h-[300px] sm:min-h-[320px] flex-col justify-between rounded-2xl border border-[#c59d42]/20 bg-white p-6 sm:p-7 shadow-[0_8px_24px_rgba(7,28,25,0.04)] transition-all duration-300 hover:border-[#c59d42]/50 hover:shadow-[0_12px_32px_rgba(197,157,66,0.12)]">
                      <div>
                        {/* Rating & Quote Icon */}
                        <div className="flex items-center justify-between">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c59d42]/15 text-[#c59d42]">
                            <Quote className="h-4 w-4" />
                          </span>
                          <div className="flex items-center gap-1 text-[#c59d42]">
                            {[...Array(item.rating || 5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-[#c59d42] text-[#c59d42]" />
                            ))}
                          </div>
                        </div>

                        {itemTitle && (
                          <h3 className="mt-4 text-[16px] font-bold text-[#071c19] line-clamp-1">
                            {itemTitle}
                          </h3>
                        )}

                        <p className="mt-3 text-[14px] sm:text-[14.5px] leading-relaxed text-slate-600 italic">
                          "{quoteText}"
                        </p>
                      </div>

                      {/* Client Avatar & Name */}
                      <div className="mt-6 flex items-center gap-3.5 border-t border-[#071c19]/08 pt-4">
                        <img
                          src={avatarSrc}
                          alt={item.name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-[#c59d42] shadow-sm shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-[15px] font-bold text-[#071c19]">{item.name}</p>
                          <p className="truncate text-[12.5px] font-medium text-[#c59d42]">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        {maxIndex > 0 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {[...Array(maxIndex + 1)].map((_, dot) => (
              <button
                key={dot}
                type="button"
                aria-label={`Go to slide ${dot + 1}`}
                onClick={() => goTo(dot)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  dot === currentIndex ? 'w-8 bg-[#c59d42]' : 'w-2.5 bg-[#071c19]/20 hover:bg-[#071c19]/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Mobile Arrow Controls (Below cards on phone screens) */}
        {maxIndex > 0 && (
          <div className="mt-4 flex justify-center gap-3 sm:hidden">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#071c19] border border-[#c59d42]/30 shadow-md active:bg-[#c59d42] active:text-[#071c19]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#071c19] border border-[#c59d42]/30 shadow-md active:bg-[#c59d42] active:text-[#071c19]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
