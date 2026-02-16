import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.lg,
          ...theme.shadows.medium,
          shadowOpacity: 0.1, // Softer shadow
          shadowRadius: 12,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = true,
}) => {
  const { theme } = useTheme();
  const Container = scrollable ? ScrollView : View;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <Animated.View style={styles.flex1}>
        <Container
          style={styles.flex1}
          contentContainerStyle={{
            padding: theme.spacing.md,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </Container>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Section: React.FC<SectionProps> = ({ title, children, style }) => {
  const { theme } = useTheme();
  return (
    <View style={[{ marginBottom: theme.spacing.lg }, style]}>
      {title && (
        <Text variant="titleMedium" style={{ marginBottom: theme.spacing.sm }}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};
