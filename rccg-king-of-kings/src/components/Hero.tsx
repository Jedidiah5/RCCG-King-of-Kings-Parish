import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative isolate min-h-[620px] overflow-hidden bg-primary md:min-h-[700px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://livingourbible.com/wp-content/uploads/2024/05/2017_1largeimg07_jan_2017_190307416.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1b33]/80 via-primary/75 to-[#0f2444]/85" />

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-5xl flex-col items-center justify-center px-4 py-24 text-center text-white md:min-h-[700px]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
          Emerald Estate · Lokogoma · Abuja
        </p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Welcome to RCCG King of Kings Parish
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
          A place of worship, fellowship, and spiritual growth. Join us as we seek God together.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/programs" className="site-btn">
            Our Programs
          </Link>
          <Link to="/contact" className="site-btn-outline">
            Plan Your Visit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
