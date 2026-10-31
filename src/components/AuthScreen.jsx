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
  Globe,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Building2,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

const ETHIOPIAN_ACTORS = [
  { role: 'plant_owner', titleKey: 'roles.plant_owner', phone: '+251911010101', name: 'Abebe Tadesse', dept: 'Executive & Ownership', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { role: 'production_manager', titleKey: 'roles.production_manager', phone: '+251911010102', name: 'Tolasa Desta', dept: 'Plant Operations', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { role: 'shift_supervisor', titleKey: 'roles.shift_supervisor', phone: '+251911010103', name: 'Chaltu Gemeda', dept: 'Shop Floor Shift', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { role: 'qc_inspector', titleKey: 'roles.qc_inspector', phone: '+251911010104', name: 'Yohannes Bekele', dept: 'Quality & Regrind', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' },
  { role: 'warehouse_officer', titleKey: 'roles.warehouse_officer', phone: '+251911010105', name: 'Kenenisa Guyo', dept: 'Inventory & Gate Pass', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { role: 'maintenance_tech', titleKey: 'roles.maintenance_tech', phone: '+251911010106', name: 'Dawit Alemu', dept: 'Tooling & Hydraulics', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
  { role: 'hr_payroll', titleKey: 'roles.hr_payroll', phone: '+251911010107', name: 'Hanan Mohammed', dept: 'Human Resources & Finance', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' }
];

export default function AuthScreen({ onLoginSuccess }) {
  const { t, language, setLanguage, languages } = useLanguage();
  const [phone, setPhone] = useState('+251911010101');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRoleTab, setSelectedRoleTab] = useState('demo'); // 'demo' or 'manual'

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

  const handleSelectActor = (actor) => {
    setPhone(actor.phone);
    setPassword('password123');
    handleLogin(null, actor.phone, 'password123');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased selection:bg-blue-600 selection:text-white">
      
      {/* LEFT SHOWCASE PANEL (World-class Industrial Identity) */}
      <div className="lg:w-5/12 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 relative overflow-hidden">
        
        {/* Subtle background glow effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-white flex items-center space-x-2">
                <span>PLASTIX™</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono font-semibold border border-blue-500/30">
                  CORE MES
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Enterprise Manufacturing Execution System
              </div>
            </div>
          </div>

          {/* Plant Live Status Beacon */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-medium text-slate-300 shadow-inner mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{t('factoryLocation', 'Dukem Plant, Oromia, Ethiopia')}</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-mono font-semibold">Active Fleet 4/4</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Total Operational Visibility Over Your Plant Floor
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md">
            Purpose-built for plastic injection molding, blow molding, and polymer extrusion plants. Track virgin vs. regrind circular economy, machinery health, and shop-floor shifts in real-time.
          </p>
        </div>

        {/* 3 Executive Value Highlights */}
        <div className="relative z-10 my-8 space-y-3.5">
          <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/70 backdrop-blur-xs">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Live Telemetry & Clamping OEE</div>
              <div className="text-xs text-slate-400 mt-0.5">Hydraulic pressure, barrel heat zones, and cycle tracking per press.</div>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/70 backdrop-blur-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Circular Scrap & Regrind Recovery</div>
              <div className="text-xs text-slate-400 mt-0.5">Automated formulation balances for virgin polymer and runner regrind cost savings.</div>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/70 backdrop-blur-xs">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Role-Based Access & Gate Pass Security</div>
              <div className="text-xs text-slate-400 mt-0.5">Strict authorization barriers between plant floor, warehouse, and finance.</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-6 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
          <span>EthioPlast Manufacturing PLC</span>
          <span className="font-mono text-slate-400">v2.4 Enterprise</span>
        </div>

      </div>

      {/* RIGHT SIGN-IN / INTERACTIVE ROLE SELECTOR */}
      <div className="lg:w-7/12 bg-slate-50 text-slate-900 p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
        
        <div className="max-w-xl mx-auto w-full">
          
          {/* Top Bar: Language & Direct Switcher */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Authentication Portal</span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">Sign In to Plant Workspace</h2>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-1.5 bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-all flex items-center space-x-1 ${
                    language === l.code
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex rounded-lg bg-slate-200/80 p-1 mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSelectedRoleTab('demo')}
              className={`flex-1 py-2 rounded-md transition-all flex items-center justify-center space-x-2 ${
                selectedRoleTab === 'demo'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>One-Click Executive & Staff Demo (Recommended)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRoleTab('manual')}
              className={`flex-1 py-2 rounded-md transition-all flex items-center justify-center space-x-2 ${
                selectedRoleTab === 'manual'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Standard Sign In Form</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2.5 shadow-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="font-medium">{error}</div>
            </div>
          )}

          {/* TAB 1: ONE-CLICK EXECUTIVE ROLE BADGES */}
          {selectedRoleTab === 'demo' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Select any factory executive or staff member to enter:</span>
                <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Ready to test
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ETHIOPIAN_ACTORS.map((actor) => (
                  <button
                    key={actor.role}
                    type="button"
                    onClick={() => handleSelectActor(actor)}
                    disabled={loading}
                    className="group text-left p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-600 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                          {actor.name}
                        </div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">
                          {actor.dept}
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${actor.badgeColor}`}>
                        {t(actor.titleKey, actor.role)}
                      </span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400 text-[11px]">{actor.phone}</span>
                      <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center text-[11px]">
                        <span>Enter</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MANUAL CREDENTIALS SIGN-IN */}
          {selectedRoleTab === 'manual' && (
            <form onSubmit={(e) => handleLogin(e)} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('auth.phoneLabel', 'Phone Number')}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder={t('auth.phonePlaceholder', '+251911010101')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 tabular-nums bg-slate-50/50 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {t('auth.passwordLabel', 'Password')}
                  </label>
                  <span className="text-xs text-slate-400 font-medium">Default: password123</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={t('auth.passwordPlaceholder', 'Enter password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50/50 focus:bg-white font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? t('auth.signingIn', 'Verifying Credentials...') : t('auth.signInButton', 'Sign In to Workspace')}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

            </form>
          )}

          {/* Enterprise Security Badge Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>TLS 1.3 Certified • 256-bit Encrypted Session</span>
            </div>
            <span className="font-mono text-slate-500 font-semibold">ISO 9001:2015 Compliant</span>
          </div>

        </div>

      </div>

    </div>
  );
}
