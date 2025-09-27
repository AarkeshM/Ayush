import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Bell,
  Activity,
  MessageSquare,
  Leaf,
  Heart,
  Menu,
  X,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Quote,
  Wind,
  Sun,
  Droplets,
  ChevronDown,
  MapPin,
  Mail,
  Phone,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "The Process", href: "#process" },
  { name: "Benefits", href: "#benefits" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const testimonials = [
    {
        name: "Priya S.",
        location: "Coimbatore, TN",
        feedback: "The entire process was managed so smoothly. The pre-procedure notifications were a lifesaver, and I felt completely supported by my doctor through the app."
    },
    {
        name: "Amit Patel",
        location: "Erode, TN",
        feedback: "After my Virechana therapy, I tracked my recovery daily. Seeing the progress milestones in the app was incredibly motivating. I've never felt this rejuvenated."
    },
    {
        name: "Sunita Rao",
        location: "Tiruppur, TN",
        feedback: "As a doctor, this platform is revolutionary. I can monitor multiple patients, check their feedback, and adjust treatment plans in real-time. It has elevated the quality of care I provide."
    }
];

const faqs = [
    {
        q: "What exactly is Panchakarma?",
        a: "Panchakarma is the core purification therapy in Ayurveda. The name translates to 'Five Actions,' referring to the five primary procedures used to cleanse the body of toxins, restore balance to the doshas, and rejuvenate the system."
    },
    {
        q: "How long does a full Panchakarma treatment take?",
        a: "The duration varies based on individual health needs. A complete cycle typically involves a pre-therapy phase (Purva Karma), the main therapy (Pradhana Karma), and a post-therapy phase (Paschat Karma), and can last anywhere from 7 to 21 days."
    },
    {
        q: "Is Panchakarma suitable for everyone?",
        a: "While highly beneficial, Panchakarma is a powerful therapy that requires a thorough consultation with a qualified Ayurvedic doctor. It may not be suitable for very young children, the elderly, or individuals with certain acute illnesses. A personalized assessment is crucial."
    },
    {
        q: "How does the PanchakarmaCare app assist in the process?",
        a: "Our app acts as your digital companion. It provides automated schedules for therapies, sends reminders for dietary plans and precautions, allows you to track your progress, and facilitates seamless communication with your doctor, ensuring you are supported at every step."
    }
];


// Reusable component for the subtle background aurora effect
const AuroraBackground = ({ className = '' }) => (
    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-100 rounded-full blur-3xl opacity-20 -z-10 animate-pulse ${className}`} />
);

// Custom hook to track active section
const useActiveSection = (sectionIds) => {
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            sectionIds.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.unobserve(el);
            });
        };
    }, [sectionIds]);

    return activeSection;
};


export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionIds = navLinks.map(link => link.href.substring(1));
  const activeSection = useActiveSection(sectionIds);
  
  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const heroTitle = "Ancient Wisdom,".split(" ");

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-700 overflow-x-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full flex justify-between items-center px-6 md:px-12 py-3 bg-white/80 backdrop-blur-lg shadow-sm">
        <h1 className="text-2xl font-bold font-serif text-stone-800">PanchakarmaCare</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-stone-100 p-2 rounded-full">
          {navLinks.map((link) => {
             const isActive = activeSection === link.href.substring(1);
             return (
              <a key={link.name} href={link.href} className="relative px-4 py-2 text-sm text-stone-600 hover:text-amber-700 transition-colors duration-300">
                {isActive && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white rounded-full z-0"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            )
          })}
        </nav>
        
        <Link to="/login" className="hidden md:inline-block px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
          Login
        </Link>

        <button className="md:hidden z-[60] p-2 rounded-full border border-stone-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="sr-only">Open menu</span>
          {isMenuOpen ? <X className="h-5 w-5 text-stone-800" /> : <Menu className="h-5 w-5 text-stone-800" />}
        </button>
      </header>

      {/* Mobile Menu (Slide-out with Glass Effect) */}
      <AnimatePresence>
        {isMenuOpen && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden fixed inset-0 bg-black/60 z-40"
                    onClick={() => setIsMenuOpen(false)}
                />
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="md:hidden fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white/80 backdrop-blur-xl z-50"
                >
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-stone-200">
                            <h2 className="font-serif font-bold text-xl">Menu</h2>
                        </div>
                        <nav className="flex flex-col p-6 space-y-2">
                             {navLinks.map((link, i) => (
                                <motion.a 
                                    key={link.name} 
                                    href={link.href} 
                                    className="px-4 py-3 text-lg text-stone-700 hover:bg-amber-100 rounded-lg" 
                                    onClick={() => setIsMenuOpen(false)}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </nav>
                        <div className="mt-auto p-6">
                            <Link to="/login" className="block w-full text-center px-6 py-3 bg-amber-600 text-white text-lg rounded-lg shadow-md" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative flex-grow flex items-center px-6 md:px-12 py-16 md:py-24">
        <AuroraBackground />
        <div className="container mx-auto grid md:grid-cols-2 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <motion.h2
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-bold font-serif text-stone-800 leading-tight"
            >
              {heroTitle.map((word, index) => (
                <motion.span key={index} variants={wordVariants} className="inline-block mr-3">
                  {word}
                </motion.span>
              ))}
              <br />
              <span className="text-amber-700">Modern Care</span>
            </motion.h2>
            <p className="mt-6 text-lg text-stone-600 max-w-lg mx-auto md:mx-0">
             PanchakarmaCare seamlessly blends timeless Ayurvedic traditions with modern technology. We empower patients, doctors, and clinics to manage therapies with unparalleled efficiency and authenticity.
            </p>
            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="block px-8 py-3 bg-amber-600 text-white rounded-lg shadow-lg hover:bg-amber-700 transition-colors duration-300">
                    Get Started
                  </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="#features" className="block px-8 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-100 hover:border-stone-400 transition-colors duration-300">
                    Learn More
                  </a>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex justify-center items-center"
          >
            <motion.div
                className="w-96 h-96 bg-stone-200 rounded-full flex items-center justify-center relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
              <motion.div 
                  className="absolute inset-0"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
              >
                  <div className="w-full h-full bg-stone-200 rounded-full" />
              </motion.div>
              <motion.div
                  className="absolute inset-0 bg-amber-500/20 rounded-full"
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 0.5 }}
              />
              <Leaf className="relative z-10 w-32 h-32 text-amber-600/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-20 md:py-28 px-6 md:px-12 bg-white">
        <AuroraBackground className="left-0" />
        <div className="container mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-stone-800">A Platform Built for Authentic Healing</h3>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">Everything you need for a seamless, safe, and effective Panchakarma experience.</p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <FeatureCard icon={<Calendar />} title="Automated Scheduling" desc="Intelligently plan and manage therapy sessions, pre-care, and post-care." />
            <FeatureCard icon={<Bell />} title="Smart Notifications" desc="Receive timely alerts for dietary plans, preparations, and precautions." />
            <FeatureCard icon={<Activity />} title="Real-Time Tracking" desc="Monitor therapy progress, recovery milestones, and vital signs." />
            <FeatureCard icon={<MessageSquare />} title="Doctor-Patient Communication" desc="Share symptoms, improvements, or issues directly with your physician." />
          </motion.div>
        </div>
      </section>

      {/* The Ayurvedic Approach */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-stone-100">
          <AuroraBackground className="left-1/3" />
          <div className="container mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-stone-800">The Ayurvedic Approach: Understanding Your Dosha</h3>
              <p className="mt-4 text-stone-600 max-w-3xl mx-auto">Ayurveda teaches that we are all made of three fundamental energies, or Doshas. Your unique combination determines your physical and mental characteristics. Panchakarma is personalized to balance your specific Dosha.</p>
              <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                  <DoshaCard icon={<Wind className="w-8 h-8 text-amber-700"/>} title="Vata (Air & Ether)" characteristics="Creative, energetic, lively. Prone to anxiety and dryness when imbalanced." />
                  <DoshaCard icon={<Sun className="w-8 h-8 text-amber-700"/>} title="Pitta (Fire & Water)" characteristics="Intelligent, focused, intense. Prone to anger and inflammation when imbalanced." />
                  <DoshaCard icon={<Droplets className="w-8 h-8 text-amber-700"/>} title="Kapha (Earth & Water)" characteristics="Calm, stable, loving. Prone to lethargy and congestion when imbalanced." />
              </motion.div>
          </div>
      </section>

      {/* The Panchakarma Journey */}
      <section id="process" className="relative py-20 md:py-28 px-6 md:px-12 bg-white">
          <AuroraBackground className="left-2/3" />
          <div className="container mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-stone-800">Your Journey to Wellness</h3>
              <p className="mt-4 text-stone-600 max-w-2xl mx-auto">Our platform guides you through every step of the Panchakarma process, ensuring clarity and confidence.</p>
              <div className="mt-12 relative">
                  <div className="hidden md:block absolute top-5 left-0 w-full h-0.5 bg-stone-200"></div>
                  <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="grid md:grid-cols-3 gap-12"
                  >
                      <JourneyStep icon={<Stethoscope />} title="1. Consultation & Planning (Purva Karma)" description="Your Ayurvedic doctor assesses your constitution (Prakriti) and imbalances (Vikriti) to create a personalized pre-therapy plan of diet and oil massages (Snehana & Swedana)." />
                      <JourneyStep icon={<Sparkles />} title="2. Main Therapy (Pradhana Karma)" description="Under your doctor's supervision, the core Panchakarma therapies are administered. Our app provides schedules, precautions, and a direct line to your care team." />
                      <JourneyStep icon={<ShieldCheck />} title="3. Post-Therapy Care (Paschat Karma)" description="A crucial phase of rejuvenation. Receive a customized plan for diet, lifestyle, and herbal supplements to maximize the benefits and sustain your renewed vitality." />
                  </motion.div>
              </div>
          </div>
      </section>

      {/* Who Can Benefit? Section */}
      <section id="benefits" className="relative py-20 md:py-28 px-6 md:px-12 bg-stone-100">
        <AuroraBackground className="left-1/3" />
        <div className="container mx-auto grid md:grid-cols-2 items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-stone-800">Who Can Benefit from Panchakarma?</h3>
            <p className="mt-6 text-stone-600 leading-relaxed">
              Panchakarma is not just for treating diseases; it's a powerful preventative and rejuvenating therapy for maintaining health. It is particularly effective for:
            </p>
            <ul className="mt-6 space-y-3">
                <BenefitItem>Chronic conditions like arthritis, migraines, and allergies.</BenefitItem>
                <BenefitItem>Digestive issues such as IBS, constipation, and acidity.</BenefitItem>
                <BenefitItem>Stress, anxiety, and insomnia.</BenefitItem>
                <BenefitItem>Metabolic disorders and weight management.</BenefitItem>
                <BenefitItem>Anyone seeking deep detoxification and enhanced vitality.</BenefitItem>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="hidden md:flex justify-center items-center">
             <div className="w-96 h-96 bg-stone-200 rounded-lg shadow-xl flex items-center justify-center p-8">
               <p className="text-center text-2xl font-serif text-stone-500 italic">"The greatest wealth is health."</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-white">
          <AuroraBackground className="left-2/3" />
          <div className="container mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-stone-800">Success Stories</h3>
              <p className="mt-4 text-stone-600 max-w-2xl mx-auto">Hear from patients and doctors who have experienced the PanchakarmaCare difference.</p>
              <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                  {testimonials.map((testimonial, index) => (
                      <TestimonialCard key={index} {...testimonial} />
                  ))}
              </motion.div>
          </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="relative py-20 md:py-28 px-6 md:px-12 bg-stone-100">
        <AuroraBackground className="left-1/2" />
        <div className="container mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-stone-800">Frequently Asked Questions</h3>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">Have questions? We’ve got answers. If you have other questions, feel free to reach out.</p>
          <div className="mt-12 max-w-3xl mx-auto space-y-4 text-left">
            {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20 md:py-28 px-6 md:px-12 bg-white">
        <AuroraBackground className="left-full -translate-x-full" />
        <div className="container mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-stone-800">Get In Touch</h3>
          <p className="mt-4 text-stone-600 max-w-lg mx-auto">Have questions or ready to digitalize your clinic? We'd love to hear from you.</p>
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-10 max-w-xl mx-auto grid gap-4 text-left"
          >
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none transition" />
            <input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none transition" />
            <textarea placeholder="Your Message" className="w-full p-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none transition" rows="4"></textarea>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition-all duration-300">Send Message</motion.button>
          </motion.form>
        </div>
      </section>

      <footer className="bg-stone-800 text-stone-300 pt-16 pb-8 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
                <h3 className="text-xl font-bold font-serif text-white">PanchakarmaCare</h3>
                <p className="mt-4 text-stone-400 max-w-md">Seamlessly blending ancient Ayurvedic traditions with modern technology to enhance the healing journey for patients, doctors, and clinics.</p>
            </div>
            <div>
                <h4 className="font-semibold text-white">Quick Links</h4>
                <nav className="mt-4 space-y-2">
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} className="block text-stone-400 hover:text-amber-400 transition-colors">{link.name}</a>
                    ))}
                </nav>
            </div>
            <div>
                <h4 className="font-semibold text-white">Contact Us</h4>
                <div className="mt-4 space-y-3 text-stone-400">
                    <p className="flex items-start"><MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0"/> T.Kavundampalayam, Tamil Nadu, India</p>
                    <p className="flex items-center"><Mail className="w-5 h-5 mr-2"/> contact@panchakarmacare.com</p>
                    <p className="flex items-center"><Phone className="w-5 h-5 mr-2"/> +91 12345 67890</p>
                </div>
            </div>
        </div>
        <div className="container mx-auto mt-12 pt-8 border-t border-stone-700 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-stone-500">&copy; {new Date().getFullYear()} PanchakarmaCare. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white"><Twitter/></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white"><Facebook/></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white"><Instagram/></a>
            </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-components
function FaqItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <motion.div
            initial={false}
            className="bg-white rounded-lg border border-stone-200 overflow-hidden"
        >
            <button 
                className="w-full p-6 flex justify-between items-center text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-stone-800">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-6 h-6 text-amber-600"/>
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="px-6 pb-6"
                    >
                        <p className="text-stone-600">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function FeatureCard({ icon, title, desc }) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };
  return (
    <motion.div
      variants={itemVariants}
      className="p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
    >
      <div className="bg-amber-100 p-4 rounded-full">
        {icon && typeof icon === 'object' && 'props' in icon ? 
          Object.assign(Object.create(Object.getPrototypeOf(icon)), icon, { props: {...icon.props, className: 'w-8 h-8 text-amber-700'} }) 
          : icon
        }
      </div>
      <h4 className="mt-5 text-lg font-semibold text-stone-800">{title}</h4>
      <p className="mt-2 text-stone-600">{desc}</p>
    </motion.div>
  );
}

function JourneyStep({ icon, title, description }) {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };
    return (
        <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center">
             <div className="absolute -top-5 md:top-2.5 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-stone-200 md:hidden"></div>
            <div className="z-10 bg-amber-600 text-white p-4 rounded-full shadow-lg">
                {icon}
            </div>
            <h4 className="mt-4 text-lg font-semibold text-stone-800">{title}</h4>
            <p className="mt-2 text-stone-600">{description}</p>
        </motion.div>
    );
}

function BenefitItem({ children }) {
    return (
        <li className="flex items-start">
            <Heart className="w-5 h-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
            <span>{children}</span>
        </li>
    );
}

function TestimonialCard({ name, location, feedback }) {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };
    return (
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl border border-stone-200 flex flex-col text-left hover:shadow-xl transition-shadow duration-300">
            <Quote className="w-8 h-8 text-amber-300" />
            <p className="mt-4 text-stone-600 flex-grow">"{feedback}"</p>
            <div className="mt-6">
                <p className="font-bold text-stone-800">{name}</p>
                <p className="text-sm text-stone-500">{location}</p>
            </div>
        </motion.div>
    );
}

function DoshaCard({ icon, title, characteristics }) {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };
    return (
        <motion.div variants={itemVariants} className="p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
            <div className="bg-amber-100 p-4 rounded-full">{icon}</div>
            <h4 className="mt-5 text-xl font-semibold font-serif text-stone-800">{title}</h4>
            <p className="mt-2 text-stone-600">{characteristics}</p>
        </motion.div>
    );
}

