import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin,
  getResponsiveHeight
} from '../utils/dimensions';

interface EmptyScreenProps {
  message?: string;
}

const EmptyScreen: React.FC<EmptyScreenProps> = ({ 
  message = "No data available" 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📭</Text>
      <Text style={styles.title}>Nothing to show</Text>
      <Text style={styles.message}>{message}</Text>
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
  icon: {
    fontSize: getResponsiveFontSize(64),
    marginBottom: getResponsiveMargin(16),
  },
  title: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: '600',
    color: '#333',
    marginBottom: getResponsiveMargin(8),
    textAlign: 'center',
  },
  message: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
    textAlign: 'center',
    lineHeight: getResponsiveHeight(24),
  },
});

export default EmptyScreen; 