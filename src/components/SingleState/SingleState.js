import React, { Component, PureComponent } from "react";
import { getAllParksByState } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import BottomNav from "../BottomNav/BottomNav";
import SinglePark from "../SinglePark/SinglePark";
import mapboxgl from "mapbox-gl";
import StateMap from "../StateMap/StateMap";
import "./SingleState.css";
import { getFavorites } from "../../services/npsService";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import stateData from "../../stateList.json";

export default class SingleState extends Component {
  state = {
    singleStateParks: [],
    loading: true,
    lat: null,
    lng: null,
    usersFavoriteParks: [],
    showLogin: false,
    showSignup: false,
    stateName: "",
  };

  singleStateAbbr = this.props.match.params.details;

  componentDidMount() {
    this.getStateName();
    this.fetchState({ singleStateAbbr: this.singleStateAbbr });
    getFavorites(this.props.user._id)
      .then((response) => {
        this.setState({
          usersFavoriteParks: response.favoriteParks,
        });
      })
      .catch((err) => {
        console.log("Error updating favorites ", err);
      });
  }

  async fetchState({ singleStateAbbr }) {
    try {
      const response = await getAllParksByState({ singleStateAbbr });
      this.setState({
        singleStateParks: response.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  }

  getStateName = () => {
    const stateName = stateData.filter((state) => {
      return state.abbreviation === this.singleStateAbbr.toUpperCase();
    });
    this.setState({
      stateName: stateName[0].name,
    });
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
      singleStateParks,
      usersFavoriteParks,
      showLogin,
      showSignup,
      stateName,
    } = this.state;
    const props = this.props;
    return (
      <div>
        <TopNav
          logout={props.logout}
          authenticated={props.authenticated}
          toggleLoginPopup={this.toggleLoginPopup}
          toggleSignupPopup={this.toggleSignupPopup}
        />
        <div className="stateName">
          <h1>{stateName}</h1>
        </div>
        <section className="state-park-container">
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
          <StateMap singleStateParks={singleStateParks} />
          <div className="single-park-container">
            {singleStateParks.map((park) => {
              return (
                <SinglePark
                  key={park.id}
                  park={park}
                  logout={props.logout}
                  authenticated={props.authenticated}
                  user={props.user}
                  usersFavoriteParks={usersFavoriteParks}
                />
              );
            })}
          </div>
        </section>
        <BottomNav />
      </div>
    );
  }
}
