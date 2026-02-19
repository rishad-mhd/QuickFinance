import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Section, Card } from '../../components/Common';
import { Text } from '../../components/Text';
import { formatCurrency } from '../../utils/loan';
import { useTheme } from '../../theme/ThemeContext';

interface LoanSummarySectionProps {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

export const LoanSummarySection: React.FC<LoanSummarySectionProps> = ({
  emi,
  totalInterest,
  totalPayment,
}) => {
  const { theme } = useTheme();

  return (
    <Section title="Summary">
      <Card>
        <View style={{ marginBottom: theme.spacing.md }}>
          <Text variant="label" color={theme.colors.textSecondary}>
            Monthly EMI
          </Text>
          <Text variant="titleLarge" color={theme.colors.primary}>
            {formatCurrency(emi)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyMedium">Total Interest</Text>
          <Text variant="bodyMedium" weight="600">
            {formatCurrency(totalInterest)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyMedium">Total Payment</Text>
          <Text variant="bodyMedium" weight="600">
            {formatCurrency(totalPayment)}
          </Text>
        </View>
      </Card>
    </Section>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
