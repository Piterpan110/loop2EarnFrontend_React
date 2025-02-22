import React, { useState } from 'react';
import Logo from '../../components/logo';
import Button from '../../components/button';

import user from '../../assets/image/Icon1.svg';
import mail from '../../assets/image/Icon2.svg';
import phone from '../../assets/image/Icon3.svg';
import Ico1 from '../../assets/image/Vector.png';
import Ico2 from '../../assets/image/metamask-icon logo.png';
import Ico3 from '../../assets/image/twitter logo.png';
import Ico4 from '../../assets/image/Group.png';

import { Link, useNavigate } from 'react-router-dom';

import './styles.scss';

const SignupPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  const handleSignupPage = () => {
    navigate('/signup');
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    // Add logic here to handle signup (e.g., API request, user creation)
    try {
      console.log('here');
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful!', data);
        alert(data.message);
        navigate('/LogIn');
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', response.statusText);
        alert(errorData.message);
      }
      // Display the message from the backend in an alert
    } catch (error) {
      console.error('error:', error);
      alert(error);
    }

    console.log(
      `Signup submitted with username: ${username}, email: ${email}, and password: ${password}`
    );
  };

  return (
    <div>
      <div className="menu-bar">
        <Logo />
        <div className="button-container">
          <Button
            type="submit"
            label="Log In"
            a_class="btn_login"
            onClick={handleLogin}
          />
          <Button
            type="submit"
            label="Sign Up"
            a_class="btn_signup btn_eff"
            onClick={handleSignupPage}
          />
        </div>
      </div>

      <div className="signup-page">
        <div className="signup-back">
          <Logo />
        </div>
        <div className="signup-set">
          <div className="signup-container">
            <div className="title">
              <p className="text">Create Account</p>
              <p className="text1">
                Provide necessary information to proceed <br></br>
                with registration or sign up with social media
              </p>
            </div>

            <form onSubmit={handleSignup} className="sign-up">
              <div className="input-group">
                <div className="symbol">
                  <img src={user} alt=""></img>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-control"
                  placeholder="Username"
                ></input>
              </div>
              <div className="input-group spacing">
                <div className="symbol">
                  <img src={mail} alt="mail"></img>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-control"
                  placeholder="Email"
                ></input>
              </div>
              <div className="input-group spacing">
                <div className="symbol">
                  <img src={phone} alt="phone"></img>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-control"
                  placeholder="Phone Number (Optional)"
                ></input>
              </div>
              <button type="submit" className="button3 but-style">
                Proceed
              </button>
              <Link to="/Login" className="btn-sign but-style">
                I already have an account
              </Link>
            </form>

            <div className="browser">
              <button className="button-style">
                <img src={Ico1} alt=""></img>
              </button>
              <button className="button-style">
                <img src={Ico2} className="metamask" alt=""></img>
                <img src={Ico4} className="instegram" alt=""></img>
              </button>
              <button className="button-style">
                <img src={Ico3} alt=""></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
