// src/components/LoginForm/LoginForm.tsx
import React, { useState } from 'react';
import './LoginForm.css';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (userId === import.meta.env.VITE_API_KEY) {
      onLoginSuccess();
    } else {
      setError('not your ID, try another');
    }
  };

  return (
    <div className="login-form">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginForm;
