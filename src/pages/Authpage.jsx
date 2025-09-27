import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Briefcase,
  UserCheck,
  Shield,
  Leaf,
  Sun,
  Wind,
  Droplets,
  ShieldCheck as SuccessIcon,
  ArrowLeft,
} from "lucide-react";

const roles = [
  { id: "patient", name: "Patient", icon: <UserCheck className="w-5 h-5" /> },
  { id: "doctor", name: "Doctor", icon: <Briefcase className="w-5 h-5" /> },
  { id: "admin", name: "Admin", icon: <Shield className="w-5 h-5" /> },
];

// Hardcoded credentials for login
const credentials = {
    patient: { email: "patient@pkcare.com", password: "patient123" },
    doctor: { email: "doctor@pkcare.com", password: "doctor123" },
    admin: { email: "admin@pkcare.com", password: "admin123" },
}

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 font-sans p-4">
      <div className="w-full max-w-4xl min-h-[650px] md:h-[650px] bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        {/* Back to Home button for mobile view */}
        <Link to="/" className="md:hidden absolute top-4 left-4 z-10 p-2 bg-stone-100 rounded-full text-stone-600 hover:bg-stone-200">
            <ArrowLeft className="w-5 h-5" />
        </Link>
        
        {/* Left Panel - Branding & Info */}
        <div className="hidden md:flex flex-col w-full md:w-1/2 p-10 bg-gradient-to-br from-amber-50 to-orange-100 text-stone-700">
          <Link to="/" className="text-2xl font-bold font-serif text-stone-800 flex items-center gap-2 z-10">
            <Leaf className="text-amber-700"/>
            PanchakarmaCare
          </Link>
          <p className="mt-4 text-stone-600 z-10">
             Balancing mind, body, and spirit through the ancient wisdom of Ayurveda.
          </p>
          <div className="flex-grow flex flex-col items-center justify-center gap-8 -mt-10">
              <Sun className="w-20 h-20 text-amber-200" />
              <Droplets className="w-20 h-20 text-amber-200" />
              <Wind className="w-20 h-20 text-amber-200" />
          </div>
          <p className="text-center text-sm italic text-stone-500 z-10">
            "Health is a state of complete harmony of the body, mind and spirit."
          </p>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full md:w-1/2 p-8 pt-16 md:p-10 flex flex-col justify-center relative overflow-y-auto">
          {/* Back to Home button for desktop view */}
           <Link to="/" className="hidden md:block absolute top-6 left-6 z-10 p-2 text-stone-500 hover:text-stone-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>

          <AnimatePresence mode="wait">
            {isLoginView ? (
              <LoginForm key="login" setIsLoginView={setIsLoginView} />
            ) : (
              <RegisterForm key="register" setIsLoginView={setIsLoginView} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const formVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4, ease: "easeInOut" } },
};

function LoginForm({ setIsLoginView }) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const expectedCreds = credentials[selectedRole];
    if (email === expectedCreds.email && password === expectedCreds.password) {
        if (selectedRole === "admin") navigate("/admin");
        else if (selectedRole === "doctor") navigate("/doctor");
        else navigate("/patient");
    } else {
        setError("Invalid credentials for selected role.");
    }
  };

  return (
    <motion.div variants={formVariants} initial="initial" animate="animate" exit="exit">
      <h2 className="text-3xl font-bold font-serif text-stone-800 mb-2">Welcome Back</h2>
      <p className="text-stone-500 mb-6">Please select your role and login.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-3">Login as</label>
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => (
              <motion.div key={role.id} whileTap={{ scale: 0.95 }}>
                <label className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedRole === role.id ? "bg-amber-100 border-amber-500 text-amber-700" : "bg-stone-50 border-stone-200 text-stone-500 hover:border-amber-400"}`}>
                  {role.icon}
                  <span className="text-sm font-semibold mt-2">{role.name}</span>
                  <input type="radio" name="role" value={role.id} checked={selectedRole === role.id} onChange={() => setSelectedRole(role.id)} className="sr-only" />
                </label>
              </motion.div>
            ))}
          </div>
        </div>
        <InputWithIcon icon={<Mail />} type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputWithIcon icon={<Lock />} type={showPassword ? "text" : "password"} placeholder="Password" required hasToggle onToggle={() => setShowPassword(!showPassword)} isToggled={showPassword} value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition-colors">
          Login
        </motion.button>
      </form>
      <p className="text-center text-sm text-stone-500 mt-6">
        Don't have an account?{" "}
        <button onClick={() => setIsLoginView(false)} className="font-semibold text-amber-700 hover:underline">
          Register here
        </button>
      </p>
    </motion.div>
  );
}

function RegisterForm({ setIsLoginView }) {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registering new user...");
        setSuccess(true);
        setTimeout(() => { setIsLoginView(true); }, 2000);
    }

    if(success) {
        return (
            <motion.div variants={formVariants} initial="initial" animate="animate" exit="exit" className="text-center">
                <SuccessIcon className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                <h2 className="text-2xl font-bold font-serif text-stone-800">Registration Successful!</h2>
                <p className="text-stone-500 mt-2">You can now log in with your new account.</p>
            </motion.div>
        )
    }

  return (
    <motion.div variants={formVariants} initial="initial" animate="animate" exit="exit">
      <h2 className="text-3xl font-bold font-serif text-stone-800 mb-2">Create Account</h2>
      <p className="text-stone-500 mb-6">Start your journey to wellness with us.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputWithIcon icon={<User />} type="text" placeholder="Full Name" required />
        <InputWithIcon icon={<Phone />} type="tel" placeholder="Mobile Number" required />
        <InputWithIcon icon={<Mail />} type="email" placeholder="Email Address" required />
        <InputWithIcon icon={<Lock />} type={showPassword ? "text" : "password"} placeholder="Password" required hasToggle onToggle={() => setShowPassword(!showPassword)} isToggled={showPassword} />
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition-colors">
          Register
        </motion.button>
      </form>
      <p className="text-center text-sm text-stone-500 mt-6">
        Already have an account?{" "}
        <button onClick={() => setIsLoginView(true)} className="font-semibold text-amber-700 hover:underline">
          Login here
        </button>
      </p>
    </motion.div>
  );
}

function InputWithIcon({ icon, type, placeholder, required, hasToggle, onToggle, isToggled, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">{icon}</div>
      <input type={type} placeholder={placeholder} required={required} value={value} onChange={onChange} className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition" />
      {hasToggle && (
        <button type="button" onClick={onToggle} className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600">
          {isToggled ? <EyeOff /> : <Eye />}
        </button>
      )}
    </div>
  );
}

