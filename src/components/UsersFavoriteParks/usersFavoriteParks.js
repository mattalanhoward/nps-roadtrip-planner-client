import React, { Component } from "react";
import { getFavorites } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import BottomNav from "../BottomNav/BottomNav";

export default class usersFavoriteParks extends Component {
  state = {
    usersFavoriteParks: [],
  };

  componentDidMount() {
    console.log(`Single State user`, this.props.user._id);

    getFavorites(this.props.user._id)
      .then((response) => {
        this.setState(
          {
            usersFavoriteParks: response.favoriteParks,
          },
          () => console.log(`Users favorites inside favorites `, this.state)
        );
      })
      .catch((err) => {
        console.log("Error updating favorites ", err);
      });
  }
  render() {
    const { usersFavoriteParks } = this.state;
    console.log(usersFavoriteParks);
    return (
      <div>
        <TopNav
          logout={this.props.logout}
          authenticated={this.props.authenticated}
        />
        {}
        <h1>Favorites</h1>
        {usersFavoriteParks.length === 0 ? (
          <h2>You have no favorites at this time. Start searching!</h2>
        ) : (
          usersFavoriteParks.map((park) => {
            return <p>{`${park}`}</p>;
          })
        )}
        <BottomNav />
      </div>
    );
  }
}
