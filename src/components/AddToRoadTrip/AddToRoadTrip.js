import React, { Component } from "react";
import "./AddToRoadTrip.css";
import { addParkToNewRoadTrip } from "../../services/npsService";

export default class AddToRoadTrip extends Component {
  state = {
    newRoadTripName: "",
    existingTripName: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => console.log(this.state)
    );
  };

  handleDropdownChange = (event) => {
    const { value } = event.target;
    this.setState(
      {
        existingTripName: value,
      },
      () => console.log(this.state)
    );
  };

  render() {
    const props = this.props;
    console.log(props.userRoadTrips);
    const { newRoadTripName, existingTripName } = this.state;

    return (
      <section id="add-to-road-trip">
        <h1>Add {props.park.fullName} to roadtrip?</h1>
        <div>
          <input
            name="newRoadTripName"
            value={newRoadTripName}
            onChange={this.handleChange}
            type="text"
            placeholder="New Road Trip Name"
          />
          <button onClick={() => props.addToNewTrip(newRoadTripName)}>
            {" "}
            Enter New Road Trip Name{" "}
          </button>
        </div>
        <div>
          <select value={existingTripName} onChange={this.handleDropdownChange}>
            <option value="" selected disabled hidden>
              Select Road Trip
            </option>
            {props.user.userRoadTrips.map((roadTrip) => {
              return <option value={roadTrip}>{roadTrip}</option>;
            })}
          </select>
          <button onClick={() => props.addToExistingTrip(existingTripName)}>
            Add To Existing Road Trip
          </button>
          <button onClick={() => props.deleteRoadTrip(existingTripName)}>
            Delete Road Trip
          </button>
        </div>
      </section>
    );
  }
}
