'use client';

import { useState } from 'react';
import { ArrowRight, Bath, BedDouble, Heart, MapPin, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PropertiesSectionData } from '../../types';

export default function Properties({ data, limit }: { data: PropertiesSectionData; limit?: number }) {
  const items = limit ? data.items.slice(0, limit) : data.items;
  const [saved, setSaved] = useState<string[]>([]);

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
    <section id="properties" className="bg-white py-14 sm:py-18 scroll-mt-20">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#c59d42]" />
            <p className="text-[13px] font-extrabold tracking-[0.22em] text-[#c59d42] uppercase">{data.subtitle}</p>
            <span className="h-[2px] w-8 rounded-full bg-[#c59d42]" />
          </div>
          <h2 className="text-[34px] font-black leading-tight tracking-[-0.02em] text-[#071c19] sm:text-[44px]">
            {data.title_line1} <span className="text-[#c59d42]">{data.title_highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-7 text-[#475569]">{data.description}</p>
        </motion.div>

        {/* Property Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const liked = saved.includes(item.slug);
            const isExclusive = item.status === 'Exclusive' || item.status === 'Private Estate' || item.status === 'Limited Edition';

            return (
              <motion.article
                key={item.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-[24px] border border-[#071c19]/10 bg-white shadow-[0_10px_30px_rgba(7,28,25,0.06)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(7,28,25,0.12)] hover:border-[#c59d42]/40"
              >
                {/* Image & Badges */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[230px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3.5 py-1 text-[11px] font-bold text-white shadow-md ${
                      isExclusive ? 'bg-[#c59d42]' : 'bg-[#071c19]'
                    }`}
                  >
                    {item.status}
                  </span>
                  <button
                    type="button"
                    aria-label="Save property to wishlist"
                    onClick={() =>
                      setSaved((current) =>
                        current.includes(item.slug) ? current.filter((slug) => slug !== item.slug) : [...current, item.slug]
                      )
                    }
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#071c19] shadow-md backdrop-blur-xs transition hover:scale-110 cursor-pointer"
                  >
                    <Heart className={`h-4 w-4 ${liked ? 'fill-[#c59d42] text-[#c59d42]' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[17px] font-extrabold text-[#071c19] group-hover:text-[#c59d42] transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-right shrink-0">
                      <p className="text-[17px] font-extrabold text-[#c59d42]">{item.price}</p>
                      <p className="text-[11px] leading-none text-[#64748b]">{item.price_note}</p>
                    </div>
                  </div>

                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#475569]">
                    <MapPin className="h-3.5 w-3.5 text-[#c59d42] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>

                  <div className="mt-4 flex items-center gap-3 border-t border-[#071c19]/08 pt-3 text-[12px] font-semibold text-[#071c19]">
                    <span className="inline-flex items-center gap-1">
                      <BedDouble className="h-3.5 w-3.5 text-[#c59d42]" />
                      {item.beds}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5 text-[#c59d42]" />
                      {item.baths}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Ruler className="h-3.5 w-3.5 text-[#c59d42]" />
                      {item.area}
                    </span>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="ml-auto">
                      <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        aria-label={`Inquire about ${item.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071c19] text-white transition-colors hover:bg-[#c59d42]"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
