import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading,
  style,
  disabled,
  ...props
}) => {
  const { theme } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          button: { backgroundColor: theme.colors.secondary },
          text: { color: theme.colors.white },
        };
      case 'outline':
        return {
          button: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: theme.colors.primary,
          },
          text: { color: theme.colors.primary },
        };
      case 'ghost':
        return {
          button: { backgroundColor: 'transparent' },
          text: { color: theme.colors.primary },
        };
      case 'primary':
      default:
        return {
          button: { backgroundColor: theme.colors.primary },
          text: { color: theme.colors.white },
        };
    }
  };

  const { button: variantBtnStyle, text: variantTextStyle } =
    getVariantStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.md,
          opacity: disabled ? 0.5 : 1,
        },
        variantBtnStyle,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantTextStyle.color} />
      ) : (
        <Text style={[styles.text, variantTextStyle]} weight="600">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
  },
});
