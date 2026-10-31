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
  Shield,
  Radio,
  Sparkles
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

  const NAV_SECTIONS = [
    {
      title: t('navSection.operations', 'OPERATIONS & SILOS'),
      items: [
        {
          id: 'dashboard',
          label: t('nav.dashboard', 'Executive Dashboard'),
          icon: LayoutDashboard,
          badge: null
        },
        {
          id: 'inventory',
          label: t('nav.inventory', 'Raw Polymer & Silos'),
          icon: Boxes,
          badge: inventoryAlertsCount > 0 ? { count: inventoryAlertsCount, type: 'danger' } : null
        },
        {
          id: 'recipes',
          label: t('nav.recipes', 'Product Recipes & BOM'),
          icon: FlaskConical,
          badge: null
        },
        {
          id: 'qc',
          label: t('nav.qc', 'Quality & Regrind'),
          icon: ShieldCheck,
          badge: null
        }
      ]
    },
    {
      title: t('navSection.shopfloor', 'PLANT FLOOR & DISPATCH'),
      items: [
        {
          id: 'maintenance',
          label: t('nav.maintenance', 'Machinery & Tooling'),
          icon: Wrench,
          badge: maintenanceAlertsCount > 0 ? { count: maintenanceAlertsCount, type: 'warning' } : null
        },
        {
          id: 'orders',
          label: t('nav.orders', 'Work Orders & Gate Pass'),
          icon: Truck,
          badge: null
        }
      ]
    },
    {
      title: t('navSection.enterprise', 'ENTERPRISE & HR'),
      items: [
        {
          id: 'employees',
          label: t('nav.employees', 'Staff & Payroll (ETB)'),
          icon: Users,
          badge: null
        },
        {
          id: 'settings',
          label: t('nav.settings', 'Plant Configurations'),
          icon: Settings,
          badge: null
        }
      ]
    }
  ];

  const allowedTabs = currentUser?.role 
    ? (ROLE_NAV_PERMISSIONS[currentUser.role] || ['dashboard']) 
    : ['dashboard', 'inventory', 'recipes', 'qc', 'maintenance', 'orders', 'employees', 'settings'];

  const canAccessFloorMode = !currentUser || ['plant_owner', 'production_manager', 'shift_supervisor', 'qc_inspector', 'maintenance_tech'].includes(currentUser.role);

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800/80 select-none shadow-xl z-20">
      
      {/* Brand Header */}
      <div className="h-18 px-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20 ring-1 ring-white/10">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-white text-base tracking-tight leading-none flex items-center space-x-1.5">
              <span>PLASTIX</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                PRO
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1 truncate max-w-[150px]">
              {settings?.factoryName ? 'Dukem Plant' : 'Ethiopian Polymers'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {NAV_SECTIONS.map((section, idx) => {
          const visibleItems = section.items.filter(item => allowedTabs.includes(item.id));
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1">
              <div className="px-3 pb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {section.title}
              </div>

              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = !isFloorMode && activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsFloorMode(false);
                      setActiveTab(item.id);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums shadow-xs ${
                        item.badge.type === 'danger'
                          ? 'bg-rose-500 text-white'
                          : 'bg-amber-500 text-slate-950 font-extrabold'
                      }`}>
                        {item.badge.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Shop Floor Terminal Mode Switcher */}
      {canAccessFloorMode && (
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-900/60">
          <button
            onClick={() => setIsFloorMode(!isFloorMode)}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all border ${
              isFloorMode
                ? 'bg-emerald-950/80 text-emerald-200 border-emerald-600 shadow-md shadow-emerald-950/40'
                : 'bg-slate-900 text-slate-200 border-slate-700/80 hover:bg-slate-800/90 hover:border-slate-600 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isFloorMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="leading-tight">{isFloorMode ? t('floorModeActive', 'Floor Terminal Active') : t('switchToFloorMode', 'Shop Floor Mode')}</div>
                <div className="text-[10px] text-slate-400 font-normal mt-0.5">High-contrast touch UI</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      )}

      {/* User Status Card */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-blue-400 shrink-0">
            {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">
              {currentUser?.name || 'Factory Worker'}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {t(`roles.${currentUser?.role}`, currentUser?.role || 'Operator')}
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}
