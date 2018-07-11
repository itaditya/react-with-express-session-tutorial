import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ brandName, navLinks, actionButton }) => (
  <div style={style.wrapper}>
    <div style={style.brand}>{brandName}</div>
    <ul style={style.linksWrapper}>
      {navLinks.map(({ to, text }) => (
        <li style={style.linkItem} key={to}>
          <NavLink exact to={to}>{text}</NavLink>
        </li>
      ))}
      <li>
        {actionButton}
      </li>
    </ul>
  </div>
);

const style = {}

style.wrapper = {
  height: "60px",
  background: "#ddd",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px"
}

style.brand = {
  fontSize: "20px"
};

style.linksWrapper = {
  margin: "0 0 0 auto",
  padding: "0",
  listStyle: "none",
  display: "flex",
  justifyContent: "space-evenly"
};

style.linkItem = {
  padding: "0 10px"
}

export default Navbar;
