import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

import GlobalContext from "../contexts/globalContext";
import Signup from "../components/app/Signup";
import Login from "../components/app/Login";

class SigninPage extends Component {
  render() {
    return (
      <div>
        <GlobalContext.Consumer>
          {({ userEmail, login }) => (
            <Fragment>
              {userEmail ? (
                <Redirect to="/" />
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Signup />
                  <Login onLogin={login} />
                </div>
              )}
            </Fragment>
          )}
        </GlobalContext.Consumer>
      </div>
    );
  }
}

export default SigninPage;
