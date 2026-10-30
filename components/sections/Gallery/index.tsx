'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Play, Search, X } from 'lucide-react';
import type { GallerySectionData } from '../../types';

export default function Gallery({ data }: { data: GallerySectionData }) {
  const filters = data.filters?.length ? data.filters : ['All'];
  const [filter, setFilter] = useState(filters[0]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (filter === 'All' ? data.images : data.images.filter((item) => item.category === filter)),
    [data.images, filter],
  );
  const perPage = data.per_page || 12;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pages);
  const visible = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  const goToPage = (next: number) => {
    const target = Math.min(pages, Math.max(1, next));
    setPage(target);
    setOpen(null);
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  useEffect(() => {
    if (open === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const changeFilter = (name: string) => {
    setFilter(name);
    setPage(1);
    setOpen(null);
  };

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-[1100px] px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-6 max-w-2xl text-center">
          <div className="mb-1 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
            <p className="text-[13px] font-extrabold tracking-[0.18em] text-[#e10600]">{data.subtitle}</p>
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
          </div>
          <h2 className="text-[32px] font-black leading-none tracking-[-0.03em] text-[#163a66] sm:text-[42px]">
            {data.title_line1} <span className="text-[#e10600]">{data.title_highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-7 text-[#5b6b80]">{data.description}</p>
        </motion.div>

        <div className="relative z-20 mx-auto mb-6 w-full max-w-[280px] md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-12 w-full items-center justify-between rounded-full border border-[#e6ebf2] bg-white px-5 text-[14px] font-semibold text-[#163a66] shadow-[0_8px_24px_rgba(22,58,102,0.08)]"
          >
            {filter}
            <ChevronDown className={`h-4 w-4 transition ${menuOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute left-0 right-0 top-[54px] overflow-hidden rounded-2xl border border-[#e6ebf2] bg-white py-1.5 shadow-[0_16px_40px_rgba(22,58,102,0.12)]"
              >
                {filters.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      changeFilter(name);
                      setMenuOpen(false);
                    }}
                    className={`flex h-10 w-full items-center px-5 text-left text-[14px] font-semibold ${
                      name === filter ? 'bg-[#fff1f2] text-[#e10600]' : 'text-[#163a66]'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-6 hidden flex-wrap items-center justify-center gap-2.5 md:flex">
          {filters.map((name) => {
            const active = name === filter;
            return (
              <button
                key={name}
                type="button"
                onClick={() => changeFilter(name)}
                className={`h-10 rounded-full px-5 text-[14px] font-semibold transition ${
                  active ? 'bg-[#e10600] text-white' : 'border border-[#e6ebf2] bg-white text-[#163a66] hover:border-[#e10600] hover:text-[#e10600]'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        <div ref={gridRef} className="scroll-mt-24 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => {
            const itemIndex = (safePage - 1) * perPage + index;
            return (
              <motion.button
                key={`${safePage}-${item.src}-${itemIndex}`}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => setOpen(itemIndex)}
                className="group relative h-[210px] overflow-hidden rounded-2xl"
              >
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#163a66]/80 text-white">
                  {item.type === 'video' ? <Play className="h-4 w-4 fill-white" /> : <Search className="h-4 w-4" />}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            disabled={safePage === 1}
            onClick={() => goToPage(safePage - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#163a66] hover:bg-[#f4f7fb]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => goToPage(number)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-semibold ${
                number === safePage ? 'bg-[#e10600] text-white' : 'text-[#163a66] hover:bg-[#f4f7fb]'
              }`}
            >
              {number}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            disabled={safePage === pages}
            onClick={() => goToPage(safePage + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#163a66] hover:bg-[#f4f7fb]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open !== null && filtered[open] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-[#071018]/90 px-3"
                onClick={() => setOpen(null)}
              >
                <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#163a66]">
                  <X className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpen((current) => (current === null ? 0 : (current - 1 + filtered.length) % filtered.length));
                  }}
                  className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#163a66] sm:left-4 sm:h-11 sm:w-11"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} className="w-full max-w-5xl px-12" onClick={(event) => event.stopPropagation()}>
                  {filtered[open].type === 'video' ? (
                    <video
                      key={filtered[open].video || filtered[open].src}
                      src={filtered[open].video || filtered[open].src}
                      poster={filtered[open].src}
                      controls
                      autoPlay
                      playsInline
                      className="mx-auto max-h-[70vh] w-full rounded-2xl bg-black object-contain"
                    />
                  ) : (
                    <img key={filtered[open].src} src={filtered[open].src} alt={filtered[open].alt} className="mx-auto max-h-[70vh] w-full rounded-2xl object-contain" />
                  )}
                </motion.div>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpen((current) => (current === null ? 0 : (current + 1) % filtered.length));
                  }}
                  className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#163a66] sm:right-4 sm:h-11 sm:w-11"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
