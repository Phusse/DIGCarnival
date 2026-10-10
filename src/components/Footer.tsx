export function Footer() {
  return (
    <footer className="bg-navy border-t-[10px] border-yellow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <span className="font-heading font-black text-xl text-white tracking-tight">Divine Grace Campus</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm font-bold text-white uppercase tracking-wider mb-2">DIG CAMPUS CARNIVAL &copy; 2026</p>
            <p className="text-sm text-blue-200/60 font-medium">We Can. Building together.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
