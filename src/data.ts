import { Dataset } from './types';

export const SAMPLE_DATASETS: Dataset[] = [
  {
    id: 'sample_saas_sales',
    name: 'SaaS Sales & Subscription Performance V1.csv',
    category: 'sales',
    columns: ['Bulan', 'Pendapatan_MRR', 'Pelanggan_Aktif', 'CAC_Biaya_Akuisisi', 'Churn_Rate_Persen', 'Skor_Net_Promoter'],
    columnTypes: {
      'Bulan': 'string',
      'Pendapatan_MRR': 'number',
      'Pelanggan_Aktif': 'number',
      'CAC_Biaya_Akuisisi': 'number',
      'Churn_Rate_Persen': 'number',
      'Skor_Net_Promoter': 'number'
    },
    rows: [
      { Bulan: 'Januari', Pendapatan_MRR: 12000, Pelanggan_Aktif: 240, CAC_Biaya_Akuisisi: 120, Churn_Rate_Persen: 4.5, Skor_Net_Promoter: 72 },
      { Bulan: 'Februari', Pendapatan_MRR: 14500, Pelanggan_Aktif: 290, CAC_Biaya_Akuisisi: 110, Churn_Rate_Persen: 4.2, Skor_Net_Promoter: 74 },
      { Bulan: 'Maret', Pendapatan_MRR: 18000, Pelanggan_Aktif: 360, CAC_Biaya_Akuisisi: 95, Churn_Rate_Persen: 3.8, Skor_Net_Promoter: 75 },
      { Bulan: 'April', Pendapatan_MRR: 21500, Pelanggan_Aktif: 430, CAC_Biaya_Akuisisi: 105, Churn_Rate_Persen: 3.5, Skor_Net_Promoter: 77 },
      { Bulan: 'Mei', Pendapatan_MRR: 26000, Pelanggan_Aktif: 520, CAC_Biaya_Akuisisi: 100, Churn_Rate_Persen: 3.1, Skor_Net_Promoter: 80 },
      { Bulan: 'Juni', Pendapatan_MRR: 30500, Pelanggan_Aktif: 610, CAC_Biaya_Akuisisi: 90, Churn_Rate_Persen: 2.8, Skor_Net_Promoter: 82 },
      { Bulan: 'Juli', Pendapatan_MRR: 35000, Pelanggan_Aktif: 700, CAC_Biaya_Akuisisi: 85, Churn_Rate_Persen: 2.5, Skor_Net_Promoter: 85 },
      { Bulan: 'Agustus', Pendapatan_MRR: 41000, Pelanggan_Aktif: 820, CAC_Biaya_Akuisisi: 88, Churn_Rate_Persen: 2.3, Skor_Net_Promoter: 86 },
      { Bulan: 'September', Pendapatan_MRR: 47500, Pelanggan_Aktif: 950, CAC_Biaya_Akuisisi: 82, Churn_Rate_Persen: 2.0, Skor_Net_Promoter: 88 },
      { Bulan: 'Oktober', Pendapatan_MRR: 54000, Pelanggan_Aktif: 1080, CAC_Biaya_Akuisisi: 80, Churn_Rate_Persen: 1.9, Skor_Net_Promoter: 89 },
      { Bulan: 'November', Pendapatan_MRR: 62000, Pelanggan_Aktif: 1240, CAC_Biaya_Akuisisi: 78, Churn_Rate_Persen: 1.7, Skor_Net_Promoter: 91 },
      { Bulan: 'Desember', Pendapatan_MRR: 71000, Pelanggan_Aktif: 1420, CAC_Biaya_Akuisisi: 75, Churn_Rate_Persen: 1.5, Skor_Net_Promoter: 93 }
    ],
    rowCount: 12,
    columnCount: 6,
    uploadedAt: '2026-06-10T10:30:00Z'
  },
  {
    id: 'sample_ecommerce_retention',
    name: 'E-Commerce Marketing ROI & Retention.csv',
    category: 'marketing',
    columns: ['Kuartal', 'Belanja_Iklan_IDR', 'Pendapatan_Kotor_IDR', 'Jumlah_Transaksi', 'Tingkat_Konversi_Persen', 'Rasio_Pelanggan_Satia'],
    columnTypes: {
      'Kuartal': 'string',
      'Belanja_Iklan_IDR': 'number',
      'Pendapatan_Kotor_IDR': 'number',
      'Jumlah_Transaksi': 'number',
      'Tingkat_Konversi_Persen': 'number',
      'Rasio_Pelanggan_Satia': 'number'
    },
    rows: [
      { Kuartal: 'Q1-2025', Belanja_Iklan_IDR: 45000000, Pendapatan_Kotor_IDR: 180000000, Jumlah_Transaksi: 1200, Tingkat_Konversi_Persen: 2.1, Rasio_Pelanggan_Satia: 45 },
      { Kuartal: 'Q2-2025', Belanja_Iklan_IDR: 60000000, Pendapatan_Kotor_IDR: 260000000, Jumlah_Transaksi: 1650, Tingkat_Konversi_Persen: 2.4, Rasio_Pelanggan_Satia: 48 },
      { Kuartal: 'Q3-2025', Belanja_Iklan_IDR: 50000000, Pendapatan_Kotor_IDR: 230000000, Jumlah_Transaksi: 1400, Tingkat_Konversi_Persen: 2.3, Rasio_Pelanggan_Satia: 50 },
      { Kuartal: 'Q4-2025', Belanja_Iklan_IDR: 90000000, Pendapatan_Kotor_IDR: 410000000, Jumlah_Transaksi: 2700, Tingkat_Konversi_Persen: 3.1, Rasio_Pelanggan_Satia: 55 },
      { Kuartal: 'Q1-2026', Belanja_Iklan_IDR: 55000000, Pendapatan_Kotor_IDR: 245000000, Jumlah_Transaksi: 1600, Tingkat_Konversi_Persen: 2.5, Rasio_Pelanggan_Satia: 56 },
      { Kuartal: 'Q2-2026', Belanja_Iklan_IDR: 75000000, Pendapatan_Kotor_IDR: 350000000, Jumlah_Transaksi: 2100, Tingkat_Konversi_Persen: 2.8, Rasio_Pelanggan_Satia: 60 }
    ],
    rowCount: 6,
    columnCount: 6,
    uploadedAt: '2026-06-10T11:00:00Z'
  },
  {
    id: 'sample_sme_cashflow',
    name: 'UMKM_Cafe_Kopi_Daily_Cashflow.csv',
    category: 'cashflow',
    columns: ['Hari', 'Pemasukan_Harian_IDR', 'Pengeluaran_Operasional_IDR', 'Laba_Bersih_IDR', 'Transaksi_Kasir', 'Stok_Biji_Kopi_Kg'],
    columnTypes: {
      'Hari': 'string',
      'Pemasukan_Harian_IDR': 'number',
      'Pengeluaran_Operasional_IDR': 'number',
      'Laba_Bersih_IDR': 'number',
      'Transaksi_Kasir': 'number',
      'Stok_Biji_Kopi_Kg': 'number'
    },
    rows: [
      { Hari: 'Senin', Pemasukan_Harian_IDR: 1200000, Pengeluaran_Operasional_IDR: 700000, Laba_Bersih_IDR: 500000, Transaksi_Kasir: 45, Stok_Biji_Kopi_Kg: 24 },
      { Hari: 'Selasa', Pemasukan_Harian_IDR: 1500000, Pengeluaran_Operasional_IDR: 750000, Laba_Bersih_IDR: 750000, Transaksi_Kasir: 52, Stok_Biji_Kopi_Kg: 21 },
      { Hari: 'Rabu', Pemasukan_Harian_IDR: 1400000, Pengeluaran_Operasional_IDR: 750000, Laba_Bersih_IDR: 650000, Transaksi_Kasir: 48, Stok_Biji_Kopi_Kg: 18 },
      { Hari: 'Kamis', Pemasukan_Harian_IDR: 1800000, Pengeluaran_Operasional_IDR: 800000, Laba_Bersih_IDR: 1000000, Transaksi_Kasir: 60, Stok_Biji_Kopi_Kg: 15 },
      { Hari: 'Jumat', Pemasukan_Harian_IDR: 2700000, Pengeluaran_Operasional_IDR: 950000, Laba_Bersih_IDR: 1750000, Transaksi_Kasir: 85, Stok_Biji_Kopi_Kg: 11 },
      { Hari: 'Sabtu', Pemasukan_Harian_IDR: 4200000, Pengeluaran_Operasional_IDR: 1200000, Laba_Bersih_IDR: 3000000, Transaksi_Kasir: 140, Stok_Biji_Kopi_Kg: 5 },
      { Hari: 'Minggu', Pemasukan_Harian_IDR: 3800000, Pengeluaran_Operasional_IDR: 1100000, Laba_Bersih_IDR: 2700000, Transaksi_Kasir: 125, Stok_Biji_Kopi_Kg: 30 }
    ],
    rowCount: 7,
    columnCount: 6,
    uploadedAt: '2026-06-10T11:15:00Z'
  },
  {
    id: 'sample_hr_satisfaction',
    name: 'HR Employee Engagement V2.csv',
    category: 'hr',
    columns: ['Departemen', 'Skor_Kepuasan_Karyawan', 'Turnover_Rate', 'Rata_Jam_Pelatihan', 'Persen_Promosi_Internal', 'Jumlah_Anggota_Tim'],
    columnTypes: {
      'Departemen': 'string',
      'Skor_Kepuasan_Karyawan': 'number',
      'Turnover_Rate': 'number',
      'Rata_Jam_Pelatihan': 'number',
      'Persen_Promosi_Internal': 'number',
      'Jumlah_Anggota_Tim': 'number'
    },
    rows: [
      { Departemen: 'Teknologi & Eng', Skor_Kepuasan_Karyawan: 8.4, Turnover_Rate: 6.2, Rata_Jam_Pelatihan: 42, Persen_Promosi_Internal: 15, Jumlah_Anggota_Tim: 48 },
      { Departemen: 'Sales & Marketing', Skor_Kepuasan_Karyawan: 7.9, Turnover_Rate: 14.5, Rata_Jam_Pelatihan: 30, Persen_Promosi_Internal: 12, Jumlah_Anggota_Tim: 36 },
      { Departemen: 'Keuangan & Finance', Skor_Kepuasan_Karyawan: 8.1, Turnover_Rate: 5.0, Rata_Jam_Pelatihan: 24, Persen_Promosi_Internal: 8, Jumlah_Anggota_Tim: 12 },
      { Departemen: 'Human Resources', Skor_Kepuasan_Karyawan: 8.9, Turnover_Rate: 4.0, Rata_Jam_Pelatihan: 36, Persen_Promosi_Internal: 20, Jumlah_Anggota_Tim: 8 },
      { Departemen: 'Operations & CS', Skor_Kepuasan_Karyawan: 7.5, Turnover_Rate: 18.0, Rata_Jam_Pelatihan: 15, Persen_Promosi_Internal: 5, Jumlah_Anggota_Tim: 55 }
    ],
    rowCount: 5,
    columnCount: 6,
    uploadedAt: '2026-06-10T11:20:00Z'
  }
];

// Helper to calculate realistic default widgets for standard dataset
export function getDefaultWidgets(datasetId: string): any[] {
  if (datasetId === 'sample_saas_sales') {
    return [
      {
        id: 'widget_mrr',
        title: 'Tren Pendapatan Bulanan (MRR)',
        chartType: 'area',
        xKey: 'Bulan',
        yKeys: ['Pendapatan_MRR'],
        gridSpan: 'full',
        height: 320,
        colors: ['#3B82F6']
      },
      {
        id: 'widget_pelanggan_cac',
        title: 'Pertumbuhan Pelanggan vs Biaya Akuisisi (CAC)',
        chartType: 'composed',
        xKey: 'Bulan',
        yKeys: ['Pelanggan_Aktif', 'CAC_Biaya_Akuisisi'],
        gridSpan: 'half',
        height: 280,
        colors: ['#8B5CF6', '#EF4444']
      },
      {
        id: 'widget_churn_nps',
        title: 'Tingkat Churn vs Net Promoter Score',
        chartType: 'line',
        xKey: 'Bulan',
        yKeys: ['Churn_Rate_Persen', 'Skor_Net_Promoter'],
        gridSpan: 'half',
        height: 280,
        colors: ['#10B981', '#F59E0B']
      }
    ];
  }

  if (datasetId === 'sample_ecommerce_retention') {
    return [
      {
        id: 'widget_ecommerce_roi',
        title: 'Revenue vs Belanja Iklan Per Kuartal',
        chartType: 'bar',
        xKey: 'Kuartal',
        yKeys: ['Pendapatan_Kotor_IDR', 'Belanja_Iklan_IDR'],
        gridSpan: 'full',
        height: 320,
        colors: ['#3B82F6', '#EC4899']
      },
      {
        id: 'widget_conversions',
        title: 'Trend Tingkat Konversi (%)',
        chartType: 'line',
        xKey: 'Kuartal',
        yKeys: ['Tingkat_Konversi_Persen'],
        gridSpan: 'half',
        height: 280,
        colors: ['#10B981']
      },
      {
        id: 'widget_loyalty',
        title: 'Rasio Pelanggan Setia (%)',
        chartType: 'area',
        xKey: 'Kuartal',
        yKeys: ['Rasio_Pelanggan_Satia'],
        gridSpan: 'half',
        height: 280,
        colors: ['#8B5CF6']
      }
    ];
  }

  if (datasetId === 'sample_sme_cashflow') {
    return [
      {
        id: 'widget_cashflow_bars',
        title: 'Arus Kas Harian: Pemasukan vs Pengeluaran',
        chartType: 'bar',
        xKey: 'Hari',
        yKeys: ['Pemasukan_Harian_IDR', 'Pengeluaran_Operasional_IDR'],
        gridSpan: 'full',
        height: 320,
        colors: ['#10B981', '#EF4444']
      },
      {
        id: 'widget_net_profit',
        title: 'Keuntungan Bersih Harian (Laba Bersih)',
        chartType: 'area',
        xKey: 'Hari',
        yKeys: ['Laba_Bersih_IDR'],
        gridSpan: 'half',
        height: 280,
        colors: ['#F59E0B']
      },
      {
        id: 'widget_stok_transaksi',
        title: 'Stok Biji Kopi (Kg) & Jumlah Transaksi',
        chartType: 'composed',
        xKey: 'Hari',
        yKeys: ['Stok_Biji_Kopi_Kg', 'Transaksi_Kasir'],
        gridSpan: 'half',
        height: 280,
        colors: ['#6D4C41', '#3B82F6']
      }
    ];
  }

  // Fallback
  return [
    {
      id: 'widget_generic_1',
      title: 'Distribusi Data Utama',
      chartType: 'bar',
      xKey: '',
      yKeys: [],
      gridSpan: 'full',
      height: 300,
      colors: ['#3B82F6']
    }
  ];
}
