import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CtaSectionData } from '../../types';

export default function Cta({ data }: { data: CtaSectionData }) {
  return (
    <section className="bg-[#f7fbff] px-4 py-4 sm:py-6">
      <div className="relative mx-auto flex max-w-[1180px] items-center overflow-hidden rounded-[22px] border border-[#e7eef6] bg-[#f4f7fb] px-5 py-4 sm:px-8 sm:py-5">
        <img
          src={data.image}
          alt=""
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] object-cover md:block"
          style={{ maskImage: 'linear-gradient(to right, transparent, #000 45%)', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 45%)' }}
        />
        <div className="relative flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="shrink-0">
            <p className="flex items-center gap-2 text-[12px] font-bold tracking-[0.14em] text-[#163a66]">
              <span className="h-[2px] w-6 rounded-full bg-[#e10600]" />
              {data.eyebrow}
            </p>
            <h2 className="mt-1 text-[26px] font-black leading-none tracking-[-0.03em] text-[#163a66] sm:text-[34px]">
              {data.title_line1} <span className="text-[#e10600]">{data.title_highlight}</span>
            </h2>
          </div>
          <span className="hidden h-12 w-px shrink-0 bg-[#d7e0ea] lg:block" />
          <p className="max-w-[280px] text-[14px] leading-6 text-[#5b6b80]">{data.description}</p>
          <Link
            href={data.button.href}
            className="inline-flex w-fit items-center gap-3 rounded-full bg-[#e10600] py-1.5 pl-5 pr-1.5 text-[15px] font-semibold text-white transition hover:bg-[#c90500] lg:ml-auto"
          >
            {data.button.text}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#163a66]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
