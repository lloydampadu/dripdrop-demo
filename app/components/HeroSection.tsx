"use client";

import Image from "next/image";
import { MotionValue, motion, useTransform } from "framer-motion";

interface HeroProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroSection({ scrollProgress }: HeroProps) {
  const scale = useTransform(scrollProgress, [0, 0.4], [1, 1.08]);
  const opacity = useTransform(scrollProgress, [0.25, 0.45], [1, 0.5]);
  const textY = useTransform(scrollProgress, [0, 0.35], [0, -40]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Hero model"
          fill
          className="object-cover object-top"
          priority
        />
        {/* gradient overlay — darker at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />
      </motion.div>

      {/* Decorative crosshairs */}
      <span className="absolute top-1/3 left-1/4 text-white/40 text-xl select-none">+</span>
      <span className="absolute top-2/3 right-1/3 text-white/40 text-xl select-none">+</span>

      {/* Small description top-right */}
      <motion.div
        style={{ opacity }}
        className="absolute top-28 right-8 max-w-[160px] text-right text-white/70 text-[11px] leading-relaxed hidden md:block"
      >
        Find the latest & exclusive releases and influencer-curated outfits, all in one spot.
      </motion.div>

      {/* Hero text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute bottom-40 left-8 md:left-12"
      >
        <h1 className="text-white font-black leading-none tracking-tighter uppercase">
          <span className="block text-[clamp(3rem,10vw,8rem)]">UPGRADE</span>
          <span className="block text-[clamp(3rem,10vw,8rem)]">YOUR STYLE</span>
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-[clamp(3rem,10vw,8rem)]">WITH EASE</span>
            <a
              href="#"
              className="flex items-center gap-2 bg-white text-black rounded-full text-sm font-semibold normal-case tracking-normal hover:bg-gray-100 transition-colors"
              style={{ padding: "1rem 2rem", fontSize: "1rem" }}
            >
              Shop now →
            </a>
          </div>
        </h1>
      </motion.div>
    </div>
  );
}
