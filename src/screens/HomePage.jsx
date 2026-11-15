import React, { useState } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const scrollToSection = () => {
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
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="flex-1">
        <HeroBanner
          onExploreCollection={scrollToSection}
          onExplorePromos={() => {
            setSelectedCategory('Promotions');
            scrollToSection();
          }}
        />
        <PromoStrip />
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToSection();
          }}
        />
        <div id="products-section">
          <ProductSections
            selectedCategory={selectedCategory}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        </div>
      </main>

      <KidFooter onOpenWhatsApp={onOpenWhatsApp} />
    </div>
  );
}

