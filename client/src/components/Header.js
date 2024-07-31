import React from 'react';
import Auth from '../utils/auth';
import Login from '../components/Modal/Login';
import SignUp from '../components/Modal/SignUp';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    NavItem,
    NavLink,
    Nav
} from 'reactstrap';


const Header = () => {
    // logs user out
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

    return (
        <Nav className="main-header" vertical>

         {Auth.loggedIn() ? (
            <>
            <NavItem>
                <NavLink href="/Animal" id="header-link">
                    My Pets
                </NavLink>
                <NavLink href="/Home" id="header-link">
                    Home
                </NavLink>
            </NavItem>
            <NavLink href="/" id="header-link" onClick={logout}>Logout</NavLink>
            </>
            ) : (
            <>
           
            </>
            )}
            
        </Nav>
    );
};

export default Header;