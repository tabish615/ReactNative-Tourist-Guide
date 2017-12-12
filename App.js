/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import Index from './src/components/login/frontpage';
import Signin from './src/components/login/signin';
import Signup from './src/components/login/signup';
import Main from './src/components/Dashboard/main';
import SideBar from './src/components/Dashboard/sidebar';
import MyApp from './src/components/Map/map';
import SearchPlaces from './src/components/Map/searchplaces';
import NearPlaces from './src/components/Map/nearPlaces';
import * as firebase from 'firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component//<{}>
 {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="index" component={Index}  hideNavBar/>
          <Scene key="signin" component={Signin} title="Sign In"/>
          <Scene key="signup" component={Signup} title="Sign Up"/>
          <Scene key="main" component={Main} hideNavBar />
          <Scene key="sidebar" component={SideBar} hideNavBar />
          <Scene key="myapp" component={MyApp} hideNavBar />
          <Scene key="searchplaces" component={SearchPlaces} hideNavBar />
          <Scene key="nearplaces" component={NearPlaces} hideNavBar />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
