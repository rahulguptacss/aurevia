import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import ThankYou from '../components/sections/ThankYou';
import BackToTop from '../components/ui/BackToTop';
import { common, sections } from '../components/types';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="flex w-full flex-1 flex-col">
        <ThankYou data={sections.not_found} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
