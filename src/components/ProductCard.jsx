import React, { useState } from 'react';
import Icon from '@global/Icon';
import Image from '@global/Image';
import { t } from '@global/t';

export const displayName = 'Product Card';
export const shortDescription = 'Card displaying child product with price and actions';

export default function ProductCard({
  name,
  price,
  originalPrice,
  isNew,
  badge,
  prompt,
  category = 'Enfant',
  inStock = true,
  onAddToCart,
  onQuickView
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdded(true);
    if (onAddToCart) onAddToCart({ name, price, prompt });
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onClick={() => onQuickView && onQuickView({ name, price, originalPrice, isNew, badge, prompt })}
      className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-input">
        <Image
          prompt={prompt}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isNew && (
            <span className="bg-primary text-primary-foreground font-body font-bold text-xs px-2.5 py-1 rounded-lg shadow-sm">
              {t('Nouveau')}
            </span>
          )}
          {badge && (
            <span className={`font-body font-bold text-xs px-2.5 py-1 rounded-lg shadow-sm ${
              badge.includes('-')
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-white/90 text-foreground backdrop-blur-sm'
            }`}>
              {badge}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-red-50 text-red-500'
              : 'bg-white/80 hover:bg-white text-muted-foreground hover:text-red-500 backdrop-blur-sm'
          }`}
          title={isFavorite ? t('Retirer des favoris') : t('Ajouter aux favoris')}
        >
          <Icon i="heart" size={17} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 px-3 rounded-xl font-body font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
              added
                ? 'bg-emerald-500 text-white'
                : 'bg-secondary hover:bg-[#ffe085] text-secondary-foreground'
            }`}
          >
            <Icon i={added ? "check" : "shopping-bag"} size={14} />
            <span>{added ? t('Ajouté !') : t('Ajout rapide')}</span>
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{t('Kid First')}</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {t('En stock')}
            </span>
          </div>

          <h3 className="font-headings font-bold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-headings font-extrabold text-foreground">
              {price}
            </span>
            {originalPrice && (
              <span className="text-xs font-body text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-primary font-semibold group-hover:translate-x-0.5 transition-transform">
            {t('Détails')} →
          </span>
        </div>
      </div>
    </div>
  );
}

