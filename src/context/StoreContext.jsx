import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts as defaultProducts, categoriesList as defaultCategories } from '@/data/products';

const StoreContext = createContext();

const defaultSiteContent = {
  hero: {
    badge: 'Nouveautés 2026',
    titleLine1: 'La mode enfant,',
    titleLine2: 'toujours en premier',
    desc: 'Découvrez notre nouvelle collection de vêtements et accessoires pour enfants de 0 à 14 ans.',
    primaryBtn: 'Découvrir la collection',
    secondaryBtn: 'Voir les promos',
    imageUrl: 'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=1600&q=80',
    prompt: 'Kids playing in a bright colorful clothing store, pastel tones, soft lighting, joyful children wearing colorful outfits, editorial fashion photography'
  },
  promoStrip: [
    { icon: 'truck', text: 'Livraison gratuite dès 50 €' },
    { icon: 'refresh-cw', text: 'Retours sous 30 jours' },
    { icon: 'shield-check', text: 'Paiement 100 % sécurisé' },
    { icon: 'star', text: 'Produits certifiés enfants' },
  ],
  promotionsSettings: {
    heroTitle: 'Les Grandes Promos',
    heroSubtitle: 'Jusqu\'à -50% sur les essentiels',
    heroDesc: 'Habillez et gâtez vos petits avec nos vêtements en coton bio, chaussures confortables et jouets d\'éveil au meilleur prix.',
    couponCode: 'KID10',
    couponDiscount: '-10% dès 50 €',
    flashSaleActive: true
  },
  contact: {
    whatsapp: '+33 6 12 34 56 78',
    email: 'contact@kidfirst.fr',
    hours: 'Lun–Sam, 9h–18h'
  }
};

const defaultOrders = [
  {
    id: 'CMD-2026-8941',
    customer: 'Claire Dubois',
    email: 'claire.dubois@email.com',
    date: '12 Novembre 2026',
    total: '67,49 €',
    status: 'En cours',
    itemsCount: 3
  },
  {
    id: 'CMD-2026-7812',
    customer: 'Michel Lambert',
    email: 'm.lambert@gmail.com',
    date: '28 Octobre 2026',
    total: '44,90 €',
    status: 'Livrée',
    itemsCount: 2
  },
  {
    id: 'CMD-2026-6540',
    customer: 'Sophie Martin',
    email: 'sophie.martin@yahoo.fr',
    date: '15 Octobre 2026',
    total: '89,90 €',
    status: 'Livrée',
    itemsCount: 4
  }
];

export function StoreProvider({ children }) {
  // Products
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('kf_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  // Categories
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('kf_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  // Site Content
  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem('kf_site_content');
    return saved ? JSON.parse(saved) : defaultSiteContent;
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('kf_orders');
    return saved ? JSON.parse(saved) : defaultOrders;
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('kf_admin_auth') === 'true';
  });

  const [adminCredentials, setAdminCredentials] = useState(() => {
    const saved = localStorage.getItem('kf_admin_creds');
    return saved ? JSON.parse(saved) : { email: 'admin@kidfirst.fr', password: 'admin' };
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('kf_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('kf_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('kf_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('kf_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('kf_admin_auth', isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  useEffect(() => {
    localStorage.setItem('kf_admin_creds', JSON.stringify(adminCredentials));
  }, [adminCredentials]);

  // Admin Auth Methods
  const loginAdmin = (email, password, remember = true) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanExpected = adminCredentials.email.toLowerCase();

    // Allow login with exact email or simple "admin" alias with password "admin" or "admin123"
    const isValidEmail = cleanEmail === cleanExpected || cleanEmail === 'admin';
    const isValidPassword = password === adminCredentials.password || password === 'admin123' || password === 'admin';

    if (isValidEmail && isValidPassword) {
      setIsAdminAuthenticated(true);
      if (remember) {
        localStorage.setItem('kf_admin_auth', 'true');
      }
      return { success: true };
    }
    return { success: false, message: 'Email ou mot de passe administrateur incorrect.' };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('kf_admin_auth');
  };

  const changeAdminPassword = (newPassword) => {
    setAdminCredentials((prev) => ({ ...prev, password: newPassword }));
  };

  // Product CRUD
  const addProduct = (newProd) => {
    const id = `prod-${Date.now()}`;
    const product = {
      ...newProd,
      id,
      numericPrice: parseFloat(newProd.price?.replace('€', '').replace(',', '.').trim()) || 0,
      numericOriginalPrice: newProd.originalPrice
        ? parseFloat(newProd.originalPrice.replace('€', '').replace(',', '.').trim())
        : undefined,
      inStock: newProd.inStock ?? true,
      reviewsCount: newProd.reviewsCount || 1,
      rating: newProd.rating || 5.0
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updatedFields };
          if (updatedFields.price) {
            updated.numericPrice = parseFloat(updatedFields.price.replace('€', '').replace(',', '.').trim()) || 0;
          }
          if (updatedFields.originalPrice) {
            updated.numericOriginalPrice = parseFloat(updatedFields.originalPrice.replace('€', '').replace(',', '.').trim()) || 0;
          }
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Category Update
  const updateCategory = (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  // Content Update
  const updateSiteContent = (section, newValues) => {
    setSiteContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...newValues
      }
    }));
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Reset to default
  const resetToFactoryDefaults = () => {
    setProducts(defaultProducts);
    setCategories(defaultCategories);
    setSiteContent(defaultSiteContent);
    setOrders(defaultOrders);
    setAdminCredentials({ email: 'admin@kidfirst.fr', password: 'admin' });
    localStorage.removeItem('kf_products');
    localStorage.removeItem('kf_categories');
    localStorage.removeItem('kf_site_content');
    localStorage.removeItem('kf_orders');
    localStorage.removeItem('kf_admin_creds');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        siteContent,
        orders,
        isAdminAuthenticated,
        adminCredentials,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        addProduct,
        updateProduct,
        deleteProduct,
        updateCategory,
        updateSiteContent,
        updateOrderStatus,
        resetToFactoryDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
