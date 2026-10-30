'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AboutSectionData } from '../../types';

export default function About({ data, hideButton = false }: { data: AboutSectionData; hideButton?: boolean }) {
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

  return (
    <section id="about" className="relative overflow-hidden bg-[#f8faf9] py-12 sm:py-16 scroll-mt-20">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#c59d42]/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#071c19]/5 blur-2xl" />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[160px_minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8">
        {/* Left Badge */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <p className="text-[13px] font-bold tracking-[0.14em] text-[#071c19]">{data.badge_label}</p>
          <p className="mt-1 text-6xl font-extrabold leading-none text-[#c59d42]">{data.badge_value}</p>
          <p className="mt-2 text-[13px] font-bold tracking-[0.12em] text-[#071c19]">{data.badge_note}</p>
          <span className="mx-auto mt-3 block h-[3px] w-12 rounded-full bg-[#c59d42] lg:mx-0" />
        </motion.div>

        {/* Center Architectural Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative order-1 mx-auto w-full max-w-[400px] lg:order-2"
        >
          <svg viewBox="0 0 480 420" className="pointer-events-none absolute -left-8 -top-6 h-[115%] w-[115%] text-[#c59d42]/40" fill="none" aria-hidden>
            <path d="M40 360C120 300 80 80 250 40" stroke="currentColor" strokeWidth="2" />
            <path d="M300 390C420 340 460 180 390 70" stroke="currentColor" strokeWidth="2" />
          </svg>
          <img
            src={data.image}
            alt={data.title_line1}
            className="relative h-[340px] w-full -rotate-3 rounded-[28px] object-cover shadow-[0_20px_45px_rgba(7,28,25,0.14)] sm:h-[440px] border-2 border-white"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-3"
        >
          <h2 className="text-[28px] font-black leading-[1.18] text-[#071c19] sm:text-[34px]">
            {data.title_line1}
            <span className="mt-1 block text-[#c59d42]">{data.title_highlight}</span>
          </h2>
          <span className="mt-3 block h-[3.5px] w-14 rounded-full bg-[#c59d42]" />
          <p className="mt-4 text-[15px] leading-7 text-[#334155]">{data.description}</p>
          <p className="mt-3 text-[15px] leading-7 text-[#334155]">{data.description_secondary}</p>
          {!hideButton && data.button && (
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6 w-fit">
              <a
                href={data.button.href || '#contact'}
                onClick={(e) => handleNavClick(e, data.button.href || '#contact')}
                className="group inline-flex items-center gap-3 rounded-full bg-[#c59d42] py-2.5 pl-6 pr-2.5 text-sm font-bold text-white shadow-md shadow-[#c59d42]/25 transition hover:bg-[#b08b35]"
              >
                <span>{data.button.text}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#c59d42] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
