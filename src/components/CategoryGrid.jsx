import React from 'react';
import Icon from '@global/Icon';
import Image from '@global/Image';
import { t } from '@global/t';

export const displayName = 'Category Grid';
export const shortDescription = 'Quick access category icons grid';

const categories = [
  { label: 'Vêtements', count: '142 articles', icon: 'shirt', color: 'bg-tag text-tag-foreground', prompt: 'Colorful kids clothing items on white background, flat lay, pastel tones' },
  { label: 'Chaussures', count: '85 articles', icon: 'footprints', color: 'bg-secondary text-secondary-foreground', prompt: 'Cute kids shoes sneakers on white background, colorful, pastel photography' },
  { label: 'Accessoires', count: '64 articles', icon: 'glasses', color: 'bg-muted text-muted-foreground', prompt: 'Kids accessories bags hats sunglasses flat lay, pastel background' },
  { label: 'Bébé', count: '96 articles', icon: 'baby', color: 'bg-primary text-primary-foreground', prompt: 'Baby clothes onesies soft pastel photography white background' },
  { label: 'Jouets', count: '110 articles', icon: 'toy-brick', color: 'bg-secondary text-secondary-foreground', prompt: 'Colorful kids toys plush animals blocks, bright cheerful photography' },
  { label: 'École', count: '52 articles', icon: 'backpack', color: 'bg-tag text-tag-foreground', prompt: 'Kids school supplies backpack pencils books, colorful flat lay photography' },
];

export default function CategoryGrid({ onSelectCategory, selectedCategory }) {
  return (
    <section className="px-4 md:px-16 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-headings font-extrabold text-foreground">
            {t('Nos univers enfants')}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground font-body mt-1">
            {t('Sélectionnez une catégorie pour découvrir nos essentiels')}
          </p>
        </div>
        <button
          onClick={() => onSelectCategory && onSelectCategory('Tous')}
          className="text-sm font-body font-bold text-primary hover:underline flex items-center gap-1"
        >
          {t('Toutes les catégories')} →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
        {categories.map((cat, i) => {
          const isSelected = selectedCategory === cat.label;
          return (
            <div
              key={i}
              onClick={() => onSelectCategory && onSelectCategory(cat.label)}
              className={`flex flex-col items-center gap-3 group cursor-pointer p-2 rounded-2xl transition-all duration-300 ${
                isSelected ? 'bg-primary/10 ring-2 ring-primary scale-102' : 'hover:-translate-y-1'
              }`}
            >
              <div className="w-full rounded-2xl overflow-hidden aspect-square relative shadow-xs bg-input border border-border">
                <Image
                  ar="1:1"
                  prompt={cat.prompt}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div
                  className={`absolute bottom-2.5 left-2.5 right-2.5 rounded-xl px-2.5 py-1.5 ${cat.color} flex items-center justify-center gap-1.5 shadow-sm backdrop-blur-xs`}
                >
                  <Icon i={cat.icon} size={14} />
                  <span className="text-xs font-headings font-extrabold">{cat.label}</span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-sm font-body font-extrabold text-foreground block group-hover:text-primary transition-colors">
                  {t(cat.label)}
                </span>
                <span className="text-[11px] font-body text-muted-foreground">
                  {cat.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

