import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Section, Card } from '../../components/Common';
import { Text } from '../../components/Text';
import { useTheme } from '../../theme/ThemeContext';

export const AppearanceSection = () => {
  const { theme, themeMode, setThemeMode } = useTheme();

  const options: { label: string; value: 'light' | 'dark' | 'system' }[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
  ];

  return (
    <Section title="Appearance">
      <Card>
        <Text
          variant="bodyMedium"
          style={{ marginBottom: theme.spacing.md }}
          color={theme.colors.textSecondary}
        >
          Choose how QuickFinance looks on your device.
        </Text>
        {options.map(option => (
          <TouchableOpacity
            key={option.value}
            onPress={() => setThemeMode(option.value)}
            style={[styles.option, { borderBottomColor: theme.colors.border }]}
          >
            <Text variant="bodyLarge">{option.label}</Text>
            <View
              style={[
                styles.radio,
                { borderColor: theme.colors.primary },
                themeMode === option.value && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </Card>
    </Section>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
});
