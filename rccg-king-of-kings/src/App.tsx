import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
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
const AnimatedSection = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Pages
const Home = () => (
  <div>
    <AnimatedSection>
      <Hero />
    </AnimatedSection>
    
    <AnimatedSection>
      <ServiceTimes />
    </AnimatedSection>
    
    {/* Upcoming Events Section */}
    <AnimatedSection className="hidden md:block">
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Upcoming Events</h2>
          <div className="relative overflow-hidden w-full sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto">
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
                <div key={index} className="flex-none w-4/5 sm:w-1/2 md:w-1/3 px-2">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                    <div className="h-40 sm:h-48 bg-gray-200">
                      <img src={event.image} alt={event.title} className="h-40 sm:h-48 w-full object-cover" />
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
                  image: praiseImg
                },
                {
                  title: "Bible Study",
                  description: "Join us every Wednesday evening for an in-depth study of God's word (7-8:30pm)",
                  image: youthImg
                },
                {
                  title: "Youth Fellowship",
                  description: "Monthly gathering for young people to connect and grow in faith (Last Saturday, 4-6pm)",
                  image: thanksgiving
                }
              ].map((event, index) => (
                <div key={`duplicate-${index}`} className="flex-none w-4/5 sm:w-1/2 md:w-1/3 px-2">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                    <div className="h-40 sm:h-48 bg-gray-200">
                      <img src={event.image} alt={event.title} className="h-40 sm:h-48 w-full object-cover" />
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

    {/* Latest Sermons Section */}
    <AnimatedSection>
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Recent Sermons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "RCCG HOLY GHOST SERVICE",
                description: "Live recording for Holy Ghost Service",
                date: "06/06/2025",
                link: "https://www.youtube.com/live/F24Y-duChYE?si=nsoNtTcXUaEhiAc6"
              },
              {
                title: "RCCG JUNE 1st 2025 | THANKSGIVING SERVICE",
                description: "Live recording for Special Thanksgiving.",
                date: "01/06/2025",
                link: "https://www.youtube.com/live/un3i8uHJla8?si=Zki67Qs1rXLWoaJP"
              }
            ].map((sermon, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-primary mb-4">{sermon.title}</h3>
                <p className="text-gray-600 mb-4">{sermon.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Date: {sermon.date}</span>
                  <a href={sermon.link} className="text-primary font-semibold hover:text-secondary transition duration-300">
                    Watch Now →
                  </a>
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
          <div className="relative h-[400px] bg-primary overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSZ1AgxqtUBaCEBrRwtKTZoIQjLCU5VGAglt5JYJW1iDnSiBMbVt9Y7ifiaFU70MZh4lPiZhaYfoO-MJIIxPf00-w')",
          opacity: 0.4,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        </div>
    </div>
    </AnimatedSection>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <AnimatedSection>
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

        <AnimatedSection>
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
                <p className="ml-3 text-gray-600">To preach the gospel of our Lord Jesus Christ to all the ends of the world</p>
                </div>
                <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">Holiness will be our lifestyle</p>
                </div>
                <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">All people will be holy</p>
                </div>
                <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">That all our members will raise to the top in all their endeavors</p>
                </div>
                <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">That every member of the Redeemed Christian Church of God will be a person of integrity and honesty</p>
                </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <img
                src={pastorAdeboye}
                alt="Leader Name"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-primary mb-1">Pastor E.A. Adeboye</h3>
              <p className="text-gray-600 text-sm">General Overseer</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <img
                src={pastorFolu}
                alt="Leader Name"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-primary mb-1">Pastor Folu Adeboye</h3>
              <p className="text-gray-600 text-sm">Mother in Israel</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <img
                src={pastorOdesola}
                alt="Leader Name"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-primary mb-1">Pastor J.F. Odesola</h3>
              <p className="text-gray-600 text-sm">Assistant General Overseer</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Leader Name"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-primary mb-1">Sister Emily White</h3>
              <p className="text-gray-600 text-sm">Worship Leader</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

const Programs = () => (
  <div className="min-h-screen">
    <AnimatedSection>
      <div className="relative h-[400px] bg-primary overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSZ1AgxqtUBaCEBrRwtKTZoIQjLCU5VGAglt5JYJW1iDnSiBMbVt9Y7ifiaFU70MZh4lPiZhaYfoO-MJIIxPf00-w')",
            opacity: 0.4,
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our Programs</h1>
        </div>
      </div>
    </AnimatedSection>

    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-secondary relative animated-underline">Our Programs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Sunday Service</h2>
              <p className="text-gray-600">Sunday school starts around 7am, the main sercice begins around 9 and ends 11am.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Digging deep</h2>
              <p className="text-gray-600">We come together to dig deep into the word of God as you attend may you be blessed.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Faith clinic</h2>
              <p className="text-gray-600">We come together to pray on behalf of our nation and the church as you attend may you be blessed.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Extravagant Praise</h2>
              <p className="text-gray-600">Once a month on the 3rd thursday we come to praise and give thanks to God</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Youth Service</h2>
              <p className="text-gray-600">We come together to dig deep into the word of God as you attend may you be blessed.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-primary">Thanksgiving Service</h2>
              <p className="text-gray-600">Every first Sunday of the month is a time to give thanks to God.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  </div>
);

const Pastor = () => (
  <div className="min-h-screen">
    <AnimatedSection>
      <div className="relative h-[400px] bg-primary">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our Pastor</h1>
        </div>
      </div>
    </AnimatedSection>

    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://via.placeholder.com/200"
              alt="Pastor's Name"
              className="w-48 h-48 rounded-full object-cover mb-6 shadow-lg"
            />
            <h2 className="text-3xl font-bold text-primary mb-4">Pastor John Doe</h2>
            <p className="text-gray-600 mb-4">
              Pastor John Doe is the lead pastor of RCCG King of Kings Parish. With a heart for God and a passion for people, he has been faithfully serving the congregation for over [Number] years. His insightful teachings and compassionate leadership have inspired countless individuals to grow in their faith and live purpose-driven lives.
            </p>
            <p className="text-gray-600 mb-4">
              Pastor John is committed to fostering a welcoming and spiritually enriching environment where everyone can experience God's love and discover their unique calling. He believes in the power of prayer and the importance of community, guiding the church with wisdom and grace.
            </p>
            <p className="text-gray-600">
              He is happily married to [Wife's Name] and they are blessed with [Number] children. When he's not ministering, Pastor John enjoys [Hobbies/Interests].
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://via.placeholder.com/200"
              alt="Pastor's Wife Name"
              className="w-48 h-48 rounded-full object-cover mb-6 shadow-lg"
            />
            <h2 className="text-3xl font-bold text-primary mb-4">Pastor's Wife Name</h2>
            <p className="text-gray-600 mb-4">
              [Wife's Name] serves alongside Pastor John, providing invaluable support and leadership to the church. She has a deep love for the congregation and is actively involved in various ministries, particularly those focused on women and families. Her warmth and wisdom are a blessing to all who encounter her.
            </p>
            <p className="text-gray-600 mb-4">
              She is passionate about empowering individuals to live out their faith boldly and to build strong, godly families. Her gentle spirit and unwavering commitment to Christ are an inspiration to many. [Wife's Name] also enjoys [Hobbies/Interests] in her free time.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  </div>
);

const Contact = () => (
  <div className="min-h-screen">
    <AnimatedSection>
      <div className="relative h-[400px] bg-primary">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
        </div>
      </div>
    </AnimatedSection>

    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-4">We'd love to hear from you! Whether you have questions, prayer requests, or just want to say hello, feel free to reach out using the contact information or the form below.</p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                  <textarea id="message" rows={5} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <button type="submit" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300">Send Message</button>
              </form>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-2"><strong className="text-primary">Address:</strong> 123 Church St, City, State, 12345</p>
              <p className="text-gray-600 mb-2"><strong className="text-primary">Phone:</strong> (123) 456-7890</p>
              <p className="text-gray-600 mb-4"><strong className="text-primary">Email:</strong> info@rccgkingofkings.org</p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Social Media</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-primary hover:text-secondary transition duration-300">
                    {/* Facebook Icon */}
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-secondary transition duration-300">
                    {/* Twitter Icon */}
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22.047 2.118a8.397 8.397 0 01-2.353.643 4.195 4.195 0 001.83-2.257 8.396 8.396 0 01-2.659 1.018 4.194 4.194 0 00-7.142 3.816 11.884 11.884 0 01-8.62-4.351 4.192 4.192 0 001.299 5.597 4.195 4.195 0 01-1.897-.525v.05c0 4.558 3.235 8.332 7.525 9.18a4.195 4.195 0 01-1.886.072 4.193 4.193 0 003.924 2.915 8.397 8.397 0 01-5.197 1.794c-.339 0-.67-.02-.997-.058a11.887 11.887 0 006.438 1.882c7.765 0 12.01-6.438 12.01-12.01 0-.183-.004-.367-.012-.55a8.55 8.55 0 002.091-2.179z" />
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-secondary transition duration-300">
                    {/* Instagram Icon */}
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.336 14.137c-1.398.815-3.072 1.258-4.757 1.258-1.685 0-3.359-.443-4.757-1.258C5.074 15.32 4.19 13.791 4.19 12c0-1.791.884-3.32 2.336-4.137 1.398-.815 3.072-1.258 4.757-1.258 1.685 0 3.359.443 4.757 1.258C18.926 8.68 19.81 10.209 19.81 12c0 1.791-.884 3.32-2.336 4.137zM12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" clipRule="evenodd" />
                      <circle cx={12} cy={12} r={3.5} />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/pastor" element={<Pastor />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>&copy; 2023 RCCG King of Kings. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 