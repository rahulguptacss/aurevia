'use client';

import { Gem, Handshake, Headphones, Home, LineChart, MapPin, Settings, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { WhyChooseSectionData } from '../../types';

const icons = { Home, Handshake, Users, LineChart, MapPin, ShieldCheck, Settings, Headphones, Gem };

export default function WhyChoose({ data }: { data: WhyChooseSectionData }) {
  return (
    <section className="bg-[#f7fbff] py-6 sm:py-8">
      <div className="mx-auto max-w-[1180px] px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-6 max-w-3xl text-center">
          <div className="mb-1 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
            <p className="text-[13px] font-extrabold tracking-[0.18em] text-[#163a66]">{data.subtitle}</p>
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
          </div>
          <h2 className="text-[30px] font-black leading-none tracking-[-0.03em] text-[#163a66] sm:text-[40px]">
            {data.title_line1} <span className="text-[#e10600]">{data.title_highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-7 text-[#5b6b80]">{data.description}</p>
        </motion.div>

        <div className="grid items-stretch gap-4 lg:grid-cols-[280px_1fr]">
          <motion.img
            src={data.image}
            alt=""
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="h-[240px] w-full rounded-[22px] object-cover lg:h-full"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item, index) => {
              const Icon = icons[item.icon as keyof typeof icons] || Home;
              const blue = index % 2 === 1;
              return (
                <motion.article
                  key={item.title_highlight}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="flex gap-3 rounded-2xl border border-[#e8eef6] bg-white p-3.5"
                >
                  <motion.span whileHover={{ scale: 1.08 }} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${blue ? 'bg-[#e8f0fb] text-[#1d4f9c]' : 'bg-[#ffe8ea] text-[#e10600]'}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </motion.span>
                  <div>
                    <h3 className="text-[15px] font-extrabold leading-5 text-[#163a66]">
                      {item.title} <span className="text-[#e10600]">{item.title_highlight}</span>
                    </h3>
                    <span className="mt-1 block h-[2px] w-8 rounded-full bg-[#e10600]" />
                    <p className="mt-1.5 text-[12px] leading-5 text-[#5b6b80]">{item.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
