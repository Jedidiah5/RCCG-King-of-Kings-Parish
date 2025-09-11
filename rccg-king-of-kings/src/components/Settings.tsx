import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  UserIcon, 
  Cog6ToothIcon, 
  BellIcon, 
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">
                {currentUser ? `Welcome, ${currentUser.email}` : 'Manage your account settings'}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <UserIcon className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage your personal information and preferences.</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Email</span>
                <span className="text-gray-500">{currentUser?.email || 'Not logged in'}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Account Status</span>
                <span className="text-green-600">Active</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BellIcon className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            <p className="text-gray-600 mb-4">Control how you receive notifications.</p>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded text-primary" defaultChecked />
                <span className="text-gray-700">Email notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded text-primary" defaultChecked />
                <span className="text-gray-700">Event reminders</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded text-primary" />
                <span className="text-gray-700">Sermon updates</span>
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage your account security settings.</p>
            <div className="space-y-3">
              <button className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">
                Change Password
              </button>
              <button className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">
                Login History
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Cog6ToothIcon className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
            </div>
            <p className="text-gray-600 mb-4">Customize your experience.</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Theme</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Auto</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Language</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Access */}
        {currentUser && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Admin Access</h3>
                  <p className="text-gray-600">Access administrative features and manage the website.</p>
                </div>
              </div>
              <Link
                to="/admin"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Go to Admin</span>
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Logout Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Sign Out</h3>
              <p className="text-gray-600">Sign out of your account on this device.</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
