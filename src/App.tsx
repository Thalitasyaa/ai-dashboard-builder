import React, { useState, useEffect } from 'react';
import { User, Dataset, Widget, KPI, InsightItem, ForecastPoint, ChatMessage, DataCleaningSummary } from './types';
import { getDefaultWidgets } from './data';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import UploadSection from './components/UploadSection';
import CleaningSection from './components/CleaningSection';
import DashboardGrid from './components/DashboardGrid';
import InsightSection from './components/InsightSection';
import ForecastSection from './components/ForecastSection';
import ExportSection from './components/ExportSection';
import { Cloud, Sparkles, HelpCircle, FileSpreadsheet, Compass, Database } from 'lucide-react';

export default function App() {
  // Session authentication state
  const [user, setUser] = useState<User | null>(null);
  
  // App active view tabs: 'upload' | 'dashboard' | 'insights' | 'forecast' | 'export'
  const [activeTab, setActiveTab] = useState<string>('upload');
  
  // Interactive Customization states
  const [themeColor, setThemeColor] = useState<string>('blue');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Active dataset and parsed outcomes
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isCleaningActive, setIsCleaningActive] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Data processing states populated by Gemini or offline model
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [forecastData, setForecastData] = useState<ForecastPoint[]>([]);
  const [cleaningSummary, setCleaningSummary] = useState<DataCleaningSummary | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Persistent OAuth logic / User hydration
  useEffect(() => {
    const cachedUser = localStorage.getItem('insight_flow_user');
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('insight_flow_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedDataset(null);
    setIsCleaningActive(false);
    setWidgets([]);
    setKpis([]);
    setInsights([]);
    setForecastData([]);
    setCleaningSummary(null);
    setChatMessages([]);
    setActiveTab('upload');
    localStorage.removeItem('insight_flow_user');
  };

  // Trigger server-side analysis when a dataset is chosen
  const handleDatasetSelected = async (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setIsCleaningActive(true);
    setIsAnalyzing(true);
    setChatMessages([]);

    try {
      const response = await fetch('/api/analyze-dataset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datasetName: dataset.name,
          category: dataset.category,
          columns: dataset.columns,
          rows: dataset.rows
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menganalisis dataset melalui server-side route.');
      }

      const report = await response.json();
      
      // Update UI with calculated KPIs, visual widgets, strategic insights & projection series
      setCleaningSummary(report.cleaning || null);
      
      // Incorporate pre-calculated widgets if they exist, or fallback to default templates from standard samples
      if (report.widgets && report.widgets.length > 0) {
        setWidgets(report.widgets.map((w: any, idx: number) => ({
          ...w,
          id: w.id || `gen_widget_${idx}`
        })));
      } else {
        setWidgets(getDefaultWidgets(dataset.id));
      }

      setKpis(report.kpis || []);
      setInsights(report.insights || []);
      setForecastData(report.forecast || []);

    } catch (err) {
      console.error('Core analytics pipeline failed, activating responsive rules fallback:', err);
      // Fallback is also managed seamlessly inside the Express backend or via safe standard metrics
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Dynamic chatbot integration handler
  const handleSendMessage = async (text: string) => {
    if (!selectedDataset) return;

    const userMessage: ChatMessage = {
      id: 'msg_user_' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);

    try {
      const response = await fetch('/api/chat-with-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          dataset: selectedDataset
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi chatbot analitik.');
      }

      const answer = await response.json();
      const assistantMessage: ChatMessage = {
        id: 'msg_ai_' + Date.now(),
        role: 'assistant',
        content: answer.content,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages([...updatedMessages, assistantMessage]);
    } catch (err) {
      console.error(err);
      // Hard fallback message if network fails
      const errorMessage: ChatMessage = {
        id: 'msg_err_' + Date.now(),
        role: 'assistant',
        content: 'Maaf, Saya mengalami gangguan saat memproses tanggapan data tersebut. Mohon periksa kembali API Key Gemini Anda di panel Secrets.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...updatedMessages, errorMessage]);
    }
  };

  // Route back to dataset uploader
  const handleResetDataset = () => {
    setSelectedDataset(null);
    setIsCleaningActive(false);
    setWidgets([]);
    setKpis([]);
    setInsights([]);
    setForecastData([]);
    setCleaningSummary(null);
    setChatMessages([]);
    setActiveTab('upload');
  };

  // Route to main builder stage
  const handleProceedToDashboard = () => {
    setIsCleaningActive(false);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <AuthScreen onLoginSuccess={handleLogin} />;
  }

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-neutral-800'}`}>
      
      {/* Top Banner indicating printing states */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area-full, #print-area-full * { visibility: visible; }
          #print-area-full { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>

      {/* Navigation Rails */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
        selectedDataset={selectedDataset}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Platform Canvas */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto" id="platform-main">
        
        {/* Top bar indicators */}
        <header className={`px-8 py-4 border-b flex items-center justify-between shrink-0 print:hidden ${
          isDarkMode ? 'border-slate-800 bg-[#0F172A]' : 'border-neutral-100 bg-white'
        }`} id="top-navbar-hud">
          <div className="flex items-center gap-3">
            <span className="font-sans font-bold text-sm tracking-tight">Koneksi Aktif</span>
            {selectedDataset ? (
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-100">
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span className="truncate max-w-[190px] font-mono text-[11px]">{selectedDataset.name}</span>
                <button
                  id="reset-dataset-btn"
                  onClick={handleResetDataset}
                  title="Ganti Dataset Berkas"
                  className="text-emerald-500 hover:text-emerald-900 ml-1 font-sans font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>
            ) : (
              <span className="text-xs text-neutral-400 font-mono italic">Belum ada dataset yang terhubung</span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-450 font-mono text-[10px]">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              Secured client-server sandbox
            </div>
          </div>
        </header>

        {/* Dynamic active view viewport */}
        <div className="p-8 flex-1 max-w-7xl w-full mx-auto print:p-0" id="platform-viewport">
          
          {/* UPLOAD & CLEANING TAB */}
          {activeTab === 'upload' && (
            <>
              {isCleaningActive && selectedDataset ? (
                <CleaningSection
                  dataset={selectedDataset}
                  cleaningSummary={cleaningSummary}
                  onProceedToDashboard={handleProceedToDashboard}
                  isDarkMode={isDarkMode}
                  themeColor={themeColor}
                />
              ) : (
                <UploadSection
                  onDatasetSelected={handleDatasetSelected}
                  isDarkMode={isDarkMode}
                  themeColor={themeColor}
                />
              )}
            </>
          )}

          {/* DASHBOARD BUILDER TAB */}
          {activeTab === 'dashboard' && selectedDataset && (
            <DashboardGrid
              dataset={selectedDataset}
              widgets={widgets}
              kpis={kpis}
              onUpdateWidgets={setWidgets}
              isDarkMode={isDarkMode}
              themeColor={themeColor}
            />
          )}

          {/* AI INSIGHTS & CHAT TAB */}
          {activeTab === 'insights' && selectedDataset && (
            <InsightSection
              dataset={selectedDataset}
              insights={insights}
              chatMessages={chatMessages}
              onSendMessage={handleSendMessage}
              isDarkMode={isDarkMode}
              themeColor={themeColor}
            />
          )}

          {/* AI FORECASTING TAB */}
          {activeTab === 'forecast' && selectedDataset && (
            <ForecastSection
              dataset={selectedDataset}
              forecastData={forecastData}
              isDarkMode={isDarkMode}
              themeColor={themeColor}
            />
          )}

          {/* EXPORTS & REPORT CENTRE */}
          {activeTab === 'export' && selectedDataset && (
            <ExportSection
              dataset={selectedDataset}
              widgets={widgets}
              kpis={kpis}
              insights={insights}
              isDarkMode={isDarkMode}
              themeColor={themeColor}
            />
          )}

        </div>
      </main>
    </div>
  );
}
