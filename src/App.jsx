import React, { useState } from 'react';
import HomePage from '@screens/HomePage';
import AccountPage from '@screens/AccountPage';
import ProductQuickViewModal from '@components/ProductQuickViewModal';
import CartDrawer from '@components/CartDrawer';
import WhatsAppSupportModal from '@components/WhatsAppSupportModal';
import Icon from '@global/Icon';
import { t } from '@global/t';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [cartItems, setCartItems] = useState([
    {
      id: 'cart-1',
      name: 'T-shirt rayé multicolore',
      price: '14,99 €',
      qty: 1,
      size: '4-5 ans',
      prompt: 'Colorful striped kids t-shirt product photography white background pastel'
    },
    {
      id: 'cart-2',
      name: 'Baskets arc-en-ciel',
      price: '29,90 €',
      qty: 1,
      size: '28',
      prompt: 'Rainbow colorful kids sneakers product photography white background'
    },
    {
      id: 'cart-3',
      name: 'Sac à dos licorne',
      price: '24,90 €',
      qty: 1,
      size: 'Unique',
      prompt: 'Unicorn kids school backpack product photography white background colorful'
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // Add to cart
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.name === product.name && item.size === product.size
      );
      if (existing) {
        return prev.map((item) =>
          item.name === product.name && item.size === product.size
            ? { ...item, qty: (item.qty || 1) + (product.qty || 1) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}`,
          name: product.name,
          price: product.price,
          qty: product.qty || 1,
          size: product.size || '4-5 ans',
          prompt: product.prompt
        }
      ];
    });
  };

  const handleUpdateQty = (index, newQty) => {
    setCartItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveItem = (index) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  return (
    <div className="relative font-body bg-background text-foreground min-h-screen">
      {/* Floating Screen Switcher for instant Banani screens review */}
      <div className="fixed bottom-6 left-6 z-40 bg-[#1A1A2E]/90 text-white backdrop-blur-md px-3 py-2 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2">
        <span className="text-[11px] font-bold text-secondary uppercase tracking-wider px-1">
          Écrans Banani:
        </span>
        <button
          onClick={() => setCurrentScreen('home')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentScreen === 'home'
              ? 'bg-primary text-[#1A1A2E] shadow-sm'
              : 'hover:bg-white/10 text-white/80'
          }`}
        >
          🏠 Page d'accueil
        </button>
        <button
          onClick={() => setCurrentScreen('account')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentScreen === 'account'
              ? 'bg-secondary text-[#1A1A2E] shadow-sm'
              : 'hover:bg-white/10 text-white/80'
          }`}
        >
          👤 Mon compte
        </button>
      </div>

      {/* Floating WhatsApp Quick Action Button (PRD 6.8) */}
      <button
        onClick={() => setIsWhatsAppOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        title="Contact WhatsApp Kid First"
      >
        <Icon i="message-circle" size={28} />
        <span className="absolute right-16 bg-foreground text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          {t('Besoin d\'aide ? Discutons sur WhatsApp !')}
        </span>
      </button>

      {/* Active Screen View */}
      {currentScreen === 'home' ? (
        <HomePage
          cartCount={totalCartCount}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenCart={() => setIsCartOpen(true)}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        />
      ) : (
        <AccountPage
          cartCount={totalCartCount}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        />
      )}

      {/* Product Quick View Modal (PRD 6.4) */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer (PRD 6.6) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          alert(t('Merci ! Votre commande est en cours de validation selon le parcours Kid First.'));
        }}
      />

      {/* WhatsApp Modal (PRD 6.8) */}
      <WhatsAppSupportModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />
    </div>
  );
}
