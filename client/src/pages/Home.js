import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from '../components/Modal/Login';
import SignUp from '../components/Modal/SignUp';
import Auth from '../utils/auth';

const Home = () => {
  return (
    <>
    {Auth.loggedIn() ? (
          <>
          <header className="loggedin-header">
            <div className="home-text-box--welcome">
            <h1 className="home-main">My Pet Portal</h1>
            <span className="home-sub">Welcome</span>
            </div>
          </header>
          </>
        ) : (
          <>
          <div className="header-box">
            <header className="header">
              <div className="home-text-box">
                <h1 className="home-primary">
                  <span className="home-main">My Pet Portal</span>
                  <div>Share important information about your pet with future pet sitters</div>
                  <div className="buttons-div">
                    <SignUp />
                    <Login />
                  </div>
                </h1>
              </div>
            </header>
            </div>
          
          </>
        )}
      </>
      );
};

      export default Home;