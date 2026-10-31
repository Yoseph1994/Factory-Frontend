import React from 'react';
import { 
  Boxes, 
  Cpu, 
  ClipboardList, 
  Recycle, 
  ArrowUpRight, 
  Gauge, 
  Thermometer,
  Zap,
  CheckCircle2,
  TrendingUp,
  Activity,
  Layers,
  Clock,
  ArrowRight
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
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {t('dashboard.title', 'Plant Operations Dashboard')}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {t('dashboard.subtitle', 'Production metrics, machinery performance, raw material silos, and financials.')}
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto text-xs text-slate-600 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="font-semibold text-slate-800">{settings?.activeShiftName || 'Shift A (06:00 - 14:00)'}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-medium">Fleet 4/4 Active</span>
        </div>
      </div>

      {/* 4 Clean Minimal KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Stock Valuation */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>{t('dashboard.totalPolymerStock', 'Total Polymer Stock')}</span>
            <Boxes className="w-4 h-4 text-slate-400" />
          </div>
          
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {(kpis.totalPolymerStockKg || kpis.totalSiloStockKg || 0).toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500">{t('common.kg', 'kg')}</span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Valuation:</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {formatCurrency(kpis.totalStockValuation || 0)}
            </span>
          </div>
        </div>

        {/* Card 2: Fleet Utilization */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>{t('dashboard.fleetUtilization', 'Fleet Utilization')}</span>
            <Cpu className="w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {kpis.activeMachinesRatio || '4/4'}
            </span>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              Online
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Injection Presses:</span>
            <span className="font-semibold text-slate-800">4 Active In Shift</span>
          </div>
        </div>

        {/* Card 3: Regrind Recovery (Circular Economy) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>{t('dashboard.regrindRecovery', 'Circular Scrap Recovery')}</span>
            <Recycle className="w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {kpis.regrindRecoveryRatePercent || 88.5}%
            </span>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              Recycled
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Shift Regrind:</span>
            <span className="font-semibold text-slate-800 tabular-nums">{kpis.totalScrapShiftKg || 320} kg</span>
          </div>
        </div>

        {/* Card 4: Active Work Orders */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>{t('dashboard.activeWorkOrders', 'Active Production Orders')}</span>
            <ClipboardList className="w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                {kpis.activeWorkOrders || 5}
              </span>
              <span className="text-xs text-slate-400">batches</span>
            </div>
            <button 
              onClick={() => onNavigateTab('orders')}
              className="text-xs text-slate-900 hover:underline font-semibold inline-flex items-center"
            >
              <span>View</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Plant Capacity:</span>
            <span className="font-semibold text-slate-800">3 Shifts Operating</span>
          </div>
        </div>

      </div>

      {/* Machinery Fleet Live Telemetry Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 mb-6 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>SHOP-FLOOR TELEMETRY</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {t('dashboard.machineFleetStatus', 'Machinery Fleet Live Status')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Real-time clamping tonnage, barrel heating zones, and active press operators.</p>
          </div>
          <button 
            onClick={() => onNavigateTab('maintenance')}
            className="text-xs text-slate-700 hover:text-slate-900 font-bold px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors self-start sm:self-auto shadow-xs"
          >
            {t('nav.maintenance', 'Manage Press Fleet')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(machines || []).map((mch) => {
            const isRunning = mch.status === 'Running';
            return (
              <div 
                key={mch.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:shadow-card transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{mch.name}</h3>
                    <span className="text-[11px] font-mono font-bold text-slate-400">{mch.code}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                    isRunning 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {isRunning ? t('common.optimal', 'Running') : t('maintenance.idle', 'Idle')}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">{t('dashboard.clampingTons', 'Clamping')}:</span>
                    <span className="font-bold text-slate-900 tabular-nums">{mch.clampingTons} {t('common.tons', 'Tons')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Power Rating:</span>
                    <span className="font-bold text-slate-900 tabular-nums">{mch.powerKw} kW</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">{t('dashboard.barrelTemp', 'Barrel Temp')}:</span>
                    <span className="font-bold text-slate-900 flex items-center tabular-nums">
                      <Thermometer className="w-3.5 h-3.5 mr-1 text-rose-500" />
                      {mch.temperatureBarrelC}°C
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">{t('dashboard.oilPressure', 'Hydraulic Pressure')}:</span>
                    <span className="font-bold text-slate-900 flex items-center tabular-nums">
                      <Gauge className="w-3.5 h-3.5 mr-1 text-blue-500" />
                      {mch.oilPressureBar} bar
                    </span>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Assigned Tech:</span>
                    <span className="font-bold text-slate-800 truncate max-w-[120px]">{mch.currentOperator}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Queue & Fulfillment Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 mb-5 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <ClipboardList className="w-3.5 h-3.5 text-blue-600" />
              <span>ACTIVE SCHEDULE</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {t('dashboard.recentWorkOrders', 'Current Production & Dispatch Queue')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Order fulfillment status, molding cavity progress, and assigned presses.</p>
          </div>
          <button 
            onClick={() => onNavigateTab('orders')}
            className="text-xs text-slate-700 hover:text-slate-900 font-bold px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors self-start sm:self-auto shadow-xs"
          >
            {t('nav.orders', 'View All Work Orders')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Order Batch</th>
                <th className="py-3 px-4">{t('dashboard.customer', 'Customer')}</th>
                <th className="py-3 px-4">Polymer Product</th>
                <th className="py-3 px-4">Target Date</th>
                <th className="py-3 px-4">{t('dashboard.progress', 'Fulfillment Progress')}</th>
                <th className="py-3 px-4">Assigned Press</th>
                <th className="py-3 px-4">{t('common.status', 'Dispatch Status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(recentWorkOrders || []).map((order) => {
                const percent = Math.min(100, Math.round((order.completedQuantity / order.targetQuantity) * 100));
                return (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{order.orderNumber}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{order.clientName}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{order.productName}</td>
                    <td className="py-3.5 px-4 text-slate-500 tabular-nums font-mono">{order.targetDate}</td>
                    <td className="py-3.5 px-4">
                      <div className="w-40">
                        <div className="flex items-center justify-between text-xs mb-1.5 tabular-nums">
                          <span className="font-extrabold text-slate-900">{order.completedQuantity.toLocaleString()}</span>
                          <span className="text-slate-400 font-medium">/ {order.targetQuantity.toLocaleString()} ({percent}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                      <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-xs">
                        {order.assignedMachine}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        order.status === 'Ready for Dispatch'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
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
