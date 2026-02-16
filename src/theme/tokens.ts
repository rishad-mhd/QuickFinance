export const palette = {
  primary: '#2563EB',
  primaryLight: '#60A5FA',
  primaryDark: '#1E40AF',

  secondary: '#7C3AED',
  secondaryLight: '#A78BFA',
  secondaryDark: '#5B21B6',

  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  white: '#FFFFFF',
  black: '#000000',

  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const lightColors = {
  primary: palette.primary,
  secondary: palette.secondary,
  background: palette.gray[50],
  surface: palette.white,
  card: palette.white,
  text: palette.gray[900],
  textSecondary: palette.gray[600],
  border: palette.gray[200],
  error: palette.error,
  success: palette.success,
  warning: palette.warning,
  white: palette.white,
  black: palette.black,
};

export const darkColors = {
  primary: palette.primaryLight,
  secondary: palette.secondaryLight,
  background: palette.black,
  surface: palette.gray[900],
  card: palette.gray[800],
  text: palette.gray[50],
  textSecondary: palette.gray[400],
  border: palette.gray[700],
  error: palette.error,
  success: palette.success,
  warning: palette.warning,
  white: palette.white,
  black: palette.black,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  light: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
};
