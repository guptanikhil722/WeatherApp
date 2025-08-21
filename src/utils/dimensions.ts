import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const isSmallDevice = width < 375;
export const isMediumDevice = width >= 375 && width < 414;
export const isLargeDevice = width >= 414;

// Responsive sizing functions
export const getResponsiveSize = (size: number) => {
  if (isSmallDevice) return size * 0.8;
  if (isMediumDevice) return size;
  return size * 1.2;
};

export const getResponsiveFontSize = (size: number) => {
  if (isSmallDevice) return size * 0.85;
  if (isMediumDevice) return size;
  return size * 1.15;
};

export const getResponsiveHeight = (size: number) => {
  if (isSmallDevice) return size * 0.9;
  if (isMediumDevice) return size;
  return size * 1.1;
};

export const getResponsiveWidth = (size: number) => {
  if (isSmallDevice) return size * 0.9;
  if (isMediumDevice) return size;
  return size * 1.1;
};

export const getResponsivePadding = (size: number) => {
  if (isSmallDevice) return size * 0.85;
  if (isMediumDevice) return size;
  return size * 1.15;
};

export const getResponsiveMargin = (size: number) => {
  if (isSmallDevice) return size * 0.85;
  if (isMediumDevice) return size;
  return size * 1.15;
};

export const getResponsiveBorderRadius = (size: number) => {
  if (isSmallDevice) return size * 0.9;
  if (isMediumDevice) return size;
  return size * 1.1;
}; 