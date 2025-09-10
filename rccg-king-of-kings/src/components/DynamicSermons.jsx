import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const DynamicSermons = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const sermonsQuery = query(collection(db, 'sermons'), orderBy('date', 'desc'));
        const sermonsSnapshot = await getDocs(sermonsQuery);
        const sermonsData = sermonsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
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
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sermons.map((sermon) => (
        <div key={sermon.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-primary mb-4">{sermon.title}</h3>
          <p className="text-gray-600 mb-4">{sermon.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {sermon.speaker && `${sermon.speaker} • `}Date: {sermon.date}
            </span>
            <a 
              href={sermon.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:text-secondary transition duration-300"
            >
              Watch Now →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicSermons;
