//Hold in state list of all NPS.
//Drop down to search by state.
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllParks } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import "./NPS.css";
import USVectorMap from "../USVectorMap/USVectorMap";
import BottomNav from "../BottomNav/BottomNav";
import highSierraTent from "../../images/high-sierra-tent.jpeg";
import stateData from "../../stateList.json";

export class NPS extends Component {
  state = {
    allParks: null,
    loading: false,
    errorMessage: "",
    stateAbbr: "co",
    allStateInfo: [],
  };

  async componentDidMount() {
    // await this.fetchAllParks();
    this.getStateInfo();
  }

  async fetchAllParks() {
    try {
      const response = await getAllParks();
      this.setState({
        allParks: response.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  }

  getStateInfo = () => {
    this.setState({
      allStateInfo: stateData,
    });
  };

  handleChange = (event) => {
    this.setState({ stateAbbr: event.target.value }, () => {});
  };

  render() {
    const { allParks, loading, stateAbbr, allStateInfo } = this.state;
    // console.log(`NPS STATE`, this.state);
    // console.log(`PROPS in the NPS`, this.props);
    const props = this.props;

    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <TopNav logout={props.logout} authenticated={props.authenticated} />
          <section className="nps-landing-container">
            <div className="nps-input-container">
              <h1>Find Your Next Park</h1>
              <form>
                <select value={stateAbbr} onChange={this.handleChange}>
                  {allStateInfo.map((state) => {
                    return (
                      <option
                        key={state.abbreviation}
                        value={state.abbreviation}
                      >
                        {state.name}
                      </option>
                    );
                  })}
                </select>
              </form>
              <Link to={`/state/${stateAbbr}`}>Go to State</Link>
            </div>
          </section>
          <BottomNav />
        </div>
      );
    }
  }
}

export default NPS;

{
  /* <USVectorMap /> */
}
{
  /* <ul>
            <div className="allParksList">
              <ul>
                {allParks.map((park) => (
                  <li key={park.id}>{park.fullName}</li>
                ))}
              </ul>
            </div>
          </ul> */
}
