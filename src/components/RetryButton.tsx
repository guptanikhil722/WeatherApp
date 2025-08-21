import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin,
  getResponsiveHeight,
  getResponsiveWidth,
  getResponsiveBorderRadius
} from '../utils/dimensions';

interface RetryButtonProps {
  onPress?: () => void;
  title?: string;
}

const RetryButton: React.FC<RetryButtonProps> = ({ 
  onPress, 
  title = "Try Again" 
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2655A3',
    paddingHorizontal: getResponsivePadding(24),
    paddingVertical: getResponsivePadding(12),
    borderRadius: getResponsiveBorderRadius(8),
    minWidth: getResponsiveWidth(120),
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: getResponsiveFontSize(16),
    fontWeight: '600',
  },
});

export default RetryButton; 