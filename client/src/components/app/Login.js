import React, { Component } from "react";

import { loginService } from "../../services/auth.services";

class Login extends Component {
  // for quickly loggin in, I have filled the credentials, in real app userEmail, userPassword should be empty strings.
  state = {
    userEmail: "git2adi@gmail.com",
    userPassword: "pass"
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { userEmail: email, userPassword: password } = this.state;
    loginService({ email, password })
      .then(res => {
        console.log("logged in");
        if (this.props.onLogin) {
          this.props.onLogin({ email });
        }
      })
      .catch(console.error);
  };

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div style={{ border: "2px solid", padding: "20px", width: "40%" }}>
        <h2>Login Form</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="userEmail"
            value={this.state.userEmail}
            onChange={this.handleFormChange}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="userPassword"
            value={this.state.userPassword}
            onChange={this.handleFormChange}
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
