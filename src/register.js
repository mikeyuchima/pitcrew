import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import { API_HOST_HTTP, API_HOST_WS } from "./config.js";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fireRedirect: false
    };
  }
  register = data => {
    $.ajax({
      url: `${API_HOST_HTTP}/register`,
      type: "POST",
      data,
      success: data => {
        if (data) {
          const tempUser = {
            username: data.username,
            login: true,
            type: data.type,
            id: data.id
          };
          this.setState({ fireRedirect: true });
        } else {
          alert("Username or Password does not exist");
        }
      },
      error: function(data) {
        console.log("fail");
      }
    });
  };
  handleRegistration = e => {
    e.preventDefault();
    const data = {
      username: this.refs.username.value,
      password: this.refs.password.value,
      type: this.refs.type.value
    };
    this.register(data);
  };

  render() {
    const { fireRedirect } = this.state;

    return (
      <form onSubmit={this.handleRegistration}>
        <h3> Register </h3>{" "}
        <select ref="type" placeholder="Enter User">
          <option value="Dispatch"> Dispatch </option>{" "}
          <option value="Technician"> Technician </option>{" "}
        </select>{" "}
        <input type="text" ref="username" placeholder="enter you username" />
        <input type="password" ref="password" placeholder="enter password" />
        <input type="submit" value="Register" />
        {fireRedirect && <Redirect to="/login" />}
      </form>
    );
  }
}

export default Register;
