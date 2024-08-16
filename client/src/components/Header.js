import React from 'react';
import Auth from '../utils/auth';
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
                <NavLink href="/DogBreed" id="header-link">
                    Dog Encyclopedia
                </NavLink>
                <NavLink href="/VetSearch" id="header-link">
                    Vet Clinic Search
                </NavLink>
                <NavLink href="/Tpr" id="header-link">
                    Animal Health Check
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