import React from "react";
import { signup } from "../../services/userService";
import { Link } from "react-router-dom";
import "./Signup.css";

class Signup extends React.Component {
  state = {
    userName: "",
    email: "",
    password: "",
    errorMessage: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    signup({
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            (localStorage.setItem("apiToken", response.apiToken),
            this.props.authenticate(response.user),
            this.props.history.push("/")))
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const { userName, email, password, errorMessage } = this.state;

    return (
      <div className="signup-container">
        {/* <img
          className="logo"
          src={
            "https://res.cloudinary.com/dcod1zxnl/image/upload/v1603130425/Noda_101_Logo_l72snm.png"
          }
          alt="NPS Logo"
        /> */}
        {errorMessage !== "" && (
          <span className="signup-errors">{errorMessage}</span>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            name="userName"
            value={userName}
            onChange={this.handleChange}
            required={true}
            type="text"
            placeholder="Username"
          />
          {/* <label>Email: </label> */}
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
            placeholder="Email"
          />
          {/* <label>Password: </label> */}
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
            placeholder="Password"
          />
          <button className="nav-btns" type="submit">
            {" "}
            Sign up{" "}
          </button>
        </form>

        <Link to={"/login"}>Already Registered? Login</Link>
      </div>
    );
  }
}

export default Signup;
