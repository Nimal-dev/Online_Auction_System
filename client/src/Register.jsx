import React, { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerAs, setRegisterAs] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!registerAs) {
      errors.registerAs = 'Please select a role';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <section
      className="contact bg-dark position-relative"
      style={{ height: "100%", alignContent: "center" }}
    >
      <div className="containers position-relative">
        <div className="dots-shape-left position-absolute">
          <img src="../assets/images/icons/dot-shape.png" alt="dot-shape" />
        </div>
        <div className="dots-shape-right position-absolute">
          <img src="../assets/images/icons/dot-shape.png" alt="dot-shape" />
        </div>
        <div className="row">
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
            <small className="fs-7 d-block text-warning">Join us Now</small>
            <h2 className="fs-1 text-white mb-0">SIGN UP NOW!</h2>
            <br />
            <h6 className="fs-4 text-white mb-0">
              SignUp to participate in the <br />
              Digital Auctions
            </h6>
          </div>
          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
            <form className="glassmorphism-form position-relative" onSubmit={handleRegister}>
              <div className="row ps-xxl-5 ps-xl-5 ps-lg-3 ps-md-0 ps-sm-0 ps-0">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="form-label text-white fs-7 mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-0 glass-input"
                      placeholder="Enter your name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label text-white fs-7 mt-3 mb-3">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control border-0 glass-input"
                      placeholder="Enter your email address"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label
                      htmlFor="registerAs"
                      className="form-label text-white fs-7 mt-3 mb-3"
                    >
                      Register As
                    </label>
                    <select
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                         padding: "0.75rem 1rem",
                        borderRadius: " 5px",
                        border: "none",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                      className="form-select"
                      name="registerAs"
                      value={registerAs}
                      onChange={(e) => setRegisterAs(e.target.value)}
                    >
                      <option style={{color:"black"}}>Select</option>
                      <option style={{color:"black"}} value="1">Bidder</option>
                      <option style={{color:"black"}} value="2">Auctioneer</option>
                    </select>
                    {errors.registerAs && <small className="text-danger">{errors.registerAs}</small>}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label text-white fs-7 mt-3 mb-3">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control border-0 glass-input mb-3"
                      placeholder="Enter your password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label text-white fs-7 mt-3 mb-3">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control border-0 glass-input mb-3"
                      placeholder="Confirm your password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                  </div>
                </div>
                
                <div className="col-12">
                  <button
                    className="btn btn-warning btn-hover-secondary text-capitalize mt-2 w-auto contact-btn fs-4"
                    type="submit"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </form>
            {message && <p className="mt-3 text-white">{message}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
