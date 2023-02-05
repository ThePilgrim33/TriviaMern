import './App.css';
import React from 'react';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Game from "./components/Game";
import Dashboard from "./components/Dashboard";
import { LoginRequired, LoggedOutRequired } from "./actions/authActions";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element={<LoggedOutRequired><Login /></LoggedOutRequired>} />
          <Route path = "/register" element={<LoggedOutRequired><Register /></LoggedOutRequired>} />
          <Route path = "/dashboard" element={<LoginRequired><Dashboard /></LoginRequired>} />
          <Route path = "/game" element={<LoginRequired><Game /></LoginRequired>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
