import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AnonRoute from "./auth/auth/AnonRoute";
import PrivateRoute from "./auth/auth/PrivateRoute";
import { validateSession } from "./services/userService";
import "./App.css";
import NPS from "./components/NPS/NPS";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import SingleState from "./components/SingleState/SingleState";
import TopNav from "./components/TopNav/TopNav";
import { getApiTokens } from "./services/apiServices";

class App extends React.Component {
  state = {
    authenticated: false,
    user: {},
    apiTokens: {},
  };

  componentDidMount = async () => {
    await this.handleGetApiTokens();
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      validateSession(accessToken)
        .then((response) => {
          console.log(response, "RESPONSE");
          this.authenticate(response.session.userId);
        })
        .catch((err) => console.log(err));
    }
  };

  authenticate = (user) => {
    this.setState({
      authenticated: true,
      user,
    });
  };

  handleLogout = () => {
    // console.log(`Logout APP Clicked`);
    localStorage.clear();
    this.setState({
      authenticated: false,
      user: {},
    });
  };

  handleGetApiTokens = () => {
    getApiTokens()
      // .then((response) =>
      //   // this.setState(
      //   //   {
      //   //     apiTokens: response.data,
      //   //   },
      //   //   () => console.log(this.state)
      //   // )
      //   localStorage.setItem("npsApiToken", response.data.npsApiToken)
      // )
      .then((response) =>
        localStorage.setItem("mapBoxApiToken", response.data.mapBoxApiToken)
      )

      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { authenticated } = this.state;
    // console.log(`APPSTATE`, this.state);
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <AnonRoute
              exact
              path="/"
              user={this.state.user}
              authenticated={authenticated}
              component={NPS}
              logout={() => this.handleLogout}
            />
            <AnonRoute
              exact
              path="/signup"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Signup}
            />
            <AnonRoute
              exact
              path="/login"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Login}
            />
            <AnonRoute
              exact
              path="/state/:details"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={SingleState}
              logout={() => this.handleLogout}
              user={this.state.user}
              apiTokens={this.state.apiTokens}
            />
            <AnonRoute
              exact
              path="/github"
              render={() =>
                (window.location = "https://www.github.com/mattalanhoward")
              }
            />
            <AnonRoute
              exact
              path="/instagram"
              render={() =>
                (window.location = "https://www.instagram.com/talljoehikes/")
              }
            />
            <AnonRoute
              exact
              path="/youtube"
              render={() =>
                (window.location = "https://www.youtube.com/c/TallJoeHikes/")
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
