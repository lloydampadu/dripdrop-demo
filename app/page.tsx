"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BrandsBar from "./components/BrandsBar";
import AboutSection from "./components/AboutSection";
import TrendsSection from "./components/TrendsSection";
import CascadeCards from "./components/CascadeCards";
import Footer from "./components/Footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });

  const panelY = useTransform(scrollYProgress, [0, 0.6], ["100%", "0%"]);

  return (
    <main className="bg-black">
      {/* Hero scroll driver */}
      <div ref={heroRef} style={{ height: "180vh", position: "relative" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <Navbar scrollProgress={scrollYProgress} />
          <HeroSection scrollProgress={scrollYProgress} />

          {/* White panel slides up */}
          <motion.div
            style={{ y: panelY }}
            className="absolute bottom-0 left-0 right-0 bg-white text-black rounded-t-[32px]"
            // not overflow-hidden so sticky children inside work
          >
            <BrandsBar />
          </motion.div>
        </div>
      </div>

      {/* Rest of page — normal document flow, white bg */}
      <div style={{ background: "#fff", color: "#000" }}>
        <AboutSection />
        <TrendsSection />
        <CascadeCards />
        <Footer />
      </div>
    </main>
  );
}
