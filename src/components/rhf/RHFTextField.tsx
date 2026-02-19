import React from 'react';
import { FieldValues } from 'react-hook-form';
import { RHFInput } from './RHFInput';
import { InputProps } from '../Input';
import { Path, Control } from 'react-hook-form';

interface RHFTextFieldProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText' | 'error'> {
  name: Path<T>;
  control: Control<T>;
}

/**
 * A standard text input field for React Hook Form.
 * Includes aesthetic defaults like blur support.
 */
export const RHFTextField = <T extends FieldValues>({
  ...props
}: RHFTextFieldProps<T>) => {
  return <RHFInput {...props} />;
};
