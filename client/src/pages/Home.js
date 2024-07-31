import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from '../components/Modal/Login';
import SignUp from '../components/Modal/SignUp';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import AddAnimalModal from '../components/Modal/AddAnimaModal';

const Home = () => {
const { data } = useQuery(QUERY_ME);
const navigate = useNavigate();
const me = data?.me || [];
  console.log(me);

  const handleViewPetsClick = () => {
    navigate('/Animal');
  }

  return (
    <>
    {Auth.loggedIn() ? (
          <>
          <header className="loggedin-header">
            <div className="home-text-box--welcome">
            <h1 className="home-main">My Pet Portal</h1>
            <span className="home-sub">Welcome {me.username}! What would you like to do today?</span>
            </div>
            <button className="add-pet" onClick={handleViewPetsClick}>View Pets</button>
            <div className="add-animal-modal" ><AddAnimalModal /></div>
          </header>
          
          </>
        ) : (
          <>
          <div className="header-box">
            <header className="header">
              <div className="home-text-box">
                <h1 className="home-primary">
                  <span className="home-main">My Pet Portal</span>
                  <div>Share important information about your pet with future pet sitters.</div>
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