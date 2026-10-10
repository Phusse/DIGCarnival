const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/flyer-template.png')
  .pipe(new PNG({
    filterType: 4
  }))
  .on('parsed', function() {
    let y = 600;
    let edges = [];
    for (let x = 50; x < 600; x++) {
      let idx = (this.width * y + x) << 2;
      let r = this.data[idx];
      let g = this.data[idx+1];
      let b = this.data[idx+2];
      edges.push({x, r, g, b});
    }
    
    // Find left edge of blue frame, inner edge of blue frame
    let xLeft = -1, xRight = -1;
    let inBlue = false;
    for (let i = 0; i < edges.length; i++) {
       let e = edges[i];
       let isBlue = e.b > 150 && e.r < 100;
       if (isBlue && !inBlue) { inBlue = true; }
       if (!isBlue && inBlue && xLeft === -1) { xLeft = e.x; inBlue = false; } // inner left edge
       if (isBlue && xLeft !== -1 && xRight === -1) { xRight = e.x - 1; } // inner right edge
    }
    
    let xCenter = Math.floor((xLeft + xRight) / 2);
    
    let yTop = -1, yBottom = -1;
    inBlue = false;
    for (let y = 300; y < 1000; y++) {
      let idx = (this.width * y + xCenter) << 2;
      let r = this.data[idx];
      let g = this.data[idx+1];
      let b = this.data[idx+2];
      let isBlue = b > 150 && r < 100;
      if (isBlue && !inBlue) { inBlue = true; }
      if (!isBlue && inBlue && yTop === -1) { yTop = y; inBlue = false; }
      if (isBlue && yTop !== -1 && yBottom === -1) { yBottom = y - 1; }
    }
    
    console.log(`Blue frame inner bounds: x: ${xLeft}, y: ${yTop}, width: ${xRight - xLeft + 1}, height: ${yBottom - yTop + 1}`);
  });
