"use client";

import { useState, useRef, ChangeEvent, useEffect, useCallback } from "react";
import { Upload, Download, Settings2, Image as ImageIcon, Loader2, PartyPopper } from "lucide-react";
import Image from "next/image";
import { PhotoEditor, TransformState } from "./PhotoEditor";
import { FLYER_CONFIG } from "@/lib/config";

export function FlyerGenerator() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [transform, setTransform] = useState<TransformState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError("Unsupported format. Please use JPEG, PNG, or WebP.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Please select a photo under 5MB.");
      return;
    }

    try {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setIsEditing(true);
      setTransform(null);
    } catch (err) {
      setError("Failed to load image. Please try another photo.");
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [selectedImage]);

  const triggerFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleConfirmCrop = useCallback((newTransform: TransformState) => {
    setTransform(newTransform);
    setIsEditing(false);
  }, []);

  const handleCancelCrop = useCallback(() => {
    if (!transform) {
      if (selectedImage) URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
    setIsEditing(false);
  }, [transform, selectedImage]);

  const handleDownload = async () => {
    if (!selectedImage || !transform) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const { composeFlyer } = await import("@/lib/canvas");
      const dataUrl = await composeFlyer("/flyer-template.png", selectedImage, transform);
      
      const link = document.createElement("a");
      link.download = "DIG-CAMPUS-CARNIVAL-My-Flyer.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Failed to generate flyer", e);
      setError("Failed to generate flyer. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Math for preview container
  let pctDrawWidth = 0;
  let pctDrawHeight = 0;
  let pctOffsetX = 0;
  let pctOffsetY = 0;
  
  if (transform) {
    const frameWidth = FLYER_CONFIG.photoFrame.width;
    const frameHeight = FLYER_CONFIG.photoFrame.height;
    const finalScale = transform.baseScale * transform.zoom;
    const drawWidth = transform.imgWidth * finalScale;
    const drawHeight = transform.imgHeight * finalScale;
    const initialOffsetX = (frameWidth - drawWidth) / 2;
    const initialOffsetY = (frameHeight - drawHeight) / 2;
    const offsetX = initialOffsetX + transform.panX;
    const offsetY = initialOffsetY + transform.panY;

    pctDrawWidth = (drawWidth / frameWidth) * 100;
    pctDrawHeight = (drawHeight / frameHeight) * 100;
    pctOffsetX = (offsetX / frameWidth) * 100;
    pctOffsetY = (offsetY / frameHeight) * 100;
  }

  return (
    <section id="generator" className="py-32 bg-slate-50 relative z-10 overflow-hidden" aria-labelledby="generator-heading">
      
      {/* Decorative Splash Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Top Left Blue Splash */}
        <svg viewBox="0 0 200 200" className="absolute -top-20 -left-20 w-96 h-96 text-primary opacity-10 animate-float-slow" fill="currentColor">
          <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.1C90.8,-33.1,96.8,-17.2,96.4,-1.6C96,14,89.1,29,79.5,41.9C69.9,54.8,57.6,65.6,43.2,72.7C28.8,79.8,12.3,83.1,-3.5,89.6C-19.3,96.1,-34.4,105.8,-47.9,101.4C-61.4,97,-73.3,78.5,-80.7,60.8C-88.1,43.1,-91.1,26.2,-91.7,9.7C-92.3,-6.8,-90.5,-22.9,-83.4,-36.8C-76.3,-50.7,-63.9,-62.4,-50.2,-69.6C-36.5,-76.8,-21.5,-79.5,-4.9,-71.4C11.7,-63.3,23.4,-44.4,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
        {/* Bottom Right Red/Yellow Splash */}
        <svg viewBox="0 0 200 200" className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] text-accent opacity-5 animate-float-delayed-slow" fill="currentColor">
          <path d="M51.9,-70.7C65.5,-60.8,73.5,-43.3,78.5,-26.1C83.5,-8.9,85.5,8.1,80.6,23.3C75.7,38.5,63.9,51.8,49.8,61.8C35.7,71.8,19.3,78.5,1.2,76.8C-16.9,75.1,-33.8,65,-48.8,54C-63.8,43,-76.9,31.1,-82.5,16C-88.1,0.9,-86.2,-17.3,-78,-32.8C-69.8,-48.3,-55.3,-61.1,-40.3,-70C-25.3,-78.9,-9.8,-83.9,4.4,-90.1C18.6,-96.3,37.2,-103.7,51.9,-70.7Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16 relative">
          <div className="inline-flex justify-center mb-6 relative">
            <div className="absolute inset-0 bg-yellow/20 blur-2xl rounded-full scale-150" />
            <PartyPopper className="h-12 w-12 text-accent animate-float-slow relative z-10" />
          </div>
          <h2 id="generator-heading" className="font-heading text-[clamp(1.25rem,6vw,2.25rem)] sm:text-5xl lg:text-6xl font-black tracking-tighter sm:tracking-tight text-navy mb-6 whitespace-nowrap">
            Create Your Carnival Flyer
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Upload your photo, make it yours, and share the excitement!
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Controls Container */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            
            {/* Step 1: Upload */}
            <div className="relative bg-white rounded-[2rem] border-4 border-primary/10 p-6 sm:p-8 shadow-xl shadow-primary/5 transition-all hover:border-primary/30">
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-2xl shadow-lg border-4 border-white transform -rotate-6">
                1
              </div>
              <h3 className="font-heading text-2xl font-black text-navy mb-6 ml-4">
                Upload Your Photo
              </h3>
              
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/webp" 
                className="sr-only" 
                aria-label="Upload photo"
              />
              
              <button 
                onClick={triggerFileSelect}
                aria-label="Select photo to upload"
                className="w-full relative group flex flex-col items-center justify-center border-4 border-dashed border-primary/40 bg-blue-50/50 rounded-2xl p-10 text-center hover:bg-blue-50 hover:border-primary transition-all overflow-hidden"
              >
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-yellow/20 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-accent/20 rounded-full blur-xl group-hover:scale-150 transition-transform" />

                <div className="relative z-10 rounded-full bg-white shadow-md p-5 mb-5 text-primary transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <Upload className="h-8 w-8" aria-hidden="true" />
                </div>
                <p className="text-xl font-bold text-navy mb-2 relative z-10">Click to upload photo</p>
                <p className="text-sm font-medium text-muted-foreground relative z-10">JPEG, PNG, or WebP (max 5MB)</p>
              </button>
              
              <div aria-live="polite">
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <p className="text-accent text-sm font-bold">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Adjust */}
            <div className={`relative bg-white rounded-[2rem] border-4 border-accent/10 p-6 sm:p-8 shadow-xl shadow-accent/5 transition-all duration-300 ${!selectedImage ? 'opacity-50 pointer-events-none grayscale filter blur-[1px]' : 'hover:border-accent/30'}`}>
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-black text-2xl shadow-lg border-4 border-white transform rotate-6">
                2
              </div>
              <h3 className="font-heading text-2xl font-black text-navy mb-6 ml-4">
                Adjust Your Photo
              </h3>
              
              {selectedImage ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setIsEditing(true)}
                    aria-label="Re-adjust photo positioning"
                    className="flex-1 flex items-center justify-center px-6 py-4 rounded-xl bg-accent text-white text-lg font-bold hover:bg-[#E0353C] transition-transform hover:-translate-y-1 shadow-lg shadow-accent/20"
                  >
                    <Settings2 className="h-6 w-6 mr-3" aria-hidden="true" />
                    Edit Position
                  </button>
                  <button 
                    onClick={triggerFileSelect}
                    aria-label="Change uploaded photo"
                    className="flex-1 flex items-center justify-center px-6 py-4 rounded-xl border-2 border-slate-200 text-navy text-lg font-bold hover:bg-slate-50 transition-transform hover:-translate-y-1 shadow-sm"
                  >
                    <ImageIcon className="h-6 w-6 mr-3 text-slate-500" aria-hidden="true" />
                    Change Photo
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <p className="text-slate-400 font-bold">Upload a photo to unlock</p>
                </div>
              )}
            </div>

            {/* Step 3: Download */}
            <div className={`relative bg-white rounded-[2rem] border-4 border-yellow/30 p-6 sm:p-8 shadow-xl shadow-yellow/10 transition-all duration-300 ${(!selectedImage || !transform) ? 'opacity-50 pointer-events-none grayscale filter blur-[1px]' : 'hover:border-yellow'}`}>
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-yellow text-navy rounded-full flex items-center justify-center font-black text-2xl shadow-lg border-4 border-white transform -rotate-3">
                3
              </div>
              <h3 className="font-heading text-2xl font-black text-navy mb-6 ml-4">
                Download Your Flyer
              </h3>
              <button 
                disabled={!selectedImage || !transform || isGenerating}
                onClick={handleDownload}
                aria-label="Download final flyer"
                className="flex w-full items-center justify-center rounded-2xl bg-yellow py-4 sm:py-5 px-3 sm:px-8 text-[clamp(1rem,4.5vw,1.25rem)] sm:text-xl font-black text-navy shadow-xl shadow-yellow/30 transition-all hover:scale-[1.02] hover:bg-[#FACC15] disabled:pointer-events-none disabled:opacity-50 disabled:grayscale whitespace-nowrap"
              >
                {isGenerating ? (
                  <Loader2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-7 sm:w-7 shrink-0 animate-spin" aria-hidden="true" />
                ) : (
                  <Download className="mr-2 sm:mr-3 h-5 w-5 sm:h-7 sm:w-7 shrink-0" aria-hidden="true" />
                )}
                {isGenerating ? "Preparing Flyer..." : "I Will Be Attending!"}
              </button>
            </div>
            
          </div>

          {/* Preview Container */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-32 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-accent/5 to-yellow/10 rounded-[3rem] blur-xl -z-10" />
              
              <div className="bg-white p-4 sm:p-6 rounded-[2rem] shadow-2xl ring-1 ring-black/5">
                <div className="flex items-center justify-center gap-2 mb-4 text-navy font-bold">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Live Preview
                </div>
                
                <div className="relative aspect-square w-full bg-slate-100 rounded-xl overflow-hidden shadow-inner ring-1 ring-black/10 select-none">
                  
                  {/* Template Image (Base) */}
                  <Image 
                    src="/flyer-template.png" 
                    alt="DIG CAMPUS CARNIVAL Flyer Template mask" 
                    fill 
                    className="object-contain z-0 relative pointer-events-none drop-shadow-md"
                    priority
                    unoptimized
                  />

                  {/* Photo Overlay (On Top) */}
                  {selectedImage && transform && (
                    <div 
                      className="absolute z-10 overflow-hidden bg-slate-100"
                      style={{
                        left: `${(FLYER_CONFIG.photoFrame.x / FLYER_CONFIG.templateWidth) * 100}%`,
                        top: `${(FLYER_CONFIG.photoFrame.y / FLYER_CONFIG.templateHeight) * 100}%`,
                        width: `${(FLYER_CONFIG.photoFrame.width / FLYER_CONFIG.templateWidth) * 100}%`,
                        height: `${(FLYER_CONFIG.photoFrame.height / FLYER_CONFIG.templateHeight) * 100}%`
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={selectedImage} 
                        alt="Cropped preview of your photo" 
                        className="absolute max-w-none origin-top-left"
                        style={{
                          left: `${pctOffsetX}%`,
                          top: `${pctOffsetY}%`,
                          width: `${pctDrawWidth}%`,
                          height: `${pctDrawHeight}%`
                        }}
                      />
                    </div>
                  )}

                  {!selectedImage && (
                    <div 
                      className="absolute z-10 flex items-center justify-center p-2 sm:p-4"
                      style={{
                        left: `${(FLYER_CONFIG.photoFrame.x / FLYER_CONFIG.templateWidth) * 100}%`,
                        top: `${(FLYER_CONFIG.photoFrame.y / FLYER_CONFIG.templateHeight) * 100}%`,
                        width: `${(FLYER_CONFIG.photoFrame.width / FLYER_CONFIG.templateWidth) * 100}%`,
                        height: `${(FLYER_CONFIG.photoFrame.height / FLYER_CONFIG.templateHeight) * 100}%`
                      }}
                    >
                      <div className="border-4 border-dashed border-slate-300 rounded-lg w-full h-full flex items-center justify-center text-center p-2 bg-white/70 backdrop-blur-sm">
                        <span className="text-slate-500 font-bold text-xs sm:text-sm">
                          Your photo will appear here
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && selectedImage && (
        <PhotoEditor
          imageSrc={selectedImage}
          onConfirm={handleConfirmCrop}
          onCancel={handleCancelCrop}
          onReplace={triggerFileSelect}
        />
      )}
    </section>
  );
}
