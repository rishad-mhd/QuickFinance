import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { FieldValues, Path, Control } from 'react-hook-form';
import { RHFInput } from './RHFInput';
import { InputProps } from '../Input';
import { useTheme } from '../../theme/ThemeContext';

interface RHFPasswordFieldProps<T extends FieldValues>
  extends Omit<
    InputProps,
    'value' | 'onChangeText' | 'error' | 'secureTextEntry'
  > {
  name: Path<T>;
  control: Control<T>;
}

/**
 * A password input field for React Hook Form.
 * Includes a toggle for showing/hiding the password.
 */
export const RHFPasswordField = <T extends FieldValues>({
  ...props
}: RHFPasswordFieldProps<T>) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <RHFInput
      {...props}
      secureTextEntry={!showPassword}
      rightIcon={
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      }
    />
  );
};
