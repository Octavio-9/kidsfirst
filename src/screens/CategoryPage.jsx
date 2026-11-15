import React, { useState, useMemo } from 'react';
import KidNavbar from '@components/KidNavbar';
import KidFooter from '@components/KidFooter';
import ProductCard from '@components/ProductCard';
import Icon from '@global/Icon';
import Image from '@global/Image';
import { categoriesList, allProducts } from '@/data/products';
import { t } from '@global/t';

export const displayName = 'Kid First — Page Catégorie';
export const screenSize = 'desktop';

const ageGroups = ['Tous les âges', 'Bébé (0-2 ans)', 'Petit (3-5 ans)', 'Junior (6-10 ans)'];

export default function CategoryPage({
  initialCategory = 'Vêtements',
  cartCount = 3,
  onNavigate,
  onOpenCart,
  onAddToCart,
  onQuickView,
  onOpenWhatsApp
}) {
  const [currentCategory, setCurrentCategory] = useState(initialCategory);
  const [selectedAge, setSelectedAge] = useState('Tous les âges');
  const [maxPrice, setMaxPrice] = useState(60);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedSize, setSelectedSize] = useState('Toutes');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Find category info
  const categoryMeta = useMemo(() => {
    return (
      categoriesList.find(
        (c) => c.label.toLowerCase() === currentCategory.toLowerCase()
      ) || categoriesList[0]
    );
  }, [currentCategory]);

  // Available sizes for currently selected category
  const availableSizes = useMemo(() => {
    const prods = currentCategory === 'Tous'
      ? allProducts
      : allProducts.filter((p) => p.category === currentCategory);
    const sizeSet = new Set();
    prods.forEach((p) => {
      if (p.sizes) p.sizes.forEach((s) => sizeSet.add(s));
    });
    return ['Toutes', ...Array.from(sizeSet)];
  }, [currentCategory]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Category filter
        if (currentCategory !== 'Tous' && product.category !== currentCategory) {
          return false;
        }
        // Age group filter
        if (selectedAge !== 'Tous les âges' && product.ageGroup !== selectedAge) {
          return false;
        }
        // Max price filter
        if (product.numericPrice > maxPrice) {
          return false;
        }
        // Size filter
        if (selectedSize !== 'Toutes' && product.sizes && !product.sizes.includes(selectedSize)) {
          return false;
        }
        // In stock
        if (onlyInStock && product.inStock === false) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.numericPrice - b.numericPrice;
        if (sortBy === 'price-desc') return b.numericPrice - a.numericPrice;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.reviewsCount || 0) - (a.reviewsCount || 0); // popular
      });
  }, [currentCategory, selectedAge, maxPrice, selectedSize, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSelectedAge('Tous les âges');
    setMaxPrice(60);
    setSelectedSize('Toutes');
    setOnlyInStock(false);
    setSortBy('popular');
  };

  return (
    <div className="bg-background font-body min-h-screen flex flex-col justify-between">
      <KidNavbar
        cartCount={cartCount}
        activePage="category"
        selectedCategory={currentCategory}
        onSelectCategory={(cat) => setCurrentCategory(cat)}
        onNavigate={onNavigate}
        onOpenCart={onOpenCart}
      />

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-16 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-body text-muted-foreground mb-6">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="hover:text-primary transition-colors"
          >
            {t('Accueil')}
          </button>
          <span>/</span>
          <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => setCurrentCategory('Tous')}>
            {t('Catégories')}
          </span>
          <span>/</span>
          <span className="text-foreground font-bold">{currentCategory}</span>
        </nav>

        {/* Category Header Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/10 border border-border p-6 md:p-10 mb-8 shadow-xs">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-xl text-xs font-bold text-foreground mb-3">
              <Icon i={categoryMeta.icon} size={15} className="text-primary" />
              <span>{t('Univers Kid First')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-headings font-extrabold text-foreground tracking-tight mb-3">
              {currentCategory === 'Tous' ? t('Tous nos articles enfants') : categoryMeta.label}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed max-w-xl">
              {currentCategory === 'Tous'
                ? t('Découvrez l\'intégralité de nos collections pour bébés et enfants de 0 à 14 ans.')
                : categoryMeta.tagline}
            </p>
          </div>

          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-64 h-40 rounded-2xl overflow-hidden shadow-md border-2 border-white">
            <Image
              src={categoryMeta.heroImage}
              alt={categoryMeta.label}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Category Fast Switcher Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            type="button"
            onClick={() => setCurrentCategory('Tous')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-headings font-bold whitespace-nowrap transition-all ${
              currentCategory === 'Tous'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            {t('🌟 Tout afficher')} ({allProducts.length})
          </button>
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCurrentCategory(cat.label)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-headings font-bold whitespace-nowrap transition-all ${
                currentCategory === cat.label
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              <Icon i={cat.icon} size={14} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden flex justify-between items-center bg-card p-4 rounded-2xl border border-border mb-2">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center gap-2 text-xs font-headings font-bold text-foreground bg-input px-4 py-2 rounded-xl"
            >
              <Icon i="settings" size={14} />
              <span>{t('Filtres et tri')}</span>
            </button>
            <span className="text-xs text-muted-foreground font-body font-bold">
              {filteredProducts.length} {t('produits')}
            </span>
          </div>

          {/* Left Sidebar Filters (Desktop & Mobile) */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1 bg-card border border-border rounded-3xl p-6 shadow-xs space-y-6 sticky top-28`}>
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Icon i="settings" size={17} className="text-primary" />
                <h3 className="font-headings font-extrabold text-base text-foreground">
                  {t('Filtres')}
                </h3>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-body font-bold text-primary hover:underline"
              >
                {t('Réinitialiser')}
              </button>
            </div>

            {/* Tranche d'âge (PRD §6.5) */}
            <div>
              <label className="text-xs font-headings font-bold text-foreground uppercase tracking-wider block mb-3">
                {t('Tranche d\'âge')}
              </label>
              <div className="space-y-2">
                {ageGroups.map((age) => (
                  <label
                    key={age}
                    className="flex items-center gap-2.5 text-xs font-body text-foreground cursor-pointer select-none hover:text-primary transition-colors"
                  >
                    <input
                      type="radio"
                      name="ageGroup"
                      checked={selectedAge === age}
                      onChange={() => setSelectedAge(age)}
                      className="accent-primary"
                    />
                    <span className={selectedAge === age ? 'font-bold text-primary' : ''}>
                      {t(age)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tailles disponibles */}
            <div>
              <label className="text-xs font-headings font-bold text-foreground uppercase tracking-wider block mb-3">
                {t('Tailles')}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === sz
                        ? 'bg-secondary text-secondary-foreground shadow-xs'
                        : 'bg-input text-foreground hover:bg-muted'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget / Prix maximum */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-headings font-bold text-foreground uppercase tracking-wider">
                  {t('Prix max')}
                </label>
                <span className="text-xs font-headings font-extrabold text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg">
                  {maxPrice} €
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>10 €</span>
                <span>35 €</span>
                <span>60 €</span>
              </div>
            </div>

            {/* Disponibilité */}
            <div className="pt-2 border-t border-border">
              <label className="flex items-center gap-3 text-xs font-body font-bold text-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                />
                <span>{t('En stock uniquement')}</span>
              </label>
            </div>
          </aside>

          {/* Main Products Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Count + Sort */}
            <div className="bg-card border border-border rounded-2xl px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="text-sm font-body">
                <span className="font-extrabold text-foreground">{filteredProducts.length}</span>{' '}
                <span className="text-muted-foreground">{t('articles trouvés pour')}</span>{' '}
                <span className="font-bold text-primary">« {currentCategory} »</span>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-headings font-bold text-muted-foreground whitespace-nowrap">
                  {t('Trier par :')}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-input border border-border rounded-xl px-3 py-1.5 text-xs font-body font-bold text-foreground outline-none focus:border-primary cursor-pointer"
                >
                  <option value="popular">{t('Les plus populaires')}</option>
                  <option value="price-asc">{t('Prix : croissant')}</option>
                  <option value="price-desc">{t('Prix : décroissant')}</option>
                  <option value="rating">{t('Meilleurs avis')}</option>
                  <option value="new">{t('Nouveautés')}</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-card border border-border rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-input rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                  <Icon i="search" size={28} />
                </div>
                <h3 className="text-lg font-headings font-bold text-foreground">
                  {t('Aucun article ne correspond à vos filtres')}
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  {t('Essayez d\'élargir vos critères de taille, d\'âge ou de tranche de prix.')}
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-primary text-primary-foreground font-body font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
                >
                  {t('Réinitialiser tous les filtres')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    {...p}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <KidFooter onOpenWhatsApp={onOpenWhatsApp} />
    </div>
  );
}
