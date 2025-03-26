import React, { useState, useEffect } from "react";

const Settings = () => {
  // Initialize state from localStorage or default to false
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode")) || false
  );

  // Apply the theme and save the choice to localStorage whenever it changes
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#92A8D1" : "#dec2cb"; // Change background color
    document.body.style.color = isDarkMode ? "#ffffff" : "#000000"; // Change text color
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleLightDark = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle between light and dark mode
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
    </div>
  );
};

export default Settings;