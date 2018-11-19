import { createStore, combineReducers, applyMiddleware } from 'redux';
import { middleware } from './navigators/AppNavigator';
import thunk from 'redux-thunk';

import * as reducers from "./reducers/index.js";

const reducer = combineReducers(reducers);

// Connect our store to the reducers
export default createStore(reducer, applyMiddleware(thunk, middleware));