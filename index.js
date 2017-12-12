import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import  store  from './src/redux/store';
import * as firebase from 'firebase';
// import Signin from './src/components/login/signin';

var config = {
    apiKey: "AIzaSyD_oBVgNx2s9Wn6Pa3a1nWsyqU7dOhel1s",
    authDomain: "tourist-guide-app-c73f4.firebaseapp.com",
    databaseURL: "https://tourist-guide-app-c73f4.firebaseio.com",
    projectId: "tourist-guide-app-c73f4",
    storageBucket: "tourist-guide-app-c73f4.appspot.com",
    messagingSenderId: "973503753086"
  };
  firebase.initializeApp(config);

class AwesomeProject extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
