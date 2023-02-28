import "./App.css";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { ActivateUser } from "./pages/ActivateUser";
import { Success } from "./components/success";
import { ChangePasswordForm } from "./components/ChangePassword";
export const appContext = createContext();

function App() {
  const serverUrl = "http://localhost:4000";
  const clientUrl = "http://localhost:3000";
  // const serverUrl = "online url";
  // const clientUrl = "online url";
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 720 ? true : false
  );
  const contextObj = { serverUrl: serverUrl, clientUrl: clientUrl, isMobile };
  function handleResize() {
    window.innerWidth < 720 ? setIsMobile(true) : setIsMobile(false);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="App">
      <div className="project-conatiner">
        <ToastContainer theme="dark" />
        <appContext.Provider value={contextObj}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activate/:id" element={<ActivateUser />} />
            <Route
              path="/change-password/:id"
              element={<ChangePasswordForm />}
            />
            <Route path="success" element={<Success />} />
          </Routes>
        </appContext.Provider>
      </div>
    </div>
  );
}

export default App;
