import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const DynamicAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsQuery = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
        const announcementsSnapshot = await getDocs(announcementsQuery);
        const announcementsData = announcementsSnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }));
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-primary" />
      </div>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  const priorityStyles = {
    urgent: 'border-red-200 bg-red-50 text-red-700',
    high: 'border-amber-200 bg-amber-50 text-amber-700',
    normal: 'border-emerald-200 bg-emerald-50 text-emerald-700'
  };

  return (
    <section className="py-16">
      <div className="site-card p-6 sm:p-8">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">Parish notice</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Announcements</h2>
        </div>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`rounded-2xl border-l-4 p-4 ${
                announcement.priority === 'urgent' ? 'border-red-500 bg-red-50' :
                announcement.priority === 'high' ? 'border-amber-500 bg-amber-50' :
                'border-emerald-500 bg-emerald-50'
              }`}
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-slate-900">{announcement.title}</h3>
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                  priorityStyles[announcement.priority] || priorityStyles.normal
                }`}>
                  {announcement.priority}
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-600">{announcement.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicAnnouncements;
