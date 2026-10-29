import React from 'react';
import { 
  Boxes, 
  Cpu, 
  ClipboardList, 
  Recycle, 
  ArrowUpRight, 
  Gauge, 
  Thermometer
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DashboardOverview({ 
  data,
  kpis: propKpis, 
  machines: propMachines, 
  recentWorkOrders: propRecentWorkOrders, 
  settings: propSettings, 
  onNavigateTab 
}) {
  const { t, formatCurrency } = useLanguage();
  const kpis = propKpis || data?.kpis || {};
  const machines = propMachines || data?.machines || [];
  const recentWorkOrders = propRecentWorkOrders || data?.recentWorkOrders || [];
  const settings = propSettings || data?.settings || {};

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{t('dashboard.title', 'Plant Operations Dashboard')}</h1>
          <p className="text-xs text-slate-500 mt-1">
            {t('dashboard.subtitle', 'Real-time production, machinery health, raw material silos, and financials')}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>{settings?.activeShiftName || t('productionActive', 'Production Active')}</span>
          </span>
        </div>
      </div>

      {/* 4 Crisp KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Stock Valuation */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
            <span>{t('dashboard.totalPolymerStock', 'Total Polymer Stock')}</span>
            <Boxes className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 tabular-nums">
            {(kpis.totalPolymerStockKg || kpis.totalSiloStockKg || 0).toLocaleString()} <span className="text-sm font-medium text-slate-500">{t('common.kg', 'kg')}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
            <span>Valuation:</span>
            <span className="font-semibold text-slate-800 tabular-nums">
              {formatCurrency(kpis.totalStockValuation || 0)}
            </span>
          </div>
        </div>

        {/* Machine Fleet */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
            <span>{t('dashboard.fleetUtilization', 'Fleet Utilization')}</span>
            <Cpu className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 tabular-nums">
            {kpis.activeMachinesRatio || '0/0'} <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 ml-1">{t('common.optimal', 'Online')}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
            <span>{t('dashboard.runningMachines', 'Running Presses')}:</span>
            <span className="font-semibold text-slate-800">{kpis.activeMachinesRatio?.split('/')?.[0] || '4'} {t('common.optimal', 'Active')}</span>
          </div>
        </div>

        {/* Regrind Scrap Recovery */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
            <span>{t('dashboard.regrindRecovery', 'Regrind Circular Recovery')}</span>
            <Recycle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 tabular-nums">
            {kpis.regrindRecoveryRatePercent || 0}%
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
            <span>Circular Scrap:</span>
            <span className="font-semibold text-slate-800 tabular-nums">{kpis.totalScrapShiftKg || 0} {t('common.kg', 'kg')}</span>
          </div>
        </div>

        {/* Active Work Orders */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
            <span>{t('dashboard.activeWorkOrders', 'Active Work Orders')}</span>
            <ClipboardList className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {kpis.activeWorkOrders || 0} <span className="text-xs font-normal text-slate-400">orders</span>
            </span>
            <button 
              onClick={() => onNavigateTab('orders')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
            >
              <span>{t('header.openTab', 'View')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Dukem Plant: 3 Shifts / Day
          </div>
        </div>

      </div>

      {/* Floor Machine Fleet Status */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">{t('dashboard.machineFleetStatus', 'Machinery Fleet Live Status')}</h2>
            <p className="text-xs text-slate-500 mt-0.5">Clamping force, barrel heating zones, and current operator</p>
          </div>
          <button 
            onClick={() => onNavigateTab('maintenance')}
            className="text-xs text-slate-700 hover:text-slate-900 font-semibold px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            {t('nav.maintenance', 'Manage Fleet')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(machines || []).map((mch) => {
            const isRunning = mch.status === 'Running';
            return (
              <div 
                key={mch.id}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{mch.name}</h3>
                    <span className="text-[11px] font-mono text-slate-500">{mch.code}</span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                    isRunning 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {isRunning ? t('common.optimal', 'Running') : t('maintenance.idle', 'Idle')}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t('dashboard.clampingTons', 'Clamping')}:</span>
                    <span className="font-semibold text-slate-800 tabular-nums">{mch.clampingTons} {t('common.tons', 'Tons')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Power:</span>
                    <span className="font-semibold text-slate-800 tabular-nums">{mch.powerKw} kW</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t('dashboard.barrelTemp', 'Barrel Temp')}:</span>
                    <span className="font-semibold text-slate-800 flex items-center tabular-nums">
                      <Thermometer className="w-3.5 h-3.5 mr-0.5 text-slate-400" />
                      {mch.temperatureBarrelC}°C
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t('dashboard.oilPressure', 'Hydraulic Pressure')}:</span>
                    <span className="font-semibold text-slate-800 flex items-center tabular-nums">
                      <Gauge className="w-3.5 h-3.5 mr-0.5 text-slate-400" />
                      {mch.oilPressureBar} bar
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Operator:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[120px]">{mch.currentOperator}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Queue */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">{t('dashboard.recentWorkOrders', 'Current Production Queue')}</h2>
            <p className="text-xs text-slate-500 mt-0.5">Order fulfillment and scheduled delivery targets</p>
          </div>
          <button 
            onClick={() => onNavigateTab('orders')}
            className="text-xs text-slate-700 hover:text-slate-900 font-semibold px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            {t('nav.orders', 'All Orders')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Order Number</th>
                <th className="py-2.5 px-3">{t('dashboard.customer', 'Customer')}</th>
                <th className="py-2.5 px-3">Product</th>
                <th className="py-2.5 px-3">Target Date</th>
                <th className="py-2.5 px-3">{t('dashboard.progress', 'Progress')}</th>
                <th className="py-2.5 px-3">Machine Assigned</th>
                <th className="py-2.5 px-3">{t('common.status', 'Status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(recentWorkOrders || []).map((order) => {
                const percent = Math.min(100, Math.round((order.completedQuantity / order.targetQuantity) * 100));
                return (
                  <tr key={order.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-semibold text-slate-800">{order.orderNumber}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">{order.clientName}</td>
                    <td className="py-3 px-3 text-slate-700">{order.productName}</td>
                    <td className="py-3 px-3 text-slate-500 tabular-nums">{order.targetDate}</td>
                    <td className="py-3 px-3">
                      <div className="w-36">
                        <div className="flex items-center justify-between text-[11px] mb-1 tabular-nums">
                          <span className="font-bold text-slate-800">{order.completedQuantity.toLocaleString()}</span>
                          <span className="text-slate-400">/ {order.targetQuantity.toLocaleString()} ({percent}%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-slate-900 rounded-full" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">{order.assignedMachine}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        order.status === 'Ready for Dispatch'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
