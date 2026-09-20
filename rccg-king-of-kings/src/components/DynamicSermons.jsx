import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const DynamicSermons = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const sermonsQuery = query(collection(db, 'sermons'), orderBy('date', 'desc'));
        const sermonsSnapshot = await getDocs(sermonsQuery);
        const sermonsData = sermonsSnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }));
        setSermons(sermonsData);
      } catch (error) {
        console.error('Error fetching sermons:', error);
      }
      setLoading(false);
    };

    fetchSermons();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-primary" />
      </div>
    );
  }

  if (sermons.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
        Recent sermons will appear here once they are published.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {sermons.map((sermon) => (
        <article key={sermon.id} className="site-card p-6 transition hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
            {sermon.speaker && `${sermon.speaker} · `}{sermon.date}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{sermon.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{sermon.description}</p>
          <a
            href={sermon.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            Watch now →
          </a>
        </article>
      ))}
    </div>
  );
};

export default DynamicSermons;
