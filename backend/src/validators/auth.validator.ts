import { z } from 'zod';

const startOfToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const isAtLeast18 = (date: Date) => {
  const eighteenthBirthday = new Date(date);
  eighteenthBirthday.setFullYear(eighteenthBirthday.getFullYear() + 18);
  eighteenthBirthday.setHours(0, 0, 0, 0);
  return eighteenthBirthday.getTime() <= startOfToday().getTime();
};

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'Imię i nazwisko musi mieć minimum 3 znaki.')
      .max(50, 'Imię i nazwisko nie może mieć więcej niż 50 znaków.'),
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Niepoprawny adres email.'),
    dateOfBirth: z.coerce
      .date({ message: 'Niepoprawna data urodzenia.' })
      .refine(
        (date) => date.getTime() <= new Date().getTime(),
        'Data urodzenia nie może być z przyszłości.',
      )
      .refine(isAtLeast18, 'Musisz mieć ukończone 18 lat.'),
    password: z
      .string()
      .min(8, 'Hasło musi mieć min. 8 znaków')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        'Hasło musi zawierać min. 1 wielką literę, 1 cyfrę i 1 znak specjalny.',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła muszą być takie same.',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Niepoprawny adres email.'),
  password: z.string().min(1, 'Hasło jest wymagane.'),
});

export const verifyEmailSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Niepoprawny adres email.'),
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, 'Kod musi składać się z 6 cyfr.'),
});

export const resendVerificationSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Niepoprawny adres email.'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Niepoprawny adres email.'),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token jest wymagany.'),
    password: z
      .string()
      .min(8, 'Hasło musi mieć min. 8 znaków')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        'Hasło musi zawierać min. 1 wielką literę, 1 cyfrę i 1 znak specjalny.',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła muszą być takie same.',
    path: ['confirmPassword'],
  });
