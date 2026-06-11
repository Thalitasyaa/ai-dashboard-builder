export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: 'free' | 'pro' | 'business';
}

export type DatasetCategory = 'sales' | 'marketing' | 'hr' | 'cashflow' | 'custom';

export interface Dataset {
  id: string;
  name: string;
  category: DatasetCategory;
  columns: string[];
  columnTypes: Record<string, 'number' | 'string' | 'date' | 'boolean'>;
  rows: Record<string, any>[];
  rowCount: number;
  columnCount: number;
  uploadedAt: string;
}

export interface CleaningLog {
  column: string;
  issue: string;
  actionTaken: string;
  severity: 'low' | 'medium' | 'high';
}

export interface DataCleaningSummary {
  missingValuesFixed: number;
  duplicatesRemoved: number;
  corruptedRowsCorrected: number;
  logs: CleaningLog[];
}

export type ChartType = 'bar' | 'line' | 'area' | 'pie' | 'composed';

export interface Widget {
  id: string;
  title: string;
  chartType: ChartType;
  xKey: string;
  yKeys: string[];
  gridSpan: 'half' | 'full';
  height: number;
  colors?: string[];
  annotations?: string;
}

export interface KPI {
  id: string;
  label: string;
  value: string | number;
  changeValue?: string; // e.g. "+12.4% vs last mo"
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface InsightItem {
  id: string;
  title: string;
  category: 'performance' | 'warning' | 'opportunity' | 'efficiency';
  description: string;
  businessImpact: string;
  recommendation: string;
}

export interface ForecastPoint {
  period: string; // Month name or Date
  historicalValue?: number;
  forecastedLower?: number;
  forecastedValue?: number;
  forecastedUpper?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
