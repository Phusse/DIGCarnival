"use client";

import { useEffect, useRef, useState } from 'react';

const COLORS = ['#1649D8', '#F43F46', '#FFD43B', '#FFFFFF'];
const SHAPES = ['circle', 'rect', 'ribbon'];

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: string;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Intersection Observer to pause when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const isMobile = window.innerWidth < 768;
    const targetParticleCount = isMobile ? 8 : 18;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.parentElement.clientWidth;
      const height = canvas.parentElement.clientHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    
    const getCanvasDimensions = () => {
      return {
        width: canvas?.parentElement?.clientWidth || window.innerWidth,
        height: canvas?.parentElement?.clientHeight || window.innerHeight
      };
    };

    const createParticle = (): Particle => {
      const { width } = getCanvasDimensions();
      return {
        x: Math.random() * width,
        y: -20 - Math.random() * 100, // start above screen
        size: Math.random() * 8 + 4, // 4px to 12px
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        speed: Math.random() * 2 + 1, // 1 to 3 px per frame
        drift: (Math.random() - 0.5) * 1, // left/right drift
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        opacity: Math.random() * 0.5 + 0.5 // 0.5 to 1.0
      };
    };

    const initParticles = () => {
      particles = [];
      const { height } = getCanvasDimensions();
      for (let i = 0; i < targetParticleCount; i++) {
        const p = createParticle();
        // stagger them from above the screen down to the bottom
        p.y = (Math.random() * height * 1.5) - height; 
        particles.push(p);
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      const { width, height } = getCanvasDimensions();
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        } else {
          // Ribbon
          ctx.fillRect(-p.size / 4, -p.size, p.size / 2, p.size * 2);
        }
        ctx.restore();

        // Update positions
        p.y += p.speed;
        p.x += Math.sin(p.y / 50) * p.drift; // slight sine wave drift
        p.rotation += p.rotationSpeed;

        // Reset if it goes off screen
        if (p.y > height + 20) {
          Object.assign(p, createParticle());
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    initParticles();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
