import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";
import MapMarker from "./map-markers.js";
import $ from "jquery";
import { compose, withProps } from "recompose";
import { Button, Grid, Row, Col } from "react-bootstrap";
import DispatchTicket from "./dispatch-tickets";
import { Redirect } from "react-router-dom";
import "./dashboard.css";

let loopInterval = 1000;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: 0,
      activeMarker: null,
      myPosition: undefined,
      // dummie positions for testing
      //       tickets: [
      //         {
      //           id: 1,
      //           rider: "Bob",
      //           lat: 43.639701,
      //           lng: -79.459055,
      //           type: "mechanic",
      //           startTime: "2018-08-30T16:10:28.638Z",
      //           description: "A",
      //           status: "active"
      //         },
      //         {
      //           id: 2,
      //           rider: "Sally",
      //           lat: 43.6476611,
      //           lng: -79.459055,
      //           type: "mechanic",
      //           startTime: "2018-08-30T16:10:28.638Z",
      //           description: "B",
      //           status: "pending"
      //         }
      // ],
      techs: [
        // {
        //   RideId: 1,
        //   username: "Bob",
        //   name: "Mr. MeeFix",
        //   password: "123456",
        //   specialty: "mechanic",
        //   lat: 43.6876611,
        //   lng: -79.579055
        // },
        // {
        //   RideId: 2,
        //   username: "Chris",
        //   name: "Evans",
        //   password: "123456",
        //   specialty: "medical",
        //   lat: 43.6976611,
        //   lng: -79.479055
        // }
      ]
    };
  }

  getTickets = () => {
    $.ajax({
      url: "http://localhost:8080/fetchTickets",
      type: "GET"
    });
  };

  handleToggleOpen = id => {
    console.log("tag id:", id);
    this.setState({
      activeMarker: id
    });
  };

  _fetchTickets = () => {
    const url = "/fetchTickets";
    fetch(url)
      .then(results => results.json())
      .then(data => {
        this.setState({ tickets: data.tickets });
      })
      .catch(err => console.error("ERROR:", err));
  };

  _fetchAvailableTechs = () => {
    const url = "/fetchAvailableTechs";
    fetch(url)
      .then(results => results.json())
      .then(data => {
        this.setState({ techs: data.techs });
      })
      .catch(err => console.error("ERROR:", err));
  };

  _reloadTickets = () => {
    setInterval(() => {
      this._fetchTickets();
      this._fetchAvailableTechs();
    }, loopInterval);
  };

  componentDidMount() {
    this._reloadTickets();
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });

    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString()
      });
    }, 1000);
  }

  render() {
    if (!localStorage.getItem("user")) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <h2 style={{}}>DASHBOARD</h2>
        <div className="container">
          <p style={{ float: "left" }}>Ride to Conquer Cancer | Toronto, ON</p>
          <p style={{ float: "right" }}>{this.state.curTime}</p>
        </div>
        <Grid id="menu" borderColor="green" fluid>
          <Row>
            <Col xs={12} md={8} xl={8}>
              <Map tickets={this.state.tickets} techs={this.state.techs} />
            </Col>
            <Col
              style={{
                height: "100vh",
                overflow: "scroll"
              }}
              xs={6}
              md={4}
              xl={4}
            >
              <DispatchTicket
                tickets={this.state.tickets}
                techs={this.state.techs}
              />
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHs0Po1ZjrqqKy8pNXcXX3Gfl71w2GEDs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%", width: "100%" }} />,
    containerElement: (
      <div style={{ height: "100vh", width: "100%", paddingLeft: "10px" }} />
    ),
    mapElement: <div style={{ height: "100%", width: "100%" }} />
  }),
  withScriptjs,
  withGoogleMap
)(({ tickets, techs }) => (
  <GoogleMap
    center={new window.google.maps.LatLng(43.6543175, -79.4246381)}
    defaultZoom={12}
  >
    {/* <MapMarker tickets={this.state.tickets} /> */}
    <MapMarker tickets={tickets} techs={techs} />
  </GoogleMap>
));

export default Dashboard;
