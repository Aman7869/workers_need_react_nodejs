import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import Profile from './components/Profile';
import UploadImage from './components/UploadImage';
import Admin from './components/Admin';
import LearnFormik from './components/LearnFormik';

import {
  BrowserRouter,
  // BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect, withRouter 
} from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom';
// import { Router, Route } from "react-router";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar title="TextUtils" abouttext="About_Us" />
        <div className="container-fluid my-0" >
        <Switch>
            <Route exact path="/login" >
              <Login />
            </Route>
            <Route  path="/home" >
            <Home />
            </Route>
            <Route  path="/profile" >
            <Profile />
            </Route>
            <Route  path="/upload" >
            <UploadImage />
            </Route>
            <Route exact path="/registration">
              <Registration />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/learn">
              <LearnFormik />
            </Route>
           </Switch>
        </div>
      </BrowserRouter>
        {/* <BrowserRouter>
          <Routes>
          <Navbar title="TextUtils" abouttext="About_Us" />

            <Route path="/home" element={<Home />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Route>
          </Routes>
        </BrowserRouter> */}
    </>
  );
}

export default App;
