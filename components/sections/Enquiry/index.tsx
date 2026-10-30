'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, BadgePercent, Calendar, ChevronDown, FileText, Headphones, Home, IndianRupee, Lock, Mail, MapPin, Phone, User } from 'lucide-react';
import type { EnquirySectionData } from '../../types';

const field = 'h-12 w-full rounded-xl border border-[#e6ebf2] bg-white pl-10 pr-3 text-[14px] text-[#163a66] outline-none placeholder:text-[#9aa6b5]';

function FieldSelect({
  icon: Icon,
  label,
  value,
  options,
  open,
  onToggle,
  onPick,
  required,
}: {
  icon: typeof User;
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onPick: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 z-[1] h-4 w-4 -translate-y-1/2 text-[#9aa6b5]" />
      <button type="button" onClick={onToggle} className={`${field} flex items-center pr-9 text-left ${value ? 'text-[#163a66]' : 'text-[#9aa6b5]'}`}>
        <span className="truncate">{value || label}</span>
      </button>
      <ChevronDown className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#163a66] transition ${open ? 'rotate-180' : ''}`} />
      {required && <input tabIndex={-1} required value={value} onChange={() => undefined} className="pointer-events-none absolute h-0 w-0 opacity-0" />}
      {open && (
        <motion.ul initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 right-0 top-[52px] z-20 overflow-hidden rounded-xl border border-[#e6ebf2] bg-white py-1 shadow-[0_16px_40px_rgba(22,58,102,0.12)]">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => onPick(option)}
                className={`flex h-10 w-full items-center px-4 text-left text-[14px] font-semibold ${option === value ? 'bg-[#fff1f2] text-[#e10600]' : 'text-[#163a66] hover:bg-[#f7f9fc]'}`}
              >
                {option}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

const icons: Record<string, typeof User> = {
  BadgePercent,
  FileText,
  MapPin,
  Home,
  Headphones,
};

export default function Enquiry({ data }: { data: EnquirySectionData }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', phone: '', email: '', looking: '', location: '', budget: '', timeline: '', message: '' });
  const [openMenu, setOpenMenu] = useState<'looking' | 'budget' | 'timeline' | null>(null);

  const setMessage = (value: string) => setForm({ ...form, message: value.slice(0, data.message_limit) });

  return (
    <section className="bg-[#f7f9fc] py-8 sm:py-10">
      <div className="mx-auto grid max-w-[1100px] items-start gap-5 px-4 lg:grid-cols-[1.4fr_0.8fr]">
        <motion.form
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={(event) => {
            event.preventDefault();
            router.push('/thank-you');
          }}
          className="rounded-3xl border border-[#e8eef6] bg-white p-5 shadow-[0_10px_30px_rgba(22,58,102,0.05)] sm:p-7"
        >
          <p className="text-[12px] font-extrabold tracking-[0.16em] text-[#e10600]">{data.subtitle}</p>
          <h2 className="mt-1 text-[26px] font-extrabold leading-tight text-[#163a66] sm:text-[32px]">{data.title}</h2>
          <p className="mt-2 text-[14px] leading-6 text-[#6b778c]">{data.description}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa6b5]" />
              <input required placeholder={data.name_placeholder} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={field} />
            </label>
            <label className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa6b5]" />
              <input required placeholder={data.phone_placeholder} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value.replace(/\D/g, '') })} className={field} />
            </label>
            <label className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa6b5]" />
              <input required type="email" placeholder={data.email_placeholder} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className={field} />
            </label>
            <FieldSelect
              icon={Home}
              label={data.looking_label}
              value={form.looking}
              options={data.looking_options}
              required
              open={openMenu === 'looking'}
              onToggle={() => setOpenMenu(openMenu === 'looking' ? null : 'looking')}
              onPick={(value) => {
                setForm({ ...form, looking: value });
                setOpenMenu(null);
              }}
            />
            <label className="relative sm:col-span-2">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa6b5]" />
              <input placeholder={data.location_placeholder} value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} className={field} />
            </label>
            <FieldSelect
              icon={IndianRupee}
              label={data.budget_label}
              value={form.budget}
              options={data.budget_options}
              open={openMenu === 'budget'}
              onToggle={() => setOpenMenu(openMenu === 'budget' ? null : 'budget')}
              onPick={(value) => {
                setForm({ ...form, budget: value });
                setOpenMenu(null);
              }}
            />
            <FieldSelect
              icon={Calendar}
              label={data.timeline_label}
              value={form.timeline}
              options={data.timeline_options}
              open={openMenu === 'timeline'}
              onToggle={() => setOpenMenu(openMenu === 'timeline' ? null : 'timeline')}
              onPick={(value) => {
                setForm({ ...form, timeline: value });
                setOpenMenu(null);
              }}
            />
            <label className="relative sm:col-span-2">
              <FileText className="absolute left-3 top-3.5 h-4 w-4 text-[#9aa6b5]" />
              <textarea placeholder={data.message_placeholder} value={form.message} onChange={(event) => setMessage(event.target.value)} className={`${field} h-24 py-3`} />
              <span className="absolute bottom-2 right-3 text-[12px] text-[#9aa6b5]">{form.message.length}/{data.message_limit}</span>
            </label>
          </div>

          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#e10600] text-[15px] font-semibold text-white">
            {data.button_text}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-[#8b97a8]">
            <Lock className="h-3.5 w-3.5" />
            {data.privacy}
          </p>
        </motion.form>

        <motion.aside initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl bg-[#eef4fb] p-6 sm:p-7">
          <h3 className="text-[24px] font-extrabold text-[#163a66]">{data.reasons_title}</h3>
          <ul className="mt-5 space-y-4">
            {data.reasons.map((reason, index) => {
              const Icon = icons[reason.icon] || BadgePercent;
              return (
                <motion.li key={reason.label} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="flex items-center gap-3 text-[15px] font-semibold text-[#163a66]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e10600] text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  {reason.label}
                </motion.li>
              );
            })}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}
