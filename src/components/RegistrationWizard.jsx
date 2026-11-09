import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '../schemas/registrationSchema';
import ProgressBar from './ProgressBar';
import Step1PersonalInfo from './steps/Step1PersonalInfo';
import Step2AccountDetails from './steps/Step2AccountDetails';
import Step3Review from './steps/Step3Review';

const STEP_FIELDS = {
  1: ['firstName', 'lastName', 'dob'],
  2: ['email', 'password', 'confirmPassword'],
  3: [],
};

export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  // Subscribe to current step's field values only
  const stepFields = STEP_FIELDS[step] || [];
  const stepValues = watch(stepFields);

  const isStepValid =
    stepFields.length === 0 ||
    stepFields.every((field, i) => {
      const v = stepValues[i];
      return typeof v === 'string' && v.trim() !== '' && !errors[field];
    });

  const handleNext = async () => {
    const ok = await trigger(stepFields);
    if (ok) setStep((s) => Math.min(3, s + 1));
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = (data) => {
    console.log('✅ REGISTRATION PAYLOAD:', data);
    setSubmitted(true);
  };

  // Safety net: if full form is invalid on submit, jump to first error step
  const onInvalid = (errs) => {
    for (let s = 1; s <= 3; s++) {
      const fields = STEP_FIELDS[s];
      if (fields.some((f) => errs[f])) {
        setStep(s);
        return;
      }
    }
  };

  const handleReset = () => {
    reset();
    setStep(1);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="card success-card">
        <div className="success-icon">✓</div>
        <h1>Registration Complete</h1>
        <p>
          Your account has been created. The submitted payload is logged to the browser
          console for QA inspection.
        </p>
        <button className="btn btn-primary" type="button" onClick={handleReset}>
          Register Another Account
        </button>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="card">
        <ProgressBar step={step} totalSteps={3} />

        <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
          {step === 1 && <Step1PersonalInfo />}
          {step === 2 && <Step2AccountDetails />}
          {step === 3 && <Step3Review />}

          <div className="actions">
            {step > 1 && (
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                ← Back
              </button>
            )}

            {step < 3 && (
              <button
                type="button"
                className="btn btn-primary"
                disabled={!isStepValid}
                onClick={handleNext}
              >
                Next →
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting…' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
