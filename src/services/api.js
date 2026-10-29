const BASE_URL = '/api';

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson && errorJson.error) {
        errorMessage = errorJson.error;
      }
    } catch {
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch {}
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

function request(url, options = {}) {
  return fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  }).then(handleResponse);
}

export const api = {
  // Authentication (Phone + Password, Cookie + JWT)
  login: (phone, password) => request(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ phone, password })
  }),
  logout: () => request(`${BASE_URL}/auth/logout`, { method: 'POST' }),
  getMe: () => request(`${BASE_URL}/auth/me`),
  getActors: () => request(`${BASE_URL}/auth/actors`),

  // Dashboard
  getDashboard: () => request(`${BASE_URL}/dashboard`),

  // Inventory & Stock
  getInventory: () => request(`${BASE_URL}/inventory`),
  addMaterial: (data) => request(`${BASE_URL}/inventory`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateMaterial: (id, data) => request(`${BASE_URL}/inventory/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  adjustStock: (id, delta, reason) => request(`${BASE_URL}/inventory/${id}/adjust`, {
    method: 'POST',
    body: JSON.stringify({ delta, reason })
  }),
  deleteMaterial: (id) => request(`${BASE_URL}/inventory/${id}`, {
    method: 'DELETE'
  }),

  // Products & Recipes (BOM)
  getProducts: () => request(`${BASE_URL}/products`),
  addProduct: (data) => request(`${BASE_URL}/products`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateProduct: (id, data) => request(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteProduct: (id) => request(`${BASE_URL}/products/${id}`, {
    method: 'DELETE'
  }),

  // Machines
  getMachines: () => request(`${BASE_URL}/machines`),
  updateMachine: (id, data) => request(`${BASE_URL}/machines/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  addMachine: (data) => request(`${BASE_URL}/machines`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Molds & Shot Tracking
  getMolds: () => request(`${BASE_URL}/molds`),
  logMoldShots: (id, shots) => request(`${BASE_URL}/molds/${id}/shots`, {
    method: 'POST',
    body: JSON.stringify({ shots })
  }),
  updateMold: (id, data) => request(`${BASE_URL}/molds/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  addMold: (data) => request(`${BASE_URL}/molds`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Quality Control & Scrap
  getQCLogs: () => request(`${BASE_URL}/qc`),
  logQC: (data) => request(`${BASE_URL}/qc`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Work Orders & Dispatch
  getWorkOrders: () => request(`${BASE_URL}/work-orders`),
  addWorkOrder: (data) => request(`${BASE_URL}/work-orders`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateWorkOrder: (id, data) => request(`${BASE_URL}/work-orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // Maintenance Tickets
  getMaintenanceTickets: () => request(`${BASE_URL}/maintenance`),
  addMaintenanceTicket: (data) => request(`${BASE_URL}/maintenance`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateMaintenanceTicket: (id, data) => request(`${BASE_URL}/maintenance/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // Dynamic Settings
  getSettings: () => request(`${BASE_URL}/settings`),
  updateSettings: (data) => request(`${BASE_URL}/settings`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  resetDefaults: () => request(`${BASE_URL}/settings/reset`, {
    method: 'POST'
  }),

  // Employees Management (No attendance)
  getEmployees: () => request(`${BASE_URL}/employees`),
  addEmployee: (data) => request(`${BASE_URL}/employees`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateEmployee: (id, data) => request(`${BASE_URL}/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteEmployee: (id) => request(`${BASE_URL}/employees/${id}`, {
    method: 'DELETE'
  }),

  // Payroll & Salary Disbursement
  getPayroll: () => request(`${BASE_URL}/payroll`),
  generatePayroll: (month) => request(`${BASE_URL}/payroll/generate`, {
    method: 'POST',
    body: JSON.stringify({ month })
  }),
  updatePayroll: (id, data) => request(`${BASE_URL}/payroll/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
};
