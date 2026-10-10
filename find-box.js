const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/flyer-template.png')
  .pipe(new PNG({
    filterType: 4
  }))
  .on('parsed', function() {
    let rows = [];

    for (let y = 0; y < this.height; y++) {
      let consecutiveWhite = 0;
      let startX = -1;

      for (let x = 0; x < this.width; x++) { 
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx+1];
        let b = this.data[idx+2];
        
        if (r > 240 && g > 240 && b > 240) {
          if (consecutiveWhite === 0) startX = x;
          consecutiveWhite++;
        } else {
          if (consecutiveWhite > 300 && startX > 50 && startX < this.width / 2) { 
            // We want a box that starts inside the image, on the left half, and is wide
            rows.push({ y, x: startX, w: consecutiveWhite });
          }
          consecutiveWhite = 0;
        }
      }
    }
    
    // find a block of identical x and w
    let blocks = {};
    for (let row of rows) {
      let key = row.x + "_" + row.w;
      if (!blocks[key]) blocks[key] = { startY: row.y, endY: row.y, count: 0, x: row.x, w: row.w };
      else blocks[key].endY = row.y;
      blocks[key].count++;
    }
    
    for (let key in blocks) {
      if (blocks[key].count > 300) {
        console.log(`Found box:`, blocks[key]);
      }
    }
  });
