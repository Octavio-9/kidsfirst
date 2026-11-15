import React, { useState } from 'react';
import Icon from '@global/Icon';
import { t } from '@global/t';

export default function WhatsAppSupportModal({ isOpen, onClose }) {
  const [topic, setTopic] = useState('question');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    const encoded = encodeURIComponent(`Bonjour Kid First,\n[${topic === 'question' ? 'Question produit' : topic === 'order' ? 'Suivi commande' : 'Conseil taille'}]\n${message}`);
    window.open(`https://wa.me/33612345678?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-card w-full max-w-md rounded-3xl border border-border overflow-hidden shadow-2xl relative p-6 space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-input hover:bg-muted text-foreground flex items-center justify-center text-sm font-bold"
        >
          ✕
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <Icon i="message-circle" size={26} />
          </div>
          <div>
            <h3 className="text-lg font-headings font-extrabold text-foreground">
              {t('WhatsApp Kid First')}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t('Réponse moyenne en moins de 15 minutes')}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {t('Une question sur une taille, une disponibilité ou votre commande ? Échangez directement avec nos conseillères passionnées.')}
        </p>

        <form onSubmit={handleSend} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t('Motif de votre message')}
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-3 py-2 text-sm font-body outline-none"
            >
              <option value="question">{t('Conseil produit ou disponibilité')}</option>
              <option value="size">{t('Aide au choix de la taille')}</option>
              <option value="order">{t('Suivi ou modification d\'une commande')}</option>
              <option value="other">{t('Autre demande')}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t('Votre message (optionnel)')}
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('Ex : Bonjour, quelle taille conseillez-vous pour un enfant de 4 ans mesurant 104 cm ?')}
              className="w-full bg-input border border-border rounded-xl p-3 text-sm font-body outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-headings font-extrabold py-3 rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Icon i="message-circle" size={18} />
            <span>{t('Ouvrir la discussion WhatsApp')}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

