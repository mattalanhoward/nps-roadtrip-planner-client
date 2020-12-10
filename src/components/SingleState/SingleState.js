import React, { Component, PureComponent } from "react";
import { getAllParksByState } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import BottomNav from "../BottomNav/BottomNav";
import SinglePark from "../SinglePark/SinglePark";
import mapboxgl from "mapbox-gl";
import StateMap from "../StateMap/StateMap";
import "./SingleState.css";
import Select from "react-select";

export default class SingleState extends Component {
  state = {
    singleStateParks: [],
    loading: true,
    lat: null,
    lng: null,
  };

  singleStateAbbr = this.props.match.params.details;

  async componentDidMount() {
    const API_KEY = localStorage.getItem("npsApiToken");

    const MAPBOX_ACCESS_TOKEN = localStorage.getItem("mapBoxApiToken");
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    await this.fetchState({ singleStateAbbr: this.singleStateAbbr, API_KEY });
  }

  async fetchState({ singleStateAbbr, API_KEY }) {
    // const apiToken = this.props.apiTokens.npsApiToken;

    try {
      const response = await getAllParksByState({ singleStateAbbr, API_KEY });
      this.setState({
        singleStateParks: response.data,
        loading: false,
        lat: response.data[0].latitude,
        lng: response.data[0].longitude,
      });
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  }

  render() {
    const { singleStateParks } = this.state;
    console.log(`Props in Single State`, this.props);
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
{
  // createOptions = () => {
  //   const singleStateParks = this.state.singleStateParks;
  //   const parkOptionsArr = [];
  //   singleStateParks.map((park) => {
  //     parkOptionsArr.push({ value: park.fullName, label: park.fullName });
  //   });
  //   this.setState({
  //     parkOptions: parkOptionsArr,
  //   });
  // };
  // displayParkDetails = (selected) => {
  //   const park = selected.target.value;
  //   const filteredPark = this.state.singleStateParks.filter(
  //     (x) => x.fullName == park
  //   );
  //   this.setState({
  //     singleParkDetails: filteredPark[0],
  //     toggleDetails: true,
  //   });
  // };
  /* <div className="allParksList">
  <Select
    options={parkOptions}
    placeholder={"Select a Park..."}
    onChange={(val) => {
      this.displayParkDetails({
        target: { name: val.value, value: val.value },
      });
    }}
  />
</div> */
}
