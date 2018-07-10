import React, { Component } from "react";

import { signupService } from "../services/auth.services";

class Signup extends Component {
  state = {
    userEmail: "",
    userUsername: "",
    userPassword: "",
    userPasswordConf: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const {
      userEmail: email,
      userPassword: password,
      userPasswordConf: passwordConf,
      userUsername: username
    } = this.state;
    if (password !== passwordConf) {
      alert("passwords not matching");
      return;
    }
    signupService({ email, username, password, passwordConf })
      .then(res => {
        console.log("signup successful");
        if (this.props.onSignup) {
          this.props.onSignup({ email });
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
      <div
        style={{
          border: "2px solid",
          padding: "20px",
          marginBottom: "10px",
          width: "40%"
        }}
      >
        <h2>Signup Form</h2>
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
            type="text"
            placeholder="Username"
            name="userUsername"
            value={this.state.userUsername}
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="userPasswordConf"
            value={this.state.userPasswordConf}
            onChange={this.handleFormChange}
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}

export default Signup;
