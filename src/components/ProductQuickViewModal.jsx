import React, { useState } from 'react';
import Icon from '@global/Icon';
import Image from '@global/Image';
import { t } from '@global/t';

const availableSizes = ['2-3 ans', '4-5 ans', '6-7 ans', '8-10 ans', '12-14 ans'];
const availableColors = [
  { name: 'Bleu ciel', hex: '#78C8E8' },
  { name: 'Jaune pastel', hex: '#FFD76A' },
  { name: 'Blanc cassé', hex: '#FFFDF7', border: true },
  { name: 'Corail doux', hex: '#F4A261' },
];

export default function ProductQuickViewModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState('4-5 ans');
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    if (onAddToCart) {
      onAddToCart({
        ...product,
        size: selectedSize,
        color: selectedColor.name,
        qty: quantity
      });
    }
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-card w-full max-w-2xl rounded-3xl border border-border overflow-hidden shadow-2xl relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-input hover:bg-muted text-foreground flex items-center justify-center text-sm font-bold transition-colors"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto h-72 md:h-full bg-input">
            <Image
              prompt={product.prompt}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-lg">
                {t('Nouveauté')}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span className="font-bold text-primary">Kid First Collection</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {t('En stock (livraison 48h)')}
                </span>
              </div>

              <h2 className="text-2xl font-headings font-extrabold text-foreground">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 my-2">
                <span className="text-2xl font-headings font-extrabold text-foreground">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-body text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
                {product.badge && (
                  <span className="text-xs bg-secondary text-secondary-foreground font-bold px-2 py-0.5 rounded-md">
                    {product.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                {t('Confectionné avec des matières douces, hypoallergéniques et certifiées pour la peau délicate de vos enfants. Coupe moderne et pratique pour le quotidien.')}
              </p>
            </div>

            {/* Sizes */}
            <div>
              <label className="text-xs font-headings font-bold text-foreground block mb-2">
                {t('Taille :')} <span className="text-primary">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-input text-foreground hover:bg-muted'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="text-xs font-headings font-bold text-foreground block mb-2">
                {t('Couleur :')} <span className="text-muted-foreground">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-7 h-7 rounded-full transition-transform ${
                      color.border ? 'border border-border' : ''
                    } ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-primary ring-offset-2 scale-110'
                        : 'hover:scale-105'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add Button */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center border border-border rounded-xl bg-input px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 text-sm font-bold text-foreground flex items-center justify-center hover:bg-muted rounded-lg"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 text-sm font-bold text-foreground flex items-center justify-center hover:bg-muted rounded-lg"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 rounded-xl font-headings font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-secondary hover:bg-[#ffe085] text-secondary-foreground'
                }`}
              >
                <Icon i={added ? 'check' : 'shopping-bag'} size={16} />
                <span>{added ? t('Ajouté au panier !') : t('Ajouter au panier')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

