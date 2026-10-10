import { FLYER_CONFIG } from "./config";
import { TransformState } from "@/components/PhotoEditor";

export async function composeFlyer(
  templateSrc: string,
  photoSrc: string,
  transform: TransformState
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = FLYER_CONFIG.templateWidth;
    canvas.height = FLYER_CONFIG.templateHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("No 2d context"));

    const templateImg = new Image();
    const photoImg = new Image();

    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === 2) {
        try {
          // 1. Draw the template base image first
          ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);
          
          // 2. Save context state before clipping
          ctx.save();
          
          // 3. Define the inner photo frame clipping path
          ctx.beginPath();
          ctx.rect(
            FLYER_CONFIG.photoFrame.x, 
            FLYER_CONFIG.photoFrame.y, 
            FLYER_CONFIG.photoFrame.width, 
            FLYER_CONFIG.photoFrame.height
          );
          ctx.clip();
          
          // 4. Calculate exact absolute pixel coordinates for the transformed image
          const finalScale = transform.baseScale * transform.zoom;
          const drawWidth = transform.imgWidth * finalScale;
          const drawHeight = transform.imgHeight * finalScale;
          const initialOffsetX = (FLYER_CONFIG.photoFrame.width - drawWidth) / 2;
          const initialOffsetY = (FLYER_CONFIG.photoFrame.height - drawHeight) / 2;
          const offsetX = initialOffsetX + transform.panX;
          const offsetY = initialOffsetY + transform.panY;
          
          // 5. Draw the user photograph into the frame, with clipping handling the overflow
          ctx.drawImage(
            photoImg,
            FLYER_CONFIG.photoFrame.x + offsetX,
            FLYER_CONFIG.photoFrame.y + offsetY,
            drawWidth,
            drawHeight
          );
          
          // 6. Restore context state
          ctx.restore();
          
          resolve(canvas.toDataURL("image/png"));
        } catch (e) {
          reject(e);
        }
      }
    };
    
    templateImg.onload = onLoad;
    templateImg.onerror = reject;
    photoImg.onload = onLoad;
    photoImg.onerror = reject;
    
    templateImg.src = templateSrc;
    photoImg.src = photoSrc;
  });
}
