# 🧙 Registration Wizard — Sprint 07

> A production-grade, multi-step onboarding wizard built with **React 18**, **react-hook-form**, and **Zod**. Designed with enterprise form architecture, real-time validation, and state persistence across view transitions.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![react-hook-form](https://img.shields.io/badge/react--hook--form-7.53-EC5990?logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.23-3E67B1?logo=zod&logoColor=white)
![License](https://img.shields.io/badge/license-Internal-blue)

---

## 📖 Overview

Modern SaaS and FinTech products never overwhelm users with a 20-field monolithic signup form. Instead, they **segment data collection into localized views** — a pattern known as the *registration wizard*.

This project implements that pattern from the ground up: a 3-step flow that collects personal info, account credentials, and finally presents a review screen before submission. Every architectural choice is deliberate, aimed at **enterprise-grade correctness, performance, and UX polish**.

---

## ✨ Features

### Core (Phase 1 — Mandatory)
- ✅ **3-step wizard** — Personal Info → Account Details → Review & Submit
- ✅ **Parent-level state architecture** — data survives Back/Next navigation
- ✅ **Conditional rendering** for step views (no router, per sprint spec)
- ✅ **Submit → `console.log()` payload + Success screen**

### UX & Validation (Phase 2 — Priority 1)
- ✅ **Real-time `onChange` validation** — errors appear as the user types
- ✅ **Email regex validation** — requires valid `user@domain.tld` format
- ✅ **Password length enforcement** — minimum 8 characters
- ✅ **Confirm-password strict match** — cross-field validation via Zod `.refine()`
- ✅ **Conditional disabling** of `Next` until the current step is valid
- ✅ **Show/Hide password toggle** — eyeball icon, dynamically toggles `input.type`
- ✅ **Dynamic progress bar** — `"Step X of 3"` with percentage

### Enterprise Architecture (Phase 3 — Priority 2)
- ✅ **react-hook-form migration** — deprecated `useState` for form handling
- ✅ **Zod schema validation** — single source of truth for all field rules
- ✅ **`FormProvider` + `useFormContext`** — clean prop-drilling-free architecture
- ✅ **Isolated re-renders** — RHF only re-renders subscribed fields
- ✅ **`forwardRef`-based `PasswordInput`** — reusable, self-contained show/hide logic

### Polish (Bonus)
- 🌗 **Dark theme** — modern SaaS aesthetic
- 🛡️ **Safety net** on submit — auto-jumps to first step with an error if full form is invalid
- ♻️ **Reset flow** — success screen offers "Register Another Account"
- 📝 **`Prompts.md`** — documents every AI debugging session (corporate policy compliance)

---

## 🏗️ Architecture

### High-Level Flow

┌────────────────────────────────────────────────────────┐
│		RegistrationWizard (Parent)		 │
│ ┌────────────────────────────────────────────────────┐ │
│ │ useForm({ mode: 'onChange', resolver: zodResolver  │ │
│ │ ─── Single unified form state ──────────────────   │ │
│ └────────────────────────────────────────────────────┘ │
│ 							 │
│ <FormProvider {...methods}> 				 │
│ 							 │
│ <ProgressBar step={step} totalSteps={3} /> 		 │
│ 							 │
│ {step === 1 && <Step1PersonalInfo />} 		 │
│ {step === 2 && <Step2AccountDetails />} 		 │
│ {step === 3 && <Step3Review />} 			 │
│ 							 │
│ [← Back] [Next → / Submit] 				 │
│ </FormProvider>  					 │
└────────────────────────────────────────────────────────┘


### Why `FormProvider` over Prop Drilling?

The wizard has three nested levels (`Wizard → Step → PasswordInput`). Passing
`register`, `watch`, `errors`, and `trigger` down through every level would
pollute component signatures and couple children to the wizard's internals.

`FormProvider` exposes the entire form context via React context, so any
descendant can call `useFormContext()` and grab exactly what it needs. This is
the **industry standard** for multi-field forms in enterprise React apps.

### Why Zod over Manual Validation?

Validation rules live in **one file** (`src/schemas/registrationSchema.js`)
instead of being scattered across `onBlur` handlers. When rules change, you
edit them once. The schema is also **type-safe** — every field's shape is
inferred from the Zod schema, so refactors can't silently break validation.

### State Persistence Across Steps

Data survives Back/Next navigation because **form state does not live inside
step components**. It lives in `useForm()` inside the parent
`RegistrationWizard`, which never unmounts. The step components only mount
inputs bound to that store; when the user goes Back to Step 1, `register()`
re-hydrates each input with its existing value.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 18 | UI composition, hooks |
| **Build Tool** | Vite 5 | Instant HMR, optimized builds |
| **Form State** | react-hook-form 7.53 | Uncontrolled form inputs, minimal re-renders |
| **Validation** | Zod 3.23 | Schema-first runtime validation |
| **Resolver** | @hookform/resolvers | Bridges Zod ↔ RHF |
| **Styling** | Plain CSS | Dark theme, zero dependency overhead |

---

## 📂 Project Structure

registration-wizard/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
├── Prompts.md ← AI debugging log (mandatory)
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── schemas/
    │   └── registrationSchema.js ← Zod schema (single source of truth)
    └── components/
	├── RegistrationWizard.jsx ← parent, FormProvider, step state
	├── ProgressBar.jsx
	├── PasswordInput.jsx ← forwardRef + show/hide toggle
	└── steps/
	    ├── Step1PersonalInfo.jsx
	    ├── Step2AccountDetails.jsx
	    └── Step3Review.jsx

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone https://github.com/y-ro9/registration-wizard.git
cd registration-wizard
npm install
```

### Development

```bash
npm run dev
```
Open `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

---

## 🧪 Manual Test Checklist

Use this to verify every requirement:
```
#	Scenario			Expected

1	Step 1 with empty fields	Next is disabled
2	Fill any field			Next enables
3	Email abc (no @)		Red error appears live
4	Password 123			"at least 8 characters" error
5	Confirm mismatch		"Passwords do not match"
6	Click 👁️ toggle			Password value shows/hides
7	Change password after confirm	Confirm error updates live
8	Back from Step 2 → Step 1	Name values retained
9	Complete all steps → Submit	Console logs ✅ REGISTRATION PAYLOAD
10	After submit			Success screen renders
```

## 🤖 AI Policy Compliance

### Per sprint policy:

    ✅ AI used only for architectural explanations and debugging

    ✅ Every line understood before commit

    ✅ All AI sessions documented in Prompts.md

    ❌ No direct LLM code-paste into the repository

See `Prompts.md` for the full session log.

## 🌐 Deployment

Deployed on Vercel with the Vite preset:

Live URL: 	

## 📝 License

Internal — Infocera / Prodesk Residency. Not for redistribution.
