import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./TopNav.css";
import logo from "../../images/roadtripcolor.svg";

export default class TopNav extends Component {
  render() {
    // console.log(`PROPS in the TOPNAV`, this.props);
    const props = this.props;
    return (
      <div className="top-nav-container">
        <div className="logo-title">
          <img src={logo} alt={"Color Truck"}></img>
          <h3>National Park Road Trip Planner</h3>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          {props.authenticated && <Link to="/favorites">Favorites</Link>}
          {!props.authenticated && (
            <p onClick={this.props.toggleLoginPopup}>Login</p>
          )}
          {!props.authenticated && (
            <p onClick={this.props.toggleSignupPopup}>Signup</p>
          )}
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
