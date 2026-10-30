'use client';

import { motion } from 'framer-motion';
import type { ClientsSectionData } from '../../types';

export default function Clients({ data }: { data: ClientsSectionData }) {
  if (!data) return null;
  const items = data.items || [];

  return (
    <section id="clients" className="relative overflow-x-hidden bg-[#fbfbf9] py-16 sm:py-20 scroll-mt-20 border-t border-[#071c19]/08">
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

        {/* Clients Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.name || index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 6) * 0.04, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group flex h-[92px] sm:h-[102px] items-center justify-center rounded-xl border border-[#c59d42]/15 bg-white p-4 shadow-[0_4px_16px_rgba(7,28,25,0.03)] transition-all duration-300 hover:border-[#c59d42]/50 hover:shadow-[0_8px_24px_rgba(197,157,66,0.12)] cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="max-h-[50px] sm:max-h-[56px] w-auto max-w-[85%] object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
