import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerAs, setRegisterAs] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Username is required';
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!registerAs) newErrors.registerAs = 'Please select a role';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, registerAs, pass: password }),
    });

    if (response.ok) {
      window.location.href = '/login';
    } else {
      console.error('Registration failed');
    }
  };

  return (
    <div className="container-fluid" style={{backgroundImage: `url(/reg.jpg)`, backgroundSize: 'cover',width: '100%', height: '100vh',backgroundPosition: 'center'}}>
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <Link to="/">
                <h3 style={{ fontSize: '25px', color: '#880085' }}>
                  <i className="fa me-2" style={{ fontSize: '18px', color: '#880085' }}></i>ONLINE AUCTION
                </h3>
              </Link>
              <h5>Sign Up</h5>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                id="floatingText"
                placeholder="jhondoe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingText">Username</label>
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="registerAs"
                value={registerAs}
                onChange={(e) => setRegisterAs(e.target.value)}
              >
                <option value="">Select</option>
                <option value="1">Bidder</option>
                <option value="2">Seller</option>
              </select>
              <label htmlFor="registerAs">Register As</label>
              {errors.registerAs && <div className="text-danger">{errors.registerAs}</div>}
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                name="pass"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                name="confirmPass"
                className="form-control"
                id="floatingConfirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
            </div>
            <button
              type="button"
              style={{ backgroundColor: '#880085', color: 'white' }}
              className="btn py-3 w-100 mb-4"
              onClick={handleRegister}
            >
              Sign Up
            </button>
            <p className="text-center mb-0">
              Already have an Account? <Link to="/login"><span style={{ color: '#880085' }}>Sign In</span></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
