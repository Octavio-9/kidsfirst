import React, { useState } from 'react';

const promptMap = {
  'hero': 'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=1600&q=80',
  'vetements': 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80',
  'chaussures': 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80',
  'accessoires': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
  'bebe': 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=600&q=80',
  'jouets': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
  'ecole': 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80',
  't-shirt': 'https://images.unsplash.com/photo-1503944543220-79d8926ad5e2?auto=format&fit=crop&w=600&q=80',
  'robe': 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80',
  'jean': 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
  'sneakers': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
  'cargo': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80',
  'onesie': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
  'licorne': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
  'chapeau': 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80',
  'manteau': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80',
  'peluche': 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80',
  'ensemble': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
  'cuir': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
};

function resolveImageFromPrompt(prompt = '') {
  const p = prompt.toLowerCase();
  if (p.includes('playing in a bright') || p.includes('hero') || p.includes('fashion')) return promptMap['hero'];
  if (p.includes('t-shirt') || p.includes('striped')) return promptMap['t-shirt'];
  if (p.includes('floral dress') || p.includes('robe')) return promptMap['robe'];
  if (p.includes('denim') || p.includes('jean')) return promptMap['jean'];
  if (p.includes('rainbow') || p.includes('sneakers') || p.includes('shoes sneakers')) return promptMap['chaussures'];
  if (p.includes('cargo') || p.includes('pantalon')) return promptMap['cargo'];
  if (p.includes('onesie') || p.includes('baby clothes')) return promptMap['bebe'];
  if (p.includes('unicorn') || p.includes('backpack') || p.includes('school')) return promptMap['ecole'];
  if (p.includes('sun hat') || p.includes('hats sunglasses') || p.includes('accessories')) return promptMap['accessoires'];
  if (p.includes('winter coat') || p.includes('coat')) return promptMap['manteau'];
  if (p.includes('teddy bear') || p.includes('toys plush')) return promptMap['jouets'];
  if (p.includes('clothing items')) return promptMap['vetements'];
  if (p.includes('3 piece') || p.includes('ensemble')) return promptMap['ensemble'];
  if (p.includes('leather shoes')) return promptMap['cuir'];

  return 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80';
}

export default function Image({ src, prompt, ar, className = '', alt = 'Kid First Image', ...props }) {
  const initialUrl = src || (prompt ? resolveImageFromPrompt(prompt) : '');
  const [imgSrc, setImgSrc] = useState(initialUrl);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc('https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80');
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      loading="lazy"
      {...props}
    />
  );
}

