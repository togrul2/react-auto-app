import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export const base_url = "http://localhost:5000";


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App/>
  </Router>
);
