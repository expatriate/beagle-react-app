import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../navigators/AppNavigator';
import * as types from '../actionTypes.js';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = RootNavigator.router.getActionForPathAndParams('Main');
const tempNavState = RootNavigator.router.getStateForAction(firstAction);
//const secondAction = RootNavigator.router.getActionForPathAndParams('Main');
const initialNavState = RootNavigator.router.getStateForAction(
  //secondAction,
  tempNavState
);

export default nav = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case types.LOGGED_IN:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Profile' })
      );
      break;
    case types.LOGGED_OUT:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' })
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
/*
const initialAuthState = { isLoggedIn: false };

export auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}*/