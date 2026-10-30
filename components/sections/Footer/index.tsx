'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { FooterData } from '../../types';

function SocialIcon({ name }: { name: string }) {
  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === 'Linkedin') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M6.5 9H4V20h2.5V9zM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4zM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.3 0 4 1.5 4 4.8V20z" />
      </svg>
    );
  }
  if (name === 'Youtube') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function Column({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="border-t border-white/10 lg:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3 text-left lg:cursor-default lg:py-0"
        aria-expanded={open}
      >
        <span>
          <span className="text-[17px] font-bold text-white tracking-wide">{title}</span>
          <span className={`mt-2 h-[3px] w-8 rounded-full bg-[#c59d42] ${open ? 'block' : 'hidden'} lg:block`} />
        </span>
        <ChevronDown className={`h-5 w-5 text-[#c59d42] transition-transform duration-300 lg:hidden ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} lg:grid-rows-[1fr]`}>
        <div className="overflow-hidden">
          <div className="pb-2 pt-1 lg:pb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Footer({ data }: { data: FooterData }) {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (key: string) => setOpen((current) => (current === key ? null : key));

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
    <footer className="relative overflow-hidden text-white bg-[#071c19]">
      <img
        src={data.background || '/img/footerbg.webp'}
        alt=""
        className="pointer-events-none absolute left-0 top-0 h-[920px] w-full object-cover object-top opacity-20 sm:h-[560px]"
      />
      <div className="absolute inset-0 bg-[#071c19]/95" />

      <div className="relative mx-auto grid max-w-[1240px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_0.9fr_1fr_1.1fr] lg:gap-10">
        {/* Brand Column */}
        <div>
          <img src={data.logo || '/logo/white-logo.webp'} alt={data.logo_text} className="h-14 sm:h-16 w-auto object-contain" />
          <p className="mt-4 max-w-[320px] text-[13.5px] leading-relaxed text-white/75">{data.description}</p>
          <div className="mt-6 flex gap-3">
            {data.socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-label={item.name}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c59d42]/30 bg-[#0b2824] text-[#c59d42] transition-all hover:bg-[#c59d42] hover:text-[#071c19] shadow-sm cursor-pointer"
              >
                <SocialIcon name={item.name} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <Column title={data.headings.quick_links} open={open === 'links'} onToggle={() => toggle('links')}>
          <ul className="mt-3.5 space-y-2 text-[14px] text-white/80">
            {data.quick_links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="inline-flex items-center gap-2 hover:text-[#c59d42] transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-[#c59d42]" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </Column>

        {/* Our Developments Column */}
        <Column title={data.headings.our_services} open={open === 'services'} onToggle={() => toggle('services')}>
          <ul className="mt-3.5 space-y-2 text-[14px] text-white/80">
            {data.our_services.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="inline-flex items-center gap-2 hover:text-[#c59d42] transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-[#c59d42]" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </Column>

        {/* Contact Column */}
        <Column title={data.headings.contact} open={open === 'contact'} onToggle={() => toggle('contact')}>
          <ul className="mt-3.5 space-y-3 text-[13.5px] leading-relaxed text-white/80">
            <li className="flex gap-3 items-start">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#c59d42]" />
              <span>{data.contact.address}</span>
            </li>
            <li className="flex gap-3 items-start">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-[#c59d42]" />
              <div>
                <a href={`tel:${data.contact.phone.replace(/[^\d+]/g, '')}`} className="block hover:text-[#c59d42] transition-colors">
                  {data.contact.phone}
                </a>
                {data.contact.phone_secondary && (
                  <a href={`tel:${data.contact.phone_secondary.replace(/[^\d+]/g, '')}`} className="block hover:text-[#c59d42] transition-colors">
                    {data.contact.phone_secondary}
                  </a>
                )}
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-[#c59d42]" />
              <a href={`mailto:${data.contact.email}`} className="hover:text-[#c59d42] transition-colors">
                {data.contact.email}
              </a>
            </li>
            <li className="flex gap-3 items-start">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-[#c59d42]" />
              <div>
                <span>{data.contact.hours}</span>
                {data.contact.hours_secondary && <span className="block">{data.contact.hours_secondary}</span>}
              </div>
            </li>
          </ul>
        </Column>
      </div>

      <div className="relative border-t border-white/10">
        <p className="px-4 py-4 text-center text-[13px] text-white/60">{data.copyright}</p>
      </div>
    </footer>
  );
}
