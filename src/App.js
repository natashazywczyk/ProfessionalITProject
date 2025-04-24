//Imports for desired navigation pages
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import PlayerStats from './components/PlayerStats';
import GeneralKnowledge from './components/GeneralKnowledge';
import CreateProfile from './components/CreateProfile';
import Settings from './components/Settings';
import LoginPage from './components/LoginPage';
import PickQuiz from './components/PickQuiz';
import HistoryQuiz from './components/HistoryQuiz';
import MusicQuiz from './components/MusicQuiz';

function App() {
  // Manage theme state globally
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode")) || false
  );

  // Apply the theme globally whenever it changes
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#84768e" : "#dfd4f7";
    document.body.style.color = isDarkMode ? "#ffffff" : "#000000";
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          {/*Different visitable routes*/}
          <Route path = "/" element = {<HomePage />} />
          <Route path = "/generalknowledge" element = {<GeneralKnowledge />} />
          <Route path = "/playerstats" element = {<PlayerStats />} />
          <Route path = "/pickquiz" element = {<PickQuiz />} />
          <Route path = "/historyquiz" element = {<HistoryQuiz />} />
          <Route path = "/musicquiz" element = {<MusicQuiz />} />
          <Route path = "/createprofile" element = {<CreateProfile />} />
          <Route path = "/login" element = {<LoginPage />} />
          <Route
            path="/settings"
            element={<Settings isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
