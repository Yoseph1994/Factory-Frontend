import React from 'react';
import { 
  LayoutDashboard, 
  Boxes, 
  Truck, 
  Wrench, 
  Menu
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomNav({ 
  activeTab, 
  setActiveTab, 
  onOpenMenu, 
  isFloorMode, 
  setIsFloorMode,
  alerts
}) {
  const { t } = useLanguage();
  
  const inventoryAlerts = (alerts || []).filter(a => a.targetTab === 'inventory' || a.id?.includes('stock')).length;
  const maintenanceAlerts = (alerts || []).filter(a => a.targetTab === 'maintenance' || a.id?.includes('maint')).length;

  const tabs = [
    { id: 'dashboard', label: t('nav.dashboard', 'Overview'), icon: LayoutDashboard },
    { id: 'inventory', label: t('nav.inventory', 'Silos'), icon: Boxes, badge: inventoryAlerts },
    { id: 'orders', label: t('nav.orders', 'Orders'), icon: Truck },
    { id: 'maintenance', label: t('nav.maintenance', 'Machines'), icon: Wrench, badge: maintenanceAlerts },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = !isFloorMode && activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              setIsFloorMode(false);
              setActiveTab(tab.id);
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-colors relative ${
              isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.badge > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[60px]">{tab.label}</span>
          </button>
        );
      })}

      {/* More / Menu Drawer Trigger */}
      <button
        onClick={onOpenMenu}
        className="flex-1 flex flex-col items-center justify-center py-1 px-1 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] mt-0.5 tracking-tight font-medium">Menu</span>
      </button>
    </nav>
  );
}
