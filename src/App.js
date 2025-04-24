//Imports for desired navigation pages
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import PlayerStats from './components/PlayerStats';
import GeneralKnowledge from './components/GeneralKnowledge';
import CreateProfile from './components/CreateProfile';
import Settings from './components/Settings';
import LoginPage from './components/LoginPage';
import PickQuiz from './components/PickQuiz';
import HistoryQuiz from './components/HistoryQuiz';

function App() {
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
          <Route path = "/createprofile" element = {<CreateProfile />} />
          <Route path = "/login" element = {<LoginPage />} />
          <Route path = "/settings" element = {<Settings />} />
          </Routes>
      </Router> 
    </div>
  );
}

export default App;
