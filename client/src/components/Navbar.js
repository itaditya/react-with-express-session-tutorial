import React from "react";
import { Link } from "react-router-dom";

const wrapperStyle = {
  height: "60px",
  background: "#ddd",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px"
};

const brandStyle = {
  fontSize: "20px"
};

const linksWrapperStyle = {
  margin: "0",
  padding: "0",
  width: "40%",
  listStyle: "none",
  display: "flex",
  justifyContent: "space-evenly"
};

const Navbar = () => (
  <div style={wrapperStyle}>
    <div style={brandStyle}>React Auth Demo</div>
    <ul style={linksWrapperStyle}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signin">Sign In</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  </div>
);

export default Navbar;
