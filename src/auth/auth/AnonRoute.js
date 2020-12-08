import React from "react";
import { Route, Redirect } from "react-router-dom";
import NPS from "../../components/NPS/NPS";

const AnonRoute = ({
  component: Component,
  authenticated,
  authenticate,
  logout,
  user,
  ...rest
}) => {
  return (
    <Route
      render={(props) => (
        (<NPS />),
        (
          <Component
            {...props}
            logout={logout}
            authenticate={authenticate}
            authenticated={authenticated}
            user={user}
          />
        )
      )}
      {...rest}
    />
  );
};

export default AnonRoute;
