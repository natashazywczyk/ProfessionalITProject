import React, { useState } from "react";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track theme

  const toggleLightDark = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle between light and dark mode
    document.body.style.backgroundColor = isDarkMode ? "#92A8D1" : "#dec2cb"; // Change background color
    document.body.style.color = isDarkMode ? "#ffffff" : "#000000"; // Change text color
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