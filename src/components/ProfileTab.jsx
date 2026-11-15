import React, { useState } from 'react';
import Icon from '@global/Icon';
import { t } from '@global/t';

export const displayName = 'Account Profile Tab';
export const shortDescription = 'User profile information and edit form';

export default function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [profile, setProfile] = useState({
    firstName: 'Claire',
    lastName: 'Dubois',
    email: 'claire.dubois@email.com',
    phone: '+33 6 12 34 56 78',
    childrenCount: '2 enfants (3 et 6 ans)',
    preferredCity: 'Paris, France'
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headings font-extrabold text-foreground">
            {t('Mon profil parent')}
          </h1>
          <p className="text-sm font-body text-muted-foreground mt-1">
            {t('Gérez vos informations personnelles et préférences de livraison')}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 bg-primary hover:bg-[#68bede] text-primary-foreground font-body font-bold px-5 py-2.5 rounded-xl text-sm shadow-xs transition-all hover:scale-105 active:scale-95 w-fit"
        >
          <Icon i={isEditing ? 'check' : 'edit'} size={15} />
          <span>{isEditing ? t('Annuler l\'édition') : t('Modifier le profil')}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-body flex items-center gap-2 animate-fadeIn">
          <Icon i="shield-check" size={18} className="text-emerald-600" />
          <span>{t('Vos informations ont été mises à jour avec succès.')}</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="w-24 h-24 bg-secondary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
            <Icon i="user" size={48} className="text-secondary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-headings font-extrabold text-foreground">
                {profile.firstName} {profile.lastName}
              </h2>
              <span className="bg-tag text-tag-foreground text-xs font-bold px-2.5 py-0.5 rounded-full">
                {t('Client VIP')}
              </span>
            </div>
            <p className="text-sm font-body text-muted-foreground mt-1">
              {t('Membre de la famille Kid First depuis janvier 2024')}
            </p>

            <div className="flex items-center gap-6 mt-4">
              <div className="text-left">
                <div className="text-2xl font-headings font-extrabold text-primary">12</div>
                <div className="text-xs font-body text-muted-foreground">{t('Commandes passées')}</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-left">
                <div className="text-2xl font-headings font-extrabold text-secondary-foreground">⭐ 4.9</div>
                <div className="text-xs font-body text-muted-foreground">{t('Fidélité & Avis')}</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-left">
                <div className="text-2xl font-headings font-extrabold text-[#F4A261]">180 pts</div>
                <div className="text-xs font-body text-muted-foreground">{t('Cagnotte KidClub')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Grid / Form */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-body font-bold text-foreground block mb-1">
                {t('Prénom')}
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="text-xs font-body font-bold text-foreground block mb-1">
                {t('Nom')}
              </label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="text-xs font-body font-bold text-foreground block mb-1">
                {t('Email')}
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="text-xs font-body font-bold text-foreground block mb-1">
                {t('Téléphone')}
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-body font-bold text-muted-foreground hover:text-foreground"
            >
              {t('Annuler')}
            </button>
            <button
              type="submit"
              className="bg-primary text-primary-foreground font-body font-bold px-6 py-2 rounded-xl text-sm shadow-sm"
            >
              {t('Enregistrer les modifications')}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-4">
            <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">
              {t('Prénom')}
            </label>
            <p className="text-base font-body font-semibold text-foreground mt-1">
              {profile.firstName}
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">
              {t('Nom')}
            </label>
            <p className="text-base font-body font-semibold text-foreground mt-1">
              {profile.lastName}
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">
              {t('Email')}
            </label>
            <p className="text-base font-body font-semibold text-foreground mt-1">
              {profile.email}
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">
              {t('Téléphone')}
            </label>
            <p className="text-base font-body font-semibold text-foreground mt-1">
              {profile.phone}
            </p>
          </div>
        </div>
      )}

      {/* Newsletter Preferences */}
      <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-primary-foreground">
            <Icon i="mail" size={16} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-headings font-extrabold text-foreground">
              {t('Abonnement à la newsletter & Bons plans Kid First')}
            </h3>
            <p className="text-sm font-body text-muted-foreground mt-1">
              {t('Recevez en avant-première nos nouveautés, offres privées, ventes flash et conseils pour parents.')}
            </p>
            <label className="flex items-center gap-3 mt-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
              />
              <span className="text-sm font-body font-semibold text-foreground">
                {t('Je souhaite recevoir les offres exclusives Kid First par email')}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

