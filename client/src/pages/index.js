import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalContext from "../contexts/globalContext";
import { profileService } from "../services/user.services";
import { logoutService } from "../services/auth.services";
import DashboardPage from "./dashboard";
import SigninPage from "./signin";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.login = ({ email }) => {
      this.setState({
        userEmail: email
      });
    };
    this.logout = async () => {
      try {
        console.log("logging out");
        await logoutService();
        this.setState({
          userEmail: ""
        });
        console.log("logged out");
      } catch (error) {
        console.error(error);
      }
    };

    this.state = {
      userEmail: "",
      login: this.login,
      logout: this.logout
    };
  }
  componentDidMount() {
    profileService()
      .then(res => {
        this.setState({
          userEmail: res.data.email
        });
      })
      .catch(console.error);
  }

  handleLogout = async () => {
    this.logout();
  };

  render() {
    const isAuthenticated = !!this.state.userEmail;
    console.log("isAuthenticated", isAuthenticated);
    return (
      <div>
        <Router>
          <Route
            path="/"
            render={() => (
              <div>
                <Navbar />
                <GlobalContext.Provider value={this.state}>
                  <Switch>
                    <Route exact path="/" render={props => <h2>Home</h2>} />
                    <ProtectedRoute
                      path="/dashboard"
                      component={DashboardPage}
                    />
                    <ProtectedRoute
                      path="/profile"
                      render={props => (
                        <div>
                          <h2>Profile</h2>
                          <p>Email - {this.state.userEmail}</p>
                        </div>
                      )}
                    />
                    <Route path="/signin" component={SigninPage} />
                  </Switch>
                </GlobalContext.Provider>
                {this.state.userEmail ? (
                  <button onClick={this.handleLogout}>Logout</button>
                ) : null}
              </div>
            )}
          />
        </Router>
      </div>
    );
  }
}
export default IndexPage;
