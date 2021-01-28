import React, { Component, PureComponent } from "react";
import { getAllParksByState } from "../../services/npsService";
import mapboxgl from "mapbox-gl";
import pin from "../../images/pin.svg";
import "mapbox-gl/dist/mapbox-gl.css";
import "../StateMap/StateMap.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const mapStyle = {
  width: "100%",
  height: "100%",
};

export default class StateMap extends Component {
  state = {
    viewport: {
      latitude: null,
      longitude: null,
      zoom: null,
    },
    showPopUp: false,
    popUpPark: null,
    showMore: true,
  };

  componentWillMount = async () => {
    await this.setViewPort();
  };

  componentDidMount = () => {
    console.log(`I mounted!`);
  };

  setViewPort = () => {
    this.setState({
      viewport: {
        latitude: 39.5902,
        longitude: -95.7129,
        zoom: 2.9,
      },
    });
  };

  handleShowPopUp = (park) => {
    this.setState({
      showPopUp: true,
      popUpPark: park,
      // showMore: false,
    });
  };

  handleClosePopup = () => {
    this.setState({
      showPopUp: false,
      popUpPark: null,
    });
  };

  toggleShowMore = () => {
    this.setState({
      showMore: !this.state.showMore,
    });
  };

  render() {
    const { singleStateParks, lat, lng } = this.props;
    const { viewport, popUpPark, showMore } = this.state;

    return (
      <section className="map-container">
        <ReactMapGL
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/outdoors-v11"
          {...viewport}
          {...mapStyle}
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          {singleStateParks.map((park, index) => {
            if (
              !isNaN(parseInt(park.latitude)) &&
              !isNaN(parseInt(park.longitude))
            ) {
              return (
                <Marker
                  key={index}
                  longitude={parseFloat(park.longitude)}
                  latitude={parseFloat(park.latitude)}
                  offsetLeft={-10}
                  offsetTop={-10}
                >
                  <div
                    className="marker"
                    onMouseEnter={() => this.handleShowPopUp(park)}
                    onMouseLeave={() => this.handleClosePopup(park)}
                  >
                    <span className="pin">
                      <img src={pin} alt="Pin" />
                    </span>
                  </div>
                </Marker>
              );
            }
          })}
          {this.state.showPopUp && (
            <Popup
              className="park-popup"
              latitude={parseFloat(popUpPark.latitude)}
              longitude={parseFloat(popUpPark.longitude)}
              closeOnClick={false}
              offsetTop={-10}
            >
              <h3>{popUpPark.fullName}</h3>

              {/* {showMore ? (
                <p>{popUpPark.description}</p>
              ) : (
                <p>
                  {popUpPark.description.slice(0, 100) + `...`}{" "}
                  <div onClick={() => this.toggleShowMore()}>
                    {!showMore && <p>Show More</p>}
                  </div>
                </p>
              )} */}
            </Popup>
          )}
        </ReactMapGL>
      </section>
    );
  }
}
