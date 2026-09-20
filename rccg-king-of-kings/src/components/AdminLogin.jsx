import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../logo.png';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/admin');
    } catch (loginError) {
      setError('Failed to log in. Please check your credentials.');
      console.error('Login error:', loginError);
    }

    setLoading(false);
  };

  return (
    <div className="admin-app min-h-screen bg-[#0f2444] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between p-12">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: "url('https://livingourbible.com/wp-content/uploads/2024/05/2017_1largeimg07_jan_2017_190307416.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#0f2444]/85 to-[#0b1b33]/95" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 text-white">
              <img src={logo} alt="RCCG Logo" className="h-11 w-11 rounded-full object-contain bg-white/10 p-1" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">RCCG</p>
                <p className="text-lg font-semibold">King of Kings Parish</p>
              </div>
            </Link>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/60">Admin Portal</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Manage events, sermons, announcements, and the gallery.
            </h1>
            <p className="mt-5 text-base text-white/70">
              Sign in to update church content. Changes appear on the public website immediately.
            </p>
          </div>

          <p className="relative z-10 text-sm text-white/50">
            Emerald Estate, Lokogoma · Abuja
          </p>
        </div>

        <div className="flex items-center justify-center bg-[#f3f5f8] px-4 py-8 text-slate-900 sm:px-8 sm:py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <img src={logo} alt="RCCG Logo" className="h-10 w-10 rounded-full object-contain" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">RCCG</p>
                <p className="font-semibold text-primary">King of Kings Parish</p>
              </div>
            </div>

            <div className="admin-card p-5 sm:p-8">
              <p className="text-sm font-medium text-primary">Welcome back</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Sign in to Admin</h2>
              <p className="mt-2 text-sm text-slate-500">
                Use the email and password created in Firebase Authentication.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email-address" className="admin-label">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="admin-field"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="admin-label">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="admin-field pr-12"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3 top-[1.15rem] text-xs font-semibold text-slate-500 hover:text-primary"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="admin-btn w-full py-3">
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
            </div>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm font-medium text-slate-500 hover:text-primary">
                ← Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
