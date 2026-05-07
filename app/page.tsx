"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BrandsBar from "./components/BrandsBar";
import AboutSection from "./components/AboutSection";
import TrendsSection from "./components/TrendsSection";
import CascadeCards from "./components/CascadeCards";
import FeaturedProducts from "./components/FeaturedProducts";
import DropSection from "./components/DropSection";
import SocialProof from "./components/SocialProof";
import Footer from "./components/Footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });

  // Slower, smoother slide — starts at 60% scroll progress not 0
  const panelY = useTransform(scrollYProgress, [0.3, 1], ["100%", "0%"]);

  return (
    <main className="bg-black">
      <div ref={heroRef} style={{ height: "130vh", position: "relative" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <Navbar scrollProgress={scrollYProgress} />
          <HeroSection scrollProgress={scrollYProgress} />

          {/* White panel slides up smoothly and covers full viewport height */}
          <motion.div
            style={{ y: panelY }}
            className="absolute inset-0 top-auto bg-white text-black rounded-t-[32px]"
            // height tall enough to visually connect to the content below
            // overflow visible so AboutSection inside isn't clipped
          >
            <BrandsBar />
          </motion.div>
        </div>
      </div>

      {/* Seamless continuation — no gap between sticky panel and this */}
      <div style={{ background: "#fff", color: "#000", marginTop: "-2px" }}>
        <AboutSection />
        <FeaturedProducts />
        <TrendsSection />
        <CascadeCards />
        <DropSection />
        <SocialProof />
        <Footer />
      </div>
    </main>
  );
}
