import React from 'react';
import { User, Dataset } from '../types';
import { 
  Sparkles, 
  Upload, 
  LayoutDashboard, 
  Lightbulb, 
  TrendingUp, 
  Download, 
  LogOut, 
  User2, 
  Layers, 
  Sun, 
  Moon,
  Database
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  onLogout: () => void;
  selectedDataset: Dataset | null;
  themeColor: string;
  setThemeColor: (color: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  selectedDataset,
  themeColor,
  setThemeColor,
  isDarkMode,
  setIsDarkMode
}: SidebarProps) {
  
  const menuItems = [
    { id: 'upload', label: 'Impor & Cleaning', icon: Upload, count: selectedDataset ? 1 : 0 },
    { id: 'dashboard', label: 'Dashboard Builder', icon: LayoutDashboard, disabled: !selectedDataset },
    { id: 'insights', label: 'AI Insights & Chat', icon: Lightbulb, disabled: !selectedDataset },
    { id: 'forecast', label: 'AI Forecasting', icon: TrendingUp, disabled: !selectedDataset },
    { id: 'export', label: 'Laporan & Ekspor', icon: Download, disabled: !selectedDataset }
  ];

  const themes = [
    { name: 'Biru AI', value: 'blue', primary: '#2563EB', bg: 'bg-blue-600' },
    { name: 'Ungu Modern', value: 'purple', primary: '#7C3AED', bg: 'bg-indigo-600' },
    { name: 'Emerald', value: 'emerald', primary: '#10B981', bg: 'bg-emerald-600' },
    { name: 'Amber', value: 'amber', primary: '#F59E0B', bg: 'bg-amber-600' }
  ];

  return (
    <aside className={`w-64 border-r shrink-0 flex flex-col justify-between transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#0F172A] border-slate-800 text-slate-100' 
        : 'bg-white border-neutral-200 text-neutral-800'
    }`} id="main-sidebar">
      <div>
        {/* Brand Header */}
        <div className={`p-6 border-b flex items-center gap-3 ${
          isDarkMode ? 'border-slate-800' : 'border-neutral-100'
        }`} id="sidebar-brand-header">
          <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-sans font-bold tracking-tight text-md">InsightFlow AI</h1>
            <span className="text-[10px] uppercase font-mono tracking-wider text-blue-500 font-bold">V1.0 Web App</span>
          </div>
        </div>

        {/* User Card */}
        <div className={`px-4 py-4 border-b flex items-center gap-3 ${
          isDarkMode ? 'border-slate-800 bg-slate-900/40' : 'border-neutral-100 bg-neutral-50/50'
        }`} id="sidebar-user-card">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt="Avatar"
            className="h-10 w-10 rounded-full border border-neutral-200 object-cover shrink-0"
          />
          <div className="overflow-hidden">
            <h2 className="text-sm font-medium truncate">{user.name}</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`text-[10px] px-1.5 py-0.5 font-sans rounded-md font-semibold tracking-wide uppercase ${
                user.tier === 'free' 
                  ? 'bg-neutral-100 text-neutral-600' 
                  : user.tier === 'pro'
                    ? 'bg-blue-100 text-[#2563EB]'
                    : 'bg-amber-100 text-amber-700'
              }`}>
                {user.tier} Plan
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menus */}
        <nav className="p-4 space-y-1" id="sidebar-navigation">
          <p className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-2 px-2">Menu Utama</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}-btn`}
                disabled={item.disabled}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : item.disabled
                      ? 'opacity-40 cursor-not-allowed text-neutral-400'
                      : isDarkMode
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`text-[10px] px-1.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Options & Bottom Meta */}
      <div className={`p-4 border-t space-y-4 ${
        isDarkMode ? 'border-slate-800' : 'border-neutral-100'
      }`} id="sidebar-footer">
        
        {/* Customization Settings */}
        <div className="space-y-3">
          <p className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase px-1">Kustomisasi</p>
          
          {/* Theme Palette */}
          <div>
            <div className="flex gap-2">
              {themes.map((t) => (
                <button
                  key={t.value}
                  id={`theme-btn-${t.value}`}
                  onClick={() => setThemeColor(t.value)}
                  title={t.name}
                  className={`h-5 w-5 rounded-full ${t.bg} transition-all relative ${
                    themeColor === t.value 
                      ? 'ring-2 ring-offset-2 ring-neutral-400 scale-110' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Light/Dark Toggle */}
          <div className={`flex items-center justify-between p-1 rounded-lg ${
            isDarkMode ? 'bg-slate-900' : 'bg-neutral-100'
          }`}>
            <button
              id="theme-light-toggle"
              onClick={() => setIsDarkMode(false)}
              className={`flex-1 flex justify-center py-1 rounded-md text-xs transition-colors ${
                !isDarkMode 
                  ? 'bg-white text-neutral-900 shadow-xs' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="h-3.5 w-3.5 mr-1" />
              Siang
            </button>
            <button
              id="theme-dark-toggle"
              onClick={() => setIsDarkMode(true)}
              className={`flex-1 flex justify-center py-1 rounded-md text-xs transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-100 shadow-xs' 
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Moon className="h-3.5 w-3.5 mr-1" />
              Malam
            </button>
          </div>
        </div>

        {/* Logout Actuator */}
        <button
          id="logout-btn"
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-red-600 hover:bg-red-50/50 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}
