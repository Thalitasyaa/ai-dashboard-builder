import React, { useState } from 'react';
import { User } from '../types';
import { ShieldCheck, ArrowRight, Database, PieChart, Sparkles, CheckCircle2, Cloud } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tier, setTier] = useState<'free' | 'pro' | 'business'>('free');
  const [isLoading, setIsLoading] = useState(false);
  const [errorString, setErrorString] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorString('');
    
    if (!email || !password || (!isLogin && !name)) {
      setErrorString('Harap isi semua kolom formulir yang wajib.');
      return;
    }

    setIsLoading(true);

    // Simulate authentic network latency
    setTimeout(() => {
      setIsLoading(false);
      const user: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: isLogin ? (email.split('@')[0].toUpperCase()) : name,
        email,
        tier,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`
      };
      onLoginSuccess(user);
    }, 1200);
  };

  const selectSuggestedCredentials = (role: 'finance' | 'sme' | 'student') => {
    if (role === 'finance') {
      setEmail('dimas.finance@insightflow.ai');
      setName('Dimas (Finance Staff)');
      setPassword('staff123');
      setTier('pro');
    } else if (role === 'sme') {
      setEmail('andi.umkm@kopilokal.id');
      setName('Andi Kopi (UMKM Owner)');
      setPassword('kopilokal');
      setTier('business');
    } else {
      setEmail('rina.mahasiswa@kampus.edu');
      setName('Rina (Mahasiswa)');
      setPassword('skripsi2026');
      setTier('free');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 text-neutral-500 font-mono text-xs flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-neutral-100 shadow-xs">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Uptime: 99.9% Live
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] text-white shadow-md">
          <Sparkles className="h-6 w-6" id="brand-logo-icon" />
        </div>
        <h2 className="mt-4 text-3xl font-sans tracking-tight text-neutral-900 font-bold" id="app-title">
          InsightFlow <span className="text-[#2563EB]">AI</span>
        </h2>
        <p className="mt-2 text-sm text-neutral-500 max-w-sm mx-auto">
          Unggah Excel atau CSV, AI membersihkan data, dan visualisasikan dalam hitungan detik.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl border border-neutral-100 sm:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Key Selling Features Card Column */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="font-sans font-semibold text-neutral-900 text-lg border-b border-neutral-100 pb-3">
              Kekuatan Analisis AI:
            </h3>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Database className="h-4 w-4 text-[#2563EB]" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral-900">AI Data Cleaning</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Otomatis memperbaiki missing value, format tidak konsisten, & duplikasi data.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <PieChart className="h-4 w-4 text-[#7C3AED]" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral-900">Smart Dashboard Generator</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Saran metrik KPI otomatis, grafik representatif, & kontrol drag-and-drop.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral-900">AI Forecasting & Insights</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Prediksikan tren bisnis ke depan lengkap dengan analisis kualitatif instan.</p>
              </div>
            </div>

            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
              <p className="text-xs font-mono text-neutral-500 leading-relaxed">
                💡 <strong>Gunakan Demo Skenario Instan:</strong> Klik salah satu profil di bawah untuk mengonfigurasi formulir otomatis.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  id="demo-finance-btn"
                  onClick={() => selectSuggestedCredentials('finance')}
                  className="px-2.5 py-1 text-xs font-sans rounded-md border border-blue-250 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  Dimas (Finance Staff - Pro)
                </button>
                <button
                  type="button"
                  id="demo-sme-btn"
                  onClick={() => selectSuggestedCredentials('sme')}
                  className="px-2.5 py-1 text-xs font-sans rounded-md border border-purple-250 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  Andi (UMKM Owner - Biz)
                </button>
                <button
                  type="button"
                  id="demo-student-btn"
                  onClick={() => selectSuggestedCredentials('student')}
                  className="px-2.5 py-1 text-xs font-sans rounded-md border border-neutral-250 bg-neutral-100 text-neutral-700 hover:bg-neutral-250 transition-colors"
                >
                  Rina (Student - Free)
                </button>
              </div>
            </div>
          </div>

          {/* Form Interactive Column */}
          <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-neutral-100 h-full flex justify-center py-2 md:py-0">
            <span className="text-neutral-300 font-sans text-xs uppercase px-2 bg-white -mt-4 md:mt-0 md:-ml-8 z-10">ATAU</span>
          </div>

          <div className="md:col-span-6">
            <div className="flex justify-center mb-6">
              <nav className="flex space-x-1 bg-neutral-100 p-1 rounded-lg">
                <button
                  id="tab-login-toggle"
                  onClick={() => { setIsLogin(true); setErrorString(''); }}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-250 ${
                    isLogin 
                      ? 'bg-white text-neutral-900 shadow-xs' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Masuk Akun
                </button>
                <button
                  id="tab-register-toggle"
                  onClick={() => { setIsLogin(false); setErrorString(''); }}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-250 ${
                    !isLogin 
                      ? 'bg-white text-neutral-900 shadow-xs' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Daftar Baru
                </button>
              </nav>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} id="auth-form">
              {errorString && (
                <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {errorString}
                </div>
              )}

              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-neutral-700">Nama Lengkap</label>
                  <input
                    type="text"
                    id="auth-name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Dimas Aditya"
                    className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-700">Alamat Email</label>
                <input
                  type="email"
                  id="auth-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anda@organisasi.com"
                  className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700">Kata Sandi</label>
                <input
                  type="password"
                  id="auth-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="bullet;bullet;bullet;bullet;bullet;bullet;bullet;bullet;"
                  className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Pilih Rencana Paket</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      id="tier-free-btn"
                      onClick={() => setTier('free')}
                      className={`p-2 text-left rounded-lg border text-xs transition-all ${
                        tier === 'free' 
                          ? 'border-[#2563EB] bg-blue-50/50' 
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="block font-semibold text-neutral-900">Free</span>
                      <span className="text-[10px] text-neutral-500">5 upload/bln</span>
                    </button>
                    <button
                      type="button"
                      id="tier-pro-btn"
                      onClick={() => setTier('pro')}
                      className={`p-2 text-left rounded-lg border text-xs transition-all ${
                        tier === 'pro' 
                          ? 'border-[#2563EB] bg-blue-50/50' 
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="block font-semibold text-neutral-900">Pro</span>
                      <span className="text-[10px] text-neutral-500">Rp 99K/bln</span>
                    </button>
                    <button
                      type="button"
                      id="tier-business-btn"
                      onClick={() => setTier('business')}
                      className={`p-2 text-left rounded-lg border text-xs transition-all ${
                        tier === 'business' 
                          ? 'border-[#2563EB] bg-blue-50/50' 
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="block font-semibold text-neutral-900">Promo Biz</span>
                      <span className="text-[10px] text-neutral-500">Rp 299K/bln</span>
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                id="auth-submit-btn"
                disabled={isLoading}
                className="w-full mt-2 flex justify-center items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-sans text-sm font-medium rounded-lg shadow-sm transition-all duration-200 disabled:opacity-55 cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memverifikasi...
                  </span>
                ) : (
                  <>
                    <span>{isLogin ? 'Masuk ke Platform' : 'Daftar & Hubungkan'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                id="google-mock-signin"
                onClick={() => {
                  setErrorString('');
                  setEmail('putri.syahlani@gmail.com');
                  setName('Putri Syahlani');
                  setTier('pro');
                  setPassword('googleInjected2026');
                  setIsLogin(true);
                  // Auto submit
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    onLoginSuccess({
                      id: 'usr_oauth_google',
                      name: 'Putri Syahlani',
                      email: 'putri.syahlani@gmail.com',
                      tier: 'pro',
                      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
                    });
                  }, 800);
                }}
                className="inline-flex w-full justify-center items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-medium shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.77 14.93 1 12 1 7.35 1 3.4 3.65 1.49 7.51l3.75 2.91C6.18 7.39 8.87 5.04 12 5.04z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.39-4.88 3.39-8.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.24 14.52c-.24-.72-.38-1.5-.38-2.31c0-.81.14-1.59.38-2.31L1.49 7.51c-.81 1.62-1.27 3.44-1.27 5.37c0 1.93.46 3.75 1.27 5.37l3.75-2.91z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.1.74-2.5 1.18-4.3 1.18c-3.13 0-5.82-2.35-6.76-5.38L1.49 16.36C3.4 20.35 7.35 23 12 23z"
                  />
                </svg>
                <span>Hubungkan dengan Google</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
