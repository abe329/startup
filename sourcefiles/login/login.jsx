import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Login logic
    console.log('Login attempted with:', email, password);
    // For now, navigates to the recipes page
    navigate('/recipes');
  };

  const handleCreate = (e) => {
    e.preventDefault();
    // Account creation logic
    console.log('Account creation attempted with:', email, password);
    // For now, just logs a message
    console.log('Account creation functionality not implemented yet');
  };

  return (
    <main className="text-center">
      <h1 style={{ paddingBottom: '20px' }}>Welcome to the greatest decision of your life!</h1>
      <form onSubmit={handleLogin}>
        <div>
          <span>💌</span>
          <input 
            type="text" 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <span>🔒</span>
          <input 
            type="password" 
            placeholder="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={handleCreate}>Create</button>
      </form>
    </main>
  );
}