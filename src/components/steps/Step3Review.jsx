import { useFormContext } from 'react-hook-form';

export default function Step3Review() {
  const { watch } = useFormContext();
  const data = watch();

  return (
    <div className="step">
      <h2>Review &amp; Submit</h2>

      <div className="review-grid">
        <div>
          <strong>First Name</strong>
          <span>{data.firstName || '—'}</span>
        </div>
        <div>
          <strong>Last Name</strong>
          <span>{data.lastName || '—'}</span>
        </div>
        <div>
          <strong>Date of Birth</strong>
          <span>{data.dob || '—'}</span>
        </div>
        <div>
          <strong>Email</strong>
          <span>{data.email || '—'}</span>
        </div>
        <div>
          <strong>Password</strong>
          <span>{'•'.repeat(data.password?.length || 0)}</span>
        </div>
      </div>

      <p className="hint">
        Verify everything above. On submit, the payload is logged to the browser console.
      </p>
    </div>
  );
}
