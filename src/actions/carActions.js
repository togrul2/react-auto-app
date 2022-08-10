import {base_url} from "../main.jsx";

export function getCarsAction(sort = null) {
  return async function (dispatch) {
    dispatch({type: 'cars-request'});
    let url = `${base_url}/api/cars?`;
    if (sort) {
      url += new URLSearchParams({sort});
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      dispatch({type: 'cars-success', payload: data});
    } else {
      dispatch({type: 'cars-error', payload: data});
    }
  }
}

export function addCarAction(carData) {
  return async function (dispatch) {
    dispatch({type: 'car-request'});
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens !== null) {
      const response = await fetch(`${base_url}/api/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens['access']}`
        },
        body: JSON.stringify(carData)
      });
      const data = await response.json();
      if (response.status === 201) {
        dispatch({type: 'car-success', payload: data});
      } else {
        dispatch({type: 'car-error', payload: data});
      }
    } else {
      dispatch({type: 'car-error', payload: 'No auth token.'})
    }
  }
}

export function getMyCarsAction() {
  return async function (dispatch) {
    dispatch({type: 'cars-request'});
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens !== null) {
      const response = await fetch(`${base_url}/api/user/cars`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens['access']}`
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        dispatch({type: 'cars-success', payload: data});
      } else {
        dispatch({type: 'cars-error', payload: data});
      }
    } else {
      dispatch({type: 'cars-error', payload: 'No auth token.'})
    }
  }
}

export function deleteCarAction(carId) {
  return async function (dispatch) {
    dispatch({type: 'car-delete-request'});
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens !== null) {
      const response = await fetch(`${base_url}/api/cars/${carId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens['access']}`
        }
      })

      if (response.status === 204) {
        dispatch({type: 'car-delete-success'});
      } else {
        const data = await response.json();
        dispatch({type: 'car-delete-error', payload: data});
      }
    }
  }
}
