import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HighlightsStrip from "@/components/HighlightsStrip";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HighlightsStrip />
      <Services />
      <Portfolio />
      <Process />
      <About />
      <WhyChooseUs />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
