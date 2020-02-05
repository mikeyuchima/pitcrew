import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import $ from "jquery";
import "./App.css";

import { Grid } from "react-bootstrap";
import { Column, Row } from "simple-flexbox";

import Main from "./main.jsx";
import Login from "./views/authentication/LoginContainer";
import Rider from "./views/rider/rider";
import Tech from "./views/authenticated/tech/tech";
import Register from "./views/register";
import Dashboard from "./views/authenticated/dispatch/dashboard";
import NavigationBar from "./navigationBar.jsx";
import { API_HOST_HTTP, API_HOST_WS } from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  newTicket(data) {
    $.ajax({
      url: `${API_HOST_HTTP}/newTicket`,
      type: "POST",
      data
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Column flexGrow={1}>
            <NavigationBar />
            <div className="Switch">
              <Switch>
                <Route path="/" exact component={Main} />
                <Route
                  path="/login"
                  render={props => (<Login {...props}/>)}
                />
                <Route
                  path="/rider"
                  component={() => (
                    <Rider user={this.state.user} handleTicket={this.newTicket} />
                  )}
                />
                <Route
                  path="/register"
                  component={() => (
                    <Register onRegister={this.register} user={this.state.user} />
                  )}
                />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/technician" exact component={Tech} />
              </Switch>
            </div>
          </Column>
          <footer>
            <Row horizontal="center" vertical="center">
              <div className="footer" />
            </Row>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
