import React from "react";
import { login } from "../../services/userService";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends React.Component {
  state = {
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
    login({
      username: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            this.props.authenticate(response.user),
            this.props.history.push("/"))
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <div className="login-container">
        {/* <img
          className="logo"
          src={
            "https://res.cloudinary.com/dcod1zxnl/image/upload/v1603130425/Noda_101_Logo_l72snm.png"
          }
          alt="NPS Planner Logo"
        /> */}

        {errorMessage !== "" && (
          <div className="signup-errors">{errorMessage}</div>
        )}

        <form onSubmit={this.handleSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
            placeholder="Email"
          />
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
            Login{" "}
          </button>
        </form>

        <Link to={"/signup"}>Click here to Signup</Link>
      </div>
    );
  }
}

export default Login;
