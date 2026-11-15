import React, { useState } from 'react';

export default function KidLogo({ className = 'h-11 w-auto', variant = 'light' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const bananiLogoUrl = "https://firebasestorage.googleapis.com/v0/b/banani-prod.appspot.com/o/reference-images%2F0ae21ab5-3f6b-46f2-a88d-b587c013c8ad?alt=media&token=0a6df7ec-a773-4057-bc39-4cce16cb35ea";

  if (!imageFailed) {
    return (
      <img
        src={bananiLogoUrl}
        alt="Kid First"
        className={`${className} object-contain transition-transform hover:scale-105`}
        onError={() => setImageFailed(true)}
      />
    );
  }

  // Graceful high-fidelity SVG Logo strictly aligned with the PRD branding
  return (
    <div className="flex items-center gap-2 select-none group cursor-pointer">
      <div className="w-10 h-10 rounded-2xl bg-[#78C8E8] flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#FFD76A]">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`text-xl font-extrabold tracking-tight font-headings ${variant === 'dark' ? 'text-white' : 'text-[#1A1A2E]'}`}>
          KID <span className="text-[#78C8E8]">FIRST</span>
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#F4A261]">
          Boutique Enfants
        </span>
      </div>
    </div>
  );
}

