import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Pages from "./pages";

const App = () => (
  <div className="app">
    <Pages />
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
