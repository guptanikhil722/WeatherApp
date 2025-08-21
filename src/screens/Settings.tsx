import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAppContext } from '../context/NewsWeather';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin,
  getResponsiveHeight,
  getResponsiveWidth
} from '../utils/dimensions';

const NEWS_CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

const Settings: React.FC = () => {
  const { userSettings, updateSettings } = useAppContext();
  const [localSettings, setLocalSettings] = useState(userSettings);

  useEffect(() => {
    setLocalSettings(userSettings);
  }, [userSettings]);

  const toggleTemperatureUnit = () => {
    const newUnit = localSettings.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    const newSettings: typeof userSettings = { ...localSettings, temperatureUnit: newUnit };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const toggleNewsCategory = (category: string) => {
    const newCategories = localSettings.newsCategories.includes(category)
      ? localSettings.newsCategories.filter(c => c !== category)
      : [...localSettings.newsCategories, category];
    
    // Ensure at least one category is selected
    if (newCategories.length > 0) {
      const newSettings: typeof userSettings = { ...localSettings, newsCategories: newCategories };
      setLocalSettings(newSettings);
      updateSettings(newSettings);
    }
  };

  const toggleWeatherFiltering = () => {
    const newSettings: typeof userSettings = { ...localSettings, enableWeatherFiltering: !localSettings.enableWeatherFiltering };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const resetToDefaults = () => {
    const defaultSettings: typeof userSettings = {
      temperatureUnit: 'celsius',
      newsCategories: ['general'],
      enableWeatherFiltering: true,
    };
    setLocalSettings(defaultSettings);
    updateSettings(defaultSettings);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your app experience</Text>
        </View>

        {/* Temperature Units */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temperature Units</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Use Fahrenheit</Text>
            <Switch
              value={localSettings.temperatureUnit === 'fahrenheit'}
              onValueChange={toggleTemperatureUnit}
              trackColor={{ false: '#767577', true: '#2655A3' }}
              thumbColor={localSettings.temperatureUnit === 'fahrenheit' ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.settingDescription}>
            Currently using: {localSettings.temperatureUnit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
          </Text>
        </View>

        {/* News Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>News Categories</Text>
          <Text style={styles.settingDescription}>
            Select the news categories you're interested in
          </Text>
          {NEWS_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryRow}
              onPress={() => toggleNewsCategory(category)}
            >
              <Text style={styles.categoryLabel}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
              <View style={[
                styles.checkbox,
                localSettings.newsCategories.includes(category) && styles.checkboxSelected
              ]}>
                {localSettings.newsCategories.includes(category) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Weather-Based Filtering */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather-Based News Filtering</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Enable weather-based filtering</Text>
            <Switch
              value={localSettings.enableWeatherFiltering}
              onValueChange={toggleWeatherFiltering}
              trackColor={{ false: '#767577', true: '#2655A3' }}
              thumbColor={localSettings.enableWeatherFiltering ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.settingDescription}>
            Filter news based on current weather conditions
          </Text>
        </View>

        {/* Reset Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.resetButton} onPress={resetToDefaults}>
            <Text style={styles.resetButtonText}>Reset to Defaults</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: getResponsivePadding(20),
    backgroundColor: '#2655A3',
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
  section: {
    backgroundColor: '#ffffff',
    margin: getResponsiveMargin(16),
    padding: getResponsivePadding(20),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: getResponsiveMargin(16),
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(12),
  },
  settingLabel: {
    fontSize: getResponsiveFontSize(16),
    color: '#333333',
    flex: 1,
  },
  settingDescription: {
    fontSize: getResponsiveFontSize(14),
    color: '#666666',
    marginTop: getResponsiveMargin(8),
    lineHeight: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getResponsivePadding(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryLabel: {
    fontSize: getResponsiveFontSize(16),
    color: '#333333',
  },
  checkbox: {
    width: getResponsiveWidth(24),
    height: getResponsiveHeight(24),
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#2655A3',
    borderColor: '#2655A3',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: getResponsiveFontSize(14),
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#ff6b6b',
    padding: getResponsivePadding(16),
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
  },
});

export default Settings; 