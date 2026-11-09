export default function ProgressBar({ step, totalSteps = 3 }) {
  const percent = (step / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-labels">
        <span>Step {step} of {totalSteps}</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
