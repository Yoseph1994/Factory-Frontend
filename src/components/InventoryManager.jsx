import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  Warehouse, 
  X,
  Layers,
  TrendingDown,
  ArrowUpDown,
  Download
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Virgin Polymer',
  'Masterbatch',
  'Additive',
  'Regrind',
  'Spare Part'
];

export default function InventoryManager({ 
  materials, 
  settings, 
  onAddMaterial, 
  onUpdateMaterial, 
  onAdjustStock, 
  onDeleteMaterial 
}) {
  const currency = settings?.currency || '$';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockStatusFilter, setStockStatusFilter] = useState('all'); // 'all' | 'low' | 'healthy'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [adjustingMaterial, setAdjustingMaterial] = useState(null);
  const [adjustDelta, setAdjustDelta] = useState('');
  const [adjustReason, setAdjustReason] = useState('New Shipment Received');

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'Virgin Polymer',
    unit: 'kg',
    unitCost: '',
    stockQuantity: '',
    minThreshold: '',
    maxCapacity: '',
    supplier: '',
    location: ''
  });

  const openAddModal = () => {
    setEditingMaterial(null);
    setFormData({
      name: '',
      code: `MAT-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'Virgin Polymer',
      unit: 'kg',
      unitCost: '1.45',
      stockQuantity: '2500',
      minThreshold: '1000',
      maxCapacity: '12000',
      supplier: 'SABIC Petrochemicals',
      location: 'Silo Bay A-1'
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (mat) => {
    setEditingMaterial(mat);
    setFormData({
      name: mat.name,
      code: mat.code,
      category: mat.category,
      unit: mat.unit,
      unitCost: mat.unitCost.toString(),
      stockQuantity: mat.stockQuantity.toString(),
      minThreshold: mat.minThreshold.toString(),
      maxCapacity: mat.maxCapacity.toString(),
      supplier: mat.supplier,
      location: mat.location
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      unitCost: parseFloat(formData.unitCost) || 0,
      stockQuantity: parseFloat(formData.stockQuantity) || 0,
      minThreshold: parseFloat(formData.minThreshold) || 0,
      maxCapacity: parseFloat(formData.maxCapacity) || 10000
    };

    if (editingMaterial) {
      onUpdateMaterial(editingMaterial.id, payload);
    } else {
      onAddMaterial(payload);
    }
    setIsAddModalOpen(false);
  };

  const handleAdjustSubmit = (e) => {
    e.preventDefault();
    if (!adjustingMaterial) return;
    const delta = parseFloat(adjustDelta);
    if (!isNaN(delta)) {
      onAdjustStock(adjustingMaterial.id, delta);
    }
    setAdjustingMaterial(null);
    setAdjustDelta('');
  };

  // Filter materials
  const filteredMaterials = (materials || []).filter(mat => {
    const matchesCat = selectedCategory === 'All' || mat.category === selectedCategory;
    const matchesSearch = 
      mat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mat.supplier && mat.supplier.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesStock = true;
    if (stockStatusFilter === 'low') {
      matchesStock = mat.stockQuantity <= mat.minThreshold;
    } else if (stockStatusFilter === 'healthy') {
      matchesStock = mat.stockQuantity > mat.minThreshold;
    }

    return matchesCat && matchesSearch && matchesStock;
  });

  // Calculate high-level summary metrics
  const totalValuation = (materials || []).reduce((acc, m) => acc + (m.stockQuantity * m.unitCost), 0);
  const totalPolymerKg = (materials || []).filter(m => m.category === 'Virgin Polymer').reduce((acc, m) => acc + m.stockQuantity, 0);
  const lowStockCount = (materials || []).filter(m => m.stockQuantity <= m.minThreshold).length;

  return (
    <div className="space-y-6">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Raw Materials & Silo Inventory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time resin silos, masterbatches, regrind stock, spare parts, and dynamic reorder alerts
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={openAddModal}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Material</span>
          </button>
        </div>
      </div>

      {/* 3 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Inventory Valuation
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {currency}{Math.round(totalValuation).toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Across {materials.length} master catalog items
          </span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Virgin Polymer Reserves
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {totalPolymerKg.toLocaleString()} <span className="text-sm font-medium text-slate-500">kg</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            PP, HDPE, LDPE in silo storage
          </span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Stock Threshold Status
          </span>
          <div className="text-2xl font-bold mt-1 tabular-nums flex items-center space-x-2">
            <span className={lowStockCount > 0 ? 'text-rose-600' : 'text-emerald-700'}>
              {lowStockCount} below minimum
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            {materials.length - lowStockCount} items at healthy levels
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search material, code, or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white"
            />
          </div>

          {/* Category Tabs & Status Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
            
            {/* Category Selector */}
            <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-md">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Health Filter */}
            <select
              value={stockStatusFilter}
              onChange={(e) => setStockStatusFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">All Levels</option>
              <option value="low">Low Stock Alerts Only</option>
              <option value="healthy">Healthy Stock Only</option>
            </select>

          </div>

        </div>
      </div>

      {/* Main Stock Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 min-w-[240px]">Material & Code</th>
                <th className="py-3 px-4 min-w-[130px]">Category</th>
                <th className="py-3 px-4 min-w-[130px]">Unit Price</th>
                <th className="py-3 px-4 min-w-[130px]">Current Stock</th>
                <th className="py-3 px-4 min-w-[180px]">Threshold & Capacity</th>
                <th className="py-3 px-4 min-w-[140px]">Location</th>
                <th className="py-3 px-4 min-w-[110px]">Status</th>
                <th className="py-3 px-4 min-w-[140px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMaterials.map((mat) => {
                const isUnderThreshold = mat.stockQuantity <= mat.minThreshold;
                const isCritical = mat.stockQuantity <= (mat.minThreshold * 0.5);
                const percentCapacity = Math.min(100, Math.round((mat.stockQuantity / mat.maxCapacity) * 100));

                return (
                  <tr key={mat.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Name & Code */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 text-sm leading-tight">{mat.name}</div>
                      <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] mt-0.5 whitespace-nowrap">
                        <span className="font-mono font-medium text-slate-600">{mat.code}</span>
                        <span>•</span>
                        <span>{mat.supplier}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200 text-[11px]">
                        {mat.category}
                      </span>
                    </td>

                    {/* Unit Price & Total Value */}
                    <td className="py-3 px-4 whitespace-nowrap tabular-nums">
                      <div className="font-semibold text-slate-900">
                        {currency}{mat.unitCost.toFixed(2)} <span className="font-normal text-slate-400 text-[11px]">/{mat.unit}</span>
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Value: {currency}{Math.round(mat.stockQuantity * mat.unitCost).toLocaleString()}
                      </div>
                    </td>

                    {/* Current Stock */}
                    <td className="py-3 px-4 whitespace-nowrap tabular-nums">
                      <div className="text-sm font-bold text-slate-900">
                        {mat.stockQuantity.toLocaleString()} <span className="text-xs font-normal text-slate-500">{mat.unit}</span>
                      </div>
                    </td>

                    {/* Threshold vs Capacity Visual Bar */}
                    <td className="py-3 px-4">
                      <div className="w-40">
                        <div className="flex items-center justify-between text-[11px] mb-1 tabular-nums text-slate-500">
                          <span>Min: {mat.minThreshold.toLocaleString()}</span>
                          <span>{percentCapacity}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              isCritical ? 'bg-rose-600' : isUnderThreshold ? 'bg-amber-500' : 'bg-slate-800'
                            }`}
                            style={{ width: `${percentCapacity}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Storage Location */}
                    <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                      <div className="flex items-center space-x-1.5">
                        <Warehouse className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{mat.location}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {isCritical ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                          <span>Critical</span>
                        </span>
                      ) : isUnderThreshold ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          <span>Low Stock</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>Healthy</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1.5">
                        
                        <button
                          onClick={() => {
                            setAdjustingMaterial(mat);
                            setAdjustDelta('');
                          }}
                          className="px-2.5 py-1 rounded border border-slate-200 text-slate-800 hover:bg-slate-100 font-semibold text-[11px] transition-colors"
                          title="Restock or requisition material"
                        >
                          Stock In/Out
                        </button>

                        <button
                          onClick={() => openEditModal(mat)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors"
                          title="Edit material details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${mat.name}? This will remove it from the material master.`)) {
                              onDeleteMaterial(mat.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-700 rounded hover:bg-slate-100 transition-colors"
                          title="Delete material"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Material Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingMaterial ? 'Edit Material Specifications' : 'Add New Material Master'}
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Material Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. PP Homopolymer Injection Grade (H030SG)"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Item Code / SKU</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="MAT-PP-01"
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none bg-white"
                  >
                    <option value="Virgin Polymer">Virgin Polymer</option>
                    <option value="Masterbatch">Masterbatch</option>
                    <option value="Additive">Additive</option>
                    <option value="Regrind">Regrind</option>
                    <option value="Spare Part">Spare Part</option>
                    <option value="Packaging">Packaging</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Unit of Measure</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none bg-white"
                  >
                    <option value="kg">kg (Kilograms)</option>
                    <option value="ton">ton (Metric Tons)</option>
                    <option value="bag (25kg)">bag (25kg)</option>
                    <option value="liters">liters</option>
                    <option value="pcs">pcs (Pieces)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Unit Price ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.unitCost}
                    onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
                    placeholder="1.45"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Stock Quantity</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    placeholder="3000"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Safety Alert Threshold</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.minThreshold}
                    onChange={(e) => setFormData({ ...formData, minThreshold: e.target.value })}
                    placeholder="1000"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Triggers low stock alert when inventory dips below this</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Max Storage Capacity</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                    placeholder="10000"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Supplier / Producer</label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    placeholder="e.g. SABIC Petrochemicals"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Warehouse / Silo Bay Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Silo Bay A-1 / Chemical Store C-2"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                >
                  {editingMaterial ? 'Save Changes' : 'Create Material'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Quick Stock Adjustment Modal */}
      {adjustingMaterial && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Stock In / Out Requisition</h3>
                <p className="text-xs text-slate-500 mt-0.5">{adjustingMaterial.name}</p>
              </div>
              <button 
                onClick={() => setAdjustingMaterial(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="mt-4 space-y-4">
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Current Physical Stock:</span>
                  <span className="font-bold text-slate-900 tabular-nums">{adjustingMaterial.stockQuantity} {adjustingMaterial.unit}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Safety Threshold:</span>
                  <span className="text-slate-700 tabular-nums">{adjustingMaterial.minThreshold} {adjustingMaterial.unit}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quantity Adjustment (positive to add stock, negative to issue out)
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="+500 or -200"
                  value={adjustDelta}
                  onChange={(e) => setAdjustDelta(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none font-bold tabular-nums"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Enter e.g. 1000 for received shipment, or -150 for shop floor requisition
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Transaction Reason</label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:outline-none bg-white"
                >
                  <option value="New Shipment Received">New Shipment Received</option>
                  <option value="Shop Floor Requisition">Shop Floor Production Requisition</option>
                  <option value="Physical Audit Count">Physical Audit Count Adjustment</option>
                  <option value="Scrap Regrind Return">Scrap Regrind Recovery</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAdjustingMaterial(null)}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
