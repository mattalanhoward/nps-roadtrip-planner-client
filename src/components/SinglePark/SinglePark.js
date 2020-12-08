import React, { Component } from "react";
import PhotoCarousel from "../PhotoCarousel/PhotoCarousel";
import SingleParkDetails from "../SingleParkDetails/SingleParkDetails";
import "./SinglePark.css";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Button, Popup } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import tent from "../../images/tent.svg";
import caravan from "../../images/caravan.svg";
import backpack from "../../images/backpack.svg";
import whitestar from "../../images/white-star.svg";
import yellowstar from "../../images/yellow-star.svg";
import truckbw from "../../images/roadtrip.svg";
import truckcolor from "../../images/roadtripcolor.svg";

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
    showCarousel: false,
    showParkDetails: false,
    singleParkDetails: null,
    isFavorite: false,
    isOnRoadTrip: false,
  };

  togglePhotos = () => {
    this.setState({
      showCarousel: !this.state.showCarousel,
    });
  };

  toggleDetails = (target) => {
    this.setState(
      {
        showParkDetails: !this.state.showParkDetails,
        singleParkDetails: target,
      },
      () => console.log(this.state)
    );
  };

  handleFavorite = () => {
    this.state.isFavorite ? this.removeFavorite() : this.addFavorite();
    this.setState({
      isFavorite: !this.state.isFavorite,
    });
  };

  addFavorite = () => {
    console.log(`Add Favorite`);
  };

  removeFavorite = () => {
    console.log(`Remove  Favorite`);
  };

  handleRoadTrip = () => {
    this.state.isOnRoadTrip ? this.removeFromTrip() : this.addToTrip();
    this.setState({
      isOnRoadTrip: !this.state.isOnRoadTrip,
    });
  };

  addToTrip = () => {
    console.log(`Add To Trip`);
  };

  removeFromTrip = () => {
    console.log(`Remove From Trip`);
  };

  render() {
    const parkInfo = this.props.park;
    console.log(`Props in Single Park`, this.props);
    const props = this.props;
    console.log(`Park Info`, parkInfo);
    const {
      showCarousel,
      showParkDetails,
      singleParkDetails,
      isFavorite,
      isOnRoadTrip,
    } = this.state;

    const images = parkInfo.images;

    // console.log(images);
    const url = images.map((imageInfo) => imageInfo.url);
    // console.log(url);

    return (
      <div className="park-details-container">
        <section className="park-container">
          <div className="park-info">
            <h5>{parkInfo.designation}</h5>
            <h3>{parkInfo.fullName}</h3>
            <p>
              {parkInfo.states.length > 2
                ? `Various States: ${parkInfo.states}`
                : `State: ${parkInfo.states}`}
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
                    <p onClick={this.handleRoadTrip}>
                      {isOnRoadTrip ? (
                        <img src={truckcolor} alt={"Color Truck"}></img>
                      ) : (
                        <img src={truckbw} alt={"Truck"}></img>
                      )}
                    </p>
                  }
                  style={popupStyle}
                />
              </div>
            )}

            <p>{parkInfo.description}</p>
            <p>
              {" "}
              <Popup
                content={<p>Tent Camping</p>}
                trigger={
                  parkInfo.activities.find((el) => el.name === "Camping") && (
                    <img src={tent} alt={"Tent Camping"}></img>
                  )
                }
                style={popupStyle}
              />
              <Popup
                content={<p>Backcountry Camping</p>}
                trigger={
                  parkInfo.activities.find(
                    (el) => el.name === "Backcountry Camping"
                  ) && <img src={backpack} alt={"Backcountry Camping"}></img>
                }
                style={popupStyle}
              />
              <Popup
                content={<p>RV Camping</p>}
                trigger={
                  parkInfo.activities.find(
                    (el) => el.name === "RV Camping"
                  ) && <img src={caravan} alt={"RV Camping"}></img>
                }
                style={popupStyle}
              />
            </p>
            <div
              onClick={() =>
                this.toggleDetails({
                  target: { name: parkInfo },
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
          <div className="photo-container">
            <img
              src={parkInfo.images[0].url}
              alt={parkInfo.images[0].altText}
            ></img>
            <h5>More Photos</h5>
          </div>
          {/* <PhotoCarousel url={url} /> */}
        </section>
        <section className="single-park-details">
          {showParkDetails && (
            <SingleParkDetails
              singleParkDetails={singleParkDetails}
              toggleDetails={this.toggleDetails}
            />
          )}
        </section>
        <div className="bottom-border"></div>
      </div>
    );
  }
}
// {showCarousel && <PhotoCarousel parkInfo={parkInfo} />}
// <div onClick={this.togglePhotos}>
//   {showCarousel ? <p>Close Photos</p> : <p>Show Photos</p>}
// </div>
