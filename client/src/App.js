import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    // Fetch passwords from server on component mount
    fetch('/api/passwords')
      .then(response => response.json())
      .then(data => setPasswords(data));
  }, []);

  const handleAddPassword = () => {
    fetch('/api/passwords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword })
    })
      .then(response => response.json())
      .then(data => {
        setPasswords([...passwords, data]);
        setNewPassword('');
      });
  };

  return (
    <div className="App">
      <h1>Password Manager</h1>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button onClick={handleAddPassword}>Add Password</button>
      <ul>
        {passwords.map((pw, index) => (
          <li key={index}>{pw.password}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;