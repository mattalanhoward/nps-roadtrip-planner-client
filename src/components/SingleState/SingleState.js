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
    console.log(`Single State user`, this.props.user._id);
    this.getStateName();
    this.fetchState({ singleStateAbbr: this.singleStateAbbr });
    getFavorites(this.props.user._id)
      .then((response) => {
        this.setState(
          {
            usersFavoriteParks: response.favoriteParks,
          }
          // () => console.log(`Users favorites `, this.state)
        );
      })
      .catch((err) => {
        console.log("Error updating favorites ", err);
      });
  }

  async fetchState({ singleStateAbbr }) {
    try {
      const response = await getAllParksByState({ singleStateAbbr });
      console.log(`BACKEND RESPONSE`, response.data);
      this.setState({
        singleStateParks: response.data,
        loading: false,
        // lat: response.data[0].latitude,
        // lng: response.data[0].longitude,
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
    console.log(`State name`, stateName[0].name);
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
    // console.log(`Props in Single State`, this.props);
    const props = this.props;
    return (
      <div>
        <TopNav
          logout={props.logout}
          authenticated={props.authenticated}
          toggleLoginPopup={this.toggleLoginPopup}
          toggleSignupPopup={this.toggleSignupPopup}
        />

        <h1>{stateName}</h1>

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
