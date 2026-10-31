import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  RefreshCw, 
  AlertTriangle, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Clock, 
  LogOut, 
  ChevronDown,
  Globe,
  Radio,
  Layers,
  Shield,
  Activity
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ETHIOPIAN_PRESETS = [
  { role: 'plant_owner', titleKey: 'roles.plant_owner', phone: '+251911010101', name: 'Abebe Tadesse' },
  { role: 'production_manager', titleKey: 'roles.production_manager', phone: '+251911010102', name: 'Tolasa Desta' },
  { role: 'shift_supervisor', titleKey: 'roles.shift_supervisor', phone: '+251911010103', name: 'Chaltu Gemeda' },
  { role: 'qc_inspector', titleKey: 'roles.qc_inspector', phone: '+251911010104', name: 'Yohannes Bekele' },
  { role: 'warehouse_officer', titleKey: 'roles.warehouse_officer', phone: '+251911010105', name: 'Kenenisa Guyo' },
  { role: 'maintenance_tech', titleKey: 'roles.maintenance_tech', phone: '+251911010106', name: 'Dawit Alemu' },
  { role: 'hr_payroll', titleKey: 'roles.hr_payroll', phone: '+251911010107', name: 'Hanan Mohammed' }
];

export default function TopHeader({ 
  activeTab, 
  alerts, 
  settings, 
  onRefresh, 
  onNavigateTab,
  currentUser,
  onLogout,
  onSwitchActor,
  socketConnected
}) {
  const { t, language, setLanguage, languages } = useLanguage();
  const [isAlertPopoverOpen, setIsAlertPopoverOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const popoverRef = useRef(null);
  const userMenuRef = useRef(null);
  const langMenuRef = useRef(null);

  const criticalAlerts = (alerts || []).filter(a => a.severity === 'critical');

  const tabLabels = {
    dashboard: t('nav.dashboard', 'Executive Dashboard'),
    inventory: t('nav.inventory', 'Raw Polymer & Silos'),
    recipes: t('nav.recipes', 'Product Recipes & BOM'),
    qc: t('nav.qc', 'Quality Control & Regrind'),
    maintenance: t('nav.maintenance', 'Machinery & Tooling Fleet'),
    orders: t('nav.orders', 'Work Orders & Gate Pass'),
    employees: t('nav.employees', 'Staff & Payroll (ETB)'),
    settings: t('nav.settings', 'Plant Configurations')
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsAlertPopoverOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="h-18 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 select-none shadow-xs">
      
      {/* Breadcrumb & Section Title */}
      <div className="flex items-center space-x-3.5">
        <div className="flex items-center text-xs space-x-2">
          <span className="font-semibold text-slate-400 uppercase tracking-wider">{t('header.operations', 'OPERATIONS')}</span>
          <span className="text-slate-300">/</span>
          <span className="font-extrabold text-slate-900 text-sm tracking-tight">{tabLabels[activeTab] || t('header.workspace', 'Workspace')}</span>
        </div>

        {/* Live Socket Status Dot */}
        <div className="hidden md:flex items-center space-x-2 pl-3.5 border-l border-slate-200 text-xs font-semibold text-slate-600">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${socketConnected ? 'bg-emerald-400' : 'bg-slate-300'}`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${socketConnected ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          </span>
          <span className="font-medium">{socketConnected ? 'Real-Time Sync' : 'Connecting...'}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        
        {/* Plant Clock / Shift Badge */}
        <div className="hidden lg:flex items-center space-x-2.5 text-xs text-slate-600 bg-slate-50/80 px-3.5 py-1.5 rounded-lg border border-slate-200/80">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-800">{settings?.activeShiftName || 'Shift A (Day)'}</span>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-slate-500 tabular-nums">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Language Selector */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-xs"
            title="Switch Language"
          >
            <span>{currentLangObj.flag}</span>
            <span>{currentLangObj.code.toUpperCase()}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-dropdown py-1.5 z-50 text-xs">
              <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                Language / Afaan / ቋንቋ
              </div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 flex items-center justify-between transition-colors ${
                    language === l.code
                      ? 'bg-blue-50/80 font-bold text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{l.flag}</span>
                    <span>{l.native}</span>
                  </div>
                  {language === l.code && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh Action */}
        <button
          onClick={onRefresh}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
          title="Refresh Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setIsAlertPopoverOpen(!isAlertPopoverOpen)}
            className={`relative p-2 rounded-lg transition-colors border ${
              criticalAlerts.length > 0 
                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200' 
                : (alerts && alerts.length > 0)
                ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
            }`}
            title="System Alerts"
          >
            <Bell className="w-4 h-4" />
            {alerts && alerts.length > 0 && (
              <span className={`absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold tabular-nums text-white ${
                criticalAlerts.length > 0 ? 'bg-rose-600 shadow-xs' : 'bg-amber-600 shadow-xs'
              }`}>
                {alerts.length}
              </span>
            )}
          </button>

          {isAlertPopoverOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl border border-slate-200 shadow-dropdown py-2 z-50 text-xs">
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-slate-900 text-sm">Active Plant Alerts</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold tabular-nums text-[11px]">
                    {alerts.length}
                  </span>
                </div>
                <button 
                  onClick={() => setIsAlertPopoverOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {alerts.length === 0 ? (
                  <div className="py-8 text-center text-slate-400">
                    <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                    <span className="font-semibold text-slate-600">All Silos & Tooling Within Normal Parameters</span>
                  </div>
                ) : (
                  alerts.map(alert => {
                    const isCrit = alert.severity === 'critical';
                    return (
                      <div key={alert.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start space-x-2.5">
                          {isCrit ? (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className={`font-bold text-xs ${isCrit ? 'text-rose-900' : 'text-amber-900'}`}>
                              {alert.title}
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                              {alert.message}
                            </p>
                            {alert.targetTab && (
                              <button
                                onClick={() => {
                                  onNavigateTab(alert.targetTab);
                                  setIsAlertPopoverOpen(false);
                                }}
                                className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800 mt-2"
                              >
                                <span>Resolve in {alert.targetTab}</span>
                                <ArrowRight className="w-3 h-3 ml-0.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Account & Executive Role Switcher */}
        {currentUser && (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-xs text-left shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-900 to-blue-900 text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
                {currentUser.name ? currentUser.name.charAt(0) : 'A'}
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-slate-900 text-xs leading-none">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-blue-600 font-semibold mt-1 leading-none">
                  {t(`roles.${currentUser.role}`, currentUser.role)}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-dropdown py-2 z-50 text-xs">
                
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <div className="font-extrabold text-slate-900 text-sm">{currentUser.name}</div>
                  <div className="text-slate-500 font-mono text-[11px] mt-0.5">{currentUser.phone}</div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px] mt-2">
                    {t(`roles.${currentUser.role}`, currentUser.role)}
                  </div>
                </div>

                {/* Quick Switch Actor Sub-menu */}
                <div className="px-3 py-2 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 px-1">
                    Quick Role Switcher (Live Demo):
                  </span>
                  <div className="space-y-1">
                    {ETHIOPIAN_PRESETS.map((preset) => (
                      <button
                        key={preset.role}
                        onClick={() => {
                          onSwitchActor(preset.phone);
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          currentUser.role === preset.role 
                            ? 'bg-blue-50 font-bold text-blue-700' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{t(preset.titleKey, preset.role)}</div>
                          <div className="text-[10px] text-slate-400">{preset.name}</div>
                        </div>
                        {currentUser.role === preset.role && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logout Button */}
                <div className="px-2 pt-1.5">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-rose-700 hover:bg-rose-50 rounded-lg transition-colors font-bold text-xs text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('header.signOut', 'Sign Out of Terminal')}</span>
                  </button>
                </div>

              </div>
            )}
          </div>
        )}

      </div>

    </header>
  );
}
