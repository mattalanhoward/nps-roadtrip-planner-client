import React, { Component, PureComponent } from "react";
import { getAllParksByState } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import BottomNav from "../BottomNav/BottomNav";
import SinglePark from "../SinglePark/SinglePark";
import mapboxgl from "mapbox-gl";
import StateMap from "../StateMap/StateMap";
import "./SingleState.css";
import Select from "react-select";
import { getFavorites } from "../../services/npsService";
import usersFavoriteParks from "../UsersFavoriteParks/usersFavoriteParks";

export default class SingleState extends Component {
  state = {
    singleStateParks: [],
    loading: true,
    lat: null,
    lng: null,
    usersFavoriteParks: [],
  };

  singleStateAbbr = this.props.match.params.details;

  componentDidMount() {
    console.log(`Single State user`, this.props.user._id);

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

  render() {
    const { singleStateParks, usersFavoriteParks } = this.state;
    // console.log(`Props in Single State`, this.props);
    const props = this.props;
    return (
      <div>
        <TopNav
          logout={this.props.logout}
          authenticated={props.authenticated}
        />
        <h1>{this.singleStateAbbr.toUpperCase()}</h1>
        <section className="state-park-container">
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
