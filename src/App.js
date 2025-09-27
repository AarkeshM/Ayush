import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landingpage.jsx";
import AuthPage from "./pages/Authpage.jsx";
import AdminPage from "./pages/Adminpage.jsx";
import DoctorPage from "./pages/Doctorpage.jsx";
import PatientPage from "./pages/Patientpage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */} 
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/patient" element={<PatientPage />} />
       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
