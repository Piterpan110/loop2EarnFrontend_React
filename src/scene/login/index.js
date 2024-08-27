import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import Logo from '../../components/logo';
import Button from '../../components/button';

import passkey from '../../assets/image/Icon4.svg';
import Ico1 from '../../assets/image/Vector.png';
import Ico2 from '../../assets/image/metamask-icon logo.png';
import Ico3 from '../../assets/image/twitter logo.png';
import Ico4 from '../../assets/image/Group.png';

import './styles.scss';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const handleLogin1 = () => {
    navigate('/login');
  };
  const handleSignup = () => {
    navigate('/signup');
  };
  /*****************Login*********************/
  const { globalVar, setGlobalVar } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleDashboard = async () => {
    try {
      // Accessing protected resource using access token
      const accesstoken = localStorage.getItem('accesstoken');
      const response = await fetch('http://localhost:5000/dashboard', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accesstoken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('accesstoken verify successfully.', data);
        navigate('/dashboard');
        console.log('This is dashboard page!');
        console.log('globalVar from login to dash: ', globalVar);
      } else {
        const errorData = await response.json();
        console.error('verify failed:', errorData);
        const refreshtoken = localStorage.getItem('refreshtoken');
        if (refreshtoken) {
          await fetch('http://localhost:5000/refresh-access', {
            method: 'POST',
            body: JSON.stringify({ refreshtoken: refreshtoken }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const newaccesstoken = await response.json();
          localStorage.setItem('accesstoken', newaccesstoken);
        } else {
          console.log('Again Sign up.');
        }
      }
    } catch (error) {
      console.error('Error during verify token.', error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    // Add logic here to handle signup (e.g., API request, user creation)
    try {
      console.log('here');
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const accesstoken = data.accesstoken;
        const refreshtoken = data.refreshtoken;
        // Store the token in local storage or session storage
        localStorage.setItem('accesstoken', accesstoken);
        localStorage.setItem('refreshtoken', refreshtoken);
        setGlobalVar('Dashboard');
        console.log('Token received and stored:', accesstoken);
        console.log('Login successful:', data);
        //   alert(data.message);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(error);
    }

    console.log(
      `LogIn submitted with email: ${email}, and password: ${password}`
    );

    handleDashboard();
  };
  /********************************************/
  return (
    <div>
      <div className="menu-bar">
        <Logo />
        <div className="button-container">
          <Button
            type="submit"
            label="Log In"
            a_class="btn_login"
            onClick={handleLogin1}
          />
          <Button
            type="submit"
            label="Sign Up"
            a_class="btn_signup btn_eff"
            onClick={handleSignup}
          />
        </div>
      </div>

      <div className="Login-page">
        <div className="Login-back">
          <Logo />
        </div>
        <div className="Login-set">
          <div className="login-container">
            <div className="title">
              <p className="text">Welcome Back</p>
              <p className="text1">
                Go ahead and log in. Get acces to your incredible
                <br />
                account!
              </p>
            </div>
            <form onSubmit={handleLogin} className="log-in">
              <div className="input-group">
                <div className="symbol">
                  <img src={passkey} alt=""></img>
                </div>
                <input
                  type="text"
                  className="input-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                ></input>
              </div>
              <div className="input-group spacing">
                <div className="symbol">
                  <img src={passkey} alt=""></img>
                </div>
                <input
                  type="password"
                  className="input-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                ></input>
              </div>
              <button type="submit" className="button3 but-style">
                Log In
              </button>
              <Link to="/signup" className="btnlog but-style">
                I forgot my password
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

export default LoginPage;
