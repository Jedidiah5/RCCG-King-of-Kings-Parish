import React from 'react';
// import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const ServiceTimes = () => {
  const services = [
    {
      name: 'Sunday Service',
      time: '9:00 AM - 11:00 AM',
      description: 'Main worship service with praise, worship, and sermon',
    },
    {
      name: 'Digging deep',
      time: 'Tuesdays 5:00 PM - 6:00 PM',
      description: 'In-depth study of God\'s word',
    },
    {
      name: 'Faith clinic',
      time: 'Friday 5:00 PM - 6:00 PM',
      description: 'Prayer for the church and the Nation',
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Times</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-primary mb-4">{service.name}</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  {/* <ClockIcon className="h-5 w-5 mr-2" /> */}
                  <span>{service.time}</span>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceTimes; 