import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
	try {
	  const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, pass: password }),
	  });
  
	  if (response.ok) {
		const data = await response.json();
		setUser(data.userDetails);
  
		toast.success('Login successful!', {
		  position: 'top-right',
		//   autoClose: 100,
		  onClose: () => {
			if (data.userDetails.status === '0') {
			  navigate('/admin');
			} else if (data.userDetails.status === '1') {
			  navigate('/bidder');
			} else if (data.userDetails.status === '2') {
			  navigate('/seller');
			}
		  },
		});
	  } else {
		if (response.status === 404) {
		  setErrorMessage('Not a valid user, Please Signup');
		  // Display error toast for 'Not a valid user' case
		  toast.error('Not a valid user, Please Signup', { position: 'top-right' });
		} else {
		  setErrorMessage('Login failed');
		  // Display error toast for 'Login failed' case
		  toast.error('Login failed', { position: 'top-right' });
		}
	  }
	} catch (error) {
	  console.error('Error during login:', error);
	  setErrorMessage('Login failed');
	  // Display error toast for 'Login failed' case
	  toast.error('Login failed', { position: 'top-right' });
	}
  };
  
  

  return (

    <section className="contact bg-dark position-relative overflow-hidden" style={{ height: "100vh", alignContent: "center" }}>
    <ToastContainer autoClose={1000} />
    <div className="containers position-relative">
      <div className="dots-shape-left position-absolute">
        <img src="../assets/images/icons/dot-shape.png" alt="dot-shape" />
      </div>
      <div className="dots-shape-right position-absolute">
        <img src="../assets/images/icons/dot-shape.png" alt="dot-shape" />
      </div>
      <div className="row">
        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
          <h2 className="fs-1 text-white mb-0">LOG IN!</h2>
          <br />
          <h6 className="fs-4 text-white mb-0">
            Log into a diverse auctioning platform <br />
            for Digital Auctions
          </h6>
        </div>
        <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
          <form className="glassmorphism-form position-relative">
            <div className="row ps-xxl-5 ps-xl-5 ps-lg-3 ps-md-0 ps-sm-0 ps-0">
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label text-white fs-7 mt-3 mb-3">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control border-0 glass-input"
                    id="floatingInput"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    id="floatingPassword"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12">
                <button
                  className="btn btn-warning btn-hover-secondary text-capitalize mt-2 w-auto contact-btn fs-4"
                  type="button"
                  onClick={handleLogin}
                >
                  Log In!
                </button>
              </div>
              {/* <div className="col-12 mt-3">
                <span className="text-white">
                  <Link to="/reset-password-request">Forgot password?</Link>
                </span>
              </div> */}
              <div className="col-12 mt-3">
                <span className="text-white">
                  Not a User? <Link to="/register">Sign Up</Link>
                </span>
              </div>
              {errorMessage && (
                <div className="col-12 mt-3">
                  <span className="text-danger">{errorMessage}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

 
  );
}

export default Login;
