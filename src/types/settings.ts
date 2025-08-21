export interface Settings {
  temperatureUnit: 'celsius' | 'fahrenheit';
  language: string;
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // in minutes
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
} 