import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Heart,
  Calendar,
  Stethoscope,
  User,
  LogOut,
  Menu,
  Clock,
  Sun,
  BookOpen,
  Send,
  MessageSquare,
  X,
} from "lucide-react";


const nextAppointment = {
    therapy: "Abhyanga Massage",
    doctor: "Dr. Anjali Sharma",
    date: "September 28, 2025",
    time: "11:30 AM",
};
const therapyPlan = [
    { name: "Purva Karma (Pre-Care)", status: "Completed" },
    { name: "Pradhana Karma (Main Therapy)", status: "In Progress" },
    { name: "Paschat Karma (Post-Care)", status: "Upcoming" },
];
const dailyReminders = [
    { id: 1, text: "Drink warm ginger tea in the morning.", icon: Sun },
    { id: 2, text: "Follow the prescribed light diet for lunch.", icon: BookOpen },
];
const allTherapies = [
    { date: "2025-09-28", name: "Abhyanga Massage", status: "Upcoming" },
    { date: "2025-09-26", name: "Shirodhara", status: "Completed" },
    { date: "2025-09-25", name: "Virechana", status: "Completed" },
];
const schedule = {
    "Monday": [],
    "Tuesday": [{ time: "2:00 PM", therapy: "Basti" }],
    "Wednesday": [],
    "Thursday": [{ time: "11:30 AM", therapy: "Abhyanga" }],
    "Friday": [],
};
const doctorInfo = {
    name: "Dr. Anjali Sharma",
    specialization: "Virechana Specialist",
    bio: "Dr. Sharma is a renowned Ayurvedic practitioner with over 15 years of experience in Panchakarma therapies."
};
const patientProfile = {
    fullName: "Priya S.",
    email: "patient@pkcare.com",
    phone: "+91 98765 12345",
    dob: "1990-05-15",
    address: "", // Empty field
    emergencyContact: "", // Empty field
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

// --- Dashboard Page ---
export default function PatientDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => navigate("/login");

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const renderView = () => {
    switch(activeView) {
        case "therapies": return <MyTherapiesView />;
        case "schedule": return <MyScheduleView />;
        case "doctor": return <MyDoctorView />;
        case "profile": return <ProfileView />;
        default: return <DashboardHome setActiveView={setActiveView} />;
    }
  };

  const SidebarContent = () => (
     <div className="flex flex-col h-full">
        <div className="p-6 border-b border-stone-200">
             <h1 className="text-2xl font-bold font-serif text-stone-800">PanchakarmaCare</h1>
             <p className="text-sm text-stone-500 mt-1">Patient Portal</p>
        </div>
        <nav className="flex-grow p-6 space-y-2">
            <SidebarLink icon={<LayoutDashboard />} text="My Dashboard" active={activeView === 'dashboard'} onClick={() => handleNavClick('dashboard')} />
            <SidebarLink icon={<Heart />} text="My Therapies" active={activeView === 'therapies'} onClick={() => handleNavClick('therapies')} />
            <SidebarLink icon={<Calendar />} text="My Schedule" active={activeView === 'schedule'} onClick={() => handleNavClick('schedule')} />
            <SidebarLink icon={<Stethoscope />} text="My Doctor" active={activeView === 'doctor'} onClick={() => handleNavClick('doctor')} />
            <SidebarLink icon={<User />} text="Profile" active={activeView === 'profile'} onClick={() => handleNavClick('profile')} />
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

      <main className="flex-1 p-6 md:p-10 relative">
        <header className="flex justify-between items-center mb-8">
            <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-stone-800">Welcome, Priya</h2>
            <div className="text-right">
                <p className="font-semibold">Priya S.</p>
                <p className="text-sm text-stone-500">patient@pkcare.com</p>
            </div>
        </header>
        
        <AnimatePresence mode="wait">
            <ViewContainer key={activeView}>
                {renderView()}
            </ViewContainer>
        </AnimatePresence>
        
        <Chatbot />
      </main>
    </div>
  );
}

// --- VIEWS ---

const DashboardHome = ({ setActiveView }) => {
    const filledFields = Object.values(patientProfile).filter(value => value).length;
    const totalFields = Object.keys(patientProfile).length;
    const completionPercentage = Math.round((filledFields / totalFields) * 100);
    
    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 mb-8">
                <h3 className="text-xl font-semibold text-stone-800">Your Profile is {completionPercentage}% Complete</h3>
                <div className="flex items-center gap-4 mt-3">
                    <div className="w-full bg-stone-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                    <span className="font-bold text-green-700">{completionPercentage}%</span>
                </div>
                <p className="text-sm text-stone-500 mt-2">Keeping your profile updated helps us provide better care.</p>
                <button onClick={() => setActiveView('profile')} className="mt-4 text-sm font-bold text-amber-700 hover:underline">
                    Complete Your Profile &rarr;
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-8 rounded-xl shadow-lg">
                        <p className="font-semibold opacity-80 mb-2">Your Next Appointment</p>
                        <h3 className="text-3xl font-bold mb-1">{nextAppointment.therapy}</h3>
                        <p className="opacity-90">with {nextAppointment.doctor}</p>
                        <div className="mt-6 flex items-center gap-4 p-4 bg-white/20 rounded-lg">
                            <Clock className="w-6 h-6"/>
                            <p className="font-semibold">{nextAppointment.date} at {nextAppointment.time}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                         <h3 className="text-xl font-semibold text-stone-800 mb-4">Your Therapy Plan</h3>
                         <div className="space-y-3">
                            {therapyPlan.map((step, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.status === 'Completed' ? 'bg-green-500' : step.status === 'In Progress' ? 'bg-amber-500 animate-pulse' : 'bg-stone-300'}`}>
                                        {step.status === 'Completed' && <span className="text-white font-bold">✓</span>}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-stone-800">{step.name}</p>
                                        <p className={`text-sm ${step.status === 'Completed' ? 'text-green-600' : 'text-stone-500'}`}>{step.status}</p>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                     <h3 className="text-xl font-semibold text-stone-800 mb-4">Today's Reminders</h3>
                     <div className="space-y-4">
                        {dailyReminders.map(rem => (
                            <div key={rem.id} className="flex items-start gap-4 p-4 bg-stone-50 rounded-lg">
                               <rem.icon className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
                               <p className="text-stone-700">{rem.text}</p>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </>
    );
};

const MyTherapiesView = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
        <h3 className="text-xl font-semibold text-stone-800 mb-4">Therapy History</h3>
        <div className="space-y-4">
            {allTherapies.map((therapy, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-stone-50 rounded-lg">
                    <div>
                        <p className="font-semibold">{therapy.name}</p>
                        <p className="text-sm text-stone-500">{therapy.date}</p>
                    </div>
                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${therapy.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{therapy.status}</span>
                </div>
            ))}
        </div>
    </div>
);

const MyScheduleView = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
        <h3 className="text-xl font-semibold text-stone-800 mb-4">This Week's Schedule</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(schedule).map(([day, appointments]) => (
                <div key={day} className="bg-stone-50 p-4 rounded-lg">
                    <p className="font-semibold text-center mb-3">{day}</p>
                    {appointments.length > 0 ? (
                        appointments.map((app, i) => (
                            <div key={i} className="text-center bg-amber-100 p-2 rounded-md">
                                <p className="text-sm font-semibold text-amber-800">{app.therapy}</p>
                                <p className="text-xs text-amber-700">{app.time}</p>
                            </div>
                        ))
                    ) : ( <p className="text-center text-sm text-stone-400">No appointments</p> )}
                </div>
            ))}
        </div>
    </div>
);

const MyDoctorView = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 max-w-lg mx-auto">
        <h3 className="text-xl font-semibold text-stone-800 mb-4">Your Doctor</h3>
        <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-stone-200 rounded-full flex-shrink-0"></div>
            <div>
                <h4 className="text-2xl font-bold text-stone-800">{doctorInfo.name}</h4>
                <p className="text-amber-700 font-semibold">{doctorInfo.specialization}</p>
                <p className="mt-2 text-stone-600">{doctorInfo.bio}</p>
                <button className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg shadow-sm hover:bg-amber-700">Send a Message</button>
            </div>
        </div>
    </div>
);

const ProfileView = () => (
     <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-stone-800 mb-6">Your Profile</h3>
        <form className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Full Name</label>
                <input type="text" defaultValue={patientProfile.fullName} className="w-full p-2 border border-stone-300 rounded-lg"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Email Address</label>
                <input type="email" defaultValue={patientProfile.email} className="w-full p-2 border border-stone-300 rounded-lg"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Contact Number</label>
                <input type="tel" defaultValue={patientProfile.phone} className="w-full p-2 border border-stone-300 rounded-lg"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Date of Birth</label>
                <input type="date" defaultValue={patientProfile.dob} className="w-full p-2 border border-stone-300 rounded-lg"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Previous Medical History</label>
                <textarea defaultValue={patientProfile.address} rows="2" className="w-full p-2 border border-stone-300 rounded-lg"></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Address</label>
                <textarea defaultValue={patientProfile.address} rows="3" className="w-full p-2 border border-stone-300 rounded-lg"></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Emergency Contact</label>
                <input type="tel" defaultValue={patientProfile.emergencyContact} className="w-full p-2 border border-stone-300 rounded-lg"/>
            </div>
            <div className="pt-4">
                 <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-lg shadow-sm hover:bg-amber-700">Save Changes</button>
            </div>
        </form>
    </div>
);

const chatFlow = {
    start: {
        message: "Hello Priya! I am your wellness assistant. How can I help you today?",
        options: [
            { text: "Appointment Query", next: "appointmentQuery" },
            { text: "About my Diet Plan", next: "dietPlan" },
            { text: "General Question", next: "generalQuestion" }
        ],
        type: "options"
    },
    appointmentQuery: {
        message: `Your next appointment for Abhyanga Massage is on September 28, 2025 at 11:30 AM. What would you like to do?`,
        options: [
            { text: "Confirm Appointment", next: "confirmAppointment" },
            { text: "Request Reschedule", next: "rescheduleRequest" },
            { text: "Go Back", next: "start" },
        ],
        type: "options"
    },
    confirmAppointment: {
        message: "Thank you for confirming. Your appointment is scheduled. We look forward to seeing you!",
        options: [{ text: "Main Menu", next: "start" }],
        type: "options"
    },
    rescheduleRequest: {
        message: "Of course. Please type your preferred date and time, and we will check for availability.",
        type: "input",
        next: "rescheduleConfirm"
    },
    rescheduleConfirm: {
        message: "Thank you. We have received your reschedule request. Our team will contact you shortly to confirm the new appointment.",
        options: [{ text: "Main Menu", next: "start" }],
        type: "options"
    },
    dietPlan: {
        message: "Dr. Sharma has recommended a light, warm meal for today. Avoid cold foods and drinks. Would you like to view the full diet chart or ask a question?",
        options: [
            { text: "View Full Diet Chart", next: "dietChart" },
            { text: "Ask a question", next: "generalQuestion" },
            { text: "Go Back", next: "start" }
        ],
        type: "options"
    },
    dietChart: {
        message: "Here is a summary of your diet plan: Breakfast - Rice porridge. Lunch - Cooked vegetables with Mung dal. Dinner - Vegetable soup. Please avoid dairy and spicy foods.",
        options: [{ text: "Main Menu", next: "start" }],
        type: "options"
    },
    generalQuestion: {
        message: "Please type your question below. For urgent medical advice, please message your doctor directly.",
        type: "input",
        next: "generalConfirm"
    },
    generalConfirm: {
        message: "Thank you for your question. We have forwarded it to the support team, and they will get back to you soon.",
        options: [{ text: "Main Menu", next: "start" }],
        type: "options"
    },
};

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ from: 'bot', text: chatFlow.start.message }]);
    const [currentNode, setCurrentNode] = useState('start');
    const [inputValue, setInputValue] = useState("");
    const chatEndRef = useRef(null);

    const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages]);
    
    const handleUserInput = (text, nextNode) => {
        const userMessage = { from: 'user', text };
        const nextStep = chatFlow[nextNode];
        const botMessage = { from: 'bot', text: nextStep.message };

        setMessages([...messages, userMessage, botMessage]);
        setCurrentNode(nextNode);
    }

    const handleOptionClick = (option) => {
        handleUserInput(option.text, option.next);
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(!inputValue.trim()) return;
        const nextNode = chatFlow[currentNode].next;
        handleUserInput(inputValue, nextNode);
        setInputValue("");
    }
    
    const currentStep = chatFlow[currentNode];

    return (
        <>
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)} 
                className="fixed bottom-8 right-8 bg-amber-600 text-white p-4 rounded-full shadow-lg z-50"
            >
                {isOpen ? <X className="w-6 h-6"/> : <MessageSquare className="w-6 h-6"/>}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{type: "spring", stiffness: 200, damping: 25}}
                        className="fixed bottom-24 right-8 w-80 h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-stone-200"
                    >
                        <header className="p-4 bg-stone-100 border-b border-stone-200 flex justify-between items-center flex-shrink-0">
                            <h3 className="font-semibold text-stone-800">Wellness Assistant</h3>
                            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-700"><X className="w-5 h-5"/></button>
                        </header>
                        <div className="flex-grow p-4 overflow-y-auto">
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                                        <motion.p 
                                           initial={{ opacity: 0, y: 10 }}
                                           animate={{ opacity: 1, y: 0 }}
                                           className={`max-w-xs px-4 py-2 rounded-2xl ${msg.from === 'bot' ? 'bg-stone-100 text-stone-800 rounded-bl-none' : 'bg-amber-500 text-white rounded-br-none'}`}
                                        >
                                            {msg.text}
                                        </motion.p>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>
                        </div>
                        <div className="p-4 border-t border-stone-200 flex-shrink-0">
                            {currentStep.type === 'options' ? (
                                 <div className="flex flex-wrap gap-2">
                                    {currentStep.options.map((opt) => (
                                        <button key={opt.text} onClick={() => handleOptionClick(opt)} className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full hover:bg-amber-200 transition-colors">
                                            {opt.text}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="flex gap-2">
                                    <input 
                                       type="text"
                                       value={inputValue}
                                       onChange={(e) => setInputValue(e.target.value)}
                                       placeholder="Type your message..."
                                       className="flex-grow p-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                                    />
                                    <button type="submit" className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                                        <Send className="w-5 h-5"/>
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

