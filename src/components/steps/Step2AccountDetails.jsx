import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import PasswordInput from '../PasswordInput';

export default function Step2AccountDetails() {
  const {
    register,
    watch,
    trigger,
    formState: { errors, touchedFields },
  } = useFormContext();

  const password = watch('password');

  // Re-validate confirmPassword whenever password changes (cross-field UX)
  useEffect(() => {
    if (touchedFields.confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, touchedFields.confirmPassword, trigger]);

  return (
    <div className="step">
      <h2>Account Details</h2>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={`input ${
            errors.email && touchedFields.email ? 'input-error' : ''
          }`}
          placeholder="jane@example.com"
          autoComplete="email"
          {...register('email')}
        />
        {errors.email && touchedFields.email && (
          <p className="error">{errors.email.message}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <PasswordInput
          id="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          hasError={!!(errors.password && touchedFields.password)}
          {...register('password')}
        />
        {errors.password && touchedFields.password && (
          <p className="error">{errors.password.message}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <PasswordInput
          id="confirmPassword"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          hasError={!!(errors.confirmPassword && touchedFields.confirmPassword)}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && touchedFields.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}
      </div>
    </div>
  );
}
