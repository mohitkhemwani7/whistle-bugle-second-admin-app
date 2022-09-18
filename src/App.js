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
import AddWhyUs from "./components/WhyUs/AddWhyUs";
import WhyUs from "./components/WhyUs/WhyUs";
import Services from "./components/Services/Services";
import AddServices from "./components/Services/AddService";
import UpdateTeam from "./components/Team/UpdateTeam";
import UpdateServices from "./components/Services/UpdateServices";
import AddSubService from "./components/Services/AddSubService";


function App() {
    const RequiredAuth = ({children}) => {
        return currentUser? (children) : <Navigate to="/"/>
    }

    const {currentUser} = useContext(AuthContext);
  return (
      <Router>
        <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/main' element={<RequiredAuth><LandingPage/></RequiredAuth>}/>
            <Route exact path='/team' element={<RequiredAuth><Team/></RequiredAuth>}/>
            <Route exact path='/AddTeam' element={<RequiredAuth><AddTeam/></RequiredAuth>} />
            <Route exact path='/UpdateTeam' element={<RequiredAuth><UpdateTeam/></RequiredAuth>} />
            <Route exact path='/WhyUs' element={<RequiredAuth><WhyUs/></RequiredAuth>} />
            <Route exact path='/WhyUs/Add' element={<RequiredAuth><AddWhyUs/></RequiredAuth>} />
            <Route exact path='/Services' element={<RequiredAuth><Services/></RequiredAuth>} />
            <Route exact path='/Services/Add' element={<RequiredAuth><AddServices/></RequiredAuth>} />
            <Route exact path='/Services/Update' element={<RequiredAuth><UpdateServices/></RequiredAuth>} />
            <Route exact path='/SubServices/Add' element={<RequiredAuth><AddSubService/></RequiredAuth>} />
        </Routes>
      </Router>
  );
}

export default App;


//Dummy Checkin