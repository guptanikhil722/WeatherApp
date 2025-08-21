import { WeatherData, WeatherError, ForecastData } from '../types/weather';
import { CONFIG, WEATHER_ENDPOINTS } from './config';

export const fetchWeather = async (
  lat: number, 
  lon: number, 
  units: string = 'metric'
): Promise<WeatherData> => {
  try {
    const url = `${CONFIG.WEATHER_BASE_URL}${WEATHER_ENDPOINTS.CURRENT}?lat=${lat}&lon=${lon}&appid=${CONFIG.WEATHER_API_KEY}&units=${units}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod && data.cod !== 200) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    return data as WeatherData;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const fetchWeatherForecast = async (
  lat: number, 
  lon: number, 
  units: string = 'metric'
): Promise<ForecastData> => {
  try {
    const url = `${CONFIG.WEATHER_BASE_URL}${WEATHER_ENDPOINTS.FORECAST}?lat=${lat}&lon=${lon}&appid=${CONFIG.WEATHER_API_KEY}&units=${units}`;
    console.log('url>>', url)
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod && data.cod !== '200') {
      throw new Error(data.message || 'Failed to fetch weather forecast');
    }

    return data as ForecastData;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}; 