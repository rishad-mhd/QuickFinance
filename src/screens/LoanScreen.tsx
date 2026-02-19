import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Screen } from '../components/Common';
import { calculateAmortization } from '../utils/loan';
import { validationSchemas } from '../utils/validation';
import { LoanInputSection } from '../sections/loan/LoanInputSection';
import { LoanSummarySection } from '../sections/loan/LoanSummarySection';

const schema = z.object({
  principal: validationSchemas.numeric('Principal Amount'),
  rate: validationSchemas.numeric('Interest Rate'),
  years: validationSchemas.numeric('Tenure'),
});

type FormData = z.infer<typeof schema>;

export const LoanScreen = () => {
  const [result, setResult] = useState<any>(null);

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      principal: '',
      rate: '',
      years: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: FormData) => {
    const p = parseFloat(data.principal);
    const r = parseFloat(data.rate);
    const y = parseFloat(data.years);

    const amortizationData = calculateAmortization(p, r, y);
    setResult(amortizationData);
  };

  return (
    <Screen>
      <LoanInputSection
        control={control}
        onCalculate={handleSubmit(onSubmit)}
      />

      {result && (
        <LoanSummarySection
          emi={result.emi}
          totalInterest={result.totalInterest}
          totalPayment={result.totalPayment}
        />
      )}
    </Screen>
  );
};
