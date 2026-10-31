import React, { useState } from 'react';
import { 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Building2,
  ArrowRight,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

const ETHIOPIAN_ACTORS = [
  { role: 'plant_owner', title: 'Plant Owner', name: 'Abebe Tadesse', phone: '+251911010101' },
  { role: 'production_manager', title: 'Production Manager', name: 'Tolasa Desta', phone: '+251911010102' },
  { role: 'shift_supervisor', title: 'Shift Supervisor', name: 'Chaltu Gemeda', phone: '+251911010103' },
  { role: 'qc_inspector', title: 'QC Inspector', name: 'Yohannes Bekele', phone: '+251911010104' },
  { role: 'warehouse_officer', title: 'Warehouse Officer', name: 'Kenenisa Guyo', phone: '+251911010105' },
  { role: 'maintenance_tech', title: 'Maintenance Tech', name: 'Dawit Alemu', phone: '+251911010106' },
  { role: 'hr_payroll', title: 'HR & Payroll', name: 'Hanan Mohammed', phone: '+251911010107' }
];

export default function AuthScreen({ onLoginSuccess }) {
  const { t, language, setLanguage, languages } = useLanguage();
  const [phone, setPhone] = useState('+251911010101');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleLogin = async (e, customPhone, customPassword) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    const targetPhone = customPhone || phone;
    const targetPassword = customPassword || password;

    try {
      const data = await api.login(targetPhone, targetPassword);
      if (!data || !data.success) {
        throw new Error((data && data.error) || t('auth.errorMissing', 'Authentication failed. Please verify credentials.'));
      }
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectActor = (actorPhone) => {
    const actor = ETHIOPIAN_ACTORS.find(a => a.phone === actorPhone);
    if (!actor) return;
    setPhone(actor.phone);
    setPassword('password123');
    handleLogin(null, actor.phone, 'password123');
  };

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-6 sm:p-10 font-sans antialiased">
      
      {/* Top Header Bar */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs">
            <Building2 className="w-5 h-5 text-slate-100" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-slate-900 leading-none">
              Plastix ERP
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Enterprise Factory Operations
            </div>
          </div>
        </div>

        {/* Clean Language Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>{currentLang.flag}</span>
            <span>{currentLang.label}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-50 text-xs">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLanguage(l.code);
                    setIsLangOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    language === l.code ? 'font-bold text-slate-900 bg-slate-50' : 'text-slate-600'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Form Centerpiece */}
      <div className="w-full max-w-md mx-auto my-auto py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-9 shadow-sm">
          
          <div className="mb-7">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Select an account role below or enter your credentials.
            </p>
          </div>

          {/* Quick Demo Switcher */}
          <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Demo Access — Switch Role
            </label>
            <select
              value={phone}
              onChange={(e) => handleSelectActor(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-800"
            >
              {ETHIOPIAN_ACTORS.map((actor) => (
                <option key={actor.phone} value={actor.phone}>
                  {actor.name} — {actor.title}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Selecting a role automatically prepares authentication.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="+251911010101"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Default: password123</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Verifying...' : 'Sign In'}</span>
              {!loading && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>

        </div>
      </div>

      {/* Clean Minimalist Footer */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between text-xs text-slate-400 border-t border-slate-200/80 pt-4">
        <span>Plastix Manufacturing ERP</span>
        <span>Secure Enterprise Session</span>
      </div>

    </div>
  );
}
