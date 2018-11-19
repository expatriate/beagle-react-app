import * as types from '../actionTypes.js';
//import * as screenTypes from "../navigation/screenTypes.js";

import { NavigationActions } from "react-navigation";


export const getData = () => {
  return {
    type: types.APP_LOADED,
    payload: 'test'
  }
}

export const addToCart = (id) => {
  return {
    type: 'ADD_TO_CART', 
    payload: {itemId: id, count: 1}
  }
}

export const removeFromCart = (id) => {
  return {
    type: 'REMOVE_FROM_CART', 
    payload: {itemId: id}
  }
}

export const addToList = (id, type) => {
  return {
    type: 'ADD_TO_LIST', 
    payload: {itemId: id, type: type}
  }
}

export const successPay = () => {
  return {
    type: 'SUCCESS_PAY',
    payload: '',
  }
};

export const addToResult = (id) => {
  return {
    type: 'ADD_TO_RESULT', 
    payload: {itemId: id}
  }
}

export const removeFromList = (id) => {
  return {
    type: 'REMOVE_FROM_LIST', 
    payload: {itemId: id}
  }
}

export const sendUserMessage = (text) => {
  return {
    type: 'SEND_USER_MESSAGE', 
    payload: {text: text}
  }
}

export const sendBotMessage = (text, variants) => {
  return {
    type: 'SEND_BOT_MESSAGE', 
    payload: {text: text, variants: variants}
  }
}

export const addTags = (tags) => {
  return {
    type: 'ADD_TAGS', 
    payload: {tags: tags}
  }
}

export const navigateToRegistration = () =>
NavigationActions.navigate({
  routeName: 'Registration',
});

export const navigateToSearch = () =>
NavigationActions.navigate({
  routeName: 'Search',
});

export const navigateToOnplace = () =>
NavigationActions.navigate({
  routeName: 'Onplace',
});

export const navigateToLanding = () =>
NavigationActions.navigate({
  routeName: 'Landing',
});

export const navigateToCard = () =>
NavigationActions.navigate({
  routeName: 'Card',
})

export const navigateToForget = () =>
NavigationActions.navigate({
  routeName: 'ForgetPassword',
});

export const navigateToResult = () =>
NavigationActions.navigate({
  routeName: 'Result',
});

export const navigateToPath = () =>
NavigationActions.navigate({
  routeName: 'Path',
});

export const navigateBack = (key) =>
NavigationActions.navigate({
  routeName: key,
});

/*export const navigateToLogin = () =>
  NavigationActions.navigate({
    routeName: screenTypes.LOGIN
  });

export const navigateToSplash = () =>
  NavigationActions.navigate({
    routeName: screenTypes.SPLASH
  });*/