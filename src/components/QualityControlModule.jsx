import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Recycle, 
  AlertOctagon, 
  CheckCircle, 
  XCircle, 
  Scale, 
  Filter, 
  FileText,
  X
} from 'lucide-react';

const DEFECT_TYPES = [
  'Flash / Burrs',
  'Short Shot (Incomplete filling)',
  'Sink Marks',
  'Warpage / Distortion',
  'Color Streaking (Pigment dispersion)',
  'Burn Marks (Trapped air / overheating)',
  'Weld / Knit Line Weakness',
  'Wall Thickness Variation'
];

export default function QualityControlModule({ 
  qcLogs, 
  workOrders, 
  machines, 
  onLogQC 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterShift, setFilterShift] = useState('All');

  // New QC Log form
  const [formData, setFormData] = useState({
    workOrderId: workOrders[0]?.id || '',
    productName: workOrders[0]?.productName || '28mm Cap',
    machineCode: machines[0]?.code || 'ENGEL-180',
    shift: 'Shift A (Morning)',
    inspectedQty: '500',
    defectiveQty: '12',
    defectType: 'Flash / Burrs',
    scrapWeightKg: '1.20',
    regrindRecoverableKg: '1.10',
    inspector: 'QC Duty Officer',
    status: 'Approved',
    notes: 'Parting line flash verified. Operator notified to adjust clamp.'
  });

  const handleOrderChange = (e) => {
    const selectedWo = workOrders.find(w => w.id === e.target.value);
    setFormData({
      ...formData,
      workOrderId: e.target.value,
      productName: selectedWo ? selectedWo.productName : formData.productName,
      machineCode: selectedWo?.assignedMachine || formData.machineCode
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogQC({
      ...formData,
      inspectedQty: parseInt(formData.inspectedQty) || 0,
      defectiveQty: parseInt(formData.defectiveQty) || 0,
      scrapWeightKg: parseFloat(formData.scrapWeightKg) || 0,
      regrindRecoverableKg: parseFloat(formData.regrindRecoverableKg) || 0
    });
    setIsModalOpen(false);
  };

  // Metrics
  const filteredLogs = (qcLogs || []).filter(log => {
    if (filterShift === 'All') return true;
    return log.shift.includes(filterShift);
  });

  const totalInspected = filteredLogs.reduce((acc, l) => acc + (l.inspectedQty || 0), 0);
  const totalDefects = filteredLogs.reduce((acc, l) => acc + (l.defectiveQty || 0), 0);
  const totalScrapKg = filteredLogs.reduce((acc, l) => acc + (l.scrapWeightKg || 0), 0);
  const totalRecoveredKg = filteredLogs.reduce((acc, l) => acc + (l.regrindRecoverableKg || 0), 0);
  const overallDefectRate = totalInspected > 0 ? ((totalDefects / totalInspected) * 100).toFixed(2) : '0.00';
  const recoveryEfficiency = totalScrapKg > 0 ? Math.round((totalRecoveredKg / totalScrapKg) * 100) : 100;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Quality Assurance & Scrap Recycling Loop</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track defect taxonomy, batch clearance certificates, runner scrap weights, and in-house regrind recovery
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Log Shift QC Inspection</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Defect Rate</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{overallDefectRate}%</div>
          <span className="text-[11px] text-slate-500 mt-0.5 block tabular-nums">
            {totalDefects} defects / {totalInspected.toLocaleString()} inspected
          </span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Shift Scrap Generated</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{totalScrapKg.toFixed(1)} kg</div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Purging, runners, and rejects</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Regrind Recovered</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">{totalRecoveredKg.toFixed(1)} kg</div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Crushed & recycled to silos</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Recovery Efficiency</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{recoveryEfficiency}%</div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Virgin polymer cost saved</span>
        </div>

      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-700">Filter Shift:</span>
          {['All', 'Morning', 'Evening', 'Night'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterShift(s)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                filterShift === s
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* QC Logs Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Timestamp & Shift</th>
                <th className="py-3 px-4">Product & Order</th>
                <th className="py-3 px-4">Machine</th>
                <th className="py-3 px-4">Inspected / Defective</th>
                <th className="py-3 px-4">Defect Classification</th>
                <th className="py-3 px-4">Scrap vs Regrind</th>
                <th className="py-3 px-4">Inspector</th>
                <th className="py-3 px-4">Clearance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => {
                const defectPct = log.inspectedQty > 0 ? ((log.defectiveQty / log.inspectedQty) * 100).toFixed(1) : 0;
                return (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-[11px] text-slate-500">{log.shift}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{log.productName}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{log.workOrderId}</div>
                    </td>

                    <td className="py-3 px-4 font-mono font-medium text-slate-700">
                      {log.machineCode}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">
                        {log.defectiveQty} <span className="font-normal text-slate-400">/ {log.inspectedQty}</span>
                      </div>
                      <div className={`text-[11px] font-medium ${parseFloat(defectPct) > 3 ? 'text-rose-600' : 'text-slate-500'}`}>
                        {defectPct}% defect rate
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium border border-slate-200 text-[11px]">
                        {log.defectType}
                      </span>
                      {log.notes && (
                        <div className="text-[11px] text-slate-500 mt-1 max-w-xs truncate" title={log.notes}>
                          {log.notes}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-medium">
                        Scrap: {log.scrapWeightKg} kg
                      </div>
                      <div className="text-emerald-700 font-semibold text-[11px] flex items-center">
                        <Recycle className="w-3 h-3 mr-0.5" />
                        Recovered: {log.regrindRecoverableKg} kg
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {log.inspector}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                        log.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : log.status === 'Quarantined'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {log.status}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* QC Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-900">Log Shift Quality Inspection</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Work Order</label>
                  <select
                    value={formData.workOrderId}
                    onChange={handleOrderChange}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                  >
                    {workOrders.map(wo => (
                      <option key={wo.id} value={wo.id}>
                        {wo.orderNumber} - {wo.productName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Machine</label>
                  <select
                    value={formData.machineCode}
                    onChange={(e) => setFormData({ ...formData, machineCode: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none font-mono"
                  >
                    {machines.map(m => (
                      <option key={m.id} value={m.code}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Shift</label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                  >
                    <option value="Shift A (Morning)">Shift A (Morning 07:00-15:00)</option>
                    <option value="Shift B (Evening)">Shift B (Evening 15:00-23:00)</option>
                    <option value="Shift C (Night)">Shift C (Night 23:00-07:00)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Defect Category</label>
                  <select
                    value={formData.defectType}
                    onChange={(e) => setFormData({ ...formData, defectType: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                  >
                    {DEFECT_TYPES.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Inspected Quantity (Pieces)</label>
                  <input
                    type="number"
                    required
                    value={formData.inspectedQty}
                    onChange={(e) => setFormData({ ...formData, inspectedQty: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Defective Quantity (Pieces)</label>
                  <input
                    type="number"
                    required
                    value={formData.defectiveQty}
                    onChange={(e) => setFormData({ ...formData, defectiveQty: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Total Scrap Weight (kg)</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={formData.scrapWeightKg}
                    onChange={(e) => setFormData({ ...formData, scrapWeightKg: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Regrind Recoverable (kg)</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={formData.regrindRecoverableKg}
                    onChange={(e) => setFormData({ ...formData, regrindRecoverableKg: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                  <p className="text-[10px] text-emerald-700 mt-0.5">Automatically credited back into Regrind Stock</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">QC Inspector Name</label>
                  <input
                    type="text"
                    required
                    value={formData.inspector}
                    onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Batch Clearance</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                  >
                    <option value="Approved">Approved (Release to Packing)</option>
                    <option value="Quarantined">Quarantined (Pending Secondary Check)</option>
                    <option value="Rejected">Rejected (Send to Granulator)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Corrective Action / Floor Notes</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Adjusted injection cushion and back pressure on machine"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>

              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
                >
                  Submit Inspection
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
