import React, { Component, Fragment } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";

class MapMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: null
    };
  }

  handleToggleOpen = id => {
    console.log("tag id:", id);
    this.setState({
      activeMarker: id
    });
  };

  render() {
    const mapMarkers = this.props.tickets.map(ticket => {
      console.log("TICKES", this.props.tickets);
      if (ticket.status === "active")
        return (
          <Marker
            key={ticket.id}
            onClick={() => this.handleToggleOpen(ticket.id)}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }}
            position={{ lat: ticket.lat, lng: ticket.lng }}
          >
            {this.state.activeMarker === ticket.id && (
              <InfoWindow>
                <h4>
                  {ticket.rider} :: {ticket.description}
                </h4>
              </InfoWindow>
            )}
          </Marker>
        );
      if (ticket.status === "pending")
        return (
          <Marker
            key={ticket.id}
            onClick={() => this.handleToggleOpen(ticket.id)}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            }}
            position={{ lat: ticket.lat, lng: ticket.lng }}
          >
            {this.state.activeMarker === ticket.id && (
              <InfoWindow>
                <h4>
                  {ticket.rider} :: {ticket.description}
                </h4>
              </InfoWindow>
            )}
          </Marker>
        );
    });

    const mapTechs = this.props.techs.map(tech => {
      return (
        <Marker
          key={tech.id}
          onClick={() => this.handleToggleOpen(tech.id)}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          }}
          position={{ lat: tech.lat, lng: tech.lng }}
        />
      );

      if (tech.specialty == "medical")
        return (
          <Marker
            key={tech.id}
            onClick={() => this.handleToggleOpen(tech.id)}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }}
            position={{ lat: tech.lat, lng: tech.lng }}
          />
        );

      if (tech.specialty == "sweep")
        return (
          <Marker
            key={tech.id}
            onClick={() => this.handleToggleOpen(tech.id)}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }}
            position={{ lat: tech.lat, lng: tech.lng }}
          />
        );
    });

    return (
      <Fragment>
        {mapMarkers}
        {mapTechs}
      </Fragment>
    );
  }
}
export default MapMarker;
