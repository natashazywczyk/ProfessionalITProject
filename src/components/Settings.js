import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Settings = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
      return;
    }

    try {
      await signOut(auth);
      console.log("User logged out successfully.");
      alert("Logged out successfully!");
      navigate("/login");
    } 
    catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>
      <div>
        <label style={{ marginRight: "10px" }}>
          Dark Mode:
        </label>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
      </div>
      <br />
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