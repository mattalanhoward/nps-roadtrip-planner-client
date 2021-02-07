import React, { Component } from "react";
import SingleParkDetails from "../SingleParkDetails/SingleParkDetails";
import "./SinglePark.css";
import { Popup } from "semantic-ui-react";
import tent from "../../images/tent.svg";
import caravan from "../../images/caravan.svg";
import backpack from "../../images/backpack.svg";
import whitestar from "../../images/white-star.svg";
import yellowstar from "../../images/yellow-star.svg";
import truckbw from "../../images/roadtrip.svg";
import truckcolor from "../../images/roadtripcolor.svg";
import {
  addParkToExistingRoadTrip,
  addParkToNewRoadTrip,
  addFavoritePark,
  deleteExistingRoadTrip,
} from "../../services/npsService";
import AddToRoadTrip from "../AddToRoadTrip/AddToRoadTrip";

const popupStyle = {
  borderRadius: 2,
  opacity: 0.9,
  padding: "1em",
  margin: "0",
  background: "black",
  color: "white",
};

export default class SinglePark extends Component {
  state = {
    showParkDetails: false,
    singleParkDetails: null,
    isFavorite: false,
    isOnRoadTrip: false,
    usersFavoriteParks: ["abcd"],
    successMessage: "",
    loading: true,
    roadTripPopup: false,
    userRoadTrips: [],
  };

  componentDidMount = () => {
    if (Object.keys(this.props.user).length > 0) {
      const parkCodesArr = this.props.user.favoriteParks.map(
        (park) => park.parkCode
      );

      this.setState({
        loading: false,
        isFavorite: parkCodesArr.includes(this.props.park.parkCode),
        usersFavoriteParks: parkCodesArr ? parkCodesArr : ["abcd"],
        userRoadTrips: this.props.user.userRoadTrips,
      });
    }
  };

  toggleDetails = (target) => {
    this.setState({
      showParkDetails: !this.state.showParkDetails,
      singleParkDetails: target,
    });
  };

  handleFavorite = () => {
    let favoriteMessage = this.state.isFavorite
      ? "Successfully removed from favorites"
      : "Successfully added to favorites";
    setTimeout(() => this.setState({ successMessage: "" }), 2000);
    this.setState({
      isFavorite: !this.state.isFavorite,
    });

    addFavoritePark(this.props.park, this.props.user._id)
      .then((response) => {
        this.setState({
          usersFavoriteParks: response.favoriteParks.map(
            (park) => park.parkCode
          ),
          successMessage: favoriteMessage,
        });
      })
      .catch((err) => {
        console.log("Error updating favorites ", err);
      });
  };

  //Toggle road trip popup
  toggleRoadTripPopup = () => {
    this.setState({
      roadTripPopup: !this.state.roadTripPopup,
      isOnRoadTrip: !this.state.isOnRoadTrip,
    });
  };

  //Add new trip to users road trips.
  addToNewTrip = (tripName) => {
    this.toggleRoadTripPopup();

    const { park, user } = this.props;

    addParkToNewRoadTrip(park.id, user._id, tripName).then((response) =>
      //returns updated user.
      this.setState(
        {
          userRoadTrips: response,
        },
        () => console.log(`State after response`, this.state.userRoadTrips)
      )
    );
  };

  //Update Road Trip (Add to existing road trip.)
  addToExistingTrip = (tripName) => {
    this.toggleRoadTripPopup();
    const { park, user } = this.props;
    //returns updated user.

    addParkToExistingRoadTrip(park.id, user._id, tripName).then((response) =>
      this.setState(
        {
          userRoadTrips: response,
        },
        () => console.log(`State after response`, this.state.userRoadTrips)
      )
    );
  };

  //Delete Road Trip
  deleteRoadTrip = (tripName) => {
    const { user } = this.props;
    console.log(user._id);
    deleteExistingRoadTrip(user._id, tripName).then((response) => {
      this.setState(
        {
          userRoadTrips: response,
        },
        () => console.log(`State after response`, this.state.userRoadTrips)
      );
    });
  };

  render() {
    const props = this.props;
    const {
      showParkDetails,
      singleParkDetails,
      isFavorite,
      isOnRoadTrip,
      loading,
      roadTripPopup,
      userRoadTrips,
    } = this.state;

    const successStyle = isFavorite ? "add-fav" : "remove-fav";

    return (
      <div className="park-details-container">
        <section className="park-container">
          <div className="park-info">
            <h5>{props.park.designation}</h5>
            <h3>{props.park.fullName}</h3>
            <p>
              {props.park.states.length > 2
                ? `Various States: ${props.park.states}`
                : `State: ${props.park.states}`}
            </p>

            {props.authenticated && (
              <div className="favorite-icons">
                <Popup
                  content={
                    isFavorite ? (
                      <p>Remove from Favorites</p>
                    ) : (
                      <p>Add to Favorites</p>
                    )
                  }
                  trigger={
                    <p onClick={this.handleFavorite}>
                      {isFavorite ? (
                        <img src={yellowstar} alt={"yellowstar"}></img>
                      ) : (
                        <img src={whitestar} alt={"whitestar"}></img>
                      )}
                    </p>
                  }
                  style={popupStyle}
                />
                <Popup
                  content={
                    isOnRoadTrip ? (
                      <p>Remove from Road Trip</p>
                    ) : (
                      <p>Add to Road Trip</p>
                    )
                  }
                  trigger={
                    <p onClick={this.toggleRoadTripPopup}>
                      {isOnRoadTrip ? (
                        <img src={truckcolor} alt={"Color Truck"}></img>
                      ) : (
                        <img src={truckbw} alt={"Truck"}></img>
                      )}
                    </p>
                  }
                  style={popupStyle}
                />
                <p className="success-message" id={successStyle}>
                  {this.state.successMessage}
                </p>
              </div>
            )}

            {roadTripPopup && (
              <AddToRoadTrip
                toggleRoadTripPopup={this.toggleRoadTripPopup}
                authenticated={props.authenticated}
                user={props.user}
                park={props.park}
                addToNewTrip={this.addToNewTrip}
                addToExistingTrip={this.addToExistingTrip}
                userRoadTrips={userRoadTrips}
                deleteRoadTrip={this.deleteRoadTrip}
              ></AddToRoadTrip>
            )}

            <p>{props.park.description}</p>
            <p>
              {" "}
              <Popup
                content={<p>Tent Camping</p>}
                trigger={
                  props.park.activities.find((el) => el.name === "Camping") && (
                    <img src={tent} alt={"Tent Camping"}></img>
                  )
                }
                style={popupStyle}
              />
              <Popup
                content={<p>Backcountry Camping</p>}
                trigger={
                  props.park.activities.find(
                    (el) => el.name === "Backcountry Camping"
                  ) && <img src={backpack} alt={"Backcountry Camping"}></img>
                }
                style={popupStyle}
              />
              <Popup
                content={<p>RV Camping</p>}
                trigger={
                  props.park.activities.find(
                    (el) => el.name === "RV Camping"
                  ) && <img src={caravan} alt={"RV Camping"}></img>
                }
                style={popupStyle}
              />
            </p>
            <div
              className="more-details"
              onClick={() =>
                this.toggleDetails({
                  target: { name: props.park },
                })
              }
            >
              {this.state.showParkDetails ? (
                <h5>Show less</h5>
              ) : (
                <h5>More Details</h5>
              )}
            </div>
          </div>
          {props.park.images.length > 0 ? (
            <div className="photo-container">
              <img
                src={props.park.images[0].url}
                alt={props.park.images[0].altText}
              ></img>
            </div>
          ) : (
            <div className="no-images">No Images Available</div>
          )}
        </section>

        {showParkDetails && (
          <SingleParkDetails
            singleParkDetails={singleParkDetails}
            toggleDetails={this.toggleDetails}
          />
        )}

        <div className="bottom-border"></div>
      </div>
    );
  }
}
