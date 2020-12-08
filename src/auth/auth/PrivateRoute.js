import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  logout,
  authenticated,
  user,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated ? (
          <Component
            {...props}
            user={user}
            logout={logout}
            authenticated={authenticated}
          />
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};
export default PrivateRoute;
