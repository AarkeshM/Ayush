import React, { useState } from "react"; // Added React import to fix 'React is not defined' error
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  Settings,
  LogOut,
  Menu,
  PlusCircle,
  ChevronRight,
  Trash2, // Removed MoreVertical
  Edit,   // Removed Search
} from "lucide-react";

// --- Mock Data ---
const stats = [
    { name: "Total Doctors", value: 12, icon: Stethoscope },
    { name: "Total Patients", value: 84, icon: Users },
    { name: "Today's Appointments", value: 22, icon: Calendar },
];
const allDoctors = [
    { id: 1, name: "Dr. Anjali Sharma", specialization: "Vamana Specialist", contact: "+91 98765 43210" },
    { id: 2, name: "Dr. Rohan Verma", specialization: "Virechana Specialist", contact: "+91 98765 43211" },
    { id: 3, name: "Dr. Priya Gupta", specialization: "Basti Karma", contact: "+91 98765 43212" },
];
const allPatients = [
    { id: 1, name: "Amit Patel", doctor: "Dr. Sharma", lastVisit: "2025-09-25" },
    { id: 2, name: "Priya S.", doctor: "Dr. Verma", lastVisit: "2025-09-24" },
    { id: 3, name: "Rohan Kumar", doctor: "Dr. Sharma", lastVisit: "2025-09-23" },
];
const allAppointments = [
    { id: 1, patient: "Amit Patel", doctor: "Dr. Sharma", time: "10:00 AM", status: "Completed" },
    { id: 2, patient: "Priya S.", doctor: "Dr. Verma", time: "11:30 AM", status: "Confirmed" },
    { id: 3, patient: "Rohan Kumar", doctor: "Dr. Sharma", time: "01:00 PM", status: "Confirmed" },
    { id: 4, patient: "Sneha Reddy", doctor: "Dr. Gupta", time: "02:30 PM", status: "Pending" },
    { id: 5, patient: "Vijay Singh", doctor: "Dr. Verma", time: "04:00 PM", status: "Cancelled" },
];

const SidebarLink = ({ icon, text, active, onClick }) => (
    <button onClick={onClick} className={`flex items-center w-full gap-4 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-amber-100 text-amber-800' : 'text-stone-600 hover:bg-stone-100'}`}>
        {icon}
        <span className="font-medium">{text}</span>
    </button>
);

const ViewContainer = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);


export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const renderView = () => {
    switch(activeView) {
        case "doctors": return <DoctorsView />;
        case "patients": return <PatientsView />;
        case "appointments": return <AppointmentsView />;
        case "settings": return <SettingsView />;
        default: return <DashboardHome />;
    }
  };

  const SidebarContent = () => (
     <div className="flex flex-col h-full">
        <div className="p-6 border-b border-stone-200">
             <h1 className="text-2xl font-bold font-serif text-stone-800">PanchakarmaCare</h1>
             <p className="text-sm text-stone-500 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-grow p-6 space-y-2">
            <SidebarLink icon={<LayoutDashboard />} text="Dashboard" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
            <SidebarLink icon={<Stethoscope />} text="Doctors" active={activeView === 'doctors'} onClick={() => setActiveView('doctors')} />
            <SidebarLink icon={<Users />} text="Patients" active={activeView === 'patients'} onClick={() => setActiveView('patients')} />
            <SidebarLink icon={<Calendar />} text="Appointments" active={activeView === 'appointments'} onClick={() => setActiveView('appointments')} />
            <SidebarLink icon={<Settings />} text="Settings" active={activeView === 'settings'} onClick={() => setActiveView('settings')} />
        </nav>
        <div className="p-6 border-t border-stone-200">
            <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-stone-600 hover:bg-red-100 hover:text-red-600 transition-colors">
                <LogOut />
                <span className="font-medium">Logout</span>
            </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-stone-50">
       {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setIsSidebarOpen(false)}></div>
       )}
       <div className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <SidebarContent />
       </div>

      <aside className="hidden md:block w-64 bg-white border-r border-stone-200 flex-shrink-0">
        <SidebarContent />
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <header className="flex justify-between items-center mb-8">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-stone-800 capitalize">{activeView}</h2>
          <div className="text-right">
            <p className="font-semibold">Admin User</p>
            <p className="text-sm text-stone-500">admin@pkcare.com</p>
          </div>
        </header>
        <AnimatePresence mode="wait">
            <ViewContainer key={activeView}>
                {renderView()}
            </ViewContainer>
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- VIEWS ---

const DashboardHome = () => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center gap-5">
                    <div className="p-3 bg-amber-100 rounded-full"><stat.icon className="w-8 h-8 text-amber-700" /></div>
                    <div>
                        <p className="text-3xl font-bold text-stone-800">{stat.value}</p>
                        <p className="text-stone-500">{stat.name}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Recent Appointments</h3>
                <Table data={allAppointments.slice(0, 4)} columns={['patient', 'doctor', 'time', 'status']} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Quick Actions</h3>
                <div className="space-y-4">
                    <ActionButton icon={<PlusCircle />} text="Add New Doctor" />
                    <ActionButton icon={<PlusCircle />} text="Add New Patient" />
                </div>
            </div>
        </div>
    </>
);

const DoctorsView = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-stone-800">Manage Doctors</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg shadow-sm hover:bg-amber-700">
                <PlusCircle className="w-5 h-5" /> Add Doctor
            </button>
        </div>
        <Table data={allDoctors} columns={['name', 'specialization', 'contact']} hasActions />
    </div>
);

const PatientsView = () => (
     <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
        <h3 className="text-xl font-semibold text-stone-800 mb-4">Manage Patients</h3>
        <Table data={allPatients} columns={['name', 'doctor', 'lastVisit']} hasActions />
    </div>
);

const AppointmentsView = () => {
    const [filter, setFilter] = useState('All');
    const filteredAppointments = filter === 'All' ? allAppointments : allAppointments.filter(a => a.status === filter);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-stone-800">All Appointments</h3>
                <div className="flex gap-2 p-1 bg-stone-100 rounded-lg">
                    {['All', 'Confirmed', 'Completed', 'Pending'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-md text-sm font-medium ${filter === f ? 'bg-white shadow-sm' : 'text-stone-500'}`}>{f}</button>
                    ))}
                </div>
            </div>
            <Table data={filteredAppointments} columns={['patient', 'doctor', 'time', 'status']} />
        </div>
    );
};

const SettingsView = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-stone-800 mb-6">Admin Settings</h3>
        <form className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Full Name</label>
                <input type="text" defaultValue="Admin User" className="w-full p-2 border border-stone-300 rounded-lg"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Email Address</label>
                <input type="email" defaultValue="admin@pkcare.com" className="w-full p-2 border border-stone-300 rounded-lg"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Change Password</label>
                <input type="password" placeholder="New Password" className="w-full p-2 border border-stone-300 rounded-lg"/>
            </div>
            <div className="pt-4">
                 <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-lg shadow-sm hover:bg-amber-700">Save Changes</button>
            </div>
        </form>
    </div>
);


// --- REUSABLE COMPONENTS ---

const ActionButton = ({ icon, text }) => (
    <button className="flex justify-between items-center w-full p-4 bg-stone-50 hover:bg-amber-50 rounded-lg border border-stone-200 transition-colors">
        <div className="flex items-center gap-3">
            {icon && React.cloneElement(icon, { className: "w-6 h-6 text-amber-700" })}
            <p className="font-semibold text-stone-700">{text}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-stone-400" />
    </button>
);

const Table = ({ data, columns, hasActions }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead className="text-sm text-stone-500 bg-stone-50">
                <tr>
                    {columns.map(col => <th key={col} className="p-3 capitalize font-semibold">{col.replace(/([A-Z])/g, ' $1')}</th>)}
                    {hasActions && <th className="p-3">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-stone-100 last:border-0">
                        {columns.map(col => (
                            <td key={col} className="p-3 text-stone-600">
                                {col === 'status' ? (
                                    <StatusPill status={row[col]} />
                                ) : (
                                    row[col]
                                )}
                            </td>
                        ))}
                        {hasActions && (
                            <td className="p-3">
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-stone-100 rounded-md"><Edit className="w-4 h-4 text-stone-500"/></button>
                                    <button className="p-2 hover:bg-red-100 rounded-md"><Trash2 className="w-4 h-4 text-red-500"/></button>
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const StatusPill = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        Completed: "bg-green-100 text-green-700",
        Confirmed: "bg-blue-100 text-blue-700",
        Pending: "bg-yellow-100 text-yellow-700",
        Cancelled: "bg-red-100 text-red-700",
    };
    return <span className={`${baseClasses} ${statusClasses[status] || 'bg-stone-100 text-stone-700'}`}>{status}</span>;
};

