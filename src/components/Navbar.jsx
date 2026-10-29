import React from 'react';
import { 
  Building2, 
  Bell, 
  Users, 
  Activity, 
  Smartphone, 
  LayoutDashboard,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function Navbar({ 
  settings, 
  alertsCount, 
  criticalAlertsCount,
  activeTab, 
  setActiveTab, 
  isFloorMode, 
  setIsFloorMode,
  onRefresh
}) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Factory Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <Building2 className="w-5 h-5 text-slate-100" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-semibold text-slate-900 text-base tracking-tight">
                  {settings.factoryName || 'Plastix ERP'}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
                  Industrial Plant
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{settings.activeWorkersCount || 74} Workers</span>
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Shift A (Active)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Live Alerts Indicator */}
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                criticalAlertsCount > 0 
                  ? 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                  : alertsCount > 0
                  ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
              title="Click to view inventory alerts"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{alertsCount} Active Alerts</span>
              {criticalAlertsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white text-[10px] font-semibold">
                  {criticalAlertsCount} Critical
                </span>
              )}
            </button>

            {/* Refresh Data */}
            <button
              onClick={onRefresh}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
              title="Refresh factory data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* View Mode Toggle: Admin ERP vs Floor Supervisor */}
            <button
              onClick={() => setIsFloorMode(!isFloorMode)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                isFloorMode 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isFloorMode ? (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Switch to Admin Portal</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Shop Floor View</span>
                </>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
