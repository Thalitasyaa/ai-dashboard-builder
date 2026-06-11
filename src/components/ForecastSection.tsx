import React from 'react';
import { Dataset, ForecastPoint } from '../types';
import { TrendingUp, RefreshCw, Sparkles, HelpCircle, ArrowUpRight, ArrowDownRight, ShieldAlert } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface ForecastSectionProps {
  dataset: Dataset;
  forecastData: ForecastPoint[];
  isDarkMode: boolean;
  themeColor: string;
}

export default function ForecastSection({
  dataset,
  forecastData,
  isDarkMode,
  themeColor
}: ForecastSectionProps) {
  
  // Safe helper to analyze the trend vector (Growth vs Shrinkage)
  const calculateAggregateTrend = () => {
    const forecastedPoints = forecastData.filter(p => p.forecastedValue !== undefined);
    if (forecastedPoints.length < 2) return { direction: 'Statis', percent: 0, color: 'text-neutral-500' };

    const firstForecast = forecastedPoints[0].forecastedValue || 100;
    const lastForecast = forecastedPoints[forecastedPoints.length - 1].forecastedValue || 100;

    const diffPercent = ((lastForecast - firstForecast) / firstForecast) * 100;
    
    if (diffPercent > 2) {
      return {
        direction: 'Bullish (Bertumbuh)',
        percent: Number(diffPercent.toFixed(1)),
        color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        icon: ArrowUpRight
      };
    }
    if (diffPercent < -2) {
      return {
        direction: 'Bearish (Menurun)',
        percent: Number(Math.abs(diffPercent).toFixed(1)),
        color: 'text-red-600 bg-red-50 border-red-100',
        icon: ArrowDownRight
      };
    }
    return {
      direction: 'Konsolidasi (Stabil)',
      percent: Number(diffPercent.toFixed(1)),
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      icon: TrendingUp
    };
  };

  const trendMeta = calculateAggregateTrend();
  const TrendIconComp = trendMeta.icon || TrendingUp;

  const getThemeButtonBg = () => {
    if (themeColor === 'purple') return 'bg-purple-600 hover:bg-purple-700';
    if (themeColor === 'emerald') return 'bg-emerald-600 hover:bg-emerald-700';
    if (themeColor === 'amber') return 'bg-amber-600 hover:bg-amber-700';
    return 'bg-blue-600 hover:bg-blue-700';
  };

  const getThemeTextClass = () => {
    if (themeColor === 'purple') return 'text-purple-600';
    if (themeColor === 'emerald') return 'text-emerald-600';
    if (themeColor === 'amber') return 'text-amber-600';
    return 'text-blue-600';
  };

  return (
    <div className="space-y-6" id="forecast-stage">
      
      {/* Visual top bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900" id="forecast-section-title">
            AI Forecasting &amp; Prediksi Tren
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Sistem meramalkan 3 periode ke depan bersarkan pola historis menggunakan pemrosesan statistika temporal Gemini.
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] bg-indigo-50 text-[#7C3AED] px-3 py-1.5 rounded-lg shrink-0">
          <Sparkles className="h-3 w-3" />
          Forecasting Model Active
        </div>
      </div>

      {isDarkMode && (
        <style>{`
          #forecast-section-title { color: #f8fafc !important; }
        `}</style>
      )}

      {/* Analytics stats dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="forecast-indicators">
        
        {/* Trend summary card */}
        <div className={`p-4 border rounded-2xl flex items-center justify-between ${trendMeta.color}`}>
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-wider uppercase opacity-80 font-bold">Arah Model Prediksi</span>
            <p className="text-base font-bold font-sans">{trendMeta.direction}</p>
            <span className="text-[10px] font-medium block">
              Sekitar {trendMeta.percent >= 0 ? '+' : ''}{trendMeta.percent}% deviasi teoretis
            </span>
          </div>
          <div className="h-9 w-9 bg-white rounded-full flex items-center justify-center shrink-0 shadow-2xs">
            <TrendIconComp className="h-5 w-5" />
          </div>
        </div>

        {/* Range bounds upper card */}
        <div className="p-4 bg-white border border-neutral-150 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 font-bold">Ambang Optimasi (Upper Limit)</span>
            <p className="text-base font-bold text-neutral-800 font-sans">Skenario Optimis (+10%)</p>
            <span className="text-[10px] text-neutral-500 block">Efisiensi maksimal kampanye &amp; retensi</span>
          </div>
          <div className="h-9 w-9 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        {/* Range bounds conservative card */}
        <div className="p-4 bg-white border border-neutral-150 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 font-bold">Ambang Konservatif (Lower Limit)</span>
            <p className="text-base font-bold text-neutral-800 font-sans">Skenario Defensif (-5%)</p>
            <span className="text-[10px] text-neutral-500 block">Ketahanan modal dalam kontraksi pasar</span>
          </div>
          <div className="h-9 w-9 bg-red-50 text-red-500 rounded-full flex items-center justify-center shrink-0">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </div>

      </div>

      {/* Main Forecast Rechart Plot */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-150 shadow-sm" id="forecast-graphic-box">
        <div className="mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-blue-500 font-bold">Forecasting Visualizer</span>
          <h3 className="font-sans font-bold text-neutral-900 text-sm">Plot Integrasi: Data Aktual vs Proyeksi Model</h3>
        </div>

        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <AreaChart data={forecastData} margin={{ left: -10, right: 15, top: 10, bottom: 0 }}>
              <defs>
                {/* Historical Area Fill */}
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>

                {/* Predicted Area Fill */}
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="period" tickLine={false} axisLine={false} style={{ fontSize: '10px', fontFamily: 'Inter' }} />
              <YAxis tickLine={false} axisLine={false} style={{ fontSize: '10px', fontFamily: 'Inter' }} />
              <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0', fontFamily: 'Inter' }} />
              <Legend wrapperStyle={{ fontSize: '10.5px', fontFamily: 'Inter', paddingTop: '8px' }} />

              {/* Reference indicator separating actuals vs projections */}
              <ReferenceLine x="Forecast T+1" stroke="#A78BFA" strokeDasharray="4 4" label={{ value: 'Proyeksi AI', fill: '#8B5CF6', fontSize: 10, fontFamily: 'Inter', position: 'top' }} />

              {/* Confidence Band: Lower vs Upper bounds */}
              <Area 
                name="Ambang Batas Atas (Optimis)"
                type="monotone" 
                dataKey="forecastedUpper" 
                stroke="#C084FC" 
                fill="#F3E8FF" 
                fillOpacity={0.4} 
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <Area 
                name="Ambang Batas Bawah (Konservatif)"
                type="monotone" 
                dataKey="forecastedLower" 
                stroke="#FCA5A5" 
                fill="none" 
                strokeWidth={1.5}
                strokeDasharray="3 3"
              />

              {/* Projections line */}
              <Area 
                name="Angka Prediksi AI"
                type="monotone" 
                dataKey="forecastedValue" 
                stroke="#7C3AED" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorForecast)" 
              />

              {/* Actuals series */}
              <Area 
                name="Data Aktual Historis"
                type="monotone" 
                dataKey="historicalValue" 
                stroke="#2563EB" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorActual)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
            *Prediksi bersifat dinamis dan didasarkan pada model korelasi Markov dari histori {dataset.rowCount} rekaman data Anda.
          </p>
          <div className="flex gap-2 text-[10.5px] font-semibold text-neutral-500">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-600"></span> Aktual</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-600"></span> Ramalan AI</span>
          </div>
        </div>
      </div>

    </div>
  );
}
