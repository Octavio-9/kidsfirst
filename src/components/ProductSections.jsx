import React from 'react';
import ProductCard from '@components/ProductCard';
import { allProducts, promotionProducts } from '@/data/products';
import { t } from '@global/t';

export const displayName = 'Product Section';
export const shortDescription = 'Scrollable product grid section with title';

function Section({ title, products, viewAll = '', onViewAll, onAddToCart, onQuickView }) {
  return (
    <section className="px-4 md:px-16 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-headings font-extrabold text-foreground">
            {title}
          </h2>
          <div className="h-1 w-12 bg-secondary rounded-full mt-2" />
        </div>
        {viewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-sm font-body font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group cursor-pointer"
          >
            <span>{viewAll}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            {...p}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
}

export default function ProductSections({
  onAddToCart,
  onQuickView,
  onNavigateToCategory,
  onNavigateToPromos
}) {
  const newProducts = allProducts.filter((p) => p.isNew).slice(0, 4);
  const popularProducts = allProducts.filter((p) => p.rating && p.rating >= 4.8).slice(0, 4);
  const saleProducts = promotionProducts.slice(0, 4);

  return (
    <div className="space-y-4">
      <Section
        title={t('Nouveautés Printemps')}
        products={newProducts}
        viewAll={t('Voir toutes les nouveautés')}
        onViewAll={() => onNavigateToCategory && onNavigateToCategory('Tous')}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
      />
      <Section
        title={t('Les Plus Populaires auprès des parents')}
        products={popularProducts}
        viewAll={t('Voir le top des ventes')}
        onViewAll={() => onNavigateToCategory && onNavigateToCategory('Tous')}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
      />
      <Section
        title={t('Promotions & Bons Plans du moment')}
        products={saleProducts}
        viewAll={t('Découvrir toutes les promos')}
        onViewAll={() => onNavigateToPromos && onNavigateToPromos()}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
      />
    </div>
  );
}
