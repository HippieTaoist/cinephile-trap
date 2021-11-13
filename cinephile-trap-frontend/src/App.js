import "./App.css";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/nav/Nav";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import ProtectedHome from "./components/protectHome/ProtectHome";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

require("dotenv").config();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let jwtToken = window.localStorage.getItem("jwtToken");

    if (jwtToken) {
      let decodedToken = jwtDecode(jwtToken);

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        window.localStorage.removeItem("jwtToken");
        setUser(null);
      } else {
        setUser({
          email: decodedToken.email,
          username: decodedToken.username,
        });
      }
    }
  }, []);

  return (
    <>
      <ToastContainer theme="colored" />
      <Router>
        <Nav user={user} setUser={setUser} />
      </Router>
    </>
  );
}

export default App;
