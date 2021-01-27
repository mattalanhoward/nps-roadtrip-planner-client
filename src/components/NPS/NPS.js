import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import "./NPS.css";
import USVectorMap from "../USVectorMap/USVectorMap";
import BottomNav from "../BottomNav/BottomNav";
import highSierraTent from "../../images/high-sierra-tent.jpeg";
import stateData from "../../stateList.json";
import { getAllParks } from "../../services/npsService";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

export class NPS extends Component {
  state = {
    allParks: null,
    loading: false,
    errorMessage: "",
    stateAbbr: "co",
    allStateInfo: [],
    showLogin: false,
    showSignup: false,
  };

  async componentDidMount() {
    this.getStateInfo();
  }

  async fetchAllParks() {
    try {
      const response = await getAllParks();
      this.setState(
        {
          allParks: response.data,
          loading: false,
        },
        () => console.log(this.state.allParks)
      );
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  }

  getStateInfo = () => {
    this.setState({
      allStateInfo: stateData,
    });
  };

  handleChange = (event) => {
    this.setState({ stateAbbr: event.target.value }, () => {});
  };

  toggleLoginPopup = () => {
    const showLogin = this.state.showLogin;

    this.setState({
      showLogin: !showLogin,
      showSignup: false,
    });
  };

  toggleSignupPopup = () => {
    const showSignup = this.state.showSignup;

    this.setState({
      showSignup: !showSignup,
      showLogin: false,
    });
  };

  render() {
    const {
      allParks,
      loading,
      stateAbbr,
      allStateInfo,
      showLogin,
      showSignup,
    } = this.state;
    const props = this.props;

    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <TopNav
            logout={props.logout}
            authenticated={props.authenticated}
            toggleLoginPopup={this.toggleLoginPopup}
            toggleSignupPopup={this.toggleSignupPopup}
          />
          <section className="nps-landing-container">
            {showLogin && (
              <div id="login-popup">
                <Login
                  authenticated={props.authenticated}
                  authenticate={props.authenticate}
                  toggleLoginPopup={this.toggleLoginPopup}
                  toggleSignupPopup={this.toggleSignupPopup}
                ></Login>
              </div>
            )}
            {showSignup && (
              <div id="signup-popup">
                <Signup
                  authenticated={props.authenticated}
                  authenticate={props.authenticate}
                  toggleSignupPopup={this.toggleSignupPopup}
                  toggleLoginPopup={this.toggleLoginPopup}
                ></Signup>
              </div>
            )}
            <div className="nps-input-container">
              <h1>Find Your Next Park</h1>
              <form>
                <select value={stateAbbr} onChange={this.handleChange}>
                  {allStateInfo.map((state) => {
                    return (
                      <option
                        key={state.abbreviation}
                        value={state.abbreviation}
                      >
                        {state.name}
                      </option>
                    );
                  })}
                </select>
              </form>
              <Link to={`/state/${stateAbbr}`}>Go to State</Link>
            </div>
          </section>
          <BottomNav />
        </div>
      );
    }
  }
}

export default NPS;

{
  /* <USVectorMap /> */
}
{
  /* <ul>
            <div className="allParksList`>
              <ul>
                {allParks.map((park) => (
                  <li key={park.id}>{park.fullName}</li>
                ))}
              </ul>
            </div>
          </ul> */
}
