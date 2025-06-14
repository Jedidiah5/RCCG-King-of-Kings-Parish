import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceTimes from './components/ServiceTimes';
import pastorAdeboye from './assets/DaddyGO.jpg'
import pastorFolu from './assets/MummyGO.jpg'
import pastorOdesola from './assets/asstGO.jpg'
import praiseImg from './praiseImg.png'
import youthImg from './youthImg.jpeg'
import thanksgiving from './thanksgiving.jpg'

// Animation Component Wrapper
const AnimatedSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
  <div>
    <AnimatedSection>
      <Hero />
    </AnimatedSection>
    
    <AnimatedSection delay={300}>
      <ServiceTimes />
    </AnimatedSection>
    
    {/* Upcoming Events Section */}
    <AnimatedSection delay={600}>
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Upcoming Events</h2>
          <div className="relative overflow-hidden">
            <div className="flex animate-carousel">
              {[
                {
                  title: "Extravagant Praise",
                  description: "Every 3rd Thursday of the month we come together to celebrate God (5-6pm)",
                  image: praiseImg
                },
                {
                  title: "Youth Service",
                  description: "Every 3rd Sunday of the month the youth take charge of the service",
                  image: youthImg
                },
                {
                  title: "Thanksgiving Service",
                  description: "Every First Sunday of the month ",
                  image: thanksgiving
                }
              ].map((event, index) => (
                <div key={index} className="flex-none w-full md:w-1/2 lg:w-1/3 px-4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                    <div className="h-48 bg-gray-200">
                    <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-primary mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <button className="text-primary font-semibold hover:text-secondary transition duration-300">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate events for infinite scroll effect */}
              {[
                {
                  title: "Extravagant Praise",
                  description: "Every 3rd Thursday of the month we come together to celebrate God (5-6pm)",
                  image: "praise.jpg"
                },
                {
                  title: "Bible Study",
                  description: "Join us every Wednesday evening for an in-depth study of God's word (7-8:30pm)",
                  image: "bible-study.jpg"
                },
                {
                  title: "Youth Fellowship",
                  description: "Monthly gathering for young people to connect and grow in faith (Last Saturday, 4-6pm)",
                  image: "youth.jpg"
                }
              ].map((event, index) => (
                <div key={`duplicate-${index}`} className="flex-none w-full md:w-1/2 lg:w-1/3 px-4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                    <div className="h-48 bg-gray-200">
                      {/* Add event image here */}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-primary mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <button className="text-primary font-semibold hover:text-secondary transition duration-300">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>

    <style>
      {`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-carousel {
          animation: carousel 30s linear infinite;
          display: flex;
          width: 200%;
        }
        .animate-carousel:hover {
          animation-play-state: paused;
        }
      `}
    </style>

    {/* Latest Sermons Section */}
    <AnimatedSection delay={900}>
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Latest Sermons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-x-auto">
            {[1, 2].map((sermon) => (
              <div key={sermon} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-primary mb-4">Sermon Title</h3>
                <p className="text-gray-600 mb-4">Sermon description and key points go here.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Date: DD/MM/YYYY</span>
                  <button className="text-primary font-semibold hover:text-secondary transition duration-300">
                    Watch Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  </div>
);

const About = () => (
  <div className="min-h-screen">
    <AnimatedSection>
      <div className="relative h-[400px] bg-primary">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        </div>
      </div>
    </AnimatedSection>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <AnimatedSection delay={300}>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              The Redeemed Christian Church of God (RCCG) was founded in 1952 by Reverend Josiah Olufemi Akindayomi in Nigeria.
               Akindayomi, after a spiritual awakening, established the church based on a divine revelation and a covenant with God.
                The church's name was also revealed to Akindayomi in a vision. RCCG has since grown significantly, expanding both within Nigeria and internationally. 
            </p>
            <p className="text-gray-600">
            Early Years:
            The church initially met at 9 Willoughby Street, Lagos, and later relocated to 
            its current headquarters at 1-5 Redemption Way, Ebute-Metta, Lagos. 
            </p>
            <p className="text-gray-600">
            Leadership:
            In the 1970s, Akindayomi appointed Pastor Enoch Adejare 
            Adeboye as his successor, who became the General Overseer and
             led the church to significant growth and international expansion. 
            </p>
            <p className="text-gray-600">
            Growth and Expansion:
            RCCG has grown to include tens of thousands of parishes in Nigeria and branches in over a hundred countries. 
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Mission & Vision</h2>
            <p className="text-gray-600 mb-4">
            The missions for the Redeemed Christian Church of God Worldwide are:
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">To make heaven</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">To take as many people with us</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">To have a member of RCCG in every family of all nations</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">To accomplish No. 1 above, holiness will be our lifestyle</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">To accomplish No. 2 and 3 above, we will plant churches within five minutes walking 
                  distance in every city and town of developing countries and within five minutes driving distance in every city and town 
                  of developed countries.</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">We will pursue these objectives until every Nation in the world is reached for the Lord Jesus Christ</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={900}>
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.position}</p>
                <p className="text-gray-500 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

const Programs = () => (
  <div className="min-h-screen">
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">Our Programs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection delay={300}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Sunday Service</h2>
              <p className="text-gray-600">Sunday school starts around 7am, the main sercice begins around 9 and ends 11am.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={600}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Digging deep</h2>
              <p className="text-gray-600">We come together to dig deep into the word of God as you attend may you be blessed.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={900}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Faith clinic</h2>
              <p className="text-gray-600">We come together to pray on behalf of our nation and the church as you attend may you be blessed.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={1200}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Extravagant Praise</h2>
              <p className="text-gray-600">Once a month on the 3rd thursday we come to praise and give thanks to God</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={1500}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Youth Service</h2>
              <p className="text-gray-600">We come together to dig deep into the word of God as you attend may you be blessed.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={1800}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Thanksgiving Service</h2>
              <p className="text-gray-600">We come together to dig deep into the word of God as you attend may you be blessed.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  </div>
);

const Pastor = () => (
  <div className="min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Pastor</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-64 h-64 bg-gray-200 rounded-full">
            {/* Add pastor's image here */}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Pastor's Name</h2>
            <p className="text-gray-600">Add pastor's bio here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="min-h-screen">
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection delay={300}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary">
                  Send Message
                </button>
              </form>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={600}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <p className="text-gray-600">Emerald Estate Lokogoma</p>
                <p className="text-gray-600">08036162680</p>
                <p className="text-gray-600">dewise02@yahoo.com</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="bg-gray-50 w-screen overflow-x-hidden">
        {isLoading && <LoadingAnimation />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
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