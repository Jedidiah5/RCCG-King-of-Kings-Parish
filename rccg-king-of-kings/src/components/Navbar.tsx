import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BuildingOffice2Icon } from '@heroicons/react/24/solid';
import logo from '../logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary text-white shadow-lg w-full overflow-x-hidden z-50">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 relative">
          <div className="flex items-center z-10">
            <Link to="/" className="text-white hover:text-purple-300 transition-colors duration-300">
              <img src={logo} alt="RCCG Logo" className="h-7 w-7 object-contain rounded-full" />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-baseline space-x-2 sm:space-x-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-2 sm:px-3 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                      isActive ? '' : 'text-white hover:text-white'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-current transform transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                    }`}></span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white bg-transparent border-none shadow-none focus:outline-none focus:ring-0 active:bg-transparent active:shadow-none transition-all duration-300"
              style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}
            >
              <div className="relative w-6 h-6 bg-transparent" style={{ background: 'transparent' }}>
                <div className={`absolute inset-0 transition-all duration-300 transform ${
                  isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`}>
                  <div className="w-6 h-0.5 bg-white transform transition-all duration-300"></div>
                </div>
                <div className={`absolute inset-0 transition-all duration-300 transform ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="w-6 h-0.5 bg-white transform transition-all duration-300"></div>
                </div>
                <div className={`absolute inset-0 transition-all duration-300 transform ${
                  isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`}>
                  <div className="w-6 h-0.5 bg-white transform transition-all duration-300"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-primary w-full fixed top-16 left-0 z-50 transition-all duration-300 transform ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 text-base font-medium transition-colors duration-300 whitespace-nowrap ${
                  isActive ? 'text-purple-300' : 'text-white hover:bg-secondary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 