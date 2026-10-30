import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbData } from '../../types';

export default function Breadcrumb({ data }: { data: BreadcrumbData }) {
  return (
    <section className="relative overflow-hidden px-4 py-16 text-center text-white sm:py-20">
      <img src="/img/breadcrumb.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#071018]/65" />
      <div className="relative">
        <h1 className="text-[36px] font-extrabold sm:text-[44px]">{data.title}</h1>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-[15px]">
          {data.items.map((item, index) => {
            const current = index === data.items.length - 1;
            return (
              <span key={item.href} className="inline-flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="h-4 w-4 text-white" />}
                <Link href={item.href} className={current ? 'font-semibold text-[#e10600]' : 'text-white hover:text-[#e10600]'}>
                  {item.name}
                </Link>
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
