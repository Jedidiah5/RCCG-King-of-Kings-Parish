interface PageBannerProps {
  title: string;
  subtitle?: string;
  image?: string;
}

const PageBanner = ({ title, subtitle, image }: PageBannerProps) => (
  <div className="relative isolate overflow-hidden bg-primary pt-16">
    {image && (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/92 via-[#0f2444]/85 to-[#0b1b33]/90" />
    <div className="relative mx-auto max-w-7xl px-4 py-20 text-center text-white sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
        RCCG King of Kings Parish
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 md:text-lg">{subtitle}</p>
      )}
    </div>
  </div>
);

export default PageBanner;
