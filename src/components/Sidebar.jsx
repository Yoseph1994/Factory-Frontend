import React from 'react';
import { 
  LayoutDashboard, 
  Boxes, 
  FlaskConical, 
  ShieldCheck, 
  Wrench, 
  Truck, 
  Settings, 
  Building2, 
  Users, 
  Smartphone,
  ChevronRight,
  Shield
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ROLE_NAV_PERMISSIONS = {
  plant_owner: ['dashboard', 'inventory', 'recipes', 'qc', 'maintenance', 'orders', 'employees', 'settings'],
  production_manager: ['dashboard', 'inventory', 'recipes', 'qc', 'maintenance', 'orders', 'employees'],
  shift_supervisor: ['inventory', 'qc', 'maintenance', 'orders'],
  qc_inspector: ['qc', 'inventory'],
  warehouse_officer: ['inventory', 'orders'],
  maintenance_tech: ['maintenance', 'inventory'],
  hr_payroll: ['employees']
};

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  alerts, 
  settings, 
  isFloorMode, 
  setIsFloorMode,
  currentUser 
}) {
  const { t } = useLanguage();
  const inventoryAlertsCount = (alerts || []).filter(a => a.targetTab === 'inventory' || a.id?.includes('stock')).length;
  const maintenanceAlertsCount = (alerts || []).filter(a => a.targetTab === 'maintenance' || a.id?.includes('mold') || a.id?.includes('maint')).length;

  const allNavItems = [
    {
      id: 'dashboard',
      label: t('nav.dashboard', 'Dashboard'),
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'inventory',
      label: t('nav.inventory', 'Inventory & Silos'),
      icon: Boxes,
      badge: inventoryAlertsCount > 0 ? { count: inventoryAlertsCount, type: 'danger' } : null
    },
    {
      id: 'recipes',
      label: t('nav.recipes', 'Product Recipes (BOM)'),
      icon: FlaskConical,
      badge: null
    },
    {
      id: 'qc',
      label: t('nav.qc', 'Quality & Regrind'),
      icon: ShieldCheck,
      badge: null
    },
    {
      id: 'maintenance',
      label: t('nav.maintenance', 'Machinery & Tooling'),
      icon: Wrench,
      badge: maintenanceAlertsCount > 0 ? { count: maintenanceAlertsCount, type: 'warning' } : null
    },
    {
      id: 'orders',
      label: t('nav.orders', 'Orders & Gate Pass'),
      icon: Truck,
      badge: null
    },
    {
      id: 'employees',
      label: t('nav.employees', 'Staff & Payroll'),
      icon: Users,
      badge: null
    },
    {
      id: 'settings',
      label: t('nav.settings', 'Plant Settings'),
      icon: Settings,
      badge: null
    }
  ];

  const allowedTabs = currentUser?.role 
    ? (ROLE_NAV_PERMISSIONS[currentUser.role] || ['dashboard']) 
    : ['dashboard', 'inventory', 'recipes', 'qc', 'maintenance', 'orders', 'employees', 'settings'];

  const visibleNavItems = allNavItems.filter(item => allowedTabs.includes(item.id));

  // Determine if this user role operates on the physical floor
  const canAccessFloorMode = !currentUser || ['plant_owner', 'production_manager', 'shift_supervisor', 'qc_inspector', 'maintenance_tech'].includes(currentUser.role);

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 select-none">
      
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Building2 className="w-4 h-4 text-slate-200" />
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-tight leading-none">
              ETHIOPLAST
              <span className="text-slate-400 font-semibold text-xs ml-1.5">ERP</span>
            </div>
            <div className="text-[9px] text-slate-500 tracking-wider font-semibold uppercase mt-1 truncate max-w-[150px]">
              {t('factorySub', 'ETHIOPIAN INDUSTRIAL POLYMERS')}
            </div>
          </div>
        </div>
      </div>

      {/* Role / Access Matrix Indicator */}
      <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            {t('activeRole', 'Active Role')}
          </span>
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700">
            <Shield className="w-3 h-3 text-slate-400" />
            <span>{currentUser?.role || 'Guest'}</span>
          </span>
        </div>
        <div className="text-[11px] text-slate-300 font-semibold truncate mt-1">
          {currentUser?.name || 'Factory Worker'}
        </div>
        <div className="text-[10px] text-slate-400 truncate">
          {t(`roles.${currentUser?.role}`, currentUser?.role || 'Operator')}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-2 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          {t('authorizedModules', 'Authorized Modules')} ({visibleNavItems.length})
        </div>
        
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = !isFloorMode && activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setIsFloorMode(false);
                setActiveTab(item.id);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold tabular-nums ${
                  item.badge.type === 'danger'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {item.badge.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Shop Floor Terminal Mode Switcher */}
      {canAccessFloorMode && (
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {t('touchInterface', 'Touch Interface')}
          </div>
          <button
            onClick={() => setIsFloorMode(!isFloorMode)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-semibold transition-all border ${
              isFloorMode
                ? 'bg-emerald-950/80 text-emerald-200 border-emerald-700/60 shadow-xs'
                : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Smartphone className={`w-4 h-4 ${isFloorMode ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{isFloorMode ? t('floorModeActive', 'Floor Mode Active') : t('switchToFloorMode', 'Switch to Floor Mode')}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      )}

    </aside>
  );
}
