'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
  Building2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Home as HomeIcon,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { HeroSectionData, HeroSlideData } from '../../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Sparkles,
  Home: HomeIcon,
  ShieldCheck,
  Eye,
  Award,
};

export default function Hero({ data }: { data: HeroSectionData }) {
  const slides: HeroSlideData[] =
    data.slides && data.slides.length > 0 ? data.slides : [data];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Auto slide effect (every 6 seconds, paused when hovering)
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Mobile Touch Swipe Handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const slide = slides[current];

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative flex items-center min-h-[560px] sm:min-h-[620px] lg:min-h-[560px] lg:h-[600px] xl:h-[640px] overflow-hidden select-none bg-[#071c19] scroll-mt-20"
    >
      {/* BACKGROUND IMAGE SLIDER WITH LUXURY TRANSITION */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={slide.image}
            src={slide.image}
            alt={slide.title_line1}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 h-full w-full object-cover object-center sm:object-center"
          />
        </AnimatePresence>

        {/* Sophisticated Architectural Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071C19]/95 via-[#071C19]/80 to-[#071C19]/30 sm:via-[#071C19]/70 sm:to-[#071C19]/20 lg:from-[#071C19]/92 lg:via-[#071C19]/60 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071C19] via-transparent to-[#071C19]/40" />
      </div>

      {/* MAIN HERO CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pt-10 pb-24 sm:px-6 sm:py-20 lg:py-16 lg:px-8">
        <div className="max-w-[720px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#c59d42]/50 bg-[#071c19]/75 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md shadow-lg">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#c59d42]" />
                <span className="text-[10px] sm:text-[12px] font-extrabold tracking-[0.18em] sm:tracking-[0.2em] text-[#c59d42] uppercase">
                  {slide.eyebrow}
                </span>
              </div>

              {/* Grand Headline */}
              <h1 className="mt-3 sm:mt-4 text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] font-black leading-[1.12] sm:leading-[1.08] tracking-tight text-white">
                {slide.title_line1}
                <span className="block mt-1 sm:mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#f5d77f] via-[#c59d42] to-[#e6c257] drop-shadow-sm">
                  {slide.title_highlight}
                </span>
              </h1>

              {/* Description Paragraph */}
              <p className="mt-2.5 sm:mt-3.5 text-[13.5px] sm:text-[15px] lg:text-[16px] leading-relaxed text-white/85 max-w-[600px] font-normal line-clamp-3 sm:line-clamp-none">
                {slide.description}
              </p>

              {/* Feature Highlights Badges */}
              {slide.features && slide.features.length > 0 && (
                <div className="mt-3.5 sm:mt-5 flex flex-wrap gap-2 sm:gap-3">
                  {slide.features.map((item, idx) => {
                    const IconComponent = iconMap[item.icon] || Sparkles;
                    return (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 sm:px-3.5 sm:py-2 backdrop-blur-md shadow-sm"
                      >
                        <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#c59d42]/20 text-[#c59d42]">
                          <IconComponent className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </span>
                        <span className="text-[11.5px] sm:text-[13px] font-bold text-white/95">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Dual Action CTAs */}
              <div className="mt-5 sm:mt-7 flex flex-row flex-wrap items-center gap-2.5 sm:gap-4">
                {slide.primary_button && (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-auto">
                    <a
                      href={slide.primary_button.href || '#properties'}
                      onClick={(e) => handleNavClick(e, slide.primary_button.href || '#properties')}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c59d42] px-5 sm:px-7 py-2.5 sm:py-3 text-[13px] sm:text-[14.5px] font-bold text-white shadow-xl shadow-[#c59d42]/30 transition hover:bg-[#b08b35] active:bg-[#997422] cursor-pointer"
                    >
                      <span>{slide.primary_button.text}</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                  </motion.div>
                )}

                {slide.secondary_button && (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-auto">
                    <a
                      href={slide.secondary_button.href || '#contact'}
                      onClick={(e) => handleNavClick(e, slide.secondary_button.href || '#contact')}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-[14.5px] font-bold text-white backdrop-blur-md transition hover:bg-white/20 active:bg-white/5 cursor-pointer"
                    >
                      <span>{slide.secondary_button.text}</span>
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* MODERN FLOATING SLIDER CONTROLS (RESPONSIVE) */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 lg:bottom-6 lg:right-8 z-20 flex items-center justify-between sm:justify-start gap-2.5 sm:gap-4 rounded-2xl border border-white/20 bg-[#071c19]/85 px-3 py-2 sm:px-5 sm:py-2.5 backdrop-blur-md shadow-2xl">
        {/* Slide Counter */}
        <div className="flex items-baseline gap-1 text-white">
          <span className="text-base sm:text-2xl font-black text-[#c59d42]">0{current + 1}</span>
          <span className="text-[11px] sm:text-sm font-semibold text-white/50">/ 0{slides.length}</span>
        </div>

        <div className="h-5 sm:h-6 w-px bg-white/20" />

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Jump to slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current
                  ? 'w-5 sm:w-8 bg-[#c59d42] shadow-[0_0_10px_rgba(197,157,66,0.8)]'
                  : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <div className="h-5 sm:h-6 w-px bg-white/20" />

        {/* Circular Arrow Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prevSlide}
            className="flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-[#c59d42] hover:border-[#c59d42] active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-[#c59d42] hover:border-[#c59d42] active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
