// PasswordResetRequest.jsx
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordResetRequest() {
  const [email, setEmail] = useState('');

  const handlePasswordResetRequest = async () => {
    try {
      const response = await fetch('http://localhost:4000/reset-password-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Password reset email sent!', { position: 'top-right' });
      } else {
        toast.error('Failed to send password reset email', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error during password reset request:', error);
      toast.error('Failed to send password reset email', { position: 'top-right' });
    }
  };

  return (
    <div className="container">
      <ToastContainer autoClose={3000} />
      <h2>Reset Password</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handlePasswordResetRequest}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default PasswordResetRequest;
