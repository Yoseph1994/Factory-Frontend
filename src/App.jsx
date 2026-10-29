import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import AlertBanner from './components/AlertBanner';
import DashboardOverview from './components/DashboardOverview';
import InventoryManager from './components/InventoryManager';
import ProductRecipeBuilder from './components/ProductRecipeBuilder';
import QualityControlModule from './components/QualityControlModule';
import MachineMoldManager from './components/MachineMoldManager';
import SalesDispatchModule from './components/SalesDispatchModule';
import EmployeePayrollModule from './components/EmployeePayrollModule';
import AdminSettings from './components/AdminSettings';
import FloorSupervisorView from './components/FloorSupervisorView';
import AuthScreen from './components/AuthScreen';
import { api } from './services/api';
import { socket } from './services/socket';

const ROLE_DEFAULT_TABS = {
  plant_owner: 'dashboard',
  production_manager: 'dashboard',
  shift_supervisor: 'inventory',
  qc_inspector: 'qc',
  warehouse_officer: 'inventory',
  maintenance_tech: 'maintenance',
  hr_payroll: 'employees'
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isFloorMode, setIsFloorMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(socket.connected);

  // Core Data States
  const [dashboardData, setDashboardData] = useState({
    kpis: {},
    alerts: [],
    recentWorkOrders: [],
    machines: [],
    settings: {}
  });

  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [machines, setMachines] = useState([]);
  const [molds, setMolds] = useState([]);
  const [qcLogs, setQcLogs] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [maintenanceTickets, setMaintenanceTickets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [settings, setSettings] = useState({
    factoryName: "EthioPlast Manufacturing PLC (Dukem, Oromia, Ethiopia)",
    currency: "ETB",
    currencyCode: "ETB",
    electricityRatePerKwh: 2.45,
    laborRatePerHour: 95.00,
    overheadPercentage: 15.0,
    regrindRecoveryCostPerKg: 14.50,
    notificationEmail: "operations@ethioplast-factory.et",
    shiftHours: 8,
    activeWorkersCount: 74
  });

  const refreshAllData = async () => {
    try {
      const [dash, inv, prods, mchs, mlds, qc, orders, maint, emps, pays, cfg] = await Promise.all([
        api.getDashboard().catch(() => null),
        api.getInventory().catch(() => null),
        api.getProducts().catch(() => null),
        api.getMachines().catch(() => null),
        api.getMolds().catch(() => null),
        api.getQCLogs().catch(() => null),
        api.getWorkOrders().catch(() => null),
        api.getMaintenanceTickets().catch(() => null),
        api.getEmployees().catch(() => null),
        api.getPayroll().catch(() => null),
        api.getSettings().catch(() => null)
      ]);

      if (dash) setDashboardData(dash);
      if (inv?.materials) setMaterials(inv.materials);
      if (prods) setProducts(prods);
      if (mchs) setMachines(mchs);
      if (mlds) setMolds(mlds);
      if (qc) setQcLogs(qc);
      if (orders) setWorkOrders(orders);
      if (maint) setMaintenanceTickets(maint);
      if (emps) setEmployees(emps);
      if (pays) setPayrolls(pays);
      if (cfg) setSettings(cfg);
    } catch (err) {
      console.warn("Using offline / fallback state:", err);
    } finally {
      setLoading(false);
    }
  };

  // 1. Initial Authentication Check on Mount (Cookie Session)
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await api.getMe();
        if (res && res.user) {
          handleSetUser(res.user);
        }
      } catch (err) {
        // Not logged in or expired cookie
        setCurrentUser(null);
      } finally {
        setAuthChecked(true);
      }
    }
    checkAuth();
  }, []);

  // 2. Set Active User and adjust landing tab based on role
  const handleSetUser = (user) => {
    setCurrentUser(user);
    if (user?.role === 'shift_supervisor') {
      setIsFloorMode(true);
      setActiveTab('inventory');
    } else {
      setIsFloorMode(false);
      setActiveTab(ROLE_DEFAULT_TABS[user?.role] || 'dashboard');
    }
    refreshAllData();
  };

  // 3. Socket.IO Real-Time Event Handlers
  useEffect(() => {
    function onConnect() {
      setSocketConnected(true);
    }

    function onDisconnect() {
      setSocketConnected(false);
    }

    function onRealTimeSync() {
      refreshAllData();
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Plant event subscriptions
    socket.on('inventory:updated', onRealTimeSync);
    socket.on('inventory:adjusted', onRealTimeSync);
    socket.on('inventory:material_added', onRealTimeSync);
    socket.on('products:updated', onRealTimeSync);
    socket.on('machine:updated', onRealTimeSync);
    socket.on('mold:shots_logged', onRealTimeSync);
    socket.on('mold:updated', onRealTimeSync);
    socket.on('qc:logged', onRealTimeSync);
    socket.on('orders:updated', onRealTimeSync);
    socket.on('maintenance:ticket_created', onRealTimeSync);
    socket.on('maintenance:ticket_updated', onRealTimeSync);
    socket.on('employees:updated', onRealTimeSync);
    socket.on('payroll:updated', onRealTimeSync);
    socket.on('settings:updated', onRealTimeSync);
    socket.on('factory:reset', onRealTimeSync);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('inventory:updated', onRealTimeSync);
      socket.off('inventory:adjusted', onRealTimeSync);
      socket.off('inventory:material_added', onRealTimeSync);
      socket.off('products:updated', onRealTimeSync);
      socket.off('machine:updated', onRealTimeSync);
      socket.off('mold:shots_logged', onRealTimeSync);
      socket.off('mold:updated', onRealTimeSync);
      socket.off('qc:logged', onRealTimeSync);
      socket.off('orders:updated', onRealTimeSync);
      socket.off('maintenance:ticket_created', onRealTimeSync);
      socket.off('maintenance:ticket_updated', onRealTimeSync);
      socket.off('employees:updated', onRealTimeSync);
      socket.off('payroll:updated', onRealTimeSync);
      socket.off('settings:updated', onRealTimeSync);
      socket.off('factory:reset', onRealTimeSync);
    };
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await api.logout();
    } catch {}
    setCurrentUser(null);
  };

  // Switch Actor Handler (One-Click Testing)
  const handleSwitchActor = async (phone) => {
    try {
      const res = await api.login(phone, 'password123');
      if (res && res.user) {
        handleSetUser(res.user);
      }
    } catch (err) {
      console.error('Failed to switch actor:', err);
    }
  };

  // Material Actions
  const handleAddMaterial = async (newMat) => {
    try {
      await api.addMaterial(newMat);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateMaterial = async (id, updatedMat) => {
    try {
      await api.updateMaterial(id, updatedMat);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdjustStock = async (id, delta, reason) => {
    try {
      await api.adjustStock(id, delta, reason);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMaterial = async (id) => {
    try {
      await api.deleteMaterial(id);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Product / Recipe Actions
  const handleAddProduct = async (data) => {
    try {
      await api.addProduct(data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProduct = async (id, data) => {
    try {
      await api.updateProduct(id, data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Machine Actions
  const handleUpdateMachine = async (id, data) => {
    try {
      await api.updateMachine(id, data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMachine = async (data) => {
    try {
      await api.addMachine(data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Mold Actions
  const handleLogMoldShots = async (id, shots) => {
    try {
      await api.logMoldShots(id, shots);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMold = async (data) => {
    try {
      await api.addMold(data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Maintenance Tickets
  const handleCreateTicket = async (data) => {
    try {
      await api.addMaintenanceTicket(data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTicket = async (id, data) => {
    try {
      await api.updateMaintenanceTicket(id, data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // QC Logging
  const handleLogQC = async (data) => {
    try {
      await api.logQC(data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Work Orders
  const handleAddWorkOrder = async (data) => {
    try {
      await api.addWorkOrder(data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateWorkOrder = async (id, data) => {
    try {
      await api.updateWorkOrder(id, data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Employee & Payroll Handlers
  const handleAddEmployee = async (data) => {
    try {
      await api.addEmployee(data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateEmployee = async (id, data) => {
    try {
      await api.updateEmployee(id, data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await api.deleteEmployee(id);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleGeneratePayroll = async (month) => {
    try {
      await api.generatePayroll(month);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePayroll = async (id, data) => {
    try {
      await api.updatePayroll(id, data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Settings
  const handleUpdateSettings = async (data) => {
    try {
      await api.updateSettings(data);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetDefaults = async () => {
    try {
      await api.resetDefaults();
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // If waiting for session check
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400 text-xs font-mono">
        Connecting to Plastix ERP Vault...
      </div>
    );
  }

  // If not authenticated, show World-Class Login Screen
  if (!currentUser) {
    return <AuthScreen onLoginSuccess={handleSetUser} />;
  }

  const alerts = dashboardData.alerts || [];

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans antialiased">
      
      {/* Enterprise Left Sidebar with Role Filter */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alerts={alerts}
        settings={settings}
        isFloorMode={isFloorMode}
        setIsFloorMode={setIsFloorMode}
        currentUser={currentUser}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Sticky Top Header with User Profile, Role Switcher and Socket Indicator */}
        <TopHeader
          activeTab={activeTab}
          alerts={alerts}
          settings={settings}
          onRefresh={refreshAllData}
          onNavigateTab={setActiveTab}
          currentUser={currentUser}
          onLogout={handleLogout}
          onSwitchActor={handleSwitchActor}
          socketConnected={socketConnected}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Sleek, Single Alert Banner if Critical Items Exist */}
            <AlertBanner
              alerts={alerts}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setIsFloorMode(false);
              }}
            />

            {/* View Switch: Floor Terminal vs Admin Modules */}
            {isFloorMode ? (
              <FloorSupervisorView
                settings={settings}
                machines={machines}
                molds={molds}
                workOrders={workOrders}
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setIsFloorMode(false);
                }}
                onAdjustStock={handleAdjustStock}
                onLogMoldShots={handleLogMoldShots}
                onLogQC={handleLogQC}
                onExitFloorMode={() => setIsFloorMode(false)}
              />
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <DashboardOverview
                    data={dashboardData}
                    onNavigateTab={setActiveTab}
                  />
                )}

                {activeTab === 'inventory' && (
                  <InventoryManager
                    materials={materials}
                    settings={settings}
                    onAddMaterial={handleAddMaterial}
                    onUpdateMaterial={handleUpdateMaterial}
                    onAdjustStock={handleAdjustStock}
                    onDeleteMaterial={handleDeleteMaterial}
                  />
                )}

                {activeTab === 'recipes' && (
                  <ProductRecipeBuilder
                    products={products}
                    materials={materials}
                    settings={settings}
                    onAddProduct={handleAddProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                )}

                {activeTab === 'qc' && (
                  <QualityControlModule
                    qcLogs={qcLogs}
                    workOrders={workOrders}
                    machines={machines}
                    onLogQC={handleLogQC}
                  />
                )}

                {activeTab === 'maintenance' && (
                  <MachineMoldManager
                    machines={machines}
                    molds={molds}
                    maintenanceTickets={maintenanceTickets}
                    onUpdateMachine={handleUpdateMachine}
                    onAddMachine={handleAddMachine}
                    onLogMoldShots={handleLogMoldShots}
                    onAddMold={handleAddMold}
                    onCreateTicket={handleCreateTicket}
                    onUpdateTicket={handleUpdateTicket}
                  />
                )}

                {activeTab === 'orders' && (
                  <SalesDispatchModule
                    workOrders={workOrders}
                    products={products}
                    machines={machines}
                    onAddWorkOrder={handleAddWorkOrder}
                    onUpdateWorkOrder={handleUpdateWorkOrder}
                  />
                )}

                {activeTab === 'employees' && (
                  <EmployeePayrollModule
                    employees={employees}
                    payrolls={payrolls}
                    settings={settings}
                    onAddEmployee={handleAddEmployee}
                    onUpdateEmployee={handleUpdateEmployee}
                    onDeleteEmployee={handleDeleteEmployee}
                    onGeneratePayroll={handleGeneratePayroll}
                    onUpdatePayroll={handleUpdatePayroll}
                  />
                )}

                {activeTab === 'settings' && (
                  <AdminSettings
                    settings={settings}
                    onUpdateSettings={handleUpdateSettings}
                    onResetDefaults={handleResetDefaults}
                  />
                )}
              </>
            )}

          </div>
        </main>

      </div>

    </div>
  );
}
