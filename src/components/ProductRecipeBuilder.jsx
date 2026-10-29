import React, { useState } from 'react';
import { 
  FlaskConical, 
  Plus, 
  Trash2, 
  Edit, 
  Layers, 
  DollarSign, 
  Percent, 
  Zap, 
  Clock, 
  Scale, 
  CheckCircle2,
  X,
  AlertCircle
} from 'lucide-react';

export default function ProductRecipeBuilder({ 
  products, 
  materials, 
  settings, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct 
}) {
  const currency = settings?.currency || '$';
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form state for creating / editing product recipe
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Injection Molded',
    partWeightGrams: '24.0',
    runnerWeightGrams: '2.5',
    cycleTimeSeconds: '12.0',
    machineType: 'Injection 180T',
    sellingPrice: '0.45',
    stockQty: '1000',
    recipe: [
      { materialId: materials[0]?.id || '', materialName: materials[0]?.name || '', percentage: 95 },
      { materialId: materials[2]?.id || '', materialName: materials[2]?.name || '', percentage: 5 }
    ]
  });

  const activeProduct = products.find(p => p.id === selectedProductId) || products[0];

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: `PRD-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'Injection Molded',
      partWeightGrams: '30.0',
      runnerWeightGrams: '3.0',
      cycleTimeSeconds: '15.0',
      machineType: 'Injection 180T',
      sellingPrice: '0.60',
      stockQty: '0',
      recipe: [
        { materialId: materials[0]?.id || '', materialName: materials[0]?.name || '', percentage: 95 },
        { materialId: materials[2]?.id || '', materialName: materials[2]?.name || '', percentage: 5 }
      ]
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      sku: prod.sku,
      category: prod.category,
      partWeightGrams: prod.partWeightGrams.toString(),
      runnerWeightGrams: (prod.runnerWeightGrams || 0).toString(),
      cycleTimeSeconds: (prod.cycleTimeSeconds || 10).toString(),
      machineType: prod.machineType || 'Injection 180T',
      sellingPrice: (prod.sellingPrice || 0).toString(),
      stockQty: (prod.stockQty || 0).toString(),
      recipe: prod.recipe?.length > 0 ? prod.recipe.map(r => ({ ...r })) : [
        { materialId: materials[0]?.id || '', materialName: materials[0]?.name || '', percentage: 100 }
      ]
    });
    setIsModalOpen(true);
  };

  const handleAddRecipeIngredient = () => {
    const firstMat = materials[0];
    setFormData({
      ...formData,
      recipe: [
        ...formData.recipe,
        { materialId: firstMat?.id || '', materialName: firstMat?.name || '', percentage: 0 }
      ]
    });
  };

  const handleRemoveRecipeIngredient = (index) => {
    const updated = [...formData.recipe];
    updated.splice(index, 1);
    setFormData({ ...formData, recipe: updated });
  };

  const handleRecipeChange = (index, field, value) => {
    const updated = [...formData.recipe];
    if (field === 'materialId') {
      const found = materials.find(m => m.id === value);
      updated[index].materialId = value;
      updated[index].materialName = found ? found.name : '';
    } else if (field === 'percentage') {
      updated[index].percentage = parseFloat(value) || 0;
    }
    setFormData({ ...formData, recipe: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      partWeightGrams: parseFloat(formData.partWeightGrams) || 0,
      runnerWeightGrams: parseFloat(formData.runnerWeightGrams) || 0,
      cycleTimeSeconds: parseFloat(formData.cycleTimeSeconds) || 10,
      sellingPrice: parseFloat(formData.sellingPrice) || 0,
      stockQty: parseFloat(formData.stockQty) || 0,
      recipe: formData.recipe
    };

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, payload);
    } else {
      onAddProduct(payload);
    }
    setIsModalOpen(false);
  };

  const totalPercentage = (formData.recipe || []).reduce((acc, r) => acc + (parseFloat(r.percentage) || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Product Recipes & Dynamic BOM</h2>
          <p className="text-xs text-slate-500 mt-1">
            Build polymer formulations, masterbatch ratios, regrind limits, and dynamic unit costing
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Product Recipe</span>
        </button>
      </div>

      {/* Main Layout: Product Selection & Detailed Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Product Selector List */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Manufactured Items ({products.length})
            </span>
          </div>

          <div className="space-y-2">
            {products.map(prod => {
              const isSelected = prod.id === (activeProduct?.id);
              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm leading-snug">{prod.name}</h4>
                      <span className={`text-[11px] font-mono block mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {prod.sku}
                      </span>
                    </div>
                    <span className={`text-xs font-bold tabular-nums flex-shrink-0 whitespace-nowrap ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {currency}{prod.sellingPrice?.toFixed(2)}
                    </span>
                  </div>

                  <div className={`mt-2 flex items-center justify-between text-[11px] ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    <span>{prod.partWeightGrams}g / item</span>
                    <span>Cycle: {prod.cycleTimeSeconds}s</span>
                    <span>Stock: {prod.stockQty?.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recipe Formulation & Dynamic Cost Breakdown */}
        <div className="lg:col-span-8 space-y-6">
          {activeProduct ? (
            <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-6">
              
              {/* Product Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-slate-900">{activeProduct.name}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {activeProduct.sku}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Process: {activeProduct.category} | Machine: {activeProduct.machineType}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(activeProduct)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit Formulation</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete product ${activeProduct.name}?`)) {
                        onDeleteProduct(activeProduct.id);
                      }
                    }}
                    className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic Costing Overview Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Raw Material Cost</span>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    {currency}{activeProduct.costBreakdown?.materialCost || 0}
                  </div>
                  <span className="text-[10px] text-slate-400">Based on live polymer prices</span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Energy & Labor</span>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    {currency}{((activeProduct.costBreakdown?.energyCost || 0) + (activeProduct.costBreakdown?.laborCost || 0)).toFixed(4)}
                  </div>
                  <span className="text-[10px] text-slate-400">Per cycle runtime</span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Unit Cost</span>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    {currency}{activeProduct.costBreakdown?.totalUnitCost || 0}
                  </div>
                  <span className="text-[10px] text-slate-400">Full manufactured cost</span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Gross Margin</span>
                  <div className="text-base font-bold text-emerald-700 mt-1">
                    {activeProduct.costBreakdown?.grossMarginPercent || 0}%
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Selling at {currency}{activeProduct.sellingPrice?.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Composition Breakdown (Bill of Materials) */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Plastic Material Composition (BOM)
                </h4>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-4">Raw Material Ingredient</th>
                        <th className="py-2.5 px-4 text-center">Blend %</th>
                        <th className="py-2.5 px-4">Weight / Piece</th>
                        <th className="py-2.5 px-4">Live Polymer Rate</th>
                        <th className="py-2.5 px-4 text-right">Cost Contribution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(activeProduct.recipe || []).map((comp, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-medium text-slate-900">
                            {comp.materialName || 'Material'}
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-slate-800">
                            {comp.percentage}%
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {comp.weightGrams} grams
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {currency}{comp.currentUnitPriceKg?.toFixed(2)} /kg
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-slate-900">
                            {currency}{comp.costContribution}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Visual Ratio Stack Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Blend Visual Distribution</span>
                    <span className="font-medium text-slate-700">
                      Total Shot Weight: {(activeProduct.partWeightGrams + (activeProduct.runnerWeightGrams || 0)).toFixed(1)}g
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden">
                    {(activeProduct.recipe || []).map((comp, idx) => {
                      const colors = ['bg-slate-800', 'bg-blue-600', 'bg-emerald-600', 'bg-amber-600', 'bg-purple-600'];
                      return (
                        <div
                          key={idx}
                          className={`${colors[idx % colors.length]} h-full transition-all`}
                          style={{ width: `${comp.percentage}%` }}
                          title={`${comp.materialName}: ${comp.percentage}%`}
                        />
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Manufacturing Technical Parameters */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Shop-Floor Technical Parameters
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                    <span className="text-slate-400 block text-[11px]">Net Part Weight:</span>
                    <span className="font-semibold text-slate-800 text-sm">{activeProduct.partWeightGrams} g</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                    <span className="text-slate-400 block text-[11px]">Runner Scrap Weight:</span>
                    <span className="font-semibold text-slate-800 text-sm">{activeProduct.runnerWeightGrams} g</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                    <span className="text-slate-400 block text-[11px]">Cycle Time:</span>
                    <span className="font-semibold text-slate-800 text-sm">{activeProduct.cycleTimeSeconds} seconds</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                    <span className="text-slate-400 block text-[11px]">Finished Goods Inventory:</span>
                    <span className="font-semibold text-slate-800 text-sm">{activeProduct.stockQty?.toLocaleString()} pcs</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center text-slate-400">
              No products found. Create one using the button above.
            </div>
          )}
        </div>

      </div>

      {/* Product Recipe Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-900">
                {editingProduct ? 'Edit Recipe Formulation' : 'Create New Product Formulation'}
              </h3>
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
                  <label className="block text-xs font-medium text-slate-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. 500ml Plastic Bottle"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">SKU / Code</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="BOT-500ML-01"
                    className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Manufacturing Process</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-400 focus:outline-none bg-white"
                  >
                    <option value="Injection Molded">Injection Molding</option>
                    <option value="Extrusion Blow Molding">Extrusion Blow Molding</option>
                    <option value="Caps & Closures">Caps & Closures</option>
                    <option value="Industrial Crates">Industrial Crates</option>
                    <option value="Thermoformed Sheet">Thermoformed Sheet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Machine Class</label>
                  <input
                    type="text"
                    value={formData.machineType}
                    onChange={(e) => setFormData({ ...formData, machineType: e.target.value })}
                    placeholder="e.g. Injection 180T"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Net Part Weight (grams)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.partWeightGrams}
                    onChange={(e) => setFormData({ ...formData, partWeightGrams: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Runner / Purging Weight (grams)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.runnerWeightGrams}
                    onChange={(e) => setFormData({ ...formData, runnerWeightGrams: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Cycle Time (seconds)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.cycleTimeSeconds}
                    onChange={(e) => setFormData({ ...formData, cycleTimeSeconds: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Target Selling Price ({currency})</label>
                  <input
                    type="number"
                    step="0.001"
                    required
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-400 focus:outline-none"
                  />
                </div>

              </div>

              {/* Dynamic Recipe Blend Builder */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-medium text-slate-800">Polymer Ingredients & Ratios</span>
                    <p className="text-[10px] text-slate-500">Pick raw materials and allocate percentages (Total must equal 100%)</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddRecipeIngredient}
                    className="text-xs text-slate-700 hover:text-slate-900 font-medium px-2 py-1 rounded border border-slate-200 hover:bg-slate-50"
                  >
                    + Add Ingredient
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.recipe.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <select
                        value={item.materialId}
                        onChange={(e) => handleRecipeChange(idx, 'materialId', e.target.value)}
                        className="flex-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                      >
                        {materials.map(m => (
                          <option key={m.id} value={m.id}>
                            {m.name} ({currency}{m.unitCost}/kg)
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center space-x-1 w-28">
                        <input
                          type="number"
                          step="1"
                          min="0"
                          max="100"
                          value={item.percentage}
                          onChange={(e) => handleRecipeChange(idx, 'percentage', e.target.value)}
                          className="w-20 px-2 py-1.5 text-xs border border-slate-300 rounded-md text-right font-bold"
                        />
                        <span className="text-xs text-slate-500">%</span>
                      </div>

                      {formData.recipe.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRecipeIngredient(idx)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between text-xs px-2 py-1 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-600">Total Blend Percentage:</span>
                  <span className={`font-bold ${totalPercentage === 100 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {totalPercentage}% {totalPercentage !== 100 && '(Must equal 100%)'}
                  </span>
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
                  disabled={totalPercentage !== 100}
                  className="px-4 py-1.5 rounded-md text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 shadow-xs"
                >
                  {editingProduct ? 'Update Recipe' : 'Save Product Recipe'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
