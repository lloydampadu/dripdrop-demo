"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const words = ["Not", "just", "a", "store—", "a", "movement", "redefining", "streetwear", "and", "connecting", "creators", "through", "style"];

export default function AboutSection() {
  return (
    <section className="flex flex-col md:flex-row gap-8 p-8 md:p-12 min-h-[500px]">
      {/* Left — image with organic blob clip */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full md:w-[42%] min-h-[400px] flex-shrink-0 overflow-hidden"
        style={{ borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%" }}
      >
        <Image
          src="/about.jpg"
          alt="Model with sunglasses"
          fill
          className="object-cover object-center"
        />
      </motion.div>

      {/* Right — text reveal */}
      <div className="flex flex-col justify-center gap-6 flex-1">
        <h2 className="font-black text-[clamp(1.8rem,4vw,3.5rem)] leading-tight tracking-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ display: "inline-block", marginRight: "0.3em" }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-gray-500 text-sm leading-relaxed max-w-sm"
        >
          We&apos;re not just a store — we&apos;re a movement redefining streetwear. Connect with a community of creators, explore curated styles, and express yourself through fashion that speaks your language.
        </motion.p>

        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-black text-white rounded-full font-semibold w-fit hover:bg-gray-900 transition-colors"
          style={{ padding: "1rem 2rem", fontSize: "1rem" }}
        >
          Explore the movement →
        </motion.a>
      </div>
    </section>
  );
}
