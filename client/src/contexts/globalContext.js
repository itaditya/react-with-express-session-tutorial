import React from "react";

const GlobalContext = React.createContext({
  userEmail: "",
  login: () => {},
  logout: () => {}
});

export default GlobalContext;
