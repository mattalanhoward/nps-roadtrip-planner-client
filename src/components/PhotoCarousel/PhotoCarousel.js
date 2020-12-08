import React, { Component } from "react";
import "./PhotoCarousel.css";

export default class Carousel extends Component {
  state = {
    imageDisplayed: null,
    index: 0,
  };

  componentDidMount = () => {
    this.setFirstImage();
  };

  setFirstImage = () => {
    const url = this.props.url;
    this.setState({
      imageDisplayed: url[0],
    });
  };

  changeImage = () => {
    let newIndex = this.state.index;
    newIndex < this.props.url.length - 1 ? newIndex++ : (newIndex = 0);

    this.setState(
      {
        index: newIndex,
      },
      () => this.displayImage()
    );
  };

  displayImage = () => {
    const url = this.props.url;
    const imageArr = [url[this.state.index]];
    this.setState({
      imageDisplayed: imageArr,
    });
  };

  render() {
    console.log(this.props.url);
    return (
      <div>
        <div className="carousel-container">
          <img
            onClick={this.changeImage}
            src={this.state.imageDisplayed}
            alt="Person"
          />
        </div>
      </div>
    );
  }
}
