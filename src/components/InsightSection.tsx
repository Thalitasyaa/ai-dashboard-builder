import React, { useState } from 'react';
import { Dataset, InsightItem, ChatMessage } from '../types';
import { 
  Sparkles, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Compass, 
  TrendingUp, 
  HelpCircle,
  MessageSquare,
  Zap,
  RefreshCw,
  Clock
} from 'lucide-react';

interface InsightSectionProps {
  dataset: Dataset;
  insights: InsightItem[];
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isDarkMode: boolean;
  themeColor: string;
}

export default function InsightSection({
  dataset,
  insights,
  chatMessages,
  onSendMessage,
  isDarkMode,
  themeColor
}: InsightSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<'insights' | 'chat'>('insights');
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Suggestion chips for easy user click
  const getPromptSuggestions = () => {
    if (dataset.category === 'sales') {
      return [
        'Bagaimana cara meminimalkan churn rate?',
        'Berapa rata-rata pendapatan MRR kuartal ini?',
        'Identifikasi tren korelasi CAC vs Pendapatan'
      ];
    }
    if (dataset.category === 'marketing') {
      return [
        'Berapa ROAS atau ROI pengiklanan rata-rata?',
        'Strategi meningkatkan tingkat konversi Q4?',
        'Analisis loyalitas pelanggan setia'
      ];
    }
    if (dataset.category === 'cashflow') {
      return [
        'Kenapa pemasukan hari Sabtu melonjak drastis?',
        'Saran menekan pengeluaran kedai kopi harian',
        'Cek status kritis stok biji kopi logistik'
      ];
    }
    return [
      'Gambarkan ringkasan performa data teratas',
      'Rekomendasikan langkah aksi optimasi taktis',
      'Apa anomali minor yang tampak pada dataset?'
    ];
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const textToSend = inputText;
    setInputText('');
    setIsSending(true);
    try {
      await onSendMessage(textToSend);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setInputText('');
    setIsSending(true);
    try {
      await onSendMessage(suggestion);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const getThemeTextClass = () => {
    if (themeColor === 'purple') return 'text-purple-600';
    if (themeColor === 'emerald') return 'text-emerald-300';
    if (themeColor === 'amber') return 'text-amber-600';
    return 'text-blue-600';
  };

  const getThemeButtonBg = () => {
    if (themeColor === 'purple') return 'bg-purple-600 hover:bg-purple-700';
    if (themeColor === 'emerald') return 'bg-emerald-600 hover:bg-emerald-700';
    if (themeColor === 'amber') return 'bg-amber-600 hover:bg-amber-700';
    return 'bg-blue-600 hover:bg-blue-700';
  };

  const getThemeBorderClass = () => {
    if (themeColor === 'purple') return 'border-purple-200';
    if (themeColor === 'emerald') return 'border-emerald-200';
    if (themeColor === 'amber') return 'border-amber-200';
    return 'border-blue-200';
  };

  return (
    <div className="space-y-6" id="insights-stage">
      
      {/* Tab Switch Headers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900" id="insights-section-title">
            Kecerdasan AI Analitik
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Baca rekomendasi langsung hasil eksplorasi model AI atau diskusikan detail rumit tren Anda secara interaktif.
          </p>
        </div>

        <div className="inline-flex bg-neutral-100 p-1 rounded-lg self-start">
          <button
            id="subtab-insights-toggle"
            onClick={() => setActiveSubTab('insights')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeSubTab === 'insights'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Lightbulb className="h-3.5 w-3.5 inline mr-1.5" />
            Rekomendasi Strategis
          </button>
          <button
            id="subtab-chat-toggle"
            onClick={() => setActiveSubTab('chat')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeSubTab === 'chat'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5 inline mr-1.5" />
            Tanya-Jawab Data (Chat)
          </button>
        </div>
      </div>

      {isDarkMode && (
        <style>{`
          #insights-section-title { color: #f8fafc !important; }
        `}</style>
      )}

      {/* Recommended insights cards view */}
      {activeSubTab === 'insights' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="strategic-insights-container">
          {insights.map((item) => {
            let IconComp = Lightbulb;
            let themeBg = "bg-neutral-50 border-neutral-200";
            let accentText = "text-neutral-700";

            if (item.category === 'performance') {
              IconComp = TrendingUp;
              themeBg = "bg-blue-50/50 border-blue-150";
              accentText = "text-blue-700";
            } else if (item.category === 'warning') {
              IconComp = AlertTriangle;
              themeBg = "bg-red-50/40 border-red-150";
              accentText = "text-red-700";
            } else if (item.category === 'opportunity') {
              IconComp = Zap;
              themeBg = "bg-purple-50/40 border-purple-150";
              accentText = "text-purple-700";
            } else if (item.category === 'efficiency') {
              IconComp = CheckCircle2;
              themeBg = "bg-emerald-50/40 border-emerald-150";
              accentText = "text-emerald-700";
            }

            return (
              <div 
                key={item.id} 
                id={`insight-item-${item.id}`}
                className={`p-5 rounded-2xl border flex flex-col justify-between ${themeBg}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] uppercase font-mono tracking-wider font-bold ${accentText}`}>
                      {item.category}
                    </span>
                    <IconComp className={`h-4.5 w-4.5 ${accentText}`} />
                  </div>
                  <h3 className="font-sans font-bold text-neutral-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-dotted border-neutral-200 space-y-2.5">
                  <div className="text-[11px] text-neutral-700 font-sans leading-relaxed">
                    🎯 <strong>Dampak Bisnis:</strong> {item.businessImpact}
                  </div>
                  <div className="text-[11px] text-neutral-800 bg-[#FFFFFF90] p-2.5 rounded-lg border border-neutral-100 font-sans leading-relaxed">
                    💡 <strong>Saran Eksekutif:</strong> {item.recommendation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Q&A chat section */
        <div className="bg-white rounded-2xl border border-neutral-150 shadow-sm overflow-hidden flex flex-col h-[520px]" id="qa-chat-panel">
          
          {/* Active dataset indicator */}
          <div className="p-3.5 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <p className="text-[11px] font-medium text-neutral-700">
                Berdiskusi aktif tentang: <strong className="font-mono">{dataset.name}</strong> • ({dataset.rowCount} baris data)
              </p>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">Gemini 3.5 Flash Model</span>
          </div>

          {/* Messages list bubble scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-scroller">
            {chatMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-3 py-12">
                <Compass className="h-10 w-10 text-neutral-300" />
                <h4 className="text-sm font-semibold text-neutral-850">Konsultan Data AI Siap Membantu</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Tanyakan hal spesifik seperti "Sebutkan rata-rata penjualan terbesar" atau draf strategi menekan CAC bisnis Anda.
                </p>
              </div>
            ) : (
              chatMessages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div 
                    key={msg.id} 
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed font-sans ${
                      isAssistant 
                        ? 'bg-neutral-100 text-neutral-800 rounded-tl-none' 
                        : 'bg-blue-600 text-white rounded-tr-none shadow-sm'
                    }`}>
                      {msg.content.split('\n').map((line, lidx) => (
                        <p key={lidx} className={line.trim() === '' ? 'h-2' : 'mt-1 first:mt-0'}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })
            )}

            {isSending && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 text-neutral-500 rounded-2xl rounded-tl-none p-4 text-xs flex items-center gap-2">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  <span>Analis AI sedang membedah angka datamu...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick recommendations chips */}
          <div className="px-4 py-2 bg-neutral-50/50 border-t border-neutral-100 space-y-1.5">
            <span className="text-[10px] text-neutral-400 font-mono">Pertanyaan yang sering diajukan:</span>
            <div className="flex flex-wrap gap-1.5">
              {getPromptSuggestions().map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  id={`suggestion-chip-${idx}`}
                  disabled={isSending}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-2.5 py-1 text-[10px] font-sans rounded-md border border-neutral-200 bg-white hover:bg-neutral-100 font-medium text-neutral-700 transition-all cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input field */}
          <form className="p-4 border-t border-neutral-150 flex items-center gap-2" onSubmit={handleSend} id="chat-input-form">
            <input
              type="text"
              id="chat-input-field"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik pertanyaan analitik bisnis Anda di sini..."
              className="flex-1 text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:border-blue-600"
              required
            />
            <button
              type="submit"
              id="send-chat-btn"
              disabled={isSending || !inputText.trim()}
              className={`h-9 w-9 rounded-xl text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer transition-all ${getThemeButtonBg()}`}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
