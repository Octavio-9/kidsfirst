import React from 'react';
import Icon from '@global/Icon';
import KidLogo from '@components/KidLogo';
import { t } from '@global/t';

export const displayName = 'Kid First Footer';
export const shortDescription = 'Footer with links, contact and social icons';

export default function KidFooter({ onOpenWhatsApp }) {
  return (
    <footer className="bg-foreground text-white mt-16 px-6 md:px-16 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <KidLogo className="h-10 w-auto" variant="dark" />
          </div>
          <p className="text-sm font-body text-white/70 leading-relaxed">
            {t('La boutique en ligne dédiée aux enfants de 0 à 14 ans. Mode ludique, chaussures confortables, puériculture et jouets d\'éveil.')}
          </p>
          <div className="flex items-center gap-3 pt-2">
            {['instagram', 'facebook', 'twitter'].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-center text-white"
                title={s}
              >
                <Icon i={s} size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-base font-headings font-extrabold mb-4 text-[#78C8E8]">
            {t('Catégories')}
          </h4>
          <ul className="space-y-2.5">
            {[t('Vêtements'), t('Chaussures'), t('Accessoires'), t('Bébé & Naissance'), t('Jouets & Éveil'), t('École & Rentrée')].map((c, i) => (
              <li key={i}>
                <a href={`#${c}`} className="text-sm font-body text-white/70 hover:text-secondary transition-colors">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Aide & Infos */}
        <div>
          <h4 className="text-base font-headings font-extrabold mb-4 text-[#78C8E8]">
            {t('Aide & Infos')}
          </h4>
          <ul className="space-y-2.5">
            {[t('Foire aux questions (FAQ)'), t('Livraison & Retours'), t('Suivi de commande'), t('Guide des tailles enfants'), t('Mentions légales'), t('Politique de confidentialité')].map((c, i) => (
              <li key={i}>
                <a href={`#${c}`} className="text-sm font-body text-white/70 hover:text-secondary transition-colors">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact direct WhatsApp */}
        <div>
          <h4 className="text-base font-headings font-extrabold mb-4 text-[#78C8E8]">
            {t('Service Client & WhatsApp')}
          </h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-sm font-body text-white/80">
              <Icon i="message-circle" size={16} className="text-emerald-400" />
              <span>{t('WhatsApp : +33 6 12 34 56 78')}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-body text-white/80">
              <Icon i="mail" size={16} className="text-[#78C8E8]" />
              <span>{t('contact@kidfirst.fr')}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-body text-white/80">
              <Icon i="clock" size={16} className="text-secondary" />
              <span>{t('Lun–Sam, 9h–18h')}</span>
            </div>

            <button
              onClick={() => onOpenWhatsApp ? onOpenWhatsApp() : window.open('https://wa.me/33612345678', '_blank')}
              className="mt-2 flex items-center gap-2 bg-secondary hover:bg-[#ffe085] text-secondary-foreground font-body font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 w-fit"
            >
              <Icon i="message-circle" size={16} />
              <span>{t('Échanger sur WhatsApp')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs font-body text-white/50 text-center md:text-left">
          {t('© 2026 Kid First — Plateforme e-commerce pour enfants. Tous droits réservés.')}
        </span>
        <div className="flex items-center gap-4 text-white/60">
          <div className="flex items-center gap-1.5 text-xs font-body">
            <Icon i="credit-card" size={16} className="text-secondary" />
            <span>{t('CB / Visa / Mastercard')}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5 text-xs font-body">
            <Icon i="shield-check" size={16} className="text-emerald-400" />
            <span>{t('Paiement 100 % sécurisé')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

