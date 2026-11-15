import React from 'react';
import Icon from '@global/Icon';
import { t } from '@global/t';

export const displayName = 'Account Page Layout';
export const shortDescription = 'Two-column account page with sidebar and content';

export default function AccountLayout({ activeTab = 'profile', onTabChange, children }) {
  const tabs = [
    { id: 'profile', label: 'Mon profil', icon: 'user' },
    { id: 'orders', label: 'Mes commandes', icon: 'shopping-bag' },
    { id: 'addresses', label: 'Adresses de livraison', icon: 'map-pin' },
    { id: 'favorites', label: 'Articles favoris', icon: 'heart' },
    { id: 'settings', label: 'Paramètres du compte', icon: 'settings' },
    { id: 'logout', label: 'Déconnexion', icon: 'log-out', isDanger: true },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 px-4 md:px-16 py-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs sticky top-28">
          <div className="p-4 bg-muted/40 border-b border-border">
            <span className="text-xs font-headings font-extrabold text-muted-foreground uppercase tracking-wider">
              {t('Espace Client')}
            </span>
          </div>

          <div className="divide-y divide-border">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => onTabChange && onTabChange(tab.id)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary font-bold border-l-4 border-l-primary'
                      : tab.isDanger
                      ? 'text-red-500 hover:bg-red-50 font-semibold'
                      : 'text-foreground hover:bg-muted font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      i={tab.icon}
                      size={17}
                      className={isActive ? 'text-primary' : tab.isDanger ? 'text-red-500' : 'text-muted-foreground'}
                    />
                    <span className="text-sm font-body">{t(tab.label)}</span>
                  </div>
                  {isActive && <span className="text-primary text-xs">●</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}

