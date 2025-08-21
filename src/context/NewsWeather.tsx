import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData, ForecastData } from '../types/weather';
import { NewsArticle } from '../types/news';
import { fetchWeather, fetchWeatherForecast } from '../services/weather';
import { filterNewsByWeather } from '../utils/weatherNewsFilter';

interface UserSettings {
  temperatureUnit: 'celsius' | 'fahrenheit';
  newsCategories: string[];
  enableWeatherFiltering: boolean;
}

interface NewsWeatherContextType {
  // Weather state
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  weatherLoading: boolean;
  weatherError: string | null;
  
  // News state
  newsData: NewsArticle[] | null;
  newsLoading: boolean;
  newsError: string | null;
  
  // Settings state
  userSettings: UserSettings;
  
  // Actions
  fetchWeather: (lat: number, lon: number) => Promise<void>;
  fetchNews: (category?: string) => Promise<void>;
  clearErrors: () => void;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  getFilteredNews: () => NewsArticle[];
}

const NewsWeatherContext = createContext<NewsWeatherContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(NewsWeatherContext);
  if (!context) {
    throw new Error('useAppContext must be used within a NewsWeatherProvider');
  }
  return context;
};

interface NewsWeatherProviderProps {
  children: React.ReactNode;
}

const DEFAULT_SETTINGS: UserSettings = {
  temperatureUnit: 'celsius',
  newsCategories: ['general'],
  enableWeatherFiltering: true,
};

export const NewsWeatherProvider: React.FC<NewsWeatherProviderProps> = ({ children }) => {
  // Weather state
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  
  // News state
  const [newsData, setNewsData] = useState<NewsArticle[] | null>(null);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  
  // Settings state
  const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_SETTINGS);

  // Load user settings on component mount
  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('userSettings');
      if (savedSettings) {
        setUserSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load user settings:', error);
    }
  };

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    try {
      const updatedSettings = { ...userSettings, ...newSettings };
      await AsyncStorage.setItem('userSettings', JSON.stringify(updatedSettings));
      setUserSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to save user settings:', error);
    }
  };

  const fetchWeatherData = useCallback(async (lat: number, lon: number) => {
    try {
      setWeatherLoading(true);
      setWeatherError(null);
      
      // Convert temperature unit to API format
      const units = userSettings.temperatureUnit === 'fahrenheit' ? 'imperial' : 'metric';
      
      // Fetch both current weather and forecast
      const [currentWeather, forecast] = await Promise.all([
        fetchWeather(lat, lon, units),
        fetchWeatherForecast(lat, lon, units)
      ]);
      
      setWeatherData(currentWeather);
      setForecastData(forecast);
    } catch (error) {
      console.error('Error in fetchWeatherData:', error);
      setWeatherError(error instanceof Error ? error.message : 'Failed to fetch weather');
    } finally {
      setWeatherLoading(false);
    }
  }, [userSettings.temperatureUnit]);

  const fetchNewsData = useCallback(async (category?: string) => {
    try {
      setNewsLoading(true);
      setNewsError(null);
      
      // Real API call to News API
      const apiKey = '881bbea0c54145f8b2063e04ccbcf9cb';
      const baseUrl = 'https://newsapi.org/v2/top-headlines';
      const params = new URLSearchParams({
        country: 'us',
        apiKey: apiKey
      });
      
      // Add category if provided, otherwise use user's preferred categories
      if (category) {
        params.append('category', category);
      } else if (userSettings.newsCategories.length > 0) {
        // Use the first category as default, or fetch general if none selected
        const defaultCategory = userSettings.newsCategories[0];
        params.append('category', defaultCategory);
      }
      
      const response = await fetch(`${baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`News API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'ok' && data.articles) {
        setNewsData(data.articles);
      } else {
        throw new Error('Invalid response from News API');
      }
    } catch (error) {
      setNewsError(error instanceof Error ? error.message : 'Failed to fetch news');
    } finally {
      setNewsLoading(false);
    }
  }, [userSettings.newsCategories]);

  const getFilteredNews = useCallback(() => {
    if (!newsData) return [];
    
    let filtered = [...newsData];
    
    // Apply weather-based filtering if enabled and weather data is available
    if (userSettings.enableWeatherFiltering && weatherData) {
      filtered = filterNewsByWeather(filtered, weatherData);
    }
    
    // Sort by latest date
    filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return filtered;
  }, [newsData, weatherData, userSettings.enableWeatherFiltering]);

  const clearErrors = useCallback(() => {
    setWeatherError(null);
    setNewsError(null);
  }, []);

  const value: NewsWeatherContextType = {
    weatherData,
    forecastData,
    weatherLoading,
    weatherError,
    newsData,
    newsLoading,
    newsError,
    userSettings,
    fetchWeather: fetchWeatherData,
    fetchNews: fetchNewsData,
    clearErrors,
    updateSettings,
    getFilteredNews,
  };

  return (
    <NewsWeatherContext.Provider value={value}>
      {children}
    </NewsWeatherContext.Provider>
  );
};

export default NewsWeatherProvider; 