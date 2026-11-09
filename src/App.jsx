import RegistrationWizard from './components/RegistrationWizard';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Acme SaaS</h1>
        <p>Create your account in 3 easy steps</p>
      </header>
      <main>
        <RegistrationWizard />
      </main>
    </div>
  );
}
