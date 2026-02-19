import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';

interface TextProps extends RNTextProps {
  variant?: keyof typeof typography;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: TextStyle['fontWeight'];
}

export const Text: React.FC<TextProps> = ({
  variant = 'bodyMedium',
  color,
  align,
  weight,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const variantStyle = theme.typography[variant];

  const combinedStyle: TextStyle = {
    ...variantStyle,
    color: color || theme.colors.text,
    textAlign: align,
    fontWeight: weight || variantStyle.fontWeight,
  };

  return (
    <RNText style={[combinedStyle, style]} {...props}>
      {children}
    </RNText>
  );
};
