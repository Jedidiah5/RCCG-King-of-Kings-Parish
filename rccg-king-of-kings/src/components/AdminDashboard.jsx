import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { db, storage } from '../firebase/config';
import logo from '../logo.png';

const EmptyState = ({ title, description }) => (
  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v12m6-6H6" />
      </svg>
    </div>
    <h3 className="text-base font-semibold text-slate-800">{title}</h3>
    <p className="mt-1 text-sm text-slate-500">{description}</p>
  </div>
);

const SectionHeader = ({ eyebrow, title, description }) => (
  <div className="mb-6">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">{eyebrow}</p>
    <h2 className="mt-1 text-xl font-semibold text-slate-900">{title}</h2>
    {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
  </div>
);

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [sermons, setSermons] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    image: ''
  });
  const [sermonForm, setSermonForm] = useState({
    title: '',
    description: '',
    date: '',
    link: '',
    speaker: ''
  });
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    priority: 'normal'
  });
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    category: 'Services',
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/admin/login');
    }
    fetchData();
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!galleryForm.image) {
      setImagePreview('');
      return undefined;
    }

    const previewUrl = URL.createObjectURL(galleryForm.image);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [galleryForm.image]);

  const fetchCollection = async (name, orderField, direction = 'desc') => {
    const snapshot = await getDocs(query(collection(db, name), orderBy(orderField, direction)));
    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data()
    }));
  };

  const fetchData = async () => {
    setLoading(true);
    const results = await Promise.allSettled([
      fetchCollection('events', 'date'),
      fetchCollection('sermons', 'date'),
      fetchCollection('announcements', 'createdAt'),
      fetchCollection('gallery', 'createdAt')
    ]);

    const [eventsResult, sermonsResult, announcementsResult, galleryResult] = results;

    if (eventsResult.status === 'fulfilled') {
      setEvents(eventsResult.value);
    } else {
      console.error('Error fetching events:', eventsResult.reason);
    }

    if (sermonsResult.status === 'fulfilled') {
      setSermons(sermonsResult.value);
    } else {
      console.error('Error fetching sermons:', sermonsResult.reason);
    }

    if (announcementsResult.status === 'fulfilled') {
      setAnnouncements(announcementsResult.value);
    } else {
      console.error('Error fetching announcements:', announcementsResult.reason);
    }

    if (galleryResult.status === 'fulfilled') {
      setGalleryImages(galleryResult.value);
    } else {
      console.error('Error fetching gallery images:', galleryResult.reason);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, 'events'), {
        ...eventForm,
        createdAt: serverTimestamp()
      });
      setEventForm({ title: '', description: '', date: '', time: '', image: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding event:', error);
    }
    setSaving(false);
  };

  const handleAddSermon = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, 'sermons'), {
        ...sermonForm,
        createdAt: serverTimestamp()
      });
      setSermonForm({ title: '', description: '', date: '', link: '', speaker: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding sermon:', error);
    }
    setSaving(false);
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, 'announcements'), {
        ...announcementForm,
        createdAt: serverTimestamp()
      });
      setAnnouncementForm({ title: '', content: '', priority: 'normal' });
      fetchData();
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
    setSaving(false);
  };

  const removeItem = async (collectionName, id, refresh = true) => {
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, collectionName, id));
      if (refresh) {
        fetchData();
      }
    } catch (error) {
      console.error(`Error deleting ${collectionName}:`, error);
    }
    setDeletingId(null);
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await removeItem('events', id);
    }
  };

  const handleDeleteSermon = async (id) => {
    if (window.confirm('Are you sure you want to delete this sermon?')) {
      await removeItem('sermons', id);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      await removeItem('announcements', id);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;

    try {
      const imageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleAddGalleryImage = async (e) => {
    e.preventDefault();
    if (!galleryForm.image) {
      alert('Please select an image to upload');
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await handleImageUpload(galleryForm.image);

      await addDoc(collection(db, 'gallery'), {
        title: galleryForm.title,
        description: galleryForm.description,
        category: galleryForm.category,
        imageUrl: imageUrl,
        createdAt: serverTimestamp()
      });

      setGalleryForm({ title: '', description: '', category: 'Services', image: null });
      fetchData();
    } catch (error) {
      console.error('Error adding gallery image:', error);
      const message = error?.code === 'storage/unauthorized' || error?.code === 'permission-denied'
        ? 'Upload blocked by Firebase rules. Enable Storage, then allow signed-in writes to gallery/ in Storage rules and gallery in Firestore rules.'
        : 'Error uploading image. Check Firebase Storage is enabled and your Storage/Firestore rules allow gallery writes.';
      alert(message);
    }
    setUploading(false);
  };

  const handleDeleteGalleryImage = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await removeItem('gallery', id);
    }
  };

  const tabs = [
    { id: 'events', label: 'Events', count: events.length },
    { id: 'sermons', label: 'Sermons', count: sermons.length },
    { id: 'announcements', label: 'Announcements', count: announcements.length },
    { id: 'gallery', label: 'Gallery', count: galleryImages.length }
  ];

  const stats = [
    { id: 'events', label: 'Events', value: events.length, hint: 'Upcoming church events' },
    { id: 'sermons', label: 'Sermons', value: sermons.length, hint: 'Published recordings' },
    { id: 'announcements', label: 'Announcements', value: announcements.length, hint: 'Homepage notices' },
    { id: 'gallery', label: 'Gallery', value: galleryImages.length, hint: 'Uploaded photos' }
  ];

  const userInitial = currentUser?.email?.[0]?.toUpperCase() || 'A';
  const priorityStyles = {
    urgent: 'bg-red-50 text-red-700 border-red-200',
    high: 'bg-amber-50 text-amber-700 border-amber-200',
    normal: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  if (loading) {
    return (
      <div className="admin-app flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-primary" />
          <p className="mt-4 text-sm font-medium text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-app min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-primary text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="RCCG Logo" className="h-10 w-10 rounded-full object-contain bg-white/10 p-1" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">RCCG King of Kings</p>
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/" className="admin-btn-secondary hidden bg-white/10 text-white border-white/15 hover:bg-white/15 sm:inline-flex">
              View site
            </Link>
            <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 md:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-primary">
                {userInitial}
              </span>
              <span className="max-w-[180px] truncate text-sm text-white/80">{currentUser?.email}</span>
            </div>
            <button onClick={handleLogout} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Content management</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">Keep the parish website up to date</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Add or remove events, sermons, announcements, and gallery photos. Published items appear on the public site.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <button
              key={stat.id}
              type="button"
              onClick={() => setActiveTab(stat.id)}
              className={`admin-card p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                activeTab === stat.id ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-400">{stat.hint}</p>
            </button>
          ))}
        </div>

        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex min-w-full rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {tab.label}
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${
                  activeTab === tab.id ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'events' && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <section className="admin-card p-6">
              <SectionHeader eyebrow="Create" title="Add new event" description="These appear in Upcoming Events on the homepage." />
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      className="admin-field"
                      placeholder="Sunday Thanksgiving Service"
                      required
                    />
                  </div>
                  <div>
                    <label className="admin-label">Date</label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="admin-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="admin-label">Time</label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="admin-field"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="admin-label">Image URL</label>
                    <input
                      type="url"
                      value={eventForm.image}
                      onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                      className="admin-field"
                      placeholder="https://"
                    />
                  </div>
                </div>
                <div>
                  <label className="admin-label">Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    rows={4}
                    className="admin-field resize-none"
                    placeholder="Share what members should expect."
                    required
                  />
                </div>
                <button type="submit" disabled={saving} className="admin-btn">
                  {saving ? 'Adding...' : 'Add event'}
                </button>
              </form>
            </section>

            <section className="admin-card p-6">
              <SectionHeader eyebrow="Published" title="Current events" />
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                    {event.image ? (
                      <img src={event.image} alt="" className="hidden h-20 w-20 rounded-xl object-cover sm:block" />
                    ) : (
                      <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-medium text-slate-400 sm:flex">
                        No image
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">{event.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">{event.description}</p>
                          <p className="mt-2 text-xs font-medium text-slate-400">
                            {event.date}{event.time && ` · ${event.time}`}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          disabled={deletingId === event.id}
                          className="admin-btn-danger"
                        >
                          {deletingId === event.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <EmptyState title="No events yet" description="Add an event on the left to show it on the homepage." />
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'sermons' && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <section className="admin-card p-6">
              <SectionHeader eyebrow="Create" title="Add new sermon" description="YouTube links appear in Recent Sermons." />
              <form onSubmit={handleAddSermon} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      value={sermonForm.title}
                      onChange={(e) => setSermonForm({ ...sermonForm, title: e.target.value })}
                      className="admin-field"
                      placeholder="The Power of Thanksgiving"
                      required
                    />
                  </div>
                  <div>
                    <label className="admin-label">Speaker</label>
                    <input
                      type="text"
                      value={sermonForm.speaker}
                      onChange={(e) => setSermonForm({ ...sermonForm, speaker: e.target.value })}
                      className="admin-field"
                      placeholder="Pastor name"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Date</label>
                    <input
                      type="date"
                      value={sermonForm.date}
                      onChange={(e) => setSermonForm({ ...sermonForm, date: e.target.value })}
                      className="admin-field"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="admin-label">YouTube link</label>
                    <input
                      type="url"
                      value={sermonForm.link}
                      onChange={(e) => setSermonForm({ ...sermonForm, link: e.target.value })}
                      className="admin-field"
                      placeholder="https://youtube.com/..."
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="admin-label">Description</label>
                  <textarea
                    value={sermonForm.description}
                    onChange={(e) => setSermonForm({ ...sermonForm, description: e.target.value })}
                    rows={4}
                    className="admin-field resize-none"
                    placeholder="A short summary of the message."
                    required
                  />
                </div>
                <button type="submit" disabled={saving} className="admin-btn">
                  {saving ? 'Adding...' : 'Add sermon'}
                </button>
              </form>
            </section>

            <section className="admin-card p-6">
              <SectionHeader eyebrow="Published" title="Current sermons" />
              <div className="space-y-4">
                {sermons.map((sermon) => (
                  <div key={sermon.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-900">{sermon.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{sermon.description}</p>
                        <p className="mt-2 text-xs font-medium text-slate-400">
                          {sermon.speaker && `${sermon.speaker} · `}{sermon.date}
                        </p>
                        <a
                          href={sermon.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
                        >
                          Watch on YouTube →
                        </a>
                      </div>
                      <button
                        onClick={() => handleDeleteSermon(sermon.id)}
                        disabled={deletingId === sermon.id}
                        className="admin-btn-danger"
                      >
                        {deletingId === sermon.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
                {sermons.length === 0 && (
                  <EmptyState title="No sermons yet" description="Add a sermon with a YouTube link to publish it." />
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <section className="admin-card p-6">
              <SectionHeader eyebrow="Create" title="Add announcement" description="Priority changes how it is highlighted on the homepage." />
              <form onSubmit={handleAddAnnouncement} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      value={announcementForm.title}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      className="admin-field"
                      placeholder="Workers meeting this Saturday"
                      required
                    />
                  </div>
                  <div>
                    <label className="admin-label">Priority</label>
                    <select
                      value={announcementForm.priority}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                      className="admin-field"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="admin-label">Content</label>
                  <textarea
                    value={announcementForm.content}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                    rows={5}
                    className="admin-field resize-none"
                    placeholder="Write the announcement members should see."
                    required
                  />
                </div>
                <button type="submit" disabled={saving} className="admin-btn">
                  {saving ? 'Adding...' : 'Add announcement'}
                </button>
              </form>
            </section>

            <section className="admin-card p-6">
              <SectionHeader eyebrow="Published" title="Current announcements" />
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{announcement.title}</h3>
                          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                            priorityStyles[announcement.priority] || priorityStyles.normal
                          }`}>
                            {announcement.priority}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{announcement.content}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                        disabled={deletingId === announcement.id}
                        className="admin-btn-danger"
                      >
                        {deletingId === announcement.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
                {announcements.length === 0 && (
                  <EmptyState title="No announcements yet" description="Create a notice and it will show on the homepage." />
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <section className="admin-card p-6">
              <SectionHeader eyebrow="Create" title="Add gallery image" description="Images are stored in Firebase Storage and shown on the Gallery page." />
              <form onSubmit={handleAddGalleryImage} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="admin-label">Title</label>
                      <input
                        type="text"
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        className="admin-field"
                        placeholder="Sunday service"
                        required
                      />
                    </div>
                    <div>
                      <label className="admin-label">Category</label>
                      <select
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                        className="admin-field"
                      >
                        <option value="Services">Services</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Events">Events</option>
                        <option value="Community">Community</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="admin-label">Description</label>
                    <textarea
                      value={galleryForm.description}
                      onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                      rows={3}
                      className="admin-field resize-none"
                      placeholder="A short caption for this photo."
                      required
                    />
                  </div>
                  <div>
                    <label className="admin-label">Image</label>
                    <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-primary/40 hover:bg-primary/5">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.files[0] })}
                        className="hidden"
                        required
                      />
                      <p className="text-sm font-semibold text-slate-700">
                        {galleryForm.image ? galleryForm.image.name : 'Click to choose an image'}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">JPEG, PNG, or WebP up to 10MB</p>
                    </label>
                  </div>
                  <button type="submit" disabled={uploading} className="admin-btn">
                    {uploading ? 'Uploading...' : 'Add image'}
                  </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full min-h-[220px] w-full object-cover" />
                  ) : (
                    <div className="flex min-h-[220px] items-center justify-center px-4 text-center text-sm text-slate-400">
                      Image preview will appear here
                    </div>
                  )}
                </div>
              </form>
            </section>

            <section className="admin-card p-6">
              <SectionHeader eyebrow="Published" title="Current gallery images" />
              {galleryImages.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="overflow-hidden rounded-2xl border border-slate-200">
                      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900">{image.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{image.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                            {image.category}
                          </span>
                          <button
                            onClick={() => handleDeleteGalleryImage(image.id)}
                            disabled={deletingId === image.id}
                            className="admin-btn-danger"
                          >
                            {deletingId === image.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState title="No gallery images yet" description="Upload a photo above and it will appear on the Gallery page." />
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
