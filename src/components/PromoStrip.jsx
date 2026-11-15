import React from 'react';
import Icon from '@global/Icon';
import { useStore } from '@/context/StoreContext';
import { t } from '@global/t';

export const displayName = 'Promo Banner Strip';
export const shortDescription = 'Horizontal promo strip with key selling points';

export default function PromoStrip() {
  const { siteContent } = useStore();
  const points = siteContent?.promoStrip || [
    { icon: 'truck', text: 'Livraison gratuite dès 50 €' },
    { icon: 'refresh-cw', text: 'Retours sous 30 jours' },
    { icon: 'shield-check', text: 'Paiement 100 % sécurisé' },
    { icon: 'star', text: 'Produits certifiés enfants' },
  ];

  return (
    <div className="mx-4 md:mx-16 my-6 bg-secondary rounded-2xl px-6 md:px-10 py-4 shadow-xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
        {points.map((p, i) => (
          <div key={i} className="flex items-center gap-3 justify-start md:justify-center">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xs text-foreground flex-shrink-0">
              <Icon i={p.icon} size={18} />
            </div>
            <span className="text-xs md:text-sm font-body font-extrabold text-secondary-foreground leading-snug">
              {t(p.text)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
