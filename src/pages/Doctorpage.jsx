import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageCircle,
  LogOut,
  Menu,
  Clock,
  ChevronRight,
  Plus,
  Settings,
  Upload,
  ArrowLeft,
  Send,
} from "lucide-react";

// --- MOCK DATA ---
const stats = [
    { name: "Today's Appointments", value: 8, icon: Calendar },
    { name: "New Messages", value: 3, icon: MessageCircle },
    { name: "Total Patients Assigned", value: 28, icon: Users },
];
const todayAppointments = [
    { id: 1, patient: "Amit Patel", time: "10:00 AM", therapy: "Virechana" },
    { id: 2, patient: "Riya Sharma", time: "11:30 AM", therapy: "Abhyanga" },
];
const allPatients = [
    { id: 1, name: "Amit Patel", therapyStage: "Paschat Karma", lastVisit: "2025-09-27" },
    { id: 2, name: "Priya S.", therapyStage: "Pradhana Karma", lastVisit: "2025-09-26" },
];
const weeklySchedule = {
    "Monday": [{ time: "10:00 AM", patient: "Anil Kapoor" }], "Tuesday": [{ time: "2:00 PM", patient: "Sunita Devi" }], "Wednesday": [], "Thursday": [{ time: "11:30 AM", patient: "Priya S." }], "Friday": [{ time: "9:00 AM", patient: "Rajesh Mehta" }],
};
// Expanded message data for conversational view
const messages = [
    { id: 1, patient: "Priya S.", preview: "Feeling much lighter after the session, thank you doctor!", isRead: false, history: [ { sender: 'patient', text: "Feeling much lighter after the session, thank you doctor!" }, { sender: 'doctor', text: "That's wonderful to hear, Priya. Remember to drink plenty of warm water." } ] },
    { id: 2, patient: "Amit Patel", preview: "Just completed the post-procedure diet plan as advised.", isRead: false, history: [ { sender: 'patient', text: "Just completed the post-procedure diet plan as advised." } ] },
    { id: 3, patient: "Rohan Kumar", preview: "When should I book my follow-up consultation?", isRead: false, history: [ { sender: 'patient', text: "When should I book my follow-up consultation?" } ] },
    { id: 4, patient: "Sneha Reddy", preview: "Thank you for the detailed pre-care instructions.", isRead: true, history: [ { sender: 'patient', text: "Thank you for the detailed pre-care instructions." }, { sender: 'doctor', text: "You're most welcome, Sneha. Let me know if you have any questions." } ] },
];
const doctorProfile = {
    fullName: "Dr. Anjali Sharma", email: "doctor@pkcare.com", phone: "+919876543210", specialization: "Virechana Specialist", experience: "15", qualifications: "BAMS, MD (Ayurveda)", registrationNumber: "AYU-12345", clinicAddress: "", profilePicture: null,
};

// --- Reusable Components ---
const SidebarLink = ({ icon, text, active, onClick }) => (
    <button onClick={onClick} className={`flex items-center w-full gap-4 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-amber-100 text-amber-800' : 'text-stone-600 hover:bg-stone-100'}`}>
        {icon}
        <span className="font-medium">{text}</span>
    </button>
);

const ViewContainer = ({ children }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
        {children}
    </motion.div>
);

// --- Main Dashboard Component ---
export default function DoctorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => navigate("/login");
  const handleNavClick = (view) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  const renderView = () => {
    switch(activeView) {
        case "patients": return <MyPatientsView />;
        case "schedule": return <MyScheduleView />;
        case "messages": return <MessagesView />;
        case "settings": return <ProfileSettingsView />;
        default: return <DashboardHome setActiveView={setActiveView} />;
    }
  };
  
   const SidebarContent = () => (
     <div className="flex flex-col h-full">
        <div className="p-6 border-b border-stone-200"><h1 className="text-2xl font-bold font-serif text-stone-800">PanchakarmaCare</h1><p className="text-sm text-stone-500 mt-1">Doctor Portal</p></div>
        <nav className="flex-grow p-6 space-y-2">
            <SidebarLink icon={<LayoutDashboard />} text="Dashboard" active={activeView === 'dashboard'} onClick={() => handleNavClick('dashboard')} />
            <SidebarLink icon={<Users />} text="My Patients" active={activeView === 'patients'} onClick={() => handleNavClick('patients')} />
            <SidebarLink icon={<Calendar />} text="My Schedule" active={activeView === 'schedule'} onClick={() => handleNavClick('schedule')} />
            <SidebarLink icon={<MessageCircle />} text="Messages" active={activeView === 'messages'} onClick={() => handleNavClick('messages')} />
            <SidebarLink icon={<Settings />} text="Settings" active={activeView === 'settings'} onClick={() => handleNavClick('settings')} />
        </nav>
        <div className="p-6 border-t border-stone-200"><button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-stone-600 hover:bg-red-100 hover:text-red-600 transition-colors"><LogOut /><span className="font-medium">Logout</span></button></div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-stone-50">
        {isSidebarOpen && (<div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setIsSidebarOpen(false)}></div>)}
        <div className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}><SidebarContent /></div>
        <aside className="hidden md:block w-64 bg-white border-r border-stone-200 flex-shrink-0"><SidebarContent /></aside>
        <main className="flex-1 p-6 md:p-10">
            <header className="flex justify-between items-center mb-8">
                <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
                <h2 className="text-2xl font-bold text-stone-800 capitalize">{activeView === 'dashboard' ? "Doctor's Dashboard" : activeView.replace(/([A-Z])/g, ' $1')}</h2>
                <div className="text-right">
                    <p className="font-semibold">Dr. Anjali Sharma</p>
                    <p className="text-sm text-stone-500">doctor@pkcare.com</p>
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
const DashboardHome = ({ setActiveView }) => {
    const filledFields = Object.values(doctorProfile).filter(value => value).length;
    const totalFields = Object.keys(doctorProfile).length;
    const completionPercentage = Math.round((filledFields / totalFields) * 100);

    return (
    <>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 mb-8"><h3 className="text-xl font-semibold text-stone-800">Profile Completion</h3><div className="flex items-center gap-4 mt-3"><div className="w-full bg-stone-200 rounded-full h-2.5"><div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div></div><span className="font-bold text-green-700">{completionPercentage}%</span></div><p className="text-sm text-stone-500 mt-2">Complete your profile to build trust with patients.</p><button onClick={() => setActiveView('settings')} className="mt-4 text-sm font-bold text-amber-700 hover:underline">Update Profile Now &rarr;</button></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">{stats.map((stat, index) => (<div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center gap-5"><div className="p-3 bg-amber-100 rounded-full"><stat.icon className="w-8 h-8 text-amber-700" /></div><div><p className="text-3xl font-bold text-stone-800">{stat.value}</p><p className="text-stone-500">{stat.name}</p></div></div>))}</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-stone-200"><h3 className="text-xl font-semibold text-stone-800 mb-4">Today's Appointments</h3><div className="space-y-4">{todayAppointments.map(app => (<div key={app.id} className="p-4 bg-stone-50 rounded-lg flex items-center justify-between"><div><p className="font-semibold text-stone-800">{app.patient}</p><p className="text-sm text-stone-500">{app.therapy} Therapy</p></div><div className="flex items-center gap-2 text-stone-600"><Clock className="w-4 h-4"/><span>{app.time}</span></div></div>))}</div></div><div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200"><h3 className="text-xl font-semibold text-stone-800 mb-4">New Messages</h3><div className="space-y-4">{messages.filter(m => !m.isRead).map(act => (<button key={act.id} className="w-full text-left flex justify-between items-start p-4 bg-stone-50 hover:bg-amber-50 rounded-lg border border-stone-200"><div className="min-w-0"><p className="font-semibold text-sm text-stone-700">{act.patient}</p><p className="text-sm text-stone-500 truncate">"{act.preview}"</p></div><ChevronRight className="w-5 h-5 text-stone-400 flex-shrink-0 mt-1" /></button>))}</div></div></div>
    </>
    )
};

const MyPatientsView = () => (<div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200"><div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-stone-800">My Patients</h3><button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg shadow-sm hover:bg-amber-700"><Plus className="w-5 h-5" /> Add Patient Record</button></div><div className="overflow-x-auto"><table className="w-full text-left"><thead className="text-sm text-stone-500 bg-stone-50"><tr><th className="p-3 font-semibold">Patient Name</th><th className="p-3 font-semibold">Current Therapy Stage</th><th className="p-3 font-semibold">Last Visit</th><th className="p-3 font-semibold">Actions</th></tr></thead><tbody>{allPatients.map(p => (<tr key={p.id} className="border-b border-stone-100"><td className="p-3 font-medium text-stone-700">{p.name}</td><td className="p-3 text-stone-600">{p.therapyStage}</td><td className="p-3 text-stone-600">{p.lastVisit}</td><td className="p-3"><button className="font-semibold text-amber-700 hover:underline text-sm">View Profile</button></td></tr>))}</tbody></table></div></div>);
const MyScheduleView = () => (<div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200"><h3 className="text-xl font-semibold text-stone-800 mb-4">This Week's Schedule</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">{Object.entries(weeklySchedule).map(([day, appointments]) => (<div key={day} className="bg-stone-50 p-4 rounded-lg"><p className="font-semibold text-center mb-3 text-stone-700">{day}</p><div className="space-y-2">{appointments.length > 0 ? (appointments.map((app, i) => (<div key={i} className="text-center bg-amber-100 p-2 rounded-md"><p className="text-sm font-semibold text-amber-800">{app.patient}</p><p className="text-xs text-amber-700">{app.time}</p></div>))) : ( <p className="text-center text-sm text-stone-400 pt-4">No appointments</p> )}</div></div>))}</div></div>);

// --- UPDATED MESSAGES VIEW ---
const MessagesView = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);

    return(
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 h-[calc(100vh-10rem)] flex overflow-hidden relative">
            {/* Pane 1: Message List */}
            <motion.div
                animate={{ x: selectedMessage ? '-100%' : '0%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-full md:w-1/3 border-r border-stone-200 flex flex-col absolute md:static inset-0"
            >
                <div className="p-4 border-b border-stone-200 flex-shrink-0"><h3 className="text-xl font-semibold text-stone-800">Inbox</h3></div>
                <div className="overflow-y-auto">
                    {messages.map(msg => (
                        <button key={msg.id} onClick={() => setSelectedMessage(msg)} className={`w-full text-left p-4 flex items-start gap-4 border-b border-stone-100 ${selectedMessage?.id === msg.id ? 'bg-amber-50' : 'hover:bg-stone-50'}`}>
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!msg.isRead ? 'bg-amber-500' : 'bg-transparent'}`}></div>
                            <div className="flex-grow min-w-0"><p className="font-semibold text-stone-800">{msg.patient}</p><p className="text-sm text-stone-600 truncate">{msg.preview}</p></div>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Pane 2: Conversation View */}
            <AnimatePresence>
                {selectedMessage && (
                    <motion.div
                        key={selectedMessage.id}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="w-full md:w-2/3 flex flex-col absolute inset-0 bg-white"
                    >
                        <ConversationView message={selectedMessage} onBack={() => setSelectedMessage(null)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ConversationView = ({ message, onBack }) => {
    const chatEndRef = useRef(null);
    useEffect(() => { chatEndRef.current?.scrollIntoView() }, [message]);

    return (
        <>
            <div className="p-4 border-b border-stone-200 flex items-center gap-4 flex-shrink-0"><button onClick={onBack} className="md:hidden text-stone-500 hover:text-stone-800"><ArrowLeft/></button><h3 className="text-xl font-semibold text-stone-800">{message.patient}</h3></div>
            <div className="flex-grow p-4 overflow-y-auto"><div className="space-y-4">{message.history.map((chat, index) => (<div key={index} className={`flex ${chat.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-xs px-4 py-2 rounded-2xl ${chat.sender === 'doctor' ? 'bg-amber-500 text-white rounded-br-none' : 'bg-stone-100 text-stone-800 rounded-bl-none'}`}>{chat.text}</p></div>))}<div ref={chatEndRef} /></div></div>
            <div className="p-4 border-t border-stone-200 flex-shrink-0"><form className="flex gap-2"><input type="text" placeholder="Type your reply..." className="flex-grow p-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"/><button type="submit" className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"><Send className="w-5 h-5"/></button></form></div>
        </>
    );
}

const ProfileSettingsView = ({}) => {
    const [profile, setProfile] = useState(doctorProfile);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-semibold text-stone-800 mb-6">Profile Settings</h3>
            <form className="space-y-8">
                <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="flex-shrink-0"><div className="w-32 h-32 bg-stone-200 rounded-full flex items-center justify-center text-stone-400"><Upload className="w-12 h-12" /></div><button type="button" className="w-full mt-2 text-sm text-amber-700 hover:underline">Upload Photo</button></div>
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Full Name" name="fullName" value={profile.fullName} onChange={handleInputChange} />
                        <InputField label="Email Address" name="email" value={profile.email} onChange={handleInputChange} type="email" readOnly />
                        <InputField label="Phone Number" name="phone" value={profile.phone} onChange={handleInputChange} type="tel" />
                    </div>
                </div>
                <div>
                     <h4 className="font-semibold text-stone-700 mb-4 border-b pb-2">Professional Details</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Specialization" name="specialization" value={profile.specialization} onChange={handleInputChange} />
                        <InputField label="Years of Experience" name="experience" value={profile.experience} onChange={handleInputChange} type="number" />
                        <InputField label="Qualifications" name="qualifications" value={profile.qualifications} onChange={handleInputChange} placeholder="e.g., BAMS, MD (Ayurveda)" />
                        <InputField label="Registration Number" name="registrationNumber" value={profile.registrationNumber} onChange={handleInputChange} />
                     </div>
                </div>
                <div>
                    <h4 className="font-semibold text-stone-700 mb-4 border-b pb-2">Clinic Details</h4>
                    <div><label className="block text-sm font-medium text-stone-600 mb-1">Clinic Address</label><textarea name="clinicAddress" value={profile.clinicAddress} onChange={handleInputChange} rows="3" className="w-full p-2 border border-stone-300 rounded-lg text-sm"></textarea></div>
                </div>
                <div className="pt-4 flex justify-end"><button type="submit" className="px-6 py-2 bg-amber-600 text-white rounded-lg shadow-sm hover:bg-amber-700">Save Changes</button></div>
            </form>
        </div>
    );
};

const InputField = ({ label, name, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-stone-600 mb-1">{label}</label>
        <input id={name} name={name} {...props} className="w-full p-2 border border-stone-300 rounded-lg text-sm read-only:bg-stone-100" />
    </div>
);

