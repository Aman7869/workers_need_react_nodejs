import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import Profile from './components/Profile';
import UploadImage from './components/UploadImage';
import Admin from './components/Admin';
import LearnFormik from './components/LearnFormik';
import Service from './components/Service';
import WorkersProfile from './components/WorkersProfile';
import WorkersUpload from './components/WorkersUpload';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar title="TextUtils" abouttext="About_Us" />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/learn" element={<LearnFormik />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/upload" element={<UploadImage />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/service" element={<Service />} />
          <Route exact path="/workers_profile" element={<WorkersProfile />} />
          <Route exact path="/workers_upload" element={<WorkersUpload />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
