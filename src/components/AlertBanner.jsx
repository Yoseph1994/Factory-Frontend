import React, { useState } from 'react';
import { AlertCircle, ArrowRight, X } from 'lucide-react';

export default function AlertBanner({ alerts, onNavigateTab }) {
  const [isDismissed, setIsDismissed] = useState(false);
  
  if (isDismissed || !alerts || alerts.length === 0) return null;

  const criticals = alerts.filter(a => a.severity === 'critical');
  if (criticals.length === 0) return null;

  return (
    <div className="mb-6 p-3 rounded-lg bg-rose-50/90 border border-rose-200 text-rose-950 flex items-center justify-between text-xs shadow-xs">
      <div className="flex items-center space-x-2.5">
        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
        <div>
          <span className="font-semibold text-rose-900 mr-1.5">Action Required:</span>
          <span className="text-slate-700">
            {criticals.length} items require immediate attention ({criticals.map(c => c.title.replace('Low Stock: ', '').replace('Mold Overdue for Service: ', '')).slice(0, 2).join(', ')}{criticals.length > 2 ? ` and ${criticals.length - 2} more` : ''})
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
        <button
          onClick={() => onNavigateTab('inventory')}
          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
        >
          <span>Review Stock</span>
          <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 text-slate-400 hover:text-slate-600 rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
