const ServiceTimes = () => {
  const services = [
    {
      name: 'Sunday Service',
      time: '9:00 AM – 11:00 AM',
      description: 'Main worship service with praise, worship, and sermon',
    },
    {
      name: 'Digging Deep',
      time: 'Tuesdays 5:00 PM – 6:00 PM',
      description: 'In-depth study of God\'s word',
    },
    {
      name: 'Faith Clinic',
      time: 'Fridays 5:00 PM – 6:00 PM',
      description: 'Prayer for the church and the nation',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">This week</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Service Times</h2>
          <p className="mt-3 text-slate-500">Come worship with us in Emerald Estate, Lokogoma.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.name} className="site-card p-6 transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {service.time}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{service.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTimes;
