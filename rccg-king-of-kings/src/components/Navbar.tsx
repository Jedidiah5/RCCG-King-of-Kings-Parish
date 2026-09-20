import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-primary/95 text-white shadow-lg backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-white">
            <img src={logo} alt="RCCG Logo" className="h-9 w-9 rounded-full bg-white/10 object-contain p-0.5" />
            <div className="hidden leading-tight sm:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">RCCG</p>
              <p className="text-sm font-semibold">King of Kings</p>
            </div>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {currentUser && (
              <Link to="/admin" className="text-sm font-medium text-white/80 hover:text-white">
                Admin
              </Link>
            )}
            <Link
              to="/contact"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-slate-100"
            >
              Join Us
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative h-5 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-white transition ${isOpen ? 'top-2 rotate-45' : 'top-0.5'}`} />
              <span className={`absolute left-0 top-2 h-0.5 w-5 bg-white transition ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-white transition ${isOpen ? 'top-2 -rotate-45' : 'top-3.5'}`} />
            </div>
          </button>
        </div>
      </div>

      <div className={`border-t border-white/10 bg-primary md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-1 px-4 py-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block rounded-xl px-3 py-2.5 text-base font-medium ${
                  isActive ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          {currentUser && (
            <Link
              to="/admin"
              className="block rounded-xl px-3 py-2.5 text-base font-medium text-white/80 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
          <Link
            to="/contact"
            className="mt-2 block rounded-xl bg-white px-3 py-2.5 text-center text-base font-semibold text-primary"
            onClick={() => setIsOpen(false)}
          >
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
