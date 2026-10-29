import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  CreditCard, 
  Building, 
  Phone, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Printer, 
  X,
  UserCheck,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DEPARTMENTS = [
  'All',
  'Production',
  'Maintenance',
  'Quality Assurance',
  'Operations',
  'Recycling & Regrind',
  'Warehouse & Logistics'
];

export default function EmployeePayrollModule({ 
  employees = [], 
  payrolls = [], 
  settings, 
  onAddEmployee, 
  onUpdateEmployee, 
  onDeleteEmployee, 
  onGeneratePayroll, 
  onUpdatePayroll 
}) {
  const { t, formatCurrency } = useLanguage();
  const currency = settings?.currency || 'ETB';
  const [activeSubTab, setActiveSubTab] = useState('directory'); // 'directory' | 'payroll'
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isEmpModalOpen, setIsEmpModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [activePaySlip, setActivePaySlip] = useState(null);

  // Form State for Employee Add / Edit
  const [empForm, setEmpForm] = useState({
    name: '',
    empCode: '',
    role: 'Injection Machine Operator',
    department: 'Production',
    shift: 'Shift A (Morning)',
    monthlySalary: '18500',
    phone: '+251 91 123 4567',
    joinedDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    paymentMethod: 'Bank Transfer (CBE)',
    accountNumber: ''
  });

  const openAddModal = () => {
    setEditingEmp(null);
    setEmpForm({
      name: '',
      empCode: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      role: 'Injection Machine Operator',
      department: 'Production',
      shift: 'Shift A (Morning)',
      monthlySalary: '1150',
      phone: '+1 555-0100',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      paymentMethod: 'Bank Transfer',
      accountNumber: 'PK82HABB00129000'
    });
    setIsEmpModalOpen(true);
  };

  const openEditModal = (emp) => {
    setEditingEmp(emp);
    setEmpForm({
      name: emp.name,
      empCode: emp.empCode,
      role: emp.role,
      department: emp.department,
      shift: emp.shift,
      monthlySalary: emp.monthlySalary.toString(),
      phone: emp.phone,
      joinedDate: emp.joinedDate,
      status: emp.status,
      paymentMethod: emp.paymentMethod,
      accountNumber: emp.accountNumber || ''
    });
    setIsEmpModalOpen(true);
  };

  const handleEmpSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...empForm,
      monthlySalary: parseFloat(empForm.monthlySalary) || 0
    };

    if (editingEmp) {
      onUpdateEmployee(editingEmp.id, payload);
    } else {
      onAddEmployee(payload);
    }
    setIsEmpModalOpen(false);
  };

  // Filter employees
  const filteredEmployees = (employees || []).filter(emp => {
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Payroll calculations
  const totalMonthlyPayroll = (payrolls || []).reduce((acc, p) => acc + (p.netSalary || 0), 0);
  const paidCount = (payrolls || []).filter(p => p.paymentStatus === 'Paid').length;
  const pendingCount = (payrolls || []).filter(p => p.paymentStatus === 'Pending').length;

  return (
    <div className="space-y-6">
      
      {/* Module Title & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Staff & Payroll Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Worker roster, monthly compensation, wage disbursements, and payment slips (no attendance pressure)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {activeSubTab === 'directory' ? (
            <button
              onClick={openAddModal}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Employee</span>
            </button>
          ) : (
            <button
              onClick={() => {
                const month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
                if (window.confirm(`Generate payroll slips for ${month} for all active employees?`)) {
                  onGeneratePayroll(month);
                }
              }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Monthly Payroll Run</span>
            </button>
          )}
        </div>
      </div>

      {/* Subtab Navigation Bar */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('directory')}
            className={`pb-3 border-b-2 transition-colors ${
              activeSubTab === 'directory'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Staff Directory ({employees.length})
          </button>
          <button
            onClick={() => setActiveSubTab('payroll')}
            className={`pb-3 border-b-2 transition-colors ${
              activeSubTab === 'payroll'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Monthly Payroll & Slips ({payrolls.length})
          </button>
        </nav>
      </div>

      {/* SUBTAB 1: STAFF DIRECTORY */}
      {activeSubTab === 'directory' && (
        <div className="space-y-4">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Total Plant Headcount
              </span>
              <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                {employees.length} <span className="text-sm font-medium text-slate-500">workers</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Across factory operations & toolroom
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Active Staff
              </span>
              <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
                {employees.filter(e => e.status === 'Active').length} active
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Regular factory team
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Monthly Wage Base
              </span>
              <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                {currency}{Math.round(employees.reduce((acc, e) => acc + (e.monthlySalary || 0), 0)).toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Base monthly salary commitments
              </span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by worker name, code, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white"
                />
              </div>

              <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-md overflow-x-auto">
                {DEPARTMENTS.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedDept === dept
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Employees Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 min-w-[200px]">Employee & Code</th>
                    <th className="py-3 px-4 min-w-[140px]">Role / Position</th>
                    <th className="py-3 px-4 min-w-[140px]">Department</th>
                    <th className="py-3 px-4 min-w-[130px]">Assigned Shift</th>
                    <th className="py-3 px-4 min-w-[120px]">Monthly Salary</th>
                    <th className="py-3 px-4 min-w-[120px]">Disbursement</th>
                    <th className="py-3 px-4 min-w-[100px]">Status</th>
                    <th className="py-3 px-4 min-w-[120px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEmployees.map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                      
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 text-sm leading-tight">{emp.name}</div>
                        <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] mt-0.5 whitespace-nowrap tabular-nums">
                          <span className="font-mono font-medium text-slate-600">{emp.empCode}</span>
                          <span>•</span>
                          <span>{emp.phone}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-800">
                        {emp.role}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200 text-[11px]">
                          {emp.department}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {emp.shift}
                      </td>

                      <td className="py-3 px-4 font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                        {currency}{emp.monthlySalary.toLocaleString()}
                        <span className="font-normal text-slate-400 text-[10px] ml-0.5">/mo</span>
                      </td>

                      <td className="py-3 px-4 text-slate-600 text-[11px] whitespace-nowrap">
                        {emp.paymentMethod}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          emp.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                          <span>{emp.status}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => openEditModal(emp)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors"
                            title="Edit employee"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete record for ${emp.name}?`)) {
                                onDeleteEmployee(emp.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-700 rounded hover:bg-slate-100 transition-colors"
                            title="Delete employee"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* SUBTAB 2: PAYROLL & SALARY DISBURSEMENT */}
      {activeSubTab === 'payroll' && (
        <div className="space-y-4">
          
          {/* Payroll KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Total Monthly Payroll
              </span>
              <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                {currency}{totalMonthlyPayroll.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Net salaries for current cycle
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Disbursement Progress
              </span>
              <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
                {paidCount} Disbursed
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {pendingCount} pending release
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Attendance Policy
              </span>
              <div className="text-base font-bold text-slate-800 mt-1">
                Zero-Pressure Trust Policy
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Standard monthly salary disbursed without penalty
              </span>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 min-w-[180px]">Employee</th>
                    <th className="py-3 px-4 min-w-[110px]">Month</th>
                    <th className="py-3 px-4 min-w-[100px]">Base Pay</th>
                    <th className="py-3 px-4 min-w-[100px]">Allowances</th>
                    <th className="py-3 px-4 min-w-[100px]">Deductions</th>
                    <th className="py-3 px-4 min-w-[110px]">Net Disbursed</th>
                    <th className="py-3 px-4 min-w-[110px]">Method</th>
                    <th className="py-3 px-4 min-w-[100px]">Payment Status</th>
                    <th className="py-3 px-4 min-w-[150px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payrolls.map(pay => {
                    const isPaid = pay.paymentStatus === 'Paid';
                    return (
                      <tr key={pay.id} className="hover:bg-slate-50/70 transition-colors">
                        
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 text-sm leading-tight">{pay.employeeName}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">{pay.empCode} • {pay.role}</div>
                        </td>

                        <td className="py-3 px-4 font-medium text-slate-800 whitespace-nowrap">
                          {pay.month}
                        </td>

                        <td className="py-3 px-4 tabular-nums text-slate-700 whitespace-nowrap">
                          {currency}{pay.baseSalary?.toLocaleString()}
                        </td>

                        <td className="py-3 px-4 tabular-nums text-emerald-700 font-medium whitespace-nowrap">
                          +{currency}{pay.allowances || 0}
                        </td>

                        <td className="py-3 px-4 tabular-nums text-rose-700 font-medium whitespace-nowrap">
                          -{currency}{pay.deductions || 0}
                        </td>

                        <td className="py-3 px-4 tabular-nums font-bold text-slate-900 text-sm whitespace-nowrap">
                          {currency}{pay.netSalary?.toLocaleString()}
                        </td>

                        <td className="py-3 px-4 text-slate-600 text-[11px] whitespace-nowrap">
                          {pay.paymentMethod}
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            isPaid
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                            <span>{pay.paymentStatus}</span>
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-1.5">
                            
                            <button
                              onClick={() => {
                                const nextStatus = isPaid ? 'Pending' : 'Paid';
                                onUpdatePayroll(pay.id, { paymentStatus: nextStatus });
                              }}
                              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors border ${
                                isPaid
                                  ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                                  : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 shadow-xs'
                              }`}
                            >
                              {isPaid ? 'Mark Pending' : 'Mark Paid'}
                            </button>

                            <button
                              onClick={() => setActivePaySlip(pay)}
                              className="inline-flex items-center space-x-1 px-2 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium text-[11px]"
                              title="View pay slip"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-500" />
                              <span>Slip</span>
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

        </div>
      )}

      {/* Add / Edit Employee Modal */}
      {isEmpModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingEmp ? 'Edit Worker Profile' : 'Register New Employee'}
              </h3>
              <button onClick={() => setIsEmpModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEmpSubmit} className="mt-4 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={empForm.name}
                    onChange={(e) => setEmpForm({ ...empForm, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    required
                    value={empForm.empCode}
                    onChange={(e) => setEmpForm({ ...empForm, empCode: e.target.value })}
                    placeholder="EMP-1001"
                    className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    required
                    value={empForm.role}
                    onChange={(e) => setEmpForm({ ...empForm, role: e.target.value })}
                    placeholder="e.g. Injection Machine Operator"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={empForm.department}
                    onChange={(e) => setEmpForm({ ...empForm, department: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                  >
                    <option value="Production">Production</option>
                    <option value="Maintenance">Maintenance & Toolroom</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Operations">Operations Supervision</option>
                    <option value="Recycling & Regrind">Recycling & Regrind</option>
                    <option value="Warehouse & Logistics">Warehouse & Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Shift</label>
                  <select
                    value={empForm.shift}
                    onChange={(e) => setEmpForm({ ...empForm, shift: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                  >
                    <option value="Shift A (Morning)">Shift A (Morning)</option>
                    <option value="Shift B (Evening)">Shift B (Evening)</option>
                    <option value="Shift C (Night)">Shift C (Night)</option>
                    <option value="General Shift">General Shift (Day)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Salary ({currency})
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={empForm.monthlySalary}
                    onChange={(e) => setEmpForm({ ...empForm, monthlySalary: e.target.value })}
                    placeholder="1200"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none font-bold tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={empForm.phone}
                    onChange={(e) => setEmpForm({ ...empForm, phone: e.target.value })}
                    placeholder="+1 555-0100"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Disbursement Method</label>
                  <select
                    value={empForm.paymentMethod}
                    onChange={(e) => setEmpForm({ ...empForm, paymentMethod: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                  >
                    <option value="Commercial Bank of Ethiopia (CBE)">Commercial Bank of Ethiopia (CBE)</option>
                    <option value="Awash Bank">Awash Bank</option>
                    <option value="Oromia Bank">Oromia Bank</option>
                    <option value="Dashen Bank">Dashen Bank</option>
                    <option value="Bank of Abyssinia">Bank of Abyssinia</option>
                    <option value="Telebirr / Mobile Money">Telebirr / Mobile Money</option>
                    <option value="Cash / Payroll Office">Cash / Payroll Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Account / Telebirr Number</label>
                  <input
                    type="text"
                    value={empForm.accountNumber}
                    onChange={(e) => setEmpForm({ ...empForm, accountNumber: e.target.value })}
                    placeholder="e.g. 1000192837465 (CBE Account)"
                    className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-md focus:outline-none"
                  />
                </div>

              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEmpModalOpen(false)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
                >
                  {editingEmp ? 'Save Employee' : 'Confirm Registration'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* View Pay Slip Modal */}
      {activePaySlip && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-slate-800" />
                <h3 className="text-base font-bold text-slate-900">Salary Disbursed Slip</h3>
              </div>
              <button onClick={() => setActivePaySlip(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between font-mono text-[11px] text-slate-500">
                <span>{settings.factoryName || 'Plastix ERP'}</span>
                <span>{activePaySlip.month}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <div className="font-bold text-slate-900 text-sm">{activePaySlip.employeeName}</div>
                <div className="text-slate-500 text-[11px] font-mono mt-0.5">{activePaySlip.empCode} • {activePaySlip.role}</div>
                <div className="text-slate-600 font-medium mt-1">Department: {activePaySlip.department}</div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Base Salary:</span>
                <span className="font-semibold text-slate-900 tabular-nums">{currency}{activePaySlip.baseSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Allowances / Bonus:</span>
                <span className="font-semibold text-emerald-700 tabular-nums">+{currency}{activePaySlip.allowances || 0}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Deductions (Advance):</span>
                <span className="font-semibold text-rose-700 tabular-nums">-{currency}{activePaySlip.deductions || 0}</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-bold bg-slate-100 p-2.5 rounded-md mt-2">
                <span>Net Disbursed Salary:</span>
                <span className="text-slate-900 tabular-nums">{currency}{activePaySlip.netSalary.toLocaleString()}</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1 flex justify-between">
                <span>Payment Method: {activePaySlip.paymentMethod}</span>
                <span className="font-semibold text-emerald-700">{activePaySlip.paymentStatus}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Slip</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePaySlip(null)}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
