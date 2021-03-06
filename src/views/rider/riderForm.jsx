import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  FieldGroup
} from "react-bootstrap";

class RiderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rider: {
        status: "pending"
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const rider = this.state.rider;
      rider.lat = position.coords.latitude;
      rider.lng = position.coords.longitude;

      this.setState({
        rider
      });
    });
  }

  handleClose = () => {
    this.setState({
      show: false,
      fireRedirect: false,
      assist: false
    });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleChangeDescription = e => {
    const rider = this.state.rider;
    rider.description = e.target.value;
    this.setState({
      rider
    });
    console.log("is it working???", this.state.rider);
  };

  handleSelect = e => {
    const rider = this.state.rider;
    rider.type = e.target.value;
    this.setState({
      rider
    });
  };

  handleChangeName = e => {
    const rider = this.state.rider;
    rider.name = e.target.value;
    this.setState({
      rider
    });
  };

  handleChangeContact = e => {
    const rider = this.state.rider;
    rider.contact = e.target.value;
    this.setState({
      rider
    });
  };

  requestHelp = e => {
    e.preventDefault();

    const rider = this.state.rider;
    rider.startTime = new Date();

    this.setState({
      rider
    });

    const data = this.state.rider;
    console.log("I NEED TO KNOW THIS", data);
    this.props.newTicket(data);
  };

  render() {
    return (
      <div>
        <h2> RIDER RIDER </h2>
        <Button bsStyle="danger" bsSize="large" onClick={this.handleShow}>
          Request Assistance
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>How Can We Help You?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="Name"
                  onChange={this.handleChangeName}
                />

                <ControlLabel>Contact</ControlLabel>
                <FormControl
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="Contact Number"
                  onChange={this.handleChangeContact}
                />

                <ControlLabel>Select</ControlLabel>
                <FormControl
                  componentClass="select"
                  onChange={this.handleSelect}
                >
                  <option value="">Select...</option>
                  <option value="mechanical">Mechanical</option>
                  <option value="medical">Medical</option>
                  <option value="sweep">Sweep</option>
                </FormControl>

                <ControlLabel>Description</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  type="text"
                  placeholder="Description"
                  onChange={this.handleChangeDescription}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.requestHelp}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default RiderForm;
