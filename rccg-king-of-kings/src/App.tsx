import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, ReactNode } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceTimes from './components/ServiceTimes';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import DynamicEvents from './components/DynamicEvents';
import DynamicSermons from './components/DynamicSermons';
import DynamicAnnouncements from './components/DynamicAnnouncements';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import PageBanner from './components/PageBanner';
import { AuthProvider } from './contexts/AuthContext';
import pastorAdeboye from './assets/DaddyGO.jpg'
import pastorFolu from './assets/MummyGO.jpg'
import pastorOdesola from './assets/asstGO.jpg'

// Animation Component Wrapper
interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedSection = ({ children, delay = 0, className = '' }: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
};

// Loading Animation Component
const LoadingAnimation = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  </div>
);

// Pages
const Home = () => (
  <div className="pt-16">
    <AnimatedSection>
      <Hero />
    </AnimatedSection>

    <AnimatedSection delay={200}>
      <ServiceTimes />
    </AnimatedSection>

    <AnimatedSection delay={250} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <DynamicAnnouncements />
    </AnimatedSection>

    <AnimatedSection delay={350}>
      <section className="bg-[#f3f5f8] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">Calendar</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Upcoming Events</h2>
            <p className="mt-3 text-slate-500">Join us for special gatherings and parish programs.</p>
          </div>
          <DynamicEvents />
        </div>
      </section>
    </AnimatedSection>

    <AnimatedSection delay={450}>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">Watch</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Recent Sermons</h2>
            <p className="mt-3 text-slate-500">Catch up on messages from our worship services.</p>
          </div>
          <DynamicSermons />
        </div>
      </section>
    </AnimatedSection>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-[#f3f5f8]">
    <AnimatedSection>
      <PageBanner
        title="About Us"
        subtitle="The story, mission, and leadership of RCCG King of Kings Parish"
        image="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSZ1AgxqtUBaCEBrRwtKTZoIQjLCU5VGAglt5JYJW1iDnSiBMbVt9Y7ifiaFU70MZh4lPiZhaYfoO-MJIIxPf00-w"
      />
    </AnimatedSection>

    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <AnimatedSection delay={200}>
          <div className="site-card h-full p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">Our story</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">How RCCG began</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                The Redeemed Christian Church of God (RCCG) was founded in 1952 by Reverend Josiah Olufemi Akindayomi in Nigeria.
                After a spiritual awakening, he established the church based on a divine revelation and a covenant with God.
                The church's name was also revealed to Akindayomi in a vision. RCCG has since grown significantly, expanding both within Nigeria and internationally.
              </p>
              <p>
                <span className="font-semibold text-slate-800">Early years:</span> The church initially met at 9 Willoughby Street, Lagos, and later relocated to its current headquarters at 1-5 Redemption Way, Ebute-Metta, Lagos.
              </p>
              <p>
                <span className="font-semibold text-slate-800">Leadership:</span> In the 1970s, Akindayomi appointed Pastor Enoch Adejare Adeboye as his successor, who became the General Overseer and led the church to significant growth and international expansion.
              </p>
              <p>
                <span className="font-semibold text-slate-800">Growth:</span> RCCG has grown to include tens of thousands of parishes in Nigeria and branches in over a hundred countries.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={350}>
          <div className="site-card h-full p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">Mission & vision</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">What we pursue</h2>
            <p className="mt-5 text-sm text-slate-500">
              The missions of the Redeemed Christian Church of God Worldwide are:
            </p>
            <div className="mt-5 space-y-3">
              {[
                'To make heaven',
                'To take as many people with us',
                'To have a member of RCCG in every family of all nations',
                'To accomplish No. 1 above, holiness will be our lifestyle',
                'To accomplish No. 2 and 3 above, we will plant churches within five minutes walking distance in every city and town of developing countries and within five minutes driving distance in every city and town of developed countries.',
                'We will pursue these objectives until every Nation in the world is reached for the Lord Jesus Christ'
              ].map((item) => (
                <div key={item} className="flex items-start">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="ml-3 text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={500}>
        <div className="mt-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">Leadership</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Our Leadership Team</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Pastor Enoch Adejare Adeboye",
                position: "General Overseer",
                description: "The General Overseer of the Redeemed Christian Church of God worldwide since 1981. Under his leadership, RCCG has grown to become one of the largest Pentecostal churches in the world.",
                image: pastorAdeboye
              },
              {
                name: "Pastor Folu Adeboye",
                position: "Mother in Israel",
                description: "The wife of the General Overseer and Mother in Israel of RCCG. She serves as a spiritual mother to millions of women across the globe.",
                image: pastorFolu
              },
              {
                name: "Pastor Johnson Odesola",
                position: "Assistant General Overseer",
                description: "Serves as the Assistant General Overseer (Admin/Personnel) of RCCG, overseeing the administrative and personnel matters of the church.",
                image: pastorOdesola
              }
            ].map((member, index) => (
              <div key={index} className="site-card p-6 text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full bg-slate-200 ring-4 ring-primary/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{member.position}</p>
                <p className="mt-3 text-sm leading-6 text-slate-500">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

const Programs = () => {
  const programs = [
    {
      name: 'Sunday Service',
      time: 'Sunday · 7:00 AM school · 9:00–11:00 AM service',
      description: 'Sunday school starts around 7am. The main service begins around 9 and ends at 11am.'
    },
    {
      name: 'Digging Deep',
      time: 'Tuesdays · 5:00–6:00 PM',
      description: 'We come together to dig deep into the word of God. As you attend, may you be blessed.'
    },
    {
      name: 'Faith Clinic',
      time: 'Fridays · 5:00–6:00 PM',
      description: 'We come together to pray on behalf of our nation and the church. As you attend, may you be blessed.'
    },
    {
      name: 'Extravagant Praise',
      time: '3rd Thursday of the month',
      description: 'Once a month on the 3rd Thursday we come to praise and give thanks to God.'
    },
    {
      name: 'Youth Service',
      time: 'Youth gathering',
      description: 'Young people gather to worship, study the word, and grow together in faith.'
    },
    {
      name: 'Thanksgiving Service',
      time: 'Special Sunday',
      description: 'A time to give thanks to God for His goodness over our families and the parish.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <AnimatedSection>
        <PageBanner
          title="Our Programs"
          subtitle="Weekly services and special gatherings for the whole family"
        />
      </AnimatedSection>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {programs.map((program, index) => (
            <AnimatedSection key={program.name} delay={150 + index * 80}>
              <div className="site-card h-full p-6 transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {program.time}
                </p>
                <h2 className="mt-4 text-xl font-semibold text-slate-900">{program.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{program.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};


const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <AnimatedSection>
        <PageBanner
          title="Contact Us"
          subtitle="We would love to welcome you. Send a message or visit us in Lokogoma."
        />
      </AnimatedSection>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <AnimatedSection delay={200}>
            <div className="site-card p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Get in touch</h2>
              <p className="mt-2 text-sm text-slate-500">Share your name and how we can pray with you or help you visit.</p>
              {sent ? (
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-6 text-sm text-emerald-800">
                  Thank you. Your message has been noted. Please also call or email us if you need a quicker response.
                </div>
              ) : (
                <form
                  className="mt-6 space-y-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSent(true);
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Name</label>
                    <input type="text" required placeholder="Enter your full name" className="site-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input type="email" required placeholder="Enter your email address" className="site-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Phone number</label>
                    <input type="tel" placeholder="Enter your phone number" className="site-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Message</label>
                    <textarea rows={4} required placeholder="Type your message here..." className="site-field resize-none" />
                  </div>
                  <button type="submit" className="site-btn-primary w-full py-3">
                    Send message
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={350}>
            <div className="space-y-6">
              <div className="site-card p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-slate-900">Visit the parish</h2>
                <div className="mt-6 space-y-5 text-sm">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Emerald+Estate+Lokogoma+Abuja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start text-slate-600 hover:text-primary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Emerald Estate, Lokogoma, Abuja
                  </a>
                  <a href="tel:08036162680" className="flex items-center text-slate-600 hover:text-primary">
                    <span className="mr-3 font-semibold text-primary">Call</span>
                    08036162680
                  </a>
                  <a href="mailto:rccgkingofkings@gmail.com" className="flex items-center text-slate-600 hover:text-primary">
                    <span className="mr-3 font-semibold text-primary">Email</span>
                    rccgkingofkings@gmail.com
                  </a>
                </div>
              </div>
              <div className="site-card p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-slate-900">Sunday service</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Join us from 9:00 AM to 11:00 AM. Sunday school begins around 7:00 AM.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="w-screen overflow-x-hidden bg-[#f3f5f8]">
          {isLoading && <LoadingAnimation />}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Add these styles at the end of the file, before the export
const styles = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes spin-reverse {
    to {
      transform: rotate(-360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  .animate-spin-reverse {
    animation: spin-reverse 1s linear infinite;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .animate-slideIn {
    animation: slideIn 0.6s ease-out forwards;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default App; 