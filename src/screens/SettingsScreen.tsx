import React from 'react';
import { Screen, Section, Card } from '../components/Common';
import { Text } from '../components/Text';
import { useTheme } from '../theme/ThemeContext';
import { AppearanceSection } from '../sections/settings/AppearanceSection';

export const SettingsScreen = () => {
  const { theme } = useTheme();

  return (
    <Screen>
      <AppearanceSection />

      <Section title="About">
        <Card>
          <Text variant="bodyMedium">Version 1.0.0</Text>
          <Text variant="bodyMedium" color={theme.colors.textSecondary}>
            Built with React Native & TypeScript
          </Text>
        </Card>
      </Section>
    </Screen>
  );
};
