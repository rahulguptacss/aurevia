'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Check, Home, Tag, User } from 'lucide-react';
import type { BlogDetailsItem, BlogDetailsSectionData } from '../../types';

export default function BlogDetails({ post, blogs }: { post: BlogDetailsItem; blogs: BlogDetailsSectionData }) {
  const related = blogs.items.filter((item) => item.slug !== post.slug).slice(0, 5);

  return (
    <section className="bg-white py-6 sm:py-10">
      <div className="mx-auto grid max-w-[1100px] gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0">
          <motion.img
            src={post.image}
            alt={post.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[200px] w-full rounded-2xl object-cover sm:h-[340px]"
          />
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#5c6b80] sm:gap-x-5 sm:text-[14px]">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e10600] text-white">
                <Calendar className="h-3.5 w-3.5" />
              </span>
              {post.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e10600] text-white">
                <User className="h-3.5 w-3.5" />
              </span>
              By {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e10600] text-white">
                <Tag className="h-3.5 w-3.5" />
              </span>
              {post.category.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}
            </span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-4 text-[24px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#163a66] sm:text-[34px]">
            {post.title}
          </motion.h2>
          <span className="mt-3 block h-[3px] w-12 rounded-full bg-[#e10600]" />
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#6b778c]">
            {post.content.map((paragraph, index) => (
              <motion.p key={paragraph} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                {paragraph}
              </motion.p>
            ))}
          </div>
          <motion.h3 initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mt-6 flex items-center gap-2 text-[15px] font-bold text-[#e10600]">
            <span className="h-[2px] w-5 rounded-full bg-[#e10600]" />
            {post.work_title}
          </motion.h3>
          <h4 className="mt-2 text-[20px] font-extrabold text-[#163a66] sm:text-[22px]">{post.procedure_title}</h4>
          <p className="mt-2 text-[15px] leading-7 text-[#6b778c]">{post.procedure}</p>
          <ul className="mt-4 space-y-2.5">
            {post.points.map((point, index) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="flex items-start gap-2.5 text-[14px] font-semibold leading-6 text-[#163a66] sm:text-[15px]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e10600] text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </motion.li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {post.gallery.map((src, index) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className="h-[180px] w-full rounded-2xl object-cover sm:h-[200px]"
              />
            ))}
          </div>
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#6b778c]">
            {post.after.map((paragraph) => (
              <motion.p key={paragraph} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {paragraph}
              </motion.p>
            ))}
          </div>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-[#e6ebf2] p-4">
            <h3 className="text-[20px] font-extrabold text-[#163a66] sm:text-[22px]">{blogs.sidebar.related_title}</h3>
            <span className="mt-2 block h-[3px] w-10 rounded-full bg-[#e10600]" />
            <div className="mt-5 space-y-4">
              {related.map((item, index) => (
                <motion.div key={item.slug} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <Link href={`/blog/${item.slug}`} className="flex gap-3">
                    <img src={item.image} alt="" className="h-16 w-[76px] shrink-0 rounded-xl object-cover sm:h-[72px] sm:w-[84px]" />
                    <span className="min-w-0">
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-[#8b97a8]">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.date}
                      </span>
                      <span className="mt-1 block text-[14px] font-extrabold leading-snug text-[#163a66]">{item.title}</span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mt-6 overflow-hidden rounded-2xl px-5 py-7 text-white">
            <img src={blogs.sidebar.promo_image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[#0c2348]/82" />
            <span className="absolute -left-7 -top-7 h-16 w-16 rotate-45 bg-[#e10600]" />
            <span className="absolute -bottom-8 -right-8 h-20 w-20 rotate-45 bg-[#e10600]" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e10600]">
                <Home className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[22px] font-extrabold leading-tight sm:text-[24px]">{blogs.sidebar.promo_title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-white/80">{blogs.sidebar.promo_description}</p>
              <Link href={blogs.sidebar.promo_button.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e10600] px-5 py-2.5 text-[14px] font-semibold text-white">
                {blogs.sidebar.promo_button.text}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </aside>
      </div>
    </section>
  );
}
