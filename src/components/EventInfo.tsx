"use client";

import { CalendarDays, MapPin, Users, Heart, Pizza, Smile } from "lucide-react";
import { motion } from "motion/react";
import { PaintSplash } from "./PaintSplash";

export function EventInfo() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about">
      {/* Subtle Decorative Splashes */}
      <PaintSplash variant={3} className="absolute top-10 left-10 w-32 h-32 text-primary opacity-5 pointer-events-none" />
      <PaintSplash variant={1} className="absolute bottom-10 right-10 w-48 h-48 text-accent opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: About The Carnival */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-10"
          >
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-navy mb-4">
                About The Carnival
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                &quot;Let us come forth, connect and recreate. Building together.&quot; This is not just an event, it&apos;s an experience of fellowship, fun, and food with the Divine Grace Campus family.
              </p>
            </div>

            <div className="space-y-6">
              {/* Date & Time */}
              <div className="flex gap-4 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary border border-blue-100">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-navy">Dates & Times</h3>
                  <p className="text-muted-foreground mt-1 font-medium text-base">23rd October 2026: 5:00 PM</p>
                  <p className="text-muted-foreground font-medium text-base">24th October 2026: 10:00 AM</p>
                </div>
              </div>
              
              <div className="w-full h-px bg-slate-100" />
              
              {/* Venue */}
              <div className="flex gap-4 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-accent border border-red-100">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-navy">Venue</h3>
                  <p className="text-muted-foreground mt-1 font-medium text-base">Oluchi&apos;s Building, Old Benima</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100" />

              {/* Hosts */}
              <div className="flex gap-4 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 border border-yellow-200">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-navy">Hosts</h3>
                  <p className="text-muted-foreground mt-1 font-medium text-base">Oluchi Japhat Aniagwu</p>
                  <p className="text-muted-foreground font-medium text-base">Pst. Pharm. Sheila Aniagwu</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* RIGHT COLUMN: Event Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col space-y-6"
          >
            <h2 className="font-heading text-3xl font-black text-navy mb-2 lg:mb-4">
              Event Highlights
            </h2>

            {/* Fellowships */}
            <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl flex gap-5 items-start hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
              <div className="bg-primary text-white p-4 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Heart className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-navy mb-1">Fellowships</h3>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                  Good people. Great connections. Lasting memories.
                </p>
              </div>
            </div>

            {/* Foods */}
            <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl flex gap-5 items-start hover:border-accent/30 hover:shadow-md transition-all duration-300 group">
              <div className="bg-accent text-white p-4 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Pizza className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-navy mb-1">Foods</h3>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                  Come hungry. Leave with memories.
                </p>
              </div>
            </div>

            {/* Fun Activities */}
            <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl flex gap-5 items-start hover:border-yellow/50 hover:shadow-md transition-all duration-300 group">
              <div className="bg-yellow text-navy p-4 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Smile className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-navy mb-1">Fun Activities</h3>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                  Good vibes. Great moments. Endless fun.
                </p>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
