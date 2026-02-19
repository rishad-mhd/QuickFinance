import { z } from 'zod';

/**
 * Common Zod schemas for the application.
 */
export const validationSchemas = {
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  required: (fieldName: string) =>
    z.string().min(1, `${fieldName} is required`),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  numeric: (fieldName: string) =>
    z
      .string()
      .min(1, `${fieldName} is required`)
      .refine(val => !isNaN(Number(val)), {
        message: `${fieldName} must be a number`,
      }),
};

/**
 * Example usage:
 *
 * const schema = z.object({
 *   email: validationSchemas.email,
 *   password: validationSchemas.password,
 * });
 *
 * type FormData = z.infer<typeof schema>;
 *
 * useForm<FormData>({
 *   resolver: zodResolver(schema)
 * });
 */
