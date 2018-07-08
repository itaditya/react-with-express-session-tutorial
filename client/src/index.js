import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { API_BASE_URL } from "./constants";
import { logoutService } from "./services/auth.services";
import Signup from "./components/Signup";
import Login from "./components/Login";

class App extends React.Component {
  state = {
    pageViews: 0,
    profile: {
      email: ""
    }
  };

  componentDidMount() {
    fetch(`${API_BASE_URL}/stats/`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          pageViews: res.data.pageViews
        });
      });

    fetch(`${API_BASE_URL}/user/profile/`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          profile: {
            email: res.data.email
          }
        });
      })
      .catch(err => {});
  }

  handleSignup = ({ email }) => {
    this.setState({
      profile: { email }
    });
  };

  handleLogin = ({ email }) => {
    this.setState({
      profile: { email }
    });
  };

  handleLogout = event => {
    logoutService().then(res => {
      console.log("logged out");
      this.setState({
        profile: {
          email: ""
        }
      });
    });
  };

  render() {
    return (
      <div>
        {this.state.profile.email ? (
          <div>
            <h2>Logged In User Email- {this.state.profile.email}</h2>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Signup onSignup={this.handleSignup} />
            <Login onLogin={this.handleLogin} />
          </div>
        )}
        <h5>Page Viewed: {this.state.pageViews} times</h5>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
