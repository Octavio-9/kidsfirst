import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import KidLogo from '@components/KidLogo';
import Icon from '@global/Icon';

export const displayName = 'Kid First — Connexion Admin';

export default function AdminLoginPage({ onLoginSuccess }) {
  const { loginAdmin } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    // Small delay for UX feel
    await new Promise((r) => setTimeout(r, 400));
    const result = loginAdmin(email, password, remember);
    setLoading(false);
    if (result.success) {
      onLoginSuccess && onLoginSuccess();
    } else {
      setError(result.message || 'Identifiants incorrects.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center font-body"
      style={{ background: 'linear-gradient(135deg, #FFFDF7 0%, #EAF6FC 60%, #FFF8E1 100%)' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20" style={{ background: '#78C8E8' }} />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-15" style={{ background: '#FFD76A' }} />
        <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full opacity-10" style={{ background: '#78C8E8' }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4">
              <KidLogo className="h-14 w-auto" />
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide"
              style={{ background: '#FFF3E0', color: '#E65100' }}
            >
              <Icon name="shield-check" size={13} />
              Accès réservé à l'équipe Kid First
            </div>
          </div>

          {/* Title */}
          <h1
            className="font-headings font-extrabold text-2xl text-center mb-1"
            style={{ color: '#1A1A2E' }}
          >
            Panneau d'administration
          </h1>
          <p className="text-center text-sm mb-7" style={{ color: '#6B7280' }}>
            Connectez-vous pour gérer votre boutique
          </p>

          {/* Error banner */}
          {error && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-sm font-medium"
              style={{ background: '#FEE2E2', color: '#DC2626' }}
            >
              <Icon name="alert-circle" size={16} />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ color: '#1A1A2E' }}>
                Adresse e-mail
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }}>
                  <Icon name="mail" size={17} />
                </span>
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kidfirst.fr"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    borderColor: '#E5E7EB',
                    background: '#FAFAFA',
                    color: '#1A1A2E',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#78C8E8')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ color: '#1A1A2E' }}>
                Mot de passe
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }}>
                  <Icon name="lock" size={17} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    borderColor: '#E5E7EB',
                    background: '#FAFAFA',
                    color: '#1A1A2E',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#78C8E8')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#9CA3AF' }}
                  tabIndex={-1}
                >
                  <Icon name={showPassword ? 'eye-off' : 'eye'} size={17} />
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded accent-[#78C8E8] cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm cursor-pointer" style={{ color: '#6B7280' }}>
                Se souvenir de moi
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
              style={{ background: loading ? '#9CA3AF' : '#1A1A2E' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Connexion en cours…
                </>
              ) : (
                <>
                  <Icon name="log-in" size={16} />
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div
            className="mt-6 p-3.5 rounded-xl text-xs text-center"
            style={{ background: '#F0FDF4', color: '#16A34A', border: '1px dashed #86EFAC' }}
          >
            <span className="font-bold">Démo :</span> admin@kidfirst.fr / admin
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs mt-5" style={{ color: '#9CA3AF' }}>
          © {new Date().getFullYear()} Kid First · Accès sécurisé
        </p>
      </div>
    </div>
  );
}
