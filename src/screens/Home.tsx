import React,{useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useHomeData } from '../hooks/useHomeData';
import WeatherCard from '../components/WeatherCard';
import NewsList from '../components/NewsList';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin 
} from '../utils/dimensions';

const Home: React.FC = () => {
  const {
    weatherData,
    forecastData,
    weatherLoading,
    weatherError,
    newsData,
    newsLoading,
    newsError,
    filteredNews,
    refreshing,
    onRefresh,
    loadData,
  } = useHomeData();

  const isLoading = weatherLoading || newsLoading;
  const hasError = weatherError || newsError;
  
  useEffect(() => {
    loadData();
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <ErrorScreen error={weatherError || newsError || 'Unknown error'} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Weather & News</Text>
        <Text style={styles.subtitle}>Stay informed about your local weather</Text>
      </View>

      {/* News List with Weather Card as Header Component */}
      <NewsList 
        news={filteredNews} 
        refreshing={refreshing}
        onRefresh={onRefresh}
        weatherData={weatherData}
        forecastData={forecastData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: getResponsivePadding(20),
    backgroundColor: '#2655A3',
    alignItems: 'center',
  },
  title: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: getResponsiveMargin(8),
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    color: '#ffffff',
    opacity: 0.9,
  },
});

export default Home; 