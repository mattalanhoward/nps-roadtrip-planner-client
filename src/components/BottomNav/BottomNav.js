import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./BottomNav.css";

const TopNav = () => {
  return (
    <div className="bottom-nav-container">
      <div className="logo-title">
        <p>Created By Matthew Howard</p>
      </div>
      <div className="links">
        <Link to="/github">Github</Link>
        <Link to="/instagram">Instagram</Link>
        <Link to="/youtube">Youtube</Link>
      </div>
    </div>
  );
};

export default TopNav;
