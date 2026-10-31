import React, { useState } from 'react';
import { AlertCircle, ArrowRight, X } from 'lucide-react';

export default function AlertBanner({ alerts, onNavigateTab }) {
  const [isDismissed, setIsDismissed] = useState(false);
  
  if (isDismissed || !alerts || alerts.length === 0) return null;

  const criticals = alerts.filter(a => a.severity === 'critical');
  if (criticals.length === 0) return null;

  return (
    <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200/80 text-rose-950 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs shadow-card gap-3">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div>
          <span className="font-extrabold text-rose-950 mr-2 text-xs uppercase tracking-wider">Plant Action Required:</span>
          <span className="text-slate-700 font-medium">
            {criticals.length} operational items require attention ({criticals.map(c => c.title.replace('Low Stock: ', '').replace('Mold Overdue for Service: ', '')).slice(0, 2).join(', ')}{criticals.length > 2 ? ` and ${criticals.length - 2} more` : ''})
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2.5 shrink-0 self-end sm:self-auto">
        <button
          onClick={() => onNavigateTab('inventory')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors shadow-xs"
        >
          <span>Review Silos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-rose-100/50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
