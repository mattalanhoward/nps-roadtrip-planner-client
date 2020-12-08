import React from "react";
import "./SingleParkDetails.css";
import { Button, Popup } from "semantic-ui-react";

const popupStyle = {
  borderRadius: 2,
  opacity: 0.9,
  padding: "1em",
  width: "40%",
  background: "black",
  color: "white",
};

export default function SingleParkDetails(props) {
  const park = props.singleParkDetails.target.name;
  console.log(park);

  const handleCloseDetails = () => {
    props.toggleDetails();
  };

  return (
    <div>
      <div className="details-item-container">
        <h5>Physical Address</h5>
        <p className="address">
          {park.addresses[0].line1}
          <br></br>
          {park.addresses[0].city}, {park.addresses[0].stateCode}{" "}
          {park.addresses[0].postalCode}
        </p>
      </div>
      <div className="details-item-container">
        <h5>Weather</h5>
        <p>{park.weatherInfo}</p>
      </div>
      <div className="details-item-container">
        <h5>Activities</h5>
        <p className="activity-list">
          {park.activities.map((activity) => activity.name + ", ")}
        </p>
      </div>
      <div className="details-item-container">
        <h5>Entrance Fees</h5>
        <div className="fee-container">
          {park.entranceFees.map((fee) => {
            return (
              <div className="fee" key={fee.id}>
                <Popup
                  content={<p>{fee.description}</p>}
                  trigger={
                    <p>
                      {" "}
                      Fee: {fee.cost} <br></br>
                      {fee.title}
                    </p>
                  }
                  style={popupStyle}
                />
              </div>
            );
          })}
        </div>
      </div>
      {<h5 onClick={() => handleCloseDetails()}>Show Less</h5>}
    </div>
  );
}
