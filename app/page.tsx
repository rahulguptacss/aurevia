import React from 'react';
import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Properties from '../components/sections/Properties';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';
import Clients from '../components/sections/Clients';
import Blogs from '../components/sections/Blogs';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';
import BackToTop from '../components/ui/BackToTop';
import dataJson from '../components/data/data.json';

const componentMap: Record<string, React.ComponentType<{ data: any; limit?: number; showButton?: boolean }>> = {
  Hero,
  About,
  Properties,
  Stats,
  Testimonials,
  Clients,
  Blogs,
  Contact,
};

export const metadata = {
  title: dataJson?.pages?.home?.metadata?.title || 'Aurevia – REAL ESTATE & DEVELOPERS',
  description:
    dataJson?.pages?.home?.metadata?.description ||
    'Aurevia – REAL ESTATE & DEVELOPERS | Ultra-Luxury Living & Iconic Architecture',
};

export default function Home() {
  const { common, pages, sections } = dataJson as any;
  const pageComponents = pages?.home?.components || [];

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
      <Header data={common?.Header} />
      <main className="w-full flex-1">
        {pageComponents.map((item: any) => {
          const ComponentToRender = componentMap[item.component];
          if (!ComponentToRender) return null;
          const sectionData = sections[item.sectionKey];
          return (
            <ComponentToRender
              key={item.key || item.component}
              data={sectionData}
            />
          );
        })}
      </main>
      <Footer data={common?.Footer} />
      <BackToTop />
    </div>
  );
}
