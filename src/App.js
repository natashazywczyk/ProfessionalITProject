//Imports for desired navigation pages
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import CustomQuiz from './components/CustomQuiz';
import PlayerStats from './components/PlayerStats';
import GeneralKnowledge from './components/GeneralKnowledge';

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
          <Route path = "/customquiz" element = {<CustomQuiz />} />
          </Routes>
      </Router> 
    </div>
  );
}

export default App;
