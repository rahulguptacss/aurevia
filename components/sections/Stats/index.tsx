'use client';

import { useEffect, useRef, useState } from 'react';
import { Award, FileText, Home, Users } from 'lucide-react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import type { StatsSectionData } from '../../types';

const icons = { Users, Home, Award, FileText };

function Counter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(target);
  }, [inView, motionValue, target]);

  useEffect(() => spring.on('change', (latest) => setDisplay(Math.round(latest))), [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats({ data }: { data: StatsSectionData }) {
  return (
    <section id="stats" className="relative overflow-hidden bg-[#f8faf9] py-10 sm:py-14 scroll-mt-20 border-y border-[#071c19]/08">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(30deg, transparent 46%, #c59d42 47%, #c59d42 53%, transparent 54%), linear-gradient(150deg, transparent 46%, #c59d42 47%, #c59d42 53%, transparent 54%)',
          backgroundSize: '48px 84px',
          opacity: 0.05,
        }}
      />
      <div className="relative mx-auto max-w-[1140px] px-4 text-center">
        <h2 className="text-[28px] font-black text-[#071c19] sm:text-[36px]">{data.title}</h2>
        <div className="mt-8 grid grid-cols-2 gap-y-8 sm:gap-y-10 lg:mt-10 lg:grid-cols-4 lg:gap-0">
          {data.items.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons] || Award;
            return (
              <div
                key={item.label}
                className={`flex items-center justify-center gap-3.5 px-4 ${index > 0 ? 'lg:border-l lg:border-[#071c19]/10' : ''
                  }`}
              >
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#c59d42]/12 text-[#c59d42]">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.8} />
                </div>
                <div className="text-left">
                  <p className="text-[28px] font-black leading-none text-[#071c19] sm:text-[34px]">
                    <Counter value={item.value} />
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-[#475569] sm:text-[14px]">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
