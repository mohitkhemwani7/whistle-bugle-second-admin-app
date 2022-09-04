import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPage/LandingPage";
import React, {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import AddTeam from "./components/Team/AddTeam";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Team from "./components/Team/Team";


function App() {
    const RequiredAuth = ({children}) => {
        return currentUser? (children) : <Navigate to="/"/>
    }

    const {currentUser} = useContext(AuthContext);
  return (
      <Router>
        <Routes>\
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/main' element={<RequiredAuth><LandingPage/></RequiredAuth>}/>
            <Route exact path='/team' element={<RequiredAuth><Team/></RequiredAuth>}/>
            <Route exact path='/AddTeam' element={<RequiredAuth><AddTeam/></RequiredAuth>} />
        </Routes>
      </Router>
  );
}

export default App;


//Dummy Checkin