// src/App.tsx
import React, { useState, useEffect } from "react";
import { MissionProvider } from "./context/MissionContext";
import MissionList from "./components/MissionList/MissionList";
import AddMission from "./components/AddMission/AddMission";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginData = localStorage.getItem("loginData");
    if (loginData) {
      const { expiration } = JSON.parse(loginData);
      if (new Date().getTime() < expiration) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("loginData");
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 דקות
    localStorage.setItem(
      "loginData",
      JSON.stringify({ expiration: expirationTime })
    );
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setIsLoggedIn(false);
  };

  return (
    <MissionProvider>
      <div className="app">
        <header className="app-header">
          <h1>Military Task Manager</h1>
          {isLoggedIn && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </header>

        {!isLoggedIn ? (
          <div className="login-container">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        ) : (
          <>
            <AddMission />
            <MissionList />
          </>
        )}
      </div>
    </MissionProvider>
  );
};

export default App;
