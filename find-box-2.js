const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/flyer-template.png')
  .pipe(new PNG({
    filterType: 4
  }))
  .on('parsed', function() {
    let top = 1254, bottom = 0, left = 1254, right = 0;
    
    // We are looking for the white box. Let's find any pixel that is NOT blue/dark 
    // and is inside the general area of x: 50-600, y: 300-900.
    // Actually, let's just find the exact bounding box of the transparent/white hole.
    // The photo hole is probably bounded by a strong blue border.
    
    for (let y = 300; y < 1000; y++) {
      for (let x = 50; x < 600; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx+1];
        let b = this.data[idx+2];
        
        // If it's bright/white (part of the photo area)
        if (r > 200 && g > 200 && b > 200) {
          if (y < top) top = y;
          if (y > bottom) bottom = y;
          if (x < left) left = x;
          if (x > right) right = x;
        }
      }
    }
    
    console.log(`White Area Bounds: x: ${left}, y: ${top}, width: ${right - left + 1}, height: ${bottom - top + 1}`);
    
    // Let's refine it by finding the first non-white pixel going inwards?
    // Let's just log the bounds.
  });
