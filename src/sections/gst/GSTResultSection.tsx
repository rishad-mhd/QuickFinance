import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Section, Card } from '../../components/Common';
import { Text } from '../../components/Text';
import { useTheme } from '../../theme/ThemeContext';
import { formatCurrency } from '../../utils/loan';
import { GSTResult } from '../../utils/gst';

interface GSTResultSectionProps {
  result: GSTResult;
}

export const GSTResultSection: React.FC<GSTResultSectionProps> = ({
  result,
}) => {
  const { theme } = useTheme();

  return (
    <Section title="Breakdown">
      <Card>
        <View style={styles.row}>
          <Text variant="bodyMedium">Net Amount</Text>
          <Text variant="bodyMedium" weight="600">
            {formatCurrency(result.originalAmount)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyMedium">
            CGST ({(result.gstRate / 2).toFixed(1)}%)
          </Text>
          <Text variant="bodyMedium" weight="600">
            {formatCurrency(result.cgst)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyMedium">
            SGST ({(result.gstRate / 2).toFixed(1)}%)
          </Text>
          <Text variant="bodyMedium" weight="600">
            {formatCurrency(result.sgst)}
          </Text>
        </View>
        <View
          style={[
            styles.row,
            styles.totalRow,
            {
              borderTopColor: theme.colors.border,
              marginTop: theme.spacing.md,
              paddingTop: theme.spacing.md,
            },
          ]}
        >
          <Text variant="titleMedium">Total Amount</Text>
          <Text variant="titleMedium" color={theme.colors.primary}>
            {formatCurrency(result.totalAmount)}
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
  totalRow: {
    borderTopWidth: 1,
  },
});
