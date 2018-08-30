import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 250px)`);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      activeMarker: null,
      myPosition: undefined,
      // dummie positions for testing
      tickets: []
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

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
        console.log(this.state.tickets);
      })
      .catch(err => console.error("ERROR:", err));
  };

  _reloadTickets = () => {
    setInterval(() => {
      this._fetchTickets();
    }, 2500);
  };
  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    this._reloadTickets();
    navigator.geolocation.getCurrentPosition(position => {
      const myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.setState({ myPosition });
      console.log("Dashboard location:", myPosition);
    });
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    const sidebarStyles = {
      sidebar: {
        backgroundColor: "honeydew"
      }
    };

    if (this.state.myPosition) {
      return (
        <div id="menu">
          <GoogleMap
            center={{
              lat: this.state.myPosition.lat,
              lng: this.state.myPosition.lng
            }}
            defaultZoom={9}
          >
            <MapMarker tickets={this.state.tickets} />
          </GoogleMap>
          <Sidebar
            sidebar={<em>PitCrew Dashboard</em>}
            styles={sidebarStyles}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
          >
            <button onClick={() => this.onSetSidebarOpen(false)}>Menu</button>
            <b>Main content</b>
            <p className="ticketBox">ticket box</p>
          </Sidebar>
        </div>
      );
    } else {
      return (
        <div id="menu">
          <Sidebar
            sidebar={<em>PitCrew Dashboard</em>}
            styles={sidebarStyles}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
          >
            <button onClick={() => this.onSetSidebarOpen(true)}>Menu</button>
            <b>Main content</b>
            <p className="ticketBox">ticket box</p>
          </Sidebar>
        </div>
      );
    }
  }
}

export default compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHs0Po1ZjrqqKy8pNXcXX3Gfl71w2GEDs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "500px", width: "500px" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withScriptjs,
  withGoogleMap
)(Dashboard);
