import React, { useState } from 'react';
import KidNavbar from '@components/KidNavbar';
import AccountLayout from '@components/AccountLayout';
import ProfileTab from '@components/ProfileTab';
import KidFooter from '@components/KidFooter';
import Icon from '@global/Icon';
import Image from '@global/Image';
import { t } from '@global/t';

export const displayName = 'Kid First — Mon compte';
export const screenSize = 'desktop';

function OrdersTab() {
  const orders = [
    {
      id: 'CMD-2026-8941',
      date: '12 Novembre 2026',
      total: '67,49 €',
      status: 'En cours de livraison',
      statusColor: 'bg-primary/20 text-primary',
      items: [
        { name: 'T-shirt rayé multicolore', qty: 2, size: '6-8 ans', price: '29,98 €', prompt: 'Colorful striped kids t-shirt product photography white background pastel' },
        { name: 'Baskets arc-en-ciel', qty: 1, size: '28', price: '29,90 €', prompt: 'Rainbow colorful kids sneakers product photography white background' }
      ]
    },
    {
      id: 'CMD-2026-7812',
      date: '28 Octobre 2026',
      total: '44,90 €',
      status: 'Livrée avec succès',
      statusColor: 'bg-emerald-100 text-emerald-700',
      items: [
        { name: 'Sac à dos licorne', qty: 1, size: 'Unique', price: '24,90 €', prompt: 'Unicorn kids school backpack product photography white background colorful' },
        { name: 'Peluche ours géante', qty: 1, size: '50 cm', price: '19,99 €', prompt: 'Large teddy bear plush toy product photography white background' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headings font-extrabold text-foreground">
          {t('Mes commandes')}
        </h1>
        <p className="text-sm font-body text-muted-foreground mt-1">
          {t('Suivez l\'expédition de vos colis et consultez l\'historique de vos achats')}
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-card border border-border rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
              <div>
                <span className="text-xs font-headings font-bold text-muted-foreground uppercase">
                  {t('Numéro de commande')}
                </span>
                <h3 className="text-base font-headings font-bold text-foreground">
                  {ord.id}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {t('Passée le')} {ord.date}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${ord.statusColor}`}>
                  {ord.status}
                </span>
                <span className="text-base font-headings font-extrabold text-foreground">
                  {ord.total}
                </span>
              </div>
            </div>

            <div className="divide-y divide-border/60">
              {ord.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3.5">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-input flex-shrink-0 border border-border">
                    <Image prompt={item.prompt} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-headings font-bold text-foreground">{item.name}</h4>
                    <p className="text-xs text-muted-foreground font-body">
                      {t('Taille :')} {item.size} • {t('Qté :')} {item.qty}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-foreground">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button className="text-xs font-bold font-body text-primary hover:underline">
                {t('Télécharger la facture PDF')}
              </button>
              <button className="bg-secondary text-secondary-foreground font-body font-bold text-xs px-4 py-2 rounded-xl">
                {t('Suivre le colis')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headings font-extrabold text-foreground">
            {t('Adresses de livraison')}
          </h1>
          <p className="text-sm font-body text-muted-foreground mt-1">
            {t('Gérez vos adresses de livraison et de facturation')}
          </p>
        </div>
        <button className="bg-primary text-primary-foreground font-body font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <Icon i="plus" size={16} />
          {t('Ajouter une adresse')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border-2 border-primary rounded-2xl p-5 relative">
          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full absolute top-4 right-4">
            {t('Par défaut')}
          </span>
          <h3 className="font-headings font-bold text-foreground text-base">Domicile</h3>
          <p className="text-sm font-body text-foreground mt-2">Claire Dubois</p>
          <p className="text-sm font-body text-muted-foreground">14 Rue des Petits Enfants</p>
          <p className="text-sm font-body text-muted-foreground">75015 Paris, France</p>
          <p className="text-sm font-body text-muted-foreground mt-2">+33 6 12 34 56 78</p>
          <div className="mt-4 pt-3 border-t border-border flex gap-3 text-xs font-bold text-primary">
            <button className="hover:underline">{t('Modifier')}</button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-headings font-bold text-foreground text-base">Grands-parents</h3>
          <p className="text-sm font-body text-foreground mt-2">Michel Dubois</p>
          <p className="text-sm font-body text-muted-foreground">8 Avenue de la Forêt</p>
          <p className="text-sm font-body text-muted-foreground">69006 Lyon, France</p>
          <div className="mt-4 pt-3 border-t border-border flex gap-3 text-xs font-bold text-primary">
            <button className="hover:underline">{t('Définir par défaut')}</button>
            <span>•</span>
            <button className="hover:underline">{t('Modifier')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headings font-extrabold text-foreground">
          {t('Paramètres du compte')}
        </h1>
        <p className="text-sm font-body text-muted-foreground mt-1">
          {t('Sécurité, notifications et préférences')}
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-headings font-bold text-foreground text-base">{t('Sécurité')}</h3>
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div>
            <p className="text-sm font-bold text-foreground">{t('Mot de passe')}</p>
            <p className="text-xs text-muted-foreground">{t('Modifié il y a 3 mois')}</p>
          </div>
          <button className="text-xs font-bold bg-muted px-4 py-2 rounded-xl text-foreground hover:bg-border">
            {t('Changer de mot de passe')}
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-bold text-foreground">{t('Authentification renforcée')}</p>
            <p className="text-xs text-muted-foreground">{t('Sécuriser mes commandes par SMS')}</p>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
        </div>
      </div>
    </div>
  );
}

export default function AccountPage({
  cartCount = 3,
  onNavigate,
  onOpenCart,
  onOpenWhatsApp
}) {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'orders':
        return <OrdersTab />;
      case 'addresses':
        return <AddressesTab />;
      case 'favorites':
      case 'settings':
        return <SettingsTab />;
      case 'logout':
        return (
          <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <Icon i="log-out" size={28} />
            </div>
            <h3 className="text-xl font-headings font-bold text-foreground">
              {t('Souhaitez-vous vous déconnecter ?')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('Vous pourrez vous reconnecter à tout moment pour retrouver vos commandes et avantages.')}
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('profile')}
                className="px-5 py-2.5 rounded-xl border border-border text-sm font-bold"
              >
                {t('Rester connecté')}
              </button>
              <button
                onClick={() => {
                  alert(t('Vous êtes déconnecté.'));
                  if (onNavigate) onNavigate('home');
                }}
                className="bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold"
              >
                {t('Se déconnecter')}
              </button>
            </div>
          </div>
        );
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="bg-background font-body min-h-screen flex flex-col justify-between">
      <KidNavbar
        cartCount={cartCount}
        activePage="account"
        onNavigate={onNavigate}
        onOpenCart={onOpenCart}
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-16 pt-6 flex items-center gap-2 text-xs font-body text-muted-foreground">
        <button onClick={() => onNavigate && onNavigate('home')} className="hover:text-primary">
          {t('Accueil')}
        </button>
        <span>/</span>
        <span className="text-foreground font-bold">{t('Mon Compte Kid First')}</span>
      </div>

      <div className="min-h-[600px] flex-1">
        <AccountLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderContent()}
        </AccountLayout>
      </div>

      <KidFooter onOpenWhatsApp={onOpenWhatsApp} />
    </div>
  );
}

