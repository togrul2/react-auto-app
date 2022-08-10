import './App.css'
import {Header} from "./components/base/Header.jsx";
import {Route, Routes} from "react-router-dom";
import {Footer} from "./components/base/Footer.jsx";
import {CarsList} from "./pages/CarsList.jsx";
import {CarDetail} from "./pages/CarDetail.jsx";
import {Profile} from "./pages/Profile.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import {Login} from "./pages/Login.jsx";
import {Register} from "./pages/Register";
import {Provider} from "react-redux";
import store from "./store";
import {CarAdd} from "./pages/CarAdd.jsx";
import {MyCars} from "./pages/MyCars.jsx";

function App() {
  return (
    <Provider store={store}>
      <main>
        <Header/>
        <Routes>
          <Route path="/" element={<CarsList/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/cars/add" element={<CarAdd/>}/>
          <Route path="/cars/:carId" element={<CarDetail/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/cars" element={<MyCars/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </main>
    </Provider>
  );
}

export default App;
