import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Container
} from "react-native";

export default class Tech extends Component {
  static navigationOptions = {
    title: "Tech"
  };

  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
    <View>
      <View>
        <TextInput
          style={{
            height: 60,
            margin: 20,
            padding: 10,
            borderColor: "gray",
            borderWidth: 1
          }}
          placeholder='username'
          onSubmitEditing={text => this.setState({ username })}
          value={this.state.username}
        />
      </View>
      <View>
        <TextInput
          style={{
            height: 60,
            margin: 20,
            padding: 10,
            borderColor: "gray",
            borderWidth: 1
          }}
          placeholder="password"
          keyboardType={"default"}
          secureTextEntry={true}
          onSubmitEditing={text => this.setState({ password })}
          value={this.state.password}
        />
      </View>
    </View>)
  }
}