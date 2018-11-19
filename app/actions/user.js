import axios from 'axios';
import * as types from '../actionTypes.js';

// Логин юзера
export const login = (username, password) => {
  /*
  'med01@artek.org'
  '12345678' 
  */
  var username = 'med01@artek.org';
  var password = '12345678';

  return dispatch => {
    axios.post('api/token-auth/', {username: username, password: password}).then(response => {
      if (response.data.token) {
        // Получаем личные данные
        dispatch({
          type: types.GET_USER_DATA, 
          data: response.data
        });
        // Логиним юзера
        dispatch({
          type: types.LOGGED_IN, 
          data: response.data.token
        });
      } else {
        dispatch({
          type: types.LOGGED_OUT, 
          data: response.data
        });
      }
    });
  }
}

// Регистрация юзера
export const registration = (dataMess) => {
  return dispatch => {
    axios({
      method: 'post',
      url: 'api/forum/registration/',
      data: {
        'first_name': dataMess.first_name, 
        'last_name': dataMess.last_name,
        'email': dataMess.email,
        'password': dataMess.password,
        'sex': dataMess.sex
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(response => {

      // логиним юзера после успешной регистрации
      login(dataMess.email, dataMess.password);
      dispatch({
        type: types.USER_REGISTRED, 
        data: response
      });
    });
  }
}

// Получение личных данных юзера 
export const getUserData = (user_id) => {
  return dispatch => {
    axios.get(`api/users/${user_id}/`).then(response => {
      dispatch({
        type: types.USER_DATA_RECIEVED, 
        data: response.data,
      });
    })
  }
}