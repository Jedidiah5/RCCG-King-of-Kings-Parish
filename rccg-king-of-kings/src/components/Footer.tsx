import { Link, useLocation } from 'react-router-dom';
import logo from '../logo.png';

const Footer = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t border-white/10 bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-3 text-white">
            <img src={logo} alt="RCCG Logo" className="h-11 w-11 rounded-full bg-white/10 object-contain p-1" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">RCCG</p>
              <p className="text-lg font-semibold">King of Kings Parish</p>
            </div>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
            A place of worship, fellowship, and spiritual growth in Emerald Estate, Lokogoma, Abuja.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Visit</h2>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Emerald+Estate+Lokogoma+Abuja"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-white"
            >
              Emerald Estate, Lokogoma, Abuja
            </a>
            <a href="tel:08036162680" className="block hover:text-white">08036162680</a>
            <a href="mailto:rccgkingofkings@gmail.com" className="block hover:text-white">
              rccgkingofkings@gmail.com
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Explore</h2>
          <div className="mt-4 grid gap-2 text-sm">
            <Link to="/about" className="text-white/80 hover:text-white">About Us</Link>
            <Link to="/programs" className="text-white/80 hover:text-white">Programs</Link>
            <Link to="/gallery" className="text-white/80 hover:text-white">Gallery</Link>
            <Link to="/contact" className="text-white/80 hover:text-white">Contact</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} RCCG King of Kings Parish. All rights reserved.</p>
          <p>Sunday service · 9:00 AM – 11:00 AM</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
