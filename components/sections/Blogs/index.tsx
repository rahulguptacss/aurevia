'use client';

import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogsSectionData } from '../../types';

export default function Blogs({ data, limit, showButton = true }: { data: BlogsSectionData; limit?: number; showButton?: boolean }) {
  const items = limit ? data.items.slice(0, limit) : data.items;

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
    <section id="blogs" className="relative overflow-hidden bg-white py-14 sm:py-18 scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full bg-[#c59d42]/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-10 bottom-10 h-44 w-44 rounded-full bg-[#071c19]/08 blur-3xl" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#c59d42]" />
            <p className="text-[13px] font-extrabold tracking-[0.22em] text-[#c59d42] uppercase">{data.subtitle}</p>
            <span className="h-[2px] w-8 rounded-full bg-[#c59d42]" />
          </div>
          <h2 className="text-[34px] font-black leading-tight tracking-[-0.02em] text-[#071c19] sm:text-[44px]">
            {data.title_line1} <span className="text-[#c59d42]">{data.title_highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-7 text-[#475569]">{data.description}</p>
        </div>

        {/* Blog Cards Grid */}
        <div className="mx-auto grid max-w-[1080px] gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[24px] border border-[#071c19]/10 bg-white shadow-[0_8px_24px_rgba(7,28,25,0.06)] hover:shadow-xl transition-all duration-300 hover:border-[#c59d42]/40"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[190px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3.5 top-3.5 rounded-full bg-[#c59d42] px-3 py-1 text-[11px] font-bold tracking-wide text-white shadow-md">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-[17px] font-extrabold leading-snug text-[#071c19] group-hover:text-[#c59d42] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[#475569] line-clamp-2">{item.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-[#071c19]/08 pt-3">
                  <p className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#64748b]">
                    <Calendar className="h-3.5 w-3.5 text-[#c59d42]" />
                    {item.date}
                  </p>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href="#contact"
                      onClick={(e) => handleNavClick(e, '#contact')}
                      aria-label={`Read ${item.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071c19] text-white transition-colors hover:bg-[#c59d42]"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Action Button */}
        {showButton && data.button && (
          <div className="mt-10 flex justify-center">
            <a
              href={data.button.href || '#contact'}
              onClick={(e) => handleNavClick(e, data.button.href || '#contact')}
              className="inline-flex items-center gap-3 rounded-full border border-[#c59d42]/40 bg-white py-2 pl-6 pr-2 text-[14px] font-bold text-[#071c19] shadow-sm transition hover:border-[#c59d42] hover:bg-[#c59d42]/5"
            >
              <span>{data.button.text}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c59d42] text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
