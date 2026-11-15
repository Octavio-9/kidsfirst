import React from 'react';
import KidNavbar from '@components/KidNavbar';
import HeroBanner from '@components/HeroBanner';
import CategoryGrid from '@components/CategoryGrid';
import PromoStrip from '@components/PromoStrip';
import ProductSections from '@components/ProductSections';
import KidFooter from '@components/KidFooter';

export const displayName = "Kid First — Page d'accueil";
export const screenSize = 'desktop';

export default function HomePage({
  cartCount = 3,
  onNavigate,
  onOpenCart,
  onAddToCart,
  onQuickView,
  onOpenWhatsApp
}) {
  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background font-body min-h-screen flex flex-col justify-between">
      <KidNavbar
        cartCount={cartCount}
        activePage="home"
        onNavigate={onNavigate}
        onOpenCart={onOpenCart}
      />

      <main className="flex-1">
        {/* Hero Banner with CTA linking to Collection & Promotions */}
        <HeroBanner
          onExploreCollection={scrollToProducts}
          onExplorePromos={() => onNavigate && onNavigate('promotions')}
        />

        <PromoStrip />

        {/* Quick Access Category Grid - Clicking navigates directly to that category page! */}
        <CategoryGrid
          onSelectCategory={(catLabel) => {
            if (onNavigate) onNavigate('category', catLabel);
          }}
        />

        {/* Home Product Sections */}
        <div id="products-section">
          <ProductSections
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            onNavigateToCategory={(catLabel) => {
              if (onNavigate) onNavigate('category', catLabel);
            }}
            onNavigateToPromos={() => {
              if (onNavigate) onNavigate('promotions');
            }}
          />
        </div>
      </main>

      <KidFooter onOpenWhatsApp={onOpenWhatsApp} />
    </div>
  );
}
