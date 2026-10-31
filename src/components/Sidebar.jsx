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
  X
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
  currentUser,
  isMobileOpen,
  onClose
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

  const renderContent = (isMobile = false) => (
    <>
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/70">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm tracking-tight leading-none flex items-center space-x-1.5">
              <span>PLASTIX</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                PRO
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1 truncate max-w-[140px]">
              {settings?.factoryName ? 'Dukem Plant' : 'Ethiopian Polymers'}
            </div>
          </div>
        </div>

        {isMobile && (
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {NAV_SECTIONS.map((section, idx) => {
          const visibleItems = section.items.filter(item => allowedTabs.includes(item.id));
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
                      if (onClose) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums ${
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
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
          <button
            onClick={() => {
              setIsFloorMode(!isFloorMode);
              if (onClose) onClose();
            }}
            className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-bold transition-all border ${
              isFloorMode
                ? 'bg-emerald-950/80 text-emerald-200 border-emerald-600'
                : 'bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Smartphone className={`w-4 h-4 ${isFloorMode ? 'text-emerald-400' : 'text-slate-400'}`} />
              <div className="text-left">
                <div className="leading-tight">{isFloorMode ? t('floorModeActive', 'Floor Mode Active') : t('switchToFloorMode', 'Shop Floor Mode')}</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      )}

      {/* User Status Card */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-blue-400 shrink-0">
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
    </>
  );

  return (
    <>
      {/* 1. Desktop Persistent Sidebar: Hidden on Mobile */}
      <aside className="hidden md:flex md:w-64 bg-slate-950 text-slate-300 flex-col flex-shrink-0 border-r border-slate-800/80 select-none shadow-xl z-20 h-screen sticky top-0">
        {renderContent(false)}
      </aside>

      {/* 2. Mobile Slide-Over Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={onClose}
          />
          {/* Slide-in Menu Panel */}
          <aside className="relative w-72 max-w-[80vw] bg-slate-950 text-slate-300 flex flex-col h-full shadow-2xl z-10 border-r border-slate-800 animate-in slide-in-from-left duration-200">
            {renderContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
