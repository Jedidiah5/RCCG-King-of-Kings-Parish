import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const DynamicEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsQuery = query(collection(db, 'events'), orderBy('date', 'asc'));
        const eventsSnapshot = await getDocs(eventsQuery);
        const eventsData = eventsSnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data()
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
      <div className="flex items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-primary" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
        No upcoming events have been published yet. Check back soon.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <article key={event.id} className="site-card overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
          {event.image ? (
            <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
          ) : (
            <div className="flex h-32 items-center justify-center bg-slate-100 text-sm text-slate-400">
              Upcoming event
            </div>
          )}
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
              {event.date}{event.time && ` · ${event.time}`}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">{event.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{event.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default DynamicEvents;
