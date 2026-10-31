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
  Menu
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
  socketConnected,
  onOpenMobileMenu
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
    <header className="h-14 sm:h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      
      {/* Mobile Hamburger + Breadcrumb */}
      <div className="flex items-center space-x-2.5 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-1.5 text-xs text-slate-500 min-w-0">
          <span className="font-medium text-slate-400 hidden sm:inline">{t('header.operations', 'Operations')}</span>
          <span className="hidden sm:inline">/</span>
          <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight truncate max-w-[140px] sm:max-w-none">
            {tabLabels[activeTab] || t('header.workspace', 'Workspace')}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
        
        {/* Plant Clock / Shift (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">{settings?.activeShiftName || 'Shift A'}</span>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-slate-500 tabular-nums">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Language Selector */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
            title="Switch Language"
          >
            <span>{currentLangObj.flag}</span>
            <span className="text-[11px]">{currentLangObj.code.toUpperCase()}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-50 text-xs">
              <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                Language
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
                      ? 'bg-blue-50 font-bold text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
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
          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setIsAlertPopoverOpen(!isAlertPopoverOpen)}
            className="relative p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="System Alerts"
          >
            <Bell className="w-4 h-4" />
            {alerts && alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold text-white bg-rose-600">
                {alerts.length}
              </span>
            )}
          </button>

          {isAlertPopoverOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 text-xs">
              <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">Plant Alerts</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                    {alerts.length}
                  </span>
                </div>
                <button 
                  onClick={() => setIsAlertPopoverOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {alerts.length === 0 ? (
                  <div className="py-6 text-center text-slate-400 text-xs">
                    All Silos & Tooling Within Limits
                  </div>
                ) : (
                  alerts.map(alert => {
                    const isCrit = alert.severity === 'critical';
                    return (
                      <div key={alert.id} className="p-3 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start space-x-2">
                          {isCrit ? (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="font-bold text-xs text-slate-900">
                              {alert.title}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                              {alert.message}
                            </p>
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

        {/* User Account Button */}
        {currentUser && (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all text-xs text-left"
            >
              <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser.name ? currentUser.name.charAt(0) : 'A'}
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-slate-900 text-xs leading-none">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5 leading-none">
                  {t(`roles.${currentUser.role}`, currentUser.role)}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 max-w-[calc(100vw-2rem)] bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 text-xs">
                
                <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                  <div className="font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-slate-500 font-mono text-[11px] mt-0.5">{currentUser.phone}</div>
                  <div className="inline-block px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold text-[10px] mt-1.5">
                    {t(`roles.${currentUser.role}`, currentUser.role)}
                  </div>
                </div>

                {/* Quick Switch Actor Sub-menu */}
                <div className="px-3 py-2 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Quick Role Switcher:
                  </span>
                  <div className="space-y-1">
                    {ETHIOPIAN_PRESETS.map((preset) => (
                      <button
                        key={preset.role}
                        onClick={() => {
                          onSwitchActor(preset.phone);
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs flex items-center justify-between transition-colors ${
                          currentUser.role === preset.role 
                            ? 'bg-blue-50 font-bold text-blue-700' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{preset.name} ({t(preset.titleKey, preset.role)})</span>
                        {currentUser.role === preset.role && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logout Button */}
                <div className="px-2 pt-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-rose-700 hover:bg-rose-50 rounded-lg transition-colors font-bold text-xs text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('header.signOut', 'Sign Out')}</span>
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
