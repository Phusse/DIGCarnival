"use client";

import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { Confetti } from "./Confetti";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-navy">
      {/* Background Scenic Image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <Image 
          src="/assets/carnival/scenery.png"
          alt="Elegant Campus Event Scenery"
          fill
          className="object-cover object-center opacity-80 animate-subtle-zoom"
          priority
        />
        {/* Soft overlay gradients for depth and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/30 to-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/40 to-transparent" />
      </motion.div>

      {/* Confetti Animation Layer (above background, below text) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Confetti />
      </div>
      <div className="bunting-container z-10 animate-float-slow">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 sm:h-24 fill-current text-white/10 drop-shadow-xl">
          <path d="M0 0 L100 80 L200 0 L300 80 L400 0 L500 80 L600 0 L700 80 L800 0 L900 80 L1000 0 L1100 80 L1200 0 L1200 120 L0 120 Z" opacity="0.4" />
          <path d="M0 0 L50 40 L100 0 L150 40 L200 0 L250 40 L300 0 L350 40 L400 0 L450 40 L500 0 L550 40 L600 0 L650 40 L700 0 L750 40 L800 0 L850 40 L900 0 L950 40 L1000 0 L1050 40 L1100 0 L1150 40 L1200 0 L1200 120 L0 120 Z" opacity="0.9" fill="var(--color-primary)" />
          <path d="M25 0 L75 60 L125 0 L175 60 L225 0 L275 60 L325 0 L375 60 L425 0 L475 60 L525 0 L575 60 L625 0 L675 60 L725 0 L775 60 L825 0 L875 60 L925 0 L975 60 L1025 0 L1075 60 L1125 0 L1175 60 L1200 0 L1200 120 L0 120 Z" opacity="1" fill="var(--color-yellow)" />
        </svg>
      </div>

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-32 sm:pb-40 flex flex-col items-start min-h-[80vh] justify-center">
        <div className="max-w-4xl w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-yellow uppercase tracking-widest mb-6 sm:mb-8 border border-white/20 shadow-lg"
          >
            Divine Grace Campus Presents
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-heading text-5xl sm:text-7xl lg:text-[7rem] font-black tracking-tighter text-white mb-6 sm:mb-8 leading-[0.95] drop-shadow-2xl break-words w-full"
          >
            <span className="block text-shadow-heavy">DIG-CAMPUS</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow to-[#FACC15] drop-shadow-lg mt-1 sm:mt-2">CARNIVAL</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8 sm:mb-12 inline-block transform -rotate-1 animate-float-delayed-slow max-w-full"
          >
            <span className="bg-accent text-white text-[1.35rem] min-[360px]:text-2xl sm:text-4xl md:text-5xl font-black italic tracking-wider px-5 sm:px-8 py-3 sm:py-4 drop-shadow-2xl rounded-r-[1.5rem] sm:rounded-r-3xl rounded-bl-[1.5rem] sm:rounded-bl-3xl border-l-[6px] sm:border-l-8 border-yellow shadow-xl block whitespace-normal break-words max-w-full leading-tight">
              Will You Be in Attendance?
            </span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg sm:text-2xl text-white/90 font-medium leading-relaxed mb-8 sm:mb-10 drop-shadow-lg max-w-2xl bg-navy/40 p-5 sm:p-6 rounded-2xl backdrop-blur-md border border-white/10"
          >
            &quot;Let us come forth, connect and recreate. Building together.&quot;
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm font-bold text-navy bg-white/95 backdrop-blur-md py-4 px-5 sm:px-8 rounded-[1.5rem] sm:rounded-full shadow-2xl mb-12 border border-white/50 w-full sm:w-max max-w-full"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
              <div className="p-2 bg-primary/10 rounded-full text-primary shrink-0"><CalendarDays className="h-4 sm:h-5 w-4 sm:w-5" /></div>
              <span className="truncate">23rd–24th Oct 2026</span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-300" />
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
              <div className="p-2 bg-accent/10 rounded-full text-accent shrink-0"><MapPin className="h-4 sm:h-5 w-4 sm:w-5" /></div>
              <span className="truncate">Oluchi&apos;s Building, Old Benima</span>
            </div>
          </motion.div>

          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            href="#generator"
            className="inline-flex h-14 sm:h-16 w-full sm:w-auto items-center justify-center rounded-full bg-yellow px-8 sm:px-10 text-lg sm:text-xl font-black text-navy shadow-xl shadow-yellow/40 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#FACC15] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow/50 ring-offset-2 ring-offset-navy"
          >
            Create My Flyer
          </motion.a>
        </div>
      </div>

      {/* Floating Accent Shapes for visual interest without childish confetti */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[85%] w-12 h-12 border-4 border-yellow/30 rounded-full animate-float-slow" />
        <div className="absolute top-[60%] right-[10%] w-8 h-8 bg-accent/20 rotate-45 rounded-sm animate-float-delayed-slow" />
        <div className="absolute top-[30%] left-[45%] w-6 h-6 border-2 border-white/20 rounded-full animate-float-slow" />
      </div>

      {/* Curved Divider to next section */}
      <div className="wave-divider z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-current text-white">
          <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
