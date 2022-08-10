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

export function userRetrieveAction() {
  return async function(dispatch) {
    dispatch({type: 'user-request'});
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens !== null) {
      const response = await fetch(`${base_url}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens['access']}`
        }
      });
      const data = await response.json();
      if (response.status !== 200) {
        dispatch({type: 'user-error', payload: data});
      } else {
        dispatch({type: 'user-success', payload: data});
      }
    } else {
      dispatch({type: 'user-error', payload: 'No auth token.'});
    }
  }
}

export function userUpdateAction(body) {
  return async function(dispatch) {
    dispatch({type: 'user-request'});
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens !== null) {
      const response = await fetch(`${base_url}/api/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens['access']}`
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (response.status !== 200) {
        dispatch({type: 'user-error', payload: data});
      } else {
        dispatch({type: 'user-success', payload: data});
      }
    } else {
      dispatch({type: 'user-error', payload: 'No auth token.'});
    }
  }
}
