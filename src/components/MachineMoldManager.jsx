import React, { useState } from 'react';
import { 
  Wrench, 
  Cpu, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Thermometer, 
  Gauge, 
  X,
  Play,
  Pause,
  AlertCircle
} from 'lucide-react';

export default function MachineMoldManager({ 
  machines = [], 
  molds = [], 
  maintenanceTickets = [], 
  onUpdateMachine, 
  onAddMachine, 
  onLogMoldShots, 
  onAddMold, 
  onCreateTicket, 
  onUpdateTicket 
}) {
  const [activeTab, setActiveTab] = useState('molds'); // 'molds' | 'machines' | 'tickets'
  
  // Modals
  const [isShotModalOpen, setIsShotModalOpen] = useState(false);
  const [selectedMold, setSelectedMold] = useState(null);
  const [shotCountToAdd, setShotCountToAdd] = useState('2500');

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    title: '',
    targetItem: machines?.[0]?.name || 'Factory Machine',
    category: 'Machine Breakdown',
    priority: 'High',
    technician: 'Maintenance Tech',
    details: ''
  });

  const [isAddMoldModalOpen, setIsAddMoldModalOpen] = useState(false);
  const [moldForm, setMoldForm] = useState({
    name: '',
    code: `MLD-${Math.floor(1000 + Math.random() * 9000)}`,
    cavities: '8',
    currentShots: '0',
    maintenanceIntervalShots: '50000',
    lifeShotsLimit: '1000000'
  });

  const [isAddMachineModalOpen, setIsAddMachineModalOpen] = useState(false);
  const [machineForm, setMachineForm] = useState({
    name: '',
    code: `MCH-${Math.floor(100 + Math.random() * 900)}`,
    type: 'Injection Molding',
    clampingTons: '200',
    powerKw: '28',
    currentOperator: 'Shift Operator'
  });

  const handleShotSubmit = (e) => {
    e.preventDefault();
    if (!selectedMold) return;
    onLogMoldShots(selectedMold.id, parseInt(shotCountToAdd) || 0);
    setIsShotModalOpen(false);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    onCreateTicket({
      ...ticketForm,
      shotsAtEvent: 0,
      downtimeMinutes: 0
    });
    setIsTicketModalOpen(false);
  };

  const handleMoldSubmit = (e) => {
    e.preventDefault();
    onAddMold({
      ...moldForm,
      cavities: parseInt(moldForm.cavities) || 1,
      currentShots: parseInt(moldForm.currentShots) || 0,
      maintenanceIntervalShots: parseInt(moldForm.maintenanceIntervalShots) || 50000,
      lifeShotsLimit: parseInt(moldForm.lifeShotsLimit) || 1000000
    });
    setIsAddMoldModalOpen(false);
  };

  const handleMachineSubmit = (e) => {
    e.preventDefault();
    onAddMachine({
      ...machineForm,
      clampingTons: parseInt(machineForm.clampingTons) || 150,
      powerKw: parseFloat(machineForm.powerKw) || 20
    });
    setIsAddMachineModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Machine & Mold Preventive Maintenance</h2>
          <p className="text-xs text-slate-500 mt-1">
            Mold cycle shot counts, service interval thresholds, machine parameters, and repair tickets
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'molds' && (
            <button
              onClick={() => setIsAddMoldModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Mold Tool</span>
            </button>
          )}

          {activeTab === 'machines' && (
            <button
              onClick={() => setIsAddMachineModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Machine</span>
            </button>
          )}

          {activeTab === 'tickets' && (
            <button
              onClick={() => setIsTicketModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Breakdown Ticket</span>
            </button>
          )}
        </div>
      </div>

      {/* Subtabs Bar */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('molds')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'molds' 
                ? 'border-slate-900 text-slate-900' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Molds & Dies ({molds.length})
          </button>
          <button
            onClick={() => setActiveTab('machines')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'machines' 
                ? 'border-slate-900 text-slate-900' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Machine Fleet ({machines.length})
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'tickets' 
                ? 'border-slate-900 text-slate-900' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Maintenance Tickets ({maintenanceTickets.length})
          </button>
        </nav>
      </div>

      {/* TAB 1: Molds & Shot Tracking */}
      {activeTab === 'molds' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {molds.map(mold => {
              const currentShots = parseInt(mold.currentShots) || 0;
              const interval = parseInt(mold.maintenanceIntervalShots || mold.serviceIntervalShots) || 100000;
              const ratio = currentShots / interval;
              const percent = Math.min(100, Math.round(ratio * 100));
              const isOverdue = ratio >= 1.0;
              const isApproaching = ratio >= 0.9 && !isOverdue;
              const lifeShots = mold.lifeShotsLimit ? parseInt(mold.lifeShotsLimit) : (interval * 10);
              let lastServicedStr = 'Operational in Toolroom';
              if (mold.lastServicedDate || mold.lastServiced) {
                const rawDate = mold.lastServicedDate || mold.lastServiced;
                try {
                  const d = new Date(rawDate);
                  lastServicedStr = isNaN(d.getTime()) ? rawDate : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                } catch {
                  lastServicedStr = rawDate;
                }
              }

              return (
                <div key={mold.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{mold.name}</h4>
                      <span className="text-xs font-mono text-slate-500">{mold.code}</span>
                    </div>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                      isOverdue 
                        ? 'bg-rose-50 text-rose-800 border-rose-200' 
                        : isApproaching 
                        ? 'bg-amber-50 text-amber-800 border-amber-200' 
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {mold.status}
                    </span>
                  </div>

                  {/* Shot Count Progress */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5 tabular-nums">
                      <span className="text-slate-800 font-bold">
                        {currentShots.toLocaleString()} <span className="font-normal text-slate-500">shots</span>
                      </span>
                      <span className="text-slate-500">
                        Limit: {interval.toLocaleString()} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          isOverdue ? 'bg-rose-600' : isApproaching ? 'bg-amber-500' : 'bg-slate-900'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span>Cavity Count:</span>
                      <span className="font-semibold text-slate-800 tabular-nums">{mold.cavities || 1} cavities</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Life Expectancy:</span>
                      <span className="text-slate-700 tabular-nums">{lifeShots.toLocaleString()} shots</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Serviced:</span>
                      <span className="text-slate-700">{lastServicedStr}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedMold(mold);
                        setIsShotModalOpen(true);
                      }}
                      className="w-full py-1.5 px-3 rounded text-xs font-medium bg-slate-50 text-slate-800 border border-slate-200 hover:bg-slate-100 transition-colors text-center"
                    >
                      + Log Shift Shots
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Machines Fleet */}
      {activeTab === 'machines' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Machine & Code</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Clamping Tonnage</th>
                  <th className="py-3 px-4">Power Rating</th>
                  <th className="py-3 px-4">Assigned Operator</th>
                  <th className="py-3 px-4">Barrel Temp</th>
                  <th className="py-3 px-4">Operating Status</th>
                  <th className="py-3 px-4 text-right">Quick Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {machines.map(mch => (
                  <tr key={mch.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{mch.name}</div>
                      <span className="font-mono text-slate-400 text-[11px]">{mch.code}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{mch.type}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{mch.clampingTons} Tons</td>
                    <td className="py-3 px-4 text-slate-600">{mch.powerKw} kW</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{mch.currentOperator}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{mch.temperatureBarrelC}°C</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                        mch.status === 'Running' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {mch.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          const nextStatus = mch.status === 'Running' ? 'Idle' : 'Running';
                          onUpdateMachine(mch.id, { status: nextStatus });
                        }}
                        className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        {mch.status === 'Running' ? 'Set Idle' : 'Set Running'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Maintenance Tickets */}
      {activeTab === 'tickets' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Ticket Description</th>
                  <th className="py-3 px-4">Equipment Target</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Technician</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {maintenanceTickets.map(tkt => (
                  <tr key={tkt.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{tkt.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{tkt.details}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{tkt.targetItem}</td>
                    <td className="py-3 px-4 text-slate-600">{tkt.category}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                        tkt.priority === 'Critical'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {tkt.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{tkt.technician}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                        tkt.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {tkt.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {tkt.status !== 'Resolved' ? (
                        <button
                          onClick={() => onUpdateTicket(tkt.id, { status: 'Resolved' })}
                          className="px-2.5 py-1 rounded bg-slate-900 text-white font-medium hover:bg-slate-800"
                        >
                          Mark Resolved
                        </button>
                      ) : (
                        <span className="text-slate-400">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Log Shots Modal */}
      {isShotModalOpen && selectedMold && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Log Mold Cycles</h3>
              <button onClick={() => setIsShotModalOpen(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleShotSubmit} className="mt-4 space-y-4">
              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 text-xs">
                <div className="font-semibold text-slate-800">{selectedMold.name}</div>
                <div className="text-slate-500 mt-1">Current shots: {(parseInt(selectedMold.currentShots) || 0).toLocaleString()}</div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Additional Shots (Cycles Completed in Shift)
                </label>
                <input
                  type="number"
                  required
                  value={shotCountToAdd}
                  onChange={(e) => setShotCountToAdd(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none font-bold"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsShotModalOpen(false)}
                  className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded text-xs font-medium bg-slate-900 text-white hover:bg-slate-800"
                >
                  Confirm Shots
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">New Breakdown / Maintenance Ticket</h3>
              <button onClick={() => setIsTicketModalOpen(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleTicketSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Issue Title</label>
                <input
                  type="text"
                  required
                  value={ticketForm.title}
                  onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
                  placeholder="e.g. Injection Barrel Heater Band Failed"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Equipment Target</label>
                <input
                  type="text"
                  required
                  value={ticketForm.targetItem}
                  onChange={(e) => setTicketForm({ ...ticketForm, targetItem: e.target.value })}
                  placeholder="e.g. ENGEL-180 Injection Machine"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                  >
                    <option value="Machine Breakdown">Machine Breakdown</option>
                    <option value="Mold Service">Mold Service</option>
                    <option value="Hydraulic System">Hydraulic System</option>
                    <option value="Electrical / Sensor">Electrical / Sensor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Priority</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                  >
                    <option value="Critical">Critical (Halts Production)</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Assigned Technician</label>
                <input
                  type="text"
                  required
                  value={ticketForm.technician}
                  onChange={(e) => setTicketForm({ ...ticketForm, technician: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Details</label>
                <textarea
                  rows={2}
                  value={ticketForm.details}
                  onChange={(e) => setTicketForm({ ...ticketForm, details: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTicketModalOpen(false)}
                  className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded text-xs font-medium bg-slate-900 text-white hover:bg-slate-800"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Mold Modal */}
      {isAddMoldModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Register New Mold / Die</h3>
              <button onClick={() => setIsAddMoldModalOpen(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleMoldSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Mold Name</label>
                <input
                  type="text"
                  required
                  value={moldForm.name}
                  onChange={(e) => setMoldForm({ ...moldForm, name: e.target.value })}
                  placeholder="e.g. 28mm 16-Cavity Cap Mold"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Code</label>
                  <input
                    type="text"
                    required
                    value={moldForm.code}
                    onChange={(e) => setMoldForm({ ...moldForm, code: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Cavities</label>
                  <input
                    type="number"
                    required
                    value={moldForm.cavities}
                    onChange={(e) => setMoldForm({ ...moldForm, cavities: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Service Maintenance Interval (Shots)
                </label>
                <input
                  type="number"
                  required
                  value={moldForm.maintenanceIntervalShots}
                  onChange={(e) => setMoldForm({ ...moldForm, maintenanceIntervalShots: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-0.5">Triggers toolroom alert before pin wear occurs</p>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddMoldModalOpen(false)}
                  className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded text-xs font-medium bg-slate-900 text-white hover:bg-slate-800"
                >
                  Register Mold
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
