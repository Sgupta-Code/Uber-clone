import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import "remixicon/fonts/remixicon.css";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/login"
          element={
            <UserContext>
              <UserLogin />
            </UserContext>
          }
        />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        <Route
          path="/signup"
          element={
            <UserContext>
              <UserSignup />
            </UserContext>
          }
        />
        <Route
          path="/captain-login"
          element={
            <CaptainContext>
              <CaptainLogin />
            </CaptainContext>
          }
        />
        <Route
          path="/captain-signup"
          element={
            <CaptainContext>
              <CaptainSignup />
            </CaptainContext>
          }
        />
        <Route
          path="/home"
          element={
            <UserContext>
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            </UserContext>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserContext>
              <UserProtectWrapper>
                <UserLogout />
              </UserProtectWrapper>
            </UserContext>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainContext>
              <CaptainProtectWrapper>
                <CaptainHome />
              </CaptainProtectWrapper>
            </CaptainContext>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainContext>
              <CaptainProtectWrapper>
                <CaptainLogout />
              </CaptainProtectWrapper>
            </CaptainContext>
          }
        />
      </Routes>
    </div>
  );
};

export default App;