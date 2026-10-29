import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  FileCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Building, 
  Printer, 
  X,
  ExternalLink
} from 'lucide-react';

export default function SalesDispatchModule({ 
  workOrders, 
  products, 
  machines, 
  onAddWorkOrder, 
  onUpdateWorkOrder 
}) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [dispatchSlipOrder, setDispatchSlipOrder] = useState(null);

  // Form for new order
  const [orderForm, setOrderForm] = useState({
    clientName: '',
    productId: products[0]?.id || '',
    productName: products[0]?.name || 'Plastic Product',
    targetQuantity: '50000',
    targetDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    priority: 'Normal',
    assignedMachine: machines[0]?.code || 'ENGEL-180'
  });

  // Dispatch Challan form
  const [challanForm, setChallanForm] = useState({
    vehicleNumber: 'TRK-9821',
    driverName: 'Muhammad Aslam',
    driverCnic: '35202-8921821-3',
    dispatchedQty: '2500',
    notes: 'Shrink-wrapped pallets with corner protectors'
  });

  const handleProductSelect = (e) => {
    const found = products.find(p => p.id === e.target.value);
    setOrderForm({
      ...orderForm,
      productId: e.target.value,
      productName: found ? found.name : orderForm.productName
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    onAddWorkOrder({
      ...orderForm,
      targetQuantity: parseInt(orderForm.targetQuantity) || 1000
    });
    setIsOrderModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Sales Orders & Dispatch Pipeline</h2>
          <p className="text-xs text-slate-500 mt-1">
            Customer work orders, scheduled target dates, finished goods packing, and dispatch gate passes
          </p>
        </div>

        <button
          onClick={() => setIsOrderModalOpen(true)}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Customer Work Order</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Work Order #</th>
                <th className="py-3 px-4">Client Customer</th>
                <th className="py-3 px-4">Manufactured Item</th>
                <th className="py-3 px-4">Target Date</th>
                <th className="py-3 px-4">Fulfillment Progress</th>
                <th className="py-3 px-4">Machine Assigned</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workOrders.map((wo) => {
                const percent = Math.min(100, Math.round((wo.completedQuantity / wo.targetQuantity) * 100));
                return (
                  <tr key={wo.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                      {wo.orderNumber}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      <div className="flex items-center space-x-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{wo.clientName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {wo.productName}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{wo.targetDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-36">
                        <div className="flex items-center justify-between text-[11px] mb-1 tabular-nums">
                          <span className="font-semibold text-slate-800">{wo.completedQuantity.toLocaleString()}</span>
                          <span className="text-slate-400">/ {wo.targetQuantity.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-slate-900 rounded-full transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {wo.assignedMachine}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                        wo.status === 'Ready for Dispatch'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : wo.status === 'Dispatched'
                          ? 'bg-slate-100 text-slate-600 border-slate-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                        {wo.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {wo.status !== 'Dispatched' && (
                          <button
                            onClick={() => {
                              setDispatchSlipOrder(wo);
                              setChallanForm({
                                ...challanForm,
                                dispatchedQty: (wo.targetQuantity).toString()
                              });
                            }}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-[11px] font-medium bg-slate-50 text-slate-800 border border-slate-200 hover:bg-slate-100"
                          >
                            <Truck className="w-3 h-3 text-slate-500" />
                            <span>Dispatch Slip</span>
                          </button>
                        )}
                        {wo.status === 'Dispatched' && (
                          <span className="text-slate-400 text-[11px]">Fulfilled</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Work Order Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-900">Create Production Work Order</h3>
              <button onClick={() => setIsOrderModalOpen(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Customer / Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Industrial Bottlers"
                  value={orderForm.clientName}
                  onChange={(e) => setOrderForm({ ...orderForm, clientName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Manufactured Product</label>
                <select
                  value={orderForm.productId}
                  onChange={handleProductSelect}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Target Quantity</label>
                  <input
                    type="number"
                    required
                    value={orderForm.targetQuantity}
                    onChange={(e) => setOrderForm({ ...orderForm, targetQuantity: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Delivery Target Date</label>
                  <input
                    type="date"
                    required
                    value={orderForm.targetDate}
                    onChange={(e) => setOrderForm({ ...orderForm, targetDate: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Machine Allocation</label>
                  <select
                    value={orderForm.assignedMachine}
                    onChange={(e) => setOrderForm({ ...orderForm, assignedMachine: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none font-mono"
                  >
                    {machines.map(m => (
                      <option key={m.id} value={m.code}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Order Priority</label>
                  <select
                    value={orderForm.priority}
                    onChange={(e) => setOrderForm({ ...orderForm, priority: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High Priority</option>
                    <option value="Urgent">Urgent / Express</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded text-xs font-medium bg-slate-900 text-white hover:bg-slate-800"
                >
                  Release Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dispatch Gate Pass Modal */}
      {dispatchSlipOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-slate-800" />
                <h3 className="text-base font-semibold text-slate-900">Factory Dispatch & Gate Pass</h3>
              </div>
              <button onClick={() => setDispatchSlipOrder(null)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between font-mono text-[11px] text-slate-500">
                <span>GATE PASS # GP-2026-084</span>
                <span>DATE: {new Date().toISOString().split('T')[0]}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <div className="font-bold text-slate-900 text-sm">{dispatchSlipOrder.clientName}</div>
                <div className="text-slate-600 mt-0.5">Order Reference: {dispatchSlipOrder.orderNumber}</div>
                <div className="text-slate-600 font-medium mt-1">Item: {dispatchSlipOrder.productName}</div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Vehicle Registration #</label>
                  <input
                    type="text"
                    value={challanForm.vehicleNumber}
                    onChange={(e) => setChallanForm({ ...challanForm, vehicleNumber: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Dispatched Quantity</label>
                  <input
                    type="number"
                    value={challanForm.dispatchedQty}
                    onChange={(e) => setChallanForm({ ...challanForm, dispatchedQty: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Authorized Driver Name</label>
                <input
                  type="text"
                  value={challanForm.driverName}
                  onChange={(e) => setChallanForm({ ...challanForm, driverName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Dispatch Packaging Notes</label>
                <input
                  type="text"
                  value={challanForm.notes}
                  onChange={(e) => setChallanForm({ ...challanForm, notes: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-medium border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Gate Pass</span>
              </button>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setDispatchSlipOrder(null)}
                  className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateWorkOrder(dispatchSlipOrder.id, { 
                      status: 'Dispatched',
                      completedQuantity: parseInt(challanForm.dispatchedQty) || dispatchSlipOrder.completedQuantity
                    });
                    setDispatchSlipOrder(null);
                  }}
                  className="px-4 py-1.5 rounded text-xs font-medium bg-slate-900 text-white hover:bg-slate-800"
                >
                  Authorize Gate Exit
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
