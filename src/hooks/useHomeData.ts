import { useState, useEffect } from 'react';
import { useAppContext } from '../context/NewsWeather';
import { getLocation } from '../services/location';

export const useHomeData = () => {
  const { 
    weatherData, 
    forecastData,
    weatherLoading, 
    weatherError, 
    fetchWeather, 
    newsData, 
    newsLoading, 
    newsError, 
    fetchNews,
    userSettings,
    getFilteredNews
  } = useAppContext();

  const [refreshing, setRefreshing] = useState(false);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Update filtered news when news data, weather data, or settings change
  useEffect(() => {
    if (newsData) {
      const filtered = getFilteredNews();
      setFilteredNews(filtered);
    }
  }, [newsData, weatherData, userSettings.enableWeatherFiltering, getFilteredNews]);

  // Fetch news when category filter changes
  useEffect(() => {
    if (selectedCategoryFilter !== 'all') {
      fetchNews(selectedCategoryFilter);
    } else {
      fetchNews(); // This will use user's preferred categories
    }
  }, [selectedCategoryFilter, fetchNews]);

  const loadData = async () => {
    try {
      // Get location and fetch weather
      const position = await getLocation();
      if (position && position.coords) {
        await fetchWeather(position.coords.latitude, position.coords.longitude);
      }
      
      // Fetch news using user's preferred categories
      await fetchNews();
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const resetFilters = () => {
    setSelectedCategoryFilter('all');
  };

  return {
    // Data
    weatherData,
    forecastData,
    weatherLoading,
    weatherError,
    newsData,
    newsLoading,
    newsError,
    filteredNews,
    refreshing,
    
    // Settings
    userSettings,
    
    // Filters
    selectedCategoryFilter,
    
    // Actions
    setSelectedCategoryFilter,
    onRefresh,
    loadData,
    resetFilters,
  };
}; 