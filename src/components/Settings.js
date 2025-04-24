import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  // Initialize state from localStorage or default to false
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode")) || false
  );
  const navigate = useNavigate();

  // Apply the theme and save the choice to localStorage whenever it changes
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#92A8D1" : "#dec2cb"; // Change background color
    document.body.style.color = isDarkMode ? "#ffffff" : "#000000"; // Change text color
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleLightDark = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle between light and dark mode
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
      return; //If cancel clicked, stay logged in
    }

    try {
      await signOut(auth); //Log out
      console.log("User logged out successfully.");
      navigate("/login"); //Navigate to login page
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>
      <div>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>
          Dark Mode:
        </label>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleLightDark}
        />
      </div>
      <br></br>
      <button
        className="btn btn-danger"
        onClick={handleLogout}
        style={{ marginTop: "20px" }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Settings;