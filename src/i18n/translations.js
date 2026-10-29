export const translations = {
  en: {
    // App & Identity
    factoryName: "EthioPlast Manufacturing PLC",
    factoryLocation: "Dukem Industrial Park, Oromia, Ethiopia",
    factorySub: "ETHIOPIAN INDUSTRIAL POLYMERS",
    currency: "ETB",
    currencySymbol: "Br",
    productionActive: "Production Active",
    liveSocketSync: "Live Socket Sync",
    connecting: "Connecting...",
    activeRole: "Active Role",
    authorizedModules: "Authorized Modules",
    touchInterface: "Touch Interface",
    floorModeActive: "Floor Mode Active",
    switchToFloorMode: "Switch to Floor Mode",
    exitFloorMode: "Exit Floor Mode",
    language: "Language",
    
    // Roles
    roles: {
      plant_owner: "Plant Owner",
      production_manager: "Production Manager",
      shift_supervisor: "Shift Supervisor",
      qc_inspector: "QC Inspector",
      warehouse_officer: "Warehouse Officer",
      maintenance_tech: "Maintenance Tech",
      hr_payroll: "HR & Payroll"
    },

    // Navigation Tabs
    nav: {
      dashboard: "Dashboard",
      inventory: "Inventory & Silos",
      recipes: "Product Recipes (BOM)",
      qc: "Quality & Regrind",
      maintenance: "Machinery & Tooling",
      orders: "Orders & Gate Pass",
      employees: "Staff & Payroll",
      settings: "Plant Settings"
    },

    // Top Header & Actions
    header: {
      operations: "Operations",
      workspace: "Workspace",
      refresh: "Refresh Data",
      activeAlerts: "Active Plant Alerts",
      noAlerts: "All inventory levels and tooling within limits",
      openTab: "Open",
      switchRole: "Switch Active Actor Role",
      signOut: "Sign Out",
      dept: "Dept"
    },

    // Auth Screen
    auth: {
      systemSignIn: "System Sign In",
      subtitle: "Enterprise access control for shop-floor & executive management",
      phoneLabel: "Phone Number (Ethiopian format +251 9...)",
      phonePlaceholder: "+251911010101",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      signInButton: "Sign In to Workspace",
      signingIn: "Verifying credentials...",
      quickSwitchTitle: "One-Click Actor Switcher (Demo & Role Testing)",
      clickToSwitch: "Click any profile to test Ethiopian RBAC permissions instantly:",
      trustNotice: "Secured with encrypted httpOnly cookie & 256-bit JWT authentication.",
      errorMissing: "Please provide both phone number and password."
    },

    // Dashboard Overview
    dashboard: {
      title: "Plant Operations Dashboard",
      subtitle: "Real-time production, machinery fleet health, raw material silos, and financials",
      totalPolymerStock: "Total Polymer Stock",
      fleetUtilization: "Fleet Utilization",
      regrindRecovery: "Regrind Circular Recovery",
      monthlyPayroll: "Monthly Payroll",
      activeWorkOrders: "Active Work Orders",
      runningMachines: "Running Presses",
      criticalAlerts: "Critical Plant Alerts",
      quickActions: "Quick Actions",
      recentWorkOrders: "Recent Production Orders",
      machineFleetStatus: "Machinery Fleet Live Status",
      customer: "Customer",
      targetQty: "Target Qty",
      completedQty: "Completed Qty",
      progress: "Progress",
      clampingTons: "Clamping",
      barrelTemp: "Barrel Temp",
      oilPressure: "Hydraulic Pressure"
    },

    // Inventory & Silos
    inventory: {
      title: "Raw Material & Silo Inventory",
      subtitle: "Virgin polymers, masterbatch pigments, additives, and regrind recycling loops",
      addMaterial: "Add Raw Material",
      adjustStock: "Adjust Stock Level",
      materialCode: "Material & Code",
      category: "Category",
      currentStock: "Current Stock",
      minThreshold: "Min Safe Limit",
      maxCapacity: "Silo Capacity",
      unitCost: "Unit Cost (ETB/kg)",
      totalValue: "Total Value (ETB)",
      supplier: "Supplier / Importer",
      location: "Storage Location",
      regrindNotice: "Circular Regrind Flakes recovered from production scrap save import foreign currency.",
      virginPolymer: "Virgin Polymer",
      regrindCategory: "Regrind Flakes",
      masterbatchCategory: "Masterbatch / Pigment",
      additiveCategory: "Additive / Filler"
    },

    // Recipes & BOM
    recipes: {
      title: "Product Recipes & BOM Formulations",
      subtitle: "Virgin polymer ratios, regrind allowance, cycle times, and Ethiopian Birr costing",
      addProduct: "Create Product Recipe",
      productName: "Product & SKU",
      shotWeight: "Part Weight (g)",
      runnerWeight: "Runner Weight (g)",
      cycleTime: "Cycle Time (s)",
      sellingPrice: "Selling Price (ETB)",
      materialCost: "Material Cost (ETB)",
      grossMargin: "Gross Margin",
      bomBreakdown: "BOM Material Breakdown"
    },

    // Quality Control & Regrind
    qc: {
      title: "Quality Assurance & Scrap Regrind Loop",
      subtitle: "Shift defect logging with closed-loop automatic credit of clean scrap into regrind inventory",
      logDefect: "Log Inspection & Scrap",
      totalInspected: "Total Inspected (Parts)",
      defectRate: "Overall Defect Rate",
      scrapRecovered: "Clean Scrap Credited to Regrind",
      recentLogs: "Recent Shift Quality Inspections",
      defectReason: "Defect Reason",
      shortShot: "Short Shot (Incomplete filling)",
      flash: "Flash / Burr (Excess parting line)",
      warpage: "Warpage / Shrinkage",
      colorStreak: "Color Streak / Contamination",
      burntMarks: "Burnt Marks / Black Specks"
    },

    // Machinery & Maintenance
    maintenance: {
      title: "Machine & Mold Preventive Maintenance",
      subtitle: "Mold cycle shot counts, service interval thresholds, machine parameters, and repair tickets",
      addMold: "Add Mold Tool",
      registerMachine: "Register Machine",
      newTicket: "New Breakdown Ticket",
      moldsTab: "Molds & Dies",
      machinesTab: "Machine Fleet",
      ticketsTab: "Maintenance Tickets",
      logShots: "+ Log Shift Shots",
      shots: "shots",
      limit: "Limit",
      cavities: "Cavities",
      lifeExpectancy: "Life Expectancy",
      lastServiced: "Last Serviced",
      running: "Running",
      idle: "Idle",
      breakdown: "Under Maintenance",
      setIdle: "Set Idle",
      setRunning: "Set Running",
      markResolved: "Mark Resolved",
      completed: "Completed"
    },

    // Work Orders & Gate Pass
    orders: {
      title: "Work Orders & Gate Pass Dispatch",
      subtitle: "Production work orders, finished goods batch dispatch, and security gate passes",
      createOrder: "New Work Order",
      orderNumber: "Order Number",
      customer: "Customer",
      product: "Product",
      quantity: "Ordered Units",
      produced: "Produced",
      status: "Status",
      dispatch: "Dispatch Batch",
      gatePassTitle: "Factory Security Gate Pass",
      authorizedBy: "Authorized Officer",
      truckPlate: "Truck / Vehicle Plate",
      destination: "Delivery Destination",
      printGatePass: "Print Gate Pass"
    },

    // Employees & Payroll (Zero-Pressure)
    payroll: {
      title: "Worker Directory & Salary Disbursement",
      subtitle: "Strict Zero-Pressure Trust Policy - Guaranteed monthly salary without biometric punch-in surveillance",
      addWorker: "Register Worker",
      disbursePayroll: "Disburse Monthly Payroll",
      employeeName: "Worker Name",
      empCode: "Staff ID",
      department: "Department",
      role: "Assigned Role",
      monthlySalary: "Monthly Salary (ETB)",
      paymentMethod: "Disbursement Channel",
      accountNumber: "Bank Account (CBE / Awash)",
      payrollMonth: "Payroll Month",
      trustNotice: "Ethiopian Labor Standard: All 74 workers receive guaranteed monthly compensation on time without punitive attendance deductions.",
      generateSlips: "Generate Monthly Slips",
      markDisbursed: "Mark as Disbursed",
      disbursed: "Disbursed via CBE"
    },

    // Plant Settings
    settingsView: {
      title: "Plant Master Configuration",
      subtitle: "Factory location in Ethiopia, electricity tariff (ETB), labor baseline, and overheads",
      factoryLocationLabel: "Factory Location",
      factoryLocationValue: "Dukem Industrial Park, Oromia, Ethiopia",
      electricityTariff: "EEP Electricity Tariff (ETB / kWh)",
      laborRate: "Hourly Labor Cost (ETB / hr)",
      regrindRecoveryCost: "Regrind In-House Processing Cost (ETB / kg)",
      overheadPercentage: "Factory Overhead Rate (%)",
      activeWorkers: "Active Workforce Count",
      shiftLength: "Shift Length (Hours)",
      saveSettings: "Save Master Settings",
      resetPristine: "Reset to Ethiopian Default Data"
    },

    // Common Words
    common: {
      save: "Save Changes",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      close: "Close",
      status: "Status",
      priority: "Priority",
      critical: "Critical",
      high: "High",
      medium: "Medium",
      low: "Low",
      optimal: "Optimal",
      serviceApproaching: "Service Approaching",
      maintenanceDue: "Maintenance Due",
      kg: "kg",
      tons: "Tons",
      hrs: "hrs"
    }
  },

  om: {
    // Afaan Oromoo (Oromo)
    factoryName: "EthioPlast Manufacturing PLC",
    factoryLocation: "Paarkii Indaastirii Dukam, Oromiyaa, Itoophiyaa",
    factorySub: "WARSHAA PILAASTIKII OROMIYAA",
    currency: "ETB",
    currencySymbol: "Br",
    productionActive: "Oomishni Hojirra Jira",
    liveSocketSync: "Walsimsiisa Saffisaa",
    connecting: "Walqabsiisaa jira...",
    activeRole: "Gahee Hojirra Jiru",
    authorizedModules: "Kutaalee Hayyamaman",
    touchInterface: "Gara Teerminaalaatti",
    floorModeActive: "Teerminaalli Hojirra Jira",
    switchToFloorMode: "Gara Teerminaala Dacheetti",
    exitFloorMode: "Teerminaala Dhiisi",
    language: "Afaan",

    // Roles
    roles: {
      plant_owner: "Abbaa Warshaa",
      production_manager: "Hojii Gaggeessaa Oomishaa",
      shift_supervisor: "To'ataa Gejjaa (Shift)",
      qc_inspector: "Qorataa Qulqullinaa",
      warehouse_officer: "Hoggana Kuusaa",
      maintenance_tech: "Ogeessa Suphaa fi Shagaataa",
      hr_payroll: "Hojjettoota & Kaffaltii Mindaa"
    },

    // Navigation Tabs
    nav: {
      dashboard: "Daashboordii",
      inventory: "Kuusaa Qabeenyaa",
      recipes: "Qajeelfama Oomishaa (BOM)",
      qc: "Qulqullina & Deebisanii Fayyadamuu",
      maintenance: "Maashinoota & Shagaataa",
      orders: "Ajaja Oomishaa & Hayyama Karraa",
      employees: "Hojjettoota & Mindaa",
      settings: "Qindaa'ina Warshaa"
    },

    // Top Header & Actions
    header: {
      operations: "Hojiiwwan",
      workspace: "Bakka Hojii",
      refresh: "Ragaa Haaromsi",
      activeAlerts: "Akeekkachiisa Warshaa",
      noAlerts: "Kuusaa fi maashinoonni hundi haala gaariirra jiru",
      openTab: "Bani",
      switchRole: "Gahee Hojii Jijjiiri",
      signOut: "Bahi (Sign Out)",
      dept: "Kutaa"
    },

    // Auth Screen
    auth: {
      systemSignIn: "Seensa Poortaala Warshaa",
      subtitle: "Sirna to'annoo seensaa dachee oomishaa fi hojii gaggeessitootaa",
      phoneLabel: "Lakkoofsa Bilbilaa (Bifa Itoophiyaa +251 9...)",
      phonePlaceholder: "+251911010101",
      passwordLabel: "Jecha Icchiitii",
      passwordPlaceholder: "Jecha icchiitii keessan galchaa",
      signInButton: "Gara Bakka Hojiitti Seeni",
      signingIn: "Mirkaneessaa jira...",
      quickSwitchTitle: "Filannoo Gahee Saffisaa (Qorannoof)",
      clickToSwitch: "Hayyama RBAC Itoophiyaa qoruuf tuqaa:",
      trustNotice: "Kukii httpOnly fi JWT 256-bit fayyadamuun kan eegamedha.",
      errorMissing: "Mee lakkoofsa bilbilaa fi jecha icchiitii galchaa."
    },

    // Dashboard Overview
    dashboard: {
      title: "Daashboordii Hojii Warshaa",
      subtitle: "Oomisha yeroo qabatamaa, fayyaa maashinootaa, saayiloo qabeenya dheedhii fi faayinaansii",
      totalPolymerStock: "Qabeenya Dheedhii Waliigalaa",
      fleetUtilization: "Hojirra Oolmaa Maashinaa",
      regrindRecovery: "Deebisanii Fayyadamuu (Scrap)",
      monthlyPayroll: "Kaffaltii Mindaa Ji'aa",
      activeWorkOrders: "Ajaja Oomishaa Hojirra Jiru",
      runningMachines: "Maashinoota Hojjechaa Jiran",
      criticalAlerts: "Akeekkachiisa Ariifachiisaa",
      quickActions: "Tarkaanfii Saffisaa",
      recentWorkOrders: "Ajaja Oomishaa Dhiyoo",
      machineFleetStatus: "Haala Maashinoota Dhiyoo",
      customer: "Maamila",
      targetQty: "Hamma Karoorfame",
      completedQty: "Kan Xumurame",
      progress: "Sadarkaa",
      clampingTons: "Dhiibbaa Toonii",
      barrelTemp: "Ho'a Barmeelaa",
      oilPressure: "Dhiibbaa Zayitii (Hydraulic)"
    },

    // Inventory & Silos
    inventory: {
      title: "Kuusaa Meeshaalee Dheedhii fi Saayiloo",
      subtitle: "Poliimeerii qulqulluu, halluu (masterbatch), fi deebisanii fayyadamuu (regrind)",
      addMaterial: "Materiyaala Haaraa Galmeessi",
      adjustStock: "Hamma Qabeenyaa Sirreessi",
      materialCode: "Materiyaala fi Koodii",
      category: "Gosa",
      currentStock: "Qabeenya Ammaa",
      minThreshold: "Daangaa Xiqqaataa",
      maxCapacity: "Dandeettii Saayiloo",
      unitCost: "Gatii Tokkoo (ETB/kg)",
      totalValue: "Gatii Waliigalaa (ETB)",
      supplier: "Dhiyeessaa / Alaa Galchaa",
      location: "Bakka Kuusaa",
      regrindNotice: "Kosiin qulqulluun deebisamee fayyadama irra oolu sharafa biyya alaa qusata.",
      virginPolymer: "Poliimeerii Qulqulluu",
      regrindCategory: "Deebisanii Fayyadamuu",
      masterbatchCategory: "Halluu / Pigmanti",
      additiveCategory: "Dabalata / Guutuu"
    },

    // Recipes & BOM
    recipes: {
      title: "Qajeelfama Oomishaa fi Qophii BOM",
      subtitle: "Hamma poliimeerii, hayyama kosiin itti fayyadamuu, sa'aatii marsaa fi shallaggii Birrii",
      addProduct: "Qajeelfama Oomishaa Uumi",
      productName: "Oomisha fi SKU",
      shotWeight: "Ulfaatina Oomishaa (g)",
      runnerWeight: "Ulfaatina Kosiin (g)",
      cycleTime: "Yeroo Marsaa (s)",
      sellingPrice: "Gatii Gurgurtaa (ETB)",
      materialCost: "Baasii Materiyaalaa (ETB)",
      grossMargin: "Bu'aa Bu'uuraa",
      bomBreakdown: "Baqqaana Qajeelfama BOM"
    },

    // Quality Control & Regrind
    qc: {
      title: "Qulqullina Mirkaneessuu fi Deebisanii Fayyadamuu",
      subtitle: "Hanqina galmeessuu fi kosii qulqulluu battalumatti gara kuusaa regrinditti deebisuu",
      logDefect: "Hanqina Galmeessi",
      totalInspected: "Waliigala Qoratame (Peesii)",
      defectRate: "Reeshoo Hanqinaa",
      scrapRecovered: "Kosii Qulqulluu Deebi'e",
      recentLogs: "Qorannoo Gejjaa Dhiyoo",
      defectReason: "Sababa Hanqinaa",
      shortShot: "Oomisha Hir'uu (Short Shot)",
      flash: "Irra Dhangala'e (Flash)",
      warpage: "Jallina (Warpage)",
      colorStreak: "Makamuu Halluu",
      burntMarks: "Gubachuu / Mallattoo Gurraacha"
    },

    // Machinery & Maintenance
    maintenance: {
      title: "Suphaa Dursaa Maashinaa fi Shagaataa",
      subtitle: "Lakkoofsa marsaa shagaataa, daangaa tajaajilaa, fi tikkeettii suphaa",
      addMold: "Shagaataa Haaraa Dabali",
      registerMachine: "Maashina Haaraa Galmeessi",
      newTicket: "Tikkeettii Cabinsaa Uumi",
      moldsTab: "Shagaataawwan",
      machinesTab: "Koree Maashinootaa",
      ticketsTab: "Tikkeettii Suphaa",
      logShots: "+ Marsaa Galmeessi",
      shots: "marsaa",
      limit: "Daangaa",
      cavities: "Baqqaana (Cavities)",
      lifeExpectancy: "Umrii Karoorfame",
      lastServiced: "Suphaa Dhiyoo",
      running: "Hojjechaa Jira",
      idle: "Dhaabbateera",
      breakdown: "Suphaarra Jira",
      setIdle: "Dhaabi",
      setRunning: "Hojjechiisi",
      markResolved: "Furameera Jedhi",
      completed: "Xumurameera"
    },

    // Work Orders & Gate Pass
    orders: {
      title: "Ajaja Oomishaa fi Hayyama Karraa",
      subtitle: "Ajaja hojii oomishaa, oomisha xumurame fe'uu, fi hayyama karra eegumsaa",
      createOrder: "Ajaja Haaraa Uumi",
      orderNumber: "Lakkoofsa Ajajaa",
      customer: "Maamila",
      product: "Oomisha",
      quantity: "Hamma Ajajame",
      produced: "Kan Oomishame",
      status: "Haala",
      dispatch: "Fe'iisa Ergi",
      gatePassTitle: "Hayyama Karra Baafataa Warshaa",
      authorizedBy: "Hoggana Hayyame",
      truckPlate: "Gabatee Konkolaataa",
      destination: "Bakka Geessamu",
      printGatePass: "Hayyama Karraa Maxxansi"
    },

    // Employees & Payroll (Zero-Pressure)
    payroll: {
      title: "Tarree Hojjettootaa fi Kaffaltii Mindaa",
      subtitle: "Imaammata Amanamummaa - Mindaa guutuu sa'aatii to'annoo malee kaffaluu",
      addWorker: "Hojjetaa Galmeessi",
      disbursePayroll: "Mindaa Ji'aa Kaffali",
      employeeName: "Maqaa Hojjetaa",
      empCode: "Waraqaa Eenyummaa",
      department: "Kutaa Hojii",
      role: "Gahee Hojii",
      monthlySalary: "Mindaa Ji'aa (ETB)",
      paymentMethod: "Mala Kaffaltii",
      accountNumber: "Lakkoofsa Baankii (CBE / Awash)",
      payrollMonth: "Ji'a Kaffaltii",
      trustNotice: "Ulaagaa Hojii Itoophiyaa: Hojjettoonni 74 hundi hir'ina sa'aatii malee mindaa guutuu argatu.",
      generateSlips: "Waraqaa Mindaa Qopheessi",
      markDisbursed: "Kaffalameera Jedhi",
      disbursed: "Baankii Daldalaan Kaffalameera"
    },

    // Plant Settings
    settingsView: {
      title: "Qindaa'ina Ol'aanaa Warshaa",
      subtitle: "Bakka warshaa Itoophiyaa, taarifa korontoo (ETB), gatii hojjettootaa fi baasii dabalataa",
      factoryLocationLabel: "Bakka Warshaa",
      factoryLocationValue: "Paarkii Indaastirii Dukam, Oromiyaa, Itoophiyaa",
      electricityTariff: "Taarifa Korontoo EEP (ETB / kWh)",
      laborRate: "Baasii Hojii Sa'aatii (ETB / hr)",
      regrindRecoveryCost: "Baasii Kosii Deebisanii Fayyadamuu (ETB / kg)",
      overheadPercentage: "Reeshoo Baasii Dabalataa (%)",
      activeWorkers: "Baay'ina Hojjettootaa",
      shiftLength: "Dheerina Gejjaa (Sa'aatii)",
      saveSettings: "Qindaa'ina Olkaayi",
      resetPristine: "Gara Jalqaba Itoophiyaatti Deebisi"
    },

    // Common Words
    common: {
      save: "Jijjiirama Olkaayi",
      cancel: "Dhiisi",
      delete: "Haqi",
      edit: "Gulaali",
      add: "Dabali",
      close: "Cufi",
      status: "Haala",
      priority: "Sadarkaa Ariifachiisummaa",
      critical: "Ariifachiisaa",
      high: "Ol'aanaa",
      medium: "Giddu-galeessa",
      low: "Gadi-aanaa",
      optimal: "Gaarii",
      serviceApproaching: "Suphaan Dhiyaateera",
      maintenanceDue: "Suphaa Barbaada",
      kg: "kg",
      tons: "Toonii",
      hrs: "sa'aatii"
    }
  },

  am: {
    // Amharic (አማርኛ)
    factoryName: "ኢትዮፕላስት ማምረቻ ኃ/የተ/የግ/ማ",
    factoryLocation: "ዱከም የኢንዱስትሪ ፓርክ፣ ኦሮሚያ፣ ኢትዮጵያ",
    factorySub: "የኢትዮጵያ ፕላስቲክ ኢንዱስትሪ ኃ/የተ/የግ/ማ",
    currency: "ETB",
    currencySymbol: "ብር",
    productionActive: "ምርት በመካሄድ ላይ",
    liveSocketSync: "የቀጥታ ግንኙነት ዝግጁ",
    connecting: "በመገናኘት ላይ...",
    activeRole: "የአሁኑ ሚና",
    authorizedModules: "የተፈቀዱ ክፍሎች",
    touchInterface: "የወለል ተርሚናል",
    floorModeActive: "ተርሚናሉ በስራ ላይ ነው",
    switchToFloorMode: "ወደ ፋብሪካ ወለል ተርሚናል ቀይር",
    exitFloorMode: "ከተርሚናል ውጣ",
    language: "ቋንቋ",

    // Roles
    roles: {
      plant_owner: "የፋብሪካው ባለቤት",
      production_manager: "የምርት ስራ አስኪያጅ",
      shift_supervisor: "የፈረቃ ተቆጣጣሪ",
      qc_inspector: "የጥራት ተቆጣጣሪ",
      warehouse_officer: "የመጋዘን ኃላፊ",
      maintenance_tech: "የጥገናና ሻጋታ ባለሙያ",
      hr_payroll: "የሰው ኃይልና ደመወዝ"
    },

    // Navigation Tabs
    nav: {
      dashboard: "ዳሽቦርድ",
      inventory: "ዕቃ ግምጃ ቤትና ሳይሎዎች",
      recipes: "የምርት አሰራር (BOM)",
      qc: "የጥራት ቁጥጥርና ሪግራይንድ",
      maintenance: "ማሽኖችና ሻጋታዎች",
      orders: "የስራ ትዕዛዞችና መውጫ ፈቃድ",
      employees: "ሰራተኞችና ደመወዝ",
      settings: "የፋብሪካው መቼቶች"
    },

    // Top Header & Actions
    header: {
      operations: "ክዋኔዎች",
      workspace: "የስራ ገፅ",
      refresh: "መረጃ አድስ",
      activeAlerts: "የፋብሪካው ማሳሰቢያዎች",
      noAlerts: "ሁሉም የጥሬ እቃ ክምችቶችና ማሽኖች በጥሩ ሁኔታ ላይ ናቸው",
      openTab: "ክፈት",
      switchRole: "ሚና ቀይር",
      signOut: "ውጣ (Sign Out)",
      dept: "ክፍል"
    },

    // Auth Screen
    auth: {
      systemSignIn: "የስርዓቱ መግቢያ",
      subtitle: "የፋብሪካ ወለልና የአስተዳደር ሰራተኞች ደህንነቱ የተጠበቀ መግቢያ ስርዓት",
      phoneLabel: "የስልክ ቁጥር (የኢትዮጵያ ስልክ ቅርጸት +251 9...)",
      phonePlaceholder: "+251911010101",
      passwordLabel: "የይለፍ ቃል",
      passwordPlaceholder: "የይለፍ ቃልዎን ያስገቡ",
      signInButton: "ወደ ስርዓቱ ግባ",
      signingIn: "በማረጋገጥ ላይ...",
      quickSwitchTitle: "የሚናዎች ፈጣን መምረጫ (ለሙከራ)",
      clickToSwitch: "የኢትዮጵያ RBAC ፈቃዶችን ለመሞከር የሚፈልጉትን ሚና ይጫኑ፡",
      trustNotice: "በተመሰጠረ httpOnly ኩኪ እና በ256-ቢት JWT የተጠበቀ ነው።",
      errorMissing: "እባክዎ ስልክ ቁጥር እና የይለፍ ቃል ያስገቡ።"
    },

    // Dashboard Overview
    dashboard: {
      title: "የፋብሪካ አጠቃላይ የስራ ዳሽቦርድ",
      subtitle: "የቀጥታ ምርት ሂደት፣ የማሽኖች ጤንነት፣ የጥሬ እቃ ሳይሎዎች እና የፋይናንስ ሁኔታ",
      totalPolymerStock: "አጠቃላይ የፕላስቲክ ጥሬ እቃ",
      fleetUtilization: "የማሽኖች ስራ ላይ መዋል",
      regrindRecovery: "የቆሻሻ ፕላስቲክ መልሶ ጥቅም (ሪግራይንድ)",
      monthlyPayroll: "ወርሃዊ የደመወዝ ክፍያ",
      activeWorkOrders: "በሂደት ላይ ያሉ የስራ ትዕዛዞች",
      runningMachines: "በስራ ላይ ያሉ ማሽኖች",
      criticalAlerts: "አስቸኳይ ማሳሰቢያዎች",
      quickActions: "ፈጣን እርምጃዎች",
      recentWorkOrders: "የቅርብ ጊዜ የስራ ትዕዛዞች",
      machineFleetStatus: "የማሽኖች የቀጥታ ሁኔታ",
      customer: "ደንበኛ",
      targetQty: "የታቀደ ብዛት",
      completedQty: "የተጠናቀቀ",
      progress: "ሂደት",
      clampingTons: "የመቆንጠጫ ኃይል (ቶን)",
      barrelTemp: "የበርሜል ሙቀት",
      oilPressure: "የዘይት ግፊት (Hydraulic)"
    },

    // Inventory & Silos
    inventory: {
      title: "የጥሬ እቃዎችና የሳይሎ መጋዘን",
      subtitle: "አዳዲስ ፖሊመሮች፣ ማስተርባች ቀለሞች፣ ተጨማሪ ኬሚካሎችና መልሶ ጥቅም ላይ የሚውሉ ፕላስቲኮች",
      addMaterial: "አዲስ ጥሬ እቃ መዝግብ",
      adjustStock: "ክምችት አስተካክል",
      materialCode: "ጥሬ እቃና ኮድ",
      category: "ምድብ",
      currentStock: "ያለ ክምችት",
      minThreshold: "ዝቅተኛ ገደብ",
      maxCapacity: "የሳይሎ አቅም",
      unitCost: "የአንዱ ዋጋ (ብር/ኪ.ግ)",
      totalValue: "አጠቃላይ ዋጋ (ብር)",
      supplier: "አቅራቢ / አስመጪ",
      location: "የማስቀመጫ ቦታ",
      regrindNotice: "ከምርት የተረፈ ንጹህ ፕላስቲክ ተፈጭቶ እንደገና ጥቅም ላይ መዋሉ የውጭ ምንዛሬን ያድናል።",
      virginPolymer: "አዲስ ፖሊመር",
      regrindCategory: "የተፈጨ ፕላስቲክ (ሪግራይንድ)",
      masterbatchCategory: "ማስተርባች / ቀለም",
      additiveCategory: "ተጨማሪ ኬሚካል"
    },

    // Recipes & BOM
    recipes: {
      title: "የምርት አሰራር ቀመሮችና የBOM ዝርዝር",
      subtitle: "የአዲስ ፖሊመር መጠን፣ የተፈጨ ፕላስቲክ ድርሻ፣ የዑደት ሰዓት እና በብር የተሰላ የወጪ ቀመር",
      addProduct: "የምርት አሰራር ፍጠር",
      productName: "ምርትና SKU",
      shotWeight: "የዕቃው ክብደት (ግራም)",
      runnerWeight: "የትርፍ ክብደት (ግራም)",
      cycleTime: "የዑደት ሰዓት (ሰከንድ)",
      sellingPrice: "የመሸጫ ዋጋ (ብር)",
      materialCost: "የጥሬ እቃ ወጪ (ብር)",
      grossMargin: "ጠቅላላ ትርፍ",
      bomBreakdown: "የጥሬ እቃ ድርሻ ዝርዝር"
    },

    // Quality Control & Regrind
    qc: {
      title: "የጥራት ቁጥጥርና የቆሻሻ መልሶ ጥቅም",
      subtitle: "የምርት ጉድለቶችን መመዝገብና ንጹህ ቆሻሻን በቀጥታ ወደ ሪግራይንድ ክምችት መመለስ",
      logDefect: "ጉድለት መዝግብ",
      totalInspected: "የተፈተሸ ጠቅላላ ምርት",
      defectRate: "የጉድለት መጠን",
      scrapRecovered: "የዳነ ንጹህ ቆሻሻ",
      recentLogs: "የቅርብ ጊዜ የፈረቃ ፍተሻዎች",
      defectReason: "የጉድለት አይነት",
      shortShot: "ያልሞላ ምርት (Short Shot)",
      flash: "ትርፍ ፕላስቲክ (Flash)",
      warpage: "የቅርጽ መዛባት (Warpage)",
      colorStreak: "የቀለም መዛባት",
      burntMarks: "የማረር ምልክት"
    },

    // Machinery & Maintenance
    maintenance: {
      title: "የማሽኖችና ሻጋታዎች ቅድመ-ጥገና ቁጥጥር",
      subtitle: "የሻጋታዎች ምት ቆጣሪ፣ የጥገና ገደቦች፣ የማሽን መረጃ እና የብልሽት ትኬቶች",
      addMold: "አዲስ ሻጋታ መዝግብ",
      registerMachine: "አዲስ ማሽን መዝግብ",
      newTicket: "አዲስ የብልሽት ትኬት ክፈት",
      moldsTab: "ሻጋታዎች (ሞልዶች)",
      machinesTab: "የማሽን ዝርዝር",
      ticketsTab: "የጥገና ትኬቶች",
      logShots: "+ የፈረቃ ምት መዝግብ",
      shots: "ምት",
      limit: "ገደብ",
      cavities: "ቀዳዳዎች (Cavities)",
      lifeExpectancy: "የሚጠበቅ የአገልግሎት ዘመን",
      lastServiced: "የቅርብ ጊዜ ጥገና",
      running: "በመስራት ላይ",
      idle: "ስራ የፈታ",
      breakdown: "በጥገና ላይ",
      setIdle: "አቁም",
      setRunning: "አስጀምር",
      markResolved: "ተፈትቷል በል",
      completed: "ተጠናቋል"
    },

    // Work Orders & Gate Pass
    orders: {
      title: "የስራ ትዕዛዞችና የበር መውጫ ፈቃድ",
      subtitle: "የምርት ስራ ትዕዛዞች፣ የማከፋፈያ ዝርዝርና የጥበቃ መውጫ ፈቃዶች",
      createOrder: "አዲስ የስራ ትዕዛዝ",
      orderNumber: "የትዕዛዝ ቁጥር",
      customer: "ደንበኛ",
      product: "ምርት",
      quantity: "የታዘዘ ብዛት",
      produced: "የተመረተ",
      status: "ሁኔታ",
      dispatch: "ምርት ላክ",
      gatePassTitle: "የፋብሪካ የበር መውጫ ፈቃድ",
      authorizedBy: "ፈቃድ የሰጠው ኃላፊ",
      truckPlate: "የተሽከርካሪ ታርጋ ቁጥር",
      destination: "የሚደርስበት ቦታ",
      printGatePass: "መውጫ ፈቃድ አትም"
    },

    // Employees & Payroll (Zero-Pressure)
    payroll: {
      title: "የሰራተኞች ዝርዝርና የደመወዝ ክፍያ",
      subtitle: "ከጭንቀት ነፃ የሆነ የአሰራር ስርዓት - ያለጣት አሻራ ክትትል ሙሉ ወርሃዊ ደመወዝ ማረጋገጥ",
      addWorker: "አዲስ ሰራተኛ መዝግብ",
      disbursePayroll: "ወርሃዊ ደመወዝ ክፈል",
      employeeName: "የሰራተኛው ስም",
      empCode: "የመታወቂያ ቁጥር",
      department: "የስራ ክፍል",
      role: "የስራ መደብ",
      monthlySalary: "ወርሃዊ ደመወዝ (ብር)",
      paymentMethod: "የክፍያ መንገድ",
      accountNumber: "የባንክ ሂሳብ ቁጥር (ንግድ ባንክ / አዋሽ)",
      payrollMonth: "የደመወዝ ወር",
      trustNotice: "የኢትዮጵያ የስራ ህግ፡ ሁሉም 74 ሰራተኞች ያለቅጣት እና ያለጭንቀት ሙሉ ወርሃዊ ደመወዛቸውን በወቅቱ ያገኛሉ።",
      generateSlips: "የደመወዝ ወረቀቶችን አዘጋጅ",
      markDisbursed: "ተከፍሏል በል",
      disbursed: "በኢትዮጵያ ንግድ ባንክ ተከፍሏል"
    },

    // Plant Settings
    settingsView: {
      title: "የፋብሪካው ዋና መቼቶች",
      subtitle: "በኢትዮጵያ የፋብሪካው አድራሻ፣ የኤሌክትሪክ ታሪፍ (በብር)፣ እና የስራ ማስኬጃ ወጪዎች",
      factoryLocationLabel: "የፋብሪካው አድራሻ",
      factoryLocationValue: "ዱከም የኢንዱስትሪ ፓርክ፣ ኦሮሚያ፣ ኢትዮጵያ",
      electricityTariff: "የመብራት ኃይል ታሪፍ (ብር / ኪ.ዋ.ሰ)",
      laborRate: "የአንድ ሰዓት የሰው ጉልበት ወጪ (ብር / ሰዓት)",
      regrindRecoveryCost: "የተፈጨ ፕላስቲክ መልሶ ማዘጋጃ ወጪ (ብር / ኪ.ግ)",
      overheadPercentage: "የፋብሪካው አጠቃላይ ወጪ (%)",
      activeWorkers: "የሰራተኞች ብዛት",
      shiftLength: "የፈረቃ ሰዓት (በሰዓታት)",
      saveSettings: "መቼቶችን አስቀምጥ",
      resetPristine: "ወደ መጀመሪያው የኢትዮጵያ መረጃ መልስ"
    },

    // Common Words
    common: {
      save: "ለውጦችን አስቀምጥ",
      cancel: "ሰርዝ",
      delete: "አጥፋ",
      edit: "አስተካክል",
      add: "ጨምር",
      close: "ዝጋ",
      status: "ሁኔታ",
      priority: "ቅድሚያ",
      critical: "አስቸኳይ",
      high: "ከፍተኛ",
      medium: "መካከለኛ",
      low: "ዝቅተኛ",
      optimal: "ጥሩ",
      serviceApproaching: "ጥገና ተቃርቧል",
      maintenanceDue: "ጥገና ያስፈልገዋል",
      kg: "ኪ.ግ",
      tons: "ቶን",
      hrs: "ሰዓት"
    }
  }
};
