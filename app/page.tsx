"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BrandsBar from "./components/BrandsBar";
import AboutSection from "./components/AboutSection";
import TrendsSection from "./components/TrendsSection";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const panelY = useTransform(scrollYProgress, [0, 0.35], ["100%", "0%"]);

  return (
    <main ref={containerRef} className="relative min-h-[300vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Navbar scrollProgress={scrollYProgress} />
        <HeroSection scrollProgress={scrollYProgress} />

        {/* White panel slides up from bottom */}
        <motion.div
          style={{ y: panelY }}
          className="absolute bottom-0 left-0 right-0 bg-white text-black rounded-t-[32px] overflow-hidden"
        >
          <BrandsBar />
          <AboutSection />
          <TrendsSection />
        </motion.div>
      </div>
    </main>
  );
}
