const loginInitialState = {
  loading: false,
  tokens: null,
  error: null
};

export function loginReducer(state = loginInitialState, action) {
  switch (action.type) {
    case 'login-request':
      return {...state, loading: true};
    case 'login-success':
      return {
        loading: false,
        tokens: action.payload,
        error: null
      };
    case 'login-error':
      return {
        loading: false,
        tokens: null,
        error: action.payload

      };
    case 'login-logout':
      return {loading: false, tokens: null, error: null}
    default:
      return state;
  }
}

const registerInitialState = {
  loading: false,
  user: null,
  error: null
}

export function registerReducer(state = registerInitialState, action) {
  switch (action.type) {
    case 'register-request':
      return {loading: true, user: null, error: null};
    case 'register-success':
      return {loading: false, user: action.payload, error: null};
    case 'register-error':
      return {loading: false, user: null, error: action.payload};
    default:
      return state;
  }
}

const userInitialState = {
  loading: false,
  user: null,
  error: null
}

export function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case 'user-request':
      return {loading: true, user: null, error: null};
    case 'user-success':
      return {loading: false, user: action.payload, error: null};
    case 'user-error':
      return {loading: false, user: null, error: action.payload};
    default:
      return state;
  }
}
