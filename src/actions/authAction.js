import {base_url} from "../main.jsx";

export function loginAction(credentials) {
  return async function (dispatch) {
    dispatch({type: "login-request"});

    const body = JSON.stringify(credentials);

    const response = await fetch(`${base_url}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });
    const data = await response.json();
    if (response.status === 201) {
      localStorage.setItem("tokens", JSON.stringify(data));
      dispatch({type: 'login-success', payload: data});
    } else {
      dispatch({type: 'login-error', payload: data});
    }
  }
}

export function logoutAction() {
  return function (dispatch) {
    localStorage.removeItem('tokens');
    dispatch({type: 'login-logout'});
  }
}

export function registerAction(userData) {
  return async function(dispatch) {
    dispatch({type: 'register-request'});

    const body = JSON.stringify(userData);
    const response = await fetch(`${base_url}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });
    const data = await response.json();
    if (response.status === 201) {
      dispatch({type: 'register-success', payload: data});
    } else {
      dispatch({type: 'register-error', payload: data});
    }
  }
}
