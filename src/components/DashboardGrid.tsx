import React, { useState } from 'react';
import { Dataset, Widget, KPI, ChartType } from '../types';
import { 
  TrendingUp, 
  Activity, 
  Database, 
  DollarSign, 
  Users, 
  ChevronDown, 
  Plus, 
  X, 
  Edit3, 
  Palette, 
  Maximize2, 
  Minimize2, 
  Sparkles,
  HelpCircle,
  Clock,
  RotateCcw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  ComposedChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface DashboardGridProps {
  dataset: Dataset;
  widgets: Widget[];
  kpis: KPI[];
  onUpdateWidgets: (updated: Widget[]) => void;
  isDarkMode: boolean;
  themeColor: string;
}

const ICON_MAP: Record<string, any> = {
  TrendingUp,
  Activity,
  Database,
  DollarSign,
  Users
};

export default function DashboardGrid({
  dataset,
  widgets,
  kpis,
  onUpdateWidgets,
  isDarkMode,
  themeColor
}: DashboardGridProps) {
  const [editingWidgetId, setEditingWidgetId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editChartType, setEditChartType] = useState<ChartType>('bar');
  const [editXKey, setEditXKey] = useState('');
  const [editYKeys, setEditYKeys] = useState<string[]>([]);
  const [editColors, setEditColors] = useState<string[]>([]);
  const [editNotes, setEditNotes] = useState('');

  // Sesi Add New Custom Widget
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [newTitle, setNewTitle] = useState('Widget Kustom Baru');
  const [newType, setNewType] = useState<ChartType>('bar');
  const [newXKey, setNewXKey] = useState(dataset.columns[0] || '');
  const [newYKey, setNewYKey] = useState(
    dataset.columns.find(c => dataset.columnTypes[c] === 'number') || ''
  );

  // List of numeric columns for select fields
  const numericColumns = dataset.columns.filter(c => dataset.columnTypes[c] === 'number');

  const handleStartEdit = (w: Widget) => {
    setEditingWidgetId(w.id);
    setEditTitle(w.title);
    setEditChartType(w.chartType);
    setEditXKey(w.xKey);
    setEditYKeys(w.yKeys);
    setEditColors(w.colors || ['#2563EB']);
    setEditNotes(w.annotations || '');
  };

  const handleSaveEdit = (widgetId: string) => {
    const updated = widgets.map(w => {
      if (w.id === widgetId) {
        return {
          ...w,
          title: editTitle,
          chartType: editChartType,
          xKey: editXKey,
          yKeys: editYKeys,
          colors: editColors,
          annotations: editNotes
        };
      }
      return w;
    });
    onUpdateWidgets(updated);
    setEditingWidgetId(null);
  };

  const handleToggleSpan = (widgetId: string) => {
    const updated = widgets.map(w => {
      if (w.id === widgetId) {
        return {
          ...w,
          gridSpan: (w.gridSpan === 'half' ? 'full' : 'half') as 'half' | 'full'
        };
      }
      return w;
    });
    onUpdateWidgets(updated);
  };

  const handleDeleteWidget = (widgetId: string) => {
    const filtered = widgets.filter(w => w.id !== widgetId);
    onUpdateWidgets(filtered);
  };

  const handleAddWidget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newXKey || !newYKey) return;

    const newWidget: Widget = {
      id: 'custom_widget_' + Date.now(),
      title: newTitle,
      chartType: newType,
      xKey: newXKey,
      yKeys: [newYKey],
      gridSpan: 'half',
      height: 280,
      colors: [themeColor === 'purple' ? '#7C3AED' : themeColor === 'emerald' ? '#10B981' : themeColor === 'amber' ? '#F59E0B' : '#2563EB'],
      annotations: 'Dibuat secara kustom menggunakan Dashboard Builder.'
    };

    onUpdateWidgets([...widgets, newWidget]);
    setShowAddWidget(false);
    resetNewForm();
  };

  const resetNewForm = () => {
    setNewTitle('Widget Kustom Baru');
    setNewType('bar');
    setNewXKey(dataset.columns[0] || '');
    setNewYKey(dataset.columns.find(c => dataset.columnTypes[c] === 'number') || '');
  };

  return (
    <div className="space-y-6" id="dashboard-sheet">
      
      {/* Control Action Headers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900" id="db-title-h2">
            Kanvas Interaktif
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Sesuaikan ukuran, warna, tipe grafik, atau tambahkan catatan anomali operasional langsung di tiap kartu widget.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="builder-add-widget-btn"
            onClick={() => setShowAddWidget(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-white font-sans text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Grafik Kustom
          </button>
        </div>
      </div>

      {isDarkMode && (
        <style>{`
          #db-title-h2 { color: #f8fafc !important; }
        `}</style>
      )}

      {/* Floating Panel: Add Custom Widget Form */}
      {showAddWidget && (
        <div className="bg-white p-5 rounded-2xl border border-neutral-150 shadow-md space-y-4" id="add-widget-modal">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <h3 className="font-sans font-bold text-neutral-900 text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Konfigurasi Grafik Kustom Baru
            </h3>
            <button 
              id="close-add-widget-btn"
              onClick={() => setShowAddWidget(false)} 
              className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleAddWidget}>
            <div>
              <label className="block text-[10px] font-mono tracking-wider uppercase text-neutral-500 mb-1">Judul Grafik</label>
              <input
                type="text"
                id="new-widget-title-input"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs px-2.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider uppercase text-neutral-500 mb-1">Model Visualisasi</label>
              <select
                id="new-widget-type-select"
                value={newType}
                onChange={(e) => setNewType(e.target.value as ChartType)}
                className="w-full text-xs px-2.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-blue-600"
              >
                <option value="bar">Bar Chart (Batang)</option>
                <option value="line">Line Chart (Garis)</option>
                <option value="area">Area Chart (Wilayah Sian)</option>
                <option value="pie">Pie Chart (Lingkaran)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider uppercase text-neutral-500 mb-1">Dimensi X (Garis Label)</label>
              <select
                id="new-widget-xkey-select"
                value={newXKey}
                onChange={(e) => setNewXKey(e.target.value)}
                className="w-full text-xs px-2.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-blue-600"
              >
                {dataset.columns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-[10px] font-mono tracking-wider uppercase text-neutral-500 mb-1">Metrik Y (Deret Angka)</label>
                <select
                  id="new-widget-ykey-select"
                  value={newYKey}
                  onChange={(e) => setNewYKey(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-blue-600"
                >
                  {numericColumns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                id="add-widget-save-btn"
                className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="kpis-container">
        {kpis.map((kpi) => {
          const KeyIcon = ICON_MAP[kpi.icon] || TrendingUp;
          const isPositive = kpi.changeType === 'positive';
          const isNegative = kpi.changeType === 'negative';

          return (
            <div 
              key={kpi.id} 
              id={`kpi-card-${kpi.id}`}
              className="bg-white p-5 rounded-2xl border border-neutral-150 shadow-xs flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">{kpi.label}</span>
                <p className="text-xl font-bold text-neutral-900 font-sans tracking-tight">{kpi.value}</p>
                {kpi.changeValue && (
                  <span className={`text-[10px] font-medium block ${
                    isPositive 
                      ? 'text-emerald-600' 
                      : isNegative 
                        ? 'text-red-500' 
                        : 'text-neutral-500'
                  }`}>
                    {kpi.changeValue}
                  </span>
                )}
              </div>
              <div className="h-10 w-10 rounded-xl bg-neutral-50 text-neutral-500 flex items-center justify-center">
                <KeyIcon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Visual Widgets Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="widgets-grid-container">
        {widgets.map((widget) => {
          const isFull = widget.gridSpan === 'full';
          const isEditing = editingWidgetId === widget.id;
          const wcolor = widget.colors?.[0] || '#2563EB';

          return (
            <div
              key={widget.id}
              id={`widget-card-${widget.id}`}
              className={`bg-white rounded-2xl border border-neutral-150 shadow-xs flex flex-col justify-between transition-all duration-200 ${
                isFull ? 'lg:col-span-12' : 'lg:col-span-6'
              }`}
            >
              {/* Widget Header Controls */}
              <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between">
                {isEditing ? (
                  <input
                    type="text"
                    id={`edit-title-input-${widget.id}`}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-xs font-semibold px-2 py-1 border border-neutral-200 rounded-md focus:outline-hidden focus:border-blue-600 w-full max-w-sm"
                  />
                ) : (
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-800 tracking-tight">{widget.title}</h3>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#2563EB] font-bold">Smart Chart Generator</span>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  {isEditing ? (
                    <button
                      id={`save-edit-btn-${widget.id}`}
                      onClick={() => handleSaveEdit(widget.id)}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[10px] font-bold cursor-pointer"
                    >
                      Selesai
                    </button>
                  ) : (
                    <>
                      {/* Resize card size button */}
                      <button
                        id={`resize-widget-btn-${widget.id}`}
                        onClick={() => handleToggleSpan(widget.id)}
                        className="p-1 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 rounded-md transition-colors cursor-pointer"
                        title={isFull ? 'Kecilkan Kartu' : 'Lebarkan Kartu'}
                      >
                        {isFull ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                      </button>

                      {/* Customize parameters button */}
                      <button
                        id={`edit-widget-btn-${widget.id}`}
                        onClick={() => handleStartEdit(widget)}
                        className="p-1 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 rounded-md transition-colors cursor-pointer"
                        title="Sesuaikan Parameter"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>

                      {/* Delete button */}
                      <button
                        id={`delete-widget-btn-${widget.id}`}
                        onClick={() => handleDeleteWidget(widget.id)}
                        className="p-1 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                        title="Hapus Grafik"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Editing controls panel directly beneath name if active */}
              {isEditing && (
                <div className="bg-neutral-50 p-4 border-b border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">Pilih Model Visual</label>
                    <div className="flex flex-wrap gap-1">
                      {['bar', 'line', 'area', 'pie', 'composed'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          id={`btn-chart-type-${type}`}
                          onClick={() => setEditChartType(type as ChartType)}
                          className={`px-2 py-1 text-[10px] font-sans font-semibold rounded-md border capitalize ${
                            editChartType === type 
                              ? 'border-blue-600 bg-blue-105 text-blue-700' 
                              : 'border-neutral-200 hover:bg-white text-neutral-600'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">Pilhan Warna Primer</label>
                    <div className="flex gap-1.5 mt-1">
                      {['#2563EB', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6D4C41'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          id={`color-picker-${c.replace('#', '')}`}
                          onClick={() => setEditColors([c, ...editColors.slice(1)])}
                          style={{ backgroundColor: c }}
                          className={`h-4.5 w-4.5 rounded-full border border-white relative ${
                            wcolor === c ? 'ring-1.5 ring-offset-1 ring-blue-600' : 'opacity-80'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">Catatan Tambahan (Anotasi Bisnis)</label>
                    <input
                      type="text"
                      id={`edit-notes-input-${widget.id}`}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Contoh: Turun akibat faktor seasonal lebaran"
                      className="w-full text-[11px] px-2 py-1.5 bg-white border border-neutral-200 rounded-md focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* Actual Visual Recharts Sheet */}
              <div className="p-5 flex-1 relative">
                {dataset.rows.length === 0 ? (
                  <div className="h-48 flex items-center justify-center text-neutral-400 text-xs">
                    Data tidak mencukupi untuk direntang dalam grafik.
                  </div>
                ) : (
                  <div style={{ width: '100%', height: widget.height }}>
                    <ResponsiveContainer>
                      {(() => {
                        const chartType = widget.chartType;
                        const xKey = widget.xKey;
                        const yKey = widget.yKeys[0]; // main Y metric
                        const secondaryYKey = widget.yKeys[1]; // secondary Y metric for composed charts

                        const color1 = widget.colors?.[0] || '#2563EB';
                        const color2 = widget.colors?.[1] || '#EB5757';

                        const cleanData = dataset.rows.map(row => {
                          const res: Record<string, any> = { ...row };
                          // Clean formatted names
                          return res;
                        });

                        // Standard common grid components to prevent copy paste
                        const commonGrid = <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />;
                        const commonX = <XAxis dataKey={xKey} tickLine={false} axisLine={false} style={{ fontSize: '10px', fontFamily: 'Inter' }} />;
                        const commonY = <YAxis tickLine={false} axisLine={false} style={{ fontSize: '10px', fontFamily: 'Inter' }} />;
                        const commonTooltip = <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0', fontFamily: 'Inter' }} />;
                        const commonLegend = <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'Inter', paddingTop: '8px' }} />;

                        if (chartType === 'line') {
                          return (
                            <LineChart data={cleanData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                              {commonGrid}
                              {commonX}
                              {commonY}
                              {commonTooltip}
                              {commonLegend}
                              <Line type="monotone" dataKey={yKey} stroke={color1} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                              {secondaryYKey && <Line type="monotone" dataKey={secondaryYKey} stroke={color2} strokeWidth={2} dot={{ r: 3 }} />}
                            </LineChart>
                          );
                        }

                        if (chartType === 'area') {
                          return (
                            <AreaChart data={cleanData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                              <defs>
                                <linearGradient id={`colorGrad-${widget.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={color1} stopOpacity={0.35} />
                                  <stop offset="95%" stopColor={color1} stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              {commonGrid}
                              {commonX}
                              {commonY}
                              {commonTooltip}
                              {commonLegend}
                              <Area type="monotone" dataKey={yKey} stroke={color1} strokeWidth={2} fillOpacity={1} fill={`url(#colorGrad-${widget.id})`} />
                            </AreaChart>
                          );
                        }

                        if (chartType === 'pie') {
                          return (
                            <PieChart margin={{ top: 10, bottom: 10 }}>
                              <Pie
                                data={cleanData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={70}
                                fill="#8884d8"
                                paddingAngle={3}
                                dataKey={yKey}
                                nameKey={xKey}
                                label={{ style: { fontSize: '9px', fontFamily: 'Inter' } }}
                              >
                                {cleanData.map((entry, index) => {
                                  const colorArr = [
                                    '#2563EB', '#7C3AED', '#10B981', '#F59E0B', 
                                    '#EF4444', '#EC4899', '#06B6D4', '#84CC16'
                                  ];
                                  return <Cell key={`cell-${index}`} fill={colorArr[index % colorArr.length]} />;
                                })}
                              </Pie>
                              {commonTooltip}
                              {commonLegend}
                            </PieChart>
                          );
                        }

                        if (chartType === 'composed') {
                          return (
                            <ComposedChart data={cleanData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                              {commonGrid}
                              {commonX}
                              {commonY}
                              {commonTooltip}
                              {commonLegend}
                              <Bar dataKey={yKey} fill={color1} radius={[4, 4, 0, 0]} barSize={25} />
                              {secondaryYKey && <Line type="monotone" dataKey={secondaryYKey} stroke={color2} strokeWidth={2.5} dot={{ r: 4 }} />}
                            </ComposedChart>
                          );
                        }

                        // Default: Bar
                        return (
                          <BarChart data={cleanData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                            {commonGrid}
                            {commonX}
                            {commonY}
                            {commonTooltip}
                            {commonLegend}
                            <Bar dataKey={yKey} fill={color1} radius={[4, 4, 0, 0]} barSize={widget.gridSpan === 'half' ? 20 : 35} />
                            {secondaryYKey && <Bar dataKey={secondaryYKey} fill={color2} radius={[4, 4, 0, 0]} barSize={widget.gridSpan === 'half' ? 15 : 25} />}
                          </BarChart>
                        );
                      })()}
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Render dynamic annotations notes if populated */}
              {widget.annotations && (
                <div className="mx-5 mb-4 p-2.5 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-2">
                  <Clock className="h-3.5 w-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-neutral-600 font-sans italic leading-relaxed">
                    <strong>Catatan Analis:</strong> {widget.annotations}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
