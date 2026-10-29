import React, { useState } from 'react';
import { 
  Settings, 
  DollarSign, 
  Zap, 
  Users, 
  Clock, 
  ShieldAlert, 
  RotateCcw, 
  Save, 
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AdminSettings({ settings = {}, onUpdateSettings, onResetDefaults }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    factoryName: settings.factoryName || 'EthioPlast Manufacturing PLC (Dukem Industrial Park, Oromia, Ethiopia)',
    currency: settings.currency || 'ETB',
    currencyCode: settings.currencyCode || 'ETB',
    electricityRatePerKwh: settings.electricityRatePerKwh?.toString() || '2.45',
    laborRatePerHour: settings.laborRatePerHour?.toString() || '95.00',
    overheadPercentage: settings.overheadPercentage?.toString() || '15.0',
    regrindRecoveryCostPerKg: settings.regrindRecoveryCostPerKg?.toString() || '14.50',
    notificationEmail: settings.notificationEmail || 'operations@ethioplast-factory.et',
    shiftHours: settings.shiftHours?.toString() || '8',
    activeWorkersCount: settings.activeWorkersCount?.toString() || '74'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateSettings({
      ...formData,
      electricityRatePerKwh: parseFloat(formData.electricityRatePerKwh) || 0.16,
      laborRatePerHour: parseFloat(formData.laborRatePerHour) || 7.50,
      overheadPercentage: parseFloat(formData.overheadPercentage) || 15.0,
      regrindRecoveryCostPerKg: parseFloat(formData.regrindRecoveryCostPerKg) || 0.30,
      shiftHours: parseInt(formData.shiftHours) || 8,
      activeWorkersCount: parseInt(formData.activeWorkersCount) || 74
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Admin Master Configuration</h2>
        <p className="text-xs text-slate-500 mt-1">
          Adjust plant overheads, currency symbols, energy tariffs, labor rates, and factory presets
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">Plant parameters saved successfully! All unit cost formulas have been recalculated.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-6">
        
        {/* Section 1: Plant Identity & Currency */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Plant Identity & Regional Currency
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">Company / Plant Name</label>
              <input
                type="text"
                required
                value={formData.factoryName}
                onChange={(e) => setFormData({ ...formData, factoryName: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Currency Symbol</label>
              <input
                type="text"
                required
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                placeholder="$, €, £, PKR, INR, SAR"
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none font-bold"
              />
            </div>

          </div>
        </div>

        {/* Section 2: Shift Configuration */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Plant Shift Schedule Configuration
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Active Shift Label</label>
              <input
                type="text"
                value={formData.activeShiftName || 'Shift A (Morning)'}
                onChange={(e) => setFormData({ ...formData, activeShiftName: e.target.value })}
                placeholder="e.g. Shift A (Morning)"
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-0.5">Custom name for the active plant shift</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Shift Duration (Hours)</label>
              <input
                type="number"
                required
                value={formData.shiftHours}
                onChange={(e) => setFormData({ ...formData, shiftHours: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-0.5">Standard operating shift hours (e.g. 8 or 12)</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Direct Labor Rate per Hour ({formData.currency})
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.laborRatePerHour}
                onChange={(e) => setFormData({ ...formData, laborRatePerHour: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-0.5">Used in dynamic product costing calculations</p>
            </div>
          </div>
        </div>

        {/* Section 3: Energy & Utility Rates */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Energy Tariffs & Production Overheads
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Electricity Tariff per kWh ({formData.currency})
              </label>
              <input
                type="number"
                step="0.001"
                required
                value={formData.electricityRatePerKwh}
                onChange={(e) => setFormData({ ...formData, electricityRatePerKwh: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-0.5">Used to compute machine power cost per molded cycle</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Regrind Granulation Cost / kg ({formData.currency})
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.regrindRecoveryCostPerKg}
                onChange={(e) => setFormData({ ...formData, regrindRecoveryCostPerKg: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-0.5">Crusher power and maintenance handling cost</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">General Factory Overhead (%)</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.overheadPercentage}
                onChange={(e) => setFormData({ ...formData, overheadPercentage: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
              />
            </div>

          </div>
        </div>

        {/* Section 4: Alert Notifications */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Emergency & Reorder Alerts
          </h3>
          <div className="max-w-md">
            <label className="block text-xs font-medium text-slate-700 mb-1">Procurement Alert Email</label>
            <input
              type="email"
              required
              value={formData.notificationEmail}
              onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.value })}
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
            />
            <p className="text-[10px] text-slate-400 mt-0.5">Receives low resin stock warnings and overdue mold service alerts</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Reset entire factory database to realistic starter demo data? Any custom materials will be reset to default.")) {
                onResetDefaults();
              }
            }}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>
    </div>
  );
}
