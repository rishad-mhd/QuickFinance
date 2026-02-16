import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Screen } from '../components/Common';
import { calculateGST } from '../utils/gst';
import { validationSchemas } from '../utils/validation';
import { GSTInputSection } from '../sections/gst/GSTInputSection';
import { GSTResultSection } from '../sections/gst/GSTResultSection';

const schema = z.object({
  amount: validationSchemas.numeric('Amount'),
});

type FormData = z.infer<typeof schema>;

export const GSTScreen = () => {
  const [selectedRate, setSelectedRate] = useState(18);
  const [isInclusive, setIsInclusive] = useState(false);

  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
  });

  const amount = watch('amount');

  const result = calculateGST(
    parseFloat(amount) || 0,
    selectedRate,
    isInclusive,
  );

  return (
    <Screen>
      <GSTInputSection
        control={control}
        selectedRate={selectedRate}
        onRateChange={setSelectedRate}
        isInclusive={isInclusive}
        onTypeToggle={setIsInclusive}
      />
      <GSTResultSection result={result} />
    </Screen>
  );
};
