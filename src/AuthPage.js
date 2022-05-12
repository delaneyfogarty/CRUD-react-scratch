import { useState } from 'react';
import { signIn, signUp, getUser } from './services/fetch-utils.js';

export default function AuthPage({ setEmail, setToken }) {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [{ email: signInEmail, password: signInPassword }, setSignInFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSignIn(e) {
    e.preventDefault();
    await signIn(signInEmail, signInPassword);
    const {
      access_token,
      user: { email },
    } = getUser();

    setEmail(email);
    setToken(access_token);
  }

  async function handleSignUp(e) {
    e.preventDefault();

    await signUp(signUpEmail, signUpPassword);
    const {
      access_token,
      user: { email },
    } = getUser();

    setEmail(email);
    setToken(access_token);
  }

  return (
    <div className="auth">
      <h1>
        <em>Cats!</em>
      </h1>
      <form onSubmit={handleSignIn}>
        <label>
          Email
          <input
            required
            type="email"
            name="email"
            value={signInEmail}
            onChange={(e) => setSignInFormData({ email: e.target.value, password: signInPassword })}
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            name="password"
            value={signInPassword}
            onChange={(e) => setSignInFormData({ email: signInEmail, password: e.target.value })}
          />
        </label>
        <button>Sign In</button>
      </form>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
          />
        </label>
        <button>Sign Up</button>
      </form>
    </div>
  );
}
