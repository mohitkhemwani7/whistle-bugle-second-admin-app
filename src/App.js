import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPage/LandingPage";
import React from "react";

const currentUser = false;
const RequiredAuth = ({children}) => {
    return currentUser? (children) : <Navigate to="/"/>
}

function App() {
  return (
      <Router>
        <Routes>
            <Route exact path='/' element={<Login/>}/>
          <Route exact path='/main' element={<RequiredAuth><LandingPage/></RequiredAuth>}/>
        </Routes>
      </Router>
  );
}

export default App;