'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, ArrowUp, Baby, Bath, BedDouble, Building2, Camera, Car, Coffee, Droplets, Dumbbell, Home, Hospital, Lamp, MapPin, Maximize2, Route, Ruler, Shield, ShoppingBag, Sun, TrainFront, Trees, Users, Waves, Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PropertyDetailsItem } from '../../types';

const amenityIcons = { Building2, Waves, Dumbbell, Trees, Baby, Shield, Zap, ArrowUp, Car, Camera, Sun, Users, Coffee, Route, Lamp, Droplets };

export default function PropertyDetails({ data }: { data: PropertyDetailsItem }) {
  const photos = data.gallery?.length ? data.gallery : [data.image];
  const [active, setActive] = useState(0);
  const photo = photos[active % photos.length];

  const move = (step: number) => setActive((current) => (current + step + photos.length) % photos.length);

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.img key={photo} src={photo} alt={data.title} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="h-[220px] w-full object-cover sm:h-[380px]" />
              </AnimatePresence>
              <button type="button" aria-label="Previous photo" onClick={() => move(-1)} className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#163a66]">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="button" aria-label="Next photo" onClick={() => move(1)} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#163a66]">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {photos.slice(0, 5).map((src, index) => (
                <button key={src + index} type="button" onClick={() => setActive(index)} className={`overflow-hidden rounded-xl border-2 ${index === active ? 'border-[#e10600]' : 'border-transparent'}`}>
                  <img src={src} alt="" className="h-16 w-full object-cover sm:h-20" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-md bg-[#e10600] px-2.5 py-1 text-[11px] font-bold text-white">{data.status}</span>
                <h2 className="mt-2 text-[26px] font-extrabold leading-tight text-[#163a66]">{data.title}</h2>
                <p className="mt-1 flex items-center gap-1 text-[14px] text-[#5b6b80]"><MapPin className="h-4 w-4 text-[#e10600]" />{data.location}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[28px] font-extrabold leading-none text-[#e10600]">{data.price}</p>
                <p className="mt-1 text-[13px] text-[#8b97a8]">({data.price_note})</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#f6f8fb] py-3 text-center sm:grid-cols-5 sm:py-4">
              {[
                { icon: BedDouble, value: data.beds.split(' ')[0], label: 'Bedrooms' },
                { icon: Bath, value: data.baths.split(' ')[0], label: 'Bathrooms' },
                { icon: Ruler, value: data.area.split(' ')[0], label: 'Sq. Ft.' },
                { icon: Building2, value: data.year, label: 'Year' },
                { icon: Car, value: data.parking.split(' ')[0], label: 'Parking' },
              ].map((item) => (
                <div key={item.label}>
                  <item.icon className="mx-auto h-5 w-5 text-[#e10600]" strokeWidth={1.8} />
                  <p className="mt-1 text-[15px] font-extrabold text-[#163a66]">{item.value}</p>
                  <p className="text-[11px] text-[#8b97a8]">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {[data.specs.slice(0, 5), data.specs.slice(5)].map((column, columnIndex) => (
                <div key={columnIndex}>
                  {column.map((spec) => (
                    <p key={spec.label} className="grid grid-cols-[1fr_auto_1.1fr] items-center gap-1 py-1 text-[12px] sm:whitespace-nowrap">
                      <span className="text-[#8b97a8]">{spec.label}</span>
                      <span className="text-[#8b97a8]">:</span>
                      <span className="font-semibold text-[#163a66]">{spec.value}</span>
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <Link href="/contact" className="mt-5 inline-flex h-[52px] min-w-[260px] items-center justify-center gap-4 rounded-xl bg-[#e10600] px-8 text-[15px] font-semibold text-white">
              Enquiry Now
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#e10600]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-[26px] font-extrabold text-[#163a66]">Property Overview</h3>
          <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#e10600]" />
          <p className="mt-4 text-[15px] leading-8 text-[#6b7c90]">{data.overview}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-[26px] font-extrabold text-[#163a66]">Key Features</h3>
          <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#e10600]" />
          <ul className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {data.features.map((feature, index) => {
              const icons = [BedDouble, Users, Building2, Lamp, Home, Sun, Building2, MapPin, Car, Shield];
              const Icon = icons[index % icons.length];
              return (
                <motion.li key={feature} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="flex items-center gap-3 text-[15px] text-[#5b6b80]">
                  <Icon className="h-5 w-5 shrink-0 text-[#e10600]" strokeWidth={1.7} />
                  {feature}
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-[26px] font-extrabold text-[#163a66]">Amenities</h3>
          <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#e10600]" />
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-5">
            {data.amenities.map((item) => {
              const Icon = amenityIcons[item.icon as keyof typeof amenityIcons] || Building2;
              return (
                <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -4 }} className="w-[92px] text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe8ea] text-[#e10600]">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <p className="mt-2 text-[13px] leading-4 text-[#6b7c90]">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-[26px] font-extrabold text-[#163a66]">Floor Plan</h3>
            <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#e10600]" />
            <div className="relative mt-4">
              <img src={data.floor_plan} alt="Floor plan" className="h-64 w-full rounded-2xl bg-[#f7f9fc] object-contain" />
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#163a66] text-white">
                <Maximize2 className="h-4 w-4" />
              </span>
            </div>
          </motion.div>
          <div>
            <h3 className="text-[26px] font-extrabold text-[#163a66]">Location Advantages</h3>
            <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#e10600]" />
            <ul className="mt-3 divide-y divide-[#eef3f8]">
              {data.advantages.map((item, index) => {
                const icons = [TrainFront, Home, Hospital, ShoppingBag, Route, Building2];
                const Icon = icons[index % icons.length];
                return (
                  <li key={item} className="flex items-center gap-3 py-2.5 text-[14px] text-[#5b6b80]">
                    <Icon className="h-4 w-4 shrink-0 text-[#e10600]" />
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-[26px] font-extrabold text-[#163a66]">Nearby Landmarks</h3>
            <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#e10600]" />
            <div className="mt-4 overflow-hidden rounded-2xl">
              <img src={data.landmarks_image} alt="" className="h-40 w-full object-cover" />
              <ul className="space-y-2 bg-[#163a66] px-4 py-3">
                {data.landmarks.map((item) => (
                  <li key={item.name} className="flex items-center justify-between text-[13px] text-white">
                    <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-white/80" />{item.name}</span>
                    <span>{item.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
