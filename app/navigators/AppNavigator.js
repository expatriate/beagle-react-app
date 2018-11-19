import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {
  Image,
  View,
  Text,
  Alert
} from 'react-native';
import MainPage from '../components/pages/main-page';
import SearchPage from '../components/pages/search-page';
import PathPage from '../components/pages/path-page';
import ResultPage from '../components/pages/result-page';
import CardPage from '../components/pages/card-page';
import OnplacePage from '../components/pages/onplace-page';
import LandingPage from '../components/pages/landing-page';

import RegistrationPage from '../components/pages/registration-page';
import ForgetPasswordPage from '../components/pages/forget-password-page';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const RootNavigator = createStackNavigator({
  Main: { 
    screen: MainPage,
    navigationOptions: {
      header: null
    },
  },
  Search: {
    screen: SearchPage,
    navigationOptions: {
      header: null
    },
  },
  Card: {
    screen: CardPage,
    navigationOptions: {
      header: null
    },
  },
  Onplace: {
    screen: OnplacePage,
    navigationOptions: {
      header: null
    },
  },
  Landing: {
    screen: LandingPage,
    navigationOptions: {
      header: null
    },
  },
  Path: {
    screen: PathPage,
    navigationOptions: {
      header: null
    },
  },
  Result: {
    screen: ResultPage,
    navigationOptions: {
      header: null
    },
  },
},
/*{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
}*/);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };