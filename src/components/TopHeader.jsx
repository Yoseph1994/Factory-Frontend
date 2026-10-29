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
  Globe
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
    dashboard: t('nav.dashboard', 'Dashboard'),
    inventory: t('nav.inventory', 'Inventory & Silos'),
    recipes: t('nav.recipes', 'Product Recipes (BOM)'),
    qc: t('nav.qc', 'Quality & Regrind'),
    maintenance: t('nav.maintenance', 'Machinery & Tooling'),
    orders: t('nav.orders', 'Work Orders & Gate Pass'),
    employees: t('nav.employees', 'Staff & Payroll'),
    settings: t('nav.settings', 'Plant Settings')
  };

  // Close popovers on outside click
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
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      
      {/* Breadcrumb & Section Title */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center text-xs text-slate-500 space-x-1.5">
          <span className="font-medium text-slate-400">{t('header.operations', 'Operations')}</span>
          <span>/</span>
          <span className="font-semibold text-slate-900">{tabLabels[activeTab] || t('header.workspace', 'Workspace')}</span>
        </div>

        {/* Live Socket Status Dot */}
        <div className="hidden md:flex items-center space-x-1.5 pl-3 border-l border-slate-200 text-[11px] font-medium text-slate-500">
          <span className={`w-2 h-2 rounded-full ${socketConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          <span>{socketConnected ? t('liveSocketSync', 'Live Socket Sync') : t('connecting', 'Connecting...')}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2.5">
        
        {/* Ethiopian Language Switcher Pill */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
            title="Switch Language (English / Afaan Oromoo / አማርኛ)"
          >
            <span>{currentLangObj.flag}</span>
            <span>{currentLangObj.code.toUpperCase()}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg border border-slate-200 shadow-xl py-1.5 z-50 text-xs">
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                {t('language', 'Language')} / Afaan / ቋንቋ
              </div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between transition-colors ${
                    language === l.code
                      ? 'bg-slate-100 font-bold text-slate-900'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{l.flag}</span>
                    <span>{l.native}</span>
                  </div>
                  {language === l.code && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Plant Clock / Shift */}
        <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium text-slate-700">{settings?.activeShiftName || t('productionActive', 'Production Active')}</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 tabular-nums">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Refresh Action */}
        <button
          onClick={onRefresh}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          title={t('header.refresh', 'Refresh Data from PostgreSQL')}
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setIsAlertPopoverOpen(!isAlertPopoverOpen)}
            className={`relative p-2 rounded-md transition-colors ${
              criticalAlerts.length > 0 
                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200' 
                : (alerts && alerts.length > 0)
                ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={t('header.activeAlerts', 'System Alerts')}
          >
            <Bell className="w-4 h-4" />
            {alerts && alerts.length > 0 && (
              <span className={`absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold tabular-nums text-white ${
                criticalAlerts.length > 0 ? 'bg-rose-600' : 'bg-amber-600'
              }`}>
                {alerts.length}
              </span>
            )}
          </button>

          {/* Alerts Popover Menu */}
          {isAlertPopoverOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg border border-slate-200 shadow-xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-900">{t('header.activeAlerts', 'Active Plant Alerts')}</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold tabular-nums">
                    {alerts.length}
                  </span>
                </div>
                <button 
                  onClick={() => setIsAlertPopoverOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {alerts.length === 0 ? (
                  <div className="py-6 text-center text-slate-400">
                    <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-500 mb-1" />
                    <span>{t('header.noAlerts', 'All inventory levels and tooling within limits')}</span>
                  </div>
                ) : (
                  alerts.map(alert => {
                    const isCrit = alert.severity === 'critical';
                    return (
                      <div key={alert.id} className="p-3 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start space-x-2">
                            {isCrit ? (
                              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div className={`font-semibold text-xs ${isCrit ? 'text-rose-900' : 'text-amber-900'}`}>
                                {alert.title}
                              </div>
                              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                {alert.message}
                              </p>
                              {alert.targetTab && (
                                <button
                                  onClick={() => {
                                    onNavigateTab(alert.targetTab);
                                    setIsAlertPopoverOpen(false);
                                  }}
                                  className="inline-flex items-center space-x-1 text-[11px] font-semibold text-slate-900 hover:underline mt-1.5"
                                >
                                  <span>{t('header.openTab', 'Open')} {alert.targetTab}</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
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

        {/* User Account & Role Switcher */}
        {currentUser && (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-xs text-left"
            >
              <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                {currentUser.name ? currentUser.name.charAt(0) : 'U'}
              </div>
              <div className="hidden sm:block">
                <div className="font-semibold text-slate-900 text-xs leading-none">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-none">
                  {t(`roles.${currentUser.role}`, currentUser.role)}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg border border-slate-200 shadow-xl py-2 z-50 text-xs">
                
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-slate-500 text-[11px] font-mono">{currentUser.phone}</div>
                  <div className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold text-[10px] mt-1.5">
                    {t(`roles.${currentUser.role}`, currentUser.role)}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {t('header.dept', 'Dept')}: {currentUser.department || 'Operations'}
                  </div>
                </div>

                {/* Quick Switch Actor Sub-menu */}
                <div className="px-4 py-2 border-b border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {t('header.switchRole', 'Switch Active Actor Role')}:
                  </span>
                  <div className="space-y-1">
                    {ETHIOPIAN_PRESETS.map((preset) => (
                      <button
                        key={preset.role}
                        onClick={() => {
                          onSwitchActor(preset.phone);
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between transition-colors ${
                          currentUser.role === preset.role 
                            ? 'bg-slate-100 font-bold text-slate-900' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span>{t(preset.titleKey, preset.role)}</span>
                          <span className="text-[10px] text-slate-400 ml-1.5">({preset.name})</span>
                        </div>
                        {currentUser.role === preset.role && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
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
                    className="w-full flex items-center space-x-2 px-3 py-2 text-rose-700 hover:bg-rose-50 rounded-md transition-colors font-medium text-xs text-left"
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
