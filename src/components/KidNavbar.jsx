import React, { useState } from 'react';
import Icon from '@global/Icon';
import KidLogo from '@components/KidLogo';
import { categoriesList } from '@/data/products';
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

  const handleCategoryClick = (catLabel) => {
    if (onSelectCategory) onSelectCategory(catLabel);
    if (onNavigate) onNavigate('category', catLabel);
  };

  const handlePromotionsClick = () => {
    if (onNavigate) onNavigate('promotions');
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40 backdrop-blur-md bg-opacity-95 shadow-xs">
      {/* Top bar */}
      <div className="bg-primary px-8 py-2 flex items-center justify-center gap-2 text-primary-foreground font-semibold text-xs tracking-wide">
        <Icon i="truck" size={14} />
        <span>{t('Livraison gratuite à partir de 50 € d\'achat en France & Belgique')}</span>
        <span className="mx-2 hidden md:inline">•</span>
        <span className="hidden md:inline text-xs opacity-90">{t('Retours faciles sous 30 jours')}</span>
        <span className="mx-2 hidden md:inline">•</span>
        <button
          onClick={handlePromotionsClick}
          className="hidden md:inline-flex items-center gap-1 bg-secondary text-secondary-foreground text-[10px] font-extrabold px-2 py-0.5 rounded-full hover:bg-white transition-all cursor-pointer"
        >
          <span>🔥 Ventes Flash</span>
        </button>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCategoryClick('Tous');
              }
            }}
            placeholder={t('Rechercher un article, taille, couleur...')}
            className="w-full bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => onNavigate && onNavigate('account')}
            className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
              activePage === 'account' ? 'text-primary' : 'text-foreground hover:text-primary'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activePage === 'account' ? 'bg-primary/10' : ''}`}>
              <Icon i="user" size={20} />
            </div>
            <span className="text-[11px] font-body font-bold">{t('Compte')}</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('account')}
            className="flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <div className="p-1.5 rounded-xl hover:bg-muted">
              <Icon i="heart" size={20} />
            </div>
            <span className="text-[11px] font-body font-bold">{t('Favoris')}</span>
          </button>

          <button
            onClick={() => onOpenCart && onOpenCart()}
            className="flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors relative cursor-pointer"
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
          type="button"
          onClick={() => onNavigate && onNavigate('home')}
          className={`text-sm font-body font-bold whitespace-nowrap pb-0.5 transition-all cursor-pointer ${
            activePage === 'home'
              ? 'text-primary border-b-2 border-primary'
              : 'text-foreground hover:text-primary'
          }`}
        >
          {t('Accueil')}
        </button>

        {categoriesList.map((cat) => {
          const isCategoryActive = activePage === 'category' && selectedCategory === cat.label;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.label)}
              className={`text-sm font-body font-semibold whitespace-nowrap pb-0.5 transition-all cursor-pointer ${
                isCategoryActive
                  ? 'text-primary border-b-2 border-primary font-bold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              {cat.label}
            </button>
          );
        })}

        {/* Promotions Button */}
        <button
          type="button"
          onClick={handlePromotionsClick}
          className={`text-sm font-body font-extrabold whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
            activePage === 'promotions'
              ? 'bg-secondary text-secondary-foreground shadow-sm scale-105'
              : 'text-[#F4A261] hover:bg-secondary/20 hover:scale-105'
          }`}
        >
          <span>🔥</span>
          <span>{t('Promotions & Bons Plans')}</span>
        </button>
      </nav>
    </header>
  );
}
