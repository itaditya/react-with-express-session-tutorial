import React from "react";
import { Route, Redirect } from "react-router-dom";

import GlobalContext from "../contexts/globalContext";

const ProtectedRoute = ({
  component: Component,
  render: renderProp,
  ...rest
}) => (
  <GlobalContext.Consumer>
    {({ userEmail }) => (
      <Route
        {...rest}
        render={props =>
          userEmail ? (
            renderProp ? (
              renderProp(props)
            ) : (
              <Component {...props} />
            )
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </GlobalContext.Consumer>
);

export default ProtectedRoute;
