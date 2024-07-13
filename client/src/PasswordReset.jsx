// PasswordReset.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordReset() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { position: 'top-right' });
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        toast.success('Password has been reset', { position: 'top-right' });
      } else {
        toast.error('Failed to reset password', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      toast.error('Failed to reset password', { position: 'top-right' });
    }
  };

  return (
    <div className="container">
      <ToastContainer autoClose={3000} />
      <h2>Reset Password</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handlePasswordReset}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default PasswordReset;
