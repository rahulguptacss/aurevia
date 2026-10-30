'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Mail, MapPin, Phone, Plus, Send } from 'lucide-react';
import type { ContactSectionData } from '../../types';

const fieldClass =
  'h-12 w-full rounded-xl border border-[#071c19]/15 bg-[#f8faf9] px-4 text-[14px] text-[#071c19] outline-none placeholder:text-[#64748b] focus:border-[#c59d42] focus:bg-white transition-all';

export default function Contact({ data }: { data: ContactSectionData }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="bg-[#f8faf9] py-14 sm:py-20 scroll-mt-20 border-t border-[#071c19]/08">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#c59d42]" />
            <p className="text-[13px] font-extrabold tracking-[0.18em] text-[#c59d42] uppercase">{data.subtitle}</p>
            <span className="h-[2px] w-8 rounded-full bg-[#c59d42]" />
          </div>
          <h2 className="text-[34px] font-black leading-tight tracking-[-0.02em] text-[#071c19] sm:text-[44px]">
            {data.title_line1} <span className="text-[#c59d42]">{data.title_highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-[15px] leading-7 text-[#475569]">{data.description}</p>
        </motion.div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          {/* Office & Concierge Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[28px] p-7 text-white sm:p-9 shadow-xl"
          >
            <img src={data.image || '/img/contact.webp'} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[#071c19]/92 backdrop-blur-xs" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="inline-block rounded-full bg-[#c59d42]/20 px-3.5 py-1 text-[11px] font-bold tracking-widest text-[#c59d42] uppercase border border-[#c59d42]/30 mb-3">
                  Aurevia HQ
                </span>
                <h3 className="text-[26px] font-extrabold text-white sm:text-[28px]">{data.office_title}</h3>
                <p className="mt-2.5 max-w-[420px] text-[14px] leading-relaxed text-white/80">{data.office_text}</p>
              </div>

              <ul className="mt-8 space-y-6">
                <motion.li
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#c59d42] text-[#071c19] shadow-md">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="block text-[15px] font-bold text-white">{data.address_label}</span>
                    <span className="mt-0.5 block text-[13.5px] leading-6 text-white/80">{data.address}</span>
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 }}
                  className="flex gap-4 items-start"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#c59d42] text-[#071c19] shadow-md">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="block text-[15px] font-bold text-white">{data.phone_label}</span>
                    <a href={`tel:${data.phone.replace(/[^\d+]/g, '')}`} className="mt-0.5 block text-[13.5px] text-white/85 hover:text-[#c59d42] transition-colors">
                      {data.phone}
                    </a>
                    {data.phone_secondary && (
                      <a href={`tel:${data.phone_secondary.replace(/[^\d+]/g, '')}`} className="block text-[13.5px] text-white/85 hover:text-[#c59d42] transition-colors">
                        {data.phone_secondary}
                      </a>
                    )}
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.26 }}
                  className="flex gap-4 items-start"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#c59d42] text-[#071c19] shadow-md">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="block text-[15px] font-bold text-white">{data.email_label}</span>
                    <a href={`mailto:${data.email}`} className="mt-0.5 block text-[13.5px] text-white/85 hover:text-[#c59d42] transition-colors">
                      {data.email}
                    </a>
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.34 }}
                  className="flex gap-4 items-start"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#c59d42] text-[#071c19] shadow-md">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="block text-[15px] font-bold text-white">{data.hours_label}</span>
                    <span className="mt-0.5 block text-[13.5px] text-white/80">{data.hours}</span>
                    {data.hours_secondary && <span className="block text-[13.5px] text-white/80">{data.hours_secondary}</span>}
                  </div>
                </motion.li>
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-[#071c19]/10 bg-white p-7 sm:p-9 shadow-lg flex flex-col justify-between"
          >
            <div>
              <h3 className="text-[26px] font-black text-[#071c19] sm:text-[28px]">{data.form_title || 'Schedule A Private Consultation'}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#475569]">
                {data.form_subtitle || 'Fill in your details below and our senior luxury property advisor will contact you within 2 business hours.'}
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 rounded-2xl bg-[#c59d42]/10 p-6 text-center border border-[#c59d42]/30"
                >
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#c59d42]" />
                  <h4 className="mt-3 text-[18px] font-bold text-[#071c19]">Request Submitted Successfully!</h4>
                  <p className="mt-1.5 text-[14px] text-[#475569]">
                    Thank you. An Aurevia Senior Relationship Partner will contact you shortly.
                  </p>
                </motion.div>
              ) : (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Your Full Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={fieldClass}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={fieldClass}
                  />
                  <input
                    required
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                    className={fieldClass}
                  />
                  <input
                    placeholder="Preferred Property / Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={fieldClass}
                  />
                  <div className="sm:col-span-2">
                    <textarea
                      required
                      placeholder="Your Requirements or Message *"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${fieldClass} h-28 py-3`}
                    />
                  </div>
                </div>
              )}
            </div>

            {!submitted && (
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-[#c59d42] py-2.5 pl-6 pr-2 text-[14px] font-bold text-white shadow-md shadow-[#c59d42]/25 transition hover:bg-[#b08b35] cursor-pointer"
              >
                <span>{data.button_text || 'Submit Request'}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#c59d42]">
                  <Send className="h-4 w-4" />
                </span>
              </motion.button>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
