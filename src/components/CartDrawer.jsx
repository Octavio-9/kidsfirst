import React from 'react';
import Icon from '@global/Icon';
import Image from '@global/Image';
import { t } from '@global/t';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}) {
  if (!isOpen) return null;

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const cleaned = priceStr.replace('€', '').replace(',', '.').trim();
    return parseFloat(cleaned) || 0;
  };

  const subtotal = items.reduce((sum, item) => {
    return sum + parsePrice(item.price) * (item.qty || 1);
  }, 0);

  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-card h-full shadow-2xl flex flex-col justify-between border-l border-border z-10 animate-slideLeft">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon i="shopping-bag" size={20} className="text-primary" />
            <h2 className="text-xl font-headings font-extrabold text-foreground">
              {t('Mon Panier')}
            </h2>
            <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-input hover:bg-muted text-foreground flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-primary/10 px-6 py-3 border-b border-primary/20">
          <div className="flex justify-between items-center text-xs font-bold text-primary-foreground mb-1.5">
            <span>
              {remainingForFreeShipping === 0
                ? t('🎉 Félicitations ! Livraison gratuite offerte !')
                : t(`Plus que ${remainingForFreeShipping.toFixed(2)} € pour la livraison offerte`)}
            </span>
            <span>{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full bg-white/60 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-input text-muted-foreground rounded-full flex items-center justify-center mx-auto">
                <Icon i="shopping-bag" size={28} />
              </div>
              <p className="text-base font-bold text-foreground">{t('Votre panier est vide')}</p>
              <p className="text-xs text-muted-foreground">{t('Découvrez nos nouveautés pour les remplir de douceur !')}</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 bg-input/40 rounded-2xl border border-border"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-input flex-shrink-0 border border-border">
                  <Image
                    prompt={item.prompt}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-headings font-bold text-foreground truncate">
                    {item.name}
                  </h4>
                  <div className="text-xs text-muted-foreground font-body mt-0.5">
                    {item.size && <span>{t('Taille :')} {item.size} • </span>}
                    <span className="font-bold text-foreground">{item.price}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQty && onUpdateQty(index, Math.max(1, (item.qty || 1) - 1))}
                      className="w-6 h-6 rounded-md bg-white border border-border flex items-center justify-center text-xs font-bold hover:bg-muted"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.qty || 1}</span>
                    <button
                      onClick={() => onUpdateQty && onUpdateQty(index, (item.qty || 1) + 1)}
                      className="w-6 h-6 rounded-md bg-white border border-border flex items-center justify-center text-xs font-bold hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem && onRemoveItem(index)}
                  className="text-muted-foreground hover:text-red-500 p-1 text-sm transition-colors"
                  title={t('Supprimer')}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout */}
        <div className="p-6 border-t border-border bg-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-body text-muted-foreground">{t('Sous-total')}</span>
            <span className="text-xl font-headings font-extrabold text-foreground">
              {subtotal.toFixed(2)} €
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t('Frais de livraison estimés')}</span>
            <span className={remainingForFreeShipping === 0 ? 'text-emerald-600 font-bold' : ''}>
              {remainingForFreeShipping === 0 ? t('Offerts') : '4,90 €'}
            </span>
          </div>

          <button
            onClick={() => {
              if (onCheckout) onCheckout();
              else alert(t('Redirection vers le paiement sécurisé...'));
            }}
            disabled={items.length === 0}
            className="w-full bg-secondary hover:bg-[#ffe085] disabled:opacity-50 text-secondary-foreground font-headings font-extrabold py-3.5 rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Icon i="shield-check" size={18} />
            <span>{t('Valider la commande')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

