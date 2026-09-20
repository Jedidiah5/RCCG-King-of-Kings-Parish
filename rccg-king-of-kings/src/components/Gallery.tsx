import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import PageBanner from './PageBanner';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
  description: string;
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const galleryQuery = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const gallerySnapshot = await getDocs(galleryQuery);
      const galleryData = gallerySnapshot.docs.map((item) => ({
        id: item.id,
        src: item.data().imageUrl,
        alt: item.data().title,
        category: item.data().category,
        description: item.data().description
      }));
      setGalleryImages(galleryData);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Leadership', 'Services', 'Events', 'Community'];
  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-primary" />
          <p className="mt-4 text-sm font-medium text-slate-500">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <PageBanner
        title="Photo Gallery"
        subtitle="Capturing moments of faith, fellowship, and celebration"
      />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-4 py-6 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredImages.map((image) => (
              <button
                key={image.id}
                type="button"
                className="group relative overflow-hidden rounded-2xl text-left shadow-sm"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-medium text-white">{image.alt}</p>
                  <p className="text-xs text-white/70">{image.category}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center text-slate-500">
            No images found in this category.
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-sm font-semibold text-white/80 hover:text-white"
            >
              Close
            </button>
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-h-[80vh] max-w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
