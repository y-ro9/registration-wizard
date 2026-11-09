# Registration Wizard — Sprint 07

A production-grade multi-step onboarding wizard built with React,
react-hook-form and Zod.

## Stack

- React 18 (Vite)
- react-hook-form
- Zod + @hookform/resolvers
- Plain CSS (dark theme)

## Features

- 3-step wizard: Personal Info → Account Details → Review & Submit
- Parent-level state that survives Back/Next navigation
- Real-time `onChange` validation via Zod schema
- Email regex validation, password minimum length, confirm-password match
- `Next` button disabled until the current step is fully valid
- Show/hide password toggle (eyeball icon)
- Dynamic progress bar ("Step X of 3")
- Success screen on submit; payload logged to console for QA

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production Build

```bash
npm run build
npm run preview
```

## Deploy

Deployed on Vercel. npm run build produces a static dist/ folder that
Vercel serves automatically with the Vite preset.

## License

Internal — Infocera / Prodesk Residency.