import React, { Component } from "react";
import { getFavorites } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import BottomNav from "../BottomNav/BottomNav";
import SingleParkDetails from "../SingleParkDetails/SingleParkDetails";
import "../SinglePark/SinglePark.css";
import "@brainhubeu/react-carousel/lib/style.css";
import { Button, Popup } from "semantic-ui-react";
import tent from "../../images/tent.svg";
import caravan from "../../images/caravan.svg";
import backpack from "../../images/backpack.svg";
import whitestar from "../../images/white-star.svg";
import yellowstar from "../../images/yellow-star.svg";
import truckbw from "../../images/roadtrip.svg";
import truckcolor from "../../images/roadtripcolor.svg";
import "./usersFavoriteParks.css";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/ClipLoader";

const popupStyle = {
  borderRadius: 2,
  opacity: 0.9,
  padding: "1em",
  margin: "0",
  background: "black",
  color: "white",
};

export default class usersFavoriteParks extends Component {
  state = {
    usersFavoriteParks: [],
    loading: true,
  };

  componentDidMount = () => {
    console.log(`Single State user`, this.props.user._id);

    getFavorites(this.props.user._id)
      .then((response) => {
        this.setState(
          {
            usersFavoriteParks: response.favoriteParks,
            loading: false,
          },
          () => console.log(`Users favorites inside favorites `, this.state)
        );
      })
      .catch((err) => {
        console.log("Error updating favorites ", err);
      });
  };
  render() {
    const { usersFavoriteParks, loading } = this.state;
    const props = this.props;

    console.log(`favorites component`, usersFavoriteParks);
    return loading ? (
      <div className="loader">
        <PacmanLoader loading={loading} size={150} />
      </div>
    ) : (
      <div className="favorites">
        <TopNav
          logout={this.props.logout}
          authenticated={this.props.authenticated}
        />

        <h2>Favorites</h2>
        {/* {usersFavoriteParks.length === 0 ? (
          <h2>You have no favorites at this time. Start searching!</h2>
        ) : (
          usersFavoriteParks.map((park) => {
            return (
              <ul key={park.id}>
                <li>{`${park.fullName}`}</li>
                <h5>{park.designation}</h5>
                <h3>{park.fullName}</h3>
                <p>{park.description}</p>
              </ul>
            );
          })
        )} */}
        {usersFavoriteParks.length === 0 ? (
          <h2>You have no favorites at this time. Start searching!</h2>
        ) : (
          usersFavoriteParks.map((park) => {
            return (
              <div className="park-details-container">
                <section className="park-container">
                  <div className="park-info">
                    <h5>{park.designation}</h5>
                    <h3>{park.fullName}</h3>
                    <p>
                      {park.states.length > 2
                        ? `Various States: ${park.states}`
                        : `State: ${park.states}`}
                    </p>
                    <p>{park.description}</p>
                    <p>
                      {" "}
                      <Popup
                        content={<p>Tent Camping</p>}
                        trigger={
                          park.activities.find(
                            (el) => el.name === "Camping"
                          ) && <img src={tent} alt={"Tent Camping"}></img>
                        }
                        style={popupStyle}
                      />
                      <Popup
                        content={<p>Backcountry Camping</p>}
                        trigger={
                          park.activities.find(
                            (el) => el.name === "Backcountry Camping"
                          ) && (
                            <img
                              src={backpack}
                              alt={"Backcountry Camping"}
                            ></img>
                          )
                        }
                        style={popupStyle}
                      />
                      <Popup
                        content={<p>RV Camping</p>}
                        trigger={
                          park.activities.find(
                            (el) => el.name === "RV Camping"
                          ) && <img src={caravan} alt={"RV Camping"}></img>
                        }
                        style={popupStyle}
                      />
                    </p>
                    <div
                      onClick={() =>
                        this.toggleDetails({
                          target: { name: park },
                        })
                      }
                    ></div>
                  </div>
                  <div className="photo-container">
                    <img
                      src={park.images[0].url}
                      alt={park.images[0].altText}
                    ></img>
                    {/* <h5>More Photos</h5> */}
                  </div>
                </section>

                <div className="bottom-border"></div>
              </div>
            );
          })
        )}

        <BottomNav />
      </div>
    );
  }
}
