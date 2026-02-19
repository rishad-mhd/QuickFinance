import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Standard mobile screen width
const SCALE_WIDTH = 375;

export const normalize = (size: number) => {
  const newSize = size * (SCREEN_WIDTH / SCALE_WIDTH);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const fontFamilies = {
  regular: Platform.select({ ios: 'System', android: 'sans-serif' }),
  medium: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
  bold: Platform.select({ ios: 'System', android: 'sans-serif-condensed' }),
};

export const typography = {
  displayLarge: {
    fontSize: normalize(32),
    fontFamily: fontFamilies.bold,
    lineHeight: normalize(40),
    fontWeight: '700' as const,
  },
  titleLarge: {
    fontSize: normalize(24),
    fontFamily: fontFamilies.bold,
    lineHeight: normalize(32),
    fontWeight: '700' as const,
  },
  titleMedium: {
    fontSize: normalize(20),
    fontFamily: fontFamilies.medium,
    lineHeight: normalize(28),
    fontWeight: '600' as const,
  },
  bodyLarge: {
    fontSize: normalize(16),
    fontFamily: fontFamilies.regular,
    lineHeight: normalize(24),
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: normalize(14),
    fontFamily: fontFamilies.regular,
    lineHeight: normalize(20),
    fontWeight: '400' as const,
  },
  label: {
    fontSize: normalize(12),
    fontFamily: fontFamilies.medium,
    lineHeight: normalize(16),
    fontWeight: '500' as const,
  },
};
