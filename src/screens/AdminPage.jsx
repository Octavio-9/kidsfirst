import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import Icon from '@global/Icon';
import Image from '@global/Image';
import KidLogo from '@components/KidLogo';
import { t } from '@global/t';
import AdminLoginPage from '@screens/AdminLoginPage';

export const displayName = 'Kid First — Panneau d\'administration';
export const screenSize = 'desktop';

const tabs = [
  { id: 'products', label: 'Produits & Photos', icon: 'shirt' },
  { id: 'content', label: 'Textes & Visuels du Site', icon: 'edit' },
  { id: 'promotions', label: 'Offres & Ventes Flash', icon: 'sparkles' },
  { id: 'orders', label: 'Commandes clients', icon: 'shopping-bag' },
  { id: 'dashboard', label: 'Indicateurs clés', icon: 'settings' },
];

export default function AdminPage({ onNavigate }) {
  const {
    products,
    categories,
    siteContent,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateCategory,
    updateSiteContent,
    updateOrderStatus,
    resetToFactoryDefaults,
    isAdminAuthenticated,
    logoutAdmin,
    changeAdminPassword,
  } = useStore();

  // Auth guard — show login page if not authenticated
  if (!isAdminAuthenticated) {
    return <AdminLoginPage onLoginSuccess={() => {}} />;
  }

  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Tous');
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Filtered products list in admin
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategoryFilter === 'Tous' || p.category === selectedCategoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F7F2] font-body text-[#1A1A2E] flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-white border-b border-border sticky top-0 z-30 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <div onClick={() => onNavigate && onNavigate('home')} className="cursor-pointer">
            <KidLogo className="h-10 w-auto" />
          </div>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="bg-secondary text-secondary-foreground text-xs font-headings font-extrabold px-2.5 py-1 rounded-lg">
              ADMIN CMS
            </span>
            <span className="text-sm font-headings font-bold text-foreground hidden md:inline">
              {t('Gestion des Textes, Photos & Produits')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {notification && (
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-300 animate-fadeIn flex items-center gap-1.5">
              <Icon i="shield-check" size={14} className="text-emerald-600" />
              {notification}
            </span>
          )}

          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center gap-2 bg-primary hover:bg-[#68bede] text-primary-foreground text-xs font-headings font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all hover:scale-105 active:scale-95"
          >
            <Icon i="shopping-bag" size={15} />
            <span>{t('Voir la boutique en direct')}</span>
          </button>

          <button
            onClick={() => { logoutAdmin(); onNavigate && onNavigate('home'); }}
            className="flex items-center gap-2 text-xs font-headings font-bold px-4 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 border"
            style={{ borderColor: '#FCA5A5', background: '#FFF0F0', color: '#DC2626' }}
            title="Se déconnecter"
          >
            <Icon i="log-out" size={15} />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Admin Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-border p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          <div className="px-3 py-2 text-[11px] font-headings font-extrabold uppercase tracking-wider text-muted-foreground hidden md:block">
            {t('Modules de gestion')}
          </div>

          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-headings font-bold whitespace-nowrap transition-all text-left ${
                  isActive
                    ? 'bg-primary/15 text-primary border-l-4 border-l-primary font-extrabold shadow-xs'
                    : 'text-foreground hover:bg-muted font-semibold'
                }`}
              >
                <Icon
                  i={tab.icon}
                  size={16}
                  className={isActive ? 'text-primary' : 'text-muted-foreground'}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="mt-auto pt-6 border-t border-border hidden md:block">
            <button
              onClick={() => {
                if (window.confirm(t('Voulez-vous rétablir tous les textes, photos et produits aux valeurs initiales ?'))) {
                  resetToFactoryDefaults();
                  showNotification(t('Données par défaut rétablies.'));
                }
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
            >
              <Icon i="refresh-cw" size={14} />
              <span>{t('Rétablir les textes d\'origine')}</span>
            </button>
          </div>
        </aside>

        {/* Tab Content Panels */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          {/* TAB 1: GESTION DES PRODUITS & PHOTOS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-headings font-extrabold text-foreground">
                    {t('Gestion des Produits & Photos')}
                  </h1>
                  <p className="text-xs md:text-sm font-body text-muted-foreground mt-0.5">
                    {t('Éditez en direct les titres, descriptions, prix, stocks et visuels de chaque article')}
                  </p>
                </div>

                <button
                  onClick={() => setIsNewProductModalOpen(true)}
                  className="bg-secondary hover:bg-[#ffe085] text-secondary-foreground font-headings font-extrabold px-5 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 w-fit"
                >
                  <Icon i="plus" size={16} />
                  <span>{t('Ajouter un nouveau produit')}</span>
                </button>
              </div>

              {/* Toolbar */}
              <div className="bg-white border border-border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-2 w-full sm:w-80 bg-input rounded-xl px-3 py-2 border border-border">
                  <Icon i="search" size={15} className="text-muted-foreground" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={t('Rechercher un produit à éditer...')}
                    className="w-full bg-transparent text-xs outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-muted-foreground">{t('Filtrer :')}</span>
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="bg-input border border-border rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer"
                  >
                    <option value="Tous">{t('Toutes les catégories')}</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF9F5] border-b border-border text-muted-foreground font-headings uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-5 py-4">{t('Photo')}</th>
                        <th className="px-5 py-4">{t('Nom & Catégorie')}</th>
                        <th className="px-5 py-4">{t('Prix')}</th>
                        <th className="px-5 py-4">{t('Stock / Statut')}</th>
                        <th className="px-5 py-4">{t('Avis')}</th>
                        <th className="px-5 py-4 text-right">{t('Actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FAF9F5] transition-colors">
                          <td className="px-5 py-3">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-input border border-border flex-shrink-0">
                              <Image
                                src={p.imageUrl}
                                prompt={p.prompt}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="font-headings font-extrabold text-foreground text-sm">
                              {p.name}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                              <span className="bg-tag text-tag-foreground px-2 py-0.5 rounded-md font-bold text-[10px]">
                                {p.category}
                              </span>
                              <span>•</span>
                              <span>{p.ageGroup || 'Tout âge'}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span className="font-headings font-extrabold text-foreground text-sm">
                              {p.price}
                            </span>
                            {p.originalPrice && (
                              <span className="text-[11px] text-muted-foreground line-through ml-2">
                                {p.originalPrice}
                              </span>
                            )}
                            {p.badge && (
                              <span className="ml-2 text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-bold">
                                {p.badge}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => {
                                updateProduct(p.id, { inStock: !p.inStock });
                                showNotification(t(`Statut stock mis à jour pour ${p.name}`));
                              }}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                                p.inStock !== false
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${p.inStock !== false ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                              <span>{p.inStock !== false ? t('En stock') : t('Rupture')}</span>
                            </button>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-amber-500 font-bold">★ {p.rating || 5.0}</span>
                            <span className="text-muted-foreground ml-1">({p.reviewsCount || 0})</span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingProduct(p)}
                                className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 text-xs"
                              >
                                <Icon i="edit" size={13} />
                                <span>{t('Éditer')}</span>
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(t(`Supprimer définitivement "${p.name}" ?`))) {
                                    deleteProduct(p.id);
                                    showNotification(t('Produit supprimé'));
                                  }
                                }}
                                className="text-muted-foreground hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                title={t('Supprimer')}
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ÉDITION DES TEXTES & VISUELS DU SITE (CMS GLOBAL) */}
          {activeTab === 'content' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-headings font-extrabold text-foreground">
                  {t('Édition des Textes & Visuels du Site')}
                </h1>
                <p className="text-xs md:text-sm font-body text-muted-foreground mt-0.5">
                  {t('Modifiez en temps réel les bannières, slogans, textes d\'accueil et coordonnées du site')}
                </p>
              </div>

              {/* 1. Hero Banner Editor */}
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                      <Icon i="sparkles" size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-headings font-extrabold text-foreground">
                        {t('Bannière Principale d\'Accueil (Hero Banner)')}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {t('Textes d\'accroche et photo grand format de la page d\'accueil')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-headings font-bold text-foreground block mb-1">
                        {t('Badge de la bannière')}
                      </label>
                      <input
                        type="text"
                        value={siteContent.hero.badge}
                        onChange={(e) => updateSiteContent('hero', { badge: e.target.value })}
                        className="w-full bg-input border border-border rounded-xl px-3.5 py-2 text-xs font-bold outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-headings font-bold text-foreground block mb-1">
                        {t('Titre principal — Ligne 1')}
                      </label>
                      <input
                        type="text"
                        value={siteContent.hero.titleLine1}
                        onChange={(e) => updateSiteContent('hero', { titleLine1: e.target.value })}
                        className="w-full bg-input border border-border rounded-xl px-3.5 py-2 text-xs font-bold outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-headings font-bold text-foreground block mb-1">
                        {t('Titre principal — Ligne 2 (mise en avant jaune)')}
                      </label>
                      <input
                        type="text"
                        value={siteContent.hero.titleLine2}
                        onChange={(e) => updateSiteContent('hero', { titleLine2: e.target.value })}
                        className="w-full bg-input border border-border rounded-xl px-3.5 py-2 text-xs font-bold outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-headings font-bold text-foreground block mb-1">
                        {t('Texte de description')}
                      </label>
                      <textarea
                        rows={3}
                        value={siteContent.hero.desc}
                        onChange={(e) => updateSiteContent('hero', { desc: e.target.value })}
                        className="w-full bg-input border border-border rounded-xl p-3 text-xs outline-none focus:border-primary resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-headings font-bold text-foreground block mb-1">
                          {t('Texte Bouton 1')}
                        </label>
                        <input
                          type="text"
                          value={siteContent.hero.primaryBtn}
                          onChange={(e) => updateSiteContent('hero', { primaryBtn: e.target.value })}
                          className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-headings font-bold text-foreground block mb-1">
                          {t('Texte Bouton 2')}
                        </label>
                        <input
                          type="text"
                          value={siteContent.hero.secondaryBtn}
                          onChange={(e) => updateSiteContent('hero', { secondaryBtn: e.target.value })}
                          className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo de la bannière avec prévisualisation en direct */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-headings font-bold text-foreground block mb-1">
                        {t('URL de la photo de fond')}
                      </label>
                      <input
                        type="url"
                        value={siteContent.hero.imageUrl || ''}
                        onChange={(e) => updateSiteContent('hero', { imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-input border border-border rounded-xl px-3.5 py-2 text-xs outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <span className="text-xs font-headings font-bold text-muted-foreground block mb-2">
                        {t('Aperçu direct de la photo Hero :')}
                      </span>
                      <div className="w-full h-56 rounded-2xl overflow-hidden border border-border relative bg-input">
                        <img
                          src={siteContent.hero.imageUrl}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=1600&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end text-white">
                          <span className="text-[10px] bg-secondary text-secondary-foreground font-extrabold px-2 py-0.5 rounded w-fit mb-1">
                            {siteContent.hero.badge}
                          </span>
                          <span className="text-sm font-headings font-bold leading-tight">
                            {siteContent.hero.titleLine1} {siteContent.hero.titleLine2}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Category Banners & Descriptions Editor */}
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
                <div className="pb-4 border-b border-border">
                  <h3 className="text-base font-headings font-extrabold text-foreground">
                    {t('Photos & Textes des Catégories (Univers)')}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t('Modifiez l\'illustration et la phrase de présentation de chaque rayon')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((cat) => (
                    <div key={cat.id} className="bg-[#FAF9F5] border border-border rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-headings font-extrabold text-sm text-foreground flex items-center gap-1.5">
                          <Icon i={cat.icon} size={16} className="text-primary" />
                          {cat.label}
                        </span>
                      </div>

                      {/* Image Preview */}
                      <div className="w-full h-28 rounded-xl overflow-hidden border border-border bg-input">
                        <img
                          src={cat.heroImage}
                          alt={cat.label}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">
                          {t('URL de l\'image de couverture')}
                        </label>
                        <input
                          type="url"
                          value={cat.heroImage || ''}
                          onChange={(e) => updateCategory(cat.id, { heroImage: e.target.value })}
                          className="w-full bg-white border border-border rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">
                          {t('Slogan de la catégorie')}
                        </label>
                        <textarea
                          rows={2}
                          value={cat.tagline || ''}
                          onChange={(e) => updateCategory(cat.id, { tagline: e.target.value })}
                          className="w-full bg-white border border-border rounded-lg p-2 text-xs outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Coordonnées & WhatsApp (PRD §6.8) */}
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-4 shadow-xs">
                <div className="pb-4 border-b border-border">
                  <h3 className="text-base font-headings font-extrabold text-foreground">
                    {t('Coordonnées & Assistance WhatsApp')}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t('Paramètres affichés sur le site et le footer pour contacter la boutique')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-headings font-bold text-foreground block mb-1">
                      {t('Numéro WhatsApp Officiel')}
                    </label>
                    <input
                      type="text"
                      value={siteContent.contact.whatsapp}
                      onChange={(e) => updateSiteContent('contact', { whatsapp: e.target.value })}
                      className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-headings font-bold text-foreground block mb-1">
                      {t('Email Service Client')}
                    </label>
                    <input
                      type="email"
                      value={siteContent.contact.email}
                      onChange={(e) => updateSiteContent('contact', { email: e.target.value })}
                      className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-headings font-bold text-foreground block mb-1">
                      {t('Horaires d\'ouverture')}
                    </label>
                    <input
                      type="text"
                      value={siteContent.contact.hours}
                      onChange={(e) => updateSiteContent('contact', { hours: e.target.value })}
                      className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROMOTIONS & VENTES FLASH */}
          {activeTab === 'promotions' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-headings font-extrabold text-foreground">
                  {t('Gestion des Promotions & Ventes Flash')}
                </h1>
                <p className="text-xs md:text-sm font-body text-muted-foreground mt-0.5">
                  {t('Configurez les codes promos, bannières et taux de réduction de la boutique')}
                </p>
              </div>

              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-headings font-bold text-foreground block mb-1">
                      {t('Titre de la section Promo')}
                    </label>
                    <input
                      type="text"
                      value={siteContent.promotionsSettings?.heroTitle || 'Les Grandes Promos'}
                      onChange={(e) => updateSiteContent('promotionsSettings', { heroTitle: e.target.value })}
                      className="w-full bg-input border border-border rounded-xl px-3.5 py-2 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-headings font-bold text-foreground block mb-1">
                      {t('Sous-titre accrocheur')}
                    </label>
                    <input
                      type="text"
                      value={siteContent.promotionsSettings?.heroSubtitle || 'Jusqu\'à -50% sur les essentiels'}
                      onChange={(e) => updateSiteContent('promotionsSettings', { heroSubtitle: e.target.value })}
                      className="w-full bg-input border border-border rounded-xl px-3.5 py-2 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-headings font-bold text-foreground block mb-1">
                      {t('Code Promo Actif')}
                    </label>
                    <input
                      type="text"
                      value={siteContent.promotionsSettings?.couponCode || 'KID10'}
                      onChange={(e) => updateSiteContent('promotionsSettings', { couponCode: e.target.value })}
                      className="w-full bg-input border border-border rounded-xl px-3.5 py-2 text-xs font-mono font-extrabold tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-headings font-bold text-foreground block mb-1">
                      {t('Description de l\'avantage du code')}
                    </label>
                    <input
                      type="text"
                      value={siteContent.promotionsSettings?.couponDiscount || '-10% dès 50 €'}
                      onChange={(e) => updateSiteContent('promotionsSettings', { couponDiscount: e.target.value })}
                      className="w-full bg-input border border-border rounded-xl px-3.5 py-2 text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-headings font-bold text-foreground block mb-1">
                    {t('Paragraphe de présentation')}
                  </label>
                  <textarea
                    rows={2}
                    value={siteContent.promotionsSettings?.heroDesc || ''}
                    onChange={(e) => updateSiteContent('promotionsSettings', { heroDesc: e.target.value })}
                    className="w-full bg-input border border-border rounded-xl p-3 text-xs resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COMMANDES CLIENTS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-headings font-extrabold text-foreground">
                  {t('Gestion des Commandes Clients')}
                </h1>
                <p className="text-xs md:text-sm font-body text-muted-foreground mt-0.5">
                  {t('Consultez et mettez à jour l\'état d\'avancement des expéditions')}
                </p>
              </div>

              <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F5] border-b border-border text-muted-foreground font-headings uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="px-5 py-4">{t('N° Commande')}</th>
                      <th className="px-5 py-4">{t('Client')}</th>
                      <th className="px-5 py-4">{t('Date')}</th>
                      <th className="px-5 py-4">{t('Articles')}</th>
                      <th className="px-5 py-4">{t('Montant')}</th>
                      <th className="px-5 py-4">{t('Statut')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FAF9F5] transition-colors">
                        <td className="px-5 py-3 font-mono font-bold text-foreground">{ord.id}</td>
                        <td className="px-5 py-3">
                          <div className="font-bold text-foreground">{ord.customer}</div>
                          <div className="text-[10px] text-muted-foreground">{ord.email}</div>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">{ord.date}</td>
                        <td className="px-5 py-3">{ord.itemsCount} articles</td>
                        <td className="px-5 py-3 font-headings font-bold text-foreground">{ord.total}</td>
                        <td className="px-5 py-3">
                          <select
                            value={ord.status}
                            onChange={(e) => {
                              updateOrderStatus(ord.id, e.target.value);
                              showNotification(t(`Statut de ${ord.id} mis à jour`));
                            }}
                            className="bg-input border border-border rounded-xl px-2.5 py-1 text-xs font-bold outline-none cursor-pointer"
                          >
                            <option value="En cours">{t('En cours')}</option>
                            <option value="Expédiée">{t('Expédiée')}</option>
                            <option value="Livrée">{t('Livrée')}</option>
                            <option value="Annulée">{t('Annulée')}</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: DASHBOARD INDICATEURS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-headings font-extrabold text-foreground">
                  {t('Tableau de Bord & Indicateurs')}
                </h1>
                <p className="text-xs md:text-sm font-body text-muted-foreground mt-0.5">
                  {t('Indicateurs de performance de la boutique Kid First')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-border rounded-3xl p-6 shadow-xs">
                  <span className="text-xs font-bold text-muted-foreground uppercase">{t('Chiffre d\'Affaires')}</span>
                  <div className="text-3xl font-headings font-extrabold text-foreground mt-2">
                    2 480,50 €
                  </div>
                  <span className="text-xs font-bold text-emerald-600 mt-1 inline-block">
                    ↑ +14% ce mois
                  </span>
                </div>

                <div className="bg-white border border-border rounded-3xl p-6 shadow-xs">
                  <span className="text-xs font-bold text-muted-foreground uppercase">{t('Commandes Totales')}</span>
                  <div className="text-3xl font-headings font-extrabold text-foreground mt-2">
                    {orders.length + 42}
                  </div>
                  <span className="text-xs font-bold text-primary mt-1 inline-block">
                    100% traitées sous 24h
                  </span>
                </div>

                <div className="bg-white border border-border rounded-3xl p-6 shadow-xs">
                  <span className="text-xs font-bold text-muted-foreground uppercase">{t('Articles au Catalogue')}</span>
                  <div className="text-3xl font-headings font-extrabold text-foreground mt-2">
                    {products.length}
                  </div>
                  <span className="text-xs font-bold text-secondary-foreground mt-1 inline-block">
                    6 catégories actives
                  </span>
                </div>

                <div className="bg-white border border-border rounded-3xl p-6 shadow-xs">
                  <span className="text-xs font-bold text-muted-foreground uppercase">{t('Satisfaction Parents')}</span>
                  <div className="text-3xl font-headings font-extrabold text-[#F4A261] mt-2">
                    4.9 / 5
                  </div>
                  <span className="text-xs font-bold text-muted-foreground mt-1 inline-block">
                    Basé sur 184 avis vérifiés
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: ÉDITER UN PRODUIT EXISTANT (TEXTES ET PHOTO) */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          categories={categories}
          onClose={() => setEditingProduct(null)}
          onSave={(updated) => {
            updateProduct(editingProduct.id, updated);
            setEditingProduct(null);
            showNotification(t('Produit et visuel enregistrés avec succès !'));
          }}
        />
      )}

      {/* MODAL 2: AJOUTER UN NOUVEAU PRODUIT */}
      {isNewProductModalOpen && (
        <ProductEditModal
          isNew
          categories={categories}
          onClose={() => setIsNewProductModalOpen(false)}
          onSave={(newProd) => {
            addProduct(newProd);
            setIsNewProductModalOpen(false);
            showNotification(t('Nouveau produit ajouté au catalogue !'));
          }}
        />
      )}
    </div>
  );
}

// Modal Form for editing all texts, photos, and prices of a product
function ProductEditModal({ product, categories, isNew = false, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || categories[0]?.label || 'Vêtements',
    price: product?.price || '19,90 €',
    originalPrice: product?.originalPrice || '',
    badge: product?.badge || '',
    description: product?.description || '',
    ageGroup: product?.ageGroup || 'Junior (6-10 ans)',
    imageUrl: product?.imageUrl || '',
    prompt: product?.prompt || 'Kids clothing pastel photography white background',
    inStock: product?.inStock ?? true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-border shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col animate-scaleUp">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-headings font-extrabold text-foreground">
              {isNew ? t('Créer un nouveau produit') : t(`Éditer le produit : ${product.name}`)}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t('Modifiez les informations, textes et l\'image du produit')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-input hover:bg-muted text-foreground flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nom */}
            <div className="sm:col-span-2">
              <label className="text-xs font-headings font-bold text-foreground block mb-1">
                {t('Nom du produit')}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-3.5 py-2 text-xs font-bold outline-none focus:border-primary"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="text-xs font-headings font-bold text-foreground block mb-1">
                {t('Catégorie')}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs font-bold outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tranche d'âge */}
            <div>
              <label className="text-xs font-headings font-bold text-foreground block mb-1">
                {t('Tranche d\'âge')}
              </label>
              <input
                type="text"
                value={formData.ageGroup}
                onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                placeholder="Ex : Petit (3-5 ans)"
                className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs outline-none"
              />
            </div>

            {/* Prix de vente */}
            <div>
              <label className="text-xs font-headings font-bold text-foreground block mb-1">
                {t('Prix de vente (ex: 19,99 €)')}
              </label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs font-extrabold outline-none"
              />
            </div>

            {/* Prix d'origine barré (optionnel pour promo) */}
            <div>
              <label className="text-xs font-headings font-bold text-foreground block mb-1">
                {t('Prix barré initial (si promotion)')}
              </label>
              <input
                type="text"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="Ex : 29,90 €"
                className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs outline-none"
              />
            </div>

            {/* Badge promotion ou nouveau */}
            <div>
              <label className="text-xs font-headings font-bold text-foreground block mb-1">
                {t('Badge (ex: -30%, Nouveau, ★ 4.9)')}
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Ex : -40%"
                className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs outline-none"
              />
            </div>

            {/* Disponibilité */}
            <div className="flex items-center gap-2 pt-6">
              <label className="flex items-center gap-2 text-xs font-headings font-bold text-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                />
                <span>{t('Produit disponible en stock')}</span>
              </label>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="text-xs font-headings font-bold text-foreground block mb-1">
                {t('Description détaillée')}
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-input border border-border rounded-xl p-3 text-xs outline-none focus:border-primary resize-none"
              />
            </div>

            {/* GESTION DE LA PHOTO DU PRODUIT */}
            <div className="sm:col-span-2 border-t border-border pt-4 space-y-3">
              <label className="text-xs font-headings font-extrabold text-foreground uppercase tracking-wider block">
                {t('Photo du produit')}
              </label>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-input border border-border flex-shrink-0 relative">
                  <Image
                    src={formData.imageUrl}
                    prompt={formData.prompt}
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                    {t('Aperçu')}
                  </span>
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground block mb-1">
                      {t('URL de l\'image (Web ou Unsplash)')}
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-input border border-border rounded-xl px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground block mb-1">
                      {t('Ou mot-clé de génération automatique (si pas d\'URL)')}
                    </label>
                    <input
                      type="text"
                      value={formData.prompt}
                      onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                      placeholder="Ex : Kids striped t-shirt pastel photography"
                      className="w-full bg-input border border-border rounded-xl px-3 py-1.5 text-xs outline-none text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-headings font-bold text-muted-foreground hover:text-foreground"
            >
              {t('Annuler')}
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-[#68bede] text-primary-foreground font-headings font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all hover:scale-105 active:scale-95"
            >
              {isNew ? t('Créer le produit') : t('Enregistrer les modifications')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

