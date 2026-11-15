import React, { useState, useEffect } from 'react';
import Icon from '@global/Icon';
import Image from '@global/Image';
import { t } from '@global/t';

export const displayName = 'Hero Banner';
export const shortDescription = 'Full-width promotional hero banner';

const slides = [
  {
    badge: 'Nouveautés 2026',
    titleLine1: 'La mode enfant,',
    titleLine2: 'toujours en premier',
    desc: 'Découvrez notre nouvelle collection de vêtements et accessoires pour enfants de 0 à 14 ans.',
    primaryBtn: 'Découvrir la collection',
    secondaryBtn: 'Voir les promos',
    prompt: 'Kids playing in a bright colorful clothing store, pastel tones, soft lighting, joyful children wearing colorful outfits, editorial fashion photography',
  },
  {
    badge: 'Spécial Printemps',
    titleLine1: 'Confort & Douceur',
    titleLine2: 'pour vos tout-petits',
    desc: 'Des matières 100% coton biologique, douces et résistantes pour accompagner chaque aventure.',
    primaryBtn: 'Voir la gamme Bébé',
    secondaryBtn: 'Guide des tailles',
    prompt: 'Baby clothes onesies soft pastel photography white background',
  },
  {
    badge: 'Offre exclusive',
    titleLine1: 'Jusqu\'à -40%',
    titleLine2: 'sur les Chaussures & Baskets',
    desc: 'Préparez l\'école et les sorties avec nos modèles confortables testés par des pédiatres.',
    primaryBtn: 'Profiter des réductions',
    secondaryBtn: 'Toutes les chaussures',
    prompt: 'Cute kids shoes sneakers on white background, colorful, pastel photography',
  }
];

export default function HeroBanner({ onExploreCollection, onExplorePromos }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative mx-4 md:mx-16 mt-6 rounded-3xl overflow-hidden shadow-sm" style={{ minHeight: '440px', height: '460px' }}>
      <Image
        key={currentSlide}
        ar="21:9"
        prompt={slide.prompt}
        alt={slide.titleLine1}
        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
      />

      {/* Dark gradient overlay for optimal readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/80 via-[#1A1A2E]/50 to-transparent rounded-3xl" />

      {/* Slide Content */}
      <div className="absolute inset-0 flex items-center px-8 md:px-16">
        <div className="max-w-xl text-left">
          <div className="inline-flex items-center gap-2 bg-secondary rounded-xl px-4 py-1.5 mb-4 shadow-sm animate-fadeIn">
            <Icon i="sparkles" size={14} className="text-secondary-foreground" />
            <span className="text-xs font-body font-extrabold text-secondary-foreground">
              {t(slide.badge)}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-headings font-extrabold text-white leading-tight mb-4 tracking-tight drop-shadow-sm">
            {t(slide.titleLine1)} <br />
            <span className="text-secondary">{t(slide.titleLine2)}</span>
          </h1>

          <p className="text-sm md:text-base font-body text-white/90 mb-6 leading-relaxed max-w-lg">
            {t(slide.desc)}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onExploreCollection && onExploreCollection()}
              className="bg-secondary hover:bg-[#ffe085] text-secondary-foreground font-body font-extrabold px-6 py-3.5 rounded-2xl text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              {t(slide.primaryBtn)}
            </button>
            <button
              onClick={() => onExplorePromos && onExplorePromos()}
              className="bg-white/20 hover:bg-white/30 text-white font-body font-bold px-6 py-3.5 rounded-2xl text-sm border border-white/40 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            >
              {t(slide.secondaryBtn)}
            </button>
          </div>
        </div>
      </div>

      {/* Slide navigation controls */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white items-center justify-center transition-all"
        aria-label="Slide précédent"
      >
        ‹
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white items-center justify-center transition-all"
        aria-label="Slide suivant"
      >
        ›
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === currentSlide ? 'w-8 h-2.5 bg-secondary' : 'w-2.5 h-2.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

