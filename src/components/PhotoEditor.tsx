import { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Image as ImageIcon } from 'lucide-react';
import { FLYER_CONFIG } from '@/lib/config';

export interface TransformState {
  baseScale: number;
  zoom: number;
  panX: number;
  panY: number;
  imgWidth: number;
  imgHeight: number;
}

interface PhotoEditorProps {
  imageSrc: string;
  onConfirm: (transform: TransformState) => void;
  onCancel: () => void;
  onReplace: () => void;
}

export function PhotoEditor({ imageSrc, onConfirm, onCancel, onReplace }: PhotoEditorProps) {
  const [imgObj, setImgObj] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  useEffect(() => {
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      setImgObj(img);
    };
  }, [imageSrc]);

  if (!imgObj) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4" />
          <p className="font-bold text-navy">Loading image...</p>
        </div>
      </div>
    );
  }

  const frameWidth = FLYER_CONFIG.photoFrame.width;
  const frameHeight = FLYER_CONFIG.photoFrame.height;
  const baseScale = Math.max(frameWidth / imgObj.naturalWidth, frameHeight / imgObj.naturalHeight);
  
  const clampPan = (newZoom: number, newPanX: number, newPanY: number) => {
    const finalScale = baseScale * newZoom;
    const drawWidth = imgObj.naturalWidth * finalScale;
    const drawHeight = imgObj.naturalHeight * finalScale;
    
    const initialOffsetX = (frameWidth - drawWidth) / 2;
    const initialOffsetY = (frameHeight - drawHeight) / 2;
    
    const maxPanX = -initialOffsetX; 
    const minPanX = frameWidth - drawWidth - initialOffsetX;
    const maxPanY = -initialOffsetY;
    const minPanY = frameHeight - drawHeight - initialOffsetY;
    
    return {
      x: Math.max(minPanX, Math.min(maxPanX, newPanX)),
      y: Math.max(minPanY, Math.min(maxPanY, newPanY))
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    const rect = containerRef.current.getBoundingClientRect();
    const screenToNativeScaleX = frameWidth / rect.width;
    const screenToNativeScaleY = frameHeight / rect.height;
    
    const { x, y } = clampPan(
      zoom, 
      panX + deltaX * screenToNativeScaleX, 
      panY + deltaY * screenToNativeScaleY
    );
    
    setPanX(x);
    setPanY(y);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };
  
  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
    const { x, y } = clampPan(newZoom, panX, panY);
    setPanX(x);
    setPanY(y);
  };

  const finalScale = baseScale * zoom;
  const drawWidth = imgObj.naturalWidth * finalScale;
  const drawHeight = imgObj.naturalHeight * finalScale;
  const initialOffsetX = (frameWidth - drawWidth) / 2;
  const initialOffsetY = (frameHeight - drawHeight) / 2;
  const offsetX = initialOffsetX + panX;
  const offsetY = initialOffsetY + panY;
  
  const pctDrawWidth = (drawWidth / frameWidth) * 100;
  const pctDrawHeight = (drawHeight / frameHeight) * 100;
  const pctOffsetX = (offsetX / frameWidth) * 100;
  const pctOffsetY = (offsetY / frameHeight) * 100;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8 overscroll-none touch-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editor-title"
    >
      <div className="relative flex flex-col w-full max-w-4xl max-h-full bg-white rounded-2xl shadow-2xl border overflow-hidden flex-1 touch-auto">
        <div className="flex items-center justify-between p-4 border-b bg-slate-50">
          <h2 id="editor-title" className="font-heading font-semibold text-lg flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            Adjust Your Photo
          </h2>
          <button 
            onClick={onCancel} 
            className="p-2 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="relative flex-1 bg-slate-900 min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center p-4 sm:p-8 overflow-hidden touch-none">
          <div 
            ref={containerRef}
            className="relative bg-black shadow-2xl overflow-hidden cursor-move touch-none border-2 border-primary/50"
            style={{ 
              width: '100%', 
              maxWidth: `${frameWidth}px`,
              aspectRatio: `${frameWidth} / ${frameHeight}`
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imageSrc}
              alt="Photo being adjusted"
              className="absolute max-w-none origin-top-left pointer-events-none select-none"
              style={{
                width: `${pctDrawWidth}%`,
                height: `${pctDrawHeight}%`,
                left: `${pctOffsetX}%`,
                top: `${pctOffsetY}%`
              }}
              draggable={false}
            />
            {/* Grid overlay for better UX */}
            <div className="absolute inset-0 pointer-events-none opacity-20 border border-white">
              <div className="w-full h-1/3 border-b border-white" />
              <div className="w-full h-1/3 border-b border-white" />
              <div className="absolute inset-0 w-1/3 h-full border-r border-white" />
              <div className="absolute inset-0 w-2/3 h-full border-r border-white" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t space-y-6 z-10">
          <div className="flex items-center gap-4 max-w-md mx-auto">
            <button 
              onClick={() => handleZoomChange(Math.max(1, zoom - 0.1))}
              className="p-1 rounded-full hover:bg-slate-100"
            >
              <ZoomOut className="h-5 w-5 text-slate-500" />
            </button>
            
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.01}
              onChange={(e) => handleZoomChange(Number(e.target.value))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            
            <button 
              onClick={() => handleZoomChange(Math.min(3, zoom + 0.1))}
              className="p-1 rounded-full hover:bg-slate-100"
            >
              <ZoomIn className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => { setZoom(1); setPanX(0); setPanY(0); }}
              className="flex items-center justify-center w-full sm:w-auto px-6 py-2.5 rounded-md border text-sm font-medium hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button
              onClick={onReplace}
              className="flex items-center justify-center w-full sm:w-auto px-6 py-2.5 rounded-md border text-sm font-medium hover:bg-slate-50"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Replace Photo
            </button>
            <button
              onClick={() => onConfirm({ baseScale, zoom, panX, panY, imgWidth: imgObj.naturalWidth, imgHeight: imgObj.naturalHeight })}
              className="flex items-center justify-center w-full sm:w-auto px-8 py-2.5 rounded-md bg-primary text-white text-sm font-medium shadow hover:bg-primary/90"
            >
              <Check className="h-4 w-4 mr-2" />
              Confirm Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
