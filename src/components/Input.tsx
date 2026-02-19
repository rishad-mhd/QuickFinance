import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Animated,
} from 'react-native';

import { BlurView } from '@sbaiahmed1/react-native-blur';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  blur?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  onFocus,
  onBlur,
  leftIcon,
  rightIcon,
  blur = false,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, focusAnim]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, theme.colors.primary],
  });

  const backgroundColor = blur
    ? 'transparent'
    : focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
          theme.isDark ? theme.colors.card : theme.colors.surface,
          theme.isDark ? theme.colors.card : theme.colors.white,
        ],
      });

  const inputContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    paddingHorizontal: theme.spacing.md,
    minHeight: 56,
    // @ts-ignore
    backgroundColor,
    // @ts-ignore
    borderColor: error ? theme.colors.error : borderColor,
    ...theme.shadows.light,
    shadowOpacity: isFocused ? 0.15 : 0.05,
    overflow: 'hidden', // Required for BlurView on iOS
  };

  const textInputStyle: TextStyle = {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: theme.spacing.sm,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          variant="label"
          style={{ marginBottom: theme.spacing.xs, marginLeft: 4 }}
          color={isFocused ? theme.colors.primary : theme.colors.textSecondary}
        >
          {label}
        </Text>
      )}
      <Animated.View style={inputContainerStyle}>
        {blur && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType={theme.isDark ? 'dark' : 'light'}
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        )}
        {leftIcon && (
          <View style={{ marginRight: theme.spacing.sm }}>{leftIcon}</View>
        )}
        <TextInput
          placeholderTextColor={theme.colors.textSecondary}
          style={[textInputStyle, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && (
          <View style={{ marginLeft: theme.spacing.sm }}>{rightIcon}</View>
        )}
      </Animated.View>
      {error && (
        <Text
          variant="label"
          color={theme.colors.error}
          style={{ marginTop: theme.spacing.xs, marginLeft: 4 }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
});
