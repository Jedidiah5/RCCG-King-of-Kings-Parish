import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const DynamicEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsQuery = query(collection(db, 'events'), orderBy('date', 'asc'));
        const eventsSnapshot = await getDocs(eventsQuery);
        const eventsData = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
          {event.image && (
            <div className="h-48 bg-gray-200">
              <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-primary mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              {event.date} {event.time && `at ${event.time}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicEvents;
