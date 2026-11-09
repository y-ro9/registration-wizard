import { useFormContext } from 'react-hook-form';

export default function Step1PersonalInfo() {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  return (
    <div className="step">
      <h2>Personal Information</h2>

      <div className="field">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          className={`input ${
            errors.firstName && touchedFields.firstName ? 'input-error' : ''
          }`}
          placeholder="Yash"
          autoComplete="given-name"
          {...register('firstName')}
        />
        {errors.firstName && touchedFields.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          className={`input ${
            errors.lastName && touchedFields.lastName ? 'input-error' : ''
          }`}
          placeholder="Raj"
          autoComplete="family-name"
          {...register('lastName')}
        />
        {errors.lastName && touchedFields.lastName && (
          <p className="error">{errors.lastName.message}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          type="date"
          className={`input ${
            errors.dob && touchedFields.dob ? 'input-error' : ''
          }`}
          autoComplete="bday"
          {...register('dob')}
        />
        {errors.dob && touchedFields.dob && (
          <p className="error">{errors.dob.message}</p>
        )}
      </div>
    </div>
  );
}
