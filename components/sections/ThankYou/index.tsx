import Link from 'next/link';
import { Check } from 'lucide-react';
import type { ThankYouSectionData } from '../../types';

export default function ThankYou({ data }: { data: ThankYouSectionData }) {
  if (!data) return null;
  return (
    <section className="flex flex-1 items-center justify-center bg-[#f8faf9] px-4 py-20">
      <div className="w-full max-w-lg rounded-3xl bg-white px-8 py-12 text-center shadow-lg border border-[#071c19]/10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c59d42] text-white shadow-md">
          <Check className="h-8 w-8" />
        </span>
        <h1 className="mt-5 text-3xl font-extrabold text-[#071c19] sm:text-4xl">{data.title}</h1>
        <p className="mt-3 text-sm leading-7 text-[#475569]">{data.description}</p>
        <Link
          href={data.button?.href || '/'}
          className="mt-6 inline-flex rounded-full bg-[#c59d42] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#b08b35]"
        >
          {data.button?.text || 'Back to Home'}
        </Link>
      </div>
    </section>
  );
}
