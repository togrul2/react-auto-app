import {configureStore} from '@reduxjs/toolkit'
import {loginReducer, registerReducer, userReducer} from "./reducers/authReducers.js";
import {carDeleteReducer, carEditReducer, carReducer, carsReducer} from "./reducers/carReducer.js";

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
    authRegister: registerReducer,
    userInfo: userReducer,
    carInfo: carReducer,
    carsInfo: carsReducer,
    carEdit: carEditReducer,
    carDelete: carDeleteReducer
  },
});
