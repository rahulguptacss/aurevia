'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import type { HeaderData, NavItem } from '../../types';

export default function Header({ data }: { data?: HeaderData }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ['home', 'about', 'properties', 'stats', 'testimonials', 'blogs', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setActiveSection(targetId);
      }
      setOpen(false);
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 60 || info.velocity.y > 250) {
      setOpen(false);
    }
  };

  const links = data?.links || [];
  const logo = data?.logo || '/logo/logo.webp';
  const logoText = data?.logo_text || 'AUREVIA';
  const logoSubtext = data?.logo_subtext || 'REAL ESTATE & DEVELOPERS';
  const buttonText = data?.button_text || 'Contact Us';
  const buttonLink = data?.button_link || '#contact';

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(7,28,25,0.08)] border-b border-[#071C19]/10'
          : 'bg-white border-b border-[#071C19]/08'
        }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 shrink-0 py-1 transition-transform duration-200 hover:scale-[1.02]"
        >
          <img
            src={logo}
            alt={logoText}
            className="h-11 sm:h-12 md:h-13 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[260px] object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 lg:gap-2">
          {links.map((link) => {
            const targetId = link.href.replace('#', '');
            const isActive = activeSection === targetId;

            return (
              <a
                key={link.name + link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-2 text-[14px] font-bold tracking-wide transition-all duration-200 rounded-full ${isActive
                    ? 'text-[#c59d42] bg-[#c59d42]/10'
                    : 'text-[#071c19] hover:text-[#c59d42] hover:bg-[#071c19]/5'
                  }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1 left-3.5 right-3.5 h-[2.5px] rounded-full bg-[#c59d42]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <a
              href={buttonLink}
              onClick={(e) => handleNavClick(e, buttonLink)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#c59d42] px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-[14px] font-bold text-white shadow-md shadow-[#c59d42]/25 transition hover:bg-[#b08b35] active:bg-[#997422]"
            >
              <span>{buttonText}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#071C19]/15 bg-[#071C19]/5 text-[#071C19] transition hover:bg-[#071C19]/10 xl:hidden cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {/* Draggable Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-[#071c19]/50 backdrop-blur-xs z-40 xl:hidden"
            />

            {/* Draggable Drawer Panel */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={handleDragEnd}
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-[#071C19]/10 xl:hidden z-50 rounded-b-3xl overflow-hidden flex flex-col touch-none"
            >
              {/* Drag Handle Indicator */}
              <div className="pt-2.5 pb-1 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing">
                <span className="w-12 h-1.5 bg-[#071c19]/20 rounded-full" />
                <span className="text-[10px] text-[#071c19]/50 font-bold tracking-wider uppercase mt-1">
                  Drag down to close
                </span>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col gap-1 px-4 py-3 pb-6">
                {links.map((link) => {
                  const targetId = link.href.replace('#', '');
                  const isActive = activeSection === targetId;

                  return (
                    <a
                      key={link.name + link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-[15px] font-bold transition-all ${isActive
                          ? 'bg-[#c59d42]/15 text-[#c59d42]'
                          : 'text-[#071c19] hover:bg-[#071c19]/5 hover:text-[#c59d42]'
                        }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="h-2 w-2 rounded-full bg-[#c59d42]" />}
                    </a>
                  );
                })}

                <div className="pt-3 mt-1 border-t border-[#071c19]/10">
                  <a
                    href={buttonLink}
                    onClick={(e) => handleNavClick(e, buttonLink)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c59d42] py-3 text-center text-[15px] font-bold text-white shadow-md shadow-[#c59d42]/20 transition hover:bg-[#b08b35]"
                  >
                    <span>{buttonText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
