import React, { Component } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import { AppNavigator } from './app/navigators/AppNavigator';
import { StatusBar, BackHandler } from 'react-native';
import { NavigationActions } from "react-navigation";

import { Font } from 'expo';

import store from './app/store';

axios.defaults.baseURL = 'https://artek.org/';

export default class App extends Component {

  // Дизейблим статус бар в приложении
  async componentDidMount() {
    StatusBar.setHidden(true);

    await Font.loadAsync({
      'custom-font': require('./assets/fonts/9366.ttf'),
    });

    await Font.loadAsync({
      'custom-font-bold': require('./assets/fonts/9367.ttf'),
    })
    //BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    //BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  /*onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };*/

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}