import React, { Component } from "react";
import SingleParkDetails from "../SingleParkDetails/SingleParkDetails";
import "./SinglePark.css";
import { Button, Popup } from "semantic-ui-react";
import tent from "../../images/tent.svg";
import caravan from "../../images/caravan.svg";
import backpack from "../../images/backpack.svg";
import whitestar from "../../images/white-star.svg";
import yellowstar from "../../images/yellow-star.svg";
import truckbw from "../../images/roadtrip.svg";
import truckcolor from "../../images/roadtripcolor.svg";
import { addFavoritePark } from "../../services/npsService";
import Slider from "infinite-react-carousel";

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
    usersFavoriteParks: ["abcd"],
    successMessage: "",
  };

  componentDidMount = () => {
    console.log(`single park user`, this.props.user);
    if (Object.keys(this.props.user).length > 0) {
      const parkCodesArr = this.props.user.favoriteParks.map(
        (park) => park.parkCode
      );

      this.setState({
        usersFavoriteParks: parkCodesArr ? parkCodesArr : ["abcd"],
      });
    }
  };

  togglePhotos = () => {
    this.setState({
      showCarousel: !this.state.showCarousel,
    });
  };

  toggleDetails = (target) => {
    this.setState({
      showParkDetails: !this.state.showParkDetails,
      singleParkDetails: target,
    });
  };

  handleFavorite = () => {
    let favoriteMessage =
      this.state.successMessage === "Added to favorites"
        ? "Removed from favorites"
        : "Added to favorites";
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
    const props = this.props;
    const {
      showParkDetails,
      singleParkDetails,
      isFavorite,
      isOnRoadTrip,
      usersFavoriteParks,
    } = this.state;

    const images = parkInfo.images;

    //array of url's
    const carouselImages = images.map((imageInfo) => imageInfo);

    const carousel = carouselImages.map((imageUrl) => (
      <div className="photo-container">
        <img src={imageUrl.url} alt={imageUrl.altText}></img>
      </div>
    ));

    const settings = {
      arrowsBlock: false,
      className: "carousel-container",
      dots: true,
      shift: 50,
      wheelScroll: 3,
    };

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
                    usersFavoriteParks.includes(parkInfo.parkCode) ? (
                      <p>Remove from Favorites</p>
                    ) : (
                      <p>Add to Favorites</p>
                    )
                  }
                  trigger={
                    <p onClick={this.handleFavorite}>
                      {usersFavoriteParks.includes(parkInfo.parkCode) ? (
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
            <h1>{this.state.successMessage}</h1>

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
          <Slider {...settings}>
            {carouselImages.length > 0 ? (
              carousel
            ) : (
              <div className="no-images">No Images Available</div>
            )}
          </Slider>
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
