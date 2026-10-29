import React, { useState } from 'react';
import { 
  Activity, 
  Plus, 
  Wrench, 
  Recycle, 
  Package, 
  Gauge, 
  Thermometer, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function FloorSupervisorView({ 
  settings = {}, 
  machines = [], 
  molds = [], 
  workOrders = [], 
  onNavigateTab 
}) {
  const [selectedMachine, setSelectedMachine] = useState(machines?.[0] || null);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Floor Shift Header Card */}
      <div className="bg-slate-900 text-white rounded-lg p-5 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-300">
              Floor Terminal Mode
            </span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
            {settings.factoryName || 'Plastix ERP'}
          </span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">{settings?.activeShiftName || 'Active Shop Floor'}</h2>
            <div className="flex items-center space-x-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Operating Duration: {settings?.shiftHours || 8} Hours</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Large Floor Quick-Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        <button
          onClick={() => onNavigateTab('inventory')}
          className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-slate-400 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 mb-2">
            <Package className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-slate-900 group-hover:text-slate-700">Material Requisition</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Issue resins & colors</div>
        </button>

        <button
          onClick={() => onNavigateTab('maintenance')}
          className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-slate-400 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 mb-2">
            <Activity className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-slate-900 group-hover:text-slate-700">Log Mold Cycles</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Update shot counters</div>
        </button>

        <button
          onClick={() => onNavigateTab('qc')}
          className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-slate-400 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-emerald-700 mb-2">
            <Recycle className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-slate-900 group-hover:text-slate-700">Scrap & QC Log</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Weigh runners & defects</div>
        </button>

        <button
          onClick={() => onNavigateTab('maintenance')}
          className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-slate-400 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-rose-700 mb-2">
            <Wrench className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-slate-900 group-hover:text-slate-700">Report Breakdown</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Page toolroom technician</div>
        </button>

      </div>

      {/* Machine Fleet Floor Cards */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-semibold text-sm text-slate-900">Active Machinery on Floor</h3>
            <p className="text-xs text-slate-500 mt-0.5">Select a machine to review operating parameters</p>
          </div>
          <span className="text-xs font-medium text-slate-600">
            {machines.filter(m => m.status === 'Running').length} of {machines.length} Running
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {machines.map(mch => {
            const isRunning = mch.status === 'Running';
            return (
              <div
                key={mch.id}
                className={`p-4 rounded-lg border transition-all ${
                  isRunning 
                    ? 'bg-slate-50/60 border-slate-200' 
                    : 'bg-amber-50/40 border-amber-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900">{mch.name}</h4>
                    <span className="text-xs font-mono text-slate-500">{mch.code} • {mch.clampingTons}T</span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                    isRunning 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {mch.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="p-2 bg-white rounded border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Barrel Temp</span>
                    <span className="font-bold text-slate-800 flex items-center">
                      <Thermometer className="w-3 h-3 mr-0.5 text-slate-400" />
                      {mch.barrelTempC || mch.temperatureBarrelC || 210}°C
                    </span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Hydraulic</span>
                    <span className="font-bold text-slate-800 flex items-center">
                      <Gauge className="w-3 h-3 mr-0.5 text-slate-400" />
                      {mch.hydraulicPressureBar || mch.oilPressureBar || 140} bar
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                  <span>Operator: <strong className="text-slate-700">{mch.operator || mch.currentOperator || 'Shift Operator'}</strong></span>
                  <span>{mch.hourlyCapacity || 8800} pcs/hr</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Targets Quick List */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
        <h3 className="font-semibold text-sm text-slate-900">Shift Production Targets</h3>
        <div className="space-y-2">
          {workOrders.slice(0, 3).map(wo => {
            const percent = Math.min(100, Math.round((wo.completedQuantity / wo.targetQuantity) * 100));
            return (
              <div key={wo.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-slate-800">{wo.productName}</span>
                    <span className="text-slate-400 font-mono text-[11px] ml-2">[{wo.orderNumber}]</span>
                  </div>
                  <span className="text-slate-500 font-mono font-medium">{wo.machineId || wo.assignedMachine || 'MCH-01'}</span>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-800 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Completed: {wo.completedQuantity.toLocaleString()} / {wo.targetQuantity.toLocaleString()}</span>
                  <span className="font-semibold text-slate-700">{percent}% Fulfilled</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
