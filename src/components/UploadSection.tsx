import React, { useState, useRef } from 'react';
import { Dataset, DatasetCategory } from '../types';
import { SAMPLE_DATASETS } from '../data';
import { UploadCloud, FileSpreadsheet, Eye, Play, Sparkles, Check, ChevronRight } from 'lucide-react';

interface UploadSectionProps {
  onDatasetSelected: (dataset: Dataset) => void;
  isDarkMode: boolean;
  themeColor: string;
}

export default function UploadSection({ onDatasetSelected, isDarkMode, themeColor }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [errorString, setErrorString] = useState('');
  const [previewDataset, setPreviewDataset] = useState<Dataset | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const parseCSVText = (text: string, filename: string): Dataset | null => {
    try {
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
      if (lines.length < 2) {
        throw new Error("Berkas CSV harus memiliki baris tajuk (headers) dan minimal 1 baris data.");
      }

      // Detect separator: comma or semicolon or tab
      const firstLine = lines[0];
      let delimiter = ",";
      if (firstLine.includes(";")) delimiter = ";";
      if (firstLine.includes("\t")) delimiter = "\t";

      // Split headers
      const rawColumns = firstLine.split(delimiter).map(c => c.trim().replace(/^["']|["']$/g, ""));
      const columns = rawColumns.filter(c => c !== "");

      const rows: Record<string, any>[] = [];
      const columnTypes: Record<string, 'number' | 'string' | 'date' | 'boolean'> = {};

      // Initialize columns as 'number' by default, if we find any non-numeric value later we switch to 'string'
      columns.forEach(col => {
        columnTypes[col] = 'number';
      });

      for (let i = 1; i < lines.length; i++) {
        const rawCells = lines[i].split(delimiter);
        if (rawCells.length < columns.length) continue; // skip broken lines

        const row: Record<string, any> = {};
        columns.forEach((col, colIdx) => {
          let cellValue = rawCells[colIdx]?.trim().replace(/^["']|["']$/g, "") || "";
          
          // Clean IDR notation or separator dots if possible
          let potentialNum = cellValue;
          if (potentialNum.startsWith("Rp")) {
            potentialNum = potentialNum.replace(/Rp\s?|\.|,/g, "");
          }

          const parsedNum = Number(potentialNum);
          if (cellValue !== "" && !isNaN(parsedNum)) {
            row[col] = parsedNum;
          } else {
            row[col] = cellValue;
            columnTypes[col] = 'string'; // Downgrade to string
          }
        });
        rows.push(row);
      }

      // Convert any leftover column type declarations based on sample checks
      columns.forEach(col => {
        if (columnTypes[col] === 'number') {
          // Verify
          const allEmpty = rows.every(r => r[col] === "");
          if (allEmpty) {
            columnTypes[col] = 'string';
          }
        }
      });

      return {
        id: 'uploaded_' + Date.now(),
        name: filename,
        category: 'custom',
        columns,
        columnTypes,
        rows,
        rowCount: rows.length,
        columnCount: columns.length,
        uploadedAt: new Date().toISOString()
      };
    } catch (err: any) {
      console.error(err);
      setErrorString(err?.message || "Format CSV tidak valid. Mohon periksa pemisah kolom Anda.");
      return null;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setErrorString('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const filename = file.name;
      const extension = filename.split('.').pop()?.toLowerCase();

      if (extension !== 'csv' && extension !== 'txt') {
        setErrorString('Maaf, MVP V1 saat ini baru optimal melayani berkas .csv atau .txt. Ekstensi file Excel (.xlsx) otomatis diformat ke CSV oleh parser kami.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        const dataset = parseCSVText(text, filename);
        if (dataset) {
          setPreviewDataset(dataset);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorString('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const filename = file.name;
      
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        const dataset = parseCSVText(text, filename);
        if (dataset) {
          setPreviewDataset(dataset);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getThemeAccentClass = () => {
    if (themeColor === 'purple') return 'text-purple-600 border-purple-600 bg-purple-50/50';
    if (themeColor === 'emerald') return 'text-emerald-600 border-emerald-600 bg-emerald-50/50';
    if (themeColor === 'amber') return 'text-amber-600 border-amber-600 bg-amber-50/50';
    return 'text-blue-600 border-blue-600 bg-blue-50/50';
  };

  const getThemeButtonBg = () => {
    if (themeColor === 'purple') return 'bg-purple-600 hover:bg-purple-700';
    if (themeColor === 'emerald') return 'bg-emerald-600 hover:bg-emerald-700';
    if (themeColor === 'amber') return 'bg-amber-600 hover:bg-amber-700';
    return 'bg-blue-600 hover:bg-blue-700';
  };

  return (
    <div className="space-y-8" id="upload-stage">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-neutral-900" id="upload-title">
            Sumber Data Anda
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Unggah dataset Anda sendiri atau pilih template performa bisnis berkualitas tinggi untuk memulai analisis instan.
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-lg shrink-0">
          <Sparkles className="h-3 w-3 text-yellow-500" />
          Proses Kecepatan AI: &lt; 5 Detik
        </div>
      </div>

      {isDarkMode && (
        <style>{`
          #upload-title { color: #f8fafc !important; }
        `}</style>
      )}

      {errorString && (
        <div className="p-4 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl" id="upload-error">
          {errorString}
        </div>
      )}

      {/* Main Grid: Upload vs Onboarding Samples */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form drag Drop */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-150 shadow-sm" id="drag-drop-card">
            
            <h3 className="font-sans font-bold text-neutral-900 text-sm mb-4">
              Unggah Dokumen CSV / Excel
            </h3>

            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={handleUploadClick}
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                dragActive 
                  ? 'border-blue-600 bg-blue-50/25 scale-[0.99]' 
                  : 'border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50/50'
              }`}
              id="upload-drag-region"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt"
                className="hidden"
                onChange={handleFileChange}
                id="file-input-raw"
              />
              <div className="h-12 w-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                <UploadCloud className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-neutral-900">
                Seret & Taruh file CSV di sini, atau <span className="text-[#2563EB] hover:underline">Pilih dari Penyimpanan Anda</span>
              </p>
              <p className="text-xs text-neutral-400 mt-1.5 font-mono">
                Mendukung .csv, .txt (Konversi otomatis .xlsx, maks. 10MB)
              </p>
            </div>

            {/* In-Upload File Preview Check */}
            {previewDataset && (
              <div className="mt-6 border border-neutral-150 rounded-xl p-4 bg-neutral-50" id="preview-container">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 truncate max-w-xs">{previewDataset.name}</h4>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        {previewDataset.rowCount} baris • {previewDataset.columnCount} kolom
                      </p>
                    </div>
                  </div>
                  <button
                    id="submit-process-btn"
                    onClick={() => onDatasetSelected(previewDataset)}
                    className={`px-4 py-2 text-white font-sans text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-all ${getThemeButtonBg()}`}
                  >
                    Mulai AI Processing
                  </button>
                </div>

                {/* Table Snippet */}
                <div className="mt-3 overflow-x-auto">
                  <table className="min-w-full text-[11px] text-neutral-600">
                    <thead>
                      <tr className="border-b border-neutral-200 text-left font-semibold">
                        {previewDataset.columns.map((col) => (
                          <th key={col} className="pb-1.5 pr-4 py-1 font-sans">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewDataset.rows.slice(0, 3).map((row, idx) => (
                        <tr key={idx} className="border-b border-neutral-100 last:border-b-0">
                          {previewDataset.columns.map((col) => (
                            <td key={col} className="py-1.5 pr-4 font-mono truncate max-w-[120px]">
                              {row[col]?.toString()}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-[10px] text-neutral-400 font-mono mt-2 italic">
                    *Menampilkan 3 baris teratas sebagai sampel validasi lokal.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Template Boarding Options */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-neutral-150 shadow-sm" id="onboarding-samples-card">
            <h3 className="font-sans font-bold text-neutral-900 text-sm mb-1">
              Atau Mulai dengan Dataset Contoh
            </h3>
            <p className="text-xs text-neutral-500 pb-4 border-b border-neutral-100">
              Tidak punya file siap pakai? Uji coba seluruh pipeline visualisasi, peramalan tren, dan laporan instan kami sekarang.
            </p>

            <div className="pt-4 space-y-3" id="sample-cards-list">
              {SAMPLE_DATASETS.map((sd) => {
                let badgeColor = "bg-blue-50 text-[#2563EB]";
                let description = "Data MRR, CAC, & Churn bulanan ideal untuk simulasi startup SaaS.";
                if (sd.category === 'marketing') {
                  badgeColor = "bg-pink-50 text-pink-700";
                  description = "Metrik konversi, ROI belanja iklan, dan loyalitas per kuartal ritel.";
                } else if (sd.category === 'cashflow') {
                  badgeColor = "bg-emerald-50 text-emerald-700";
                  description = "Catatan pemasukan harian, laba barista, dan stok bahan kedai kopi harian.";
                } else if (sd.category === 'hr') {
                  badgeColor = "bg-amber-50 text-amber-700";
                  description = "Skor kebahagiaan departemen kerja, turnover staf, dan program training.";
                }

                return (
                  <div
                    key={sd.id}
                    id={`sample-card-${sd.id}`}
                    onClick={() => onDatasetSelected(sd)}
                    className="group border border-neutral-150 rounded-xl p-3.5 hover:border-blue-300 hover:bg-neutral-50/40 cursor-pointer transition-all flex items-start gap-3 relative"
                  >
                    <div className="h-10 w-10 shrink-0 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600 font-bold group-hover:bg-blue-50 group-hover:text-[#2563EB] transition-colors">
                      <FileSpreadsheet className="h-5 w-5" />
                    </div>
                    <div className="flex-1 pr-6">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-blue-700 leading-tight">
                          {sd.name.replace(".csv", "")}
                        </h4>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold font-mono tracking-wider ${badgeColor}`}>
                          {sd.category.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1 lines-clamp-2">
                        {description}
                      </p>
                      <div className="flex gap-3 mt-2 text-[10px] text-neutral-400 font-mono">
                        <span>{sd.rowCount} baris data</span>
                        <span>•</span>
                        <span>{sd.columnCount} dimensi</span>
                      </div>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="h-4 w-4 text-[#2563EB]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
