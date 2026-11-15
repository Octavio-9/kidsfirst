import React from 'react';
import ProductCard from '@components/ProductCard';
import { t } from '@global/t';

export const displayName = 'Product Section';
export const shortDescription = 'Scrollable product grid section with title';

const newProducts = [
  { id: 'np-1', name: 'T-shirt rayé multicolore', category: 'Vêtements', price: '14,99 €', isNew: true, prompt: 'Colorful striped kids t-shirt product photography white background pastel' },
  { id: 'np-2', name: 'Robe fleurie printemps', category: 'Vêtements', price: '22,50 €', isNew: true, prompt: 'Cute floral dress for little girl, product photography, white background' },
  { id: 'np-3', name: 'Ensemble jean & veste', category: 'Vêtements', price: '38,00 €', isNew: true, prompt: 'Kids denim jacket and pants set product photography white background' },
  { id: 'np-4', name: 'Baskets arc-en-ciel', category: 'Chaussures', price: '29,90 €', isNew: true, prompt: 'Rainbow colorful kids sneakers product photography white background' },
];

const popularProducts = [
  { id: 'pp-1', name: 'Pantalon cargo kaki', category: 'Vêtements', price: '18,99 €', badge: '★ 4.9', prompt: 'Kids cargo pants khaki product photography white background' },
  { id: 'pp-2', name: 'Body bébé coton doux', category: 'Bébé', price: '9,90 €', badge: '★ 4.8', prompt: 'Soft cotton baby onesie bodysuit product photography white background' },
  { id: 'pp-3', name: 'Sac à dos licorne', category: 'École', price: '24,90 €', badge: '★ 4.9', prompt: 'Unicorn kids school backpack product photography white background colorful' },
  { id: 'pp-4', name: 'Chapeau de soleil paille', category: 'Accessoires', price: '11,50 €', badge: '★ 4.7', prompt: 'Kids straw sun hat product photography white background summer' },
];

const saleProducts = [
  { id: 'sp-1', name: 'Manteau hiver chaud', category: 'Vêtements', price: '35,00 €', originalPrice: '60,00 €', badge: '-42%', prompt: 'Kids winter coat warm product photography white background' },
  { id: 'sp-2', name: 'Peluche ours géante', category: 'Jouets', price: '19,99 €', originalPrice: '34,99 €', badge: '-43%', prompt: 'Large teddy bear plush toy product photography white background' },
  { id: 'sp-3', name: 'Ensemble bébé 3 pièces', category: 'Bébé', price: '16,90 €', originalPrice: '28,00 €', badge: '-40%', prompt: 'Baby 3 piece clothing set product photography white background pastel' },
  { id: 'sp-4', name: 'Chaussures cuir bébé', category: 'Chaussures', price: '17,90 €', originalPrice: '32,00 €', badge: '-44%', prompt: 'Baby leather shoes product photography white background soft' },
];

function Section({ title, products, viewAll = '', onAddToCart, onQuickView }) {
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
            className="text-sm font-body font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group"
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

export default function ProductSections({ onAddToCart, onQuickView, selectedCategory = 'Tous' }) {
  const filterList = (list) => {
    if (selectedCategory === 'Tous') return list;
    if (selectedCategory === 'Promotions') return saleProducts;
    return list.filter((p) => p.category === selectedCategory);
  };

  const filteredNew = filterList(newProducts);
  const filteredPopular = filterList(popularProducts);
  const filteredSale = selectedCategory === 'Tous' || selectedCategory === 'Promotions' ? saleProducts : filterList(saleProducts);

  if (selectedCategory !== 'Tous' && selectedCategory !== 'Promotions') {
    const allMatching = [...newProducts, ...popularProducts, ...saleProducts].filter(
      (p) => p.category === selectedCategory
    );

    return (
      <section className="px-4 md:px-16 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-headings font-extrabold text-foreground">
            {t(`Catégorie : ${selectedCategory}`)}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t(`${allMatching.length} articles disponibles pour vos enfants`)}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allMatching.map((p) => (
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

  return (
    <div className="space-y-4">
      <Section
        title={t('Nouveautés')}
        products={filteredNew}
        viewAll={t('Voir tout')}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
      />
      <Section
        title={t('Les plus populaires')}
        products={filteredPopular}
        viewAll={t('Voir tout')}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
      />
      <Section
        title={t('Promotions & Bons plans')}
        products={filteredSale}
        viewAll={t('Voir les offres')}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
      />
    </div>
  );
}

