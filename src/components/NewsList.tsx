import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from 'react-native';
import { NewsArticle } from '../types/news';
import { WeatherData, ForecastData } from '../types/weather';
import WeatherCard from './WeatherCard';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin,
  getResponsiveHeight,
  getResponsiveWidth,
  getResponsiveBorderRadius
} from '../utils/dimensions';

interface NewsListProps {
  news: NewsArticle[];
  refreshing?: boolean;
  onRefresh?: () => void;
  weatherData?: WeatherData | null;
  forecastData?: ForecastData | null;
}

const NewsList: React.FC<NewsListProps> = ({ news, refreshing = false, onRefresh, weatherData, forecastData }) => {
  const openArticle = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const renderNewsItem = ({ item }: { item: NewsArticle }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => openArticle(item.url)}
      activeOpacity={0.7}
    >
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.newsDescription} numberOfLines={3}>
          {item.description || 'No description available'}
        </Text>
        <View style={styles.newsMeta}>
          <Text style={styles.newsSource}>{item.source.name}</Text>
          <Text style={styles.newsDate}>
            {new Date(item.publishedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeaderComponent = () => {
    if (!weatherData) return null;
    
    return (
      <View style={styles.weatherHeader}>
        <WeatherCard weather={weatherData} forecast={forecastData} />
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No News Available</Text>
      <Text style={styles.emptyMessage}>
        Pull down to refresh and get the latest news
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Weather-Related News</Text>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => item.url || index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeaderComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2655A3']}
            tintColor="#2655A3"
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: getResponsiveMargin(16),
    marginTop: getResponsiveMargin(8),
    paddingHorizontal: getResponsivePadding(16),
  },
  weatherHeader: {
    marginBottom: getResponsiveMargin(16),
    marginHorizontal: getResponsivePadding(16),
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: getResponsivePadding(20),
    paddingHorizontal: getResponsivePadding(16),
  },
  newsItem: {
    backgroundColor: '#ffffff',
    borderRadius: getResponsiveBorderRadius(12),
    padding: getResponsivePadding(16),
    marginBottom: getResponsiveMargin(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: getResponsiveMargin(8),
    lineHeight: 22,
  },
  newsDescription: {
    fontSize: getResponsiveFontSize(14),
    color: '#666666',
    marginBottom: getResponsiveMargin(12),
    lineHeight: 20,
  },
  newsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: getResponsiveFontSize(12),
    color: '#2655A3',
    fontWeight: '600',
  },
  newsDate: {
    fontSize: getResponsiveFontSize(12),
    color: '#999999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: getResponsivePadding(40),
  },
  emptyTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: getResponsiveMargin(8),
  },
  emptyMessage: {
    fontSize: getResponsiveFontSize(14),
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default NewsList; 