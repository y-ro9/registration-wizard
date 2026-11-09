# Prompts.md — AI Session Log

This file documents the AI-assisted architectural decisions and debugging
sessions used while building Sprint 07 — The Registration Wizard.

## Session 1 — Architecture Planning

**Prompt:** "I need to build a 3-step registration wizard in React with
react-hook-form + zod. Requirements: lift state to parent so data survives
unmount, per-step validation, disabled Next button when current step is
invalid, show/hide password toggle. What's the cleanest architecture?"

**Outcome:**
- Chose `FormProvider` + `useFormContext` instead of prop-drilling
  `register` / `errors` down three levels.
- Defined a `STEP_FIELDS` map so `trigger()` validates only the current
  step's fields before advancing.
- Step state (`step`, `submitted`) lives in the parent; form state lives
  entirely in RHF's internal store.

## Session 2 — Cross-Field Validation (Password Match)

**Prompt:** "My `confirmPassword` error doesn't update when I change the
`password` field. Using zod `.refine()` for password match. How do I make
RHF re-validate confirmPassword on password change?"

**Outcome:**
- With `mode: 'onChange'` + resolver, RHF re-runs the whole schema on
  every change, but the confirm-password error may not surface until the
  field is touched.
- Added a `useEffect` in `Step2AccountDetails` that calls
  `trigger('confirmPassword')` whenever `password` changes and
  `confirmPassword` has been touched.
- Result: live "Passwords do not match" UX without waiting for submit.

## Session 3 — Controlled Submit vs. Full Validation

**Prompt:** "If a user edits Step 1 after reaching Step 3 via Back, is my
Submit button safe? Should I re-validate the full form on Step 3?"

**Outcome:**
- Added `handleSubmit(onSubmit, onInvalid)` where `onInvalid` scans
  `STEP_FIELDS` and jumps the user to the first step containing an error.
- Guarantees the user can never submit an invalid payload even if they
  tamper with values after navigating forward.

## Session 4 — PasswordInput as forwardRef

**Prompt:** "How do I build a reusable PasswordInput with a show/hide
toggle that still works with `{...register('password')}`?"

**Outcome:**
- Wrapped in `React.forwardRef` and forwarded the second arg to the
  `<input>` element.
- Because `register()` returns `{ onChange, onBlur, name, ref }`,
  spreading it on a `forwardRef` component lets React route `ref`
  correctly to the DOM node.
- Toggle state (`show`) lives inside `PasswordInput` — the parent does
  not need to know about it. This is exactly the "isolated re-renders"
  benefit that motivated the RHF migration.

## Session 5 — Error Display Only After Touch

**Prompt:** "With `mode: 'onChange'` + zodResolver, empty untouched
fields show 'required' errors on first keystroke of another field. How
do I hide those until the user interacts?"

**Outcome:**
- Guarded error rendering with `errors[field] && touchedFields[field]`
  in each step component.
- Combined with the `disabled={!isStepValid}` Next button, users can
  never advance past an empty field — so they naturally touch each
  input before moving on, and errors show exactly when they should.
