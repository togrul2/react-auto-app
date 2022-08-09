import {configureStore} from '@reduxjs/toolkit'
import {loginReducer, registerReducer} from "./reducers/authReducers.js";

// Token info in localStorage
const tokenInfo = localStorage.getItem('tokens');


export default configureStore({
  preloadedState: {
    authLogin: {
      loading: false,
      tokens: tokenInfo ? JSON.parse(tokenInfo): null,
      error: null
    }
  },
  reducer: {
    authLogin: loginReducer,
    authRegister: registerReducer
  },
});
