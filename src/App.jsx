import {Provider} from "react-redux";
import {Route, Routes} from "react-router-dom";
import {Header} from "./components/base/Header.jsx";
import {Footer} from "./components/base/Footer.jsx";
import {CarsList} from "./pages/CarsList.jsx";
import {Profile} from "./pages/Profile.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import {Login} from "./pages/Login.jsx";
import {Register} from "./pages/Register";
import {CarAdd} from "./pages/CarAdd.jsx";
import {MyCars} from "./pages/MyCars.jsx";
import {CarEdit} from "./pages/CarEdit.jsx";
import store from "./store";

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
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/cars" element={<MyCars/>}/>
          <Route path="cars/:carId/edit" element={<CarEdit/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </main>
    </Provider>
  );
}

export default App;
