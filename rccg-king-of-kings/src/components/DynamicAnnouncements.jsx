import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const DynamicAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsQuery = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
        const announcementsSnapshot = await getDocs(announcementsQuery);
        const announcementsData = announcementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
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
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Announcements</h2>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div 
            key={announcement.id} 
            className={`p-4 rounded-lg border-l-4 ${
              announcement.priority === 'urgent' ? 'border-red-500 bg-red-50' :
              announcement.priority === 'high' ? 'border-yellow-500 bg-yellow-50' :
              'border-green-500 bg-green-50'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-lg">{announcement.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                announcement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                announcement.priority === 'high' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {announcement.priority}
              </span>
            </div>
            <p className="text-gray-700">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicAnnouncements;
