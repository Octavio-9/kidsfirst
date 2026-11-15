import React, { useState, useEffect, useMemo } from 'react';
import KidNavbar from '@components/KidNavbar';
import KidFooter from '@components/KidFooter';
import ProductCard from '@components/ProductCard';
import Icon from '@global/Icon';
import { useStore } from '@/context/StoreContext';
import { t } from '@global/t';

export const displayName = 'Kid First — Section Promotions & Bons Plans';
export const screenSize = 'desktop';

const promoFilters = [
  { id: 'all', label: 'Toutes les promos' },
  { id: '40plus', label: '🔥 -40% et plus' },
  { id: 'under20', label: 'Moins de 20 €' },
  { id: 'vetements', label: 'Mode & Vêtements' },
  { id: 'bebe', label: 'Univers Bébé' },
  { id: 'chaussures', label: 'Chaussures' },
];

export default function PromotionsPage({
  cartCount = 3,
  onNavigate,
  onOpenCart,
  onAddToCart,
  onQuickView,
  onOpenWhatsApp
}) {
  const { products, siteContent } = useStore();
  const [activeFilter, setActiveFilter] = useState('all');
  const [copiedCode, setCopiedCode] = useState(false);

  const promoSettings = siteContent?.promotionsSettings || {
    heroTitle: 'Les Grandes Promos',
    heroSubtitle: 'Jusqu\'à -50% sur les essentiels',
    heroDesc: 'Habillez et gâtez vos petits avec nos vêtements en coton bio, chaussures confortables et jouets d\'éveil au meilleur prix.',
    couponCode: 'KID10',
    couponDiscount: '-10% dès 50 €'
  };

  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(promoSettings.couponCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Filtered promotions
  const promoProducts = useMemo(() => {
    return products.filter((p) => p.originalPrice || (p.discountPercent && p.discountPercent > 0));
  }, [products]);

  const filteredPromos = useMemo(() => {
    return promoProducts.filter((p) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === '40plus') return (p.discountPercent || 0) >= 40;
      if (activeFilter === 'under20') return p.numericPrice < 20;
      if (activeFilter === 'vetements') return p.category === 'Vêtements';
      if (activeFilter === 'bebe') return p.category === 'Bébé';
      if (activeFilter === 'chaussures') return p.category === 'Chaussures';
      return true;
    });
  }, [promoProducts, activeFilter]);

  return (
    <div className="bg-background font-body min-h-screen flex flex-col justify-between">
      <KidNavbar
        cartCount={cartCount}
        activePage="promotions"
        onNavigate={onNavigate}
        onOpenCart={onOpenCart}
      />

      <main className="flex-1 px-4 md:px-16 py-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-body text-muted-foreground">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            {t('Accueil')}
          </button>
          <span>/</span>
          <span className="text-foreground font-bold">{t('Promotions & Ventes Flash')}</span>
        </nav>

        {/* Hero Promotions & Countdown Section */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFD76A] via-[#ffe085] to-[#78C8E8]/40 p-8 md:p-12 border border-secondary shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#1A1A2E] text-white px-3.5 py-1.5 rounded-xl text-xs font-headings font-extrabold shadow-sm">
                <Icon i="sparkles" size={14} className="text-secondary" />
                <span>{t('Offre Spéciale Enfants')}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-headings font-extrabold text-[#1A1A2E] tracking-tight leading-tight">
                {t(promoSettings.heroTitle)} <br />
                <span className="text-white drop-shadow-md">
                  {t(promoSettings.heroSubtitle)}
                </span>
              </h1>

              <p className="text-sm md:text-base text-[#1A1A2E]/80 font-body max-w-lg leading-relaxed">
                {t(promoSettings.heroDesc)}
              </p>

              {/* Coupon Code Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-secondary shadow-xs">
                  <span className="text-xs text-muted-foreground font-semibold">{t('Code promo :')}</span>
                  <span className="text-sm font-mono font-extrabold text-[#1A1A2E] tracking-wider">
                    {promoSettings.couponCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="text-xs font-bold text-primary hover:text-primary/80 transition-colors ml-1 cursor-pointer"
                  >
                    {copiedCode ? t('✓ Copié !') : t('Copier')}
                  </button>
                </div>
                <span className="text-xs text-[#1A1A2E]/80 font-semibold">
                  ({promoSettings.couponDiscount})
                </span>
              </div>
            </div>

            {/* Right Flash Sale Countdown Card */}
            <div className="lg:col-span-5 bg-white/90 backdrop-blur-md border border-white rounded-3xl p-6 shadow-xl text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-rose-500 font-headings font-extrabold text-sm">
                <Icon i="clock" size={16} />
                <span>{t('VENTE FLASH DU MOMENT')}</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-[#1A1A2E] text-white rounded-2xl p-3 shadow-xs">
                  <span className="text-2xl md:text-3xl font-headings font-extrabold block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-white/70 font-semibold uppercase">{t('Jours')}</span>
                </div>
                <div className="bg-[#1A1A2E] text-white rounded-2xl p-3 shadow-xs">
                  <span className="text-2xl md:text-3xl font-headings font-extrabold block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-white/70 font-semibold uppercase">{t('Heures')}</span>
                </div>
                <div className="bg-[#1A1A2E] text-white rounded-2xl p-3 shadow-xs">
                  <span className="text-2xl md:text-3xl font-headings font-extrabold block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-white/70 font-semibold uppercase">{t('Minutes')}</span>
                </div>
                <div className="bg-[#1A1A2E] text-white rounded-2xl p-3 shadow-xs">
                  <span className="text-2xl md:text-3xl font-headings font-extrabold block text-secondary">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-white/70 font-semibold uppercase">{t('Sec')}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground font-body">
                {t('Stocks limités sur les tailles sélectionnées. Valable dans la limite des disponibilités.')}
              </p>
            </div>
          </div>
        </section>

        {/* 3 Special Promo Perk Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border-2 border-primary/40 rounded-3xl p-6 flex items-start gap-4 shadow-xs hover:border-primary transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
              <Icon i="sparkles" size={22} />
            </div>
            <div>
              <h3 className="font-headings font-extrabold text-foreground text-base">
                {t('Offre 2 + 1')}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {t('Pour 2 articles achetés dans la catégorie Vêtements, le 3ème article est à -50% !')}
              </p>
            </div>
          </div>

          <div className="bg-card border-2 border-secondary/60 rounded-3xl p-6 flex items-start gap-4 shadow-xs hover:border-secondary transition-all">
            <div className="w-12 h-12 rounded-2xl bg-secondary/30 text-secondary-foreground flex items-center justify-center flex-shrink-0">
              <Icon i="truck" size={22} />
            </div>
            <div>
              <h3 className="font-headings font-extrabold text-foreground text-base">
                {t('Livraison Offerte dès 40 €')}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {t('Frais de port offerts sur toutes les commandes contenant au moins un produit en promotion.')}
              </p>
            </div>
          </div>

          <div className="bg-card border-2 border-[#F4A261]/40 rounded-3xl p-6 flex items-start gap-4 shadow-xs hover:border-[#F4A261] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F4A261]/20 text-[#F4A261] flex items-center justify-center flex-shrink-0">
              <Icon i="refresh-cw" size={22} />
            </div>
            <div>
              <h3 className="font-headings font-extrabold text-foreground text-base">
                {t('Échanges 100% Gratuits')}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {t('Taille trop petite ou trop grande ? Remplacement sous 30 jours sans frais supplémentaires.')}
              </p>
            </div>
          </div>
        </section>

        {/* Promotions Filter Toolbar */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-headings font-extrabold text-foreground">
                {t('Les Pépites en Réduction')}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {filteredPromos.length} {t('produits en promotion active')}
              </p>
            </div>

            {/* Promo Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {promoFilters.map((flt) => (
                <button
                  key={flt.id}
                  onClick={() => setActiveFilter(flt.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-headings font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === flt.id
                      ? 'bg-secondary text-secondary-foreground shadow-sm scale-102'
                      : 'bg-card border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  {flt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Promo Products Grid with savings calculations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPromos.map((prod) => {
              const diff =
                prod.numericOriginalPrice && prod.numericPrice
                  ? (prod.numericOriginalPrice - prod.numericPrice).toFixed(2)
                  : null;

              return (
                <div key={prod.id} className="relative group">
                  <ProductCard
                    {...prod}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                  {diff && (
                    <div className="mt-2 text-center">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        {t(`Économie : ${diff} €`)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <KidFooter onOpenWhatsApp={onOpenWhatsApp} />
    </div>
  );
}
