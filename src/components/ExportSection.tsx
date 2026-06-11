import React, { useState } from 'react';
import { Dataset, Widget, KPI, InsightItem } from '../types';
import { Download, FileSpreadsheet, FileCode, Printer, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';

interface ExportSectionProps {
  dataset: Dataset;
  widgets: Widget[];
  kpis: KPI[];
  insights: InsightItem[];
  isDarkMode: boolean;
  themeColor: string;
}

export default function ExportSection({
  dataset,
  widgets,
  kpis,
  insights,
  isDarkMode,
  themeColor
}: ExportSectionProps) {
  const [successMessage, setSuccessMessage] = useState('');
  const [exportingType, setExportingType] = useState<string | null>(null);

  const triggerDownload = (content: string, mimeType: string, filename: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    setExportingType('csv');
    setTimeout(() => {
      // Build raw CSV string from dataset rows
      const cols = dataset.columns;
      const headerRow = cols.join(",");
      const dataRows = dataset.rows.map(row => {
        return cols.map(c => {
          let cell = row[c] !== undefined ? row[c].toString() : '';
          // Escape quotes
          if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
            cell = `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        }).join(",");
      });

      const csvContent = [headerRow, ...dataRows].join("\n");
      // Sanitize name
      const filename = dataset.name.replace(".csv", "") + "_InsightFlow_Cleaned.csv";
      triggerDownload(csvContent, 'text/csv;charset=utf-8;', filename);
      
      setExportingType(null);
      showTemporarySuccess('Dataset hasil cleaning CSV berhasil diunduh secara fisik!');
    }, 1000);
  };

  const handleExportJSON = () => {
    setExportingType('json');
    setTimeout(() => {
      const fullPackage = {
        metadata: {
          exporter: "InsightFlow AI",
          timestamp: new Date().toISOString(),
          datasetName: dataset.name,
          category: dataset.category
        },
        dataset: {
          columns: dataset.columns,
          types: dataset.columnTypes,
          rows: dataset.rows
        },
        dashboard: {
          kpiMetrics: kpis,
          activeWidgets: widgets.map(w => ({
            title: w.title,
            type: w.chartType,
            keys: w.yKeys,
            annotations: w.annotations
          }))
        },
        insights: insights
      };

      const jsonStr = JSON.stringify(fullPackage, null, 2);
      const filename = dataset.name.replace(".csv", "") + "_Dashboard_Config.json";
      triggerDownload(jsonStr, 'application/json;charset=utf-8;', filename);

      setExportingType(null);
      showTemporarySuccess('Konfigurasi penuh dashboard JSON berhasil diunduh!');
    }, 800);
  };

  const handlePrintPDF = () => {
    setExportingType('pdf');
    setTimeout(() => {
      setExportingType(null);
      // Opens standard OS printer helper styled with clean printing media query sheet
      window.print();
    }, 500);
  };

  const showTemporarySuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  const getThemeButtonBg = () => {
    if (themeColor === 'purple') return 'bg-purple-600 hover:bg-purple-700';
    if (themeColor === 'emerald') return 'bg-emerald-600 hover:bg-emerald-700';
    if (themeColor === 'amber') return 'bg-amber-600 hover:bg-amber-700';
    return 'bg-blue-600 hover:bg-blue-700';
  };

  return (
    <div className="space-y-6" id="export-stage">
      
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900" id="export-section-title">
          Ekspor &amp; Pusat Laporan Bisnis
        </h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Unduh salinan dataset pasca-cleaning, berkas konfigurasi visual, atau cetak laporan PDF eksekutif instan.
        </p>
      </div>

      {isDarkMode && (
        <style>{`
          #export-section-title { color: #f8fafc !important; }
        `}</style>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-xl border border-emerald-150 flex items-center gap-2" id="export-success">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Exporter Card: PDF */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-150 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="h-9 w-9 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
              <Printer className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-neutral-900 text-sm">Cetak Laporan PDF</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Konfigurasi penataan kami secara otomatis menyederhanakan layout agar tercetak dengan proporsional pada berkas cetak PDF standard A4.
            </p>
          </div>
          <button
            id="print-pdf-btn"
            onClick={handlePrintPDF}
            disabled={exportingType !== null}
            className={`w-full py-2.5 text-white font-sans text-xs font-semibold rounded-xl cursor-pointer transition-all ${getThemeButtonBg()}`}
          >
            {exportingType === 'pdf' ? 'Mempersiapkan Printer...' : 'Cetak / Save ke PDF'}
          </button>
        </div>

        {/* Exporter Card: CSV */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-150 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="h-9 w-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-neutral-900 text-sm">Download Cleaned CSV</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Unduh salinan dataset pasca-pembersihan AI dengan standard huruf kapital, isian rata-rata, bebas duplikasi, dan siap diimpor ke tools lain.
            </p>
          </div>
          <button
            id="export-csv-btn"
            onClick={handleExportCSV}
            disabled={exportingType !== null}
            className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-850 text-white font-sans text-xs font-semibold rounded-xl cursor-pointer transition-all"
          >
            {exportingType === 'csv' ? 'Mengekspor CSV...' : 'Download Cleaned CSV'}
          </button>
        </div>

        {/* Exporter Card: JSON */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-150 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="h-9 w-9 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <FileCode className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-neutral-900 text-sm">Download Config JSON</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Ekspor seluruh konfigurasi visual widget, KPI terhitung, anotasi analis data, dan ringkasan insight bisnis teratas ke berkas data JSON terstruktur.
            </p>
          </div>
          <button
            id="export-json-btn"
            onClick={handleExportJSON}
            disabled={exportingType !== null}
            className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-sans text-xs font-semibold rounded-xl cursor-pointer transition-all"
          >
            {exportingType === 'json' ? 'Mengemas JSON...' : 'Download Full JSON'}
          </button>
        </div>

      </div>

      {/* Embedded hidden printable area container for professional window.print styled using layout blocks */}
      <div className="hidden print:block bg-white p-8 text-neutral-900" id="print-area-full">
        <center className="space-y-1 mb-8">
          <h1 className="text-2xl font-bold font-sans">LAPORAN ANALISIS BISNIS EKSEKUTIF</h1>
          <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider">InsightFlow AI Powered Analytics report</p>
          <div className="border-b border-neutral-300 w-32 pt-2"></div>
        </center>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-200 text-xs">
            <div>
              <p><strong>Nama Berkas:</strong> {dataset.name}</p>
              <p><strong>Total Rekaman:</strong> {dataset.rowCount} Baris Data</p>
              <p><strong>Tanggal Pemrosesan:</strong> {new Date().toLocaleDateString("id-ID")}</p>
            </div>
            <div className="text-right">
              <p><strong>Platform:</strong> InsightFlow AI Dashboard</p>
              <p><strong>Penganalisis:</strong> Gemini AI Engine</p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold mb-3 font-sans border-b pb-1">Metrik Kunci Operasional (KPI)</h2>
            <div className="grid grid-cols-3 gap-2">
              {kpis.map(kpi => (
                <div key={kpi.id} className="p-3 border rounded-lg">
                  <p className="text-[10px] text-neutral-400 uppercase font-mono">{kpi.label}</p>
                  <p className="text-base font-bold">{kpi.value}</p>
                  <p className="text-[9px] text-[#2563EB]">{kpi.changeValue}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold mb-3 font-sans border-b pb-1">Rangkuman Business Insights Strategis</h2>
            <div className="space-y-4">
              {insights.slice(0, 3).map((item, idx) => (
                <div key={item.id} className="p-3 border rounded-lg bg-neutral-50">
                  <h3 className="text-xs font-bold">{idx + 1}. {item.title} ({item.category.toUpperCase()})</h3>
                  <p className="text-[11px] text-neutral-600 mt-1">{item.description}</p>
                  <p className="text-[11px] text-neutral-700 mt-2">🎯 <strong>Dampak:</strong> {item.businessImpact}</p>
                  <p className="text-[11px] text-neutral-800 font-semibold">💡 <strong>Solusi:</strong> {item.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-dotted text-center text-[10px] text-neutral-405 font-mono">
            *Laporan ini dicetak secara otomatis melalui portal navigasi digital InsightFlow AI di browser Anda.
          </div>
        </div>
      </div>

    </div>
  );
}
