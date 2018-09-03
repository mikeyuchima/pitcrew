import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  NavigatorIOS,
  Button,
  Container
} from "react-native";
import TopScreen from "./topscreen";
import HomeScreen from "./homescreen";
import Rider from "./rider";
import Tech from "./tech";

import { createStackNavigator } from "react-navigation";

const NavigationApp = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  Rider: { screen: Rider },
  Tech: { screen: Tech }
});

export default class App extends Component {
  render() {
    return <NavigationApp />;
  }
}
