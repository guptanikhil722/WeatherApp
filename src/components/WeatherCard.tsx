import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { WeatherData, ForecastData } from '../types/weather';
import { useAppContext } from '../context/NewsWeather';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin,
  getResponsiveHeight,
  getResponsiveWidth,
  getResponsiveBorderRadius
} from '../utils/dimensions';

interface WeatherCardProps {
  weather: WeatherData;
  forecast?: ForecastData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, forecast }) => {
  const { userSettings } = useAppContext();
  
  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'thunderstorm':
        return '⛈️';
      case 'drizzle':
        return '🌦️';
      case 'fog':
      case 'mist':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  const getTemperatureUnit = () => {
    return userSettings.temperatureUnit === 'fahrenheit' ? '°F' : '°C';
  };

  const getDailyForecast = () => {
    if (!forecast || !forecast.list) {
      return [];
    }
    
    const dailyData: { [key: string]: any[] } = {};
    
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = [];
      }
      dailyData[dayKey].push(item);
    });
    
    // Get the next 5 days (excluding today)
    const next5Days = Object.keys(dailyData)
      .filter(day => {
        const dayDate = new Date(day);
        const today = new Date();
        return dayDate.getDate() !== today.getDate();
      })
      .slice(0, 5);
    
    return next5Days.map(day => {
      const dayData = dailyData[day];
      const avgTemp = dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length;
      const mostFrequentWeather = dayData.reduce((acc, item) => {
        const weatherMain = item.weather[0]?.main || 'unknown';
        acc[weatherMain] = (acc[weatherMain] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
      
      const dominantWeather = Object.keys(mostFrequentWeather).reduce((a, b) => 
        mostFrequentWeather[a] > mostFrequentWeather[b] ? a : b
      );
      
      return {
        date: new Date(day),
        temp: Math.round(avgTemp),
        weather: dominantWeather,
        description: dayData.find(item => item.weather[0]?.main === dominantWeather)?.weather[0]?.description || ''
      };
    });
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const dailyForecast = getDailyForecast();
  const tempUnit = getTemperatureUnit();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.description}>
          {weather.weather[0]?.description || 'Unknown weather'}
        </Text>
      </View>

      <View style={styles.mainInfo}>
        <Text style={styles.temperature}>
          {Math.round(weather.main.temp)}{tempUnit}
        </Text>
        <Text style={styles.weatherIcon}>
          {getWeatherIcon(weather.weather[0]?.main || '')}
        </Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Feels like</Text>
          <Text style={styles.detailValue}>
            {Math.round(weather.main.feels_like)}{tempUnit}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>
            {weather.main.humidity}%
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>
            {Math.round(weather.wind.speed)} m/s
          </Text>
        </View>
      </View>

      {/* 5-Day Forecast Section */}
      {dailyForecast.length > 0 && (
        <View style={styles.forecastSection}>
          <Text style={styles.forecastTitle}>5-Day Forecast</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.forecastContainer}
          >
            {dailyForecast.map((day, index) => (
              <View key={index} style={styles.forecastDay}>
                <Text style={styles.forecastDayText}>{formatDay(day.date)}</Text>
                <Text style={styles.forecastIcon}>
                  {getWeatherIcon(day.weather)}
                </Text>
                <Text style={styles.forecastTemp}>{day.temp}{tempUnit}</Text>
                <Text style={styles.forecastDescription} numberOfLines={1}>
                  {day.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: getResponsiveMargin(20),
    borderRadius: getResponsiveBorderRadius(16),
    padding: getResponsivePadding(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  location: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: getResponsiveMargin(4),
  },
  description: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
    textTransform: 'capitalize',
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getResponsiveMargin(20),
  },
  temperature: {
    fontSize: getResponsiveFontSize(48),
    fontWeight: 'bold',
    color: '#2655A3',
  },
  weatherIcon: {
    fontSize: getResponsiveFontSize(48),
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getResponsiveMargin(20),
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: getResponsiveFontSize(12),
    color: '#999',
    marginBottom: getResponsiveMargin(4),
  },
  detailValue: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: '600',
    color: '#333',
  },
  forecastSection: {
    marginTop: getResponsiveMargin(10),
  },
  forecastTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: getResponsiveMargin(16),
    textAlign: 'center',
  },
  forecastContainer: {
    paddingHorizontal: getResponsivePadding(10),
  },
  forecastDay: {
    alignItems: 'center',
    marginHorizontal: getResponsiveMargin(8),
    minWidth: getResponsiveWidth(80),
    padding: getResponsivePadding(12),
    backgroundColor: '#f8f9fa',
    borderRadius: getResponsiveBorderRadius(12),
  },
  forecastDayText: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: '600',
    color: '#333',
    marginBottom: getResponsiveMargin(8),
  },
  forecastIcon: {
    fontSize: getResponsiveFontSize(24),
    marginBottom: getResponsiveMargin(8),
  },
  forecastTemp: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
    color: '#2655A3',
    marginBottom: getResponsiveMargin(4),
  },
  forecastDescription: {
    fontSize: getResponsiveFontSize(12),
    color: '#666',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

export default WeatherCard; 