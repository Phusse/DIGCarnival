import { CalendarDays } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/10 bg-white/95 backdrop-blur shadow-sm">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2">
          
          <div className="flex items-center min-w-0">
            <div className="flex flex-col truncate">
              <span className="text-[9px] sm:text-xs font-bold text-accent uppercase tracking-widest leading-none mb-1 truncate">
                Divine Grace Campus
              </span>
              <h1 className="font-heading text-sm sm:text-xl font-black leading-none tracking-tight text-navy truncate">
                DIG CAMPUS CARNIVAL
              </h1>
            </div>
          </div>
          
          <div className="flex items-center shrink-0">
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-muted-foreground mr-4">
              <CalendarDays className="w-4 h-4 text-primary" />
              23rd-24th Oct
            </div>
            <a 
              href="#generator" 
              className="inline-flex h-9 sm:h-11 items-center justify-center rounded-full bg-yellow px-4 sm:px-6 text-xs sm:text-sm font-black text-navy shadow-lg shadow-yellow/20 hover:scale-105 hover:bg-[#FACC15] transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow/50 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Create My Flyer</span>
              <span className="sm:hidden">Create Flyer</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
