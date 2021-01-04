import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./TopNav.css";

export default class TopNav extends Component {
  render() {
    // console.log(`PROPS in the TOPNAV`, this.props);
    const props = this.props;
    return (
      <div className="top-nav-container">
        <div className="logo-title">
          <p>Logo</p>
          <h3>National Park Road Trip Planner</h3>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          {props.authenticated && <Link to="/favorites">Favorites</Link>}

          {!props.authenticated && <Link to="/user/login">Login</Link>}
          {!props.authenticated && <Link to="/user/signup">Signup</Link>}
          {props.authenticated && (
            <Link to={"/"} onClick={props.logout()}>
              Logout
            </Link>
          )}
        </div>
      </div>
    );
  }
}
