const carInitialState = {
  loading: false,
  car: null,
  error: null
};

export function carReducer(state = carInitialState, action) {
  switch (action.type) {
    case 'car-request':
      return {loading: true, car: null, error: null};
    case 'car-success':
      return {loading: false, car: action.payload, error: null};
    case 'car-error':
      return {loading: false, car: null, error: action.payload};
    default:
      return state;
  }
}

export function carsReducer(state = carInitialState, action) {
  switch (action.type) {
    case 'cars-request':
      return {loading: true, cars: null, error: null};
    case 'cars-success':
      return {loading: false, cars: action.payload, error: null};
    case 'cars-error':
      return {loading: false, cars: null, error: action.payload};
    default:
      return state;
  }
}

const carDeleteInitialState = {
  loading: false,
  deleted: false,
  error: null
}

export function carDeleteReducer(state = carDeleteInitialState, action) {
  switch (action.type) {
    case 'car-delete-request':
      return {loading: true, deleted: false, error: null};
    case 'car-delete-success':
      return {loading: false, deleted: true, error: null};
    case 'car-delete-error':
      return {loading: false, deleted: false, error: action.payload};
    default:
      return state;
  }
}