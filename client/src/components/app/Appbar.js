import React from "react";

import GlobalContext from "../../contexts/globalContext";
import Navbar from '../Navbar';

const navLinks = [{
  to: '/',
  text: 'Home'
}]

const SignedOutLinks = [{
  to: '/signin',
  text: 'Sign'
}]

const SignedInLinks = [{
  to: '/dashboard',
  text: 'Dashboard'
}, {
  to: '/profile',
  text: 'Profile'
}]

const Appbar = () => (
  <GlobalContext.Consumer>
    {({ userEmail, logout }) => {
      const additionalLinks = userEmail ? SignedInLinks : SignedOutLinks;
      const allNavLinks = [...navLinks, ...additionalLinks];
      return (
        <Navbar
          brandName="React Auth Demo"
          navLinks={allNavLinks}
          actionButton={(
            userEmail
              ?  <button onClick={logout}>Logout</button>
              :  null
          )}
        />
      )
    }}
  </GlobalContext.Consumer>
);

export default Appbar;
