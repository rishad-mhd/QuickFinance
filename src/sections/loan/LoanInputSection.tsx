import React from 'react';
import { Control } from 'react-hook-form';
import { Section } from '../../components/Common';
import { RHFTextField } from '../../components/rhf';
import { Button } from '../../components/Button';
import { useTheme } from '../../theme/ThemeContext';

interface LoanInputSectionProps {
  control: Control<any>;
  onCalculate: () => void;
}

export const LoanInputSection: React.FC<LoanInputSectionProps> = ({
  control,
  onCalculate,
}) => {
  const { theme } = useTheme();

  return (
    <Section title="Loan Details">
      <RHFTextField
        control={control}
        name="principal"
        label="Principal Amount"
        placeholder="e.g. 1000000"
        keyboardType="numeric"
        blur
      />
      <RHFTextField
        control={control}
        name="rate"
        label="Interest Rate (Annual %)"
        placeholder="e.g. 8.5"
        keyboardType="numeric"
        blur
      />
      <RHFTextField
        control={control}
        name="years"
        label="Tenure (Years)"
        placeholder="e.g. 20"
        keyboardType="numeric"
        blur
      />
      <Button
        title="Calculate EMI"
        onPress={onCalculate}
        style={{ marginTop: theme.spacing.md }}
      />
    </Section>
  );
};
