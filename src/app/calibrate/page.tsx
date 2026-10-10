"use client";

import { useState } from 'react';
import { FLYER_CONFIG } from '@/lib/config';

export default function Calibrate() {
  const [frame, setFrame] = useState(FLYER_CONFIG.photoFrame);

  const update = (key: keyof typeof frame, val: number) => {
    setFrame(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Flyer Photo Frame Calibration</h1>
      <p className="mb-8">Use this to find the exact pixel coordinates of the inner photo hole.</p>
      
      <div className="flex gap-8">
        <div className="flex-1 max-w-sm space-y-4">
          <div>
            <label className="block text-sm font-medium">X Position: {frame.x}</label>
            <input type="range" min="0" max="1254" value={frame.x} onChange={(e) => update('x', Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-1">
              <button onClick={() => update('x', frame.x - 1)} className="px-2 py-1 bg-gray-200 rounded text-xs">-1</button>
              <button onClick={() => update('x', frame.x + 1)} className="px-2 py-1 bg-gray-200 rounded text-xs">+1</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Y Position: {frame.y}</label>
            <input type="range" min="0" max="1254" value={frame.y} onChange={(e) => update('y', Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-1">
              <button onClick={() => update('y', frame.y - 1)} className="px-2 py-1 bg-gray-200 rounded text-xs">-1</button>
              <button onClick={() => update('y', frame.y + 1)} className="px-2 py-1 bg-gray-200 rounded text-xs">+1</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Width: {frame.width}</label>
            <input type="range" min="10" max="1254" value={frame.width} onChange={(e) => update('width', Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-1">
              <button onClick={() => update('width', frame.width - 1)} className="px-2 py-1 bg-gray-200 rounded text-xs">-1</button>
              <button onClick={() => update('width', frame.width + 1)} className="px-2 py-1 bg-gray-200 rounded text-xs">+1</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Height: {frame.height}</label>
            <input type="range" min="10" max="1254" value={frame.height} onChange={(e) => update('height', Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-1">
              <button onClick={() => update('height', frame.height - 1)} className="px-2 py-1 bg-gray-200 rounded text-xs">-1</button>
              <button onClick={() => update('height', frame.height + 1)} className="px-2 py-1 bg-gray-200 rounded text-xs">+1</button>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Resulting Config:</h3>
            <pre className="text-xs">
{JSON.stringify(frame, null, 2)}
            </pre>
          </div>
        </div>

        <div className="relative border shadow-lg" style={{ width: 800, height: 800 * (FLYER_CONFIG.templateHeight / FLYER_CONFIG.templateWidth) }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/flyer-template.png" className="w-full h-full object-contain absolute inset-0" alt="Template" />
          
          <div 
            className="absolute border-2 border-red-500 bg-red-500/30"
            style={{
              left: `${(frame.x / FLYER_CONFIG.templateWidth) * 100}%`,
              top: `${(frame.y / FLYER_CONFIG.templateHeight) * 100}%`,
              width: `${(frame.width / FLYER_CONFIG.templateWidth) * 100}%`,
              height: `${(frame.height / FLYER_CONFIG.templateHeight) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
