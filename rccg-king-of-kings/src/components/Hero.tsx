import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[600px] bg-primary overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
          opacity: 0.4,
        }}
      ></div>
      {/* Blue background overlay (bg-primary) is already set on parent */}
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/* Hero content */}
      <div className="relative h-full flex items-center justify-center text-center text-white px-4 z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to RCCG King of Kings Parish
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            A place of worship, fellowship, and spiritual growth
          </p>
          <div className="space-x-4">
            <a
              href="#services"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            >
              Our Services
            </a>
            <a
              href="/contact"
              className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition duration-300"
            >
              Join Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 