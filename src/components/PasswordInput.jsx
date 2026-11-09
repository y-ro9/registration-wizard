import { forwardRef, useState } from 'react';

const PasswordInput = forwardRef(
  ({ id, placeholder, hasError, autoComplete, ...rest }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="password-wrap">
        <input
          ref={ref}
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`input ${hasError ? 'input-error' : ''}`}
          {...rest}
        />
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {show ? '🙈' : '👁️'}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
