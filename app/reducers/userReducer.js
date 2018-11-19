import * as types from '../actionTypes.js';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

let userState = { 
  is_auth: false, 
  apitoken: null,
  user_id: null,
  profileData: {}
};

export default user = (state = userState, action) => {
    switch (action.type) {
      case types.GET_USER_DATA:
        // Записываем токен в заголовки по умолчанию после получения авторизационных данных
        axios.defaults.headers.common['Authorization'] = `Token ${action.data.token}`; 
        return state = Object.assign({}, state, {is_auth: true, apitoken: action.data.token, user_id: action.data.user_id});
      break;
      case types.USER_DATA_RECIEVED:
        return state = Object.assign({}, state.profileData, action.data);
      default:
          return state;
    }
};