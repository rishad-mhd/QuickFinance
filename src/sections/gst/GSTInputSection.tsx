import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Control } from 'react-hook-form';
import { Section } from '../../components/Common';
import { RHFTextField } from '../../components/rhf';
import { Text } from '../../components/Text';
import { useTheme } from '../../theme/ThemeContext';
import { gstRates } from '../../utils/gst';

interface GSTInputSectionProps {
  control: Control<any>;
  selectedRate: number;
  onRateChange: (rate: number) => void;
  isInclusive: boolean;
  onTypeToggle: (inclusive: boolean) => void;
}

export const GSTInputSection: React.FC<GSTInputSectionProps> = ({
  control,
  selectedRate,
  onRateChange,
  isInclusive,
  onTypeToggle,
}) => {
  const { theme } = useTheme();

  return (
    <Section title="GST Details">
      <RHFTextField
        control={control}
        name="amount"
        label="Amount"
        placeholder="e.g. 1000"
        keyboardType="numeric"
        blur
      />

      <Text
        variant="label"
        style={{ marginBottom: theme.spacing.sm, marginLeft: 4 }}
        color={theme.colors.textSecondary}
      >
        GST Rate (%)
      </Text>
      <View style={styles.rateContainer}>
        {gstRates.map(rate => (
          <TouchableOpacity
            key={rate}
            onPress={() => onRateChange(rate)}
            style={[
              styles.rateButton,
              {
                backgroundColor:
                  selectedRate === rate
                    ? theme.colors.primary
                    : theme.colors.surface,
                borderColor: theme.colors.border,
                marginRight: theme.spacing.sm,
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            <Text
              variant="bodyMedium"
              color={
                selectedRate === rate ? theme.colors.white : theme.colors.text
              }
            >
              {rate}%
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.typeToggle, { marginTop: theme.spacing.md }]}>
        <TouchableOpacity
          onPress={() => onTypeToggle(false)}
          style={[
            styles.typeButton,
            styles.typeButtonLeft,
            {
              backgroundColor: !isInclusive
                ? theme.colors.primary
                : theme.colors.surface,
              borderTopLeftRadius: theme.borderRadius.md,
              borderBottomLeftRadius: theme.borderRadius.md,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text color={!isInclusive ? theme.colors.white : theme.colors.text}>
            Add GST
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTypeToggle(true)}
          style={[
            styles.typeButton,
            styles.typeButtonRight,
            {
              backgroundColor: isInclusive
                ? theme.colors.primary
                : theme.colors.surface,
              borderTopRightRadius: theme.borderRadius.md,
              borderBottomRightRadius: theme.borderRadius.md,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text color={isInclusive ? theme.colors.white : theme.colors.text}>
            Remove GST
          </Text>
        </TouchableOpacity>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  rateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  typeToggle: {
    flexDirection: 'row',
  },
  typeButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  typeButtonLeft: {
    // Left specific styles if any
  },
  typeButtonRight: {
    borderLeftWidth: 0,
  },
});
