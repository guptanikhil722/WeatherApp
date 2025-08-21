import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RetryButton from './RetryButton';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin,
  getResponsiveHeight
} from '../utils/dimensions';

interface ErrorScreenProps {
  error: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      <RetryButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: getResponsivePadding(20),
  },
  errorIcon: {
    fontSize: getResponsiveFontSize(64),
    marginBottom: getResponsiveMargin(16),
  },
  errorTitle: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: getResponsiveMargin(12),
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
    textAlign: 'center',
    marginBottom: getResponsiveMargin(24),
    lineHeight: getResponsiveHeight(24),
  },
});

export default ErrorScreen; 