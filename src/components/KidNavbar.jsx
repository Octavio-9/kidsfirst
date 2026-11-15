import React, { useState } from 'react';
import Icon from '@global/Icon';
import KidLogo from '@components/KidLogo';
import { t } from '@global/t';

export const displayName = 'Kid First Navbar';
export const shortDescription = 'Top navigation bar for Kid First';

export default function KidNavbar({
  cartCount = 3,
  activePage = 'home',
  onNavigate,
  onOpenCart,
  selectedCategory = 'Tous',
  onSelectCategory
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [t('Vêtements'), t('Chaussures'), t('Accessoires'), t('Bébé'), t('Jouets'), t('École')];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40 backdrop-blur-md bg-opacity-95 shadow-xs">
      {/* Top bar */}
      <div className="bg-primary px-8 py-2 flex items-center justify-center gap-2 text-primary-foreground font-semibold text-xs tracking-wide">
        <Icon i="truck" size={14} />
        <span>{t('Livraison gratuite à partir de 50 € d\'achat en France & Belgique')}</span>
        <span className="mx-2 hidden md:inline">•</span>
        <span className="hidden md:inline text-xs opacity-90">{t('Retours faciles sous 30 jours')}</span>
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between px-6 md:px-16 py-4 gap-4">
        {/* Logo */}
        <div
          onClick={() => onNavigate && onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <KidLogo className="h-11 md:h-12 w-auto" />
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-3 bg-input rounded-2xl px-4 py-2.5 w-72 md:w-96 border border-border focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all">
          <Icon i="search" size={16} className="text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Rechercher un article, taille, couleur...')}
            className="w-full bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => onNavigate && onNavigate('account')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activePage === 'account' ? 'text-primary' : 'text-foreground hover:text-primary'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activePage === 'account' ? 'bg-primary/10' : ''}`}>
              <Icon i="user" size={20} />
            </div>
            <span className="text-[11px] font-body font-bold">{t('Compte')}</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('favorites')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activePage === 'favorites' ? 'text-primary' : 'text-foreground hover:text-primary'
            }`}
          >
            <div className="p-1.5 rounded-xl hover:bg-muted">
              <Icon i="heart" size={20} />
            </div>
            <span className="text-[11px] font-body font-bold">{t('Favoris')}</span>
          </button>

          <button
            onClick={() => onOpenCart && onOpenCart()}
            className="flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors relative"
          >
            <div className="relative p-1.5 rounded-xl hover:bg-muted">
              <Icon i="shopping-bag" size={20} />
              {cartCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 bg-secondary text-secondary-foreground rounded-full text-[10px] flex items-center justify-center font-extrabold shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-body font-bold">{t('Panier')}</span>
          </button>
        </div>
      </div>

      {/* Category nav */}
      <nav className="flex items-center justify-start md:justify-center gap-4 md:gap-8 px-6 md:px-16 py-3 border-t border-border overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            if (onNavigate) onNavigate('home');
            if (onSelectCategory) onSelectCategory('Tous');
          }}
          className={`text-sm font-body font-bold whitespace-nowrap pb-0.5 transition-all ${
            selectedCategory === 'Tous'
              ? 'text-primary border-b-2 border-primary'
              : 'text-foreground hover:text-primary'
          }`}
        >
          {t('Tout voir')}
        </button>

        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => {
              if (onNavigate) onNavigate('home');
              if (onSelectCategory) onSelectCategory(cat);
            }}
            className={`text-sm font-body font-semibold whitespace-nowrap pb-0.5 transition-all ${
              selectedCategory === cat
                ? 'text-primary border-b-2 border-primary'
                : 'text-foreground hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}

        <button
          onClick={() => {
            if (onNavigate) onNavigate('home');
            if (onSelectCategory) onSelectCategory('Promotions');
          }}
          className="text-sm font-body font-extrabold text-[#F4A261] whitespace-nowrap flex items-center gap-1 hover:scale-105 transition-transform"
        >
          {t('🔥 Promotions')}
        </button>
      </nav>
    </header>
  );
}

