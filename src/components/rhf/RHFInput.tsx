import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input, InputProps } from '../Input';

interface RHFInputProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText' | 'error'> {
  name: Path<T>;
  control: Control<T>;
}

export const RHFInput = <T extends FieldValues>({
  name,
  control,
  ...props
}: RHFInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Input
          {...props}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
        />
      )}
    />
  );
};
