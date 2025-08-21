import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { getResponsiveFontSize, getResponsiveMargin } from '../utils/dimensions';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2655A3" />
      <Text style={styles.text}>Loading weather and news...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    marginTop: getResponsiveMargin(16),
    fontSize: getResponsiveFontSize(16),
    color: '#666',
  },
});

export default LoadingScreen; 