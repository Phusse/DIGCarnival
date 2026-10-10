export function PaintSplash({ 
  className = "", 
  variant = 1 
}: { 
  className?: string;
  variant?: 1 | 2 | 3 | 4;
}) {
  if (variant === 1) {
    // Large irregular splash
    return (
      <svg viewBox="0 0 500 500" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M435 241C441 216 465 198 480 176C492 159 497 137 488 118C479 98 459 86 439 77C414 65 385 57 358 60C332 63 310 79 285 86C262 92 236 91 213 95C189 99 167 106 145 116C122 125 101 138 82 154C60 172 38 193 25 218C12 243 9 272 13 300C17 329 27 359 47 381C65 401 92 410 118 421C142 432 168 444 194 451C219 457 246 459 271 454C297 450 322 439 344 423C367 407 387 386 405 363C420 344 430 321 433 296C435 278 432 258 435 241Z" />
        <path d="M12 120C24 135 45 142 62 153C58 131 39 120 19 110C16 109 13 115 12 120Z" />
        <path d="M410 40C430 45 440 65 450 82C439 65 415 55 400 50C397 49 407 39 410 40Z" />
        <path d="M80 430C100 440 125 450 148 458C135 442 110 435 90 425C87 423 78 428 80 430Z" />
        <circle cx="50" cy="50" r="10" />
        <circle cx="450" cy="450" r="15" />
        <circle cx="80" cy="380" r="8" />
        <circle cx="380" cy="120" r="12" />
      </svg>
    );
  }
  
  if (variant === 2) {
    // Dynamic brush stroke
    return (
      <svg viewBox="0 0 500 200" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 100C80 80 150 70 220 75C290 80 360 100 420 130C440 140 460 150 480 155C485 156 480 145 470 140C410 100 340 75 270 65C200 55 120 60 50 80C35 84 20 95 20 100Z" />
        <path d="M30 110C90 90 160 80 230 85C300 90 370 110 430 140C450 150 470 160 490 165C495 166 490 155 480 150C420 110 350 85 280 75C210 65 130 70 60 90C45 94 30 105 30 110Z" opacity="0.7" />
        <circle cx="460" cy="90" r="8" />
        <circle cx="100" cy="140" r="5" />
        <circle cx="350" cy="160" r="10" />
      </svg>
    );
  }

  if (variant === 3) {
    // Splatter dots
    return (
      <svg viewBox="0 0 300 300" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="150" r="40" />
        <circle cx="100" cy="100" r="20" />
        <circle cx="200" cy="120" r="15" />
        <circle cx="130" cy="200" r="25" />
        <circle cx="220" cy="180" r="10" />
        <circle cx="80" cy="160" r="12" />
        <circle cx="180" cy="80" r="8" />
        <circle cx="120" cy="60" r="14" />
        <circle cx="250" cy="150" r="18" />
        <circle cx="160" cy="240" r="15" />
      </svg>
    );
  }

  return (
    // Minimal ribbon
    <svg viewBox="0 0 100 300" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C30 50 80 100 70 150C60 200 10 250 30 300C50 300 90 250 80 200C70 150 40 100 30 50C20 0 20 0 20 0Z" />
    </svg>
  );
}
