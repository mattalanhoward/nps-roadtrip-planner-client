import React, { Component } from "react";
import "./AddToRoadTrip.css";
import { addParkToRoadTrip } from "../../services/npsService";

export default class AddToRoadTrip extends Component {
  state = {
    newRoadTripName: "",
    existingTripName: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleDropdownChange = (event) => {
    const { value } = event.target;
    this.setState({
      existingTripName: value,
    });
  };

  addToNewTrip = () => {
    console.log(`Add to NEW trip... ${this.state.newRoadTripName}`);
    const tripName = this.state.newRoadTripName;

    this.addParkToTrip(this.props.park.id, this.props.user._id, tripName);
    this.props.toggleRoadTripPopup();
    this.setState({
      newRoadTripName: "",
    });
  };

  addToExistingTrip = () => {
    console.log(`Add to existing trip`, this.state.existingTripName);
    const tripName = this.state.existingTripName;
    this.addParkToTrip(this.props.park.id, this.props.user._id, tripName);
    this.props.toggleRoadTripPopup();

    this.setState({
      existingTripName: "",
    });
  };

  addParkToTrip = (parkId, userId, tripName) => {
    console.log(`Send to backend`, parkId, userId, tripName);
    addParkToRoadTrip(parkId, userId, tripName)
      .then((response) => console.log(`RESPONSE `, response.userRoadTrips))
      .catch((error) => {
        console.log("Error updating Road Trip ", error);
      });
  };

  render() {
    console.log(this.props.park.fullName);
    console.log(this.props.user);
    const parkInfo = this.props.park;

    const { newRoadTripName, existingTripName } = this.state;

    return (
      <section id="add-to-road-trip">
        <h1>Add {parkInfo.fullName} to roadtrip?</h1>
        <div className="road-trip-input-container">
          <div>
            <input
              name="newRoadTripName"
              value={newRoadTripName}
              onChange={this.handleChange}
              type="text"
              placeholder="New Road Trip Name"
            />
            <button onClick={this.addToNewTrip}>
              {" "}
              Enter New Road Trip Name{" "}
            </button>
          </div>
          <div>
            {/* <select value={this.state.selectValue} onChange={this.handleChange}>
              {this.props.user.userRoadTrips.map((roadTrip) => {
                return <option value={roadTrip.name}>{roadTrip.name}</option>;
              })}
            </select> */}
            <select
              value={existingTripName}
              onChange={this.handleDropdownChange}
            >
              <option value="">Select Trip</option>
              {this.props.user.userRoadTrips.map((roadTrip) => {
                return <option value={roadTrip.name}>{roadTrip.name}</option>;
              })}
              <option value="March 2022">March 2022</option>
              <option value="Winter 2021">Winter 2021</option>
            </select>
            <button onClick={this.addToExistingTrip}>
              Add To Existing Road Trip
            </button>
          </div>
        </div>
      </section>
    );
  }
}
