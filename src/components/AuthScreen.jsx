import React, { useState } from 'react';
import { 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ShieldCheck, 
  Factory,
  ArrowRight,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ETHIOPIAN_ACTORS = [
  { role: 'plant_owner', titleKey: 'roles.plant_owner', phone: '+251911010101', name: 'Abebe Tadesse', dept: 'Executive' },
  { role: 'production_manager', titleKey: 'roles.production_manager', phone: '+251911010102', name: 'Tolasa Desta', dept: 'Operations' },
  { role: 'shift_supervisor', titleKey: 'roles.shift_supervisor', phone: '+251911010103', name: 'Chaltu Gemeda', dept: 'Shop Floor' },
  { role: 'qc_inspector', titleKey: 'roles.qc_inspector', phone: '+251911010104', name: 'Yohannes Bekele', dept: 'Quality' },
  { role: 'warehouse_officer', titleKey: 'roles.warehouse_officer', phone: '+251911010105', name: 'Kenenisa Guyo', dept: 'Dispatch' },
  { role: 'maintenance_tech', titleKey: 'roles.maintenance_tech', phone: '+251911010106', name: 'Dawit Alemu', dept: 'Toolroom' },
  { role: 'hr_payroll', titleKey: 'roles.hr_payroll', phone: '+251911010107', name: 'Hanan Mohammed', dept: 'HR / Finance' }
];

export default function AuthScreen({ onLoginSuccess }) {
  const { t, language, setLanguage, languages } = useLanguage();
  const [phone, setPhone] = useState('+251911010101');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e, customPhone, customPassword) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    const targetPhone = customPhone || phone;
    const targetPassword = customPassword || password;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone: targetPhone, password: targetPassword })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || t('auth.errorMissing', 'Authentication failed. Please verify credentials.'));
      }

      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectActor = (actor) => {
    setPhone(actor.phone);
    setPassword('password123');
    handleLogin(null, actor.phone, 'password123');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 antialiased text-slate-100 relative">
      
      {/* Language Switcher Bar Top-Right */}
      <div className="absolute top-5 right-5 flex items-center space-x-1.5 bg-slate-800/80 backdrop-blur-xs p-1.5 rounded-lg border border-slate-700 shadow-md">
        <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
        {languages.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLanguage(l.code)}
            className={`px-2 py-1 rounded text-xs font-semibold transition-all flex items-center space-x-1 ${
              language === l.code
                ? 'bg-slate-900 text-white shadow-xs border border-slate-600'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>

      {/* Brand Header */}
      <div className="max-w-md w-full text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 shadow-md mb-3">
          <Factory className="w-6 h-6 text-slate-200" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{t('factoryName', 'EthioPlast Manufacturing PLC')}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('factoryLocation', 'Dukem Industrial Park, Oromia, Ethiopia')}
        </p>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        
        <div className="p-6 sm:p-8 space-y-5">
          
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">{t('auth.systemSignIn', 'System Sign In')}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('auth.subtitle', 'Enterprise access control for shop-floor & executive management')}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            
            {/* Phone Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('auth.phoneLabel', 'Phone Number')}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder={t('auth.phonePlaceholder', '+251911010101')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 tabular-nums bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  {t('auth.passwordLabel', 'Password')}
                </label>
                <span className="text-[11px] text-slate-400">Default: password123</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder={t('auth.passwordPlaceholder', 'Enter password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 bg-slate-50 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? t('auth.signingIn', 'Verifying...') : t('auth.signInButton', 'Sign In to Workspace')}</span>
              {!loading && <ArrowRight className="w-3.5 h-3.5" />}
            </button>

          </form>

          {/* Quick Actor Selector (Ethiopian Roles) */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              {t('auth.quickSwitchTitle', 'One-Click Actor Switcher')}:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {ETHIOPIAN_ACTORS.map((actor) => (
                <button
                  key={actor.role}
                  type="button"
                  onClick={() => handleSelectActor(actor)}
                  disabled={loading}
                  className="text-left px-2.5 py-1.5 rounded border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-colors text-[11px]"
                >
                  <div className="font-semibold text-slate-800 truncate">{t(actor.titleKey, actor.role)}</div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">{actor.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{actor.phone}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Security Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('auth.trustNotice', 'Encrypted Cookie + 256-bit JWT Vault')}</span>
          </div>
          <span className="font-mono text-[10px] font-semibold text-slate-600">ETB / ብር</span>
        </div>

      </div>

    </div>
  );
}
